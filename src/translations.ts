// src/translations.ts

// export const translations = {
//   id: {
//     // Menu Navigasi
//     home: "Home",
//     about_us: "About Us",
//     product: "Product",
//     events: "Events",
//     consult: "Consult",

//     // Auth & Profil
//     login: "Login",
//     register: "Daftar Akun Baru",
//     my_profile: "Profil Saya",
//     my_orders: "Pesanan Saya",
//     logout: "Keluar",
//     logout_confirm_title: "Keluar?",
//     logout_confirm_text: "Apakah Anda yakin ingin keluar?",
//     yes_logout: "Ya, Keluar",

//     // Pencarian
//     search_placeholder: "Cari produk, No. Pesanan (INV-...), atau status...",
//     universal_search: "Pencarian Universal",
//     all_time: "Semua Waktu",
//     last_7_days: "7 Hari Terakhir",
//     last_30_days: "30 Hari Terakhir",
//     last_3_months: "3 Bulan Terakhir",
//     type_to_search: "Ketik kata kunci untuk memulai pencarian.",
//     searching: "Mencari data...",
//     catalog_product: "Produk Katalog",
//     transaction_history: "Riwayat Transaksi",
//     not_found_title: "Oops, tidak ditemukan!",
//     not_found_desc: "Kami tidak dapat menemukan hasil untuk '{query}' dengan rentang waktu yang Anda pilih.",

//     // Produk Detail
//     add_to_cart: "Tambah ke Keranjang",
//     buy_it_now: "Beli Sekarang",
//     out_of_stock: "Stok Habis",
//     select_variant: "Pilih Varian Warna:",
//     description: "Description",
//     how_to_use: "How to Use",
//     faq: "FAQ",
//     review: "Review",
//     no_image: "Belum ada gambar",
//     main_image: "Utama",
//     new_variant: "Baru",
//     old_variant: "Lama",

//     // Notifikasi
//     login_required: "Login Diperlukan",
//     login_required_desc: "Silakan masuk ke akun Anda untuk melanjutkan.",
//     to_login_page: "Ke Halaman Login",
//     cancel: "Batal",
//     added_to_cart: "Ditambahkan!",

//     // Kalimat Spesifik (Contoh)
//     find_favorite: "Temukan Favoritmu di Gycora",
//     find_favorite_desc: "Dari hair brush hingga scalp care, eksplor produk pilihan yang bikin rutinitas rambut terasa lebih praktis setiap hari.",
//     search_product: "Cari produk...",
//     all: "Semua",
//   },
//   en: {
//     // Nav Menu
//     home: "Home",
//     about_us: "About Us",
//     product: "Product",
//     events: "Events",
//     consult: "Consult",

//     // Auth & Profile
//     login: "Login",
//     register: "Register New Account",
//     my_profile: "My Profile",
//     my_orders: "My Orders",
//     logout: "Logout",
//     logout_confirm_title: "Logout?",
//     logout_confirm_text: "Are you sure you want to log out?",
//     yes_logout: "Yes, Logout",

//     // Search
//     search_placeholder: "Search products, Order ID (INV-...), or status...",
//     universal_search: "Universal Search",
//     all_time: "All Time",
//     last_7_days: "Last 7 Days",
//     last_30_days: "Last 30 Days",
//     last_3_months: "Last 3 Months",
//     type_to_search: "Type keywords to start searching.",
//     searching: "Searching data...",
//     catalog_product: "Catalog Products",
//     transaction_history: "Transaction History",
//     not_found_title: "Oops, not found!",
//     not_found_desc: "We couldn't find any results for '{query}' with the selected time range.",

//     // Product Detail
//     add_to_cart: "Add to Cart",
//     buy_it_now: "Buy it Now",
//     out_of_stock: "Out of Stock",
//     select_variant: "Choose Color Variant:",
//     description: "Description",
//     how_to_use: "How to Use",
//     faq: "FAQ",
//     review: "Review",
//     no_image: "No image available",
//     main_image: "Main",
//     new_variant: "New",
//     old_variant: "Old",

//     // Notifications
//     login_required: "Login Required",
//     login_required_desc: "Please log in to your account to continue.",
//     to_login_page: "Go to Login Page",
//     cancel: "Cancel",
//     added_to_cart: "Added!",

//     // Specific Sentences (Example)
//     find_favorite: "Find Your Favorites at Gycora",
//     find_favorite_desc: "From hair brushes to scalp care, explore selected products that make your hair routine more practical every day.",
//     search_product: "Search products...",
//     all: "All",
//   }
// };

// export type LanguageCode = "id" | "en";
// export type TranslationKey = keyof typeof translations.id;

// export const translations = {
//   id: {
//     // Menu Navigasi
//     home: "Home",
//     about_us: "About Us",
//     product: "Product",
//     events: "Events",
//     consult: "Consult",

//     // Auth & Profil
//     login: "Login",
//     register: "Daftar Akun Baru",
//     my_profile: "Profil Saya",
//     my_orders: "Pesanan Saya",
//     logout: "Keluar",
//     logout_confirm_title: "Keluar?",
//     logout_confirm_text: "Apakah Anda yakin ingin keluar?",
//     yes_logout: "Ya, Keluar",

//     // Pencarian
//     search_placeholder: "Cari produk, No. Pesanan (INV-...), atau status...",
//     universal_search: "Pencarian Universal",
//     all_time: "Semua Waktu",
//     last_7_days: "7 Hari Terakhir",
//     last_30_days: "30 Hari Terakhir",
//     last_3_months: "3 Bulan Terakhir",
//     type_to_search: "Ketik kata kunci untuk memulai pencarian.",
//     searching: "Mencari data...",
//     catalog_product: "Produk Katalog",
//     transaction_history: "Riwayat Transaksi",
//     not_found_title: "Oops, tidak ditemukan!",
//     not_found_desc: "Kami tidak dapat menemukan hasil untuk '{query}' dengan rentang waktu yang Anda pilih.",

//     // Produk Detail & Katalog
//     add_to_cart: "Tambah ke Keranjang",
//     buy_it_now: "Beli Sekarang",
//     out_of_stock: "Stok Habis",
//     select_variant: "Pilih Varian Warna:",
//     description: "Description",
//     how_to_use: "How to Use",
//     faq: "FAQ",
//     review: "Review",
//     no_image: "Belum ada gambar",
//     main_image: "Utama",
//     new_variant: "Baru",
//     old_variant: "Lama",
//     search_product: "Cari produk...",
//     all: "Semua",
//     see_all_products: "Lihat Semua Produk",

//     // Notifikasi
//     login_required: "Login Diperlukan",
//     login_required_desc: "Silakan masuk ke akun Anda untuk melanjutkan.",
//     to_login_page: "Ke Halaman Login",
//     cancel: "Batal",
//     added_to_cart: "Ditambahkan!",

//     // HOME PAGE
//     // Promo Modal
//     promo_title: "Diskon Spesial First Order ✨",
//     promo_desc1: "Nikmati 10% OFF + subsidi ongkir Rp10.000 untuk pembelian pertamamu.",
//     promo_desc2: "Masukkan email kamu dan klaim voucher eksklusif sekarang.",
//     email_placeholder: "Masukkan Email",
//     sending: "Mengirim...",
//     claim_now: "Klaim Sekarang",
//     promo_success_title: "Kode Promo Terkirim!",
//     promo_success_desc: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
//     notification: "Pemberitahuan",
//     promo_failed_desc: "Gagal mengklaim promo. Pastikan format email benar.",
//     error: "Gagal",
//     server_error: "Terjadi kesalahan server saat memproses permintaan Anda.",

//     // Hero Section
//     hero_title1: "Solusi Cepat untuk",
//     hero_title2: "Rambut Lebih Rapi",
//     hero_subtitle: "Tanpa Ribet, Tanpa Nunggu Lama.",
//     hero_desc: "Nggak semua orang punya waktu buat styling setiap hari. Tapi kamu tetap bisa tampil lebih rapi dalam hitungan menit dengan produk pilihan dari Gycora.",
//     shop_now: "Shop Now",
//     see_product: "Lihat Produk",

//     // Mini Features
//     feature1_title: "Teknologi",
//     feature1_subtitle: "Anti Statis",
//     feature1_desc: "Teknologi ion untuk mencegah rambut berdiri karena listrik statis.",
//     feature2_title: "Carbon Patented",
//     feature2_subtitle: "Material",
//     feature2_desc: "Bahan karbon khusus yang dipatenkan untuk mendistribusikan panas secara merata dan aman.",
//     feature3_title: "Eco",
//     feature3_subtitle: "Friendly",
//     feature3_desc: "Terbuat dari bahan ramah lingkungan yang aman dan dapat didaur ulang.",

//     // Featured Products
//     fav_product_title: "Produk Favorit Pilihan Banyak Orang",
//     fav_product_desc: "Temukan produk best seller yang jadi andalan untuk rambut lebih rapi, halus, dan mudah diatur setiap hari.",
//     brush_desc: "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir.",
//     empty_product: "Belum ada produk yang tersedia.",

//     // Problem Section
//     problem_title: "Pernah Ngerasa Kayak Gini?",
//     problem_1: "Rambut tiba-tiba kusut di momen penting",
//     problem_2: "Udah rapi dari rumah, tapi berantakan di jalan",
//     problem_3: "Habis pakai helm, kena angin, atau aktivitas seharian",
//     problem_4: "Nggak punya banyak waktu buat styling ulang",
//     problem_footer: "Padahal kamu cuma butuh cara cepat buat balik rapi lagi.",

//     // Solution Section
//     the_solution: "The Solution",
//     solution_title: "Nggak Perlu Ribet Buat Tampil Rapi",
//     solution_desc1: "Kenalin, Ethereal Glow Brush — sisir dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan mudah diatur hanya dalam beberapa menit.",
//     solution_desc2: "Cukup sisir seperti biasa, tanpa teknik khusus. Hasilnya langsung terasa.",
//     explore_product: "Explore Product",

//     // Before After
//     result_title: "Hasil Nyata Tanpa Filter",
//     result_desc: "Perbedaan nyata sebelum dan sesudah menggunakan Gycora.",

//     // Key Benefits
//     benefit_title: "Kenapa Banyak yang Pilih Gycora?",
//     benefit_1: "Bantu mengurangi rambut kusut dalam hitungan menit",
//     benefit_2: "Mengurangi listrik statis pada rambut",
//     benefit_3: "Praktis dibawa ke mana aja",
//     benefit_4: "Cocok untuk berbagai jenis rambut",
//     benefit_5: "Nggak perlu effort lebih untuk hasil yang rapi",

//     // Social Proof
//     social_title: "Bukan Cuma Kata Kami, Tapi Mereka yang Sudah Coba",
//     social_desc: "Ribuan pengguna Gycora sudah merasakan perubahan nyata dalam rutinitas mereka.",

//     // CTA
//     cta_title: "Nggak Perlu Ribet Buat Tampil Rapi",
//     cta_desc1: "Mulai dari langkah kecil yang bikin perbedaan besar di penampilan kamu.",
//     cta_desc2: "Dengan Gycora, rambut rapi bukan lagi hal yang butuh effort lebih.",
//   },
//   en: {
//     // Nav Menu
//     home: "Home",
//     about_us: "About Us",
//     product: "Product",
//     events: "Events",
//     consult: "Consult",

//     // Auth & Profile
//     login: "Login",
//     register: "Register New Account",
//     my_profile: "My Profile",
//     my_orders: "My Orders",
//     logout: "Logout",
//     logout_confirm_title: "Logout?",
//     logout_confirm_text: "Are you sure you want to log out?",
//     yes_logout: "Yes, Logout",

//     // Search
//     search_placeholder: "Search products, Order ID (INV-...), or status...",
//     universal_search: "Universal Search",
//     all_time: "All Time",
//     last_7_days: "Last 7 Days",
//     last_30_days: "Last 30 Days",
//     last_3_months: "Last 3 Months",
//     type_to_search: "Type keywords to start searching.",
//     searching: "Searching data...",
//     catalog_product: "Catalog Products",
//     transaction_history: "Transaction History",
//     not_found_title: "Oops, not found!",
//     not_found_desc: "We couldn't find any results for '{query}' with the selected time range.",

//     // Product Detail & Catalog
//     add_to_cart: "Add to Cart",
//     buy_it_now: "Buy it Now",
//     out_of_stock: "Out of Stock",
//     select_variant: "Choose Color Variant:",
//     description: "Description",
//     how_to_use: "How to Use",
//     faq: "FAQ",
//     review: "Review",
//     no_image: "No image available",
//     main_image: "Main",
//     new_variant: "New",
//     old_variant: "Old",
//     search_product: "Search products...",
//     all: "All",
//     see_all_products: "See All Products",

//     // Notifications
//     login_required: "Login Required",
//     login_required_desc: "Please log in to your account to continue.",
//     to_login_page: "Go to Login Page",
//     cancel: "Cancel",
//     added_to_cart: "Added!",

//     // HOME PAGE
//     // Promo Modal
//     promo_title: "First Order Special Discount ✨",
//     promo_desc1: "Enjoy 10% OFF + IDR 10,000 shipping subsidy for your first purchase.",
//     promo_desc2: "Enter your email and claim the exclusive voucher now.",
//     email_placeholder: "Enter your Email",
//     sending: "Sending...",
//     claim_now: "Claim Now",
//     promo_success_title: "Promo Code Sent!",
//     promo_success_desc: "Please check your email inbox to get the special voucher code from Gycora.",
//     notification: "Notification",
//     promo_failed_desc: "Failed to claim promo. Make sure the email format is correct.",
//     error: "Failed",
//     server_error: "A server error occurred while processing your request.",

//     // Hero Section
//     hero_title1: "Quick Solution for",
//     hero_title2: "Neater Hair",
//     hero_subtitle: "No Hassle, No Waiting.",
//     hero_desc: "Not everyone has the time to style their hair every day. But you can still look neater in minutes with selected products from Gycora.",
//     shop_now: "Shop Now",
//     see_product: "View Products",

//     // Mini Features
//     feature1_title: "Anti Static",
//     feature1_subtitle: "Technology",
//     feature1_desc: "Ionic technology to prevent hair from standing up due to static electricity.",
//     feature2_title: "Carbon Patented",
//     feature2_subtitle: "Material",
//     feature2_desc: "Special patented carbon material to distribute heat evenly and safely.",
//     feature3_title: "Eco",
//     feature3_subtitle: "Friendly",
//     feature3_desc: "Made from environmentally friendly materials that are safe and recyclable.",

//     // Featured Products
//     fav_product_title: "Favorite Products Chosen by Many",
//     fav_product_desc: "Find the best-selling products that are the mainstay for neater, smoother, and easier to manage hair every day.",
//     brush_desc: "Premium brush with anti-static technology that helps hair become smoother, neater, and shinier in just one stroke.",
//     empty_product: "No products available yet.",

//     // Problem Section
//     problem_title: "Ever Felt Like This?",
//     problem_1: "Hair suddenly tangled at an important moment",
//     problem_2: "Already neat from home, but messy on the road",
//     problem_3: "After wearing a helmet, getting hit by the wind, or a day full of activities",
//     problem_4: "Don't have much time to restyle",
//     problem_footer: "Even though you just need a quick way to get back to looking neat.",

//     // Solution Section
//     the_solution: "The Solution",
//     solution_title: "No Need to be Complicated to Look Neat",
//     solution_desc1: "Meet Ethereal Glow Brush — a brush with anti-static technology that helps hair become smoother, neater, and manageable in just a few minutes.",
//     solution_desc2: "Just brush as usual, no special technique required. The results are immediately noticeable.",
//     explore_product: "Explore Product",

//     // Before After
//     result_title: "Real Results No Filter",
//     result_desc: "Real difference before and after using Gycora.",

//     // Key Benefits
//     benefit_title: "Why Do So Many Choose Gycora?",
//     benefit_1: "Helps reduce tangled hair in minutes",
//     benefit_2: "Reduces static electricity in the hair",
//     benefit_3: "Practical to take anywhere",
//     benefit_4: "Suitable for various hair types",
//     benefit_5: "No need for extra effort for neat results",

//     // Social Proof
//     social_title: "Not Just Our Words, But Those Who Have Tried It",
//     social_desc: "Thousands of Gycora users have experienced real changes in their routines.",

//     // CTA
//     cta_title: "No Need to be Complicated to Look Neat",
//     cta_desc1: "Starting from small steps that make a big difference in your appearance.",
//     cta_desc2: "With Gycora, neat hair is no longer something that requires extra effort.",
//   }
// };

// export type LanguageCode = "id" | "en";
// export type TranslationKey = keyof typeof translations.id;

type TranslationDictionary = Record<string, string>;

