/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC",
//   Red: "#8B0000", Navy: "#000080", Green: "#008000", Grey: "#808080",
//   Pink: "#FFC0CB", Yellow: "#FFD700", Blue: "#4169E1", Mocca: "#967969",
//   Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37", Orange: "#FF9900",
//   Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50",
//   Mint: "#98FF98", Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082",
//   Violet: "#EE82EE", Purple: "#800080", Magenta: "#FF00FF", Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4", Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E",
//   Ochre: "#CC7722", Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00",
//   Caramel: "#FFD59A", Honey: "#FFC30B", Chestnut: "#954535", Walnut: "#5C4033",
//   Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E", Coffee: "#6F4E37",
//   Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324",
//   Pistachio: "#93C572", Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF",
//   Azure: "#00FFFF", Sky: "#87CEEB", Cerulean: "#007BA7", Cobalt: "#0047AB",
//   Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C", Denim: "#1560BD",
//   Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000",
//   Obsidian: "#0B0B0B", Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E",
//   Zinc: "#8C92AC", Lead: "#778899", Iron: "#A19D94", Titanium: "#878681",
//   Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0", Fuchsia: "#FF00FF",
//   Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5",
//   Melon: "#FDBCB4", Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700",
//   Lime: "#BFFF00", Kiwi: "#8EE53F", Apple: "#8DB600", Pear: "#D1E231",
//   Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135", Mulberry: "#C54B8C",
//   Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC", Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0",
//   Powder: "#B0E0E6", Midnight: "#191970", Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// // Fungsi utilitas untuk translasi teks dinamis dari API Review secara real-time
// // const translateText = async (text: string, langTo: string): Promise<string> => {
// //   if (!text) return "";
// //   try {
// //     const response = await fetch(
// //       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}`
// //     );
// //     const data = await response.json();
// //     if (data && data.responseData && data.responseData.translatedText) {
// //       return data.responseData.translatedText;
// //     }
// //     return text;
// //   } catch (error) {
// //     console.error("Gagal menerjemahkan teks ulasan API:", error);
// //     return text;
// //   }
// // };

