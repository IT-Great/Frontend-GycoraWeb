/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import logoGycora from "../assets/gycora_logo.png";
import { BASE_URL } from "../config/api";

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";
const availableCurrencies: Currency[] = [
  "IDR",
  "USD",
  "SGD",
  "MYR",
  "EUR",
  "AUD",
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const { cartTotalItems } = useCart();
  const { lang, setLang, t } = useLanguage();
  
  // 👇 [PERBAIKAN] Ambil currency dan exchangeRates dari Context 👇
  const { currency, setCurrency, exchangeRates } = useCurrency();
  
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isMobileAboutMenuOpen, setIsMobileAboutMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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

  // =========================================================
  // LOGIKA PREFIX URL PINTAR
  // =========================================================
  const getUrlPrefix = () => {
    if (location.pathname.startsWith("/id")) return "/id";
    if (location.pathname.startsWith("/en")) return "/en";
    return ""; 
  };
  const urlPrefix = getUrlPrefix();

  // ============================================================================
  // [BARU] HELPER HARGA MULTI-CURRENCY
  // ============================================================================
  const getPriceToDisplay = (product: any) => {
    if (!product) return { value: 0, curr: 'IDR' };
    const curr = (currency as Currency) || 'IDR';
    if (curr === 'IDR') return { value: Number(product.price), curr: 'IDR' };
    
    const pricesObj = typeof product.prices === 'string' ? JSON.parse(product.prices) : (product.prices || {});
    if (pricesObj[curr]) return { value: parseFloat(pricesObj[curr]), curr: curr };
    
    return { value: Number(product.price), curr: 'IDR' };
  };

  const getDiscountToDisplay = (product: any) => {
    if (!product) return null;
    const curr = (currency as Currency) || 'IDR';
    if (curr === 'IDR') return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
    
    const discObj = typeof product.discount_prices === 'string' ? JSON.parse(product.discount_prices) : (product.discount_prices || {});
    if (discObj[curr]) return { value: parseFloat(discObj[curr]), curr: curr };
    
    return product.discount_price ? { value: Number(product.discount_price), curr: 'IDR' } : null;
  };

  const formatCurrencyDisplay = (priceObj: {value: number, curr: string} | null) => {
    if (!priceObj) return "";
    const symbols: any = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
    const formatter = new Intl.NumberFormat(priceObj.curr === "IDR" ? "id-ID" : "en-US", {
      minimumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
      maximumFractionDigits: priceObj.curr === "IDR" ? 0 : 2,
    });
    return `${symbols[priceObj.curr] || priceObj.curr + " "}${formatter.format(priceObj.value)}`;
  };

  const convertIDRtoActiveCurrency = (idrAmount: number) => {
    const curr = (currency as Currency) || 'IDR';
    const rate = exchangeRates?.[curr] || 1;
    return { value: idrAmount * (curr === 'IDR' ? 1 : rate), curr: curr };
  };
  // ============================================================================

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

        const pink = products.find(
          (p: any) =>
            p.name.toLowerCase().includes("brush") &&
            p.name.toLowerCase().includes("pink"),
        );
        const black = products.find(
          (p: any) =>
            p.name.toLowerCase().includes("brush") &&
            p.name.toLowerCase().includes("black"),
        );
        const scalp = products.find((p: any) =>
          p.name.toLowerCase().includes("scalp"),
        );

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsDropdownOpen(false);
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) setIsLangMenuOpen(false);
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) setIsCurrencyMenuOpen(false);
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
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen, isSearchOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    Swal.fire({
      title: t("logout_confirm_title"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: t("yes_logout"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_data");
        setUserData(null);
        setIsMobileMenuOpen(false);
        navigate(urlPrefix || "/"); 
      }
    });
  };

  const switchLanguage = (newLang: "id" | "en") => {
    if (newLang === lang) return;
    let newPath = location.pathname;
    newPath = newPath.replace(/^\/(id|en)/, ""); 
    if (newLang === "en") newPath = "/en" + newPath;
    if (newPath === "") newPath = "/";
    setLang(newLang);
    setIsLangMenuOpen(false);
    navigate(newPath + location.search + location.hash, { replace: true, state: location.state });
  };

  useEffect(() => {
    if (!isSearchOpen) return;
    if (searchQuery.trim().length === 0) {
      setSearchResults({ products: [], transactions: [], carts: [] });
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

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
          },
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

    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [searchQuery, timeFilter, isSearchOpen]);

  const closeSearchModal = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults({ products: [], transactions: [], carts: [] });
  };

  return (
    <>
      {/* ... [KODE HEADER DESKTOP & MOBILE TETAP SAMA] ... */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-[1536px] sm:px-6 lg:px-8">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-600 transition-colors rounded-md md:hidden hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <nav className="items-center hidden gap-6 text-sm font-semibold text-gray-700 md:flex lg:gap-8">
              {/* <Link to={urlPrefix || "/"} className="transition-colors hover:text-gycora">{t("home")}</Link> */}
              {/* Menu-menu lainnya (About, Product, dll) */}
              
              <div
                className="relative flex items-center h-full py-2 cursor-pointer group"
                onMouseEnter={() => setIsAboutMenuOpen(true)}
                onMouseLeave={() => setIsAboutMenuOpen(false)}
              >
                <Link to={`${urlPrefix}/pages/about-us`} className="flex items-center gap-1 transition-colors hover:text-gycora">
                  {t("about_us")}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isAboutMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {isAboutMenuOpen && (
                  <div className="absolute left-0 pt-2 top-full w-52 animate-fade-in-up">
                    <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
                      <Link to={`${urlPrefix}/pages/our-story`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Story</Link>
                      <Link to={`${urlPrefix}/pages/our-purpose`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Purpose</Link>
                      <Link to={`${urlPrefix}/pages/about-us#our-innovation`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Our Innovation</Link>
                      <Link to={`${urlPrefix}/pages/vission-and-mission`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Vision and Mission</Link>
                      <Link to={`${urlPrefix}/pages/faq`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors border-t border-gray-100">FAQs</Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative flex items-center h-full py-2 cursor-pointer group"
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => setIsProductMenuOpen(false)}
              >
                <Link to={`${urlPrefix}/collections/all`} className="flex items-center gap-1 transition-colors hover:text-gycora">
                  {t("product")}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {isProductMenuOpen && (
                  <div className="absolute left-0 w-64 pt-2 top-full animate-fade-in-up">
                    <div className="py-2 bg-white border border-gray-100 shadow-2xl rounded-xl">
                      <button onClick={() => { const target = allProducts.find(p => p.slug === menuIds.pinkBrush); navigate(menuIds.pinkBrush ? `${urlPrefix}/product/${menuIds.pinkBrush}` : `${urlPrefix}/collections/all`, { state: { initialProduct: target, allProducts } }); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Ethereal Glow Brush Pink</button>
                      <button onClick={() => { const target = allProducts.find(p => p.slug === menuIds.blackBrush); navigate(menuIds.blackBrush ? `${urlPrefix}/product/${menuIds.blackBrush}` : `${urlPrefix}/collections/all`, { state: { initialProduct: target, allProducts } }); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Ethereal Glow Brush Black</button>
                      <button onClick={() => { const target = allProducts.find(p => p.slug === menuIds.scalpCare); navigate(menuIds.scalpCare ? `${urlPrefix}/product/${menuIds.scalpCare}` : `${urlPrefix}/collections/all`, { state: { initialProduct: target, allProducts } }); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-gycora transition-colors">Eco Serenity Scalp Care</button>
                    </div>
                  </div>
                )}
              </div>

              <Link to={`${urlPrefix}/events`} className="transition-colors hover:text-gycora">{t("events")}</Link>
              <Link to={`${urlPrefix}/consult`} className="transition-colors hover:text-gycora">{t("consult")}</Link>
            </nav>
          </div>

          <div
            className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2"
            onClick={() => navigate(urlPrefix || "/")}
          >
            <img src={logoGycora} alt="Gycora Logo" className="object-contain h-8 md:h-10" />
          </div>

          <div className="flex items-center justify-end flex-1 gap-2 md:gap-5">
            {/* DROPDOWN BAHASA */}
            {/* <div className="relative" ref={langDropdownRef}>
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora">
                <span>{lang}</span>
                <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7-7-7-7" />
                </svg>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 z-50 w-32 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
                  <button onClick={() => switchLanguage("id")} className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === "id" ? "text-gycora font-bold bg-emerald-50" : "text-gray-700 hover:bg-gray-50"}`}>🇮🇩 Indonesia</button>
                  <button onClick={() => switchLanguage("en")} className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === "en" ? "text-gycora font-bold bg-emerald-50" : "text-gray-700 hover:bg-gray-50"}`}>🇬🇧 English</button>
                </div>
              )}
            </div> */}

            <div className="relative" ref={langDropdownRef}>
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora">
                <span>{lang}</span>
                <svg className={`w-4 h-4 shrink-0 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 z-50 w-32 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
                  <button onClick={() => switchLanguage("id")} className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === "id" ? "text-gycora font-bold bg-emerald-50" : "text-gray-700 hover:bg-gray-50"}`}>🇮🇩 Indonesia</button>
                  <button onClick={() => switchLanguage("en")} className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === "en" ? "text-gycora font-bold bg-emerald-50" : "text-gray-700 hover:bg-gray-50"}`}>🇬🇧 English</button>
                </div>
              )}
            </div>

            {/* DROPDOWN MATA UANG */}
            {/* <div className="relative hidden md:block" ref={currencyDropdownRef}>
              <button onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)} className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora">
                <span>{currency}</span>
                <svg className={`w-3 h-3 transition-transform ${isCurrencyMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7-7-7-7" />
                </svg>
              </button>
              {isCurrencyMenuOpen && (
                <div className="absolute right-0 z-50 w-24 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
                  {availableCurrencies.map((curr) => (
                    <button key={curr} onClick={() => { setCurrency(curr); setIsCurrencyMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${currency === curr ? "text-gycora font-bold bg-emerald-50" : "text-gray-700 hover:bg-gray-50"}`}>{curr}</button>
                  ))}
                </div>
              )}
            </div> */}

            <div className="relative hidden md:block" ref={currencyDropdownRef}>
              <button onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)} className="flex items-center gap-1 p-1.5 text-xs font-bold text-gray-600 uppercase transition-colors rounded-lg hover:bg-gray-100 hover:text-gycora">
                <span>{currency}</span>
                <svg className={`w-4 h-4 shrink-0 transition-transform ${isCurrencyMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCurrencyMenuOpen && (
                <div className="absolute right-0 z-50 w-24 py-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
                  {availableCurrencies.map((curr) => (
                    <button key={curr} onClick={() => { setCurrency(curr); setIsCurrencyMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${currency === curr ? "text-gycora font-bold bg-emerald-50" : "text-gray-700 hover:bg-gray-50"}`}>{curr}</button>
                  ))}
                </div>
              )}
            </div>

            {userData ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer group focus:outline-none">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
                    {userData.first_name.charAt(0)}
                  </div>
                  <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
                    Hi, {userData.first_name}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 py-2 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl animate-fade-in-up">
                    <Link to={`${urlPrefix}/profile`} onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t("my_profile")}</Link>
                    <Link to={`${urlPrefix}/orders`} onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t("my_orders")}</Link>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">{t("logout")}</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={`${urlPrefix}/login`} className="hidden text-sm font-medium text-gray-600 transition-colors md:block hover:text-gycora">{t("login")}</Link>
            )}

            <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-gray-600 hover:text-gycora">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {userData && (
              <button onClick={() => navigate(`${urlPrefix}/chat`)} className="relative hidden md:block p-1.5 md:p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-gycora" title="Chat dengan Pakar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            )}

            <button onClick={() => navigate(`${urlPrefix}/cart`)} className="relative p-1.5 text-gray-600 hover:text-gycora">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartTotalItems > 0 && (
                <span className="absolute top-0 right-0 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {cartTotalItems}
                </span>
              )}
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
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
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
              <Link to={urlPrefix || "/"} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">{t("home")}</Link>
              
              <div>
                <button onClick={() => setIsMobileAboutMenuOpen(!isMobileAboutMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
                  {t("about_us")}
                  <svg className={`w-5 h-5 transition-transform ${isMobileAboutMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileAboutMenuOpen && (
                  <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
                    <Link to={`${urlPrefix}/pages/our-story`} onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Story</Link>
                    <Link to={`${urlPrefix}/pages/our-purpose`} onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Purpose</Link>
                    <Link to={`${urlPrefix}/pages/about-us#our-innovation`} onClick={() => setIsMobileMenuOpen(false)} className="text-left">Our Innovation</Link>
                    <Link to={`${urlPrefix}/pages/vission-and-mission`} onClick={() => setIsMobileMenuOpen(false)} className="text-left">Vision and Mission</Link>
                    <Link to={`${urlPrefix}/pages/faq`} onClick={() => setIsMobileMenuOpen(false)} className="text-left text-gycora">FAQs</Link>
                  </div>
                )}
              </div>

              <div>
                <button onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)} className="flex items-center justify-between w-full text-lg font-bold">
                  {t("product")}
                  <svg className={`w-5 h-5 transition-transform ${isMobileProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileProductMenuOpen && (
                  <div className="flex flex-col gap-3 pl-4 mt-2 text-gray-600">
                    <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); const target = allProducts.find(p => p.slug === menuIds.pinkBrush); navigate(menuIds.pinkBrush ? `${urlPrefix}/product/${menuIds.pinkBrush}` : `${urlPrefix}/collections/all`, { state: { initialProduct: target, allProducts } }); }}>Ethereal Glow Brush Pink</button>
                    <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); const target = allProducts.find(p => p.slug === menuIds.blackBrush); navigate(menuIds.blackBrush ? `${urlPrefix}/product/${menuIds.blackBrush}` : `${urlPrefix}/collections/all`, { state: { initialProduct: target, allProducts } }); }}>Ethereal Glow Brush Black</button>
                    <button className="text-left" onClick={() => { setIsMobileMenuOpen(false); const target = allProducts.find(p => p.slug === menuIds.scalpCare); navigate(menuIds.scalpCare ? `${urlPrefix}/product/${menuIds.scalpCare}` : `${urlPrefix}/collections/all`, { state: { initialProduct: target, allProducts } }); }}>Eco Serenity Scalp Care</button>
                  </div>
                )}
              </div>

              <Link to={`${urlPrefix}/events`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">{t("events")}</Link>
              <Link to={`${urlPrefix}/consult`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">{t("consult")}</Link>

              {userData ? (
                <>
                  <div className="my-2 border-t border-gray-100"></div>
                  <Link to={`${urlPrefix}/chat`} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">Live Chat Pakar</Link>
                  <Link to={`${urlPrefix}/profile`} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">{t("my_profile")}</Link>
                  <Link to={`${urlPrefix}/orders`} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-700">{t("my_orders")}</Link>
                  
                  {/* <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Currency</span>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="p-2 text-sm font-bold text-center uppercase bg-gray-100 border-none rounded-lg outline-none text-gycora">
                      {availableCurrencies.map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div> */}

                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Currency</span>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="p-2 pr-8 text-sm font-bold text-left uppercase bg-gray-100 border-none rounded-lg outline-none text-gycora">
                      {availableCurrencies.map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div>

                  <button onClick={handleLogout} className="mt-4 font-bold text-left text-red-600">{t("logout")}</button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  {/* <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Currency</span>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="p-2 text-sm font-bold text-center uppercase bg-gray-100 border-none rounded-lg outline-none text-gycora">
                      {availableCurrencies.map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div> */}

                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Currency</span>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="p-2 pr-8 text-sm font-bold text-left uppercase bg-gray-100 border-none rounded-lg outline-none text-gycora">
                      {availableCurrencies.map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigate(`${urlPrefix}/login`); }} className="w-full px-4 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl">{t("login")}</button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigate(`${urlPrefix}/register`); }} className="w-full px-4 py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl">{t("register")}</button>
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
                <h2 className="text-lg font-bold text-gray-900">{t("universal_search")}</h2>
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
                  placeholder={t("search_placeholder")}
                  className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all bg-white border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-gycora focus:border-transparent"
                  autoFocus
                />
              </div>

              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
                {[
                  { id: "all", label: t("all_time") },
                  { id: "7d", label: t("last_7_days") },
                  { id: "30d", label: t("last_30_days") },
                  { id: "90d", label: t("last_3_months") },
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
                  <p className="text-sm font-medium">{t("type_to_search")}</p>
                </div>
              ) : isSearching ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gycora">
                  <div className="w-8 h-8 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
                  <p className="text-xs font-bold tracking-widest uppercase animate-pulse">{t("searching")}</p>
                </div>
              ) : (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* 👇 TAMPILAN PRODUK DI PENCARIAN 👇 */}
                  {searchResults.products && searchResults.products.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
                        {t("catalog_product")}
                      </h3>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {searchResults.products.map((product: any) => {
                          
                          // 👇 PERBAIKAN: Hitung harga Multi-Currency di dalam `.map()` 👇
                          const dynamicPriceObj = getPriceToDisplay(product);
                          const dynamicDiscountObj = getDiscountToDisplay(product);
                          const isDiscounted = dynamicDiscountObj && dynamicDiscountObj.value > 0 && dynamicDiscountObj.value < dynamicPriceObj.value;

                          return (
                            <div
                              key={`prod-${product.id}`}
                              onClick={() => { closeSearchModal(); navigate(`${urlPrefix}/product/${product.slug}`); }}
                              className="flex items-center gap-3 p-3 transition-colors border border-gray-100 cursor-pointer rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 group"
                            >
                              <img src={product.image_url} alt={product.name} className="object-cover w-12 h-12 rounded-lg bg-gray-50 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate group-hover:text-gycora">{product.name}</p>
                                <p className="text-xs text-gray-500 font-mono mt-0.5">{product.sku}</p>
                              </div>
                              
                              {/* Render Harga Baru */}
                              <div className="text-right shrink-0">
                                {isDiscounted ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-medium text-gray-400 line-through">
                                      {formatCurrencyDisplay(dynamicPriceObj)}
                                    </span>
                                    <span className="text-sm font-black text-rose-500">
                                      {formatCurrencyDisplay(dynamicDiscountObj)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm font-black text-gycora">
                                    {formatCurrencyDisplay(dynamicPriceObj)}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 👇 TAMPILAN TRANSAKSI DI PENCARIAN 👇 */}
                  {searchResults.transactions && searchResults.transactions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="pb-2 text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-100">
                        {t("transaction_history")}
                      </h3>
                      <div className="flex flex-col gap-3">
                        {searchResults.transactions.map((trx: any) => {
                          
                          // Konversi total transaksi IDR ke mata uang aktif
                          const convertedTotalObj = convertIDRtoActiveCurrency(trx.total_amount);

                          return (
                            <div
                              key={`trx-${trx.id}`}
                              onClick={() => { closeSearchModal(); navigate(`${urlPrefix}/orders`); }}
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
                                <p className="text-sm font-black text-gray-900">
                                  {formatCurrencyDisplay(convertedTotalObj)}
                                </p>
                                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                  {trx.status}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {!isSearching && searchResults.products?.length === 0 && searchResults.transactions?.length === 0 && searchResults.carts?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <p className="text-lg font-bold text-gray-900">{t("not_found_title")}</p>
                      <p className="max-w-sm mt-2 text-sm text-gray-500">{t("not_found_desc", { query: searchQuery })}</p>
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