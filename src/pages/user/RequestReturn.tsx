// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function RequestReturn() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulasi pengiriman data (karena belum ada endpoint API khusus untuk ini)
//     setTimeout(() => {
//       setIsSubmitting(false);
//       Swal.fire({
//         icon: "success",
//         title: "Permintaan Retur Terkirim",
//         text: "Tim Customer Care kami akan segera meninjau permintaan Anda dan mengirimkan instruksi selanjutnya melalui email.",
//         confirmButtonColor: "#059669"
//       });
//       // Mengosongkan form bisa dilakukan di sini dengan mereset state, 
//       // namun untuk contoh statis ini kita cukupkan dengan alert.
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen py-16 font-sans bg-gray-50">
//       <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="mb-12 text-center animate-fade-in-up">
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
//             Request a Return
//           </h1>
//           <p className="mt-4 text-gray-600">
//             Tidak puas dengan pesanan Anda? Silakan isi formulir di bawah ini untuk memulai proses pengembalian barang.
//           </p>
//           <p className="mt-2 text-sm text-gray-500">
//             Pastikan Anda telah membaca <Link to="/policies/return" className="font-semibold text-gycora hover:underline">Return Policy</Link> kami sebelum mengajukan.
//           </p>
//         </div>

//         {/* Form Container */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-10 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Nomor Pesanan (Order ID)</label>
//                 <input 
//                   type="text" 
//                   required 
//                   placeholder="Contoh: INV-202604-001"
//                   className="w-full p-3 transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Alamat Email</label>
//                 <input 
//                   type="email" 
//                   required 
//                   placeholder="Email yang digunakan saat memesan"
//                   className="w-full p-3 transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk yang Diretur</label>
//               <input 
//                 type="text" 
//                 required 
//                 placeholder="Misal: Gycora Revitalizing Shampoo"
//                 className="w-full p-3 transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Alasan Retur</label>
//               <select required className="w-full p-3 transition-colors border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white">
//                 <option value="" disabled selected>Pilih alasan pengembalian...</option>
//                 <option value="damaged">Produk rusak saat diterima (bocor/pecah)</option>
//                 <option value="wrong_item">Produk yang dikirim salah/tidak sesuai pesanan</option>
//                 <option value="allergic">Reaksi alergi/tidak cocok di kulit kepala</option>
//                 <option value="other">Alasan lainnya</option>
//               </select>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Jelaskan Detail Masalah</label>
//               <textarea 
//                 required 
//                 rows={4}
//                 placeholder="Berikan informasi lebih lanjut mengenai kondisi barang yang Anda terima..."
//                 className="w-full p-3 transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
//               ></textarea>
//             </div>

//             <div className="pt-4">
//               <button 
//                 type="submit" 
//                 disabled={isSubmitting}
//                 className={`w-full py-4 font-bold text-white rounded-xl shadow-md transition-all ${isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-gycora hover:bg-gycora-dark hover:-translate-y-0.5'}`}
//               >
//                 {isSubmitting ? "Mengirim Permintaan..." : "Kirim Permintaan Retur"}
//               </button>
//             </div>
            
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

export default function RequestReturn() {
  const { t, lang } = useLanguage(); // Inisialisasi hook bahasa
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi pengiriman data (karena belum ada endpoint API khusus untuk ini)
    setTimeout(() => {
      setIsSubmitting(false);
      Swal.fire({
        icon: "success",
        title: t("rr_swal_title"),
        text: t("rr_swal_desc"),
        confirmButtonColor: "#059669"
      });
      // Mengosongkan form bisa dilakukan di sini dengan mereset state, 
      // namun untuk contoh statis ini kita cukupkan dengan alert.
    }, 1500);
  };

  return (
    <div className="min-h-screen py-16 font-sans bg-gray-50">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            {t("rr_title")}
          </h1>
          <p className="mt-4 text-gray-600">
            {t("rr_desc")}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {t("rr_policy_prefix")}
            <Link to={`/${lang}/policies/return`} className="font-semibold text-gycora hover:underline">
              {t("rr_policy_link")}
            </Link>
            {t("rr_policy_suffix")}
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-10 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  {t("rr_lbl_order")}
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder={t("rr_ph_order")}
                  className="w-full p-3 transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  {t("rr_lbl_email")}
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder={t("rr_ph_email")}
                  className="w-full p-3 transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                {t("rr_lbl_product")}
              </label>
              <input 
                type="text" 
                required 
                placeholder={t("rr_ph_product")}
                className="w-full p-3 transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                {t("rr_lbl_reason")}
              </label>
              <select required defaultValue="" className="w-full p-3 transition-colors border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white">
                <option value="" disabled>{t("rr_opt_default")}</option>
                <option value="damaged">{t("rr_opt_damaged")}</option>
                <option value="wrong_item">{t("rr_opt_wrong")}</option>
                <option value="allergic">{t("rr_opt_allergic")}</option>
                <option value="other">{t("rr_opt_other")}</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                {t("rr_lbl_detail")}
              </label>
              <textarea 
                required 
                rows={4}
                placeholder={t("rr_ph_detail")}
                className="w-full p-3 transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora/50 focus:border-gycora focus:bg-white"
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 font-bold text-white rounded-xl shadow-md transition-all ${isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-gycora hover:bg-gycora-dark hover:-translate-y-0.5'}`}
              >
                {isSubmitting ? t("rr_btn_submitting") : t("rr_btn_submit")}
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
}