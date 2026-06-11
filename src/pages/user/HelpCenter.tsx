// import { useState } from "react";
// import { Link } from "react-router-dom";

// // --- DATA DUMMY FAQ ---
// const faqData = [
//   {
//     category: "Pemesanan & Pembayaran",
//     items: [
//       {
//         id: "order-1",
//         question: "Bagaimana cara melacak pesanan saya?",
//         answer: "Setelah pesanan Anda dikirim, Anda akan menerima email berisi nomor resi. Anda juga dapat melacaknya secara langsung melalui menu 'Order' di akun Anda."
//       },
//       {
//         id: "order-2",
//         question: "Metode pembayaran apa saja yang didukung Gycora?",
//         answer: "Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BNI, BRI), Kartu Kredit/Debit, GoPay, OVO, ShopeePay, dan QRIS."
//       },
//       {
//         id: "order-3",
//         question: "Bisakah saya membatalkan atau mengubah pesanan?",
//         answer: "Pesanan yang sudah dibayar dan masuk ke sistem kami akan langsung diproses. Jika Anda ingin membatalkan atau mengubah pesanan, harap segera hubungi Customer Service kami dalam waktu maksimal 1 jam setelah pembayaran."
//       }
//     ]
//   },
//   {
//     category: "Pengiriman",
//     items: [
//       {
//         id: "ship-1",
//         question: "Berapa lama waktu pengiriman?",
//         answer: "Untuk wilayah Jabodetabek biasanya memakan waktu 1-3 hari kerja. Untuk wilayah di luar Jawa, estimasi pengiriman adalah 3-7 hari kerja tergantung ekspedisi yang dipilih."
//       },
//       {
//         id: "ship-2",
//         question: "Apakah Gycora melayani pengiriman internasional?",
//         answer: "Saat ini kami hanya melayani pengiriman ke seluruh wilayah di Indonesia. Kami sedang berusaha memperluas jangkauan kami ke negara lain di masa mendatang!"
//       }
//     ]
//   },
//   {
//     category: "Produk & Retur",
//     items: [
//       {
//         id: "prod-1",
//         question: "Apakah produk Gycora aman untuk ibu hamil dan menyusui?",
//         answer: "Ya, semua produk kami diformulasikan tanpa bahan kimia berbahaya seperti Paraben dan SLS. Namun, kami selalu menyarankan Anda untuk berkonsultasi dengan dokter kandungan sebelum mencoba produk perawatan baru."
//       },
//       {
//         id: "prod-2",
//         question: "Bagaimana kebijakan pengembalian barang (Retur)?",
//         answer: "Anda dapat mengajukan pengembalian barang dalam waktu 14 hari sejak barang diterima jika barang rusak, cacat, atau tidak sesuai pesanan. Syarat lengkap dapat dibaca di halaman Return Policy kami."
//       }
//     ]
//   }
// ];

// export default function HelpCenter() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openFaqId, setOpenFaqId] = useState<string | null>(null);

//   // Logika untuk fitur pencarian
//   const filteredFaqs = faqData.map(category => {
//     const filteredItems = category.items.filter(item => 
//       item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
//       item.answer.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     return { ...category, items: filteredItems };
//   }).filter(category => category.items.length > 0);

//   const toggleFaq = (id: string) => {
//     setOpenFaqId(openFaqId === id ? null : id);
//   };

//   return (
//     <div className="min-h-screen pb-20 font-sans bg-gray-50">
      
//       {/* HERO SECTION DENGAN SEARCH */}
//       <div className="pt-20 pb-16 border-b border-gray-100 bg-gradient-to-b from-pink-50 to-white">
//         <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8 animate-fade-in-up">
//           <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//             Hi, ada yang bisa kami bantu?
//           </h1>
//           <p className="mb-10 text-lg text-gray-600">
//             Temukan jawaban untuk pertanyaan seputar pesanan, pengiriman, dan produk Gycora.
//           </p>
          
