// import { Link } from "react-router-dom";

// export default function PrivacyPolicy() {
//   return (
//     <div className="min-h-screen py-16 font-sans bg-gray-50">
//       <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        
//         {/* Breadcrumb Navigation */}
//         <nav className="flex items-center gap-2 mb-8 text-sm text-gray-500 animate-fade-in-up">
//           <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
//           <span>/</span>
//           <span className="text-gray-500">Legal</span>
//           <span>/</span>
//           <span className="font-medium text-gray-900">Privacy Policy</span>
//         </nav>

//         {/* Konten Utama */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm md:p-12 rounded-3xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
//           <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Privacy Policy</h1>
//           <p className="pb-6 mb-10 text-sm text-gray-500 border-b border-gray-100">
//             Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//           </p>

//           <div className="space-y-10 leading-relaxed prose text-gray-600 prose-emerald max-w-none">
            
//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">1. Introduction</h2>
//               <p>
//                 <strong>Gycora Essence</strong> respects your privacy and is committed to protecting the personal data of our customers in compliance with Indonesia's Personal Data Protection Law (PDPL). This Privacy Policy explains how we collect, use, share, and protect your personal data when you visit our website.
//               </p>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">2. Data Collection</h2>
//               <p className="mb-3">We may collect the following personal data:</p>
//               <ul className="pl-5 space-y-2 text-gray-600 list-disc">
//                 <li><strong>Personal Information:</strong> name, email address, phone number, postal address, payment details, and other information provided during registration, order processing, or customer service inquiries.</li>
//                 <li><strong>Device and Usage Information:</strong> IP address, browser type, device identifiers, and other technical information through cookies and similar tracking technologies.</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">3. Purpose of Data Collection</h2>
//               <p className="mb-3">We use your data for purposes permitted by PDPL, including:</p>
//               <ul className="pl-5 space-y-2 text-gray-600 list-disc">
//                 <li>Processing and fulfilling your orders.</li>
//                 <li>Improving website functionality and customer experience.</li>
//                 <li>Sending order updates, marketing offers (with your consent), and responding to your inquiries.</li>
//                 <li>Complying with legal and regulatory obligations.</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">4. Legal Basis for Processing</h2>
//               <p>
//                 We only collect and process your data where permitted by law, such as for order fulfillment, based on your consent, or to comply with legal requirements.
//               </p>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">5. Sharing of Personal Data</h2>
//               <p className="mb-3">Your personal data may be shared with trusted third parties, including:</p>
//               <ul className="pl-5 space-y-2 text-gray-600 list-disc">
//                 <li><strong>Service Providers:</strong> such as payment processors, delivery services, and email marketing platforms to facilitate services on our behalf.</li>
//                 <li><strong>Legal Obligations:</strong> if required by Indonesian law or by lawful government request.</li>
//               </ul>
//               <p className="mt-4">
//                 All third parties receiving data must handle it with the same level of security and confidentiality as required under PDPL.
//               </p>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">6. Data Security</h2>
//               <p>
//                 We implement reasonable technical and organizational measures to protect your data from unauthorized access, alteration, or disclosure. Despite our efforts, no system is fully secure, so please also take precautions when sharing information online.
//               </p>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">7. Data Retention</h2>
//               <p>
//                 We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Upon reaching the end of its retention period, we will securely delete or anonymize your data.
//               </p>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">8. Your Rights Under Indonesian Law</h2>
//               <p className="mb-3">Under PDPL, you have the right to:</p>
//               <ul className="pl-5 space-y-2 text-gray-600 list-disc">
//                 <li>Access, update, or correct your personal data.</li>
//                 <li>Withdraw your consent at any time.</li>
//                 <li>Request deletion of your data if it is no longer necessary for the purpose it was collected.</li>
//               </ul>
//               <p className="mt-4">
//                 To exercise these rights, please contact us at <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">gycora.essence@gmail.com</a>.
//               </p>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">9. Cookies and Tracking</h2>
//               <p>
//                 We use cookies to enhance your experience on our website. You may adjust your browser settings to disable cookies, but please note this may limit your access to certain features.
//               </p>
//             </section>

//             <section>
//               <h2 className="mb-4 text-xl font-bold text-gray-900">10. Changes to Our Privacy Policy</h2>
//               <p>
//                 We may update our Privacy Policy in compliance with PDPL. We will notify you of any significant changes through our website or by email.
//               </p>
//             </section>

