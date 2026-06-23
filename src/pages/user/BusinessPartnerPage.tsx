// import React, { useState, FormEvent } from 'react';
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

// 1. Definisikan Tipe Data untuk Form (TypeScript)
interface PartnerFormData {
  business_name: string;
  sales_platform: string;
  monthly_capacity: string;
  additional_notes: string;
}

const BusinessPartnerPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<PartnerFormData>({
    business_name: "",
    sales_platform: "",
    monthly_capacity: "",
    additional_notes: "",
  });

  // URL API Backend Anda (Sesuaikan dengan config Anda)
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  // 2. Fungsi Penanganan Perubahan Input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Fungsi Pengiriman Form
  //   const handleSubmit = async (e: FormEvent) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Dibutuhkan",
        text: "Silakan login terlebih dahulu untuk mendaftar sebagai Business Partner.",
        confirmButtonColor: "#000",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/reseller/apply`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        text:
          response.data.message ||
          "Tim kami akan segera meninjau aplikasi Anda.",
        confirmButtonColor: "#000",
      });

      // Reset form setelah berhasil
      setFormData({
        business_name: "",
        sales_platform: "",
        monthly_capacity: "",
        additional_notes: "",
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text:
          err.response?.data?.message ||
          "Terjadi kesalahan pada sistem. Coba lagi nanti.",
        confirmButtonColor: "#000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 text-white bg-black lg:py-32">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <h1 className="mb-6 font-serif text-4xl tracking-widest uppercase md:text-6xl">
            Gycora Business Partner
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-sm leading-relaxed text-gray-300 md:text-base">
            Tingkatkan skala bisnis Anda bersama kami. Jadilah bagian dari
            jaringan eksklusif Gycora dan nikmati berbagai kemudahan serta
            keuntungan maksimal untuk pertumbuhan toko Anda.
          </p>
          <a
            href="#join-form"
            className="inline-block px-8 py-4 text-xs font-bold tracking-widest text-black uppercase transition-colors bg-white rounded-full hover:bg-gray-200"
          >
            Daftar Sekarang
          </a>
        </div>
      </section>

      {/* --- BENEFIT SECTION --- */}
      <section className="py-16 bg-white md:py-24">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-bold tracking-widest text-gray-900 uppercase">
              Keuntungan Kemitraan
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 bg-black"></div>
          </div>

          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            {/* Benefit 1 */}
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
                Harga Grosir Spesial
              </h3>
              <p className="text-xs leading-relaxed text-gray-500">
                Dapatkan margin keuntungan maksimal dengan akses langsung ke
                harga wholesale eksklusif khusus Business Partner.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
                Aset Visual Premium
              </h3>
              <p className="text-xs leading-relaxed text-gray-500">
                Akses gratis ke katalog foto dan video resolusi tinggi tanpa
                watermark untuk kebutuhan promosi toko Anda.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center mx-auto mb-6 text-white bg-black rounded-full w-14 h-14">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
                Prioritas Stok
              </h3>
              <p className="text-xs leading-relaxed text-gray-500">
                Prioritas alokasi produk unggulan dan koleksi terbaru sebelum
                dirilis untuk pelanggan retail biasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section id="join-form" className="py-20 bg-gray-50">
        <div className="max-w-3xl px-6 mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100">
            <div className="mb-10 text-center">
              <h2 className="mb-2 font-serif text-2xl tracking-tight text-gray-900">
                Formulir Pengajuan Kemitraan
              </h2>
              <p className="text-sm text-gray-500">
                Lengkapi data bisnis Anda di bawah ini. Tim kami akan melakukan
                peninjauan dalam waktu 1x24 jam kerja.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nama Bisnis */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                    Nama Toko / Bisnis <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Gycora Official Store"
                    className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Platform Penjualan */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                    Platform Penjualan Utama{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sales_platform"
                    value={formData.sales_platform}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                  >
                    <option value="" disabled>
                      Pilih Platform
                    </option>
                    <option value="Shopee">Shopee</option>
                    <option value="Tokopedia">Tokopedia</option>
                    <option value="Tiktok Shop">TikTok Shop</option>
                    <option value="Instagram / WhatsApp">
                      Instagram / WhatsApp
                    </option>
                    <option value="Toko Offline / Fisik">
                      Toko Offline / Fisik
                    </option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Kapasitas Order */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Estimasi Pengambilan per Bulan{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="monthly_capacity"
                  value={formData.monthly_capacity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="" disabled>
                    Pilih Estimasi Order
                  </option>
                  <option value="10 - 50 Pcs">10 - 50 Pcs</option>
                  <option value="51 - 100 Pcs">51 - 100 Pcs</option>
                  <option value="101 - 500 Pcs">101 - 500 Pcs</option>
                  <option value="> 500 Pcs">more than 500 Pcs</option>
                </select>
              </div>

              {/* Catatan Tambahan */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Catatan Tambahan / Link Toko (Opsional)
                </label>
                <textarea
                  name="additional_notes"
                  value={formData.additional_notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ceritakan sedikit tentang bisnis Anda atau sertakan link toko Anda agar kami dapat meninjaunya lebih cepat."
                  className="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                ></textarea>
              </div>

              {/* Tombol Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full gap-3 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black shadow-lg hover:bg-gray-800 disabled:bg-gray-400 rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
                      Memproses...
                    </>
                  ) : (
                    "Kirim Pengajuan Kemitraan"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPartnerPage;