//           <div className="relative max-w-2xl mx-auto">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//               <svg className="w-6 h-6 text-gycora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//             <input 
//               type="text" 
//               placeholder="Cari pertanyaan... (misal: cara lacak pesanan)" 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full py-4 pl-12 pr-4 text-lg text-gray-900 transition-all border border-gray-200 shadow-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-gycora focus:border-transparent"
//             />
//           </div>
//         </div>
//       </div>

//       {/* KONTEN FAQ */}
//       <div className="max-w-3xl px-4 mx-auto mt-12 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        
//         {filteredFaqs.length === 0 ? (
//           <div className="py-16 text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
//             <h3 className="mb-2 text-xl font-bold text-gray-900">Oops! Tidak ada hasil.</h3>
//             <p className="text-gray-500">Kami tidak dapat menemukan jawaban untuk "{searchQuery}".</p>
//             <button 
//               onClick={() => setSearchQuery("")}
//               className="mt-6 font-bold text-gycora hover:underline"
//             >
//               Lihat Semua Pertanyaan
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-12">
//             {filteredFaqs.map((category, index) => (
//               <div key={index}>
//                 <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
//                   <div className="w-2 h-6 rounded-full bg-gycora"></div>
//                   {category.category}
//                 </h2>
                
//                 <div className="overflow-hidden bg-white border border-gray-100 divide-y divide-gray-100 shadow-sm rounded-2xl">
//                   {category.items.map((faq) => (
//                     <div key={faq.id} className="group">
//                       <button 
//                         onClick={() => toggleFaq(faq.id)}
//                         className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors focus:outline-none hover:bg-gray-50"
//                       >
//                         <span className={`font-semibold text-lg transition-colors ${openFaqId === faq.id ? 'text-gycora' : 'text-gray-800 group-hover:text-gycora'}`}>
//                           {faq.question}
//                         </span>
//                         <span className="flex-shrink-0 ml-4">
//                           <svg 
//                             className={`w-5 h-5 transition-transform duration-300 ${openFaqId === faq.id ? 'transform rotate-180 text-gycora' : 'text-gray-400'}`} 
//                             fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </span>
//                       </button>
                      
//                       <div 
//                         className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0'}`}
//                       >
//                         <p className="leading-relaxed text-gray-600">
//                           {faq.answer}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>

//       {/* CTA SECTION */}
//       <div className="max-w-3xl px-4 mx-auto mt-16 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//         <div className="relative p-8 overflow-hidden text-center shadow-xl bg-emerald-900 rounded-3xl sm:p-12">
//           <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full opacity-50 bg-emerald-800 blur-2xl"></div>
//           <div className="absolute bottom-0 left-0 w-32 h-32 -mb-8 -ml-8 rounded-full bg-gycora opacity-30 blur-2xl"></div>
          
//           <div className="relative z-10">
//             <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl">Masih butuh bantuan?</h2>
//             <p className="max-w-lg mx-auto mb-8 text-emerald-100">
//               Tim Customer Care kami selalu siap membantu menyelesaikan kendala Anda. Jangan ragu untuk menghubungi kami.
//             </p>
//             <div className="flex flex-col justify-center gap-4 sm:flex-row">
//               <Link 
//                 to="/contact" 
//                 className="bg-white text-emerald-900 font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
//               >
//                 Hubungi Kami
//               </Link>
//               <Link 
//                 to="/returns/request" 
//                 className="bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-full hover:bg-emerald-700 border border-emerald-700 transition-colors"
//               >
//                 Ajukan Retur
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