//             <section className="p-6 mt-12 border bg-emerald-50 border-emerald-100 rounded-2xl">
//               <h2 className="mb-4 text-xl font-bold text-gray-900">11. Contact Us</h2>
//               <p className="mb-4">
//                 If you have questions about this Privacy Policy or wish to exercise your rights under PDPL, please contact us at:
//               </p>
//               <div className="space-y-2 text-sm font-medium text-emerald-900">
//                 <p><strong>Gycora Essence</strong></p>
//                 <p>Email: <a href="mailto:gycora.essence@gmail.com" className="hover:underline">gycora.essence@gmail.com</a></p>
//                 <p>Address: Indonesia, Surabaya, East Java 60226, Indonesia</p>
//               </div>
//             </section>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext"; // [BARU] Import Context Bahasa

export default function PrivacyPolicy() {
  const { t, lang } = useLanguage(); // Inisialisasi hook bahasa

  return (
    <div className="min-h-screen py-16 font-sans bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 mb-8 text-sm text-gray-500 animate-fade-in-up">
          <Link to={`/${lang}`} className="transition-colors hover:text-gycora">
            {t("pp_nav_home")}
          </Link>
          <span>/</span>
          <span className="text-gray-500">{t("pp_nav_legal")}</span>
          <span>/</span>
          <span className="font-medium text-gray-900">{t("pp_title")}</span>
        </nav>

        {/* Konten Utama */}
        <div className="p-8 bg-white border border-gray-100 shadow-sm md:p-12 rounded-3xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            {t("pp_title")}
          </h1>
          <p className="pb-6 mb-10 text-sm text-gray-500 border-b border-gray-100">
            {t("pp_last_updated")} {new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-10 leading-relaxed prose text-gray-600 prose-emerald max-w-none">
            
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s1_title")}</h2>
              <p>
                <strong>Gycora Essence</strong>{t("pp_s1_p1")}
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s2_title")}</h2>
              <p className="mb-3">{t("pp_s2_p1")}</p>
              <ul className="pl-5 space-y-2 text-gray-600 list-disc">
                <li>
                  <strong>{t("pp_s2_l1_strong")}</strong>{t("pp_s2_l1_text")}
                </li>
                <li>
                  <strong>{t("pp_s2_l2_strong")}</strong>{t("pp_s2_l2_text")}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s3_title")}</h2>
              <p className="mb-3">{t("pp_s3_p1")}</p>
              <ul className="pl-5 space-y-2 text-gray-600 list-disc">
                <li>{t("pp_s3_l1")}</li>
                <li>{t("pp_s3_l2")}</li>
                <li>{t("pp_s3_l3")}</li>
                <li>{t("pp_s3_l4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s4_title")}</h2>
              <p>{t("pp_s4_p1")}</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s5_title")}</h2>
              <p className="mb-3">{t("pp_s5_p1")}</p>
              <ul className="pl-5 space-y-2 text-gray-600 list-disc">
                <li>
                  <strong>{t("pp_s5_l1_strong")}</strong>{t("pp_s5_l1_text")}
                </li>
                <li>
                  <strong>{t("pp_s5_l2_strong")}</strong>{t("pp_s5_l2_text")}
                </li>
              </ul>
              <p className="mt-4">{t("pp_s5_p2")}</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s6_title")}</h2>
              <p>{t("pp_s6_p1")}</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s7_title")}</h2>
              <p>{t("pp_s7_p1")}</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s8_title")}</h2>
              <p className="mb-3">{t("pp_s8_p1")}</p>
              <ul className="pl-5 space-y-2 text-gray-600 list-disc">
                <li>{t("pp_s8_l1")}</li>
                <li>{t("pp_s8_l2")}</li>
                <li>{t("pp_s8_l3")}</li>
              </ul>
              <p className="mt-4">
                {t("pp_s8_p2")}
                <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">
                  gycora.essence@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s9_title")}</h2>
              <p>{t("pp_s9_p1")}</p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s10_title")}</h2>
              <p>{t("pp_s10_p1")}</p>
            </section>

            <section className="p-6 mt-12 border bg-emerald-50 border-emerald-100 rounded-2xl">
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t("pp_s11_title")}</h2>
              <p className="mb-4">{t("pp_s11_p1")}</p>
              <div className="space-y-2 text-sm font-medium text-emerald-900">
                <p><strong>Gycora Essence</strong></p>
                <p>Email: <a href="mailto:gycora.essence@gmail.com" className="hover:underline">gycora.essence@gmail.com</a></p>
                <p>{t("pp_s11_address")}</p>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}