export const translations: Record<string, TranslationDictionary> = {
  id: {
    // Menu Navigasi
    home: "Beranda",
    about_us: "Tentang Kami",
    product: "Produk",
    events: "Event",
    consult: "Konsultasi",

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
    not_found_desc:
      "Kami tidak dapat menemukan hasil untuk '{query}' dengan rentang waktu yang Anda pilih.",

    // Produk Detail & Katalog
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
    search_product: "Cari produk...",
    all: "Semua",
    see_all_products: "Lihat Semua Produk",

    // Notifikasi
    login_required: "Login Diperlukan",
    login_required_desc: "Silakan masuk ke akun Anda untuk melanjutkan.",
    to_login_page: "Ke Halaman Login",
    cancel: "Batal",
    added_to_cart: "Ditambahkan!",

    // HOME PAGE
    // promo_title: "Diskon Spesial First Order ✨",
    // promo_desc1:
    //   "Nikmati 10% OFF + subsidi ongkir Rp10.000 untuk pembelian pertamamu.",
    // promo_desc2: "Masukkan email kamu dan klaim voucher eksklusif sekarang.",
    // email_placeholder: "Masukkan Email",
    // sending: "Mengirim...",
    // claim_now: "Klaim Sekarang",
    // promo_success_title: "Kode Promo Terkirim!",
    // promo_success_desc:
    //   "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
    // notification: "Pemberitahuan",
    // promo_failed_desc: "Gagal mengklaim promo. Pastikan format email benar.",
    // error: "Gagal",
    // server_error: "Terjadi kesalahan server saat memproses permintaan Anda.",

    promo_title: "🎁 Welcome Gift untuk Member Baru",
    promo_intro: "Buat akun GYCORA sekarang dan nikmati keuntungan eksklusif:",
    promo_bullet1: "up to 40% OFF pembelian pertama",
    promo_bullet2: "FREE Ongkir up to Rp10.000",
    promo_bullet3: "Akses promo & penawaran spesial khusus member",
    promo_cta: "Masukkan emailmu dan klaim hadiah spesialmu hari ini.",
    email_placeholder: "Masukkan email aktif",
    sending: "Memproses...",
    claim_now: "Buat Akun & Klaim Hadiah",
    promo_footer: "100% gratis. Proses pendaftaran hanya kurang dari 1 menit.",
    promo_success_title: "Kode Promo Terkirim!",
    promo_success_desc: "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
    notification: "Pemberitahuan",
    promo_failed_desc: "Gagal mengklaim promo. Pastikan format email benar.",
    error: "Gagal",
    server_error: "Terjadi kesalahan server saat memproses permintaan Anda.",
    hero_title1: "Solusi Cepat untuk",
    hero_title2: "Rambut Lebih Rapi",
    hero_subtitle: "Tanpa Ribet, Tanpa Nunggu Lama.",
    hero_desc:
      "Nggak semua orang punya waktu buat styling setiap hari. Tapi kamu tetap bisa tampil lebih rapi dalam hitungan menit dengan produk pilihan dari Gycora.",
    shop_now: "Shop Now",
    see_product: "Lihat Produk",
    feature1_title: "Teknologi",
    feature1_subtitle: "Anti Statis",
    feature1_desc:
      "Teknologi ion untuk mencegah rambut berdiri karena listrik statis.",
    feature2_title: "Carbon Patented",
    feature2_subtitle: "Material",
    feature2_desc:
      "Bahan karbon khusus yang dipatenkan untuk mendistribusikan panas secara merata dan aman.",
    feature3_title: "Eco",
    feature3_subtitle: "Friendly",
    feature3_desc:
      "Terbuat dari bahan ramah lingkungan yang aman dan dapat didaur ulang.",
    fav_product_title: "Produk Favorit Pilihan Banyak Orang",
    fav_product_desc:
      "Temukan produk best seller yang jadi andalan untuk rambut lebih rapi, halus, dan mudah diatur setiap hari.",
    brush_desc:
      "Sisir premium dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan berkilau dalam sekali sisir.",
    empty_product: "Belum ada produk yang tersedia.",
    problem_title: "Pernah Ngerasa Kayak Gini?",
    problem_1: "Rambut tiba-tiba kusut di momen penting",
    problem_2: "Udah rapi dari rumah, tapi berantakan di jalan",
    problem_3: "Habis pakai helm, kena angin, atau aktivitas seharian",
    problem_4: "Nggak punya banyak waktu buat styling ulang",
    problem_footer: "Padahal kamu cuma butuh cara cepat buat balik rapi lagi.",
    the_solution: "The Solution",
    solution_title: "Nggak Perlu Ribet Buat Tampil Rapi",
    solution_desc1:
      "Kenalin, Ethereal Glow Brush — sisir dengan teknologi anti-static yang bantu rambut lebih halus, rapi, dan mudah diatur hanya dalam beberapa menit.",
    solution_desc2:
      "Cukup sisir seperti biasa, tanpa teknik khusus. Hasilnya langsung terasa.",
    explore_product: "Explore Product",
    result_title: "Hasil Nyata Tanpa Filter",
    result_desc: "Perbedaan nyata sebelum dan sesudah menggunakan Gycora.",
    benefit_title: "Kenapa Banyak yang Pilih Gycora?",
    benefit_1: "Bantu mengurangi rambut kusut dalam hitungan menit",
    benefit_2: "Mengurangi listrik statis pada rambut",
    benefit_3: "Praktis dibawa ke mana aja",
    benefit_4: "Cocok untuk berbagai jenis rambut",
    benefit_5: "Nggak perlu effort lebih untuk hasil yang rapi",
    social_title: "Bukan Cuma Kata Kami, Tapi Mereka yang Sudah Coba",
    social_desc:
      "Ribuan pengguna Gycora sudah merasakan perubahan nyata dalam rutinitas mereka.",
    cta_title: "Nggak Perlu Ribet Buat Tampil Rapi",
    cta_desc1:
      "Mulai dari langkah kecil yang bikin perbedaan besar di penampilan kamu.",
    cta_desc2:
      "Dengan Gycora, rambut rapi bukan lagi hal yang butuh effort lebih.",

    // ABOUT US PAGE [BARU]
    about_header_title: "Tentang Gycora",
    about_header_desc1:
      "Kami percaya bahwa self-care bukan sekadar rutinitas, tapi bentuk perhatian kecil untuk diri sendiri di tengah aktivitas yang padat.",
    about_header_desc2:
      "Karena tampil rapi dan merasa nyaman dengan diri sendiri seharusnya bisa terasa lebih mudah, praktis, dan tetap bermakna.",
    about_who_we_are_label: "WHO WE ARE",
    about_who_we_are_title:
      "Beauty Essentials yang Dirancang untuk Kehidupan Sehari-Hari",
    about_who_we_are_p1:
      "Gycora menghadirkan produk perawatan rambut berbasis inovasi modern yang membantu rutinitas harian terasa lebih praktis dan nyaman.",
    about_who_we_are_p2:
      "Mulai dari hairbrush anti-static hingga scalp care yang dirancang untuk penggunaan sehari-hari, setiap produk dibuat untuk membantu kamu tampil lebih rapi tanpa effort berlebih.",
    about_our_story_label: "OUR STORY",
    about_our_story_title:
      "Berawal dari Hal Sederhana: Keinginan untuk Membuat Self-Care Terasa Lebih Mudah",
    about_our_story_p1:
      "Di tengah aktivitas yang terus berjalan, kami sadar bahwa tidak semua orang punya banyak waktu untuk styling atau perawatan yang rumit.",
    about_our_story_p2:
      "Tapi di saat yang sama, rasa percaya diri sering datang dari hal-hal kecil — seperti rambut yang terasa lebih rapi, nyaman, dan mudah diatur.",
    about_our_story_p3: "Dari situlah Gycora lahir.",
    about_our_story_p4:
      "Kami ingin menghadirkan produk yang bukan hanya terlihat baik, tetapi juga benar-benar membantu keseharian penggunanya.",
    about_why_label: "WHY GYCORA",
    about_why_title: "Kenapa Gycora?",
    about_purpose1_title: "Practical Beauty",
    about_purpose1_desc:
      "Produk yang dirancang untuk rutinitas harian yang cepat dan praktis.",
    about_purpose2_title: "Modern Innovation",
    about_purpose2_desc:
      "Menggunakan teknologi modern untuk membantu rambut lebih mudah diatur dan nyaman digunakan setiap hari.",
    about_purpose3_title: "Thoughtfully Designed",
    about_purpose3_desc:
      "Dibuat dengan desain yang nyaman digunakan sekaligus tetap estetis.",
    about_purpose4_title: "More Conscious Choice",
    about_purpose4_desc:
      "Menggunakan material yang lebih ramah lingkungan sebagai langkah kecil menuju perawatan yang lebih bertanggung jawab.",
    about_innov_label: "INNOVATION & SUSTAINABILITY",
    about_innov_title: "Inovasi yang Tetap Peduli pada Lingkungan",
    about_innov_p1:
      "Kami percaya bahwa inovasi tidak hanya soal hasil, tapi juga tentang bagaimana sebuah produk dibuat dengan lebih bijak.",
    about_innov_p2:
      "Karena itu, Gycora terus berupaya menghadirkan produk dengan material yang lebih ramah lingkungan dan desain yang dibuat untuk penggunaan jangka panjang.",
    about_innov_p3:
      "Langkah kecil yang kami percaya bisa membawa dampak lebih baik untuk masa depan.",
    about_vm_label: "VISION & MISSION",
    about_vision_title: "Visi Kami",
    about_vision_desc:
      "Menjadi beauty brand modern yang menghadirkan produk praktis, inovatif, dan lebih mindful untuk mendukung rutinitas self-care sehari-hari.",
    about_mission_title: "Misi Kami",
    about_mission_item1:
      "Menghadirkan produk yang nyaman dan efektif digunakan setiap hari",
    about_mission_item2:
      "Menggabungkan inovasi modern dengan desain yang thoughtful",
    about_mission_item3:
      "Mendukung pilihan perawatan yang lebih conscious dan berkelanjutan",
    about_mission_item4:
      "Membantu lebih banyak orang merasa nyaman dan percaya diri dengan dirinya sendiri",
    about_closing_label: "CLOSING SECTION",
    about_closing_title:
      "Self-Care yang Lebih Simpel, untuk Hari-Hari yang Lebih Nyaman",
    about_closing_p1:
      "Karena kami percaya, rasa percaya diri sering dimulai dari perhatian kecil untuk diri sendiri.",
    about_closing_p2: "Dan Gycora ingin menjadi bagian dari perjalanan itu 🤍",

    // EVENT PAGE [BARU]
    event_header_title: "Temui Gycora Secara Langsung",
    event_header_desc1:
      "Datang dan rasakan langsung pengalaman mencoba produk Gycora di berbagai event dan pop-up market pilihan kami.",
    event_header_desc2:
      "Temukan promo spesial, produk favorit, dan pengalaman belanja yang lebih personal bersama Gycora.",
    upcoming_events_title: "Upcoming Event!",
    no_upcoming_events: "Belum ada event mendatang. Stay tuned!",
    visit_event: "Visit Event",
    upcoming_label: "Upcoming",
    past_events_title: "Past Events",
    past_event_label: "Past Event",
    no_event_image: "Gambar Event Belum Tersedia",

    // CONSULT PAGE [BARU]
    consult_hero_title:
      "Perawatan yang Tepat Dimulai dari Konsultasi yang Nyaman",
    consult_hero_desc:
      "Cerita tentang kebutuhan rambutmu dan biarkan tim Gycora membantu menemukan solusi yang paling sesuai untuk rutinitas harianmu.",
    consult_methods_title: "Pilih Cara Konsultasi yang Paling Nyaman",
    consult_online_title: "Konsultasi Online",
    consult_online_desc:
      "Konsultasikan kondisi rambut dan kulit kepala secara online dengan tim Gycora tanpa perlu datang langsung. Praktis, cepat, dan bisa dilakukan dari mana aja.",
    btn_start_online: "Mulai Konsultasi Online",
    consult_store_title: "Visit In Store",
    consult_store_desc:
      "Coba langsung produk favorit Gycora dan dapatkan pengalaman konsultasi secara langsung di booth atau store kami. Lebih personal dan nyaman untuk eksplor kebutuhanmu.",
    btn_view_location: "Lihat Lokasi Store",
    consult_problem_title:
      "Kami Paham, Kadang Sulit Menentukan Produk yang Cocok",
    consult_problem_p1: "Setiap orang punya kebutuhan rambut yang berbeda.",
    consult_problem_p2:
      "Mulai dari rambut mudah kusut, sulit diatur, kulit kepala berminyak, hingga rutinitas yang padat dan nggak punya banyak waktu untuk styling.",
    consult_problem_p3:
      "Karena itu, kami hadir untuk membantu kamu menemukan solusi yang lebih sesuai dan nyaman digunakan setiap hari.",
    consult_categories_title: "Kamu Bisa Konsultasi Tentang:",
    // cat_teen_acne: "Jerawat Remaja",
    // cat_adult_acne: "Jerawat Dewasa",
    // cat_baldness: "Kebotakan",
    // cat_hair_loss: "Rambut Rontok",
    // cat_beard_growth: "Penumbuh Brewok",
    // cat_dull_skin: "Kulit Kusam",
    // cat_acne_scars: "Bekas Jerawat",
    // cat_dandruff: "Ketombe",
    // [PERBAIKAN KATEGORI KONSULTASI - ID]
    cat_frizzy: "Rambut frizzy & mengembang",
    cat_tangled: "Rambut kusut & sulit diatur",
    cat_dry_coarse: "Rambut kering & kasar",
    cat_damaged: "Rambut rusak (bleaching/coloring)",
    cat_hairfall: "Rambut mudah rontok & patah",
    cat_oily_scalp: "Kulit kepala berminyak & buildup",
    cat_sensitive_scalp: "Kulit kepala sensitif & gatal",
    cat_baby_hair: "Baby hair berantakan & susah sleek",
    consult_cta_title: "Mulai Konsultasi dengan Gycora ✨",
    consult_cta_desc:
      "Karena self-care terasa lebih nyaman ketika kamu tahu apa yang benar-benar dibutuhkan rambutmu.",
    btn_contact_now: "Hubungi Kami Sekarang",

    // Swal Consult
    login_consult_desc:
      "Silakan login atau daftar terlebih dahulu untuk memulai konsultasi.",
    login_now: "Login Sekarang",
    swal_consult_title: "Konsultasi",
    swal_method_label: "Metode Konsultasi",
    swal_schedule_label: "Pilih Jadwal (Tgl & Waktu)",
    swal_notes_label: "Keluhan Singkat",
    swal_notes_placeholder: "Ceritakan detail keluhan Anda (Opsional)...",
    btn_continue_wa: "Lanjutkan ke WhatsApp",
    swal_validation_time: "Harap lengkapi jadwal konsultasi!",
    swal_redirect_title: "Mengalihkan...",
    swal_redirect_desc: "Membuka WhatsApp untuk melanjutkan konsultasi Anda.",
    swal_send_fail: "Gagal mengirim.",
    swal_req_fail: "Gagal mengirim permintaan.",

    // PRODUCT DETAIL EXPANSION [BARU]
    product_video_demo: "Video Demo",
    product_share_toast: "Link produk disalin!",
    product_max_stock_toast: "Maksimal stok adalah {stock}",
    product_cart_processing: "Memproses...",
    product_desc_empty: "Deskripsi belum tersedia.",
    product_guide_empty: "Panduan penggunaan belum tersedia untuk produk ini.",
    product_faq_empty:
      "Belum ada pertanyaan yang sering diajukan untuk produk ini.",
    product_review_empty: "Belum ada ulasan untuk produk ini.",
    product_verified_buyer: "Verified Buyer",

    // Taglines
    brush_tagline:
      "Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨",
    scalp_tagline:
      "Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨",

    // Content Tabs General
    guide_title: "Cara Penggunaan yang Tepat",

    // Brush Tab Contents
    brush_desc_p1:
      "Kenalin Ethereal Glow Brush, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.",
    brush_desc_p2:
      "Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.",
    brush_desc_p3:
      "Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.",
    brush_benefits_title: "Kenapa Banyak yang Suka Ethereal Glow Brush?",
    brush_benefit_1_bold: "Anti-Static Technology: ",
    brush_benefit_1_text:
      "Membantu mengurangi rambut mengembang, kusut, dan sulit diatur.",
    brush_benefit_2_bold: "Membantu Rambut Tampak Lebih Halus & Berkilau: ",
    brush_benefit_2_text:
      "Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan kilau alami.",
    brush_benefit_3_bold: "Flexible & Soft Bristles: ",
    brush_benefit_3_text:
      "Lembut di kulit kepala untuk membantu mengurangi rasa sakit dan rambut patah.",
    brush_benefit_4_bold: "Spiral Comb Design: ",
    brush_benefit_4_text:
      "Desain spiral mengikuti bentuk kepala dengan lebih nyaman.",
    brush_benefit_5_bold: "Eco-Friendly Material: ",
    brush_benefit_5_text:
      "Terbuat dari material Polylactic Acid Fiber yang ramah lingkungan.",
    brush_suitable_title: "Cocok Digunakan Untuk:",
    brush_suitable_1: "Rambut mudah kusut & mengembang",
    brush_suitable_2: "Rambut yang susah diatur",
    brush_suitable_3: "Penggunaan sehari-hari",
    brush_suitable_4: "Semua jenis rambut",
    brush_specs_title: "Detail Produk:",
    brush_specs_1: "Material: Carbon Molecule + Polylactic Acid Fiber",
    brush_specs_2: "Size: 25 x 7 cm",
    brush_specs_3: "Include: Premium Soft Box",

    // Brush Guide
    brush_guide_1:
      "Pastikan rambut dalam keadaan kering atau setengah kering (jangan basah kuyup).",
    brush_guide_2:
      "Sisir perlahan dari bagian tengah atau ujung rambut terlebih dahulu untuk mengurai kusut.",
    brush_guide_3:
      "Setelah bagian bawah rapi, lanjutkan menyisir dari akar hingga ke ujung rambut.",
    brush_guide_4:
      "Gunakan setiap pagi atau kapan pun rambut terasa berantakan/statis.",

    // Brush FAQ
    brush_faq_q1: "Q: Apakah aman untuk rambut rontok?",
    brush_faq_a1:
      "A: Ya, bulu sisirnya didesain lembut dan fleksibel sehingga meminimalisir tarikan yang bisa menyebabkan rambut patah/rontok.",
    brush_faq_q2: "Q: Bagaimana cara membersihkan sisir ini?",
    brush_faq_a2:
      "A: Kamu bisa menggunakan sikat kecil untuk membuang helaian rambut, lalu lap permukaan sisir dengan kain basah/tisu basah. Hindari merendam di dalam air terlalu lama.",

    // Scalp Tab Contents
    scalp_desc_p1:
      "Kenalin Eco Serenity Scalp Care, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.",
    scalp_desc_p2:
      "Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.",
    scalp_desc_p3:
      "Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.",
    scalp_benefits_title: "Kenapa Banyak yang Suka Eco Serenity Scalp Care?",
    scalp_benefit_1_bold: "Triple-Fold Structure Design: ",
    scalp_benefit_1_text:
      "Desain fleksibel yang mengikuti bentuk kepala untuk pijatan nyaman maksimal.",
    scalp_benefit_2_bold: "196 Flexible Teeth: ",
    scalp_benefit_2_text:
      "Membantu membersihkan merata dan memberi sensasi relaxing.",
    scalp_benefit_3_bold: "Membantu Membersihkan Kulit Kepala Lebih Optimal: ",
    scalp_benefit_3_text: "Mengangkat minyak dan penumpukan kotoran.",
    scalp_benefit_4_bold: "Relaxing Scalp Massage: ",
    scalp_benefit_4_text:
      "Pijatan lembut bantu melancarkan sirkulasi kulit kepala.",
    scalp_benefit_5_bold: "Anti-Microbial Silver Ion: ",
    scalp_benefit_5_text: "Teknologi ion perak menjaga kebersihan alat.",
    scalp_benefit_6_bold: "Ergonomic & Comfortable Grip: ",
    scalp_benefit_6_text: "Nyaman digenggam dalam berbagai posisi.",
    scalp_benefit_7_bold: "Multifungsi: ",
    scalp_benefit_7_text:
      "Cocok saat rambut kering (relaksasi) maupun saat keramas (pembersihan ekstra).",
    scalp_benefit_8_bold: "Eco-Friendly Material: ",
    scalp_benefit_8_text: "Terbuat dari material yang dapat didaur ulang.",
    scalp_suitable_title: "Cocok Digunakan Untuk:",
    scalp_suitable_1: "Kulit kepala mudah berminyak",
    scalp_suitable_2: "Kulit kepala dengan penumpukan kotoran",
    scalp_suitable_3: "Pengalaman keramas yang lebih nyaman",
    scalp_suitable_4: "Relaksasi ringan sehari-hari",
    scalp_suitable_5: "Semua jenis rambut",
    scalp_specs_title: "Detail Produk:",
    scalp_specs_1: "Material: Recyclable Material",
    scalp_specs_2: "Technology: Anti-Microbial Silver Ion",
    scalp_specs_3: "Heat Resistance: Up to 80°C",

    // Scalp Guide
    scalp_guide_1:
      "Saat Keramas: Aplikasikan sampo secara merata, gunakan Scalp Care dengan gerakan melingkar yang lembut untuk membersihkan kulit kepala.",
    scalp_guide_2:
      "Saat Rambut Kering: Gunakan sebagai alat pijat relaksasi di sela-sela aktivitas harian dengan tekanan ringan.",
    scalp_guide_3:
      "Bilas Scalp Care dengan air bersih setelah penggunaan bersama produk perawatan rambut.",

    // Scalp FAQ
    scalp_faq_q1: "Q: Apakah alat ini membuat rambut makin kusut saat keramas?",
    scalp_faq_a1:
      "A: Tidak, gunakan dengan gerakan memijat ke satu arah atau melingkar kecil. Hindari menggosok maju-mundur secara kasar agar rambut tetap rapi.",
    scalp_faq_q2: "Q: Apakah aman untuk kulit kepala sensitif?",
    scalp_faq_a2:
      "A: Sangat aman. Silikon yang digunakan cukup fleksibel sehingga memberikan pijatan tanpa melukai kulit kepala.",

    // Static Review Translations
    review_brush_1:
      "Sisir nya bagus banget sih sesuai dgn claim nya sblmnya aku pakai brand w krn rambutku rontok.. trs setelah aku compare sm brand Gycora ternyata jauh lbh ga rontok pakai Gycora",
    review_brush_2:
      "Sisirnya enak banget terutama buat rambut yg suka kusut Jd lebih gampang pake sisir dari Gycora..",
    review_brush_3:
      "Setelah saya pakai hair brush nya rambutku jadi lebih gak kusut dan bikin lebih pede pastinya..",
    review_brush_4:
      "Oke kok enak sisir nya lentur ngikutin kepala. ga nyangkut2 hehe",
    review_brush_5:
      "Sukaaa poll sma sisirnya... Rambut jd makin teratur pas disisir dan ga gerundel (kusut frizzy) n rambut ku ya uda ga tllu banyak yg rontok. terus sisirnya tu empuk dan nyaman poll di kepala ga sakit.",
    review_scalp_1:
      "Kemasan: Bagus\nEfek: Ketombe keluar semua, semoga bisa bersih pakai ini\nPengalaman Penggunaan: Rasanya rambut halus setelah pakai.",

    // USER PROFILE PAGE [BARU]
    profile_not_set: "Belum ada nomor",
    profile_gycora_points: "Gycora Points",
    profile_pts_label: "Pts",
    btn_favorite: "Favorit",
    btn_change_password: "Ubah Sandi",
    btn_edit_profile: "Edit Profil",

    // Edit Profile Modal
    modal_edit_profile_title: "Edit Profil",
    label_first_name: "Nama Depan",
    label_last_name: "Nama Belakang",
    label_email: "Email",
    label_phone: "Nomor Telepon",
    placeholder_phone: "Contoh: 081234567890",
    btn_cancel: "Batal",
    btn_save_profile: "Simpan Profil",
    toast_profile_updated: "Profil Diperbarui!",

    // Change Password Modal
    modal_change_pwd_title: "Ubah Sandi",
    label_current_pwd: "Sandi Saat Ini",
    label_new_pwd: "Sandi Baru",
    label_confirm_new_pwd: "Konfirmasi Sandi Baru",
    btn_save_pwd: "Ubah Sandi",
    warn_pwd_mismatch: "Kata sandi baru dan konfirmasi tidak cocok.",
    warn_pwd_length: "Kata sandi minimal 8 karakter.",
    toast_pwd_updated: "Kata sandi berhasil diperbarui.",

    // Photo Upload
    toast_img_too_large: "Maksimal ukuran foto adalah 2MB.",
    toast_img_wrong_format: "Harap unggah file berupa gambar (JPG, PNG).",
    toast_img_updated: "Foto berhasil diperbarui",

    // Address Book Section
    address_book_title: "Buku Alamat",
    address_book_desc:
      "Kelola alamat pengiriman untuk mempermudah proses checkout.",
    btn_add_address: "Tambah Alamat Baru",
    empty_address_title: "Belum ada alamat",
    empty_address_desc: "Tambahkan alamat pertama Anda sekarang.",
    label_main_address: "Alamat Utama",
    btn_edit: "Edit",
    btn_delete: "Hapus",

    // Address Form Modal
    modal_add_address_title: "Tambah Alamat Baru",
    modal_edit_address_title: "Edit Alamat Pengiriman",
    guide_map_text:
      "Geser dan klik pada peta di sebelah untuk mengisi data alamat otomatis. Anda tetap dapat mengedit isian di bawah ini secara manual.",
    btn_use_current_location: "Gunakan Lokasi Saat Ini",
    label_address_type: "Label Alamat",
    option_home: "Rumah",
    option_office: "Kantor",
    option_other: "Lainnya",
    label_full_address: "Detail Alamat Lengkap",
    placeholder_full_address: "Nama jalan, blok, RT/RW, atau patokan...",
    label_region: "Kecamatan",
    label_city: "Kota/Kabupaten",
    label_province: "Provinsi",
    label_postal_code: "Kode Pos",
    label_set_default_address: "Jadikan Alamat Utama Pengiriman",
    btn_save_address: "Simpan Alamat",
    btn_update_address: "Simpan Perubahan",
    toast_address_added: "Alamat ditambahkan.",
    toast_address_updated: "Alamat diperbarui.",
    warn_select_location: "Harap pilih titik lokasi pada peta.",

    // Delete Address Prompt
    prompt_delete_address_title: "Hapus alamat?",
    prompt_delete_address_text: "Tindakan ini tidak dapat dibatalkan.",
    btn_confirm_delete: "Hapus",
    toast_address_deleted: "Alamat telah dihapus.",

    // Map Location
    warn_location_denied: "Tolong izinkan akses lokasi di browser Anda.",
    warn_location_unsupported: "Browser Anda tidak mendukung fitur lokasi.",
    popup_selected_location: "Lokasi yang dipilih",

    // CART PAGE [BARU]
    cart_max_stock_warning: "Stok maksimum {stock} tercapai.",
    cart_update_fail: "Gagal mengubah kuantitas",
    cart_server_error: "Gagal terhubung ke server",
    cart_delete_fail: "Gagal menghapus item",
    cart_title: "Keranjang Belanja",
    cart_items_count: "({count} items)",
    cart_empty_title: "Keranjang Anda masih kosong.",
    btn_start_shopping: "Mulai Belanja",
    cart_select_all: "Pilih Semua Item",
    cart_sale_badge: "SALE",
    cart_variant_label: "Varian:",
    cart_per_pc: "/ pc",
    btn_remove: "Hapus",
    cart_suggest_title: "Mungkin Anda Juga Suka",
    btn_choose_variant: "Pilih Varian",
    btn_add_plus: "Tambah +",
    cart_summary_title: "Ringkasan Pesanan",
    cart_selected_items: "Item Dipilih",
    cart_estimated_total: "Estimasi Total",
    cart_tax_shipping_note: "Pajak & pengiriman dihitung saat checkout.",
    btn_checkout: "Checkout ({count})",
    cart_processing: "Memproses...",

    cat_all: "Semua",
    banner_title: "Temukan Favoritmu di Gycora",
    banner_desc:
      "Dari hair brush hingga scalp care, eksplor produk pilihan yang bikin rutinitas rambut terasa lebih praktis setiap hari.",
    search_prod_placeholder: "Cari produk...",
    no_product_found: "Produk tidak ditemukan",
    no_product_desc:
      "Coba ubah kata kunci pencarian atau filter kategori Anda.",
    reset_filter: "Reset Filter",
    variant_label_old: "Lama",
    variant_label_new: "Baru",
    btn_add_to_cart: "Tambah ke Keranjang",
    btn_processing: "Memproses...",
    stock_warning: "Sisa {stock}!",
    status_out_of_stock: "Habis",
    no_image_text: "Belum ada gambar",

    // CHAT PAGE [BARU]
    chat_title: "Hubungi Pakar Kami",
    chat_subtitle:
      "Pilih dokter atau staf Gycora untuk memulai konsultasi real-time.",
    chat_empty_msg: "Mulai obrolan Anda di sini...",
    chat_input_placeholder: "Ketik pesan...",

    // PAYMENT PAGE & CHECKOUT
    pay_loading_checkout: "Mempersiapkan checkout Anda...",
    pay_empty_items: "Tidak ada item dipilih",
    pay_btn_back_cart: "Kembali ke Keranjang",
    pay_checkout_title: "Checkout",
    pay_shipping_address: "Alamat Pengiriman",
    pay_add_address: "+ Tambah Alamat",
    pay_no_address: "Belum ada alamat tersimpan.",
    pay_new_address: "+ Tambah Alamat Baru",
    pay_shipping_method: "Metode Pengiriman",
    pay_method_pickup: "Ambil Sendiri",
    pay_method_pickup_desc: "In-Store Pickup (Surabaya)",
    pay_method_free: "Gratis",
    pay_method_courier: "Reguler / Express",
    pay_method_courier_desc: "Dikirim via kurir pilihan Anda",
    pay_choose_courier: "Pilih Ekspedisi",
    pay_calc_shipping: "Menghitung ongkos kirim...",
    pay_no_courier: "Tidak ada kurir tersedia untuk alamat ini.",
    pay_order_summary: "Ringkasan Pesanan",
    pay_total_items: "Total Barang",
    pay_product_subtotal: "Subtotal Barang",
    pay_promo_label: "Kode Promo / Voucher",
    pay_promo_placeholder: "Masukkan kode promo",
    pay_btn_apply: "Apply",
    pay_btn_remove: "Hapus",
    pay_loyalty_points: "Loyalty Points",
    pay_balance: "Saldo:",
    pay_btn_use: "Pakai",
    pay_btn_cancel: "Batal",
    pay_points_applied: "Points Applied",
    pay_shipping_cost: "Ongkos Kirim",
    pay_grand_total: "Grand Total",
    pay_btn_pay_now: "Bayar Sekarang",
    pay_btn_processing: "Memproses...",
    pay_alert_no_address: "* Silakan pilih alamat pengiriman",
    pay_alert_no_courier: "* Silakan pilih kurir pengiriman",
    main_address: "Utama",

    // ORDER PAGE
    order_track_title: "Track My Orders",
    order_tab_all: "Semua Pesanan",
    order_tab_unpaid: "Belum Dibayar",
    order_tab_to_ship: "Akan Dikirim",
    order_tab_shipping: "Sedang Dikirim",
    order_tab_completed: "Selesai",
    order_tab_cancelled: "Dibatalkan",
    order_tab_issues: "Kendala / Retur",
    order_search_placeholder: "Search Order ID, Courier...",
    order_show_label: "Show:",
    order_no_match: "Tidak ada pesanan yang sesuai dengan filter.",
    order_clear_filter: "Hapus Filter",
    order_date_label: "Tanggal",
    order_tap_to_pay: "Ketuk di sini untuk bayar",
    order_btn_review: "Beri Ulasan",
    order_btn_cancel: "Cancel",
    order_btn_pay: "Pay Now",
    order_btn_track: "Track Order",
    order_btn_refund: "Request to Refund",
    order_status_waiting_admin: "Waiting Admin",
    order_status_manual_refund: "Manual Refund",
    order_status_refund_now: "Refund Now",
    order_status_refund_rejected: "Refund Rejected",
    order_transaction_label: "Transaction:",
    order_shipping_label: "Shipping:",
    order_points_earned: "Points Earned",
    order_payment_info: "Payment Info",
    order_shipping_info: "Shipping Info",
    order_subtotal_products: "Subtotal for Products",
    order_shipping_subtotal: "Shipping Subtotal",
    order_final_amount: "Final Amount",
    order_showing: "Showing",
    order_to: "to",
    order_of: "of",
    order_orders: "orders",
    order_prev: "Previous",
    order_next: "Next",
    in_store_pickup: "Ambil Di Tempat",
    refunded: "REFUNDED",
    expired: "EXPIRED / CANCELLED",
    unpaid: "UNPAID",
    paid: "PAID",
    waiting_payment: "Waiting for payment selection...",
    no_courier: "No Courier",
    in_store_payment: "In-store Payment / Pickup",

    // HELP CENTER / FAQ PAGE
    hc_hero_title: "Hi, ada yang bisa kami bantu?",
    hc_hero_desc:
      "Temukan jawaban untuk pertanyaan seputar pesanan, pengiriman, dan produk Gycora.",
    hc_search_placeholder: "Cari pertanyaan... (misal: cara lacak pesanan)",
    hc_no_result_title: "Oops! Tidak ada hasil.",
    hc_no_result_desc: "Kami tidak dapat menemukan jawaban untuk",
    hc_btn_view_all: "Lihat Semua Pertanyaan",

    // FAQ Category: Pemesanan & Pembayaran
    hc_cat_order: "Pemesanan & Pembayaran",
    hc_q_order_1: "Bagaimana cara melacak pesanan saya?",
    hc_a_order_1:
      "Setelah pesanan Anda dikirim, Anda akan menerima email berisi nomor resi. Anda juga dapat melacaknya secara langsung melalui menu 'Order' di akun Anda.",
    hc_q_order_2: "Metode pembayaran apa saja yang didukung Gycora?",
    hc_a_order_2:
      "Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BNI, BRI), Kartu Kredit/Debit, GoPay, OVO, ShopeePay, dan QRIS.",
    hc_q_order_3: "Bisakah saya membatalkan atau mengubah pesanan?",
    hc_a_order_3:
      "Pesanan yang sudah dibayar dan masuk ke sistem kami akan langsung diproses. Jika Anda ingin membatalkan atau mengubah pesanan, harap segera hubungi Customer Service kami dalam waktu maksimal 1 jam setelah pembayaran.",

    // FAQ Category: Pengiriman
    hc_cat_shipping: "Pengiriman",
    hc_q_ship_1: "Berapa lama waktu pengiriman?",
    hc_a_ship_1:
      "Untuk wilayah Jabodetabek biasanya memakan waktu 1-3 hari kerja. Untuk wilayah di luar Jawa, estimasi pengiriman adalah 3-7 hari kerja tergantung ekspedisi yang dipilih.",
    hc_q_ship_2: "Apakah Gycora melayani pengiriman internasional?",
    hc_a_ship_2:
      "Saat ini kami hanya melayani pengiriman ke seluruh wilayah di Indonesia. Kami sedang berusaha memperluas jangkauan kami ke negara lain di masa mendatang!",

    // FAQ Category: Produk & Retur
    hc_cat_product: "Produk & Retur",
    hc_q_prod_1: "Apakah produk Gycora aman untuk ibu hamil dan menyusui?",
    hc_a_prod_1:
      "Ya, semua produk kami diformulasikan tanpa bahan kimia berbahaya seperti Paraben dan SLS. Namun, kami selalu menyarankan Anda untuk berkonsultasi dengan dokter kandungan sebelum mencoba produk perawatan baru.",
    hc_q_prod_2: "Bagaimana kebijakan pengembalian barang (Retur)?",
    hc_a_prod_2:
      "Anda dapat mengajukan pengembalian barang dalam waktu 14 hari sejak barang diterima jika barang rusak, cacat, atau tidak sesuai pesanan. Syarat lengkap dapat dibaca di halaman Return Policy kami.",

    // CTA Section
    hc_cta_title: "Masih butuh bantuan?",
    hc_cta_desc:
      "Tim Customer Care kami selalu siap membantu menyelesaikan kendala Anda. Jangan ragu untuk menghubungi kami.",
    hc_btn_contact: "Hubungi Kami",
    hc_btn_return: "Ajukan Retur",

    // FAQ PAGE - HEADER & FOOTER
    faq_page_subtitle: "FAQ Page",
    faq_page_title: "Frequently Asked Questions",
    faq_page_desc1:
      "Temukan jawaban dari pertanyaan yang paling sering ditanyakan tentang produk, penggunaan, pengiriman, hingga pengalaman belanja di Gycora.",
    faq_page_desc2:
      "Masih butuh bantuan? Tim kami siap membantu kamu kapan aja 🤍",
    faq_support_title: "Masih punya pertanyaan?",
    faq_support_desc:
      "Tidak menemukan jawaban yang kamu cari? Silakan chat dengan tim kami yang ramah.",
    faq_support_btn: "Hubungi Bantuan",

    // FAQ CATEGORY 1: Ethereal Glow Brush
    faq_cat1_title: "Tentang Ethereal Glow Brush",
    faq_c1_q1: "Apa itu Ethereal Glow Brush?",
    faq_c1_a1:
      "Ethereal Glow Brush adalah hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang membantu rambut terasa lebih halus, rapi, dan mudah diatur dalam sekali sisir.",
    faq_c1_q2: "Apa manfaat utama Ethereal Glow Brush?",
    faq_c1_a2:
      "Ethereal Glow Brush membantu mengurangi rambut kusut, mengembang, dan sulit diatur, sekaligus memberikan pengalaman menyisir yang lebih nyaman untuk penggunaan sehari-hari.",
    faq_c1_q3: "Apakah Ethereal Glow Brush cocok untuk semua jenis rambut?",
    faq_c1_a3:
      "Ya, Ethereal Glow Brush dirancang untuk berbagai jenis rambut, mulai dari lurus, bergelombang, hingga rambut yang mudah kusut dan mengembang.",
    faq_c1_q4: "Apakah sisir ini bisa digunakan setiap hari?",
    faq_c1_a4:
      "Tentu. Ethereal Glow Brush aman dan nyaman digunakan setiap hari untuk membantu menjaga rambut tetap rapi dan mudah diatur.",
    faq_c1_q5: "Apa bedanya dengan sisir biasa?",
    faq_c1_a5:
      "Ethereal Glow Brush menggunakan teknologi anti-static yang membantu mengurangi listrik statis pada rambut, sehingga rambut terasa lebih halus dan tidak mudah mengembang.",
    faq_c1_q6: "Apakah bulu sisirnya sakit di kulit kepala?",
    faq_c1_a6:
      "Tidak. Bulu sisir dirancang fleksibel dan lembut untuk memberikan pengalaman menyisir yang lebih nyaman tanpa rasa sakit atau tarikan berlebih.",
    faq_c1_q7:
      "Apakah Ethereal Glow Brush bisa membantu mengurangi rambut patah?",
    faq_c1_a7:
      "Bulu sisir yang fleksibel membantu mengurangi gesekan berlebih saat menyisir sehingga membantu meminimalkan risiko rambut patah.",

    // FAQ CATEGORY 2: Eco Serenity Scalp Care
    faq_cat2_title: "Tentang Eco Serenity Scalp Care",
    faq_c2_q1: "Apa itu Eco Serenity Scalp Care?",
    faq_c2_a1:
      "Eco Serenity Scalp Care adalah scalp massager yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang nyaman dan relaxing.",
    faq_c2_q2: "Apa manfaat menggunakan scalp massager?",
    faq_c2_a2:
      "Scalp massager membantu membersihkan kulit kepala lebih optimal, membantu mengurangi penumpukan minyak dan kotoran, serta memberikan efek relaksasi saat digunakan.",
    faq_c2_q3: "Apakah Eco Serenity bisa digunakan saat keramas?",
    faq_c2_a3:
      "Ya. Eco Serenity dapat digunakan saat keramas untuk membantu membersihkan kulit kepala dengan lebih maksimal.",
    faq_c2_q4: "Apakah bisa digunakan saat rambut kering?",
    faq_c2_a4:
      "Bisa. Selain saat keramas, Eco Serenity juga cocok digunakan untuk pijatan relaksasi pada kulit kepala saat rambut kering.",
    faq_c2_q5: "Apakah scalp massager ini aman untuk kulit kepala sensitif?",
    faq_c2_a5:
      "Eco Serenity dirancang dengan teeth yang lembut dan fleksibel agar tetap nyaman digunakan pada berbagai kondisi kulit kepala.",

    // FAQ CATEGORY 3: Pengiriman & Pemesanan
    faq_cat3_title: "Pengiriman & Pemesanan",
    faq_c3_q1: "Berapa lama proses pengiriman?",
    faq_c3_a1:
      "Waktu pengiriman menyesuaikan lokasi tujuan dan ekspedisi yang dipilih saat checkout.",
    faq_c3_q2: "Apakah tersedia pengiriman ke seluruh Indonesia?",
    faq_c3_a2: "Ya, Gycora melayani pengiriman ke seluruh Indonesia.",
    faq_c3_q3: "Bagaimana cara melacak pesanan saya?",
    faq_c3_a3:
      "Setelah pesanan diproses, kamu akan menerima nomor resi untuk melacak status pengiriman pesananmu.",
    faq_c3_q4: "Apakah produk Gycora original?",
    faq_c3_a4:
      "Ya. Seluruh produk yang dijual melalui official store Gycora merupakan produk original.",
    faq_c3_q5: "Bagaimana jika produk diterima dalam kondisi rusak?",
    faq_c3_a5:
      "Silakan hubungi tim customer support kami maksimal 1x24 jam setelah produk diterima dengan menyertakan video unboxing dan foto produk.",

    // FAQ CATEGORY 4: Penggunaan & Perawatan
    faq_cat4_title: "Penggunaan & Perawatan",
    faq_c4_q1: "Bagaimana cara membersihkan Ethereal Glow Brush?",
    faq_c4_a1:
      "Bersihkan secara berkala menggunakan air dan sabun lembut, lalu keringkan sebelum digunakan kembali.",
    faq_c4_q2: "Bagaimana cara membersihkan Eco Serenity Scalp Care?",
    faq_c4_a2:
      "Cukup bilas menggunakan air bersih setelah digunakan dan simpan di tempat kering.",
    faq_c4_q3: "Apakah produk Gycora aman digunakan setiap hari?",
    faq_c4_a3:
      "Ya, seluruh produk dirancang untuk penggunaan rutin sehari-hari sesuai kebutuhan.",

    // CONTACT US PAGE
    contact_login_req_title: "Login Diperlukan",
    contact_login_req_desc:
      "Silakan login terlebih dahulu untuk mengirim pesan ke layanan pelanggan kami.",
    contact_sent_title: "Terkirim!",
    contact_sent_desc: "Pesan Anda berhasil dikirim.",
    contact_err_send: "Gagal mengirim pesan",
    contact_err_server: "Terjadi kesalahan pada server.",
    contact_history_btn: "Riwayat Pesan Saya",
    contact_hero_title: "Get in Touch",
    contact_hero_desc:
      "Punya pertanyaan seputar produk, pesanan, atau kolaborasi? Tim Gycora siap membantu Anda.",
    contact_info_title: "Contact Information",
    contact_info_desc:
      "Isi formulir di samping dan tim Customer Care kami akan merespons dalam waktu 1x24 jam kerja.",
    contact_label_email: "Email",
    contact_label_phone: "Phone",
    contact_label_office: "Office",
    contact_office_region: "Surabaya, Jawa Timur",
    contact_office_country: "Indonesia",
    contact_form_name: "Nama Lengkap",
    contact_form_email: "Email Address",
    contact_form_phone: "Nomor Telepon",
    contact_form_phone_empty: "Nomor telepon belum diatur di profil",
    contact_form_message: "Detail Pesan",
    contact_form_message_placeholder:
      "Jelaskan kendala atau pertanyaan Anda secara detail di sini...",
    contact_btn_sending: "Mengirim...",
    contact_btn_send: "Kirim Pesan",
    contact_modal_title: "Riwayat Pesan",
    contact_modal_loading: "Memuat riwayat...",
    contact_modal_empty: "Anda belum pernah mengirim pesan.",
    contact_status_waiting: "Menunggu Balasan",
    contact_status_replied: "Telah Dibalas",
    contact_admin_unreplied:
      "Admin belum membalas pesan ini. Silakan periksa kembali nanti.",

    // REQUEST RETURN PAGE
    rr_swal_title: "Permintaan Retur Terkirim",
    rr_swal_desc:
      "Tim Customer Care kami akan segera meninjau permintaan Anda dan mengirimkan instruksi selanjutnya melalui email.",
    rr_title: "Request a Return",
    rr_desc:
      "Tidak puas dengan pesanan Anda? Silakan isi formulir di bawah ini untuk memulai proses pengembalian barang.",
    rr_policy_prefix: "Pastikan Anda telah membaca ",
    rr_policy_link: "Return Policy",
    rr_policy_suffix: " kami sebelum mengajukan.",
    rr_lbl_order: "Nomor Pesanan (Order ID)",
    rr_ph_order: "Contoh: INV-202604-001",
    rr_lbl_email: "Alamat Email",
    rr_ph_email: "Email yang digunakan saat memesan",
    rr_lbl_product: "Nama Produk yang Diretur",
    rr_ph_product: "Misal: Gycora Revitalizing Shampoo",
    rr_lbl_reason: "Alasan Retur",
    rr_opt_default: "Pilih alasan pengembalian...",
    rr_opt_damaged: "Produk rusak saat diterima (bocor/pecah)",
    rr_opt_wrong: "Produk yang dikirim salah/tidak sesuai pesanan",
    rr_opt_allergic: "Reaksi alergi/tidak cocok di kulit kepala",
    rr_opt_other: "Alasan lainnya",
    rr_lbl_detail: "Jelaskan Detail Masalah",
    rr_ph_detail:
      "Berikan informasi lebih lanjut mengenai kondisi barang yang Anda terima...",
    rr_btn_submitting: "Mengirim Permintaan...",
    rr_btn_submit: "Kirim Permintaan Retur",

    // REFUND POLICY PAGE
    ref_subtitle: "Legal & Kebijakan",
    ref_title: "Kebijakan Pengembalian Dana",
    ref_last_updated: "Terakhir diperbarui:",
    ref_lead_p1: "Kami memiliki ",
    ref_lead_strong: "kebijakan pengembalian 3 hari",
    ref_lead_p2:
      " setelah barang diterima. Untuk memulai retur, Anda harus memberikan video unboxing barang tanpa editan dan mengirimkannya kepada kami di ",
    ref_lead_p3:
      ". Semua biaya pengiriman barang retur ditanggung oleh pembeli.",
    ref_dmg_title: "Kerusakan dan Masalah",
    ref_dmg_p1:
      "Harap periksa pesanan Anda saat diterima dan segera hubungi kami di ",
    ref_dmg_p2:
      " jika barang cacat, rusak, atau jika Anda menerima barang yang salah, sehingga kami dapat mengevaluasi masalah tersebut dan memperbaikinya.",
    ref_exch_title: "Penukaran",
    ref_exch_p1:
      "Cara tercepat untuk memastikan Anda mendapatkan apa yang Anda inginkan adalah dengan mengembalikan barang yang Anda miliki, dan setelah retur diterima, lakukan pembelian terpisah untuk barang baru.",
    ref_ref_title: "Pengembalian Dana",
    ref_ref_p1:
      "Kami akan memberi tahu Anda setelah kami menerima dan memeriksa retur Anda, dan memberi tahu Anda apakah pengembalian dana disetujui atau tidak. Jika disetujui, dana Anda akan otomatis dikembalikan ke metode pembayaran asli Anda dalam waktu ",
    ref_ref_strong: "30 hari kerja",
    ref_ref_p2:
      ". Harap diingat bahwa mungkin perlu beberapa saat bagi bank atau perusahaan kartu kredit Anda untuk memproses dan membukukan pengembalian dana tersebut.",
    ref_ref_p3:
      "Jika lebih dari 15 hari kerja telah berlalu sejak kami menyetujui retur Anda, silakan hubungi kami di ",
    ref_ref_p4: ".",

    // SHIPPING POLICY PAGE
    sp_subtitle: "Legal & Kebijakan",
    sp_title: "Kebijakan Pengiriman",
    sp_desc: "Informasi pengiriman dan logistik Gycora.",
    sp_sec1_title: "1. Waktu Proses",
    sp_sec1_p1: "Semua pesanan diproses dalam waktu ",
    sp_sec1_strong: "1 hari kerja",
    sp_sec1_p2:
      " (tidak termasuk akhir pekan dan hari libur) setelah menerima email konfirmasi pesanan Anda. Anda akan menerima pemberitahuan lain ketika pesanan Anda telah dikirim.",
    sp_sec2_title: "2. Tarif dan Estimasi Pengiriman Domestik",
    sp_sec2_p1:
      "Kami menawarkan opsi pengiriman berikut untuk pesanan domestik:",
    sp_sec2_li1_strong: "Pengiriman Standar:",
    sp_sec2_li1_text: " [menyesuaikan tarif dan waktu ekspedisi]",
    sp_sec2_li2_strong: "Pengiriman Ekspres:",
    sp_sec2_li2_text: " [menyesuaikan tarif dan waktu ekspedisi]",
    sp_sec2_p2:
      "Biaya pengiriman untuk pesanan Anda akan dihitung secara otomatis dan ditampilkan pada saat checkout.",
    sp_sec3_title: "3. Pengiriman Internasional",
    sp_sec3_p1:
      "Kami melayani pengiriman internasional dan tarif pengiriman bervariasi tergantung pada negara tujuan. Silakan hubungi kami di ",
    sp_sec3_p2: " untuk mengetahui tarif ke negara Anda.",
    sp_sec3_p3:
      "Harap diperhatikan bahwa pesanan internasional mungkin dikenakan bea, pajak, atau biaya bea cukai tambahan, yang sepenuhnya merupakan tanggung jawab pelanggan.",
    sp_sec4_title: "4. Pelacakan Pesanan",
    sp_sec4_p1:
      "Anda akan menerima nomor resi (pelacakan) melalui email setelah pesanan Anda dikirim. Harap tunggu 1x24 jam hingga informasi pelacakan tersedia di sistem.",
    sp_sec5_title: "5. Keterlambatan Pengiriman",
    sp_sec5_p1:
      "Harap diperhatikan bahwa waktu pengiriman mungkin tertunda karena keadaan yang tidak terduga seperti hari libur, kondisi cuaca, atau peristiwa global lainnya. Kami akan memberi tahu Anda sesegera mungkin jika ada penundaan yang signifikan pada pesanan Anda.",
    sp_sec6_title: "6. Paket Hilang atau Rusak",
    sp_sec6_p1:
      "Kami tidak bertanggung jawab atas paket yang hilang atau rusak selama pengiriman oleh pihak ketiga. Jika paket Anda tiba dalam keadaan rusak atau jika Anda yakin paket Anda hilang, silakan hubungi pihak ekspedisi pengiriman terkait untuk mengajukan klaim.",
    sp_sec7_title: "7. Pertanyaan Tentang Pesanan Anda?",
    sp_sec7_p1:
      "Jika Anda memiliki pertanyaan tentang pesanan Anda, waktu pengiriman, atau pelacakan, jangan ragu untuk menghubungi tim customer service kami di ",

    // PRIVACY POLICY PAGE
    pp_nav_home: "Beranda",
    pp_nav_legal: "Legal",
    pp_title: "Kebijakan Privasi",
    pp_last_updated: "Terakhir diperbarui:",
    pp_s1_title: "1. Pendahuluan",
    pp_s1_p1:
      " menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi pelanggan kami sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, membagikan, dan melindungi data pribadi Anda saat Anda mengunjungi situs web kami.",
    pp_s2_title: "2. Pengumpulan Data",
    pp_s2_p1: "Kami dapat mengumpulkan data pribadi berikut:",
    pp_s2_l1_strong: "Informasi Pribadi:",
    pp_s2_l1_text:
      " nama, alamat email, nomor telepon, alamat pos, detail pembayaran, dan informasi lain yang diberikan selama pendaftaran, pemrosesan pesanan, atau pertanyaan layanan pelanggan.",
    pp_s2_l2_strong: "Informasi Perangkat dan Penggunaan:",
    pp_s2_l2_text:
      " alamat IP, jenis browser, pengidentifikasi perangkat, dan informasi teknis lainnya melalui cookie dan teknologi pelacakan serupa.",
    pp_s3_title: "3. Tujuan Pengumpulan Data",
    pp_s3_p1:
      "Kami menggunakan data Anda untuk tujuan yang diizinkan oleh UU PDP, termasuk:",
    pp_s3_l1: "Memproses dan memenuhi pesanan Anda.",
    pp_s3_l2: "Meningkatkan fungsionalitas situs web dan pengalaman pelanggan.",
    pp_s3_l3:
      "Mengirimkan pembaruan pesanan, penawaran pemasaran (dengan persetujuan Anda), dan menanggapi pertanyaan Anda.",
    pp_s3_l4: "Mematuhi kewajiban hukum dan peraturan.",
    pp_s4_title: "4. Dasar Hukum Pemrosesan",
    pp_s4_p1:
      "Kami hanya mengumpulkan dan memproses data Anda jika diizinkan oleh hukum, seperti untuk pemenuhan pesanan, berdasarkan persetujuan Anda, atau untuk mematuhi persyaratan hukum.",
    pp_s5_title: "5. Pembagian Data Pribadi",
    pp_s5_p1:
      "Data pribadi Anda dapat dibagikan dengan pihak ketiga tepercaya, termasuk:",
    pp_s5_l1_strong: "Penyedia Layanan:",
    pp_s5_l1_text:
      " seperti pemroses pembayaran, layanan pengiriman, dan platform pemasaran email untuk memfasilitasi layanan atas nama kami.",
    pp_s5_l2_strong: "Kewajiban Hukum:",
    pp_s5_l2_text:
      " jika diwajibkan oleh hukum Indonesia atau atas permintaan pemerintah yang sah.",
    pp_s5_p2:
      "Semua pihak ketiga yang menerima data harus menanganinya dengan tingkat keamanan dan kerahasiaan yang sama seperti yang diwajibkan berdasarkan UU PDP.",
    pp_s6_title: "6. Keamanan Data",
    pp_s6_p1:
      "Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk melindungi data Anda dari akses, perubahan, atau pengungkapan yang tidak sah. Terlepas dari upaya kami, tidak ada sistem yang sepenuhnya aman, jadi harap berhati-hati saat membagikan informasi secara online.",
    pp_s7_title: "7. Penyimpanan Data",
    pp_s7_p1:
      "Kami menyimpan data pribadi Anda hanya selama diperlukan untuk memenuhi tujuan pengumpulannya atau sebagaimana diwajibkan oleh hukum. Setelah mencapai akhir masa simpannya, kami akan menghapus atau menganonimkan data Anda secara aman.",
    pp_s8_title: "8. Hak Anda Berdasarkan Hukum Indonesia",
    pp_s8_p1: "Berdasarkan UU PDP, Anda berhak untuk:",
    pp_s8_l1: "Mengakses, memperbarui, atau mengoreksi data pribadi Anda.",
    pp_s8_l2: "Menarik persetujuan Anda kapan saja.",
    pp_s8_l3:
      "Meminta penghapusan data Anda jika tidak lagi diperlukan untuk tujuan pengumpulannya.",
    pp_s8_p2: "Untuk menggunakan hak-hak ini, silakan hubungi kami di ",
    pp_s9_title: "9. Cookie dan Pelacakan",
    pp_s9_p1:
      "Kami menggunakan cookie untuk meningkatkan pengalaman Anda di situs web kami. Anda dapat menyesuaikan pengaturan browser Anda untuk menonaktifkan cookie, namun perlu diingat bahwa ini dapat membatasi akses Anda ke fitur-fitur tertentu.",
    pp_s10_title: "10. Perubahan Kebijakan Privasi Kami",
    pp_s10_p1:
      "Kami dapat memperbarui Kebijakan Privasi kami sesuai dengan UU PDP. Kami akan memberi tahu Anda tentang perubahan signifikan apa pun melalui situs web kami atau melalui email.",
    pp_s11_title: "11. Hubungi Kami",
    pp_s11_p1:
      "Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda berdasarkan UU PDP, silakan hubungi kami di:",
    pp_s11_address: "Alamat: Indonesia, Surabaya, Jawa Timur 60226, Indonesia",

    // TERMS OF SERVICE
    legal_and_policies: "Legal & Kebijakan",
    terms_of_service: "Syarat & Ketentuan Layanan",
    last_updated: "Terakhir diperbarui:",
    overview: "GAMBARAN UMUM",
    overview_1_1:
      "Situs web ini dioperasikan oleh My Store. Di seluruh situs ini, istilah 'kami', 'milik kami', dan 'kita' mengacu pada My Store. My Store menyediakan situs web ini, termasuk seluruh informasi, alat, dan Layanan yang tersedia di situs ini kepada Anda sebagai pengguna, dengan syarat Anda menerima seluruh ketentuan, syarat, kebijakan, dan pemberitahuan yang tercantum di sini.",
    overview_1_2:
      "Dengan mengunjungi situs kami dan/atau membeli sesuatu dari kami, Anda menggunakan 'Layanan' kami dan setuju untuk terikat oleh syarat dan ketentuan berikut ('Syarat & Ketentuan Layanan', 'Syarat'), termasuk syarat tambahan serta kebijakan yang dirujuk di dalamnya dan/atau tersedia melalui tautan. Syarat & Ketentuan Layanan ini berlaku untuk semua pengguna situs, termasuk namun tidak terbatas pada pengunjung, vendor, pelanggan, pedagang, dan/atau kontributor konten.",
    overview_1_3:
      "Harap baca Syarat & Ketentuan Layanan ini dengan saksama sebelum mengakses atau menggunakan situs web kami. Dengan mengakses atau menggunakan bagian apa pun dari situs ini, Anda setuju untuk terikat oleh Syarat & Ketentuan Layanan ini. Jika Anda tidak menyetujui seluruh syarat dan ketentuan dalam perjanjian ini, maka Anda tidak diperkenankan mengakses situs web atau menggunakan Layanan apa pun. Jika Syarat & Ketentuan Layanan ini dianggap sebagai suatu penawaran, maka penerimaan secara tegas dibatasi hanya pada Syarat & Ketentuan Layanan ini.",
    overview_1_4:
      "Setiap fitur atau alat baru yang ditambahkan ke toko saat ini juga akan tunduk pada Syarat & Ketentuan Layanan ini. Anda dapat meninjau versi terbaru dari Syarat & Ketentuan Layanan kapan saja di halaman ini. Kami berhak untuk memperbarui, mengubah, atau mengganti bagian apa pun dari Syarat & Ketentuan Layanan ini dengan memposting pembaruan dan/atau perubahan di situs web kami. Menjadi tanggung jawab Anda untuk memeriksa halaman ini secara berkala terhadap perubahan. Penggunaan atau akses Anda yang berkelanjutan ke situs web setelah perubahan dipublikasikan dianggap sebagai penerimaan terhadap perubahan tersebut.",
    overview_1_5:
      "Toko kami dihosting oleh Shopify Inc. Mereka menyediakan platform e-commerce online yang memungkinkan kami menjual produk dan Layanan kami kepada Anda.",

    section_1: "BAGIAN 1 - KETENTUAN TOKO ONLINE",
    section_1_1:
      "Dengan menyetujui Syarat & Ketentuan Layanan ini, Anda menyatakan bahwa Anda telah mencapai usia dewasa menurut hukum di negara bagian atau provinsi tempat tinggal Anda, atau bahwa Anda telah mencapai usia dewasa menurut hukum dan telah memberikan izin kepada kami untuk memperbolehkan tanggungan Anda yang masih di bawah umur menggunakan situs ini.",
    section_1_2:
      "Anda tidak boleh menggunakan produk kami untuk tujuan yang melanggar hukum atau tidak sah, maupun melanggar hukum apa pun yang berlaku di yurisdiksi Anda (termasuk namun tidak terbatas pada undang-undang hak cipta) saat menggunakan Layanan ini.",
    section_1_3:
      "Anda tidak boleh mengirimkan worm, virus, atau kode apa pun yang bersifat merusak.",
    section_1_4:
      "Pelanggaran terhadap salah satu Syarat akan mengakibatkan penghentian Layanan Anda secara langsung.",

    section_2: "BAGIAN 2 - KETENTUAN UMUM",
    section_2_1:
      "Kami berhak menolak memberikan Layanan kepada siapa pun dengan alasan apa pun dan kapan pun.",
    section_2_2:
      "Anda memahami bahwa konten Anda (tidak termasuk informasi kartu kredit) dapat ditransfer tanpa enkripsi dan melibatkan (a) transmisi melalui berbagai jaringan; dan (b) perubahan untuk menyesuaikan dengan persyaratan teknis jaringan atau perangkat yang terhubung. Informasi kartu kredit selalu dienkripsi selama proses transfer melalui jaringan.",
    section_2_3:
      "Anda setuju untuk tidak mereproduksi, menggandakan, menyalin, menjual, menjual kembali, atau memanfaatkan bagian apa pun dari Layanan, penggunaan Layanan, akses ke Layanan, atau kontak apa pun di situs web tempat Layanan disediakan tanpa izin tertulis dari kami.",
    section_2_4:
      "Judul bagian yang digunakan dalam perjanjian ini hanya disertakan untuk kemudahan referensi dan tidak akan membatasi atau memengaruhi Syarat ini.",

    section_3: "BAGIAN 3 - AKURASI, KELENGKAPAN, DAN KETEPATAN WAKTU INFORMASI",
    section_3_1:
      "Kami tidak bertanggung jawab apabila informasi yang tersedia di situs ini tidak akurat, lengkap, atau terkini. Materi di situs ini disediakan hanya untuk informasi umum dan tidak boleh dijadikan satu-satunya dasar dalam pengambilan keputusan tanpa berkonsultasi dengan sumber informasi utama yang lebih akurat, lengkap, dan terbaru. Segala bentuk ketergantungan terhadap materi di situs ini menjadi risiko Anda sendiri.",
    section_3_2:
      "Situs ini dapat berisi informasi historis tertentu. Informasi historis pada dasarnya bukan informasi terkini dan disediakan hanya sebagai referensi Anda. Kami berhak mengubah isi situs ini kapan saja, namun kami tidak berkewajiban memperbarui informasi apa pun di situs kami. Anda setuju bahwa menjadi tanggung jawab Anda untuk memantau perubahan pada situs kami.",

    section_4: "BAGIAN 4 - PERUBAHAN TERHADAP LAYANAN DAN HARGA",
    section_4_1:
      "Harga produk kami dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.",
    section_4_2:
      "Kami berhak kapan saja untuk mengubah atau menghentikan Layanan (atau bagian maupun isi dari Layanan tersebut) tanpa pemberitahuan sebelumnya.",
    section_4_3:
      "Kami tidak bertanggung jawab kepada Anda maupun pihak ketiga atas setiap perubahan, perubahan harga, penangguhan, atau penghentian Layanan.",

    section_5: "BAGIAN 5 - PRODUK ATAU LAYANAN (JIKA BERLAKU)",
    section_5_1:
      "Produk atau Layanan tertentu mungkin hanya tersedia secara eksklusif melalui situs web. Produk atau Layanan tersebut mungkin memiliki jumlah terbatas dan hanya dapat dikembalikan atau ditukar sesuai dengan",
    section_5_2: "Kebijakan Pengembalian Dana",
    section_5_3:
      "Kami telah berupaya semaksimal mungkin untuk menampilkan warna dan gambar produk kami seakurat mungkin sebagaimana ditampilkan di toko. Namun, kami tidak dapat menjamin bahwa tampilan warna pada monitor komputer Anda akan sepenuhnya akurat.",
    section_5_4:
      "Kami berhak, namun tidak berkewajiban, untuk membatasi penjualan produk atau Layanan kami kepada individu, wilayah geografis, atau yurisdiksi tertentu. Kami dapat menggunakan hak ini berdasarkan pertimbangan kasus per kasus. Kami juga berhak membatasi jumlah produk atau Layanan yang kami tawarkan. Semua deskripsi produk atau harga produk dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya, sesuai kebijakan kami. Kami berhak menghentikan penawaran produk apa pun kapan saja. Setiap penawaran produk atau Layanan yang dibuat di situs ini menjadi tidak berlaku apabila dilarang oleh hukum yang berlaku.",
    section_5_5:
      "Kami tidak menjamin bahwa kualitas produk, Layanan, informasi, atau materi lain yang Anda beli atau peroleh akan memenuhi harapan Anda, maupun bahwa setiap kesalahan dalam Layanan akan diperbaiki.",
    section_6: "BAGIAN 6 - AKURASI INFORMASI PENAGIHAN DAN AKUN",
    section_6_1:
      "Kami berhak menolak pesanan apa pun yang Anda lakukan kepada kami. Atas kebijakan kami sendiri, kami dapat membatasi atau membatalkan jumlah pembelian per individu, per rumah tangga, atau per pesanan. Pembatasan ini dapat mencakup pesanan yang dilakukan melalui akun pelanggan yang sama, kartu kredit yang sama, dan/atau menggunakan alamat penagihan maupun pengiriman yang sama. Jika kami melakukan perubahan atau pembatalan terhadap suatu pesanan, kami dapat mencoba memberi tahu Anda dengan menghubungi alamat email dan/atau alamat penagihan atau nomor telepon yang diberikan saat pesanan dibuat. Kami juga berhak membatasi atau melarang pesanan yang menurut penilaian kami tampak dilakukan oleh dealer, pengecer kembali, atau distributor.",
    section_6_2:
      "Anda setuju untuk memberikan informasi pembelian dan akun yang terkini, lengkap, dan akurat untuk setiap pembelian yang dilakukan di toko kami. Anda juga setuju untuk segera memperbarui akun dan informasi lainnya, termasuk alamat email, nomor kartu kredit, serta tanggal kedaluwarsa kartu kredit Anda, agar kami dapat menyelesaikan transaksi dan menghubungi Anda bila diperlukan.",

    for_more_details: "Untuk informasi lebih lanjut, silakan tinjau",
    refund_policy: "Kebijakan Pengembalian Dana",

    section_7: "BAGIAN 7 - ALAT OPSIONAL",
    section_7_1:
      "Kami dapat menyediakan akses kepada Anda untuk menggunakan alat pihak ketiga yang tidak kami pantau, kendalikan, maupun kelola.",
    section_7_2:
      "Anda mengakui dan menyetujui bahwa kami menyediakan akses ke alat tersebut 'sebagaimana adanya' dan 'sebagaimana tersedia' tanpa jaminan, pernyataan, atau syarat apa pun serta tanpa dukungan atau rekomendasi dari kami. Kami tidak bertanggung jawab atas segala hal yang timbul dari atau terkait dengan penggunaan alat opsional pihak ketiga tersebut oleh Anda.",
    section_7_3:
      "Setiap penggunaan alat opsional yang tersedia melalui situs ini sepenuhnya menjadi risiko dan kebijakan Anda sendiri. Anda harus memastikan bahwa Anda memahami dan menyetujui syarat penggunaan yang ditetapkan oleh penyedia pihak ketiga terkait.",
    section_7_4:
      "Di masa mendatang, kami juga dapat menawarkan Layanan dan/atau fitur baru melalui situs web ini (termasuk peluncuran alat dan sumber daya baru). Fitur dan/atau Layanan baru tersebut juga akan tunduk pada Syarat & Ketentuan Layanan ini.",

    section_8: "BAGIAN 8 - TAUTAN PIHAK KETIGA",
    section_8_1:
      "Beberapa konten, produk, dan Layanan yang tersedia melalui Layanan kami dapat mencakup materi dari pihak ketiga.",
    section_8_2:
      "Tautan pihak ketiga di situs ini dapat mengarahkan Anda ke situs web pihak ketiga yang tidak berafiliasi dengan kami. Kami tidak bertanggung jawab untuk memeriksa atau mengevaluasi isi maupun keakuratan informasi tersebut, dan kami tidak memberikan jaminan serta tidak memiliki tanggung jawab atas materi atau situs web pihak ketiga, maupun produk, materi, atau Layanan lain yang disediakan oleh pihak ketiga.",
    section_8_3:
      "Kami tidak bertanggung jawab atas kerugian atau kerusakan apa pun yang berkaitan dengan pembelian atau penggunaan barang, Layanan, sumber daya, konten, atau transaksi lain yang dilakukan melalui situs web pihak ketiga. Harap tinjau dengan saksama kebijakan dan praktik pihak ketiga tersebut serta pastikan Anda memahaminya sebelum melakukan transaksi apa pun. Keluhan, klaim, kekhawatiran, atau pertanyaan terkait produk pihak ketiga harus ditujukan langsung kepada pihak ketiga yang bersangkutan.",

    section_9: "BAGIAN 9 - KOMENTAR PENGGUNA, MASUKAN, DAN KIRIMAN LAINNYA",
    section_9_1:
      "Jika atas permintaan kami Anda mengirimkan kiriman tertentu (misalnya entri kontes), atau tanpa permintaan dari kami Anda mengirimkan ide kreatif, saran, proposal, rencana, atau materi lainnya, baik secara online, melalui email, surat, maupun cara lainnya (secara bersama-sama disebut sebagai 'komentar'), maka Anda setuju bahwa kami dapat, kapan saja dan tanpa batasan, mengedit, menyalin, menerbitkan, mendistribusikan, menerjemahkan, dan menggunakan komentar yang Anda kirimkan kepada kami dalam media apa pun. Kami tidak berkewajiban untuk (1) menjaga kerahasiaan komentar apa pun; (2) memberikan kompensasi atas komentar apa pun; atau (3) memberikan tanggapan terhadap komentar apa pun.",
    section_9_2:
      "Kami dapat, namun tidak berkewajiban untuk, memantau, mengedit, atau menghapus konten yang menurut kebijakan kami sendiri bersifat melanggar hukum, menyinggung, mengancam, memfitnah, mencemarkan nama baik, pornografis, tidak senonoh, atau dianggap tidak pantas, maupun yang melanggar hak kekayaan intelektual pihak mana pun atau Syarat & Ketentuan Layanan ini.",
    section_9_3:
      "Anda setuju bahwa komentar yang Anda kirimkan tidak akan melanggar hak pihak ketiga mana pun, termasuk hak cipta, merek dagang, privasi, hak personalitas, atau hak pribadi maupun hak kepemilikan lainnya. Anda juga setuju bahwa komentar Anda tidak akan mengandung materi yang memfitnah, melanggar hukum, bersifat kasar, atau tidak senonoh, serta tidak mengandung virus komputer atau malware lain yang dapat memengaruhi operasional Layanan atau situs web terkait. Anda tidak diperkenankan menggunakan alamat email palsu, menyamar sebagai orang lain, atau dengan cara apa pun menyesatkan kami maupun pihak ketiga mengenai asal-usul komentar tersebut. Anda bertanggung jawab sepenuhnya atas komentar yang Anda buat dan keakuratannya. Kami tidak bertanggung jawab dan tidak menerima tanggung jawab apa pun atas komentar yang dipublikasikan oleh Anda maupun pihak ketiga.",

    section_10: "BAGIAN 10 - INFORMASI PRIBADI",
    section_10_1:
      "Pengiriman informasi pribadi Anda melalui toko ini diatur oleh Kebijakan Privasi kami, yang dapat dilihat di sini:",
    privacy_policy: "Kebijakan Privasi",

    section_11: "BAGIAN 11 - KESALAHAN, KETIDAKAKURATAN, DAN KELALAIAN",
    section_11_1:
      "Terkadang mungkin terdapat informasi di situs kami atau dalam Layanan yang mengandung kesalahan pengetikan, ketidakakuratan, atau kelalaian yang berkaitan dengan deskripsi produk, harga, promosi, penawaran, biaya pengiriman produk, waktu pengiriman, dan ketersediaan produk. Kami berhak untuk memperbaiki setiap kesalahan, ketidakakuratan, atau kelalaian tersebut, serta mengubah atau memperbarui informasi maupun membatalkan pesanan apabila informasi dalam Layanan atau situs web terkait tidak akurat kapan saja tanpa pemberitahuan sebelumnya (termasuk setelah Anda mengirimkan pesanan).",
    section_11_2:
      "Kami tidak memiliki kewajiban untuk memperbarui, mengubah, atau memperjelas informasi dalam Layanan maupun situs web terkait, termasuk namun tidak terbatas pada informasi harga, kecuali jika diwajibkan oleh hukum yang berlaku. Tidak adanya tanggal pembaruan atau penyegaran tertentu dalam Layanan atau situs web terkait tidak dapat dianggap sebagai indikasi bahwa seluruh informasi di dalamnya telah dimodifikasi atau diperbarui.",

    section_12: "BAGIAN 12 - PENGGUNAAN YANG DILARANG",
    section_12_1:
      "Selain larangan lain yang telah ditetapkan dalam Syarat & Ketentuan Layanan ini, Anda dilarang menggunakan situs atau kontennya untuk: (a) tujuan yang melanggar hukum; (b) mengajak atau mendorong orang lain untuk melakukan tindakan yang melanggar hukum; (c) melanggar peraturan, ketentuan, undang-undang, atau peraturan daerah yang berlaku baik di tingkat internasional, nasional, provinsi, maupun wilayah setempat; (d) melanggar atau menyalahgunakan hak kekayaan intelektual kami maupun pihak lain; (e) melakukan pelecehan, penghinaan, intimidasi, diskriminasi, pencemaran nama baik, atau tindakan merugikan lainnya berdasarkan jenis kelamin, orientasi seksual, agama, etnis, ras, usia, asal kebangsaan, atau disabilitas; (f) memberikan informasi yang salah atau menyesatkan; (g) mengunggah atau mengirim virus maupun kode berbahaya lainnya yang dapat memengaruhi fungsi atau operasional Layanan, situs web terkait, situs web lain, atau internet; (h) mengumpulkan atau melacak informasi pribadi orang lain; (i) melakukan spam, phishing, pharming, pretexting, spidering, crawling, atau scraping; (j) tujuan yang tidak senonoh atau tidak bermoral; atau (k) mengganggu atau mencoba menghindari fitur keamanan dari Layanan, situs web terkait, situs web lain, maupun internet. Kami berhak menghentikan penggunaan Layanan atau situs web terkait oleh Anda apabila melanggar salah satu ketentuan penggunaan yang dilarang tersebut.",

    section_13: "BAGIAN 13 - PENAFIAN JAMINAN; BATASAN TANGGUNG JAWAB",
    section_13_1:
      "Kami tidak menjamin, menyatakan, atau memberikan garansi bahwa penggunaan Layanan kami oleh Anda akan berlangsung tanpa gangguan, tepat waktu, aman, atau bebas dari kesalahan.",
    section_13_2:
      "Kami tidak menjamin bahwa hasil yang diperoleh dari penggunaan Layanan akan akurat atau dapat diandalkan.",
    section_13_3:
      "Anda setuju bahwa sewaktu-waktu kami dapat menghentikan sementara Layanan untuk jangka waktu yang tidak ditentukan atau membatalkan Layanan kapan saja tanpa pemberitahuan kepada Anda.",
    section_13_4:
      "Anda secara tegas setuju bahwa penggunaan atau ketidakmampuan Anda untuk menggunakan Layanan sepenuhnya menjadi risiko Anda sendiri. Layanan dan seluruh produk maupun Layanan yang diberikan kepada Anda melalui Layanan ini (kecuali dinyatakan lain secara tegas oleh kami) disediakan 'sebagaimana adanya' dan 'sebagaimana tersedia' untuk digunakan oleh Anda tanpa pernyataan, jaminan, atau syarat apa pun, baik yang tersurat maupun tersirat, termasuk namun tidak terbatas pada jaminan atau syarat tersirat mengenai kelayakan jual, kualitas yang layak diperdagangkan, kesesuaian untuk tujuan tertentu, daya tahan, kepemilikan, dan tidak adanya pelanggaran hak pihak lain.",
    section_13_5:
      "Dalam keadaan apa pun, My Store, direktur, pejabat, karyawan, afiliasi, agen, kontraktor, peserta magang, pemasok, penyedia Layanan, atau pemberi lisensi kami tidak bertanggung jawab atas cedera, kerugian, klaim, maupun kerusakan langsung, tidak langsung, insidental, hukuman, khusus, atau konsekuensial dalam bentuk apa pun, termasuk namun tidak terbatas pada kehilangan keuntungan, kehilangan pendapatan, kehilangan tabungan, kehilangan data, biaya penggantian, atau kerugian serupa lainnya, baik berdasarkan kontrak, perbuatan melawan hukum (termasuk kelalaian), tanggung jawab mutlak, maupun dasar hukum lainnya, yang timbul dari penggunaan Layanan atau produk yang diperoleh melalui Layanan, maupun klaim lain yang berkaitan dengan penggunaan Layanan atau produk oleh Anda, termasuk namun tidak terbatas pada kesalahan atau kelalaian dalam konten apa pun, atau kerugian maupun kerusakan yang timbul akibat penggunaan Layanan atau konten (atau produk) yang dipublikasikan, dikirimkan, atau tersedia melalui Layanan, meskipun kami telah diberitahukan mengenai kemungkinan terjadinya kerugian tersebut. Karena beberapa yurisdiksi tidak mengizinkan pengecualian atau pembatasan tanggung jawab atas kerusakan insidental atau konsekuensial, maka di yurisdiksi tersebut tanggung jawab kami akan dibatasi sejauh yang diizinkan oleh hukum yang berlaku.",

    section_14: "BAGIAN 14 - GANTI RUGI (INDEMNIFIKASI)",
    section_14_1:
      "Anda setuju untuk memberikan ganti rugi, membela, dan membebaskan My Store beserta perusahaan induk, anak perusahaan, afiliasi, mitra, pejabat, direktur, agen, kontraktor, pemberi lisensi, penyedia Layanan, subkontraktor, pemasok, peserta magang, dan karyawan kami dari setiap klaim atau tuntutan, termasuk biaya pengacara yang wajar, yang diajukan oleh pihak ketiga akibat atau sehubungan dengan pelanggaran Anda terhadap Syarat & Ketentuan Layanan ini maupun dokumen yang menjadi bagian darinya melalui referensi, atau akibat pelanggaran Anda terhadap hukum maupun hak pihak ketiga.",

    section_15: "BAGIAN 15 - KETERPISAHAN KETENTUAN",
    section_15_1:
      "Apabila suatu ketentuan dalam Syarat & Ketentuan Layanan ini dinyatakan melanggar hukum, batal, atau tidak dapat diberlakukan, maka ketentuan tersebut tetap akan diberlakukan sejauh yang diizinkan oleh hukum yang berlaku, dan bagian yang tidak dapat diberlakukan tersebut dianggap dipisahkan dari Syarat & Ketentuan Layanan ini. Penetapan tersebut tidak akan memengaruhi keabsahan maupun keberlakuan ketentuan lainnya yang masih berlaku.",
    section_16: "BAGIAN 16 - PENGAKHIRAN",
    section_16_1:
      "Kewajiban dan tanggung jawab para pihak yang telah timbul sebelum tanggal pengakhiran akan tetap berlaku setelah berakhirnya perjanjian ini untuk segala tujuan.",
    section_16_2:
      "Syarat & Ketentuan Layanan ini berlaku sampai diakhiri oleh Anda atau oleh kami. Anda dapat mengakhiri Syarat & Ketentuan Layanan ini kapan saja dengan memberi tahu kami bahwa Anda tidak lagi ingin menggunakan Layanan kami, atau ketika Anda berhenti menggunakan situs kami.",
    section_16_3:
      "Jika menurut penilaian kami Anda gagal, atau kami menduga bahwa Anda gagal, mematuhi salah satu syarat atau ketentuan dalam Syarat & Ketentuan Layanan ini, maka kami dapat mengakhiri perjanjian ini kapan saja tanpa pemberitahuan sebelumnya. Anda tetap bertanggung jawab atas seluruh kewajiban pembayaran yang terutang hingga tanggal pengakhiran, dan/atau kami dapat menolak akses Anda ke Layanan kami (atau sebagian darinya).",

    section_17: "BAGIAN 17 - KESELURUHAN PERJANJIAN",
    section_17_1:
      "Kegagalan kami untuk melaksanakan atau menegakkan hak maupun ketentuan apa pun dalam Syarat & Ketentuan Layanan ini tidak dapat dianggap sebagai pengesampingan terhadap hak atau ketentuan tersebut.",
    section_17_2:
      "Syarat & Ketentuan Layanan ini beserta setiap kebijakan atau aturan operasional yang kami publikasikan di situs ini atau yang berkaitan dengan Layanan merupakan keseluruhan perjanjian dan pemahaman antara Anda dan kami, serta mengatur penggunaan Layanan oleh Anda. Ketentuan ini menggantikan seluruh perjanjian, komunikasi, dan proposal sebelumnya maupun yang terjadi pada waktu yang sama, baik secara lisan maupun tertulis, antara Anda dan kami (termasuk namun tidak terbatas pada versi sebelumnya dari Syarat & Ketentuan Layanan).",
    section_17_3:
      "Setiap ketidakjelasan dalam penafsiran Syarat & Ketentuan Layanan ini tidak boleh ditafsirkan merugikan pihak yang menyusunnya.",

    section_18: "BAGIAN 18 - HUKUM YANG BERLAKU",
    section_18_1:
      "Syarat & Ketentuan Layanan ini serta setiap perjanjian terpisah yang mengatur penyediaan Layanan kepada Anda akan diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia.",

    section_19: "BAGIAN 19 - PERUBAHAN TERHADAP SYARAT & KETENTUAN LAYANAN",
    section_19_1:
      "Anda dapat meninjau versi terbaru dari Syarat & Ketentuan Layanan kapan saja melalui halaman ini.",
    section_19_2:
      "Kami berhak, atas kebijakan kami sendiri, untuk memperbarui, mengubah, atau mengganti bagian apa pun dari Syarat & Ketentuan Layanan ini dengan mempublikasikan pembaruan dan perubahan di situs web kami. Menjadi tanggung jawab Anda untuk memeriksa situs web kami secara berkala terhadap perubahan. Penggunaan atau akses Anda yang berkelanjutan terhadap situs web maupun Layanan kami setelah perubahan tersebut dipublikasikan dianggap sebagai persetujuan Anda terhadap perubahan tersebut.",

    section_20: "BAGIAN 20 - INFORMASI KONTAK",
    section_20_1:
      "Pertanyaan mengenai Syarat & Ketentuan Layanan dapat dikirimkan kepada kami melalui",

    trade_name: "Nama Dagang:",
    physical_address: "Alamat Fisik:",

    // TRACKING PAGE
    tp_back_to_orders: "Kembali ke Pesanan",
    tp_title: "Lacak Pengiriman",
    tp_loading_details: "Mengambil detail pesanan...",
    tp_waybill_title: "Nomor Resi (Waybill)",
    tp_waiting_waybill: "Menunggu Resi...",
    tp_payment_title: "Pembayaran",
    tp_courier_title: "Kurir",
    tp_courier_na: "N/A",
    tp_origin_title: "Detail Pengirim",
    tp_sender_name: "Nama Pengirim",
    tp_sender_phone: "Nomor Telepon",
    tp_sender_address: "Alamat Lengkap",
    tp_postal_code: "Kode Pos",
    tp_dest_title: "Detail Penerima",
    tp_receiver_name: "Nama Penerima",
    tp_receiver_phone: "Nomor Telepon",
    tp_receiver_address: "Alamat Lengkap",
    tp_courier_note: "Catatan Kurir",
    tp_waiting_location:
      "Menunggu data lokasi origin dan destinasi tersedia dari pihak ekspedisi...",
    tp_item_summary: "Ringkasan Barang",
    tp_variant_title: "Varian Warna",
    tp_subtotal: "Subtotal Produk",
    tp_shipping_cost: "Ongkos Kirim",
    tp_promo_label: "Promo",
    tp_points_redeemed: "Poin Ditukarkan",
    tp_points_unit: "Pts",
    tp_grand_total: "Total Akhir",
    tp_loyalty_reward: "Loyalty Reward",
    tp_points_earned: "Poin masuk ke akun Anda",
    tp_timeline_title: "Riwayat Perjalanan (Timeline)",

    // Error & Status Messages
    tp_err_fetch_order: "Gagal mengambil detail pesanan.",
    tp_err_system: "Terjadi kesalahan sistem.",
    tp_stat_processing: "Processing",
    tp_note_pending: "Menunggu pembayaran dari pelanggan.",
    tp_note_placed: "Pesanan telah masuk dan menunggu alokasi kurir.",
    tp_note_allocated:
      "Kurir telah dialokasikan dan akan segera menjemput paket.",
    tp_note_picking_up:
      "Kurir sedang dalam perjalanan menuju lokasi penjemputan.",
    tp_note_picked: "Paket telah diambil oleh kurir dan masuk ke pusat sortir.",
    tp_note_dropping_off: "Paket sedang dalam perjalanan menuju alamat tujuan.",
    tp_note_delivered: "Paket telah berhasil dikirim dan diterima.",
    tp_note_rejected: "Pengiriman ditolak oleh kurir atau sistem.",
    tp_note_cancelled: "Pengiriman telah dibatalkan.",
    tp_note_default: "Pesanan sedang diproses oleh sistem.",

    b2b_label: "B2B Wholesale",
    hero_title_1: "Gycora",
    hero_title_2: "Business",
    hero_title_3: "Partner.",
    hero_desc_business:
      "Tingkatkan skala bisnis Anda bersama kami. Jadilah bagian dari jaringan eksklusif Gycora dan nikmati margin keuntungan maksimal untuk pertumbuhan toko Anda.",
    btn_register: "Daftar Sekarang",

    step_title: "Cara Menjadi Reseller",
    step_1_title: "Isi Formulir",
    step_1_desc:
      "Lengkapi data toko dan estimasi penjualan bulanan Anda melalui formulir pendaftaran kami.",
    step_2_title: "Proses Kurasi",
    step_2_desc:
      "Tim Gycora akan meninjau profil bisnis Anda dalam waktu 1x24 jam kerja untuk memastikan standar kemitraan.",
    step_3_title: "Akses Terbuka",
    step_3_desc:
      "Setelah disetujui, akun Anda otomatis ditingkatkan dan dapat langsung melihat Harga Grosir Pabrik.",
    step_4_title: "Mulai Berjualan",
    step_4_desc:
      "Lakukan pesanan minimal (MOQ) dan nikmati margin keuntungan maksimal untuk bisnis Anda.",
    faq_title: "Yang Sering Ditanya Seputar Reseller di Gycora",
    faq_1_q: "Berapa minimum order (MOQ) untuk mendapatkan harga reseller?",
    faq_1_a:
      "Untuk melindungi harga pasar (Price Protection), harga grosir eksklusif Gycora hanya akan aktif jika Anda berbelanja minimal 24 pcs (2 lusin) per transaksi di keranjang Anda.",
    faq_2_q: "Apakah Gycora memfasilitasi sistem Dropship?",
    faq_2_a:
      "Saat ini, program Business Partner kami difokuskan pada model B2B Wholesale (Grosir Tradisional). Barang akan dikirim secara massal ke alamat Anda, dan Anda bebas menjualnya kembali di platform apa pun dengan margin keuntungan 20% - 30%.",
    faq_3_q: "Berapa lama proses persetujuan akun reseller?",
    faq_3_a:
      "Proses kurasi dan persetujuan akun biasanya memakan waktu maksimal 1x24 jam kerja. Tim kami perlu memastikan bahwa mitra memiliki komitmen bisnis yang sesuai dengan visi Gycora.",
    feedback_title: "Mari Simak Feedback dari Reseller Kami",
    feedback_1_name: "Toko Cantik Jelita",
    feedback_1_platform: "Shopee Seller",
    feedback_1_comment:
      "Margin profit dari Gycora sangat bagus! Sejak daftar jadi reseller, perputaran kas toko saya jadi lebih cepat karena produknya memang cepat laku di pasaran.",
    feedback_2_name: "Aura Beauty Supply",
    feedback_2_platform: "Toko Fisik",
    feedback_2_comment:
      "Awalnya ragu karena MOQ-nya 24 pcs. Tapi ternyata kualitas barangnya premium banget. Pelanggan salon saya pada suka, 2 lusin langsung ludes dalam 1 minggu.",
    feedback_3_name: "Dewi Haircare",
    feedback_3_platform: "Tiktok Shop",
    feedback_3_comment:
      "Yang paling saya suka adalah perlindungan harganya. Gycora nggak obral harga grosir ke sembarang orang, jadi kita reseller nggak perlu takut perang harga.",
    benefit_title_business: "Keuntungan Kemitraan",
    benefit_1_title: "Harga Grosir Spesial",
    benefit_1_desc:
      "Dapatkan margin keuntungan maksimal dengan akses langsung ke harga wholesale eksklusif khusus Business Partner.",
    benefit_2_title: "Aset Visual Premium",
    benefit_2_desc:
      "Akses gratis ke katalog foto dan video resolusi tinggi tanpa watermark untuk kebutuhan promosi toko Anda.",
    benefit_3_title: "Prioritas Stok",
    benefit_3_desc:
      "Prioritas alokasi produk unggulan dan koleksi terbaru sebelum dirilis untuk pelanggan retail biasa.",
    modal_title: "Formulir Pengajuan Kemitraan",
    modal_desc:
      "Lengkapi data bisnis Anda di bawah ini. Tim kami akan melakukan peninjauan dalam waktu 1x24 jam kerja.",
    label_shop_name: "Nama Toko / Bisnis",
    placeholder_shop_name: "Contoh: Gycora Official Store",
    label_platform: "Platform Penjualan Utama",
    opt_select_platform: "Pilih Platform",
    opt_offline: "Toko Offline / Fisik",
    opt_other: "Lainnya",
    label_capacity: "Estimasi Pengambilan per Bulan",
    opt_select_capacity: "Pilih Estimasi Order",
    opt_more_than: "lebih dari 500 Pcs",
    label_notes: "Catatan Tambahan / Link Toko (Opsional)",
    placeholder_notes:
      "Ceritakan sedikit tentang bisnis Anda atau sertakan link toko Anda agar kami dapat meninjaunya lebih cepat.",
    btn_processing_business: "Memproses...",
    btn_submit: "Kirim Pengajuan Kemitraan",
    alert_login_title: "Login Dibutuhkan",
    alert_login_desc:
      "Silakan login terlebih dahulu untuk mendaftar sebagai Business Partner.",
    alert_success_title: "Pendaftaran Berhasil!",
    alert_success_desc: "Tim kami akan segera meninjau aplikasi Anda.",
    alert_error_title: "Pendaftaran Gagal",
    alert_error_desc: "Terjadi kesalahan pada sistem. Coba lagi nanti.",
    wholesale_price: "Harga Grosir",
    active_bundle: "BUNDLE AKTIF",
    wait_partner: "MENUNGGU PASANGAN BUNDLE",
    bundle_promo_price: "Harga Promo Paket",
    bundle_promo_active: "Promo Bundle Aktif",
    bundle: "Paket",
    check_or_add: "Centang atau tambah",
    item_again: "barang lagi untuk mendapatkan harga reseller.",
    wholesale_pricing_active: "Harga Grosir Aktif!",
    enable_wholesale_pricing: "Aktifkan Harga Grosir",
    favorite_collection: "Koleksi Favorit",
    favorite_still_empty: "Daftar favorit Anda masih kosong.",
    product_exploration: "Eksplorasi Produk",
    payment_successful: "Pembayaran Berhasil 🎉",
    thank_you_payment_success:
      "Terima kasih! Pembayaran Anda telah berhasil diproses.",
    payment_ref: "Referensi Pembayaran:",
    see_my_order: "Lihat Pesanan Saya",
    back_to_home: "Kembali ke Beranda",
    wholesale_lable: "GROSIR",
    join_partnership: "Gabung Partnership",
    change_profile : "Ubah Profil",
    district : "Kecamatan:",
    choose_method : "Pilih metode",
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
    not_found_desc:
      "We couldn't find any results for '{query}' with the selected time range.",

    // Product Detail & Catalog
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
    search_product: "Search products...",
    all: "All",
    see_all_products: "See All Products",

    // Notifications
    login_required: "Login Required",
    login_required_desc: "Please log in to your account to continue.",
    to_login_page: "Go to Login Page",
    cancel: "Cancel",
    added_to_cart: "Added!",

    // HOME PAGE
    // promo_title: "First Order Special Discount ✨",
    // promo_desc1:
    //   "Enjoy 10% OFF + IDR 10,000 shipping subsidy for your first purchase.",
    // promo_desc2: "Enter your email and claim the exclusive voucher now.",
    // email_placeholder: "Enter your Email",
    // sending: "Sending...",
    // claim_now: "Claim Now",
    // promo_success_title: "Promo Code Sent!",
    // promo_success_desc:
    //   "Please check your email inbox to get the special voucher code from Gycora.",
    // notification: "Notification",
    // promo_failed_desc:
    //   "Failed to claim promo. Make sure the email format is correct.",
    // error: "Failed",
    // server_error: "A server error occurred while processing your request.",

    promo_title: "🎁 Welcome Gift for New Members",
    promo_intro: "Create a GYCORA account now and enjoy exclusive benefits:",
    promo_bullet1: "up to 40% OFF your first purchase",
    promo_bullet2: "FREE Shipping up to IDR 10,000",
    promo_bullet3: "Access to member-only promos & special offers",
    promo_cta: "Enter your email and claim your special gift today.",
    email_placeholder: "Enter active email",
    sending: "Processing...",
    claim_now: "Create Account & Claim Gift",
    promo_footer: "100% free. Registration takes less than 1 minute.",
    promo_success_title: "Promo Code Sent!",
    promo_success_desc: "Please check your email inbox to get the special voucher code from Gycora.",
    notification: "Notification",
    promo_failed_desc: "Failed to claim promo. Make sure the email format is correct.",
    error: "Failed",
    server_error: "A server error occurred while processing your request.",
    hero_title1: "Quick Solution for",
    hero_title2: "Neater Hair",
    hero_subtitle: "No Hassle, No Waiting.",
    hero_desc:
      "Not everyone has the time to style their hair every day. But you can still look neater in minutes with selected products from Gycora.",
    shop_now: "Shop Now",
    see_product: "View Products",
    feature1_title: "Anti Static",
    feature1_subtitle: "Technology",
    feature1_desc:
      "Ionic technology to prevent hair from standing up due to static electricity.",
    feature2_title: "Carbon Patented",
    feature2_subtitle: "Material",
    feature2_desc:
      "Special patented carbon material to distribute heat evenly and safely.",
    feature3_title: "Eco",
    feature3_subtitle: "Friendly",
    feature3_desc:
      "Made from environmentally friendly materials that are safe and recyclable.",
    fav_product_title: "Favorite Products Chosen by Many",
    fav_product_desc:
      "Find the best-selling products that are the mainstay for neater, smoother, and easier to manage hair every day.",
    brush_desc:
      "Premium brush with anti-static technology that helps hair become smoother, neater, and shinier in just one stroke.",
    empty_product: "No products available yet.",
    problem_title: "Ever Felt Like This?",
    problem_1: "Hair suddenly tangled at an important moment",
    problem_2: "Already neat from home, but messy on the road",
    problem_3:
      "After wearing a helmet, getting hit by the wind, or a day full of activities",
    problem_4: "Don't have much time to restyle",
    problem_footer:
      "Even though you just need a quick way to get back to looking neat.",
    the_solution: "The Solution",
    solution_title: "No Need to be Complicated to Look Neat",
    solution_desc1:
      "Meet Ethereal Glow Brush — a brush with anti-static technology that helps hair become smoother, neater, and manageable in just a few minutes.",
    solution_desc2:
      "Just brush as usual, no special technique required. The results are immediately noticeable.",
    explore_product: "Explore Product",
    result_title: "Real Results No Filter",
    result_desc: "Real difference before and after using Gycora.",
    benefit_title: "Why Do So Many Choose Gycora?",
    benefit_1: "Helps reduce tangled hair in minutes",
    benefit_2: "Reduces static electricity in the hair",
    benefit_3: "Practical to take anywhere",
    benefit_4: "Suitable for various hair types",
    benefit_5: "No need for extra effort for neat results",
    social_title: "Not Just Our Words, But Those Who Have Tried It",
    social_desc:
      "Thousands of Gycora users have experienced real changes in their routines.",
    cta_title: "No Need to be Complicated to Look Neat",
    cta_desc1:
      "Starting from small steps that make a big difference in your appearance.",
    cta_desc2:
      "With Gycora, neat hair is no longer something that requires extra effort.",

    // ABOUT US PAGE [BARU]
    about_header_title: "About Gycora",
    about_header_desc1:
      "We believe that self-care is not just a routine, but a small form of attention to oneself amidst a busy schedule.",
    about_header_desc2:
      "Because looking neat and feeling comfortable with yourself should feel easier, more practical, and remain meaningful.",
    about_who_we_are_label: "WHO WE ARE",
    about_who_we_are_title: "Beauty Essentials Designed for Daily Life",
    about_who_we_are_p1:
      "Gycora presents hair care products based on modern innovation that help daily routines feel more practical and comfortable.",
    about_who_we_are_p2:
      "From anti-static hairbrushes to scalp care designed for daily use, each product is crafted to help you look neater without extra effort.",
    about_our_story_label: "OUR STORY",
    about_our_story_title:
      "Starting from Something Simple: The Desire to Make Self-Care Easier",
    about_our_story_p1:
      "Amidst constant activities, we realize that not everyone has much time for styling or complicated hair care.",
    about_our_story_p2:
      "But at the same time, confidence often comes from little things — like hair that feels neater, comfortable, and easy to manage.",
    about_our_story_p3: "That's exactly where Gycora was born.",
    about_our_story_p4:
      "We want to present products that not only look good but truly help the daily lives of their users.",
    about_why_label: "WHY GYCORA",
    about_why_title: "Why Gycora?",
    about_purpose1_title: "Practical Beauty",
    about_purpose1_desc:
      "Products designed for a fast and practical daily routine.",
    about_purpose2_title: "Modern Innovation",
    about_purpose2_desc:
      "Using modern technology to help hair become more manageable and comfortable for everyday use.",
    about_purpose3_title: "Thoughtfully Designed",
    about_purpose3_desc:
      "Crafted with designs that are comfortable to use while remaining aesthetic.",
    about_purpose4_title: "More Conscious Choice",
    about_purpose4_desc:
      "Using more environmentally friendly materials as a small step towards more responsible care.",
    about_innov_label: "INNOVATION & SUSTAINABILITY",
    about_innov_title: "Innovation that Still Cares for the Environment",
    about_innov_p1:
      "We believe that innovation is not just about results, but also about how a product is made more wisely.",
    about_innov_p2:
      "Therefore, Gycora continues to strive to present products with more environmentally friendly materials and designs built for long-term use.",
    about_innov_p3:
      "A small step that we believe can bring a better impact for the future.",
    about_vm_label: "VISION & MISSION",
    about_vision_title: "Our Vision",
    about_vision_desc:
      "To be a modern beauty brand that presents practical, innovative, and more mindful products to support daily self-care routines.",
    about_mission_title: "Our Mission",
    about_mission_item1:
      "Presenting products that are comfortable and effective to use every day",
    about_mission_item2: "Combining modern innovation with thoughtful design",
    about_mission_item3:
      "Supporting more conscious and sustainable care choices",
    about_mission_item4:
      "Helping more people feel comfortable and confident in themselves",
    about_closing_label: "CLOSING SECTION",
    about_closing_title: "Simpler Self-Care, for More Comfortable Days",
    about_closing_p1:
      "Because we believe, confidence often starts from small attention to oneself.",
    about_closing_p2: "And Gycora wants to be part of that journey 🤍",

    // EVENT PAGE [BARU]
    event_header_title: "Meet Gycora in Person",
    event_header_desc1:
      "Come and directly experience trying Gycora products at our selected events and pop-up markets.",
    event_header_desc2:
      "Discover special promos, favorite products, and a more personal shopping experience with Gycora.",
    upcoming_events_title: "Upcoming Events!",
    no_upcoming_events: "No upcoming events yet. Stay tuned!",
    visit_event: "Visit Event",
    upcoming_label: "Upcoming",
    past_events_title: "Past Events",
    past_event_label: "Past Event",
    no_event_image: "Event Image Not Available",

    // CONSULT PAGE [BARU]
    consult_hero_title: "The Right Care Starts with Comfortable Consultation",
    consult_hero_desc:
      "Tell us about your hair needs and let the Gycora team help find the most suitable solution for your daily routine.",
    consult_methods_title: "Choose the Most Comfortable Consultation Method",
    consult_online_title: "Online Consultation",
    consult_online_desc:
      "Consult your hair and scalp condition online with the Gycora team without having to come in person. Practical, fast, and can be done from anywhere.",
    btn_start_online: "Start Online Consultation",
    consult_store_title: "Visit In Store",
    consult_store_desc:
      "Try Gycora's favorite products directly and get a hands-on consultation experience at our booth or store. More personal and comfortable to explore your needs.",
    btn_view_location: "View Store Location",
    consult_problem_title:
      "We Understand, Sometimes It's Hard to Find the Right Product",
    consult_problem_p1: "Everyone has different hair needs.",
    consult_problem_p2:
      "From easily tangled, hard to manage hair, oily scalp, to busy routines and not having much time for styling.",
    consult_problem_p3:
      "Therefore, we are here to help you find a solution that is more suitable and comfortable to use every day.",
    consult_categories_title: "You Can Consult About:",
    // cat_teen_acne: "Teen Acne",
    // cat_adult_acne: "Adult Acne",
    // cat_baldness: "Baldness",
    // cat_hair_loss: "Hair Loss",
    // cat_beard_growth: "Beard Growth",
    // cat_dull_skin: "Dull Skin",
    // cat_acne_scars: "Acne Scars",
    // cat_dandruff: "Dandruff",
    cat_frizzy: "Frizzy & puffy hair",
    cat_tangled: "Tangled & hard to manage hair",
    cat_dry_coarse: "Dry & coarse hair",
    cat_damaged: "Damaged hair (bleached/colored)",
    cat_hairfall: "Hair easily falls out & breaks",
    cat_oily_scalp: "Oily scalp & product buildup",
    cat_sensitive_scalp: "Sensitive & itchy scalp",
    cat_baby_hair: "Messy baby hair & hard to sleek",
    consult_cta_title: "Start Consultation with Gycora ✨",
    consult_cta_desc:
      "Because self-care feels more comfortable when you know what your hair really needs.",
    btn_contact_now: "Contact Us Now",

    // Swal Consult
    login_consult_desc:
      "Please log in or register first to start a consultation.",
    login_now: "Login Now",
    swal_consult_title: "Consultation",
    swal_method_label: "Consultation Method",
    swal_schedule_label: "Choose Schedule (Date & Time)",
    swal_notes_label: "Brief Complaint",
    swal_notes_placeholder:
      "Tell us the details of your complaint (Optional)...",
    btn_continue_wa: "Continue to WhatsApp",
    swal_validation_time: "Please complete the consultation schedule!",
    swal_redirect_title: "Redirecting...",
    swal_redirect_desc: "Opening WhatsApp to continue your consultation.",
    swal_send_fail: "Failed to send.",
    swal_req_fail: "Failed to send request.",

    // PRODUCT DETAIL EXPANSION [BARU]
    product_video_demo: "Video Demo",
    product_share_toast: "Product link copied to clipboard!",
    product_max_stock_toast: "Maximum stock available is {stock}",
    product_cart_processing: "Processing...",
    product_desc_empty: "Description is not available yet.",
    product_guide_empty: "Usage guide is not available for this product.",
    product_faq_empty: "No frequently asked questions for this product yet.",
    product_review_empty: "No reviews for this product yet.",
    product_verified_buyer: "Verified Buyer",

    // Taglines
    brush_tagline:
      "Smoother, Neater, and Manageable Hair in Just One Stroke ✨",
    scalp_tagline:
      "Scalp Massager for Cleaner, More Comfortable, and Healthier Scalp ✨",

    // Content Tabs General
    guide_title: "Proper Usage Guide",

    // Brush Tab Contents
    brush_desc_p1:
      "Meet the Ethereal Glow Brush, an anti-static hairbrush engineered with conductive technology and carbon molecules designed to help hair feel smoother, neater, and look naturally shiny every day.",
    brush_desc_p2:
      "Featuring a flexible design that matches the contours of your head alongside ultra-soft bristles, it provides a seamless brushing experience without causing scalp pain or hair pulling.",
    brush_desc_p3:
      "Perfect for those who want effortlessly neat and managed hair amidst a busy day—without the need for tedious styling routines.",
    brush_benefits_title: "Why People Love the Ethereal Glow Brush?",
    brush_benefit_1_bold: "Anti-Static Technology: ",
    brush_benefit_1_text:
      "Helps reduce frizz, tangles, and unmanageable flyaways effectively.",
    brush_benefit_2_bold: "Enhances Smoothness & Natural Shine: ",
    brush_benefit_2_text:
      "Every single stroke dynamically aligns hair cuticles to bring out a natural, healthy glow.",
    brush_benefit_3_bold: "Flexible & Soft Bristles: ",
    brush_benefit_3_text:
      "Extremely gentle on the scalp, minimizing hair breakage and split ends.",
    brush_benefit_4_bold: "Spiral Comb Design: ",
    brush_benefit_4_text:
      "The ergonomic spiral frame contours to your head shape for maximum comfort.",
    brush_benefit_5_bold: "Eco-Friendly Material: ",
    brush_benefit_5_text:
      "Crafted out of environmentally sustainable Polylactic Acid Fiber.",
    brush_suitable_title: "Perfect For:",
    brush_suitable_1: "Frizzy & easily tangled hair",
    brush_suitable_2: "Unruly and stubborn hair types",
    brush_suitable_3: "Daily multi-purpose usage",
    brush_suitable_4: "All distinct hair textures",
    brush_specs_title: "Product Specifications:",
    brush_specs_1: "Material: Carbon Molecule + Polylactic Acid Fiber",
    brush_specs_2: "Size: 25 x 7 cm",
    brush_specs_3: "Includes: Premium Soft Presentation Box",

    // Brush Guide
    brush_guide_1:
      "Ensure hair is completely dry or towel-damp (avoid using on soaking wet hair).",
    brush_guide_2:
      "Gently detangle from the mid-lengths to the ends first to remove stubborn knots safely.",
    brush_guide_3:
      "Once the lower section is free-flowing, smoothly brush from the roots all the way down.",
    brush_guide_4:
      "Incorporate into your routine every morning or whenever static and frizz build up.",

    // Brush FAQ
    brush_faq_q1: "Q: Is it safe to use on thinning or brittle hair?",
    brush_faq_a1:
      "A: Absolutely. The bristles are specifically tuned to be soft and ultra-flexible, reducing high-tension pulling that triggers unnecessary hair loss.",
    brush_faq_q2: "Q: What is the best way to clean this hairbrush?",
    brush_faq_a2:
      "A: You can use a smaller styling cleaning brush to clear stray hair strands, then wipe down with a damp cloth or microfiber towel. Avoid long submersions in water.",

    // Scalp Tab Contents
    scalp_desc_p1:
      "Discover the Eco Serenity Scalp Care massager, an innovative dynamic tool from Gycora expertly built to deeply cleanse your scalp while providing a relaxing massage therapy at home.",
    scalp_desc_p2:
      "Featuring an advanced flexible tri-fold framework and 196 multi-sized flexible teeth, it thoroughly clears dirt, buildup, and excess sebum without causing microscopic skin irritation.",
    scalp_desc_p3:
      "An absolute game-changer during showers for shampoo lathering, or on dry hair for a midday stress relief session.",
    scalp_benefits_title: "Why People Love the Eco Serenity Scalp Care?",
    scalp_benefit_1_bold: "Triple-Fold Structure Design: ",
    scalp_benefit_1_text:
      "Contours instantly to your head anatomy for optimal uniform pressure distribution.",
    scalp_benefit_2_bold: "196 Flexible Teeth: ",
    scalp_benefit_2_text:
      "Provides deep-reaching exfoliation and sensory relaxation safely.",
    scalp_benefit_3_bold: "Deep Scaling & Exfoliation: ",
    scalp_benefit_3_text:
      "Lifts oily scales, persistent residue, and styling product buildup.",
    scalp_benefit_4_bold: "Relaxing Scalp Massage: ",
    scalp_benefit_4_text:
      "Increases local microcirculation to supply optimal nourishment to hair roots.",
    scalp_benefit_5_bold: "Anti-Microbial Silver Ion: ",
    scalp_benefit_5_text:
      "Impregnated silver ions inhibit bacterial growth on the tool surfaces.",
    scalp_benefit_6_bold: "Ergonomic & Comfortable Grip: ",
    scalp_benefit_6_text:
      "Locks perfectly in your palm even when wet and slippery.",
    scalp_benefit_7_bold: "Multi-functional Framework: ",
    scalp_benefit_7_text:
      "Works flawlessly on dry hair for relaxation or wet hair for active scalp scaling.",
    scalp_benefit_8_bold: "Eco-Friendly Material: ",
    scalp_benefit_8_text: "Made using durable, high-grade recyclable polymers.",
    scalp_suitable_title: "Perfect For:",
    scalp_suitable_1: "Oily or hyper-sebum scalps",
    scalp_suitable_2: "Flaky skin prone to product buildup",
    scalp_suitable_3: "Enhancing shower shampoo efficiency",
    scalp_suitable_4: "Quick stress relief throughout the day",
    scalp_suitable_5: "All varied hair environments",
    scalp_specs_title: "Product Specifications:",
    scalp_specs_1: "Material: Recyclable High-Grade Polymer",
    scalp_specs_2: "Technology: Integrated Anti-Microbial Silver Ion Layer",
    scalp_specs_3: "Thermal Threshold: Heat resistant up to 80°C",

    // Scalp Guide
    scalp_guide_1:
      "During Wash: Apply shampoo uniformly, then press the Scalp Care tool down and glide in small gentle circular motions to deep clean.",
    scalp_guide_2:
      "Dry Exfoliation: Use as a stress-relief massage tool across the scalp applying gentle baseline pressure.",
    scalp_guide_3:
      "Rinse the Scalp Care tool thoroughly under clean water after exposure to treatments and conditioners.",

    // Scalp FAQ
    scalp_faq_q1:
      "Q: Will it cause severe hair tangling during active shampooing?",
    scalp_faq_a1:
      "A: No. Move the massager unidirectionally or in targeted tight circles. Avoid vigorous back-and-forth scrubbing to prevent structural tangling.",
    scalp_faq_q2:
      "Q: Is this massager completely safe on inflamed or sensitive scalps?",
    scalp_faq_a2:
      "A: The medical-grade flexible tips are soft enough to deliver therapy without scratching or breaching compromised skin.",

    // Static Review Translations
    review_brush_1:
      "This brush is incredibly good and does exactly what it claims. I previously used a major competitor's brush due to severe hair fall, but switching to Gycora drastically reduced my breakage.",
    review_brush_2:
      "Brushing feels completely effortless now, especially on hair that tends to get knotty easily. Gycora makes daily detangling so much simpler.",
    review_brush_3:
      "Since using this premium brush, my hair extensions and natural ends don't lock up anymore. It definitely gives a major confidence boost.",
    review_brush_4:
      "Excellent structural flexibility! It molds beautifully to the head contour and glides through smoothly without snapping hair.",
    review_brush_5:
      "I am absolutely in love with this brush! Hair looks instantly polished and structured without looking frizzy. The cushion is soft and acts like a true head massage.",
    review_scalp_1:
      "Packaging: Beautiful\nEffect: Cleared up stubborn flakes immediately. Hoping for a long-term clear scalp, hair feels exceptionally soft post-wash.",

    // USER PROFILE PAGE [BARU]
    profile_not_set: "Not set yet",
    profile_gycora_points: "Gycora Points",
    profile_pts_label: "Pts",
    btn_favorite: "Favorites",
    btn_change_password: "Change Password",
    btn_edit_profile: "Edit Profile",

    // Edit Profile Modal
    modal_edit_profile_title: "Edit Profile",
    label_first_name: "First Name",
    label_last_name: "Last Name",
    label_email: "Email",
    label_phone: "Phone Number",
    placeholder_phone: "Example: 081234567890",
    btn_cancel: "Cancel",
    btn_save_profile: "Save Profile",
    toast_profile_updated: "Profile Updated!",

    // Change Password Modal
    modal_change_pwd_title: "Change Password",
    label_current_pwd: "Current Password",
    label_new_pwd: "New Password",
    label_confirm_new_pwd: "Confirm New Password",
    btn_save_pwd: "Update Password",
    warn_pwd_mismatch: "New password and confirmation do not match.",
    warn_pwd_length: "Password must be at least 8 characters.",
    toast_pwd_updated: "Password updated successfully.",

    // Photo Upload
    toast_img_too_large: "Maximum photo size is 2MB.",
    toast_img_wrong_format: "Please upload an image file (JPG, PNG).",
    toast_img_updated: "Photo updated successfully",

    // Address Book Section
    address_book_title: "Address Book",
    address_book_desc:
      "Manage your shipping addresses for a faster checkout process.",
    btn_add_address: "Add New Address",
    empty_address_title: "No address yet",
    empty_address_desc: "Add your first address now.",
    label_main_address: "Default Address",
    btn_edit: "Edit",
    btn_delete: "Delete",

    // Address Form Modal
    modal_add_address_title: "Add New Address",
    modal_edit_address_title: "Edit Shipping Address",
    guide_map_text:
      "Drag and click on the map to auto-fill the address data. You can still manually edit the fields below.",
    btn_use_current_location: "Use Current Location",
    label_address_type: "Address Label",
    option_home: "Home",
    option_office: "Office",
    option_other: "Other",
    label_full_address: "Full Address Details",
    placeholder_full_address:
      "Street name, block, neighborhood, or landmark...",
    label_region: "District / Sub-district",
    label_city: "City / Regency",
    label_province: "Province / State",
    label_postal_code: "Postal Code",
    label_set_default_address: "Set as Default Shipping Address",
    btn_save_address: "Save Address",
    btn_update_address: "Save Changes",
    toast_address_added: "Address added.",
    toast_address_updated: "Address updated.",
    warn_select_location: "Please select a location point on the map.",

    // Delete Address Prompt
    prompt_delete_address_title: "Delete address?",
    prompt_delete_address_text: "This action cannot be undone.",
    btn_confirm_delete: "Delete",
    toast_address_deleted: "Address has been deleted.",

    // Map Location
    warn_location_denied: "Please allow location access in your browser.",
    warn_location_unsupported:
      "Your browser does not support location features.",
    popup_selected_location: "Selected location",

    // CART PAGE [BARU]
    cart_max_stock_warning: "Maximum stock of {stock} reached.",
    cart_update_fail: "Failed to update quantity",
    cart_server_error: "Failed to connect to the server",
    cart_delete_fail: "Failed to delete item",
    cart_title: "Shopping Cart",
    cart_items_count: "({count} items)",
    cart_empty_title: "Your cart is still empty.",
    btn_start_shopping: "Start Shopping",
    cart_select_all: "Select All Items",
    cart_sale_badge: "SALE",
    cart_variant_label: "Variant:",
    cart_per_pc: "/ pc",
    btn_remove: "Remove",
    cart_suggest_title: "You May Also Like",
    btn_choose_variant: "Select Variant",
    btn_add_plus: "Add +",
    cart_summary_title: "Order Summary",
    cart_selected_items: "Selected Items",
    cart_estimated_total: "Estimated Total",
    cart_tax_shipping_note: "Tax & shipping calculated at checkout.",
    btn_checkout: "Checkout ({count})",
    cart_processing: "Processing...",

    cat_all: "All",
    banner_title: "Find Your Favorites at Gycora",
    banner_desc:
      "From hair brushes to scalp care, explore selected products that make your hair routine more practical every day.",
    search_prod_placeholder: "Search products...",
    no_product_found: "Product not found",
    no_product_desc: "Try changing your search keywords or category filters.",
    reset_filter: "Reset Filter",
    variant_label_old: "Old",
    variant_label_new: "New",
    btn_add_to_cart: "Add to Cart",
    btn_processing: "Processing...",
    stock_warning: "Only {stock} left!",
    status_out_of_stock: "Out of Stock",
    no_image_text: "No image available",

    // CHAT PAGE [BARU]
    chat_title: "Contact Our Experts",
    chat_subtitle:
      "Choose a Gycora doctor or staff to start a real-time consultation.",
    chat_empty_msg: "Start your conversation here...",
    chat_input_placeholder: "Type a message...",

    // PAYMENT PAGE & CHECKOUT
    pay_loading_checkout: "Preparing your checkout...",
    pay_empty_items: "No items selected",
    pay_btn_back_cart: "Back to Cart",
    pay_checkout_title: "Checkout",
    pay_shipping_address: "Shipping Address",
    pay_add_address: "+ Add Address",
    pay_no_address: "No saved address yet.",
    pay_new_address: "+ Add New Address",
    pay_shipping_method: "Shipping Method",
    pay_method_pickup: "Store Pickup",
    pay_method_pickup_desc: "In-Store Pickup (Surabaya)",
    pay_method_free: "Free",
    pay_method_courier: "Regular / Express",
    pay_method_courier_desc: "Delivered via your chosen courier",
    pay_choose_courier: "Select Courier",
    pay_calc_shipping: "Calculating shipping costs...",
    pay_no_courier: "No couriers available for this address.",
    pay_order_summary: "Order Summary",
    pay_total_items: "Total Items",
    pay_product_subtotal: "Product Subtotal",
    pay_promo_label: "Promo Code / Voucher",
    pay_promo_placeholder: "Enter promo code",
    pay_btn_apply: "Apply",
    pay_btn_remove: "Remove",
    pay_loyalty_points: "Loyalty Points",
    pay_balance: "Balance:",
    pay_btn_use: "Use",
    pay_btn_cancel: "Cancel",
    pay_points_applied: "Points Applied",
    pay_shipping_cost: "Shipping Cost",
    pay_grand_total: "Grand Total",
    pay_btn_pay_now: "Pay Now",
    pay_btn_processing: "Processing...",
    pay_alert_no_address: "* Please select a shipping address",
    pay_alert_no_courier: "* Please select a courier",
    main_address: "Main Address",

    // ORDER PAGE
    order_track_title: "Track My Orders",
    order_tab_all: "All Orders",
    order_tab_unpaid: "Unpaid",
    order_tab_to_ship: "To Ship",
    order_tab_shipping: "Shipping",
    order_tab_completed: "Completed",
    order_tab_cancelled: "Cancelled",
    order_tab_issues: "Issues / Return",
    order_search_placeholder: "Search Order ID, Courier...",
    order_show_label: "Show:",
    order_no_match: "No orders match the filter.",
    order_clear_filter: "Clear Filter",
    order_date_label: "Date",
    order_tap_to_pay: "Tap here to pay",
    order_btn_review: "Write Review",
    order_btn_cancel: "Cancel",
    order_btn_pay: "Pay Now",
    order_btn_track: "Track Order",
    order_btn_refund: "Request Refund",
    order_status_waiting_admin: "Waiting Admin",
    order_status_manual_refund: "Manual Refund",
    order_status_refund_now: "Refund Now",
    order_status_refund_rejected: "Refund Rejected",
    order_transaction_label: "Transaction:",
    order_shipping_label: "Shipping:",
    order_points_earned: "Points Earned",
    order_payment_info: "Payment Info",
    order_shipping_info: "Shipping Info",
    order_subtotal_products: "Subtotal for Products",
    order_shipping_subtotal: "Shipping Subtotal",
    order_final_amount: "Final Amount",
    order_showing: "Showing",
    order_to: "to",
    order_of: "of",
    order_orders: "orders",
    order_prev: "Previous",
    order_next: "Next",
    in_store_pickup: "In-Store Pickup",

    // HELP CENTER / FAQ PAGE
    hc_hero_title: "Hi, how can we help you?",
    hc_hero_desc:
      "Find answers to questions about your orders, shipping, and Gycora products.",
    hc_search_placeholder: "Search questions... (e.g., track order)",
    hc_no_result_title: "Oops! No results found.",
    hc_no_result_desc: "We couldn't find an answer for",
    hc_btn_view_all: "View All Questions",

    // FAQ Category: Orders & Payment
    hc_cat_order: "Orders & Payment",
    hc_q_order_1: "How do I track my order?",
    hc_a_order_1:
      "Once your order has shipped, you will receive an email containing a tracking number. You can also track it directly via the 'Orders' menu in your account.",
    hc_q_order_2: "What payment methods does Gycora support?",
    hc_a_order_2:
      "We accept payments via Bank Transfer, Credit/Debit Cards, GoPay, OVO, ShopeePay, and QRIS.",
    hc_q_order_3: "Can I cancel or change my order?",
    hc_a_order_3:
      "Orders that have been paid and entered our system will be processed immediately. If you wish to cancel or change your order, please contact our Customer Service within a maximum of 1 hour after payment.",

    // FAQ Category: Shipping
    hc_cat_shipping: "Shipping",
    hc_q_ship_1: "How long does shipping take?",
    hc_a_ship_1:
      "For the Greater Jakarta area, it usually takes 1-3 business days. For areas outside Java, estimated shipping is 3-7 business days depending on the selected courier.",
    hc_q_ship_2: "Does Gycora offer international shipping?",
    hc_a_ship_2:
      "Currently, we only ship to all regions within Indonesia. We are working on expanding our reach to other countries in the future!",

    // FAQ Category: Products & Returns
    hc_cat_product: "Products & Returns",
    hc_q_prod_1: "Are Gycora products safe for pregnant and nursing mothers?",
    hc_a_prod_1:
      "Yes, all our products are formulated without harmful chemicals like Parabens and SLS. However, we always recommend consulting with your obstetrician before trying new skincare products.",
    hc_q_prod_2: "What is the return policy?",
    hc_a_prod_2:
      "You can request a return within 14 days of receiving the item if it is damaged, defective, or incorrect. Full terms can be read on our Return Policy page.",

    // CTA Section
    hc_cta_title: "Still need help?",
    hc_cta_desc:
      "Our Customer Care team is always ready to help resolve your issues. Please don't hesitate to contact us.",
    hc_btn_contact: "Contact Us",
    hc_btn_return: "Request Return",

    // FAQ PAGE - HEADER & FOOTER
    faq_page_subtitle: "FAQ Page",
    faq_page_title: "Frequently Asked Questions",
    faq_page_desc1:
      "Find answers to the most frequently asked questions about our products, usage, shipping, and shopping experience at Gycora.",
    faq_page_desc2:
      "Still need help? Our team is ready to assist you anytime 🤍",
    faq_support_title: "Still have questions?",
    faq_support_desc:
      "Can't find the answer you're looking for? Please chat with our friendly team.",
    faq_support_btn: "Contact Support",

    // FAQ CATEGORY 1: Ethereal Glow Brush
    faq_cat1_title: "About Ethereal Glow Brush",
    faq_c1_q1: "What is the Ethereal Glow Brush?",
    faq_c1_a1:
      "The Ethereal Glow Brush is an anti-static hairbrush featuring conductive technology and carbon molecules that help your hair feel smoother, neater, and more manageable in just one stroke.",
    faq_c1_q2: "What are the main benefits of the Ethereal Glow Brush?",
    faq_c1_a2:
      "It helps reduce frizz, flyaways, and unmanageable hair, while providing a more comfortable brushing experience for everyday use.",
    faq_c1_q3: "Is the Ethereal Glow Brush suitable for all hair types?",
    faq_c1_a3:
      "Yes, the Ethereal Glow Brush is designed for various hair types, from straight to wavy, to easily tangled and frizzy hair.",
    faq_c1_q4: "Can this brush be used every day?",
    faq_c1_a4:
      "Absolutely. The Ethereal Glow Brush is safe and comfortable for daily use to help keep your hair neat and easy to manage.",
    faq_c1_q5: "What makes it different from a regular comb?",
    faq_c1_a5:
      "The Ethereal Glow Brush uses anti-static technology that helps reduce static electricity in the hair, making it feel smoother and less frizzy.",
    faq_c1_q6: "Do the bristles hurt the scalp?",
    faq_c1_a6:
      "No. The bristles are designed to be flexible and soft, providing a more comfortable brushing experience without pain or excessive pulling.",
    faq_c1_q7: "Can the Ethereal Glow Brush help reduce hair breakage?",
    faq_c1_a7:
      "The flexible bristles help reduce excessive friction while brushing, which helps minimize the risk of hair breakage.",

    // FAQ CATEGORY 2: Eco Serenity Scalp Care
    faq_cat2_title: "About Eco Serenity Scalp Care",
    faq_c2_q1: "What is Eco Serenity Scalp Care?",
    faq_c2_a1:
      "Eco Serenity Scalp Care is a scalp massager designed to help cleanse the scalp while providing a comfortable and relaxing massage sensation.",
    faq_c2_q2: "What are the benefits of using a scalp massager?",
    faq_c2_a2:
      "A scalp massager helps cleanse the scalp more optimally, reduces the buildup of oil and dirt, and provides a relaxing effect when used.",
    faq_c2_q3: "Can Eco Serenity be used while washing hair?",
    faq_c2_a3:
      "Yes. Eco Serenity can be used while shampooing to help cleanse the scalp more thoroughly.",
    faq_c2_q4: "Can it be used on dry hair?",
    faq_c2_a4:
      "Yes. Besides during shampooing, Eco Serenity is also suitable for a relaxing scalp massage when the hair is dry.",
    faq_c2_q5: "Is this scalp massager safe for sensitive scalps?",
    faq_c2_a5:
      "Eco Serenity is designed with soft and flexible teeth to ensure it remains comfortable for various scalp conditions.",

    // FAQ CATEGORY 3: Pengiriman & Pemesanan
    faq_cat3_title: "Shipping & Ordering",
    faq_c3_q1: "How long does shipping take?",
    faq_c3_a1:
      "Delivery time depends on the destination location and the courier selected at checkout.",
    faq_c3_q2: "Is shipping available throughout Indonesia?",
    faq_c3_a2: "Yes, Gycora ships all across Indonesia.",
    faq_c3_q3: "How do I track my order?",
    faq_c3_a3:
      "Once your order is processed, you will receive a tracking number to monitor your shipment status.",
    faq_c3_q4: "Are Gycora products original?",
    faq_c3_a4:
      "Yes. All products sold through the official Gycora store are 100% original.",
    faq_c3_q5: "What if the product is received in a damaged condition?",
    faq_c3_a5:
      "Please contact our customer support team within a maximum of 1x24 hours after receiving the product, including an unboxing video and photos of the product.",

    // FAQ CATEGORY 4: Penggunaan & Perawatan
    faq_cat4_title: "Usage & Care",
    faq_c4_q1: "How do I clean the Ethereal Glow Brush?",
    faq_c4_a1:
      "Clean it regularly using water and mild soap, then dry it completely before using it again.",
    faq_c4_q2: "How do I clean the Eco Serenity Scalp Care?",
    faq_c4_a2:
      "Simply rinse it with clean water after use and store it in a dry place.",
    faq_c4_q3: "Are Gycora products safe for daily use?",
    faq_c4_a3:
      "Yes, all products are designed for routine daily use as needed.",

    // CONTACT US PAGE
    contact_login_req_title: "Login Required",
    contact_login_req_desc:
      "Please login first to send a message to our customer service.",
    contact_sent_title: "Sent!",
    contact_sent_desc: "Your message has been sent successfully.",
    contact_err_send: "Failed to send message",
    contact_err_server: "A server error occurred.",
    contact_history_btn: "My Message History",
    contact_hero_title: "Get in Touch",
    contact_hero_desc:
      "Have questions about our products, orders, or collaborations? The Gycora team is ready to help.",
    contact_info_title: "Contact Information",
    contact_info_desc:
      "Fill out the form and our Customer Care team will respond within 1x24 business hours.",
    contact_label_email: "Email",
    contact_label_phone: "Phone",
    contact_label_office: "Office",
    contact_office_region: "Surabaya, East Java",
    contact_office_country: "Indonesia",
    contact_form_name: "Full Name",
    contact_form_email: "Email Address",
    contact_form_phone: "Phone Number",
    contact_form_phone_empty: "Phone number is not set in your profile",
    contact_form_message: "Message Details",
    contact_form_message_placeholder:
      "Explain your issue or question in detail here...",
    contact_btn_sending: "Sending...",
    contact_btn_send: "Send Message",
    contact_modal_title: "Message History",
    contact_modal_loading: "Loading history...",
    contact_modal_empty: "You have not sent any messages yet.",
    contact_status_waiting: "Waiting for Reply",
    contact_status_replied: "Replied",
    contact_admin_unreplied:
      "Admin has not replied to this message yet. Please check back later.",

    // REQUEST RETURN PAGE
    rr_swal_title: "Return Request Sent",
    rr_swal_desc:
      "Our Customer Care team will review your request shortly and send further instructions via email.",
    rr_title: "Request a Return",
    rr_desc:
      "Not satisfied with your order? Please fill out the form below to start the return process.",
    rr_policy_prefix: "Please make sure you have read our ",
    rr_policy_link: "Return Policy",
    rr_policy_suffix: " before submitting.",
    rr_lbl_order: "Order ID",
    rr_ph_order: "Example: INV-202604-001",
    rr_lbl_email: "Email Address",
    rr_ph_email: "Email used when ordering",
    rr_lbl_product: "Returned Product Name",
    rr_ph_product: "e.g., Ethereal Glow Brush",
    rr_lbl_reason: "Return Reason",
    rr_opt_default: "Select return reason...",
    rr_opt_damaged: "Product damaged upon receipt (leaking/broken)",
    rr_opt_wrong: "Wrong product sent / does not match order",
    rr_opt_allergic: "Allergic reaction / unsuitable for scalp",
    rr_opt_other: "Other reasons",
    rr_lbl_detail: "Explain Issue Details",
    rr_ph_detail:
      "Provide further information regarding the condition of the item you received...",
    rr_btn_submitting: "Sending Request...",
    rr_btn_submit: "Submit Return Request",

    // REFUND POLICY PAGE
    ref_subtitle: "Legal & Policies",
    ref_title: "Refund Policy",
    ref_last_updated: "Last updated:",
    ref_lead_p1: "We have a ",
    ref_lead_strong: "3-days return policy",
    ref_lead_p2:
      ", after goods received. To start a return, you must provide an unboxing video of the goods without any editing and send it to us at ",
    ref_lead_p3:
      ". All return goods, shipping fees are being borne by the buyer.",
    ref_dmg_title: "Damages and issues",
    ref_dmg_p1:
      "Please inspect your order upon reception and contact us immediately at ",
    ref_dmg_p2:
      " if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.",
    ref_exch_title: "Exchanges",
    ref_exch_p1:
      "The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.",
    ref_ref_title: "Refunds",
    ref_ref_p1:
      "We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within ",
    ref_ref_strong: "30 business days",
    ref_ref_p2:
      ". Please remember it can take some time for your bank or credit card company to process and post the refund too.",
    ref_ref_p3:
      "If more than 15 business days have passed since we’ve approved your return, please contact us at ",
    ref_ref_p4: ".",

    // SHIPPING POLICY PAGE
    sp_subtitle: "Legal & Policies",
    sp_title: "Shipping Policy",
    sp_desc: "Shipping and logistics information for Gycora.",
    sp_sec1_title: "1. Processing Time",
    sp_sec1_p1: "All orders are processed within ",
    sp_sec1_strong: "1 business day",
    sp_sec1_p2:
      " (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.",
    sp_sec2_title: "2. Domestic Shipping Rates and Estimates",
    sp_sec2_p1: "We offer the following shipping options for domestic orders:",
    sp_sec2_li1_strong: "Standard Shipping:",
    sp_sec2_li1_text: " [insert cost and delivery time]",
    sp_sec2_li2_strong: "Expedited Shipping:",
    sp_sec2_li2_text: " [insert cost and delivery time]",
    sp_sec2_p2:
      "Shipping charges for your order will be calculated and displayed at checkout.",
    sp_sec3_title: "3. International Shipping",
    sp_sec3_p1:
      "We do offer international shipping and shipping rates vary depending on the destination country. Please contact us at ",
    sp_sec3_p2: " for the rates to your country.",
    sp_sec3_p3:
      "Please note that international orders may be subject to additional duties, taxes, or customs fees, which are the responsibility of the customer.",
    sp_sec4_title: "4. Order Tracking",
    sp_sec4_p1:
      "You will receive a tracking number via email once your order has been shipped. Please allow 24 hours for the tracking information to become available.",
    sp_sec5_title: "5. Shipping Delays",
    sp_sec5_p1:
      "Please note that shipping times may be delayed due to unforeseen circumstances such as holidays, weather conditions, or global events. We will notify you as soon as possible if there are significant delays with your order.",
    sp_sec6_title: "6. Lost or Damaged Packages",
    sp_sec6_p1:
      "We are not responsible for lost or damaged packages during shipping. If your package arrives damaged or if you believe your package is lost, please contact the shipping carrier to file a claim.",
    sp_sec7_title: "7. Questions About Your Order?",
    sp_sec7_p1:
      "If you have any questions about your order, shipping times, or tracking, feel free to contact our customer service team at ",

    // PRIVACY POLICY PAGE
    pp_nav_home: "Home",
    pp_nav_legal: "Legal",
    pp_title: "Privacy Policy",
    pp_last_updated: "Last updated:",
    pp_s1_title: "1. Introduction",
    pp_s1_p1:
      " respects your privacy and is committed to protecting the personal data of our customers in compliance with Indonesia's Personal Data Protection Law (PDPL). This Privacy Policy explains how we collect, use, share, and protect your personal data when you visit our website.",
    pp_s2_title: "2. Data Collection",
    pp_s2_p1: "We may collect the following personal data:",
    pp_s2_l1_strong: "Personal Information:",
    pp_s2_l1_text:
      " name, email address, phone number, postal address, payment details, and other information provided during registration, order processing, or customer service inquiries.",
    pp_s2_l2_strong: "Device and Usage Information:",
    pp_s2_l2_text:
      " IP address, browser type, device identifiers, and other technical information through cookies and similar tracking technologies.",
    pp_s3_title: "3. Purpose of Data Collection",
    pp_s3_p1: "We use your data for purposes permitted by PDPL, including:",
    pp_s3_l1: "Processing and fulfilling your orders.",
    pp_s3_l2: "Improving website functionality and customer experience.",
    pp_s3_l3:
      "Sending order updates, marketing offers (with your consent), and responding to your inquiries.",
    pp_s3_l4: "Complying with legal and regulatory obligations.",
    pp_s4_title: "4. Legal Basis for Processing",
    pp_s4_p1:
      "We only collect and process your data where permitted by law, such as for order fulfillment, based on your consent, or to comply with legal requirements.",
    pp_s5_title: "5. Sharing of Personal Data",
    pp_s5_p1:
      "Your personal data may be shared with trusted third parties, including:",
    pp_s5_l1_strong: "Service Providers:",
    pp_s5_l1_text:
      " such as payment processors, delivery services, and email marketing platforms to facilitate services on our behalf.",
    pp_s5_l2_strong: "Legal Obligations:",
    pp_s5_l2_text:
      " if required by Indonesian law or by lawful government request.",
    pp_s5_p2:
      "All third parties receiving data must handle it with the same level of security and confidentiality as required under PDPL.",
    pp_s6_title: "6. Data Security",
    pp_s6_p1:
      "We implement reasonable technical and organizational measures to protect your data from unauthorized access, alteration, or disclosure. Despite our efforts, no system is fully secure, so please also take precautions when sharing information online.",
    pp_s7_title: "7. Data Retention",
    pp_s7_p1:
      "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Upon reaching the end of its retention period, we will securely delete or anonymize your data.",
    pp_s8_title: "8. Your Rights Under Indonesian Law",
    pp_s8_p1: "Under PDPL, you have the right to:",
    pp_s8_l1: "Access, update, or correct your personal data.",
    pp_s8_l2: "Withdraw your consent at any time.",
    pp_s8_l3:
      "Request deletion of your data if it is no longer necessary for the purpose it was collected.",
    pp_s8_p2: "To exercise these rights, please contact us at ",
    pp_s9_title: "9. Cookies and Tracking",
    pp_s9_p1:
      "We use cookies to enhance your experience on our website. You may adjust your browser settings to disable cookies, but please note this may limit your access to certain features.",
    pp_s10_title: "10. Changes to Our Privacy Policy",
    pp_s10_p1:
      "We may update our Privacy Policy in compliance with PDPL. We will notify you of any significant changes through our website or by email.",
    pp_s11_title: "11. Contact Us",
    pp_s11_p1:
      "If you have questions about this Privacy Policy or wish to exercise your rights under PDPL, please contact us at:",
    pp_s11_address: "Address: Indonesia, Surabaya, East Java 60226, Indonesia",

    // TERMS OF SERVICE
    legal_and_policies: "Legal & Policies",
    terms_of_service: "Terms of Service",
    last_updated: "Last updated:",
    overview: "OVERVIEW",
    overview_1_1:
      "This website is operated by My Store. Throughout the site, the terms “we”, “us” and “our” refer to My Store. My Store offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
    overview_1_2:
      "By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.",
    overview_1_3:
      "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.",
    overview_1_4:
      "Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.",
    overview_1_5:
      "Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and Services to you.",
    section_1: "SECTION 1 - ONLINE STORE TERMS",
    section_1_1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    section_1_2:
      "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).",
    section_1_3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    section_1_4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
    section_2: "SECTION 2 - GENERAL CONDITIONS",
    section_2_1:
      "We reserve the right to refuse Service to anyone for any reason at any time.",
    section_2_2:
      "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.",
    section_2_3:
      "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us.",
    section_2_4:
      "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.",
    section_3:
      "SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION",
    section_3_1:
      "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.",
    section_3_2:
      "This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.",
    section_4: "SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES",
    section_4_1:
      "Prices for our products are subject to change without notice.",
    section_4_2:
      "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
    section_4_3:
      "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.",
    section_5: "SECTION 5 - PRODUCTS OR SERVICES (if applicable)",
    section_5_1:
      "Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange only according to our",
    section_5_2: "Refund Policy",
    section_5_3:
      "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.",
    section_5_4:
      "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or Services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or Service made on this site is void where prohibited.",
    section_5_5:
      "We do not warrant that the quality of any products, Services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.",
    section_6: "SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION",
    section_6_1:
      "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.",
    section_6_2:
      "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.",
    for_more_details: "For more details, please review our",
    refund_policy: "Refund Policy",
    section_7: "SECTION 7 - OPTIONAL TOOLS",
    section_7_1:
      "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.",
    section_7_2:
      "You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.",
    section_7_3:
      "Any use by you of the optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).",
    section_7_4:
      "We may also, in the future, offer new Services and/or features through the website (including the release of new tools and resources). Such new features and/or Services shall also be subject to these Terms of Service.",
    section_8: "SECTION 8 - THIRD-PARTY LINKS",
    section_8_1:
      "Certain content, products and Services available via our Service may include materials from third-parties.",
    section_8_2:
      "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or Services of third-parties.",
    section_8_3:
      "We are not liable for any harm or damages related to the purchase or use of goods, Services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.",
    section_9: "SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS",
    section_9_1:
      "If, at our request, you send certain specific submissions (for example contest entries) or without a request from us, you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.",
    section_9_2:
      "We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.",
    section_9_3:
      "You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.",
    section_10: "SECTION 10 - PERSONAL INFORMATION",
    section_10_1:
      "Your submission of personal information through the store is governed by our Privacy Policy, which can be viewed here:",
    privacy_policy: "Privacy Policy",
    section_11: "SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS",
    section_11_1:
      "Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).",
    section_11_2:
      "We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.",
    section_12: "SECTION 12 - PROHIBITED USES",
    section_12_1:
      "In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.",
    section_13:
      "SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY",
    section_13_1:
      "We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, timely, secure or error-free.",
    section_13_2:
      "We do not warrant that the results that may be obtained from the use of the Service will be accurate or reliable.",
    section_13_3:
      "You agree that from time to time we may remove the Service for indefinite periods of time or cancel the Service at any time, without notice to you.",
    section_13_4:
      "You expressly agree that your use of, or inability to use, the Service is at your sole risk. The Service and all products and Services delivered to you through the Service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.",
    section_13_5:
      "In no case shall My Store, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, Service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the Service or any products procured using the Service, or for any other claim related in any way to your use of the Service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the Service or any content (or product) posted, transmitted, or otherwise made available via the Service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.",
    section_14: "SECTION 14 - INDEMNIFICATION",
    section_14_1:
      "You agree to indemnify, defend and hold harmless My Store and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, Service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.",
    section_15: "SECTION 15 - SEVERABILITY",
    section_15_1:
      "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.",
    section_16: "SECTION 16 - TERMINATION",
    section_16_1:
      "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.",
    section_16_2:
      "These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.",
    section_16_3:
      "If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).",
    section_17: "SECTION 17 - ENTIRE AGREEMENT",
    section_17_1:
      "The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.",
    section_17_2:
      "These Terms of Service and any policies or operating rules posted by us on this site or in respect to the Service constitutes the entire agreement and understanding between you and us and governs your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).",
    section_17_3:
      "Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.",
    section_18: "SECTION 18 - GOVERNING LAW",
    section_18_1:
      "These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Indonesia.",
    section_19: "SECTION 19 - CHANGES TO TERMS OF SERVICE",
    section_19_1:
      "You can review the most current version of the Terms of Service at any time at this page.",
    section_19_2:
      "We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.",
    section_20: "SECTION 20 - CONTACT INFORMATION",
    section_20_1:
      "Questions about the Terms of Service should be sent to us at",
    trade_name: "Trade name:",
    physical_address: "Physical address:",

    // TRACKING PAGE
    tp_back_to_orders: "Back to Orders",
    tp_title: "Track Shipment",
    tp_loading_details: "Fetching order details...",
    tp_waybill_title: "Waybill Number",
    tp_waiting_waybill: "Waiting for Waybill...",
    tp_payment_title: "Payment",
    tp_courier_title: "Courier",
    tp_courier_na: "N/A",
    tp_origin_title: "Sender Details",
    tp_sender_name: "Sender Name",
    tp_sender_phone: "Phone Number",
    tp_sender_address: "Full Address",
    tp_postal_code: "Postal Code",
    tp_dest_title: "Receiver Details",
    tp_receiver_name: "Receiver Name",
    tp_receiver_phone: "Phone Number",
    tp_receiver_address: "Full Address",
    tp_courier_note: "Courier Note",
    tp_waiting_location:
      "Waiting for origin and destination location data to be available from the shipping carrier...",
    tp_item_summary: "Item Summary",
    tp_variant_title: "Color Variant",
    tp_subtotal: "Product Subtotal",
    tp_shipping_cost: "Shipping Cost",
    tp_promo_label: "Promo",
    tp_points_redeemed: "Points Redeemed",
    tp_points_unit: "Pts",
    tp_grand_total: "Grand Total",
    tp_loyalty_reward: "Loyalty Reward",
    tp_points_earned: "Points credited to your account",
    tp_timeline_title: "Shipment Timeline",

    // Error & Status Messages
    tp_err_fetch_order: "Failed to fetch order details.",
    tp_err_system: "A system error occurred.",
    tp_stat_processing: "Processing",
    tp_note_pending: "Waiting for customer payment.",
    tp_note_placed: "Order received and waiting for courier allocation.",
    tp_note_allocated: "Courier allocated and will pick up the package soon.",
    tp_note_picking_up: "Courier is on the way to the pickup location.",
    tp_note_picked:
      "Package picked up by courier and entered the sorting center.",
    tp_note_dropping_off: "Package is on its way to the destination address.",
    tp_note_delivered: "Package has been successfully delivered and received.",
    tp_note_rejected: "Shipment rejected by courier or system.",
    tp_note_cancelled: "Shipment has been cancelled.",
    tp_note_default: "Order is being processed by the system.",

    b2b_label: "B2B Wholesale",
    hero_title_1: "Gycora",
    hero_title_2: "Business",
    hero_title_3: "Partner.",
    hero_desc_business:
      "Scale your business with us. Become part of Gycora's exclusive partner network and enjoy maximum profit margins to grow your store.",
    btn_register: "Register Now",

    step_title: "How to Become a Reseller",
    step_1_title: "Complete the Form",
    step_1_desc:
      "Fill in your store information and estimated monthly sales through our registration form.",
    step_2_title: "Review Process",
    step_2_desc:
      "The Gycora team will review your business profile within 1 business day to ensure it meets our partnership standards.",
    step_3_title: "Access Granted",
    step_3_desc:
      "Once approved, your account will be automatically upgraded, allowing you to access our Factory Wholesale Prices.",
    step_4_title: "Start Selling",
    step_4_desc:
      "Place your minimum order quantity (MOQ) and enjoy maximum profit margins for your business.",

    faq_title: "Frequently Asked Questions About Becoming a Gycora Reseller",
    faq_1_q:
      "What is the minimum order quantity (MOQ) to receive reseller pricing?",
    faq_1_a:
      "To protect market pricing (Price Protection), Gycora's exclusive wholesale prices are only activated when you purchase a minimum of 24 pieces (2 dozen) per transaction in your cart.",
    faq_2_q: "Does Gycora support a dropshipping system?",
    faq_2_a:
      "Currently, our Business Partner program focuses on the B2B Wholesale (Traditional Wholesale) model. Products will be shipped in bulk to your address, and you are free to resell them on any platform with a profit margin of 20%–30%.",
    faq_3_q: "How long does reseller account approval take?",
    faq_3_a:
      "The review and approval process usually takes up to 1 business day. Our team needs to ensure that every partner shares Gycora's business vision and commitment.",

    feedback_title: "See What Our Resellers Have to Say",
    feedback_1_name: "Toko Cantik Jelita",
    feedback_1_platform: "Shopee Seller",
    feedback_1_comment:
      "The profit margin from Gycora is excellent! Since becoming a reseller, my store's cash flow has improved because the products sell very quickly.",
    feedback_2_name: "Aura Beauty Supply",
    feedback_2_platform: "Physical Store",
    feedback_2_comment:
      "At first, I was hesitant because of the 24-piece MOQ. But the product quality is truly premium. My salon customers love it, and two dozen sold out within just one week.",
    feedback_3_name: "Dewi Haircare",
    feedback_3_platform: "TikTok Shop",
    feedback_3_comment:
      "What I love most is the price protection. Gycora doesn't offer wholesale prices to just anyone, so resellers don't have to worry about price wars.",

    benefit_title_business: "Partnership Benefits",
    benefit_1_title: "Exclusive Wholesale Pricing",
    benefit_1_desc:
      "Maximize your profits with direct access to exclusive wholesale prices available only to Business Partners.",
    benefit_2_title: "Premium Marketing Assets",
    benefit_2_desc:
      "Get free access to high-resolution product photos and videos without watermarks for promoting your store.",
    benefit_3_title: "Priority Stock Allocation",
    benefit_3_desc:
      "Receive priority access to best-selling products and new collections before they are released to regular retail customers.",

    modal_title: "Business Partnership Application Form",
    modal_desc:
      "Complete your business information below. Our team will review your application within 1 business day.",
    label_shop_name: "Store / Business Name",
    placeholder_shop_name: "Example: Gycora Official Store",
    label_platform: "Primary Sales Platform",
    opt_select_platform: "Select a Platform",
    opt_offline: "Offline / Physical Store",
    opt_other: "Other",

    label_capacity: "Estimated Monthly Purchase Volume",
    opt_select_capacity: "Select Estimated Order Volume",
    opt_more_than: "More than 500 pcs",

    label_notes: "Additional Notes / Store Link (Optional)",
    placeholder_notes:
      "Tell us a little about your business or provide your store link so we can review your application more quickly.",

    btn_processing_business: "Processing...",
    btn_submit: "Submit Partnership Application",

    alert_login_title: "Login Required",
    alert_login_desc: "Please log in first to apply as a Business Partner.",

    alert_success_title: "Application Submitted Successfully!",
    alert_success_desc: "Our team will review your application shortly.",

    alert_error_title: "Application Failed",
    alert_error_desc: "A system error occurred. Please try again later.",
    wholesale_price: "Wholesale Price",
    active_bundle: "ACTIVE BUNDLE",
    wait_partner: "WAITING FOR BUNDLE PAIR",
    bundle_promo_price: "Bundle Promo Price",
    bundle_promo_active: "Bundle Promo Active",
    bundle: "Bundle",
    check_or_add: "Select or add",
    item_again: "more item(s) to get the reseller price.",
    wholesale_pricing_active: "Wholesale Pricing Active!",
    enable_wholesale_pricing: "Enable Wholesale Pricing",
    favorite_collection: "Favorite Collection",
    favorite_still_empty: "Your favorites list is empty.",
    product_exploration: "Explore Products",
    payment_successful: "Payment Successful 🎉",
    thank_you_payment_success:
      "Thank you! Your payment has been processed successfully.",
    payment_ref: "Payment Ref:",
    see_my_order: "View My Orders",
    back_to_home: "Back to Home",
    wholesale_lable: "WHOLESALE",
    join_partnership: "Join Partnership",
    change_profile : "Change Profile",
    district : "District:",
    choose_method : "Choose the Method"
  },
};

export type LanguageCode = "id" | "en";
export type TranslationKey = keyof typeof translations.id;
