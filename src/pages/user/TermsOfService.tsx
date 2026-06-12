import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function TermsOfService() {
  const { t } = useLanguage(); // Inisialisasi hook bahasa
  return (
    <div className="min-h-screen py-16 font-sans bg-white">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 animate-fade-in-up">
        
        {/* Header Dokumen */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold tracking-widest uppercase text-gycora">{t("legal_and_policies")}</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">{t("terms_of_service")}</h1>
          <p className="mt-4 text-gray-500">
            {t("last_updated")} {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Konten Utama */}
        <div className="p-8 prose prose-lg text-gray-600 border border-gray-100 shadow-sm prose-emerald max-w-none bg-gray-50/30 rounded-3xl sm:p-12">
          
          <h3 className="mb-4 text-2xl font-bold text-gray-900">{t("overview")}</h3>
          <p>
            {t("overview_1_1")}
          </p>
          <p>
            {t("overview_1_2")}
          </p>
          <p>
            {t("overview_1_3")}
          </p>
          <p>
            {t("overview_1_4")}
          </p>
          <p>
            {t("overview_1_5")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_1")}</h3>
          <p>
            {t("section_1_1")}
          </p>
          <p>
            {t("section_1_2")}
          </p>
          <p>
            {t("section_1_3")}
            <br />
            {t("section_1_4")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_2")}</h3>
          <p>{t("section_2_1")}</p>
          <p>
            {t("section_2_2")}
          </p>
          <p>
            {t("section_2_3")}
          </p>
          <p>
            {t("section_2_4")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_3")}</h3>
          <p>
            {t("section_3_1")}
          </p>
          <p>
            {t("section_3_2")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_4")}</h3>
          <p>{t("section_4_1")}</p>
          <p>{t("section_4_2")}</p>
          <p>{t("section_4_3")}</p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_5")}</h3>
          <p>
            {t("section_5_1")} <Link to="/policies/refund" className="font-semibold text-gycora hover:underline">{t("section_5_2")}</Link>.
          </p>
          <p>
            {t("section_5_3")}
          </p>
          <p>
            {t("section_5_4")}
          </p>
          <p>
            {t("section_5_5")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_6")}</h3>
          <p>
            {t("section_6_1")}
          </p>
          <p>
            {t("section_6_2")}
          </p>
          <p>
            {t("for_more_details")} <Link to="/policies/refund" className="font-semibold text-gycora hover:underline">{t("refund_policy")}</Link>.
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_7")}</h3>
          <p>{t("section_7_1")}</p>
          <p>
            {t("section_7_2")}
          </p>
          <p>
            {t("section_7_3")}
          </p>
          <p>
            {t("section_7_4")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_8")}</h3>
          <p>{t("section_8_1")}</p>
          <p>
            {t("section_8_2")}
          </p>
          <p>
            {t("section_8_3")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_9")}</h3>
          <p>
            {t("section_9_1")}
          </p>
          <p>
            {t("section_9_2")}
          </p>
          <p>
            {t("section_9_3")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_10")}</h3>
          <p>
            {t("section_10_1")} <Link to="/legal/privacy" className="font-semibold text-gycora hover:underline">{t("privacy_policy")}</Link>.
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_11")}</h3>
          <p>
            {t("section_11_1")}
          </p>
          <p>
            {t("section_11_2")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_12")}</h3>
          <p>
            {t("section_12_1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_13")}</h3>
          <p>{t("section_13_1")}</p>
          <p>{t("section_13_2")}</p>
          <p>{t("section_13_3")}</p>
          <p>
            {t("section_13_4")}
          </p>
          <p>
            {t("section_13_5")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_14")}</h3>
          <p>
            {t("section_14_1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_15")}</h3>
          <p>
            {t("section_15_1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_16")}</h3>
          <p>
            {t("section_16_1")}
          </p>
          <p>
            {t("section_16_2")}
          </p>
          <p>
            {t("section_16_3")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_17")}</h3>
          <p>
            {t("section_17_1")}
          </p>
          <p>
            {t("section_17_2")}
          </p>
          <p>
            {t("section_17_3")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_18")}</h3>
          <p>
            {t("section_18_1")}
          </p>

          <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{t("section_19")}</h3>
          <p>
            {t("section_19_1")}
          </p>
          <p>
            {t("section_19_2")}
          </p>

          <div className="p-6 mt-12 border bg-emerald-50 border-emerald-100 rounded-2xl">
            <h3 className="mb-4 text-xl font-bold text-gray-900">{t("section_20")}</h3>
            <p className="mb-4 text-gray-700">{t("section_20_1")} <a href="mailto:gycora.essence@gmail.com" className="font-semibold text-gycora hover:underline">gycora.essence@gmail.com</a>.</p>
            <div className="space-y-2 text-sm font-medium text-emerald-900">
              <p><strong>{t("trade_name")}</strong> Gycora Essence</p>
              <p><strong>Whatsapp:</strong> <a href="https://wa.me/6282273736200" className="hover:underline" target="_blank" rel="noreferrer">082273736200</a></p>
              <p><strong>Email:</strong> <a href="mailto:gycora.essence@gmail.com" className="hover:underline">gycora.essence@gmail.com</a></p>
              <p><strong>{t("physical_address")}</strong> Surabaya, Jawa Timur 60226, Indonesia</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}