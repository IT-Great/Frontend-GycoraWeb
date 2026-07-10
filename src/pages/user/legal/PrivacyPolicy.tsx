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