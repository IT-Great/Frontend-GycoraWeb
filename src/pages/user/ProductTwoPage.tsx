import { useEffect } from "react";
import { Link } from "react-router-dom";
// Gunakan placeholder atau gambar spesifik jika tersedia
import productImage from "/landing_page_images/eco_serenity_scalp.jpg";

export default function ProductTwoPage() {
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
              onError={(e) => { e.currentTarget.src = "/landing_page_images/hero_slide_2.jpg" }} 
              alt="Eco Serenity Scalp Care" 
              className="object-contain w-full max-w-md mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col w-full space-y-6 lg:w-1/2">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Eco Serenity Scalp Care
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-[#006A4E] leading-snug">
              Scalp Massager untuk Kulit Kepala Lebih Bersih, Nyaman, dan Sehat ✨
            </h2>

            <div className="prose prose-lg text-gray-600">
              <p>
                Kenalin <strong>Eco Serenity Scalp Care</strong>, scalp massager inovatif dari Gycora yang dirancang untuk membantu membersihkan kulit kepala sekaligus memberikan sensasi pijatan yang menenangkan setiap hari.
              </p>
              <p>
                Dengan desain fleksibel dan 196 teeth dengan ukuran berbeda, Eco Serenity mampu menjangkau area kulit kepala secara lebih menyeluruh untuk membantu mengangkat kotoran, minyak berlebih, dan penumpukan pada kulit kepala tanpa rasa kasar atau iritasi.
              </p>
              <p>
                Bukan cuma nyaman digunakan saat keramas, tapi juga cocok untuk relaksasi di tengah aktivitas yang padat.
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
            Kenapa Banyak yang Suka Eco Serenity Scalp Care?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Triple-Fold Structure Design
              </h4>
              <p className="text-gray-600">
                Desain fleksibel yang mengikuti bentuk kepala untuk memberikan pengalaman pijatan yang lebih nyaman dan maksimal di setiap area kulit kepala.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> 196 Flexible Teeth
              </h4>
              <p className="text-gray-600">
                Dilengkapi 196 teeth dengan tinggi berbeda untuk membantu membersihkan kulit kepala lebih merata sekaligus memberikan sensasi pijatan yang lembut dan relaxing.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Membantu Membersihkan Kulit Kepala Lebih Optimal
              </h4>
              <p className="text-gray-600">
                Membantu mengangkat minyak berlebih, kotoran, dan penumpukan pada kulit kepala agar terasa lebih bersih dan segar setelah keramas.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Relaxing Scalp Massage
              </h4>
              <p className="text-gray-600">
                Pijatan lembut membantu memberikan efek relaksasi sekaligus membantu melancarkan sirkulasi pada kulit kepala.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Anti-Microbial Silver Ion
              </h4>
              <p className="text-gray-600">
                Dilengkapi teknologi ion perak antimikroba untuk membantu menjaga kebersihan alat dan mengurangi risiko pertumbuhan bakteri.
              </p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Ergonomic & Comfortable Grip
              </h4>
              <p className="text-gray-600">
                Pegangan ergonomis yang nyaman digenggam dan mudah digunakan dalam berbagai posisi.
              </p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Multifungsi untuk Rambut Kering & Basah
              </h4>
              <div className="space-y-2 text-gray-600">
                <p><strong>Saat Rambut Kering:</strong> Cocok digunakan untuk pijatan relaksasi dan membantu kulit kepala terasa lebih nyaman setelah aktivitas seharian.</p>
                <p><strong>Saat Keramas:</strong> Membantu membersihkan kulit kepala lebih maksimal sekaligus membantu penyerapan produk perawatan rambut.</p>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span>✨</span> Eco-Friendly Material
              </h4>
              <p className="text-gray-600">
                Terbuat dari material yang dapat didaur ulang dan lebih ramah lingkungan untuk mendukung gaya hidup yang lebih sustainable.
              </p>
            </div>

          </div>
        </div>

        {/* Cocok Digunakan Untuk & Detail Produk */}
        <div className="grid grid-cols-1 gap-12 p-10 mt-20 md:grid-cols-2 bg-emerald-50 rounded-3xl lg:p-16">
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Cocok Digunakan Untuk:</h3>
            <ul className="pl-4 space-y-3 text-gray-700 list-disc list-inside">
              <li>Kulit kepala mudah berminyak</li>
              <li>Kulit kepala dengan penumpukan kotoran</li>
              <li>Pengalaman keramas yang lebih nyaman</li>
              <li>Relaksasi ringan sehari-hari</li>
              <li>Semua jenis rambut</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Detail Produk</h3>
            <ul className="pl-4 space-y-3 text-gray-700 list-disc list-inside">
              <li>Material : Recyclable Material</li>
              <li>Technology : Anti-Microbial Silver Ion</li>
              <li>Heat Resistance : Up to 80°C</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}