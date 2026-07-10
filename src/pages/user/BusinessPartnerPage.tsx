// // import React, { useState, FormEvent } from 'react'

// export default BusinessPartnerPage;

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";
import { useLanguage } from "../../context/LanguageContext"; 

import bgPartner from "../../assets/gycora_business_partner_bg.png";

interface PartnerFormData {
  business_name: string;
  sales_platform: string;
  monthly_capacity: string;
  additional_notes: string;
}

const BusinessPartnerPage: React.FC = () => {
  const { t } = useLanguage(); // [BARU] Inisiasi t()
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState<PartnerFormData>({
    business_name: "",
    sales_platform: "",
    monthly_capacity: "",
    additional_notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");

    if (!token) {
      setIsModalOpen(false);
      Swal.fire({
        icon: "warning",
        title: t('alert_login_title'),
        text: t('alert_login_desc'),
        confirmButtonColor: "#000",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/reseller/apply`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: t('alert_success_title'),
        text: response.data.message || t('alert_success_desc'),
        confirmButtonColor: "#000",
      });

      setFormData({
        business_name: "",
        sales_platform: "",
        monthly_capacity: "",
        additional_notes: "",
      });
      setIsModalOpen(false);

    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Swal.fire({
        icon: "error",
        title: t('alert_error_title'),
        text: err.response?.data?.message || t('alert_error_desc'),
        confirmButtonColor: "#000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DATA DIPINDAH KE DALAM KOMPONEN AGAR BISA DITRANSLASI ---
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: t('step_1_title'),
      desc: t('step_1_desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: t('step_2_title'),
      desc: t('step_2_desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      title: t('step_3_title'),
      desc: t('step_3_desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: t('step_4_title'),
      desc: t('step_4_desc'),
    },
  ];

  const faqs = [
    {
      question: t('faq_1_q'),
      answer: t('faq_1_a')
    },
    {
      question: t('faq_2_q'),
      answer: t('faq_2_a')
    },
    {
      question: t('faq_3_q'),
      answer: t('faq_3_a')
    }
  ];

  const feedbacks = [
    {
      name: t('feedback_1_name'),
      platform: t('feedback_1_platform'),
      comment: t('feedback_1_comment'),
    },
    {
      name: t('feedback_2_name'),
      platform: t('feedback_2_platform'),
      comment: t('feedback_2_comment'),
    },
    {
      name: t('feedback_3_name'),
      platform: t('feedback_3_platform'),
      comment: t('feedback_3_comment'),
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#FAFAFA] animate-fade-in">
      {/* --- HERO SECTION --- */}
      <section className="relative flex items-center justify-center px-4 py-32 overflow-hidden bg-black md:py-40">
        <div 
          className="absolute inset-0 bg-center bg-cover opacity-40"
          style={{ backgroundImage: `url(${bgPartner})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl text-center">
          <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm">
            {t('b2b_label')}
          </span>
          <h1 className="mb-6 font-serif text-4xl font-normal leading-tight text-white md:text-6xl">
            {t('hero_title_1')} <span className="italic text-gray-300">{t('hero_title_2')}</span> {t('hero_title_3')}
          </h1>
          <p className="max-w-xl mx-auto mb-10 text-sm leading-relaxed text-gray-400 md:text-base">
            {t('hero_desc_business')}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition-all duration-500 bg-white rounded-none hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {t('btn_register')}
          </button>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
            {t('step_title')}
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black">
                {step.icon}
              </div>
              <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-4xl px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
              {t('faq_title')}
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
                >
                  <span className="text-sm font-bold text-gray-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-[500px] opacity-100 p-6 bg-white' : 'max-h-0 opacity-0 px-6 py-0'}`}
                >
                  <p className="text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL / FEEDBACK SECTION --- */}
      <section className="px-6 py-24 mx-auto border-t border-gray-200 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
            {t('feedback_title')}
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {feedbacks.map((fb, index) => (
            <div key={index} className="flex flex-col p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl">
              <div className="flex mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="flex-grow mb-6 text-sm italic leading-relaxed text-gray-600">
                "{fb.comment}"
              </p>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{fb.name}</h4>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">{fb.platform}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BENEFIT SECTION --- */}
      <section className="py-24 text-white bg-gray-900 border-t border-gray-800">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-normal md:text-4xl">
              {t('benefit_title_business')}
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-6 bg-white/50"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">{t('benefit_1_title')}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {t('benefit_1_desc')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">{t('benefit_2_title')}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {t('benefit_2_desc')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-widest uppercase">{t('benefit_3_title')}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {t('benefit_3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 👇 MODAL FORM SECTION 👇 */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl rounded-3xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
              <div>
                <h2 className="font-serif text-xl tracking-tight text-gray-900">
                  {t('modal_title')}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto md:p-8 custom-scrollbar">
              <p className="p-3 mb-6 text-sm text-center text-gray-500 border border-gray-100 rounded-lg bg-gray-50">
                {t('modal_desc')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                      {t('label_shop_name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      required
                      placeholder={t('placeholder_shop_name')}
                      className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                      {t('label_platform')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sales_platform"
                      value={formData.sales_platform}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                    >
                      <option value="" disabled>{t('opt_select_platform')}</option>
                      <option value="Shopee">Shopee</option>
                      <option value="Tokopedia">Tokopedia</option>
                      <option value="Tiktok Shop">TikTok Shop</option>
                      <option value="Instagram / WhatsApp">Instagram / WhatsApp</option>
                      <option value="Toko Offline / Fisik">{t('opt_offline')}</option>
                      <option value="Lainnya">{t('opt_other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                    {t('label_capacity')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="monthly_capacity"
                    value={formData.monthly_capacity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                  >
                    <option value="" disabled>{t('opt_select_capacity')}</option>
                    <option value="10 - 50 Pcs">10 - 50 Pcs</option>
                    <option value="51 - 100 Pcs">51 - 100 Pcs</option>
                    <option value="101 - 500 Pcs">101 - 500 Pcs</option>
                    <option value="> 500 Pcs">{t('opt_more_than')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                    {t('label_notes')}
                  </label>
                  <textarea
                    name="additional_notes"
                    value={formData.additional_notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('placeholder_notes')}
                    className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full gap-3 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black shadow-lg hover:bg-gray-800 disabled:bg-gray-400 rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
                        {t('btn_processing_business')}
                      </>
                    ) : (
                      t('btn_submit')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessPartnerPage;
