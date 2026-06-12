// import { Link } from "react-router-dom";

// export default function RefundPolicy() {
//   return (
//     <div className="min-h-screen py-16 font-sans bg-white">
//       <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 animate-fade-in-up">
        
//         <div className="mb-10 text-center">
//           <p className="mb-3 text-sm font-bold tracking-widest uppercase text-gycora">Legal & Policies</p>
//           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Refund Policy</h1>
//           <p className="mt-4 text-gray-500">
//             Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//           </p>
//         </div>

//         <div className="p-8 prose prose-lg text-gray-600 border border-pink-100 prose-emerald max-w-none bg-pink-50/30 rounded-3xl sm:p-12">
          
//           <p className="lead">
//             We have a <strong>3-days return policy</strong>, after goods received. 
//             To start a return, you must provide an unboxing video of the goods without any editing and send it to us at <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">gycora.essence@gmail.com</a>. 
//             All return goods, shipping fees are being borne by the buyer.
//           </p>

//           <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">Damages and issues</h3>
//           <p>
//             Please inspect your order upon reception and contact us immediately at <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">gycora.essence@gmail.com</a> if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
//           </p>

//           <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">Exchanges</h3>
//           <p>
//             The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
//           </p>

//           <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">Refunds</h3>
//           <p>
//             We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within <strong>30 business days</strong>. Please remember it can take some time for your bank or credit card company to process and post the refund too.
//           </p>
//           <p>
//             If more than 15 business days have passed since we’ve approved your return, please contact us at <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">gycora.essence@gmail.com</a>.
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

export default function RefundPolicy() {
  const { t, lang } = useLanguage(); // Inisialisasi hook bahasa

  return (
    <div className="min-h-screen py-16 font-sans bg-white">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 animate-fade-in-up">
        
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold tracking-widest uppercase text-gycora">
            {t("ref_subtitle")}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {t("ref_title")}
          </h1>
          <p className="mt-4 text-gray-500">
            {t("ref_last_updated")} {new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="p-8 prose prose-lg text-gray-600 border border-pink-100 prose-emerald max-w-none bg-pink-50/30 rounded-3xl sm:p-12">
          
          <p className="lead">
            {t("ref_lead_p1")}
            <strong>{t("ref_lead_strong")}</strong>
            {t("ref_lead_p2")}
            <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">
              gycora.essence@gmail.com
            </a>
            {t("ref_lead_p3")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            {t("ref_dmg_title")}
          </h3>
          <p>
            {t("ref_dmg_p1")}
            <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">
              gycora.essence@gmail.com
            </a>
            {t("ref_dmg_p2")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            {t("ref_exch_title")}
          </h3>
          <p>
            {t("ref_exch_p1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            {t("ref_ref_title")}
          </h3>
          <p>
            {t("ref_ref_p1")}
            <strong>{t("ref_ref_strong")}</strong>
            {t("ref_ref_p2")}
          </p>
          <p>
            {t("ref_ref_p3")}
            <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">
              gycora.essence@gmail.com
            </a>
            {t("ref_ref_p4")}
          </p>

        </div>
      </div>
    </div>
  );
}