export default function HelpCenter() {
  const { t, lang } = useLanguage(); // Inisialisasi hook bahasa
  
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // --- DATA FAQ DIUBAH MENJADI DINAMIS ---
  // Data ini ditempatkan di dalam komponen agar bisa mengakses fungsi 't()'
  const faqData = [
    {
      category: t("hc_cat_order"),
      items: [
        {
          id: "order-1",
          question: t("hc_q_order_1"),
          answer: t("hc_a_order_1")
        },
        {
          id: "order-2",
          question: t("hc_q_order_2"),
          answer: t("hc_a_order_2")
        },
        {
          id: "order-3",
          question: t("hc_q_order_3"),
          answer: t("hc_a_order_3")
        }
      ]
    },
    {
      category: t("hc_cat_shipping"),
      items: [
        {
          id: "ship-1",
          question: t("hc_q_ship_1"),
          answer: t("hc_a_ship_1")
        },
        {
          id: "ship-2",
          question: t("hc_q_ship_2"),
          answer: t("hc_a_ship_2")
        }
      ]
    },
    {
      category: t("hc_cat_product"),
      items: [
        {
          id: "prod-1",
          question: t("hc_q_prod_1"),
          answer: t("hc_a_prod_1")
        },
        {
          id: "prod-2",
          question: t("hc_q_prod_2"),
          answer: t("hc_a_prod_2")
        }
      ]
    }
  ];

  // Logika untuk fitur pencarian
  const filteredFaqs = faqData.map(category => {
    const filteredItems = category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter(category => category.items.length > 0);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen pb-20 font-sans bg-gray-50">
      
      {/* HERO SECTION DENGAN SEARCH */}
      <div className="pt-20 pb-16 border-b border-gray-100 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8 animate-fade-in-up">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {t("hc_hero_title")}
          </h1>
          <p className="mb-10 text-lg text-gray-600">
            {t("hc_hero_desc")}
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-6 h-6 text-gycora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder={t("hc_search_placeholder")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 text-lg text-gray-900 transition-all border border-gray-200 shadow-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-gycora focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* KONTEN FAQ */}
      <div className="max-w-3xl px-4 mx-auto mt-12 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        
        {filteredFaqs.length === 0 ? (
          <div className="py-16 text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
            <h3 className="mb-2 text-xl font-bold text-gray-900">{t("hc_no_result_title")}</h3>
            <p className="text-gray-500">{t("hc_no_result_desc")} "{searchQuery}".</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-6 font-bold text-gycora hover:underline"
            >
              {t("hc_btn_view_all")}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredFaqs.map((category, index) => (
              <div key={index}>
                <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
                  <div className="w-2 h-6 rounded-full bg-gycora"></div>
                  {category.category}
                </h2>
                
                <div className="overflow-hidden bg-white border border-gray-100 divide-y divide-gray-100 shadow-sm rounded-2xl">
                  {category.items.map((faq) => (
                    <div key={faq.id} className="group">
                      <button 
                        onClick={() => toggleFaq(faq.id)}
                        className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors focus:outline-none hover:bg-gray-50"
                      >
                        <span className={`font-semibold text-lg transition-colors ${openFaqId === faq.id ? 'text-gycora' : 'text-gray-800 group-hover:text-gycora'}`}>
                          {faq.question}
                        </span>
                        <span className="flex-shrink-0 ml-4">
                          <svg 
                            className={`w-5 h-5 transition-transform duration-300 ${openFaqId === faq.id ? 'transform rotate-180 text-gycora' : 'text-gray-400'}`} 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      
                      <div 
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0'}`}
                      >
                        <p className="leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* CTA SECTION */}
      <div className="max-w-3xl px-4 mx-auto mt-16 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="relative p-8 overflow-hidden text-center shadow-xl bg-emerald-900 rounded-3xl sm:p-12">
          <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full opacity-50 bg-emerald-800 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 -mb-8 -ml-8 rounded-full bg-gycora opacity-30 blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl">
              {t("hc_cta_title")}
            </h2>
            <p className="max-w-lg mx-auto mb-8 text-emerald-100">
              {t("hc_cta_desc")}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link 
                to={`/${lang}/pages/contact-us`} 
                className="bg-white text-emerald-900 font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                {t("hc_btn_contact")}
              </Link>
              <Link 
                to={`/${lang}/returns/request`} 
                className="bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-full hover:bg-emerald-700 border border-emerald-700 transition-colors"
              >
                {t("hc_btn_return")}
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}