// // Fungsi utilitas untuk translasi teks dinamis dari API secara real-time
// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     // Tambahkan parameter email Anda di &de= untuk menambah limit gratis harian
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`
//     );
//     const data = await response.json();

//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;

//       // Deteksi jika API mengirimkan pesan warning karena limit habis
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text; // Tampilkan teks asli agar web tidak rusak
//       }

//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(initialPassedData || null);

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null = location.state?.initialProduct || null;

//       if (activeProduct) {
//         if (isCurrentFetchValid) {
//           setProduct(activeProduct);
//           setLoading(false);
//         }

//         if (allPassedProducts && allPassedProducts.length > 0) {
//           const words = activeProduct.name.trim().split(" ");
//           let rootName = activeProduct.name;
//           if (words.length > 1) {
//             words.pop();
//             rootName = words.join(" ");
//           }
//           const localSiblings = allPassedProducts.filter((p: Product) =>
//             p.name.toLowerCase().includes(rootName.toLowerCase())
//           );
//           if (localSiblings.length > 1 && isCurrentFetchValid) {
//             setSiblingColors(localSiblings);
//           }
//         } else {
//           await fetchSiblingColorsViaAPI(activeProduct.name);
//         }
//       }
//       else {
//         if (isCurrentFetchValid) {
//           setLoading(true);
//           setIsFetchingFull(true);
//         }
//         try {
//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data ? responseData.data : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         } catch (error) {
//           if (isCurrentFetchValid) {
//             console.error("Gagal memuat produk:", error);
//             navigate("/products");
//           }
//           return;
//         }
//       }

//       // Memisahkan pengambilan Reviews yang hanya berdasarkan slug
//       if (slug && isCurrentFetchValid) {
//         const fetchReviews = async () => {
//           try {
//             // Murni menggunakan slug untuk fetch reviews
//             const res = await fetch(`${BASE_URL}/api/products/${slug}/reviews`, {
//               headers: { Accept: "application/json" },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               let reviewsArr = data.reviews ? data.reviews : [];

//               // Menerjemahkan komentar ulasan dinamis dari database jika bahasa saat ini adalah English
//               if (lang === "en" && reviewsArr.length > 0) {
//                 reviewsArr = await Promise.all(
//                   reviewsArr.map(async (r: any) => {
//                     const translatedComment = await translateText(r.comment, "en");
//                     return {
//                       ...r,
//                       comment_en: translatedComment,
//                     };
//                   })
//                 );
//               }

//               if (isCurrentFetchValid) {
//                 setApiReviews(reviewsArr);
//               }
//             }
//           } catch (error) {
//             console.error("Gagal menarik data ulasan:", error);
//           }
//         };
//         fetchReviews();
//       }

//       // Mengambil status wishlist yang membutuhkan activeProduct.id
//       if (activeProduct && isCurrentFetchValid) {
//         const checkWishlistStatus = async () => {
//           const token = localStorage.getItem("user_token");
//           if (!token) return;
//           try {
//             const res = await fetch(`${BASE_URL}/api/wishlists`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             });
//             if (res.ok) {
//               const data = await res.json();
//               if (isCurrentFetchValid) {
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 const isWished = data.some((item: any) => item.product_id === activeProduct!.id);
//                 setIsFavorited(isWished);
//               }
//             }
//           } catch (error) {
//              console.error("Gagal memeriksa wishlist:", error);
//           }
//         };

//         checkWishlistStatus().finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//         });
//       }

//       if (isCurrentFetchValid && !activeProduct) {
//         setLoading(false);
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate("/login"));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         slug: product!.slug,
//         name: product!.name,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();
//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire("Error", data.message || "Gagal menambahkan produk", "warning");
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate("/login"));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate("/checkout", { state: { selectedIds: [data.cart_id] } });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", { stock: product.stock.toString() }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name.toLowerCase().includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   // Memetakan data review API dan memilih field komentar berdasarkan bahasa yang aktif
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const formattedApiReviews = apiReviews.map((r: any) => ({
//       name: r.user?.first_name ? `${r.user.first_name} ${r.user.last_name || ''}` : "Gycora Customer",
//       text: lang === "en" ? (r.comment_en || r.comment) : r.comment,
//       rating: r.rating || 5,
//       is_verified: true
//   }));

//   const brushReviews = [
//     { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//     { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//     { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//     { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//     { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//   ];

//   const scalpReviews = [
//     { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//   ];

//   const staticReviews = isEtherealBrush ? brushReviews : isScalpCare ? scalpReviews : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">

//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatRupiah(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatRupiah(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatRupiah(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`/product/${sibling.slug}`, {
//                                   state: {
//                                     initialProduct: sibling,
//                                     allProducts: location.state?.allProducts || siblingColors
//                                   },
//                                 });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{ backgroundColor: extractColorHex(sibling.name) }}
//                           ></span>
//                           <span className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}>
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow ? t("product_cart_processing") : isOutOfStock ? t("out_of_stock") : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW)
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">

//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       isFetchingFull && !product.description ? (
//                         <div className="space-y-2 animate-pulse">
//                           <div className="w-full h-3 bg-gray-200 rounded"></div>
//                           <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                           <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                         </div>
//                       ) : (
//                         product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5>
//                           <p className="mt-1">{t("brush_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5>
//                           <p className="mt-1">{t("brush_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5>
//                           <p className="mt-1">{t("scalp_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5>
//                           <p className="mt-1">{t("scalp_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: REVIEW */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                  <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 {t("product_verified_buyer")}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // [BARU] LOGIKA PREFIX URL PINTAR
// // Membaca URL saat ini untuk menentukan prefix navigasi
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; // Tanpa prefix
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000",
//   White: "#FFFFFF",
//   Brown: "#8B4513",
//   Beige: "#F5F5DC",
//   Red: "#8B0000",
//   Navy: "#000080",
//   Green: "#008000",
//   Grey: "#808080",
//   Pink: "#FFC0CB",
//   Yellow: "#FFD700",
//   Blue: "#4169E1",
//   Mocca: "#967969",
//   Cream: "#FDF4E3",
//   Sage: "#9DC183",
//   Gold: "#D4AF37",
//   Orange: "#FF9900",
//   Silver: "#C0C0C0",
//   Maroon: "#800000",
//   Olive: "#808000",
//   Taupe: "#483C32",
//   Khaki: "#F0E68C",
//   Mustard: "#FFDB58",
//   Emerald: "#50C878",
//   Coral: "#FF7F50",
//   Mint: "#98FF98",
//   Teal: "#008080",
//   Cyan: "#00FFFF",
//   Indigo: "#4B0082",
//   Violet: "#EE82EE",
//   Purple: "#800080",
//   Magenta: "#FF00FF",
//   Lilac: "#C8A2C8",
//   Lavender: "#E6E6FA",
//   Rose: "#FF007F",
//   Peach: "#FFE5B4",
//   Apricot: "#FBCEB1",
//   Ivory: "#FFFFF0",
//   Tan: "#D2B48C",
//   Charcoal: "#36454F",
//   Ash: "#555555",
//   Platinum: "#E5E4E2",
//   Bronze: "#CD7F32",
//   Copper: "#B87333",
//   Rust: "#B7410E",
//   Ochre: "#CC7722",
//   Sienna: "#882D17",
//   Terracotta: "#E2725B",
//   Amber: "#FFBF00",
//   Caramel: "#FFD59A",
//   Honey: "#FFC30B",
//   Chestnut: "#954535",
//   Walnut: "#5C4033",
//   Mahogany: "#C04000",
//   Chocolate: "#7B3F00",
//   Cocoa: "#D2691E",
//   Coffee: "#6F4E37",
//   Mocha: "#493D26",
//   Espresso: "#4B3621",
//   Cappuccino: "#654321",
//   Latte: "#C5A059",
//   Macchiato: "#8B5A2B",
//   Almond: "#EED9C4",
//   Hazelnut: "#C4A484",
//   Pecan: "#8A3324",
//   Pistachio: "#93C572",
//   Seafoam: "#9FE2BF",
//   Turquoise: "#40E0D0",
//   Aqua: "#00FFFF",
//   Azure: "#00FFFF",
//   Sky: "#87CEEB",
//   Cerulean: "#007BA7",
//   Cobalt: "#0047AB",
//   Sapphire: "#0F52BA",
//   Ultramarine: "#120A8F",
//   Lapis: "#26619C",
//   Denim: "#1560BD",
//   Steel: "#4682B4",
//   Slate: "#708090",
//   Gunmetal: "#2a3439",
//   Onyx: "#353839",
//   Jet: "#343434",
//   Ebony: "#555D50",
//   Raven: "#050301",
//   Pitch: "#000000",
//   Obsidian: "#0B0B0B",
//   Carbon: "#333333",
//   Graphite: "#383838",
//   Pewter: "#8E8E8E",
//   Zinc: "#8C92AC",
//   Lead: "#778899",
//   Iron: "#A19D94",
//   Titanium: "#878681",
//   Chromium: "#C0C0C0",
//   Nickel: "#727472",
//   Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF",
//   Crimson: "#DC143C",
//   Carmine: "#960018",
//   Ruby: "#E0115F",
//   Scarlet: "#FF2400",
//   Vermilion: "#E34234",
//   Brick: "#CB4154",
//   Tomato: "#FF6347",
//   Papaya: "#FFEFD5",
//   Melon: "#FDBCB4",
//   Mango: "#F4A460",
//   Citrus: "#FFA500",
//   Lemon: "#FFF700",
//   Lime: "#BFFF00",
//   Kiwi: "#8EE53F",
//   Apple: "#8DB600",
//   Pear: "#D1E231",
//   Grape: "#6F2DA8",
//   Plum: "#8E4585",
//   Blackberry: "#4D0135",
//   Mulberry: "#C54B8C",
//   Raisin: "#652DC1",
//   Eggplant: "#614051",
//   Aubergine: "#472C4C",
//   Amethyst: "#9966CC",
//   Orchid: "#DA70D6",
//   Heather: "#D473D4",
//   Thistle: "#D8BFD8",
//   Mauve: "#E0B0FF",
//   Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF",
//   Cornflower: "#6495ED",
//   Baby: "#89CFF0",
//   Powder: "#B0E0E6",
//   Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();

//   const { formatPrice } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
//             const localSiblings = allPassedProducts.filter((p: Product) =>
//               p.name.toLowerCase().includes(rootName.toLowerCase()),
//             );
//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         // [PERBAIKAN MUTLAK] Pastikan loading mati bagaimanapun keadaannya
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   useEffect(() => {
//     if (product) {
//       const activePrice =
//         product.discount_price > 0 ? product.discount_price : product.price;
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: "IDR",
//           value: activePrice,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: activePrice,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

// //   const formatRupiah = (angka: number) => {
// //     return new Intl.NumberFormat("id-ID", {
// //       style: "currency",
// //       currency: "IDR",
// //       minimumFractionDigits: 0,
// //     }).format(angka);
// //   };

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * product!.price,
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     // [BARU] 2. GTM Event: add_to_cart (Sisipkan di sini)
//     const activePrice =
//       product!.discount_price > 0 ? product!.discount_price : product!.price;
//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: "IDR",
//         value: activePrice * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: activePrice,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const brushReviews = [
//     {
//       name: "Claudiasunshinee",
//       text: t("review_brush_1"),
//       rating: 5,
//       is_verified: true,
//     },
//     {
//       name: "Nilasetiobudii",
//       text: t("review_brush_2"),
//       rating: 5,
//       is_verified: true,
//     },
//     {
//       name: "Thaliastanley___",
//       text: t("review_brush_3"),
//       rating: 5,
//       is_verified: true,
//     },
//     {
//       name: "Herlenasutanto",
//       text: t("review_brush_4"),
//       rating: 5,
//       is_verified: true,
//     },
//     {
//       name: "Anitaa_bee",
//       text: t("review_brush_5"),
//       rating: 5,
//       is_verified: true,
//     },
//   ];

//   const scalpReviews = [
//     {
//       name: "v*****b",
//       text: t("review_scalp_1"),
//       rating: 5,
//       is_verified: true,
//     },
//   ];

//   const staticReviews = isEtherealBrush
//     ? brushReviews
//     : isScalpCare
//       ? scalpReviews
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
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
//                             strokeWidth={2}
//                             d="M15 19l-7-7 7-7"
//                           />
//                         </svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
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
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
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
//                       strokeWidth={2}
//                       d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
//             <div className="mb-8">
//               {product.discount_price && product.discount_price > 0 ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatPrice(product.price)}
//                   </span>
//                   <span className="text-4xl font-extrabold text-red-600">
//                     {formatPrice(product.discount_price)}
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatPrice(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ==============================================================
//                 BAGIAN TAB (DESCRIPTION | HOW TO USE | FAQ | REVIEW) 
//             ============================================================== */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc"
//                       ? "bg-[#006A4E] text-white"
//                       : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use"
//                       ? "bg-[#006A4E] text-white"
//                       : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq"
//                       ? "bg-[#006A4E] text-white"
//                       : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review"
//                       ? "bg-[#006A4E] text-white"
//                       : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* KONTEN TAB: DESCRIPTION */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">
//                             {t("brush_benefits_title")}
//                           </h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("brush_benefit_1_bold")}</strong>
//                                 {t("brush_benefit_1_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("brush_benefit_2_bold")}</strong>
//                                 {t("brush_benefit_2_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("brush_benefit_3_bold")}</strong>
//                                 {t("brush_benefit_3_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("brush_benefit_4_bold")}</strong>
//                                 {t("brush_benefit_4_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("brush_benefit_5_bold")}</strong>
//                                 {t("brush_benefit_5_text")}
//                               </div>
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">
//                               {t("brush_suitable_title")}
//                             </h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">
//                               {t("brush_specs_title")}
//                             </h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">
//                             {t("scalp_benefits_title")}
//                           </h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_1_bold")}</strong>
//                                 {t("scalp_benefit_1_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_2_bold")}</strong>
//                                 {t("scalp_benefit_2_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_3_bold")}</strong>
//                                 {t("scalp_benefit_3_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_4_bold")}</strong>
//                                 {t("scalp_benefit_4_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_5_bold")}</strong>
//                                 {t("scalp_benefit_5_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_6_bold")}</strong>
//                                 {t("scalp_benefit_6_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_7_bold")}</strong>
//                                 {t("scalp_benefit_7_text")}
//                               </div>
//                             </li>
//                             <li className="flex gap-2">
//                               <span>✨</span>{" "}
//                               <div>
//                                 <strong>{t("scalp_benefit_8_bold")}</strong>
//                                 {t("scalp_benefit_8_text")}
//                               </div>
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">
//                               {t("scalp_suitable_title")}
//                             </h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">
//                               {t("scalp_specs_title")}
//                             </h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || (
//                         <p className="italic text-gray-400">
//                           {t("product_desc_empty")}
//                         </p>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: HOW TO USE */}
//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">
//                       {t("guide_title")}
//                     </h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">
//                         {t("product_guide_empty")}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: FAQ */}
//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">
//                             {t("brush_faq_q1")}
//                           </h5>
//                           <p className="mt-1">{t("brush_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">
//                             {t("brush_faq_q2")}
//                           </h5>
//                           <p className="mt-1">{t("brush_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div>
//                           <h5 className="font-bold text-gray-900">
//                             {t("scalp_faq_q1")}
//                           </h5>
//                           <p className="mt-1">{t("scalp_faq_a1")}</p>
//                         </div>
//                         <div>
//                           <h5 className="font-bold text-gray-900">
//                             {t("scalp_faq_q2")}
//                           </h5>
//                           <p className="mt-1">{t("scalp_faq_a2")}</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">
//                         {t("product_faq_empty")}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* KONTEN TAB: REVIEW */}
//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div
//                           key={index}
//                           className="pb-4 border-b border-gray-100"
//                         >
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (
//                                 <span key={i}>★</span>
//                               ))}
//                             </div>
//                             <span className="font-bold text-gray-900">
//                               {review.name}
//                             </span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">
//                                 {t("product_verified_buyer")}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">
//                             "{review.text}"
//                           </p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">
//                         {t("product_review_empty")}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   wholesale_price?: number; // 👇 [BARU] Tambahkan field ini
//   discount_price: number;
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
//   const { formatPrice } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   // 👇 [BARU] State untuk menyimpan tipe pengguna
//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   // Menarik tipe pengguna saat komponen dimuat
//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
//             const localSiblings = allPassedProducts.filter((p: Product) =>
//               p.name.toLowerCase().includes(rootName.toLowerCase()),
//             );
//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   // 👇 [PERBAIKAN] Logika Penentuan Harga Akhir (Aktif)
//   const isReseller = userType === 'reseller';
//   const hasWholesale = product?.wholesale_price && product.wholesale_price > 0;
  
//   let activePrice = product?.price || 0;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       activePrice = product.wholesale_price!;
//       isDiscounted = true;
//       discountPercentage = Math.round(((product.price - product.wholesale_price!) / product.price) * 100);
//     } else if (product.discount_price && product.discount_price > 0 && product.discount_price < product.price) {
//       activePrice = product.discount_price;
//       isDiscounted = true;
//       discountPercentage = Math.round(((product.price - product.discount_price) / product.price) * 100);
//     }
//   }

//   // GTM Event Effect
//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: "IDR",
//           value: activePrice,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: activePrice,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, activePrice]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * activePrice, // Menggunakan activePrice
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: "IDR",
//         value: activePrice * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: activePrice,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             {/* 👇 [PERBAIKAN] Tampilan Harga Final 👇 */}
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatPrice(product.price)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatPrice(activePrice)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">Harga Grosir</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatPrice(product.price)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   prices?: any;            // 👇 [BARU] Field Data Harga Multi-currency
//   discount_price: number;
//   discount_prices?: any;   // 👇 [BARU] Field Data Diskon Multi-currency
//   wholesale_price?: number; 
//   voucher_discount_price?: number;
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
  
//   // 👇 [PERBAIKAN] Langsung gunakan state dari Context 👇
//   const { currency } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   // ============================================================================
//   // [BARU] HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: 'IDR' };
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
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


//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
//             const localSiblings = allPassedProducts.filter((p: Product) =>
//               p.name.toLowerCase().includes(rootName.toLowerCase()),
//             );
//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   // 👇 [PERBAIKAN] Logika Penentuan Harga Akhir (Aktif) Menggunakan Multi-Currency 👇
//   const isReseller = userType === 'reseller';
//   const hasWholesale = product?.wholesale_price && product.wholesale_price > 0;
  
//   const dynamicPriceObj = getPriceToDisplay(product);
//   const dynamicDiscountObj = getDiscountToDisplay(product);

//   let finalPriceObj = dynamicPriceObj;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       finalPriceObj = { value: product.wholesale_price!, curr: 'IDR' }; // Grosir selalu IDR
//       isDiscounted = true;
//       discountPercentage = Math.round(((product.price - product.wholesale_price!) / product.price) * 100);
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       finalPriceObj = dynamicDiscountObj;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//     }
//   }

//   // GTM Event Effect
//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: finalPriceObj.curr,
//           value: finalPriceObj.value,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: finalPriceObj.value,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       // Saat input ke cart, kita tetap simpan IDR value base-nya di local state React (jika ada butuh kalkulasi murni)
//       // tapi UI nanti akan dirender dengan helper. Atau bisa Anda buat activePrice menjadi value murni dari finalPriceObj.
//       gross_amount: quantity * finalPriceObj.value, 
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         prices: product!.prices,
//         discount_prices: product!.discount_prices,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: finalPriceObj.curr,
//         value: finalPriceObj.value * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: finalPriceObj.value,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             {/* 👇 [PERBAIKAN] Tampilan Harga Final Multi-Currency 👇 */}
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatCurrencyDisplay(dynamicPriceObj)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatCurrencyDisplay(finalPriceObj)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">Harga Grosir</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatCurrencyDisplay(dynamicPriceObj)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="                                                                                                                                                                                                                                                                                                            ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   prices?: any;            
//   discount_price: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; // 👇 [BARU] Tambahkan field Multi-currency Wholesale
//   is_bundle_active: boolean | number;
//   bundle_price?: number | null;
//   bundle_prices?: Record<string, string | number> | string | null;
//   bundle_end_date?: string | null;
//   voucher_discount_price?: number;
//   voucher_discount_prices?: any; // 👇 [BARU] Tambahkan field Multi-currency Voucher
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
  
//   const { currency } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   // ============================================================================
//   // HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: 'IDR' };
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   // 👇 [BARU] Helper Multi-Currency Wholesale 👇
//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
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


//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) =>
//         p.name.toLowerCase().includes(rootName.toLowerCase()),
//       );

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
//             const localSiblings = allPassedProducts.filter((p: Product) =>
//               p.name.toLowerCase().includes(rootName.toLowerCase()),
//             );
//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   // 👇 [PERBAIKAN] Logika Penentuan Harga Akhir Multi-Currency Wholesale 👇
//   const isReseller = userType === 'reseller';
  
//   const dynamicPriceObj = getPriceToDisplay(product);
//   const dynamicDiscountObj = getDiscountToDisplay(product);
//   const dynamicWholesaleObj = getWholesaleToDisplay(product);

//   const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//   let finalPriceObj = dynamicPriceObj;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       finalPriceObj = dynamicWholesaleObj!;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       finalPriceObj = dynamicDiscountObj;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//     }
//   }

//   // GTM Event Effect
//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: finalPriceObj.curr,
//           value: finalPriceObj.value,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: finalPriceObj.value,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
    
//     // 👇 [PERBAIKAN] Payload Add to Cart Mendukung Wholesale Prices 👇
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * finalPriceObj.value, 
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         is_bundle_active: product!.is_bundle_active,
//         bundle_price: product!.bundle_price,
//         bundle_prices: product!.bundle_prices,
//         bundle_end_date: product!.bundle_end_date,
//         prices: product!.prices,
//         discount_prices: product!.discount_prices,
//         wholesale_prices: product!.wholesale_prices,
//         voucher_discount_prices: product!.voucher_discount_prices,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: finalPriceObj.curr,
//         value: finalPriceObj.value * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: finalPriceObj.value,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             {/* 👇 [PERBAIKAN] Tampilan Harga Final Multi-Currency 👇 */}
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatCurrencyDisplay(dynamicPriceObj)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatCurrencyDisplay(finalPriceObj)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">{t("wholesale_price")}</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatCurrencyDisplay(dynamicPriceObj)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   prices?: any;            
//   discount_price: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   is_bundle_active: boolean | number;
//   bundle_price?: number | null;
//   bundle_prices?: Record<string, string | number> | string | null;
//   bundle_end_date?: string | null;
//   voucher_discount_price?: number;
//   voucher_discount_prices?: any; 
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
  
//   const { currency } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   // ============================================================================
//   // HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: 'IDR' };
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
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

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       // 👇 [PERBAIKAN] LOGIKA FILTER KETAT ANTI BUNDLE 👇
//       const siblings = allProducts.filter((p: Product) => {
//         const lowerPName = p.name.toLowerCase();
//         const lowerRoot = rootName.toLowerCase();

//         // 1. Wajib diawali dengan nama dasar (root name)
//         if (!lowerPName.startsWith(lowerRoot)) return false;

//         // 2. Tolak mutlak produk bundle (mengandung karakter +, &, dan, with)
//         if (
//           lowerPName.includes("+") ||
//           lowerPName.includes("&") ||
//           lowerPName.includes(" dan ") ||
//           lowerPName.includes(" with ")
//         ) {
//           return false;
//         }

//         // 3. Sisa kata setelah nama dasar HANYA BOLEH maksimal 1 KATA (yaitu warnanya saja)
//         const remainder = lowerPName.replace(lowerRoot, "").trim();
//         if (remainder.split(" ").length > 1) return false;

//         return true;
//       });

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
            
//             // 👇 [PERBAIKAN] Terapkan logika Strict Filter yang sama ke local cache 👇
//             const localSiblings = allPassedProducts.filter((p: Product) => {
//               const lowerPName = p.name.toLowerCase();
//               const lowerRoot = rootName.toLowerCase();

//               if (!lowerPName.startsWith(lowerRoot)) return false;

//               if (
//                 lowerPName.includes("+") ||
//                 lowerPName.includes("&") ||
//                 lowerPName.includes(" dan ") ||
//                 lowerPName.includes(" with ")
//               ) {
//                 return false;
//               }

//               const remainder = lowerPName.replace(lowerRoot, "").trim();
//               if (remainder.split(" ").length > 1) return false;

//               return true;
//             });

//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   const isReseller = userType === 'reseller';
  
//   const dynamicPriceObj = getPriceToDisplay(product);
//   const dynamicDiscountObj = getDiscountToDisplay(product);
//   const dynamicWholesaleObj = getWholesaleToDisplay(product);

//   const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//   let finalPriceObj = dynamicPriceObj;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       finalPriceObj = dynamicWholesaleObj!;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       finalPriceObj = dynamicDiscountObj;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//     }
//   }

//   // GTM Event Effect
//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: finalPriceObj.curr,
//           value: finalPriceObj.value,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: finalPriceObj.value,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
    
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * finalPriceObj.value, 
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         is_bundle_active: product!.is_bundle_active,
//         bundle_price: product!.bundle_price,
//         bundle_prices: product!.bundle_prices,
//         bundle_end_date: product!.bundle_end_date,
//         prices: product!.prices,
//         discount_prices: product!.discount_prices,
//         wholesale_prices: product!.wholesale_prices,
//         voucher_discount_prices: product!.voucher_discount_prices,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: finalPriceObj.curr,
//         value: finalPriceObj.value * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: finalPriceObj.value,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             {/* 👇 [PERBAIKAN] Tampilan Harga Final Multi-Currency 👇 */}
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatCurrencyDisplay(dynamicPriceObj)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatCurrencyDisplay(finalPriceObj)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">{t("wholesale_price")}</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatCurrencyDisplay(dynamicPriceObj)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   prices?: any;            
//   discount_price: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   is_bundle_active: boolean | number;
//   bundle_price?: number | null;
//   bundle_prices?: Record<string, string | number> | string | null;
//   bundle_end_date?: string | null;
//   voucher_discount_price?: number;
//   voucher_discount_prices?: any; 
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
  
//   const { currency } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   // 👇 [BARU] STATE UNTUK REKOMENDASI PRODUK
//   const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   // ============================================================================
//   // HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: 'IDR' };
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
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

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) => {
//         const lowerPName = p.name.toLowerCase();
//         const lowerRoot = rootName.toLowerCase();

//         if (!lowerPName.startsWith(lowerRoot)) return false;

//         if (
//           lowerPName.includes("+") ||
//           lowerPName.includes("&") ||
//           lowerPName.includes(" dan ") ||
//           lowerPName.includes(" with ")
//         ) {
//           return false;
//         }

//         const remainder = lowerPName.replace(lowerRoot, "").trim();
//         if (remainder.split(" ").length > 1) return false;

//         return true;
//       });

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
            
//             const localSiblings = allPassedProducts.filter((p: Product) => {
//               const lowerPName = p.name.toLowerCase();
//               const lowerRoot = rootName.toLowerCase();

//               if (!lowerPName.startsWith(lowerRoot)) return false;

//               if (
//                 lowerPName.includes("+") ||
//                 lowerPName.includes("&") ||
//                 lowerPName.includes(" dan ") ||
//                 lowerPName.includes(" with ")
//               ) {
//                 return false;
//               }

//               const remainder = lowerPName.replace(lowerRoot, "").trim();
//               if (remainder.split(" ").length > 1) return false;

//               return true;
//             });

//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           // 👇 [BARU] Panggil API Rekomendasi Secara Asynchronous 👇
//           const fetchRecommendations = async () => {
//             try {
//               const res = await fetch(`${BASE_URL}/api/products/${activeProduct!.id}/recommendations`);
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   setRecommendedProducts(data.data || []);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memuat rekomendasi produk:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus(), fetchRecommendations()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   const isReseller = userType === 'reseller';
  
//   const dynamicPriceObj = getPriceToDisplay(product);
//   const dynamicDiscountObj = getDiscountToDisplay(product);
//   const dynamicWholesaleObj = getWholesaleToDisplay(product);

//   const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//   let finalPriceObj = dynamicPriceObj;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       finalPriceObj = dynamicWholesaleObj!;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       finalPriceObj = dynamicDiscountObj;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//     }
//   }

//   // GTM Event Effect
//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: finalPriceObj.curr,
//           value: finalPriceObj.value,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: finalPriceObj.value,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
    
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * finalPriceObj.value, 
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         is_bundle_active: product!.is_bundle_active,
//         bundle_price: product!.bundle_price,
//         bundle_prices: product!.bundle_prices,
//         bundle_end_date: product!.bundle_end_date,
//         prices: product!.prices,
//         discount_prices: product!.discount_prices,
//         wholesale_prices: product!.wholesale_prices,
//         voucher_discount_prices: product!.voucher_discount_prices,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: finalPriceObj.curr,
//         value: finalPriceObj.value * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: finalPriceObj.value,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-[#006A4E]"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             {/* 👇 Tampilan Harga Final Multi-Currency 👇 */}
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatCurrencyDisplay(dynamicPriceObj)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatCurrencyDisplay(finalPriceObj)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">{t("wholesale_price")}</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatCurrencyDisplay(dynamicPriceObj)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* 👇 [BARU] COLLABORATIVE FILTERING REKOMENDASI PRODUK 👇 */}
//             {recommendedProducts.length > 0 && (
//               <div className="pt-8 mt-16 border-t border-gray-100 animate-fade-in-up">
//                 <h3 className="mb-6 text-xl font-bold tracking-tight text-gray-900 uppercase">
//                   Frequently Bought Together
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                   {recommendedProducts.map((recProd) => (
//                     <div 
//                       key={recProd.id} 
//                       className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 shadow-sm cursor-pointer group hover:shadow-md rounded-2xl"
//                       onClick={() => {
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                         navigate(`${urlPrefix}/product/${recProd.slug}`);
//                       }}
//                     >
//                       <div className="relative overflow-hidden aspect-square bg-gray-50">
//                         <img 
//                           src={recProd.image_url} 
//                           alt={recProd.name} 
//                           className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="flex flex-col flex-grow p-4">
//                         <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">{recProd.category_name}</p>
//                         <h4 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 flex-grow group-hover:text-[#006A4E] transition-colors">
//                           {recProd.name}
//                         </h4>
//                         <p className="font-bold text-[#006A4E]">
//                           {formatCurrencyDisplay(getPriceToDisplay(recProd))}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* 👆 ================================================== 👆 */}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   prices?: any;            
//   discount_price: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   is_bundle_active: boolean | number;
//   bundle_price?: number | null;
//   bundle_prices?: Record<string, string | number> | string | null;
//   bundle_end_date?: string | null;
//   voucher_discount_price?: number;
//   voucher_discount_prices?: any; 
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
  
//   const { currency } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   // 👇 [BARU] STATE UNTUK REKOMENDASI PRODUK
//   const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   // ============================================================================
//   // HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: 'IDR' };
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
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

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) => {
//         const lowerPName = p.name.toLowerCase();
//         const lowerRoot = rootName.toLowerCase();

//         if (!lowerPName.startsWith(lowerRoot)) return false;

//         if (
//           lowerPName.includes("+") ||
//           lowerPName.includes("&") ||
//           lowerPName.includes(" dan ") ||
//           lowerPName.includes(" with ")
//         ) {
//           return false;
//         }

//         const remainder = lowerPName.replace(lowerRoot, "").trim();
//         if (remainder.split(" ").length > 1) return false;

//         return true;
//       });

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
            
//             const localSiblings = allPassedProducts.filter((p: Product) => {
//               const lowerPName = p.name.toLowerCase();
//               const lowerRoot = rootName.toLowerCase();

//               if (!lowerPName.startsWith(lowerRoot)) return false;

//               if (
//                 lowerPName.includes("+") ||
//                 lowerPName.includes("&") ||
//                 lowerPName.includes(" dan ") ||
//                 lowerPName.includes(" with ")
//               ) {
//                 return false;
//               }

//               const remainder = lowerPName.replace(lowerRoot, "").trim();
//               if (remainder.split(" ").length > 1) return false;

//               return true;
//             });

//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           // 👇 [BARU] Panggil API Rekomendasi Secara Asynchronous 👇
//           const fetchRecommendations = async () => {
//             try {
//               const res = await fetch(`${BASE_URL}/api/products/${activeProduct!.id}/recommendations`);
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   setRecommendedProducts(data.data || []);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memuat rekomendasi produk:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus(), fetchRecommendations()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   const isReseller = userType === 'reseller';
  
//   const dynamicPriceObj = getPriceToDisplay(product);
//   const dynamicDiscountObj = getDiscountToDisplay(product);
//   const dynamicWholesaleObj = getWholesaleToDisplay(product);

//   const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//   let finalPriceObj = dynamicPriceObj;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       finalPriceObj = dynamicWholesaleObj!;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       finalPriceObj = dynamicDiscountObj;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//     }
//   }

//   // GTM Event Effect
//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: finalPriceObj.curr,
//           value: finalPriceObj.value,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: finalPriceObj.value,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
    
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * finalPriceObj.value, 
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         is_bundle_active: product!.is_bundle_active,
//         bundle_price: product!.bundle_price,
//         bundle_prices: product!.bundle_prices,
//         bundle_end_date: product!.bundle_end_date,
//         prices: product!.prices,
//         discount_prices: product!.discount_prices,
//         wholesale_prices: product!.wholesale_prices,
//         voucher_discount_prices: product!.voucher_discount_prices,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: finalPriceObj.curr,
//         value: finalPriceObj.value * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: finalPriceObj.value,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-[#006A4E]"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             {/* 👇 Tampilan Harga Final Multi-Currency 👇 */}
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatCurrencyDisplay(dynamicPriceObj)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatCurrencyDisplay(finalPriceObj)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">{t("wholesale_price")}</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatCurrencyDisplay(dynamicPriceObj)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* 👇 [BARU] COLLABORATIVE FILTERING REKOMENDASI PRODUK 👇 */}
//             {recommendedProducts.length > 0 && (
//               <div className="pt-8 mt-16 border-t border-gray-100 animate-fade-in-up">
//                 <h3 className="mb-6 text-xl font-bold tracking-tight text-gray-900 uppercase">
//                   {t("you_may_also_like")}
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                   {recommendedProducts.map((recProd) => (
//                     <div 
//                       key={recProd.id} 
//                       className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 shadow-sm cursor-pointer group hover:shadow-md rounded-2xl"
//                       onClick={() => {
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                         navigate(`${urlPrefix}/product/${recProd.slug}`);
//                       }}
//                     >
//                       <div className="relative overflow-hidden aspect-square bg-gray-50">
//                         <img 
//                           src={recProd.image_url} 
//                           alt={recProd.name} 
//                           className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="flex flex-col flex-grow p-4">
//                         <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">{recProd.category_name}</p>
//                         <h4 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 flex-grow group-hover:text-[#006A4E] transition-colors">
//                           {recProd.name}
//                         </h4>
//                         <p className="font-bold text-[#006A4E]">
//                           {formatCurrencyDisplay(getPriceToDisplay(recProd))}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* 👆 ================================================== 👆 */}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// // [BARU] Import Helmet untuk Dynamic SEO
// import { Helmet } from "react-helmet-async"; 
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   prices?: any;            
//   discount_price: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   is_bundle_active: boolean | number;
//   bundle_price?: number | null;
//   bundle_prices?: Record<string, string | number> | string | null;
//   bundle_end_date?: string | null;
//   voucher_discount_price?: number;
//   voucher_discount_prices?: any; 
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
  
//   const { currency } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   // 👇 [BARU] STATE UNTUK REKOMENDASI PRODUK
//   const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   // ============================================================================
//   // HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: 'IDR' };
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
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

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) => {
//         const lowerPName = p.name.toLowerCase();
//         const lowerRoot = rootName.toLowerCase();

//         if (!lowerPName.startsWith(lowerRoot)) return false;

//         if (
//           lowerPName.includes("+") ||
//           lowerPName.includes("&") ||
//           lowerPName.includes(" dan ") ||
//           lowerPName.includes(" with ")
//         ) {
//           return false;
//         }

//         const remainder = lowerPName.replace(lowerRoot, "").trim();
//         if (remainder.split(" ").length > 1) return false;

//         return true;
//       });

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
            
//             const localSiblings = allPassedProducts.filter((p: Product) => {
//               const lowerPName = p.name.toLowerCase();
//               const lowerRoot = rootName.toLowerCase();

//               if (!lowerPName.startsWith(lowerRoot)) return false;

//               if (
//                 lowerPName.includes("+") ||
//                 lowerPName.includes("&") ||
//                 lowerPName.includes(" dan ") ||
//                 lowerPName.includes(" with ")
//               ) {
//                 return false;
//               }

//               const remainder = lowerPName.replace(lowerRoot, "").trim();
//               if (remainder.split(" ").length > 1) return false;

//               return true;
//             });

//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           // 👇 [BARU] Panggil API Rekomendasi Secara Asynchronous 👇
//           const fetchRecommendations = async () => {
//             try {
//               const res = await fetch(`${BASE_URL}/api/products/${activeProduct!.id}/recommendations`);
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   setRecommendedProducts(data.data || []);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memuat rekomendasi produk:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus(), fetchRecommendations()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   const isReseller = userType === 'reseller';
  
//   const dynamicPriceObj = getPriceToDisplay(product);
//   const dynamicDiscountObj = getDiscountToDisplay(product);
//   const dynamicWholesaleObj = getWholesaleToDisplay(product);

//   const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//   let finalPriceObj = dynamicPriceObj;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       finalPriceObj = dynamicWholesaleObj!;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       finalPriceObj = dynamicDiscountObj;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//     }
//   }

//   // GTM Event Effect
//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: finalPriceObj.curr,
//           value: finalPriceObj.value,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: finalPriceObj.value,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
    
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * finalPriceObj.value, 
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         is_bundle_active: product!.is_bundle_active,
//         bundle_price: product!.bundle_price,
//         bundle_prices: product!.bundle_prices,
//         bundle_end_date: product!.bundle_end_date,
//         prices: product!.prices,
//         discount_prices: product!.discount_prices,
//         wholesale_prices: product!.wholesale_prices,
//         voucher_discount_prices: product!.voucher_discount_prices,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: finalPriceObj.curr,
//         value: finalPriceObj.value * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: finalPriceObj.value,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-[#006A4E]"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   // ============================================================================
//   // [BARU] LOGIKA SEO DINAMIS (OPEN GRAPH)
//   // ============================================================================
//   // Buat deskripsi SEO yang bersih (hapus tag HTML jika ada)
//   const rawDesc = product.description || t("brush_desc") || "";
//   const plainDesc = rawDesc.replace(/<[^>]+>/g, '').substring(0, 140);
//   const seoTitle = `${product.name} | Gycora Essence`;
//   const seoDescription = `Beli ${product.name} seharga ${formatCurrencyDisplay(finalPriceObj)} di Gycora. ${plainDesc}...`;
//   const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
      
//       {/* 👇 [BARU] SUNTIKAN META TAGS SEO DINAMIS KE DALAM HEAD 👇 */}
//       <Helmet>
//         <title>{seoTitle}</title>
//         <meta name="description" content={seoDescription} />

//         {/* Open Graph / Facebook / WhatsApp */}
//         <meta property="og:type" content="product" />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:title" content={seoTitle} />
//         <meta property="og:description" content={seoDescription} />
//         <meta property="og:image" content={product.image_url} />

//         {/* Twitter */}
//         <meta property="twitter:card" content="summary_large_image" />
//         <meta property="twitter:url" content={currentUrl} />
//         <meta property="twitter:title" content={seoTitle} />
//         <meta property="twitter:description" content={seoDescription} />
//         <meta property="twitter:image" content={product.image_url} />
//       </Helmet>
//       {/* 👆 BATAS SEO DINAMIS 👆 */}

//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
//           {/* BAGIAN KIRI: GAMBAR */}
//           <div className="flex flex-col mb-10 lg:mb-0">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             {/* 👇 Tampilan Harga Final Multi-Currency 👇 */}
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatCurrencyDisplay(dynamicPriceObj)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatCurrencyDisplay(finalPriceObj)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">{t("wholesale_price")}</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatCurrencyDisplay(dynamicPriceObj)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* 👇 COLLABORATIVE FILTERING REKOMENDASI PRODUK 👇 */}
//             {recommendedProducts.length > 0 && (
//               <div className="pt-8 mt-16 border-t border-gray-100 animate-fade-in-up">
//                 <h3 className="mb-6 text-xl font-bold tracking-tight text-gray-900 uppercase">
//                   {t("you_may_also_like")}
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                   {recommendedProducts.map((recProd) => (
//                     <div 
//                       key={recProd.id} 
//                       className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 shadow-sm cursor-pointer group hover:shadow-md rounded-2xl"
//                       onClick={() => {
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                         navigate(`${urlPrefix}/product/${recProd.slug}`);
//                       }}
//                     >
//                       <div className="relative overflow-hidden aspect-square bg-gray-50">
//                         <img 
//                           src={recProd.image_url} 
//                           alt={recProd.name} 
//                           className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="flex flex-col flex-grow p-4">
//                         <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">{recProd.category_name}</p>
//                         <h4 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 flex-grow group-hover:text-[#006A4E] transition-colors">
//                           {recProd.name}
//                         </h4>
//                         <p className="font-bold text-[#006A4E]">
//                           {formatCurrencyDisplay(getPriceToDisplay(recProd))}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* 👆 ================================================== 👆 */}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// // [BARU] Import Helmet untuk Dynamic SEO
// import { Helmet } from "react-helmet-async"; 
// import { useCart } from "../../../context/CartContext";
// import { BASE_URL } from "../../../config/api";
// import { useLanguage } from "../../../context/LanguageContext";
// import { useCurrency } from "../../../context/CurrencyContext";

// // =========================================================
// // LOGIKA PREFIX URL PINTAR
// // =========================================================
// const getUrlPrefix = () => {
//   if (location.pathname.startsWith("/id")) return "/id";
//   if (location.pathname.startsWith("/en")) return "/en";
//   return ""; 
// };
// const urlPrefix = getUrlPrefix();

// const colorMapHex: Record<string, string> = {
//   Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
//   Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
//   Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
//   Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
//   Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
//   Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
//   Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
//   Apricot: "#FBCEB1", Ivory: "#FFFFF0", Tan: "#D2B48C", Charcoal: "#36454F", Ash: "#555555",
//   Platinum: "#E5E4E2", Bronze: "#CD7F32", Copper: "#B87333", Rust: "#B7410E", Ochre: "#CC7722",
//   Sienna: "#882D17", Terracotta: "#E2725B", Amber: "#FFBF00", Caramel: "#FFD59A", Honey: "#FFC30B",
//   Chestnut: "#954535", Walnut: "#5C4033", Mahogany: "#C04000", Chocolate: "#7B3F00", Cocoa: "#D2691E",
//   Coffee: "#6F4E37", Mocha: "#493D26", Espresso: "#4B3621", Cappuccino: "#654321", Latte: "#C5A059",
//   Macchiato: "#8B5A2B", Almond: "#EED9C4", Hazelnut: "#C4A484", Pecan: "#8A3324", Pistachio: "#93C572",
//   Seafoam: "#9FE2BF", Turquoise: "#40E0D0", Aqua: "#00FFFF", Azure: "#00FFFF", Sky: "#87CEEB",
//   Cerulean: "#007BA7", Cobalt: "#0047AB", Sapphire: "#0F52BA", Ultramarine: "#120A8F", Lapis: "#26619C",
//   Denim: "#1560BD", Steel: "#4682B4", Slate: "#708090", Gunmetal: "#2a3439", Onyx: "#353839",
//   Jet: "#343434", Ebony: "#555D50", Raven: "#050301", Pitch: "#000000", Obsidian: "#0B0B0B",
//   Carbon: "#333333", Graphite: "#383838", Pewter: "#8E8E8E", Zinc: "#8C92AC", Lead: "#778899",
//   Iron: "#A19D94", Titanium: "#878681", Chromium: "#C0C0C0", Nickel: "#727472", Tungsten: "#A0A0A0",
//   Fuchsia: "#FF00FF", Crimson: "#DC143C", Carmine: "#960018", Ruby: "#E0115F", Scarlet: "#FF2400",
//   Vermilion: "#E34234", Brick: "#CB4154", Tomato: "#FF6347", Papaya: "#FFEFD5", Melon: "#FDBCB4",
//   Mango: "#F4A460", Citrus: "#FFA500", Lemon: "#FFF700", Lime: "#BFFF00", Kiwi: "#8EE53F",
//   Apple: "#8DB600", Pear: "#D1E231", Grape: "#6F2DA8", Plum: "#8E4585", Blackberry: "#4D0135",
//   Mulberry: "#C54B8C", Raisin: "#652DC1", Eggplant: "#614051", Aubergine: "#472C4C", Amethyst: "#9966CC",
//   Orchid: "#DA70D6", Heather: "#D473D4", Thistle: "#D8BFD8", Mauve: "#E0B0FF", Wisteria: "#C9A0DC",
//   Periwinkle: "#CCCCFF", Cornflower: "#6495ED", Baby: "#89CFF0", Powder: "#B0E0E6", Midnight: "#191970",
//   Ocean: "#0077BE",
// };

// const extractColorName = (fullName: string) => {
//   if (!fullName) return "Main";
//   const words = fullName.trim().split(" ");
//   const lastWord = words[words.length - 1];
//   return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
// };

// const extractColorHex = (fullName: string) => {
//   const colorName = extractColorName(fullName);
//   return colorMapHex[colorName] || "#cccccc";
// };

// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       const translated = data.responseData.translatedText;
//       if (translated.includes("MYMEMORY WARNING")) {
//         console.warn("Limit API Translate habis, fallback ke teks asli.");
//         return text;
//       }
//       return translated;
//     }
//     return text;
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks API:", error);
//     return text;
//   }
// };

// type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

// interface Product {
//   id: number;
//   category_id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   slug: string;
//   description: string;
//   benefits: string;
//   price: number;
//   prices?: any;            
//   discount_price: number;
//   discount_prices?: any;   
//   wholesale_price?: number; 
//   wholesale_prices?: any; 
//   is_bundle_active: boolean | number;
//   bundle_price?: number | null;
//   bundle_prices?: Record<string, string | number> | string | null;
//   bundle_end_date?: string | null;
//   voucher_discount_price?: number;
//   voucher_discount_prices?: any; 
//   stock: number;
//   image_url: string;
//   variant_images?: string[];
//   variant_video?: string;
//   color?: any[];
// }

// export default function ProductDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t, lang } = useLanguage();
  
//   const { currency } = useCurrency();

//   const initialPassedData = location.state?.initialProduct;
//   const [product, setProduct] = useState<Product | null>(
//     initialPassedData || null,
//   );

//   const [loading, setLoading] = useState(!initialPassedData);
//   const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

//   const [quantityInput, setQuantityInput] = useState<string>("1");
//   const quantity = parseInt(quantityInput) || 1;

//   const [isBuyingNow, setIsBuyingNow] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const [siblingColors, setSiblingColors] = useState<Product[]>([]);
//   const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
//   const [isFavorited, setIsFavorited] = useState(false);

//   const [activeTab, setActiveTab] = useState("desc");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [apiReviews, setApiReviews] = useState<any[]>([]);

//   const [userType, setUserType] = useState<string>('guest');

//   const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } =
//     useCart();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user_data");
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         setUserType(user.usertype || 'user');
//       } catch (e) {
//         setUserType('guest');
//       }
//     }
//   }, []);

//   // ============================================================================
//   // HELPER HARGA MULTI-CURRENCY
//   // ============================================================================
//   const getPriceToDisplay = (product: Product | null) => {
//     if (!product) return { value: 0, curr: 'IDR' };
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return { value: product.price, curr: 'IDR' };
  
//     const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
//     if (pricesObj[curr]) {
//       return { value: parseFloat(pricesObj[curr]), curr: curr };
//     }
//     return { value: product.price, curr: 'IDR' };
//   };

//   const getDiscountToDisplay = (product: Product | null) => {
//     if (!product) return null;
//     const curr = (currency as Currency) || 'IDR';
//     if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
  
//     const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
//     if (discObj[curr]) {
//       return { value: parseFloat(discObj[curr]), curr: curr };
//     }
//     return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
//   };

//   const getWholesaleToDisplay = (product: Product | null) => {
//     if (!product) return null;
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

//   const fetchSiblingColorsViaAPI = async (productName: string) => {
//     if (!productName) return;
//     try {
//       const words = productName.trim().split(" ");
//       let rootName = productName;

//       if (words.length > 1) {
//         words.pop();
//         rootName = words.join(" ");
//       }

//       const res = await fetch(`${BASE_URL}/api/products`);
//       const data = await res.json();
//       const allProducts = data.data ? data.data : data;

//       const siblings = allProducts.filter((p: Product) => {
//         const lowerPName = p.name.toLowerCase();
//         const lowerRoot = rootName.toLowerCase();

//         if (!lowerPName.startsWith(lowerRoot)) return false;

//         if (
//           lowerPName.includes("+") ||
//           lowerPName.includes("&") ||
//           lowerPName.includes(" dan ") ||
//           lowerPName.includes(" with ")
//         ) {
//           return false;
//         }

//         const remainder = lowerPName.replace(lowerRoot, "").trim();
//         if (remainder.split(" ").length > 1) return false;

//         return true;
//       });

//       if (siblings.length <= 1) {
//         setSiblingColors([]);
//       } else {
//         setSiblingColors(siblings);
//       }
//     } catch (error) {
//       console.error("Gagal menarik data varian warna:", error);
//     }
//   };

//   useEffect(() => {
//     let isCurrentFetchValid = true;
//     const allPassedProducts = location.state?.allProducts;

//     setCurrentImageIndex(0);
//     setQuantityInput("1");
//     setActiveTab("desc");

//     const loadProductData = async () => {
//       let activeProduct: Product | null =
//         location.state?.initialProduct || null;

//       try {
//         if (activeProduct) {
//           if (isCurrentFetchValid) {
//             setProduct(activeProduct);
//             setLoading(false);
//           }

//           if (allPassedProducts && allPassedProducts.length > 0) {
//             const words = activeProduct.name.trim().split(" ");
//             let rootName = activeProduct.name;
//             if (words.length > 1) {
//               words.pop();
//               rootName = words.join(" ");
//             }
            
//             const localSiblings = allPassedProducts.filter((p: Product) => {
//               const lowerPName = p.name.toLowerCase();
//               const lowerRoot = rootName.toLowerCase();

//               if (!lowerPName.startsWith(lowerRoot)) return false;

//               if (
//                 lowerPName.includes("+") ||
//                 lowerPName.includes("&") ||
//                 lowerPName.includes(" dan ") ||
//                 lowerPName.includes(" with ")
//               ) {
//                 return false;
//               }

//               const remainder = lowerPName.replace(lowerRoot, "").trim();
//               if (remainder.split(" ").length > 1) return false;

//               return true;
//             });

//             if (localSiblings.length > 1 && isCurrentFetchValid) {
//               setSiblingColors(localSiblings);
//             }
//           } else {
//             await fetchSiblingColorsViaAPI(activeProduct.name);
//           }
//         } else {
//           if (isCurrentFetchValid) {
//             setLoading(true);
//             setIsFetchingFull(true);
//           }

//           const res = await fetch(`${BASE_URL}/api/products/${slug}`);
//           if (!res.ok) throw new Error("Produk tidak ditemukan");
//           const responseData = await res.json();

//           if (isCurrentFetchValid) {
//             activeProduct = responseData.data
//               ? responseData.data
//               : responseData;
//             setProduct(activeProduct);
//             await fetchSiblingColorsViaAPI(activeProduct!.name);
//           }
//         }

//         if (slug && isCurrentFetchValid && activeProduct) {
//           const fetchReviews = async () => {
//             try {
//               const res = await fetch(
//                 `${BASE_URL}/api/products/${slug}/reviews`,
//                 {
//                   headers: { Accept: "application/json" },
//                 },
//               );
//               if (res.ok) {
//                 const data = await res.json();
//                 let reviewsArr = data.reviews ? data.reviews : [];

//                 if (lang === "en" && reviewsArr.length > 0) {
//                   reviewsArr = await Promise.all(
//                     reviewsArr.map(async (r: any) => {
//                       const translatedComment = await translateText(
//                         r.comment,
//                         "en",
//                       );
//                       return {
//                         ...r,
//                         comment_en: translatedComment,
//                       };
//                     }),
//                   );
//                 }

//                 if (isCurrentFetchValid) {
//                   setApiReviews(reviewsArr);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal menarik data ulasan:", error);
//             }
//           };

//           const checkWishlistStatus = async () => {
//             const token = localStorage.getItem("user_token");
//             if (!token) return;
//             try {
//               const res = await fetch(`${BASE_URL}/api/wishlists`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   Accept: "application/json",
//                 },
//               });
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   const isWished = data.some(
//                     (item: any) => item.product_id === activeProduct!.id,
//                   );
//                   setIsFavorited(isWished);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memeriksa wishlist:", error);
//             }
//           };

//           const fetchRecommendations = async () => {
//             try {
//               const res = await fetch(`${BASE_URL}/api/products/${activeProduct!.id}/recommendations`);
//               if (res.ok) {
//                 const data = await res.json();
//                 if (isCurrentFetchValid) {
//                   setRecommendedProducts(data.data || []);
//                 }
//               }
//             } catch (error) {
//               console.error("Gagal memuat rekomendasi produk:", error);
//             }
//           };

//           Promise.all([fetchReviews(), checkWishlistStatus(), fetchRecommendations()]).finally(() => {
//             if (isCurrentFetchValid) setIsFetchingFull(false);
//           });
//         }
//       } catch (error) {
//         if (isCurrentFetchValid) {
//           console.error("Gagal memuat produk:", error);
//           navigate(`${urlPrefix}/products`);
//         }
//       } finally {
//         if (isCurrentFetchValid) {
//           setLoading(false);
//         }
//       }
//     };

//     loadProductData();

//     return () => {
//       isCurrentFetchValid = false;
//     };
//   }, [slug, navigate, location.state, lang]);

//   const isReseller = userType === 'reseller';
  
//   const dynamicPriceObj = getPriceToDisplay(product);
//   const dynamicDiscountObj = getDiscountToDisplay(product);
//   const dynamicWholesaleObj = getWholesaleToDisplay(product);

//   const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

//   let finalPriceObj = dynamicPriceObj;
//   let isDiscounted = false;
//   let discountPercentage = 0;

//   if (product) {
//     if (isReseller && hasWholesale) {
//       finalPriceObj = dynamicWholesaleObj!;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
//     } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
//       finalPriceObj = dynamicDiscountObj;
//       isDiscounted = true;
//       discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
//     }
//   }

//   useEffect(() => {
//     if (product) {
//       (window as any).dataLayer = (window as any).dataLayer || [];
//       (window as any).dataLayer.push({
//         event: "view_item",
//         ecommerce: {
//           currency: finalPriceObj.curr,
//           value: finalPriceObj.value,
//           items: [
//             {
//               item_id: product.id,
//               item_name: product.name,
//               price: finalPriceObj.value,
//               item_category: product.category_name,
//             },
//           ],
//         },
//       });
//     }
//   }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

//   const handleToggleWishlist = async () => {
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
//         cancelButtonText: t("cancel"),
//       }).then((result) => {
//         if (result.isConfirmed) navigate(`${urlPrefix}/login`);
//       });
//       return;
//     }

//     setIsFavorited(!isFavorited);
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ product_id: product?.id }),
//       });
//       if (!res.ok) throw new Error("Gagal");
//     } catch (error) {
//       setIsFavorited(!isFavorited);
//       console.error(error);
//     }
//   };

//   const gallery = useMemo(() => {
//     if (!product) return [];
//     const imgs = [];
//     if (product.image_url) imgs.push(product.image_url);
//     if (Array.isArray(product.variant_images)) {
//       imgs.push(...product.variant_images);
//     }
//     return imgs;
//   }, [product]);

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + gallery.length) % gallery.length,
//     );

//   const triggerFlyingAnimation = () => {
//     const startEl = document.getElementById("product-image");
//     const endEl = document.getElementById("cart-icon");

//     if (startEl && endEl && gallery.length > 0) {
//       const startRect = startEl.getBoundingClientRect();
//       const endRect = endEl.getBoundingClientRect();

//       const flyingImg = document.createElement("img");
//       flyingImg.src = gallery[currentImageIndex];
//       flyingImg.style.position = "fixed";
//       flyingImg.style.top = `${startRect.top}px`;
//       flyingImg.style.left = `${startRect.left}px`;
//       flyingImg.style.width = `${startRect.width}px`;
//       flyingImg.style.height = `${startRect.height}px`;
//       flyingImg.style.borderRadius = "10%";
//       flyingImg.style.zIndex = "9999";
//       flyingImg.style.transition =
//         "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
//       document.body.appendChild(flyingImg);

//       requestAnimationFrame(() => {
//         flyingImg.style.top = `${endRect.top + 10}px`;
//         flyingImg.style.left = `${endRect.left + 10}px`;
//         flyingImg.style.width = "20px";
//         flyingImg.style.height = "20px";
//         flyingImg.style.opacity = "0.2";
//         flyingImg.style.borderRadius = "50%";
//       });

//       setTimeout(() => {
//         flyingImg.remove();
//         endEl.classList.add("scale-125");
//         setTimeout(() => endEl.classList.remove("scale-125"), 200);
//       }, 800);
//     }
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         text: t("login_required_desc"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//         confirmButtonText: t("to_login_page"),
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     const previousCartState = [...cartItems];
    
//     const optimisticItem = {
//       id: Date.now(),
//       product_id: product!.id,
//       quantity: quantity,
//       gross_amount: quantity * finalPriceObj.value, 
//       color: null,
//       product: {
//         id: product!.id,
//         name: product!.name,
//         slug: product!.slug,
//         price: product!.price,
//         discount_price: product!.discount_price,
//         wholesale_price: product!.wholesale_price,
//         is_bundle_active: product!.is_bundle_active,
//         bundle_price: product!.bundle_price,
//         bundle_prices: product!.bundle_prices,
//         bundle_end_date: product!.bundle_end_date,
//         prices: product!.prices,
//         discount_prices: product!.discount_prices,
//         wholesale_prices: product!.wholesale_prices,
//         voucher_discount_prices: product!.voucher_discount_prices,
//         image_url: product!.image_url,
//         sku: product!.sku,
//         stock: product!.stock,
//         color: "",
//       },
//     };

//     addCartItemOptimistically(optimisticItem);
//     triggerFlyingAnimation();

//     (window as any).dataLayer = (window as any).dataLayer || [];
//     (window as any).dataLayer.push({
//       event: "add_to_cart",
//       ecommerce: {
//         currency: finalPriceObj.curr,
//         value: finalPriceObj.value * quantity,
//         items: [
//           {
//             item_id: product!.id,
//             item_name: product!.name,
//             price: finalPriceObj.value,
//             quantity: quantity,
//             item_category: product!.category_name,
//           },
//         ],
//       },
//     });

//     Swal.fire({
//       title: t("added_to_cart"),
//       icon: "success",
//       toast: true,
//       position: "top-end",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     fetch(`${BASE_URL}/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         product_id: product?.id,
//         quantity: quantity,
//         color: null,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok && data.cart_id) {
//           fetchCart();
//         } else {
//           revertCartItems(previousCartState);
//           Swal.fire(
//             "Error",
//             data.message || "Gagal menambahkan produk",
//             "warning",
//           );
//         }
//       })
//       .catch(() => {
//         revertCartItems(previousCartState);
//         console.error("Gagal terhubung ke server saat add to cart");
//       });
//   };

