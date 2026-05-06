// import { useState } from "react";
// import { Link } from "react-router-dom";

// const faqs = [
//   {
//     question: "What makes the Ethereal Glow Brush different from other hair brushes?",
//     answer: "The Ethereal Glow Brush uses static-free technology and is made from conductive carbon molecules, which help reduce static buildup in the hair. Its design not only enhances your hair’s natural shine but also improves overall hair health, making it smoother and easier to manage, especially in humid climates."
//   },
//   {
//     question: "How does the Ethereal Glow Brush improve the health of my hair?",
//     answer: "The carbon molecules in the Ethereal Glow Brush have conductive properties that help neutralize static electricity, which can cause frizz and damage. This makes your hair look shinier and healthier while preventing breakage. The flexible bristles also reduce pain and minimize hair damage during brushing."
//   },
//   {
//     question: "Is the Ethereal Glow Brush suitable for all hair types?",
//     answer: "Yes! The brush is designed with flexible spiral bristles that easily glide through all hair types, from straight to curly, and even tangled hair. It’s especially effective in managing unruly hair and minimizing breakage, making it a versatile tool for daily use."
//   },
//   {
//     question: "How durable is the Ethereal Glow Brush?",
//     answer: "The brush is made with carbon molecules, known for their strong and resilient structure. This makes the Ethereal Glow Brush resistant to pressure and damage, ensuring it lasts longer than traditional brushes while maintaining optimal performance."
//   },
//   {
//     question: "Can the Ethereal Glow Brush be used in humid climates?",
//     answer: "Absolutely! The static-free technology and conductive carbon material make this brush ideal for humid environments. It helps prevent static buildup, reducing frizz and flyaways, and leaves your hair looking smooth and shiny even in challenging weather conditions."
//   },
//   {
//     question: "Do you offer discounts and promotions?",
//     answer: "Yes! from time to time we offer discounts and promotions. Sign up for our email and/or WhatsApp to stay updated on our latest offers!"
//   }
// ];

// export default function FAQPage() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const toggleAccordion = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen py-20 font-sans bg-white">
//       <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="mb-16 text-center animate-fade-in-up">
//           <h2 className="mb-4 text-sm font-bold tracking-widest uppercase text-gycora">Common Questions</h2>
//           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
//             Frequently Asked Questions
//           </h1>
//           <p className="mt-6 text-lg text-gray-600">
//             Segala hal yang perlu Anda ketahui tentang produk unggulan kami, Ethereal Glow Brush.
//           </p>
//         </div>

//         {/* FAQ Accordion */}
//         <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
//           {faqs.map((faq, index) => (
//             <div 
//               key={index} 
//               className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
//                 activeIndex === index ? "border-gycora bg-emerald-50/30" : "border-gray-200 bg-white"
//               }`}
//             >
//               <button
//                 onClick={() => toggleAccordion(index)}
//                 className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
//               >
//                 <span className={`text-lg font-bold ${activeIndex === index ? "text-gycora-dark" : "text-gray-900"}`}>
//                   {faq.question}
//                 </span>
//                 <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-180 text-gycora" : "text-gray-400"}`}>
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </span>
//               </button>
              
//               <div 
//                 className={`transition-all duration-300 ease-in-out overflow-hidden ${
//                   activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-6 pt-0 leading-relaxed text-gray-600 border-t border-emerald-100/50">
//                   {faq.answer}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Support Section */}
//         <div className="p-10 mt-20 text-center bg-gray-900 rounded-3xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//           <h3 className="mb-2 text-2xl font-bold text-white">Still have questions?</h3>
//           <p className="mb-8 text-gray-400">Can't find the answer you're looking for? Please chat with our friendly team.</p>
//           <Link 
//             to="/contact" 
//             className="inline-block px-8 py-3 font-bold transition-all rounded-full bg-gycora text-white hover:bg-gycora-dark hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
//           >
//             Contact Support
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";

