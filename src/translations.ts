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
    promo_title: "Diskon Spesial First Order ✨",
    promo_desc1:
      "Nikmati 10% OFF + subsidi ongkir Rp10.000 untuk pembelian pertamamu.",
    promo_desc2: "Masukkan email kamu dan klaim voucher eksklusif sekarang.",
    email_placeholder: "Masukkan Email",
    sending: "Mengirim...",
    claim_now: "Klaim Sekarang",
    promo_success_title: "Kode Promo Terkirim!",
    promo_success_desc:
      "Silakan periksa kotak masuk email Anda untuk mendapatkan kode voucher spesial dari Gycora.",
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
    cat_teen_acne: "Jerawat Remaja",
    cat_adult_acne: "Jerawat Dewasa",
    cat_baldness: "Kebotakan",
    cat_hair_loss: "Rambut Rontok",
    cat_beard_growth: "Penumbuh Brewok",
    cat_dull_skin: "Kulit Kusam",
    cat_acne_scars: "Bekas Jerawat",
    cat_dandruff: "Ketombe",
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
    promo_title: "First Order Special Discount ✨",
    promo_desc1:
      "Enjoy 10% OFF + IDR 10,000 shipping subsidy for your first purchase.",
    promo_desc2: "Enter your email and claim the exclusive voucher now.",
    email_placeholder: "Enter your Email",
    sending: "Sending...",
    claim_now: "Claim Now",
    promo_success_title: "Promo Code Sent!",
    promo_success_desc:
      "Please check your email inbox to get the special voucher code from Gycora.",
    notification: "Notification",
    promo_failed_desc:
      "Failed to claim promo. Make sure the email format is correct.",
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
    cat_teen_acne: "Teen Acne",
    cat_adult_acne: "Adult Acne",
    cat_baldness: "Baldness",
    cat_hair_loss: "Hair Loss",
    cat_beard_growth: "Beard Growth",
    cat_dull_skin: "Dull Skin",
    cat_acne_scars: "Acne Scars",
    cat_dandruff: "Dandruff",
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
  },
};

export type LanguageCode = "id" | "en";
export type TranslationKey = keyof typeof translations.id;