//   const handleBuyItNow = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: t("login_required"),
//         icon: "info",
//         confirmButtonColor: "#059669",
//       }).then(() => navigate(`${urlPrefix}/login`));
//       return;
//     }

//     setIsBuyingNow(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: product?.id,
//           quantity: quantity,
//           color: null,
//         }),
//       });
//       const data = await res.json();

//       if (res.ok && data.cart_id) {
//         fetchCart();
//         navigate(`${urlPrefix}/checkout`, {
//           state: { selectedIds: [data.cart_id] },
//         });
//       } else {
//         Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setIsBuyingNow(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     if (val === "" || /^\d+$/.test(val)) {
//       setQuantityInput(val);
//     }
//   };

//   const handleInputBlur = () => {
//     let parsed = parseInt(quantityInput);
//     if (isNaN(parsed) || parsed < 1) parsed = 1;
//     if (product && parsed > product.stock) {
//       parsed = product.stock;
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "warning",
//         title: t("product_max_stock_toast", {
//           stock: product.stock.toString(),
//         }),
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//     setQuantityInput(parsed.toString());
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-[#006A4E]"></div>
//       </div>
//     );
//   if (!product) return null;

//   const isOutOfStock = product.stock <= 0;
//   const isFormDisabled = isOutOfStock || isBuyingNow;

//   const handleShare = async () => {
//     const shareData = {
//       title: product?.name,
//       text: `Cek produk keren ini dari Gycora: ${product?.name}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.error("Gagal membagikan:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: t("product_share_toast"),
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const isEtherealBrush = product.name
//     .toLowerCase()
//     .includes("ethereal glow brush");
//   const isScalpCare = product.name.toLowerCase().includes("scalp");

//   const formattedApiReviews = apiReviews.map((r: any) => ({
//     name: r.user?.first_name
//       ? `${r.user.first_name} ${r.user.last_name || ""}`
//       : "Gycora Customer",
//     text: lang === "en" ? r.comment_en || r.comment : r.comment,
//     rating: r.rating || 5,
//     is_verified: true,
//   }));

//   const staticReviews = isEtherealBrush
//     ? [
//         { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
//         { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
//         { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
//         { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
//         { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
//       ]
//     : isScalpCare
//       ? [
//           { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
//         ]
//       : [];
//   const activeReviews = [...formattedApiReviews, ...staticReviews];

//   // ============================================================================
//   // LOGIKA SEO DINAMIS (OPEN GRAPH)
//   // ============================================================================
//   const rawDesc = product.description || t("brush_desc") || "";
//   const plainDesc = rawDesc.replace(/<[^>]+>/g, '').substring(0, 140);
//   const seoTitle = `${product.name} | Gycora Essence`;
//   const seoDescription = `Beli ${product.name} seharga ${formatCurrencyDisplay(finalPriceObj)} di Gycora. ${plainDesc}...`;
//   const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

//   return (
//     <div className="min-h-screen py-12 font-sans bg-white animate-fade-in">
      
//       <Helmet>
//         <title>{seoTitle}</title>
//         <meta name="description" content={seoDescription} />
//         <meta property="og:type" content="product" />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:title" content={seoTitle} />
//         <meta property="og:description" content={seoDescription} />
//         <meta property="og:image" content={product.image_url} />
//         <meta property="twitter:card" content="summary_large_image" />
//         <meta property="twitter:url" content={currentUrl} />
//         <meta property="twitter:title" content={seoTitle} />
//         <meta property="twitter:description" content={seoDescription} />
//         <meta property="twitter:image" content={product.image_url} />
//       </Helmet>

//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
//           {/* 👇 PERBAIKAN: BAGIAN KIRI DIBUAT STICKY 👇 */}
//           <div className="z-10 flex flex-col mb-10 lg:mb-0 lg:sticky lg:top-28 lg:h-fit">
//             <div
//               id="product-image"
//               className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
//             >
//               {/* Badge Diskon di Gambar */}
//               {isDiscounted && (
//                 <div className="absolute z-20 top-6 right-6">
//                   <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
//                     {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
//                   </span>
//                 </div>
//               )}

//               {gallery.length > 0 ? (
//                 <>
//                   {gallery.map((src, idx) => (
//                     <img
//                       key={idx}
//                       src={src}
//                       alt={`${product.name} - Varian ${idx}`}
//                       className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
//                     />
//                   ))}

//                   {gallery.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                       </button>

//                       <button
//                         onClick={nextImage}
//                         className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" /></svg>
//                       </button>

//                       <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
//                         {gallery.map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentImageIndex(idx)}
//                             className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
//                             aria-label={`Lihat gambar ke-${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   {t("no_image")}
//                 </div>
//               )}

//               <div className="absolute z-30 top-6 left-6">
//                 <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
//                   {product.category_name}
//                 </span>
//               </div>
//             </div>

//             {product.variant_video && (
//               <div className="mt-8">
//                 <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
//                   {t("product_video_demo")}
//                 </h3>
//                 <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
//                   <video
//                     src={product.variant_video}
//                     controls
//                     className="object-contain w-full h-64 md:h-80"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* 👆 BATAS PERBAIKAN STICKY 👆 */}

//           {/* BAGIAN KANAN: DETAIL PRODUK */}
//           <div className="flex flex-col justify-center">
//             <div className="flex items-start justify-between gap-4 mb-2">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
//                   title="Bagikan Produk"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
//                 </button>
//                 <button
//                   onClick={handleToggleWishlist}
//                   className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
//                   title="Simpan ke Favorit"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {isEtherealBrush && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("brush_tagline")}
//               </h2>
//             )}
//             {isScalpCare && (
//               <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
//                 {t("scalp_tagline")}
//               </h2>
//             )}

//             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
            
//             <div className="mb-8">
//               {isDiscounted ? (
//                 <div className="flex flex-col">
//                   <span className="text-2xl text-gray-400 line-through">
//                     {formatCurrencyDisplay(dynamicPriceObj)}
//                   </span>
//                   <div className="flex items-end gap-3">
//                     <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
//                       {formatCurrencyDisplay(finalPriceObj)}
//                     </span>
//                     {isReseller && hasWholesale && (
//                        <span className="mb-1 text-sm font-bold text-blue-500">{t("wholesale_price")}</span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-extrabold text-[#006A4E]">
//                   {formatCurrencyDisplay(dynamicPriceObj)}
//                 </p>
//               )}
//             </div>

//             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
//               {siblingColors.length > 0 && (
//                 <div className="pb-6 mb-6 border-b border-gray-200">
//                   <h3 className="mb-3 text-sm font-bold text-gray-700">
//                     {t("select_variant")}
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {siblingColors.map((sibling) => {
//                       const isCurrentProduct = sibling.id === product.id;
//                       return (
//                         <button
//                           key={sibling.id}
//                           onClick={() => {
//                             if (!isCurrentProduct) {
//                               window.scrollTo({ top: 0, behavior: "smooth" });
//                               navigate(`${urlPrefix}/product/${sibling.slug}`, {
//                                 state: {
//                                   initialProduct: sibling,
//                                   allProducts:
//                                     location.state?.allProducts ||
//                                     siblingColors,
//                                 },
//                               });
//                             }
//                           }}
//                           className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${
//                             isCurrentProduct
//                               ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
//                               : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
//                           }`}
//                           title={`Lihat varian ${extractColorName(sibling.name)}`}
//                         >
//                           <span
//                             className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
//                             style={{
//                               backgroundColor: extractColorHex(sibling.name),
//                             }}
//                           ></span>
//                           <span
//                             className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
//                           >
//                             {extractColorName(sibling.name)}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
//                   <button
//                     onClick={() => {
//                       const newVal = Math.max(1, quantity - 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     -
//                   </button>

//                   <input
//                     type="text"
//                     value={quantityInput}
//                     onChange={handleInputChange}
//                     onBlur={handleInputBlur}
//                     disabled={isFormDisabled}
//                     className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
//                   />

//                   <button
//                     onClick={() => {
//                       const newVal = Math.min(product.stock, quantity + 1);
//                       setQuantityInput(newVal.toString());
//                     }}
//                     disabled={isFormDisabled}
//                     className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
//                     }`}
//                   >
//                     {t("add_to_cart")}
//                   </button>

//                   <button
//                     onClick={handleBuyItNow}
//                     disabled={isFormDisabled}
//                     className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${
//                       isOutOfStock
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
//                     }`}
//                   >
//                     {isBuyingNow
//                       ? t("product_cart_processing")
//                       : isOutOfStock
//                         ? t("out_of_stock")
//                         : t("buy_it_now")}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* TAB SECTION */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
//                 <button
//                   onClick={() => setActiveTab("desc")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("description")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("how-to-use")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("how_to_use")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("faq")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("faq")}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("review")}
//                   className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${
//                     activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
//                   }`}
//                 >
//                   {t("review")}
//                 </button>
//               </div>

//               <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
//                 {/* TAB KONTEN */}
//                 {activeTab === "desc" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <p>{t("brush_desc_p1")}</p>
//                         <p>{t("brush_desc_p2")}</p>
//                         <p>{t("brush_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_suitable_1")}</li>
//                               <li>{t("brush_suitable_2")}</li>
//                               <li>{t("brush_suitable_3")}</li>
//                               <li>{t("brush_suitable_4")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("brush_specs_1")}</li>
//                               <li>{t("brush_specs_2")}</li>
//                               <li>{t("brush_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <p>{t("scalp_desc_p1")}</p>
//                         <p>{t("scalp_desc_p2")}</p>
//                         <p>{t("scalp_desc_p3")}</p>
//                         <div className="pt-6 mt-8 border-t border-gray-100">
//                           <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
//                           <ul className="space-y-3 list-none">
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
//                             <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
//                           </ul>
//                         </div>
//                         <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_suitable_1")}</li>
//                               <li>{t("scalp_suitable_2")}</li>
//                               <li>{t("scalp_suitable_3")}</li>
//                               <li>{t("scalp_suitable_4")}</li>
//                               <li>{t("scalp_suitable_5")}</li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
//                             <ul className="space-y-1 list-disc list-inside">
//                               <li>{t("scalp_specs_1")}</li>
//                               <li>{t("scalp_specs_2")}</li>
//                               <li>{t("scalp_specs_3")}</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </>
//                     ) : isFetchingFull && !product.description ? (
//                       <div className="space-y-2 animate-pulse">
//                         <div className="w-full h-3 bg-gray-200 rounded"></div>
//                         <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
//                         <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
//                       </div>
//                     ) : (
//                       product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "how-to-use" && (
//                   <div className="space-y-4 animate-fade-in-up">
//                     <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
//                     {isEtherealBrush ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("brush_guide_1")}</li>
//                         <li>{t("brush_guide_2")}</li>
//                         <li>{t("brush_guide_3")}</li>
//                         <li>{t("brush_guide_4")}</li>
//                       </ul>
//                     ) : isScalpCare ? (
//                       <ul className="space-y-2 list-decimal list-inside">
//                         <li>{t("scalp_guide_1")}</li>
//                         <li>{t("scalp_guide_2")}</li>
//                         <li>{t("scalp_guide_3")}</li>
//                       </ul>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_guide_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "faq" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {isEtherealBrush ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
//                       </>
//                     ) : isScalpCare ? (
//                       <>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
//                         <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
//                       </>
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_faq_empty")}</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "review" && (
//                   <div className="space-y-6 animate-fade-in-up">
//                     {activeReviews.length > 0 ? (
//                       activeReviews.map((review, index) => (
//                         <div key={index} className="pb-4 border-b border-gray-100">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex text-xs text-amber-400">
//                               {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
//                             </div>
//                             <span className="font-bold text-gray-900">{review.name}</span>
//                             {review.is_verified && (
//                               <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="italic text-gray-400">{t("product_review_empty")}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* COLLABORATIVE FILTERING REKOMENDASI PRODUK */}
//             {recommendedProducts.length > 0 && (
//               <div className="pt-8 mt-16 border-t border-gray-100 animate-fade-in-up">
//                 <h3 className="mb-6 text-xl font-bold tracking-tight text-gray-900 uppercase">
//                   {t("you_may_also_like")}
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                   {recommendedProducts.map((recProd) => (
//                     <div 
//                       key={recProd.id} 
//                       className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 shadow-sm cursor-pointer group hover:shadow-md rounded-2xl"
//                       onClick={() => {
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                         navigate(`${urlPrefix}/product/${recProd.slug}`);
//                       }}
//                     >
//                       <div className="relative overflow-hidden aspect-square bg-gray-50">
//                         <img 
//                           src={recProd.image_url} 
//                           alt={recProd.name} 
//                           className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="flex flex-col flex-grow p-4">
//                         <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">{recProd.category_name}</p>
//                         <h4 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 flex-grow group-hover:text-[#006A4E] transition-colors">
//                           {recProd.name}
//                         </h4>
//                         <p className="font-bold text-[#006A4E]">
//                           {formatCurrencyDisplay(getPriceToDisplay(recProd))}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useCart } from "../../../context/CartContext";
import { BASE_URL } from "../../../config/api";
import { useLanguage } from "../../../context/LanguageContext";
import { useCurrency } from "../../../context/CurrencyContext";

// 👇 [BARU] Import Echo & Pusher untuk WebSocket FOMO 👇
import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
    interface Window {
        Pusher: any;
        Echo: any;
    }
}
window.Pusher = Pusher;
// 👆 ================================================== 👆

const getUrlPrefix = () => {
    if (location.pathname.startsWith("/id")) return "/id";
    if (location.pathname.startsWith("/en")) return "/en";
    return "";
};
const urlPrefix = getUrlPrefix();

const colorMapHex: Record<string, string> = {
    Black: "#000000", White: "#FFFFFF", Brown: "#8B4513", Beige: "#F5F5DC", Red: "#8B0000",
    Navy: "#000080", Green: "#008000", Grey: "#808080", Pink: "#FFC0CB", Yellow: "#FFD700",
    Blue: "#4169E1", Mocca: "#967969", Cream: "#FDF4E3", Sage: "#9DC183", Gold: "#D4AF37",
    Orange: "#FF9900", Silver: "#C0C0C0", Maroon: "#800000", Olive: "#808000", Taupe: "#483C32",
    Khaki: "#F0E68C", Mustard: "#FFDB58", Emerald: "#50C878", Coral: "#FF7F50", Mint: "#98FF98",
    Teal: "#008080", Cyan: "#00FFFF", Indigo: "#4B0082", Violet: "#EE82EE", Purple: "#800080",
    Magenta: "#FF00FF", Lilac: "#C8A2C8", Lavender: "#E6E6FA", Rose: "#FF007F", Peach: "#FFE5B4",
    Ocean: "#0077BE",
};

const extractColorName = (fullName: string) => {
    if (!fullName) return "Main";
    const words = fullName.trim().split(" ");
    const lastWord = words[words.length - 1];
    return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
};

const extractColorHex = (fullName: string) => {
    const colorName = extractColorName(fullName);
    return colorMapHex[colorName] || "#cccccc";
};

const translateText = async (text: string, langTo: string): Promise<string> => {
    if (!text) return "";
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`,
        );
        const data = await response.json();
        if (data && data.responseData && data.responseData.translatedText) {
            const translated = data.responseData.translatedText;
            if (translated.includes("MYMEMORY WARNING")) return text;
            return translated;
        }
        return text;
    } catch (error) {
        return text;
    }
};

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

interface Product {
    id: number;
    category_id: number;
    category_name: string;
    sku: string;
    name: string;
    slug: string;
    description: string;
    benefits: string;
    price: number;
    prices?: any;
    discount_price: number;
    discount_prices?: any;
    wholesale_price?: number;
    wholesale_prices?: any;
    is_bundle_active: boolean | number;
    bundle_price?: number | null;
    bundle_prices?: Record<string, string | number> | string | null;
    bundle_end_date?: string | null;
    voucher_discount_price?: number;
    voucher_discount_prices?: any;
    stock: number;
    image_url: string;
    variant_images?: string[];
    variant_video?: string;
    color?: any[];
}

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { t, lang } = useLanguage();

    const { currency } = useCurrency();

    const initialPassedData = location.state?.initialProduct;
    const [product, setProduct] = useState<Product | null>(
        initialPassedData || null,
    );

    const [loading, setLoading] = useState(!initialPassedData);
    const [isFetchingFull, setIsFetchingFull] = useState(!initialPassedData);

    const [quantityInput, setQuantityInput] = useState<string>("1");
    const quantity = parseInt(quantityInput) || 1;

    const [isBuyingNow, setIsBuyingNow] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [siblingColors, setSiblingColors] = useState<Product[]>([]);
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [isFavorited, setIsFavorited] = useState(false);

    const [activeTab, setActiveTab] = useState("desc");
    const [apiReviews, setApiReviews] = useState<any[]>([]);
    const [userType, setUserType] = useState<string>('guest');

    const { fetchCart, cartItems, addCartItemOptimistically, revertCartItems } = useCart();

    // ============================================================================
    // 👇 [BARU] STATE UNTUK FOMO ENGINE 👇
    // ============================================================================
    const [fomoData, setFomoData] = useState<{ type: 'view' | 'purchase', message: string } | null>(null);
    const [activeViewers, setActiveViewers] = useState<number>(Math.floor(Math.random() * 8) + 2); // Acak 2-10 orang awal

    useEffect(() => {
        if (!product) return;

        // 1. Inisialisasi Laravel Echo (Menangkap Notifikasi Pembelian Nyata dari Backend)
        // Pastikan key Pusher sama dengan yang ada di konfigurasi Laravel Abang
        const echoInstance = new Echo({
            broadcaster: "pusher",
            key: "5b29faa8d41035b749a1", // Ganti dengan key pusher/reverb Abang jika berbeda
            cluster: "ap1",
            forceTLS: true,
            authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
        });

        const channel = echoInstance.channel(`product.${product.id}`);

        // Menangkap event riil dari backend (Jika ada orang beli beneran)
        channel.listen('.ProductPurchased', (e: any) => {
            setFomoData({
                type: 'purchase',
                message: `🛒 ${e.buyer_name} dari ${e.city} baru saja membeli produk ini!`
            });
            // Hilangkan pop-up setelah 6 detik
            setTimeout(() => setFomoData(null), 6000);
        });

        channel.listen('.ProductViewed', (e: any) => {
            setActiveViewers(e.viewers_count);
        });

        // 2. Simulasi FOMO Organik (Gimmick Psikologis)
        // Berjalan di latar belakang untuk membuat web terasa HIDUP meski trafik sedang sepi
        const simInterval = setInterval(() => {
            const randomEvent = Math.random();

            if (randomEvent > 0.6) { // 40% probabilitas setiap 12 detik
                // Simulasi jumlah pengunjung berubah
                const newViewers = activeViewers + (Math.floor(Math.random() * 5) - 2);
                const finalViewers = Math.max(3, Math.min(newViewers, 45)); // Jaga agar masuk akal (3-45 orang)
                setActiveViewers(finalViewers);

                // Munculkan notifikasi viewer
                if (Math.random() > 0.5 && !fomoData) {
                    setFomoData({ type: 'view', message: `🔥 ${finalViewers} orang sedang melihat produk ini` });
                    setTimeout(() => setFomoData(null), 4000);
                }
            }
            else if (randomEvent > 0.92 && !fomoData) { // 8% probabilitas ada yang beli bohongan
                const cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Bali', 'Semarang', 'Yogyakarta'];
                const names = ['Budi', 'Siti', 'Andi', 'Rina', 'Dewi', 'Reza', 'Putri', 'Kevin'];
                const c = cities[Math.floor(Math.random() * cities.length)];
                const n = names[Math.floor(Math.random() * names.length)];

                setFomoData({ type: 'purchase', message: `🛒 ${n} dari ${c} baru saja membeli ini!` });
                setTimeout(() => setFomoData(null), 6000);
            }
        }, 12000);

        // Munculkan pop-up pertama kali saat user baru buka halaman (Delay 3 detik)
        const initialTimeout = setTimeout(() => {
            setFomoData({ type: 'view', message: `🔥 ${activeViewers} orang sedang menimbang untuk membeli ini` });
            setTimeout(() => setFomoData(null), 5000);
        }, 3000);

        return () => {
            channel.stopListening('.ProductPurchased');
            channel.stopListening('.ProductViewed');
            echoInstance.leave(`product.${product.id}`);
            clearInterval(simInterval);
            clearTimeout(initialTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.id]);
    // 👆 ============================================================================ 👆

    useEffect(() => {
        const userStr = localStorage.getItem("user_data");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setUserType(user.usertype || 'user');
            } catch (e) {
                setUserType('guest');
            }
        }
    }, []);

    const getPriceToDisplay = (product: Product | null) => {
        if (!product) return { value: 0, curr: 'IDR' };
        const curr = (currency as Currency) || 'IDR';
        if (curr === 'IDR') return { value: product.price, curr: 'IDR' };

        const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
        if (pricesObj[curr]) {
            return { value: parseFloat(pricesObj[curr]), curr: curr };
        }
        return { value: product.price, curr: 'IDR' };
    };

    const getDiscountToDisplay = (product: Product | null) => {
        if (!product) return null;
        const curr = (currency as Currency) || 'IDR';
        if (curr === 'IDR') return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;

        const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
        if (discObj[curr]) {
            return { value: parseFloat(discObj[curr]), curr: curr };
        }
        return product.discount_price ? { value: product.discount_price, curr: 'IDR' } : null;
    };

    const getWholesaleToDisplay = (product: Product | null) => {
        if (!product) return null;
        const curr = (currency as Currency) || 'IDR';
        if (curr === 'IDR') return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;

        const wholesaleObj = typeof product.wholesale_prices === 'string' ? JSON.parse(product.wholesale_prices) : (product.wholesale_prices || {});
        if (wholesaleObj[curr]) {
            return { value: parseFloat(wholesaleObj[curr]), curr: curr };
        }
        return product.wholesale_price ? { value: product.wholesale_price, curr: 'IDR' } : null;
    };

    const formatCurrencyDisplay = (priceObj: { value: number, curr: string } | null) => {
        if (!priceObj) return "";
        const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };

        const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
            minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
            maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
        });

        return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
    };

    const fetchSiblingColorsViaAPI = async (productName: string) => {
        if (!productName) return;
        try {
            const words = productName.trim().split(" ");
            let rootName = productName;

            if (words.length > 1) {
                words.pop();
                rootName = words.join(" ");
            }

            const res = await fetch(`${BASE_URL}/api/products`);
            const data = await res.json();
            const allProducts = data.data ? data.data : data;

            const siblings = allProducts.filter((p: Product) => {
                const lowerPName = p.name.toLowerCase();
                const lowerRoot = rootName.toLowerCase();

                if (!lowerPName.startsWith(lowerRoot)) return false;

                if (
                    lowerPName.includes("+") ||
                    lowerPName.includes("&") ||
                    lowerPName.includes(" dan ") ||
                    lowerPName.includes(" with ")
                ) {
                    return false;
                }

                const remainder = lowerPName.replace(lowerRoot, "").trim();
                if (remainder.split(" ").length > 1) return false;

                return true;
            });

            if (siblings.length <= 1) {
                setSiblingColors([]);
            } else {
                setSiblingColors(siblings);
            }
        } catch (error) {
            console.error("Gagal menarik data varian warna:", error);
        }
    };

    useEffect(() => {
        let isCurrentFetchValid = true;
        const allPassedProducts = location.state?.allProducts;

        setCurrentImageIndex(0);
        setQuantityInput("1");
        setActiveTab("desc");

        const loadProductData = async () => {
            let activeProduct: Product | null =
                location.state?.initialProduct || null;

            try {
                if (activeProduct) {
                    if (isCurrentFetchValid) {
                        setProduct(activeProduct);
                        setLoading(false);
                    }

                    if (allPassedProducts && allPassedProducts.length > 0) {
                        const words = activeProduct.name.trim().split(" ");
                        let rootName = activeProduct.name;
                        if (words.length > 1) {
                            words.pop();
                            rootName = words.join(" ");
                        }

                        const localSiblings = allPassedProducts.filter((p: Product) => {
                            const lowerPName = p.name.toLowerCase();
                            const lowerRoot = rootName.toLowerCase();

                            if (!lowerPName.startsWith(lowerRoot)) return false;

                            if (
                                lowerPName.includes("+") ||
                                lowerPName.includes("&") ||
                                lowerPName.includes(" dan ") ||
                                lowerPName.includes(" with ")
                            ) {
                                return false;
                            }

                            const remainder = lowerPName.replace(lowerRoot, "").trim();
                            if (remainder.split(" ").length > 1) return false;

                            return true;
                        });

                        if (localSiblings.length > 1 && isCurrentFetchValid) {
                            setSiblingColors(localSiblings);
                        }
                    } else {
                        await fetchSiblingColorsViaAPI(activeProduct.name);
                    }
                } else {
                    if (isCurrentFetchValid) {
                        setLoading(true);
                        setIsFetchingFull(true);
                    }

                    const res = await fetch(`${BASE_URL}/api/products/${slug}`);
                    if (!res.ok) throw new Error("Produk tidak ditemukan");
                    const responseData = await res.json();

                    if (isCurrentFetchValid) {
                        activeProduct = responseData.data
                            ? responseData.data
                            : responseData;
                        setProduct(activeProduct);
                        await fetchSiblingColorsViaAPI(activeProduct!.name);
                    }
                }

                if (slug && isCurrentFetchValid && activeProduct) {
                    const fetchReviews = async () => {
                        try {
                            const res = await fetch(
                                `${BASE_URL}/api/products/${slug}/reviews`,
                                {
                                    headers: { Accept: "application/json" },
                                },
                            );
                            if (res.ok) {
                                const data = await res.json();
                                let reviewsArr = data.reviews ? data.reviews : [];

                                if (lang === "en" && reviewsArr.length > 0) {
                                    reviewsArr = await Promise.all(
                                        reviewsArr.map(async (r: any) => {
                                            const translatedComment = await translateText(
                                                r.comment,
                                                "en",
                                            );
                                            return {
                                                ...r,
                                                comment_en: translatedComment,
                                            };
                                        }),
                                    );
                                }

                                if (isCurrentFetchValid) {
                                    setApiReviews(reviewsArr);
                                }
                            }
                        } catch (error) {
                            console.error("Gagal menarik data ulasan:", error);
                        }
                    };

                    const checkWishlistStatus = async () => {
                        const token = localStorage.getItem("user_token");
                        if (!token) return;
                        try {
                            const res = await fetch(`${BASE_URL}/api/wishlists`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: "application/json",
                                },
                            });
                            if (res.ok) {
                                const data = await res.json();
                                if (isCurrentFetchValid) {
                                    const isWished = data.some(
                                        (item: any) => item.product_id === activeProduct!.id,
                                    );
                                    setIsFavorited(isWished);
                                }
                            }
                        } catch (error) {
                            console.error("Gagal memeriksa wishlist:", error);
                        }
                    };

                    const fetchRecommendations = async () => {
                        try {
                            const res = await fetch(`${BASE_URL}/api/products/${activeProduct!.id}/recommendations`);
                            if (res.ok) {
                                const data = await res.json();
                                if (isCurrentFetchValid) {
                                    setRecommendedProducts(data.data || []);
                                }
                            }
                        } catch (error) {
                            console.error("Gagal memuat rekomendasi produk:", error);
                        }
                    };

                    Promise.all([fetchReviews(), checkWishlistStatus(), fetchRecommendations()]).finally(() => {
                        if (isCurrentFetchValid) setIsFetchingFull(false);
                    });
                }
            } catch (error) {
                if (isCurrentFetchValid) {
                    console.error("Gagal memuat produk:", error);
                    navigate(`${urlPrefix}/products`);
                }
            } finally {
                if (isCurrentFetchValid) {
                    setLoading(false);
                }
            }
        };

        loadProductData();

        return () => {
            isCurrentFetchValid = false;
        };
    }, [slug, navigate, location.state, lang]);

    const isReseller = userType === 'reseller';

    const dynamicPriceObj = getPriceToDisplay(product);
    const dynamicDiscountObj = getDiscountToDisplay(product);
    const dynamicWholesaleObj = getWholesaleToDisplay(product);

    const hasWholesale = dynamicWholesaleObj && dynamicWholesaleObj.value > 0;

    let finalPriceObj = dynamicPriceObj;
    let isDiscounted = false;
    let discountPercentage = 0;

    if (product) {
        if (isReseller && hasWholesale) {
            finalPriceObj = dynamicWholesaleObj!;
            isDiscounted = true;
            discountPercentage = Math.round(((dynamicPriceObj.value - dynamicWholesaleObj!.value) / dynamicPriceObj.value) * 100);
        } else if (dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value) {
            finalPriceObj = dynamicDiscountObj;
            isDiscounted = true;
            discountPercentage = Math.round(((dynamicPriceObj.value - dynamicDiscountObj.value) / dynamicPriceObj.value) * 100);
        }
    }

    useEffect(() => {
        if (product) {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
                event: "view_item",
                ecommerce: {
                    currency: finalPriceObj.curr,
                    value: finalPriceObj.value,
                    items: [
                        {
                            item_id: product.id,
                            item_name: product.name,
                            price: finalPriceObj.value,
                            item_category: product.category_name,
                        },
                    ],
                },
            });
        }
    }, [product?.id, finalPriceObj.value, finalPriceObj.curr]);

    const handleToggleWishlist = async () => {
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
                cancelButtonText: t("cancel"),
            }).then((result) => {
                if (result.isConfirmed) navigate(`${urlPrefix}/login`);
            });
            return;
        }

        setIsFavorited(!isFavorited);
        try {
            const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify({ product_id: product?.id }),
            });
            if (!res.ok) throw new Error("Gagal");
        } catch (error) {
            setIsFavorited(!isFavorited);
            console.error(error);
        }
    };

    const gallery = useMemo(() => {
        if (!product) return [];
        const imgs = [];
        if (product.image_url) imgs.push(product.image_url);
        if (Array.isArray(product.variant_images)) {
            imgs.push(...product.variant_images);
        }
        return imgs;
    }, [product]);

    const nextImage = () =>
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    const prevImage = () =>
        setCurrentImageIndex(
            (prev) => (prev - 1 + gallery.length) % gallery.length,
        );

    const triggerFlyingAnimation = () => {
        const startEl = document.getElementById("product-image");
        const endEl = document.getElementById("cart-icon");

        if (startEl && endEl && gallery.length > 0) {
            const startRect = startEl.getBoundingClientRect();
            const endRect = endEl.getBoundingClientRect();

            const flyingImg = document.createElement("img");
            flyingImg.src = gallery[currentImageIndex];
            flyingImg.style.position = "fixed";
            flyingImg.style.top = `${startRect.top}px`;
            flyingImg.style.left = `${startRect.left}px`;
            flyingImg.style.width = `${startRect.width}px`;
            flyingImg.style.height = `${startRect.height}px`;
            flyingImg.style.borderRadius = "10%";
            flyingImg.style.zIndex = "9999";
            flyingImg.style.transition =
                "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            document.body.appendChild(flyingImg);

            requestAnimationFrame(() => {
                flyingImg.style.top = `${endRect.top + 10}px`;
                flyingImg.style.left = `${endRect.left + 10}px`;
                flyingImg.style.width = "20px";
                flyingImg.style.height = "20px";
                flyingImg.style.opacity = "0.2";
                flyingImg.style.borderRadius = "50%";
            });

            setTimeout(() => {
                flyingImg.remove();
                endEl.classList.add("scale-125");
                setTimeout(() => endEl.classList.remove("scale-125"), 200);
            }, 800);
        }
    };

    const handleAddToCart = () => {
        const token = localStorage.getItem("user_token");
        if (!token) {
            Swal.fire({
                title: t("login_required"),
                text: t("login_required_desc"),
                icon: "info",
                confirmButtonColor: "#059669",
                confirmButtonText: t("to_login_page"),
            }).then(() => navigate(`${urlPrefix}/login`));
            return;
        }

        const previousCartState = [...cartItems];

        const optimisticItem = {
            id: Date.now(),
            product_id: product!.id,
            quantity: quantity,
            gross_amount: quantity * finalPriceObj.value,
            color: null,
            product: {
                id: product!.id,
                name: product!.name,
                slug: product!.slug,
                price: product!.price,
                discount_price: product!.discount_price,
                wholesale_price: product!.wholesale_price,
                is_bundle_active: product!.is_bundle_active,
                bundle_price: product!.bundle_price,
                bundle_prices: product!.bundle_prices,
                bundle_end_date: product!.bundle_end_date,
                prices: product!.prices,
                discount_prices: product!.discount_prices,
                wholesale_prices: product!.wholesale_prices,
                voucher_discount_prices: product!.voucher_discount_prices,
                image_url: product!.image_url,
                sku: product!.sku,
                stock: product!.stock,
                color: "",
            },
        };

        addCartItemOptimistically(optimisticItem);
        triggerFlyingAnimation();

        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
            event: "add_to_cart",
            ecommerce: {
                currency: finalPriceObj.curr,
                value: finalPriceObj.value * quantity,
                items: [
                    {
                        item_id: product!.id,
                        item_name: product!.name,
                        price: finalPriceObj.value,
                        quantity: quantity,
                        item_category: product!.category_name,
                    },
                ],
            },
        });

        Swal.fire({
            title: t("added_to_cart"),
            icon: "success",
            toast: true,
            position: "top-end",
            timer: 1500,
            showConfirmButton: false,
        });

        fetch(`${BASE_URL}/api/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                product_id: product?.id,
                quantity: quantity,
                color: null,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok && data.cart_id) {
                    fetchCart();
                } else {
                    revertCartItems(previousCartState);
                    Swal.fire(
                        "Error",
                        data.message || "Gagal menambahkan produk",
                        "warning",
                    );
                }
            })
            .catch(() => {
                revertCartItems(previousCartState);
                console.error("Gagal terhubung ke server saat add to cart");
            });
    };

    const handleBuyItNow = async () => {
        const token = localStorage.getItem("user_token");
        if (!token) {
            Swal.fire({
                title: t("login_required"),
                icon: "info",
                confirmButtonColor: "#059669",
            }).then(() => navigate(`${urlPrefix}/login`));
            return;
        }

        setIsBuyingNow(true);
        try {
            const res = await fetch(`${BASE_URL}/api/carts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_id: product?.id,
                    quantity: quantity,
                    color: null,
                }),
            });
            const data = await res.json();

            if (res.ok && data.cart_id) {
                fetchCart();
                navigate(`${urlPrefix}/checkout`, {
                    state: { selectedIds: [data.cart_id] },
                });
            } else {
                Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Gagal terhubung ke server", "error");
        } finally {
            setIsBuyingNow(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "" || /^\d+$/.test(val)) {
            setQuantityInput(val);
        }
    };

    const handleInputBlur = () => {
        let parsed = parseInt(quantityInput);
        if (isNaN(parsed) || parsed < 1) parsed = 1;
        if (product && parsed > product.stock) {
            parsed = product.stock;
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "warning",
                title: t("product_max_stock_toast", {
                    stock: product.stock.toString(),
                }),
                showConfirmButton: false,
                timer: 2000,
            });
        }
        setQuantityInput(parsed.toString());
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen font-sans bg-white">
                <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-[#006A4E]"></div>
            </div>
        );
    if (!product) return null;

    const isOutOfStock = product.stock <= 0;
    const isFormDisabled = isOutOfStock || isBuyingNow;

    const handleShare = async () => {
        const shareData = {
            title: product?.name,
            text: `Cek produk keren ini dari Gycora: ${product?.name}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Gagal membagikan:", err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: t("product_share_toast"),
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const isEtherealBrush = product.name
        .toLowerCase()
        .includes("ethereal glow brush");
    const isScalpCare = product.name.toLowerCase().includes("scalp");

    const formattedApiReviews = apiReviews.map((r: any) => ({
        name: r.user?.first_name
            ? `${r.user.first_name} ${r.user.last_name || ""}`
            : "Gycora Customer",
        text: lang === "en" ? r.comment_en || r.comment : r.comment,
        rating: r.rating || 5,
        is_verified: true,
    }));

    const staticReviews = isEtherealBrush
        ? [
            { name: "Claudiasunshinee", text: t("review_brush_1"), rating: 5, is_verified: true },
            { name: "Nilasetiobudii", text: t("review_brush_2"), rating: 5, is_verified: true },
            { name: "Thaliastanley___", text: t("review_brush_3"), rating: 5, is_verified: true },
            { name: "Herlenasutanto", text: t("review_brush_4"), rating: 5, is_verified: true },
            { name: "Anitaa_bee", text: t("review_brush_5"), rating: 5, is_verified: true },
        ]
        : isScalpCare
            ? [
                { name: "v*****b", text: t("review_scalp_1"), rating: 5, is_verified: true },
            ]
            : [];
    const activeReviews = [...formattedApiReviews, ...staticReviews];

    const rawDesc = product.description || t("brush_desc") || "";
    const plainDesc = rawDesc.replace(/<[^>]+>/g, '').substring(0, 140);
    const seoTitle = `${product.name} | Gycora Essence`;
    const seoDescription = `Beli ${product.name} seharga ${formatCurrencyDisplay(finalPriceObj)} di Gycora. ${plainDesc}...`;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="min-h-screen py-12 font-sans bg-white animate-fade-in relative">

            {/* ========================================================= */}
            {/* 👇 FOMO WIDGET (Muncul Dinamis di Sudut Kiri Bawah) 👇 */}
            {/* ========================================================= */}
            <div
                className={`fixed bottom-6 left-6 z-[9999] transition-all duration-700 ease-in-out transform ${fomoData ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
                    }`}
            >
                {fomoData && (
                    <div className={`flex items-center gap-3 px-5 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-2xl border backdrop-blur-md ${fomoData.type === 'purchase' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800' : 'bg-white/95 border-gray-200 text-gray-800'}`}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${fomoData.type === 'purchase' ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                            <span className="text-xl">{fomoData.type === 'purchase' ? '🛒' : '🔥'}</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold leading-tight max-w-[200px]">{fomoData.message}</p>
                            <p className="text-[9px] text-gray-500 mt-0.5 tracking-widest uppercase opacity-80">Baru Saja</p>
                        </div>
                    </div>
                )}
            </div>
            {/* 👆 ========================================================= 👆 */}

            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta property="og:type" content="product" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={product.image_url} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={currentUrl} />
                <meta property="twitter:title" content={seoTitle} />
                <meta property="twitter:description" content={seoDescription} />
                <meta property="twitter:image" content={product.image_url} />
            </Helmet>

            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16">

                    <div className="z-10 flex flex-col mb-10 lg:mb-0 lg:sticky lg:top-28 lg:h-fit">
                        <div
                            id="product-image"
                            className="relative flex items-center justify-center p-4 overflow-hidden border border-gray-100 group bg-gray-50/50 rounded-3xl aspect-square md:p-8"
                        >
                            {isDiscounted && (
                                <div className="absolute z-20 top-6 right-6">
                                    <span className={`px-4 py-2 text-sm font-bold text-white rounded-full shadow-md ${isReseller && hasWholesale ? 'bg-blue-600' : 'bg-red-600'}`}>
                                        {isReseller && hasWholesale ? 'GROSIR' : `-${discountPercentage}%`}
                                    </span>
                                </div>
                            )}

                            {gallery.length > 0 ? (
                                <>
                                    {gallery.map((src, idx) => (
                                        <img
                                            key={idx}
                                            src={src}
                                            alt={`${product.name} - Varian ${idx}`}
                                            className={`absolute inset-0 object-contain object-center w-full h-full p-4 md:p-8 transition-opacity duration-300 ease-in-out ${idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                                        />
                                    ))}

                                    {gallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            </button>

                                            <button
                                                onClick={nextImage}
                                                className="absolute z-30 p-3 text-gray-800 transition-opacity -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100 focus:outline-none"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" /></svg>
                                            </button>

                                            <div className="absolute left-0 right-0 z-30 flex items-center justify-center gap-2 bottom-6">
                                                {gallery.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentImageIndex(idx)}
                                                        className={`h-2 rounded-full transition-all shadow-sm focus:outline-none ${idx === currentImageIndex ? "bg-[#006A4E] w-6" : "bg-gray-300 hover:bg-gray-400 w-2"}`}
                                                        aria-label={`Lihat gambar ke-${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-gray-400">
                                    {t("no_image")}
                                </div>
                            )}

                            <div className="absolute z-30 top-6 left-6">
                                <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
                                    {product.category_name}
                                </span>
                            </div>
                        </div>

                        {product.variant_video && (
                            <div className="mt-8">
                                <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
                                    {t("product_video_demo")}
                                </h3>
                                <div className="overflow-hidden bg-black shadow-sm rounded-3xl">
                                    <video
                                        src={product.variant_video}
                                        controls
                                        className="object-contain w-full h-64 md:h-80"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BAGIAN KANAN: DETAIL PRODUK */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center justify-center w-12 h-12 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:text-[#006A4E]"
                                    title="Bagikan Produk"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                </button>
                                <button
                                    onClick={handleToggleWishlist}
                                    className="flex items-center justify-center w-12 h-12 transition-colors bg-white border border-gray-200 rounded-full shadow-sm shrink-0 hover:bg-gray-50"
                                    title="Simpan ke Favorit"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {isEtherealBrush && (
                            <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
                                {t("brush_tagline")}
                            </h2>
                        )}
                        {isScalpCare && (
                            <h2 className="mb-4 text-lg font-bold text-[#006A4E]">
                                {t("scalp_tagline")}
                            </h2>
                        )}

                        <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>

                        <div className="mb-8">
                            {isDiscounted ? (
                                <div className="flex flex-col">
                                    <span className="text-2xl text-gray-400 line-through">
                                        {formatCurrencyDisplay(dynamicPriceObj)}
                                    </span>
                                    <div className="flex items-end gap-3">
                                        <span className={`text-4xl font-extrabold ${isReseller && hasWholesale ? 'text-blue-600' : 'text-red-600'}`}>
                                            {formatCurrencyDisplay(finalPriceObj)}
                                        </span>
                                        {isReseller && hasWholesale && (
                                            <span className="mb-1 text-sm font-bold text-blue-500">{t("wholesale_price")}</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-4xl font-extrabold text-[#006A4E]">
                                    {formatCurrencyDisplay(dynamicPriceObj)}
                                </p>
                            )}
                        </div>

                        <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
                            {siblingColors.length > 0 && (
                                <div className="pb-6 mb-6 border-b border-gray-200">
                                    <h3 className="mb-3 text-sm font-bold text-gray-700">
                                        {t("select_variant")}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {siblingColors.map((sibling) => {
                                            const isCurrentProduct = sibling.id === product.id;
                                            return (
                                                <button
                                                    key={sibling.id}
                                                    onClick={() => {
                                                        if (!isCurrentProduct) {
                                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                                            navigate(`${urlPrefix}/product/${sibling.slug}`, {
                                                                state: {
                                                                    initialProduct: sibling,
                                                                    allProducts:
                                                                        location.state?.allProducts ||
                                                                        siblingColors,
                                                                },
                                                            });
                                                        }
                                                    }}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all shadow-sm ${isCurrentProduct
                                                            ? "border-[#006A4E] ring-2 ring-[#006A4E]/30 scale-105 cursor-default"
                                                            : "border-gray-200 hover:border-gray-300 hover:scale-105 cursor-pointer bg-white"
                                                        }`}
                                                    title={`Lihat varian ${extractColorName(sibling.name)}`}
                                                >
                                                    <span
                                                        className="w-5 h-5 border border-gray-300 rounded-full shadow-inner"
                                                        style={{
                                                            backgroundColor: extractColorHex(sibling.name),
                                                        }}
                                                    ></span>
                                                    <span
                                                        className={`text-xs font-bold ${isCurrentProduct ? "text-[#006A4E]" : "text-gray-700"}`}
                                                    >
                                                        {extractColorName(sibling.name)}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between w-full overflow-hidden bg-white border border-gray-300 h-14 rounded-xl">
                                    <button
                                        onClick={() => {
                                            const newVal = Math.max(1, quantity - 1);
                                            setQuantityInput(newVal.toString());
                                        }}
                                        disabled={isFormDisabled}
                                        className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
                                    >
                                        -
                                    </button>

                                    <input
                                        type="text"
                                        value={quantityInput}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        disabled={isFormDisabled}
                                        className="w-full h-full font-bold text-center text-gray-900 bg-transparent outline-none appearance-none focus:ring-0"
                                    />

                                    <button
                                        onClick={() => {
                                            const newVal = Math.min(product.stock, quantity + 1);
                                            setQuantityInput(newVal.toString());
                                        }}
                                        disabled={isFormDisabled}
                                        className="flex items-center justify-center h-full text-gray-600 transition-colors w-14 hover:text-[#006A4E] hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isFormDisabled}
                                        className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all border-2 focus:outline-none ${isOutOfStock
                                                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-white border-[#006A4E] text-[#006A4E] hover:bg-emerald-50 active:scale-95"
                                            }`}
                                    >
                                        {t("add_to_cart")}
                                    </button>

                                    <button
                                        onClick={handleBuyItNow}
                                        disabled={isFormDisabled}
                                        className={`flex items-center justify-center h-14 rounded-xl text-sm md:text-base font-bold tracking-widest uppercase transition-all focus:outline-none ${isOutOfStock
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-[#006A4E] text-white hover:bg-emerald-900 shadow-[0_4px_14px_0_rgba(0,106,78,0.39)] hover:-translate-y-0.5 active:scale-95"
                                            }`}
                                    >
                                        {isBuyingNow
                                            ? t("product_cart_processing")
                                            : isOutOfStock
                                                ? t("out_of_stock")
                                                : t("buy_it_now")}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* TAB SECTION */}
                        <div className="mt-4">
                            <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-gray-100">
                                <button
                                    onClick={() => setActiveTab("desc")}
                                    className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${activeTab === "desc" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                                        }`}
                                >
                                    {t("description")}
                                </button>
                                <button
                                    onClick={() => setActiveTab("how-to-use")}
                                    className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${activeTab === "how-to-use" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                                        }`}
                                >
                                    {t("how_to_use")}
                                </button>
                                <button
                                    onClick={() => setActiveTab("faq")}
                                    className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${activeTab === "faq" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                                        }`}
                                >
                                    {t("faq")}
                                </button>
                                <button
                                    onClick={() => setActiveTab("review")}
                                    className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors focus:outline-none ${activeTab === "review" ? "bg-[#006A4E] text-white" : "bg-emerald-50 text-[#006A4E] hover:bg-emerald-100"
                                        }`}
                                >
                                    {t("review")}
                                </button>
                            </div>

                            <div className="text-gray-600 prose-sm prose whitespace-pre-wrap sm:prose max-w-none min-h-[200px]">
                                {/* TAB KONTEN */}
                                {activeTab === "desc" && (
                                    <div className="space-y-4 animate-fade-in-up">
                                        {isEtherealBrush ? (
                                            <>
                                                <p>{t("brush_desc_p1")}</p>
                                                <p>{t("brush_desc_p2")}</p>
                                                <p>{t("brush_desc_p3")}</p>
                                                <div className="pt-6 mt-8 border-t border-gray-100">
                                                    <h4 className="mb-4 font-bold text-gray-900 text-md">{t("brush_benefits_title")}</h4>
                                                    <ul className="space-y-3 list-none">
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_1_bold")}</strong>{t("brush_benefit_1_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_2_bold")}</strong>{t("brush_benefit_2_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_3_bold")}</strong>{t("brush_benefit_3_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_4_bold")}</strong>{t("brush_benefit_4_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("brush_benefit_5_bold")}</strong>{t("brush_benefit_5_text")}</div></li>
                                                    </ul>
                                                </div>
                                                <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
                                                    <div>
                                                        <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_suitable_title")}</h4>
                                                        <ul className="space-y-1 list-disc list-inside">
                                                            <li>{t("brush_suitable_1")}</li>
                                                            <li>{t("brush_suitable_2")}</li>
                                                            <li>{t("brush_suitable_3")}</li>
                                                            <li>{t("brush_suitable_4")}</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="mb-3 font-bold text-gray-900 text-md">{t("brush_specs_title")}</h4>
                                                        <ul className="space-y-1 list-disc list-inside">
                                                            <li>{t("brush_specs_1")}</li>
                                                            <li>{t("brush_specs_2")}</li>
                                                            <li>{t("brush_specs_3")}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </>
                                        ) : isScalpCare ? (
                                            <>
                                                <p>{t("scalp_desc_p1")}</p>
                                                <p>{t("scalp_desc_p2")}</p>
                                                <p>{t("scalp_desc_p3")}</p>
                                                <div className="pt-6 mt-8 border-t border-gray-100">
                                                    <h4 className="mb-4 font-bold text-gray-900 text-md">{t("scalp_benefits_title")}</h4>
                                                    <ul className="space-y-3 list-none">
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_1_bold")}</strong>{t("scalp_benefit_1_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_2_bold")}</strong>{t("scalp_benefit_2_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_3_bold")}</strong>{t("scalp_benefit_3_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_4_bold")}</strong>{t("scalp_benefit_4_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_5_bold")}</strong>{t("scalp_benefit_5_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_6_bold")}</strong>{t("scalp_benefit_6_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_7_bold")}</strong>{t("scalp_benefit_7_text")}</div></li>
                                                        <li className="flex gap-2"><span>✨</span> <div><strong>{t("scalp_benefit_8_bold")}</strong>{t("scalp_benefit_8_text")}</div></li>
                                                    </ul>
                                                </div>
                                                <div className="grid grid-cols-1 gap-6 pt-6 mt-8 border-t border-gray-100 md:grid-cols-2">
                                                    <div>
                                                        <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_suitable_title")}</h4>
                                                        <ul className="space-y-1 list-disc list-inside">
                                                            <li>{t("scalp_suitable_1")}</li>
                                                            <li>{t("scalp_suitable_2")}</li>
                                                            <li>{t("scalp_suitable_3")}</li>
                                                            <li>{t("scalp_suitable_4")}</li>
                                                            <li>{t("scalp_suitable_5")}</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="mb-3 font-bold text-gray-900 text-md">{t("scalp_specs_title")}</h4>
                                                        <ul className="space-y-1 list-disc list-inside">
                                                            <li>{t("scalp_specs_1")}</li>
                                                            <li>{t("scalp_specs_2")}</li>
                                                            <li>{t("scalp_specs_3")}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </>
                                        ) : isFetchingFull && !product.description ? (
                                            <div className="space-y-2 animate-pulse">
                                                <div className="w-full h-3 bg-gray-200 rounded"></div>
                                                <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                                                <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
                                            </div>
                                        ) : (
                                            product.description || <p className="italic text-gray-400">{t("product_desc_empty")}</p>
                                        )}
                                    </div>
                                )}

                                {activeTab === "how-to-use" && (
                                    <div className="space-y-4 animate-fade-in-up">
                                        <h4 className="font-bold text-gray-900">{t("guide_title")}</h4>
                                        {isEtherealBrush ? (
                                            <ul className="space-y-2 list-decimal list-inside">
                                                <li>{t("brush_guide_1")}</li>
                                                <li>{t("brush_guide_2")}</li>
                                                <li>{t("brush_guide_3")}</li>
                                                <li>{t("brush_guide_4")}</li>
                                            </ul>
                                        ) : isScalpCare ? (
                                            <ul className="space-y-2 list-decimal list-inside">
                                                <li>{t("scalp_guide_1")}</li>
                                                <li>{t("scalp_guide_2")}</li>
                                                <li>{t("scalp_guide_3")}</li>
                                            </ul>
                                        ) : (
                                            <p className="italic text-gray-400">{t("product_guide_empty")}</p>
                                        )}
                                    </div>
                                )}

                                {activeTab === "faq" && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        {isEtherealBrush ? (
                                            <>
                                                <div><h5 className="font-bold text-gray-900">{t("brush_faq_q1")}</h5><p className="mt-1">{t("brush_faq_a1")}</p></div>
                                                <div><h5 className="font-bold text-gray-900">{t("brush_faq_q2")}</h5><p className="mt-1">{t("brush_faq_a2")}</p></div>
                                            </>
                                        ) : isScalpCare ? (
                                            <>
                                                <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q1")}</h5><p className="mt-1">{t("scalp_faq_a1")}</p></div>
                                                <div><h5 className="font-bold text-gray-900">{t("scalp_faq_q2")}</h5><p className="mt-1">{t("scalp_faq_a2")}</p></div>
                                            </>
                                        ) : (
                                            <p className="italic text-gray-400">{t("product_faq_empty")}</p>
                                        )}
                                    </div>
                                )}

                                {activeTab === "review" && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        {activeReviews.length > 0 ? (
                                            activeReviews.map((review, index) => (
                                                <div key={index} className="pb-4 border-b border-gray-100">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex text-xs text-amber-400">
                                                            {[...Array(review.rating || 5)].map((_, i) => (<span key={i}>★</span>))}
                                                        </div>
                                                        <span className="font-bold text-gray-900">{review.name}</span>
                                                        {review.is_verified && (
                                                            <span className="px-2 py-0.5 ml-2 text-[10px] font-bold text-[#006A4E] bg-emerald-50 rounded-full">{t("product_verified_buyer")}</span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 whitespace-pre-line">"{review.text}"</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="italic text-gray-400">{t("product_review_empty")}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COLLABORATIVE FILTERING REKOMENDASI PRODUK */}
                        {recommendedProducts.length > 0 && (
                            <div className="pt-8 mt-16 border-t border-gray-100 animate-fade-in-up">
                                <h3 className="mb-6 text-xl font-bold tracking-tight text-gray-900 uppercase">
                                    {t("you_may_also_like")}
                                </h3>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {recommendedProducts.map((recProd) => (
                                        <div
                                            key={recProd.id}
                                            className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 shadow-sm cursor-pointer group hover:shadow-md rounded-2xl"
                                            onClick={() => {
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                                navigate(`${urlPrefix}/product/${recProd.slug}`);
                                            }}
                                        >
                                            <div className="relative overflow-hidden aspect-square bg-gray-50">
                                                <img
                                                    src={recProd.image_url}
                                                    alt={recProd.name}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-grow p-4">
                                                <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">{recProd.category_name}</p>
                                                <h4 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 flex-grow group-hover:text-[#006A4E] transition-colors">
                                                    {recProd.name}
                                                </h4>
                                                <p className="font-bold text-[#006A4E]">
                                                    {formatCurrencyDisplay(getPriceToDisplay(recProd))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}