// Data FAQ yang sudah dikelompokkan sesuai desain UI/UX terbaru
const faqCategories = [
  {
    title: "Tentang Ethereal Glow Brush",
    faqs: [
      {
        question: "Apa itu Ethereal Glow Brush?",
        answer: "Ethereal Glow Brush adalah hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang membantu rambut terasa lebih halus, rapi, dan mudah diatur dalam sekali sisir."
      },
      {
        question: "Apa manfaat utama Ethereal Glow Brush?",
        answer: "Ethereal Glow Brush membantu mengurangi rambut kusut, mengembang, dan sulit diatur, sekaligus memberikan pengalaman menyisir yang lebih nyaman untuk penggunaan sehari-hari."
      },
      {
        question: "Apakah Ethereal Glow Brush cocok untuk semua jenis rambut?",
        answer: "Ya, Ethereal Glow Brush dirancang untuk berbagai jenis rambut, mulai dari lurus, bergelombang, hingga rambut yang mudah kusut dan mengembang."
      },
      {
        question: "Apakah sisir ini bisa digunakan setiap hari?",
        answer: "Tentu. Ethereal Glow Brush aman dan nyaman digunakan setiap hari untuk membantu menjaga rambut tetap rapi dan mudah diatur."
      },
      {
        question: "Apa bedanya dengan sisir biasa?",
        answer: "Ethereal Glow Brush menggunakan teknologi anti-static yang membantu mengurangi listrik statis pada rambut, sehingga rambut terasa lebih halus dan tidak mudah mengembang."
      },
      {
        question: "Apakah bulu sisirnya sakit di kulit kepala?",
        answer: "Tidak. Bulu sisir dirancang fleksibel dan lembut untuk memberikan pengalaman menyisir yang lebih nyaman tanpa rasa sakit atau tarikan berlebih."
      },
      {
        question: "Apakah Ethereal Glow Brush bisa membantu mengurangi rambut patah?",
        answer: "Bulu sisir yang fleksibel membantu mengurangi gesekan berlebih saat menyisir sehingga membantu meminimalkan risiko rambut patah."
      }
    ]
  },
  {
    title: "Tentang Eco Serenity Scalp Care",
    faqs: [
      {
        question: "Apa itu Eco Serenity Scalp Care?",
        answer: "Eco Serenity Scalp Care adalah scalp massager yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang nyaman dan relaxing."
      },
      {
        question: "Apa manfaat menggunakan scalp massager?",
        answer: "Scalp massager membantu membersihkan kulit kepala lebih optimal, membantu mengurangi penumpukan minyak dan kotoran, serta memberikan efek relaksasi saat digunakan."
      },
      {
        question: "Apakah Eco Serenity bisa digunakan saat keramas?",
        answer: "Ya. Eco Serenity dapat digunakan saat keramas untuk membantu membersihkan kulit kepala dengan lebih maksimal."
      },
      {
        question: "Apakah bisa digunakan saat rambut kering?",
        answer: "Bisa. Selain saat keramas, Eco Serenity juga cocok digunakan untuk pijatan relaksasi pada kulit kepala saat rambut kering."
      },
      {
        question: "Apakah scalp massager ini aman untuk kulit kepala sensitif?",
        answer: "Eco Serenity dirancang dengan teeth yang lembut dan fleksibel agar tetap nyaman digunakan pada berbagai kondisi kulit kepala."
      }
    ]
  },
  {
    title: "Pengiriman & Pemesanan",
    faqs: [
      {
        question: "Berapa lama proses pengiriman?",
        answer: "Waktu pengiriman menyesuaikan lokasi tujuan dan ekspedisi yang dipilih saat checkout."
      },
      {
        question: "Apakah tersedia pengiriman ke seluruh Indonesia?",
        answer: "Ya, Gycora melayani pengiriman ke seluruh Indonesia."
      },
      {
        question: "Bagaimana cara melacak pesanan saya?",
        answer: "Setelah pesanan diproses, kamu akan menerima nomor resi untuk melacak status pengiriman pesananmu."
      },
      {
        question: "Apakah produk Gycora original?",
        answer: "Ya. Seluruh produk yang dijual melalui official store Gycora merupakan produk original."
      },
      {
        question: "Bagaimana jika produk diterima dalam kondisi rusak?",
        answer: "Silakan hubungi tim customer support kami maksimal 1x24 jam setelah produk diterima dengan menyertakan video unboxing dan foto produk."
      }
    ]
  },
  {
    title: "Penggunaan & Perawatan",
    faqs: [
      {
        question: "Bagaimana cara membersihkan Ethereal Glow Brush?",
        answer: "Bersihkan secara berkala menggunakan air dan sabun lembut, lalu keringkan sebelum digunakan kembali."
      },
      {
        question: "Bagaimana cara membersihkan Eco Serenity Scalp Care?",
        answer: "Cukup bilas menggunakan air bersih setelah digunakan dan simpan di tempat kering."
      },
      {
        question: "Apakah produk Gycora aman digunakan setiap hari?",
        answer: "Ya, seluruh produk dirancang untuk penggunaan rutin sehari-hari sesuai kebutuhan."
      }
    ]
  }
];

export default function FAQPage() {
  // Mengubah activeIndex menjadi ID string agar bisa membedakan kategori dan item
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="min-h-screen py-20 font-sans bg-white">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 animate-fade-in-up">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-center uppercase text-gycora">FAQ Page</h2>
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Temukan jawaban dari pertanyaan yang paling sering ditanyakan tentang produk, penggunaan, pengiriman, hingga pengalaman belanja di Gycora.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Masih butuh bantuan? Tim kami siap membantu kamu kapan aja 🤍
          </p>
        </div>

        {/* FAQ Categories & Accordion */}
        <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="space-y-4">
              <h3 className="pb-3 mb-6 text-2xl font-extrabold text-gray-900 border-b border-gray-100">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.faqs.map((faq, index) => {
                  const currentId = `${catIndex}-${index}`;
                  return (
                    <div 
                      key={currentId} 
                      className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
                        activeId === currentId ? "border-gycora bg-emerald-50/30" : "border-gray-200 bg-white"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(currentId)}
                        className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                      >
                        <span className={`text-base sm:text-lg font-bold pr-4 ${activeId === currentId ? "text-gycora-dark" : "text-gray-900"}`}>
                          {faq.question}
                        </span>
                        <span className={`flex-shrink-0 transition-transform duration-300 ${activeId === currentId ? "rotate-180 text-gycora" : "text-gray-400"}`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          activeId === currentId ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-6 pt-0 leading-relaxed text-gray-600 border-t border-emerald-100/50">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="p-10 mt-20 text-center bg-gray-900 rounded-3xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <h3 className="mb-2 text-2xl font-bold text-white">Still have questions?</h3>
          <p className="mb-8 text-gray-400">Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <Link 
            to="/contact" 
            className="inline-block px-8 py-3 font-bold transition-all rounded-full bg-gycora text-white hover:bg-gycora-dark hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}