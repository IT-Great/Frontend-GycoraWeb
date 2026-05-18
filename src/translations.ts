// src/translations.ts

export const translations = {
  id: {
    // Menu Navigasi
    home: "Home",
    about_us: "About Us",
    product: "Product",
    events: "Events",
    consult: "Consult",
    
    // Auth & Profil
    login: "Login",
    register: "Daftar Akun Baru",
    my_profile: "Profil Saya",
    my_orders: "Pesanan Saya",
    logout: "Keluar",
    logout_confirm_title: "Keluar?",
    logout_confirm_text: "Apakah Anda yakin ingin keluar?",
    yes_logout: "Ya, Keluar",
    
    // Pencarian
    search_placeholder: "Cari produk, No. Pesanan (INV-...), atau status...",
    universal_search: "Pencarian Universal",
    all_time: "Semua Waktu",
    last_7_days: "7 Hari Terakhir",
    last_30_days: "30 Hari Terakhir",
    last_3_months: "3 Bulan Terakhir",
    type_to_search: "Ketik kata kunci untuk memulai pencarian.",
    searching: "Mencari data...",
    catalog_product: "Produk Katalog",
    transaction_history: "Riwayat Transaksi",
    not_found_title: "Oops, tidak ditemukan!",
    not_found_desc: "Kami tidak dapat menemukan hasil untuk '{query}' dengan rentang waktu yang Anda pilih.",
    
    // Produk Detail
    add_to_cart: "Tambah ke Keranjang",
    buy_it_now: "Beli Sekarang",
    out_of_stock: "Stok Habis",
    select_variant: "Pilih Varian Warna:",
    description: "Description",
    how_to_use: "How to Use",
    faq: "FAQ",
    review: "Review",
    no_image: "Belum ada gambar",
    main_image: "Utama",
    new_variant: "Baru",
    old_variant: "Lama",
    
    // Notifikasi
    login_required: "Login Diperlukan",
    login_required_desc: "Silakan masuk ke akun Anda untuk melanjutkan.",
    to_login_page: "Ke Halaman Login",
    cancel: "Batal",
    added_to_cart: "Ditambahkan!",
    
    // Kalimat Spesifik (Contoh)
    find_favorite: "Temukan Favoritmu di Gycora",
    find_favorite_desc: "Dari hair brush hingga scalp care, eksplor produk pilihan yang bikin rutinitas rambut terasa lebih praktis setiap hari.",
    search_product: "Cari produk...",
    all: "Semua",
  },
  en: {
    // Nav Menu
    home: "Home",
    about_us: "About Us",
    product: "Product",
    events: "Events",
    consult: "Consult",
    
    // Auth & Profile
    login: "Login",
    register: "Register New Account",
    my_profile: "My Profile",
    my_orders: "My Orders",
    logout: "Logout",
    logout_confirm_title: "Logout?",
    logout_confirm_text: "Are you sure you want to log out?",
    yes_logout: "Yes, Logout",
    
    // Search
    search_placeholder: "Search products, Order ID (INV-...), or status...",
    universal_search: "Universal Search",
    all_time: "All Time",
    last_7_days: "Last 7 Days",
    last_30_days: "Last 30 Days",
    last_3_months: "Last 3 Months",
    type_to_search: "Type keywords to start searching.",
    searching: "Searching data...",
    catalog_product: "Catalog Products",
    transaction_history: "Transaction History",
    not_found_title: "Oops, not found!",
    not_found_desc: "We couldn't find any results for '{query}' with the selected time range.",
    
    // Product Detail
    add_to_cart: "Add to Cart",
    buy_it_now: "Buy it Now",
    out_of_stock: "Out of Stock",
    select_variant: "Choose Color Variant:",
    description: "Description",
    how_to_use: "How to Use",
    faq: "FAQ",
    review: "Review",
    no_image: "No image available",
    main_image: "Main",
    new_variant: "New",
    old_variant: "Old",
    
    // Notifications
    login_required: "Login Required",
    login_required_desc: "Please log in to your account to continue.",
    to_login_page: "Go to Login Page",
    cancel: "Cancel",
    added_to_cart: "Added!",
    
    // Specific Sentences (Example)
    find_favorite: "Find Your Favorites at Gycora",
    find_favorite_desc: "From hair brushes to scalp care, explore selected products that make your hair routine more practical every day.",
    search_product: "Search products...",
    all: "All",
  }
};

export type LanguageCode = "id" | "en";
export type TranslationKey = keyof typeof translations.id;