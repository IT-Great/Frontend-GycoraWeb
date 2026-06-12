// export default function ShippingPolicy() {
//   return (
//     <div className="min-h-screen py-16 font-sans bg-white">
//       <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 animate-fade-in-up">
        
//         <div className="mb-10 text-center">
//           <p className="mb-3 text-sm font-bold tracking-widest uppercase text-gycora">Legal & Policies</p>
//           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Shipping Policy</h1>
//           <p className="mt-4 text-gray-500">Informasi pengiriman dan logistik Gycora.</p>
//         </div>

//         <div className="p-8 prose prose-lg text-gray-600 border border-gray-100 shadow-sm prose-emerald max-w-none bg-gray-50/50 rounded-3xl sm:p-12">
          
//           <h3 className="mb-4 text-2xl font-bold text-gray-900">1. Processing Time</h3>
//           <p>
//             All orders are processed within <strong>1 business day</strong> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
//           </p>

//           <div className="my-8 border-t border-gray-200"></div>

//           <h3 className="mb-4 text-2xl font-bold text-gray-900">2. Domestic Shipping Rates and Estimates</h3>
//           <p>We offer the following shipping options for domestic orders:</p>
//           <ul className="pl-5 space-y-2 list-disc">
//             <li><strong>Standard Shipping:</strong> [insert cost and delivery time]</li>
//             <li><strong>Expedited Shipping:</strong> [insert cost and delivery time]</li>
//           </ul>
//           <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
          
//           <div className="my-8 border-t border-gray-200"></div>

//           <h3 className="mb-4 text-2xl font-bold text-gray-900">3. International Shipping</h3>
//           <p>
//             We do offer international shipping and shipping rates vary depending on the destination country. Please contact us at <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">gycora.essence@gmail.com</a> for the rates to your country.
//           </p>
//           <p>
//             Please note that international orders may be subject to additional duties, taxes, or customs fees, which are the responsibility of the customer.
//           </p>

//           <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">4. Order Tracking</h3>
//           <p>
//             You will receive a tracking number via email once your order has been shipped. Please allow 24 hours for the tracking information to become available.
//           </p>

//           <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">5. Shipping Delays</h3>
//           <p>
//             Please note that shipping times may be delayed due to unforeseen circumstances such as holidays, weather conditions, or global events. We will notify you as soon as possible if there are significant delays with your order.
//           </p>

//           <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">6. Lost or Damaged Packages</h3>
//           <p>
//             We are not responsible for lost or damaged packages during shipping. If your package arrives damaged or if you believe your package is lost, please contact the shipping carrier to file a claim.
//           </p>

//           <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">7. Questions About Your Order?</h3>
//           <p>
//             If you have any questions about your order, shipping times, or tracking, feel free to contact our customer service team at <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">gycora.essence@gmail.com</a>.
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

export default function ShippingPolicy() {
  const { t } = useLanguage(); // Inisialisasi hook bahasa

  return (
    <div className="min-h-screen py-16 font-sans bg-white">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 animate-fade-in-up">
        
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold tracking-widest uppercase text-gycora">
            {t("sp_subtitle")}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {t("sp_title")}
          </h1>
          <p className="mt-4 text-gray-500">
            {t("sp_desc")}
          </p>
        </div>

        <div className="p-8 prose prose-lg text-gray-600 border border-gray-100 shadow-sm prose-emerald max-w-none bg-gray-50/50 rounded-3xl sm:p-12">
          
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            {t("sp_sec1_title")}
          </h3>
          <p>
            {t("sp_sec1_p1")}
            <strong>{t("sp_sec1_strong")}</strong>
            {t("sp_sec1_p2")}
          </p>

          <div className="my-8 border-t border-gray-200"></div>

          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            {t("sp_sec2_title")}
          </h3>
          <p>{t("sp_sec2_p1")}</p>
          <ul className="pl-5 space-y-2 list-disc">
            <li>
              <strong>{t("sp_sec2_li1_strong")}</strong>
              {t("sp_sec2_li1_text")}
            </li>
            <li>
              <strong>{t("sp_sec2_li2_strong")}</strong>
              {t("sp_sec2_li2_text")}
            </li>
          </ul>
          <p>{t("sp_sec2_p2")}</p>
          
          <div className="my-8 border-t border-gray-200"></div>

          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            {t("sp_sec3_title")}
          </h3>
          <p>
            {t("sp_sec3_p1")}
            <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">
              gycora.essence@gmail.com
            </a>
            {t("sp_sec3_p2")}
          </p>
          <p>
            {t("sp_sec3_p3")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            {t("sp_sec4_title")}
          </h3>
          <p>
            {t("sp_sec4_p1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            {t("sp_sec5_title")}
          </h3>
          <p>
            {t("sp_sec5_p1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            {t("sp_sec6_title")}
          </h3>
          <p>
            {t("sp_sec6_p1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
            {t("sp_sec7_title")}
          </h3>
          <p>
            {t("sp_sec7_p1")}
            <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">
              gycora.essence@gmail.com
            </a>.
          </p>

        </div>
      </div>
    </div>
  );
}