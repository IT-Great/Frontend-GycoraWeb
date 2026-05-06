import { useEffect } from "react";
import { Link } from "react-router-dom";
// Gunakan placeholder atau gambar spesifik jika tersedia di public/landing_page_images
import productImage from "/landing_page_images/ethereal_glow_brush.jpg"; 

export default function ProductOnePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 font-sans bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Detail Header & Gambar */}
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-20">
          <div className="w-full lg:w-1/2 flex justify-center bg-[#F9FDFB] rounded-3xl p-8 shadow-sm border border-gray-100">
            {/* Fallback image handle jika gambar spesifik belum ada */}
            <img 
              src={productImage} 
              onError={(e) => { e.currentTarget.src = "/landing_page_images/hero_slide_1.jpg" }} 
              alt="Ethereal Glow Brush" 
              className="object-contain w-full max-w-md mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col w-full space-y-6 lg:w-1/2">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ethereal Glow Brush Pink/Black
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-[#006A4E] leading-snug">
              Rambut Lebih Rapi, Halus, dan Mudah Diatur dalam Sekali Sisir ✨
            </h2>

            <div className="prose prose-lg text-gray-600">
              <p>
                Kenalin <strong>Ethereal Glow Brush</strong>, hairbrush anti-static dengan teknologi konduktif dan molekul karbon yang dirancang untuk membantu rambut terasa lebih halus, rapi, dan tampak berkilau setiap hari.
              </p>
              <p>
                Dengan desain fleksibel yang mengikuti kontur kepala serta bulu sisir yang lembut di kulit kepala, pengalaman menyisir jadi terasa lebih nyaman tanpa rasa sakit atau tarikan berlebih.
              </p>
              <p>
                Cocok untuk kamu yang ingin rambut tetap terlihat rapi di tengah aktivitas harian — tanpa perlu effort styling yang ribet.
              </p>
            </div>

            <div className="pt-6">
              <Link
                to="/products"
                className="inline-block w-full sm:w-auto text-center px-10 py-4 text-base font-bold text-white transition-all rounded-full bg-[#006A4E] hover:bg-emerald-900 shadow-lg"
              >
                Lihat di Katalog
              </Link>
            </div>
          </div>
        </div>

        {/* Kenapa Banyak yang Suka Section */}
        <div className="pt-16 mt-24 border-t border-gray-100">
          <h3 className="mb-10 text-2xl font-extrabold text-center text-gray-900 sm:text-3xl">
            Kenapa Banyak yang Suka Ethereal Glow Brush?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Anti-Static Technology
              </h4>
              <p className="text-gray-600">
                Teknologi anti-static membantu mengurangi rambut mengembang, kusut, dan sulit diatur, sehingga rambut terasa lebih halus dan mudah disisir.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Membantu Rambut Tampak Lebih Halus & Berkilau
              </h4>
              <p className="text-gray-600">
                Setiap sapuan sisir membantu merapikan rambut sekaligus meningkatkan tampilan kilau alami agar rambut terlihat lebih sehat dan effortless glowing.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Flexible & Soft Bristles
              </h4>
              <p className="text-gray-600">
                Dilengkapi bulu sisir fleksibel yang lembut di kulit kepala untuk membantu mengurangi gesekan, rasa sakit, dan risiko rambut patah saat menyisir.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Spiral Comb Design
              </h4>
              <p className="text-gray-600">
                Desain spiral mengikuti bentuk kepala dengan lebih nyaman, memberikan pengalaman menyisir yang terasa ringan dan nyaman digunakan setiap hari.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Eco-Friendly Material
              </h4>
              <p className="text-gray-600">
                Terbuat dari material Polylactic Acid Fiber yang lebih ramah lingkungan dengan emisi karbon lebih rendah dibandingkan plastik biasa.
              </p>
            </div>
          </div>
        </div>

        {/* Cocok Digunakan Untuk & Detail Produk */}
        <div className="grid grid-cols-1 gap-12 p-10 mt-20 md:grid-cols-2 bg-emerald-50 rounded-3xl lg:p-16">
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Cocok Digunakan Untuk:</h3>
            <ul className="pl-4 space-y-3 text-gray-700 list-disc list-inside">
              <li>Rambut mudah kusut & mengembang</li>
              <li>Rambut yang susah diatur setelah aktivitas</li>
              <li>Penggunaan sehari-hari</li>
              <li>Semua jenis rambut</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Detail Produk</h3>
            <ul className="pl-4 space-y-3 text-gray-700 list-disc list-inside">
              <li>Material : Carbon Molecule + Polylactic Acid Fiber</li>
              <li>Size : 25 x 7 cm</li>
              <li>Include : Premium Soft Box</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}