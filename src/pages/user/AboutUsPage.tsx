import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AboutUsPage() {
  const location = useLocation();

  // Efek untuk melompat (scroll) ke bagian tertentu berdasarkan hash di URL
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Timeout kecil memastikan render selesai sebelum scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen pb-24 font-sans bg-white">
      {/* HEADER SECTION */}
      <div className="bg-[#F4F9F6] py-24 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#006A4E] mb-6 tracking-tight">
            Tentang Gycora
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 md:text-xl">
            Kami percaya bahwa self-care bukan sekadar rutinitas, tapi bentuk perhatian kecil untuk diri sendiri di tengah aktivitas yang padat.
          </p>
          <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-gray-600 md:text-xl">
            Karena tampil rapi dan merasa nyaman dengan diri sendiri seharusnya bisa terasa lebih mudah, praktis, dan tetap bermakna.
          </p>
        </div>
      </div>

      <div className="max-w-4xl px-4 mx-auto mt-20 space-y-32 sm:px-6 lg:px-8">
        
        {/* WHO WE ARE */}
        <section className="scroll-mt-32" id="who-we-are">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">WHO WE ARE</h2>
          <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
            Beauty Essentials yang Dirancang untuk Kehidupan Sehari-Hari
          </h3>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p>
              Gycora menghadirkan produk perawatan rambut berbasis inovasi modern yang membantu rutinitas harian terasa lebih praktis dan nyaman.
            </p>
            <p>
              Mulai dari hairbrush anti-static hingga scalp care yang dirancang untuk penggunaan sehari-hari, setiap produk dibuat untuk membantu kamu tampil lebih rapi tanpa effort berlebih.
            </p>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="scroll-mt-32" id="our-story">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">OUR STORY</h2>
          <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
            Berawal dari Hal Sederhana: Keinginan untuk Membuat Self-Care Terasa Lebih Mudah
          </h3>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p>
              Di tengah aktivitas yang terus berjalan, kami sadar bahwa tidak semua orang punya banyak waktu untuk styling atau perawatan yang rumit.
            </p>
            <p>
              Tapi di saat yang sama, rasa percaya diri sering datang dari hal-hal kecil — seperti rambut yang terasa lebih rapi, nyaman, dan mudah diatur.
            </p>
            <p>
              Dari situlah Gycora lahir.
            </p>
            <p>
              Kami ingin menghadirkan produk yang bukan hanya terlihat baik, tetapi juga benar-benar membantu keseharian penggunanya.
            </p>
          </div>
        </section>

        {/* WHY GYCORA (OUR PURPOSE) */}
        <section className="scroll-mt-32" id="our-purpose">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">WHY GYCORA</h2>
          <h3 className="mb-10 text-3xl font-extrabold text-gray-900">Kenapa Gycora?</h3>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
                <span>✨</span> Practical Beauty
              </h4>
              <p className="text-gray-600">Produk yang dirancang untuk rutinitas harian yang cepat dan praktis.</p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
                <span>✨</span> Modern Innovation
              </h4>
              <p className="text-gray-600">Menggunakan teknologi modern untuk membantu rambut lebih mudah diatur dan nyaman digunakan setiap hari.</p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
                <span>✨</span> Thoughtfully Designed
              </h4>
              <p className="text-gray-600">Dibuat dengan desain yang nyaman digunakan sekaligus tetap estetis.</p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-900">
                <span>✨</span> More Conscious Choice
              </h4>
              <p className="text-gray-600">Menggunakan material yang lebih ramah lingkungan sebagai langkah kecil menuju perawatan yang lebih bertanggung jawab.</p>
            </div>
          </div>
        </section>

        {/* INNOVATION & SUSTAINABILITY */}
        <section className="scroll-mt-32" id="our-innovation">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">INNOVATION & SUSTAINABILITY</h2>
          <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
            Inovasi yang Tetap Peduli pada Lingkungan
          </h3>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p>
              Kami percaya bahwa inovasi tidak hanya soal hasil, tapi juga tentang bagaimana sebuah produk dibuat dengan lebih bijak.
            </p>
            <p>
              Karena itu, Gycora terus berupaya menghadirkan produk dengan material yang lebih ramah lingkungan dan desain yang dibuat untuk penggunaan jangka panjang.
            </p>
            <p>
              Langkah kecil yang kami percaya bisa membawa dampak lebih baik untuk masa depan.
            </p>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="p-10 bg-emerald-50 rounded-3xl lg:p-16 scroll-mt-32" id="vision-mission">
          <h2 className="mb-8 text-sm font-bold tracking-widest uppercase text-emerald-800">VISION & MISSION</h2>
          
          <div className="mb-12">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Visi Kami</h3>
            <p className="text-lg text-gray-700">
              Menjadi beauty brand modern yang menghadirkan produk praktis, inovatif, dan lebih mindful untuk mendukung rutinitas self-care sehari-hari.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Misi Kami</h3>
            <ul className="pl-4 space-y-3 text-lg text-gray-700 list-disc list-inside">
              <li>Menghadirkan produk yang nyaman dan efektif digunakan setiap hari</li>
              <li>Menggabungkan inovasi modern dengan desain yang thoughtful</li>
              <li>Mendukung pilihan perawatan yang lebih conscious dan berkelanjutan</li>
              <li>Membantu lebih banyak orang merasa nyaman dan percaya diri dengan dirinya sendiri</li>
            </ul>
          </div>
        </section>

        {/* CLOSING SECTION */}
        <section className="pt-10 text-center border-t border-gray-100">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">CLOSING SECTION</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#006A4E] mb-6">
            Self-Care yang Lebih Simpel, untuk Hari-Hari yang Lebih Nyaman
          </h3>
          <p className="mb-4 text-xl text-gray-600">
            Karena kami percaya, rasa percaya diri sering dimulai dari perhatian kecil untuk diri sendiri.
          </p>
          <p className="text-xl font-medium text-gray-900">
            Dan Gycora ingin menjadi bagian dari perjalanan itu 🤍
          </p>
        </section>

      </div>
    </div>
  );
}