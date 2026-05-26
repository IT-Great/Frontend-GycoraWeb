// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="pt-16 pb-8 text-gray-900 bg-green-200 border-t border-green-300">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
//           {/* Column 1 */}
//           <div className="space-y-4">
//             <h3 className="mb-6 text-xl font-medium tracking-tight">Contact Us</h3>
//             <p className="text-sm font-medium cursor-pointer hover:text-gray-700">cs@gycora.essence.com</p>
//             <p className="text-sm font-medium underline cursor-pointer hover:text-gray-700">+62 895-1799-9768</p>
//             <div className="space-y-1 text-sm font-medium">
//               <p>Monday-Friday 9am-6pm ET</p>
//               <p>Saturday 9am-3pm ET</p>
//             </div>
//           </div>

//           {/* Column 2 */}
//           <div className="space-y-4">
//             <h3 className="mb-6 text-xl font-medium tracking-tight">Need Help?</h3>
//             <ul className="space-y-3">
//               <li><Link to="/help-center" className="text-sm font-medium hover:text-gray-700">Help Center</Link></li>
//               <li><Link to="/faq" className="text-sm font-medium hover:text-gray-700">FAQ</Link></li> {/* TAMBAHKAN INI */}
//               <li><Link to="/contact" className="text-sm font-medium hover:text-gray-700">Contact Us</Link></li>
//               <li><Link to="/returns/request" className="text-sm font-medium hover:text-gray-700">Request a Return</Link></li>
//               <li><Link to="/policies/refund" className="text-sm font-medium hover:text-gray-700">Refund Policy</Link></li>
//               <li><Link to="/policies/shipping" className="text-sm font-medium hover:text-gray-700">Shipping Policy</Link></li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div className="space-y-4">
//             <h3 className="mb-6 text-xl font-medium tracking-tight">Legal</h3>
//             <ul className="space-y-3">
//               <li><Link to="/legal/terms" className="text-sm font-medium hover:text-gray-700">Terms of Service</Link></li>
//               <li><Link to="/legal/privacy" className="text-sm font-medium hover:text-gray-700">Privacy Policy</Link></li>
//             </ul>
//           </div>

//           {/* Column 4 */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-bold tracking-tight">Sign Up for Our Newsletter</h3>
//             <form className="flex flex-col gap-3 sm:flex-row">
//               <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900 bg-white/50 focus:bg-white" required />
//               <button type="submit" className="bg-[#D4FF32] text-gray-900 font-bold px-6 py-2.5 rounded-full hover:bg-[#bce520] transition-colors text-sm shrink-0">Subscribe</button>
//             </form>
//           </div>
//         </div>

//         {/* Social & Copyright */}
//         <div className="flex flex-col items-center justify-center pt-8 space-y-6 border-t border-pink-300/50">
//           <p className="text-xs tracking-wide text-gray-500">&copy; {new Date().getFullYear()} Gycora. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../config/api"; // Sesuaikan path ini dengan letak file api.ts Anda

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   const handleSubscribe = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email) return;
//     setIsSubscribing(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/subscribe`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: data.message || "Terima kasih telah berlangganan newsletter kami.",
//           confirmButtonColor: "#059669",
//         });
//         setEmail(""); // Kosongkan input setelah berhasil
//       } else {
//         // Tangani error dari backend (misal: email tidak valid, atau sudah subscribe)
//         Swal.fire({
//           icon: "warning",
//           title: "Pemberitahuan",
//           text: data.message || data.errors?.email?.[0] || "Gagal berlangganan. Periksa kembali email Anda.",
//           confirmButtonColor: "#d33",
//         });
//       }
//     } catch (error) {
//       console.error("Subscribe error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Koneksi Gagal",
//         text: "Terjadi kesalahan saat menghubungi server.",
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <footer className="pt-16 pb-8 text-gray-900 bg-green-500 border-t border-green-600">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
          
//           {/* Column 1 */}
//           <div className="space-y-4">
//             <h3 className="mb-6 text-xl font-medium tracking-tight">Contact Us</h3>
//             <p className="text-sm font-medium cursor-pointer hover:text-gray-700">cs@gycora.essence.com</p>
//             <p className="text-sm font-medium underline cursor-pointer hover:text-gray-700">+62 895-1799-9768</p>
//             <div className="space-y-1 text-sm font-medium">
//               <p>Monday-Friday 9am-6pm ET</p>
//               <p>Saturday 9am-3pm ET</p>
//             </div>
//           </div>

//           {/* Column 2 */}
//           <div className="space-y-4">
//             <h3 className="mb-6 text-xl font-medium tracking-tight">Need Help?</h3>
//             <ul className="space-y-3">
//               <li><Link to="/help-center" className="text-sm font-medium hover:text-gray-700">Help Center</Link></li>
//               <li><Link to="pages/faq" className="text-sm font-medium hover:text-gray-700">FAQ</Link></li>
//               <li><Link to="pages/contact-us" className="text-sm font-medium hover:text-gray-700">Contact Us</Link></li>
//               <li><Link to="/returns/request" className="text-sm font-medium hover:text-gray-700">Request a Return</Link></li>
//               <li><Link to="/policies/refund" className="text-sm font-medium hover:text-gray-700">Refund Policy</Link></li>
//               <li><Link to="/policies/shipping" className="text-sm font-medium hover:text-gray-700">Shipping Policy</Link></li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div className="space-y-4">
//             <h3 className="mb-6 text-xl font-medium tracking-tight">Legal</h3>
//             <ul className="space-y-3">
//               <li><Link to="/legal/terms" className="text-sm font-medium hover:text-gray-700">Terms of Service</Link></li>
//               <li><Link to="/legal/privacy" className="text-sm font-medium hover:text-gray-700">Privacy Policy</Link></li>
//             </ul>
//           </div>

//           {/* Column 4 */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-bold tracking-tight">Sign Up for Our Newsletter</h3>
//             <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
//               <input 
//                 type="email" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email" 
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900 bg-white/50 focus:bg-white transition-all disabled:opacity-50" 
//                 required 
//                 disabled={isSubscribing}
//               />
//               <button 
//                 type="submit" 
//                 disabled={isSubscribing}
//                 className="bg-[#D4FF32] text-gray-900 font-bold px-6 py-2.5 rounded-full hover:bg-[#bce520] transition-colors text-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px]"
//               >
//                 {isSubscribing ? (
//                   <div className="w-5 h-5 border-2 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
//                 ) : (
//                   "Subscribe"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Social & Copyright */}
//         <div className="flex flex-col items-center justify-center pt-8 space-y-6 border-t border-pink-300/50">
//           <p className="text-xs tracking-wide text-gray-500">&copy; {new Date().getFullYear()} Gycora. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../config/api"; 
import { useLanguage } from "../context/LanguageContext"; // [BARU] Import Context Bahasa

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // [BARU] Ambil bahasa saat ini
  const { lang } = useLanguage(); 

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    setIsSubscribing(true);

    try {
      const res = await fetch(`${BASE_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: data.message || "Terima kasih telah berlangganan newsletter kami.",
          confirmButtonColor: "#059669",
        });
        setEmail(""); 
      } else {
        Swal.fire({
          icon: "warning",
          title: "Pemberitahuan",
          text: data.message || data.errors?.email?.[0] || "Gagal berlangganan. Periksa kembali email Anda.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      Swal.fire({
        icon: "error",
        title: "Koneksi Gagal",
        text: "Terjadi kesalahan saat menghubungi server.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="pt-16 pb-8 text-gray-900 bg-green-500 border-t border-green-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-medium tracking-tight">Contact Us</h3>
            <p className="text-sm font-medium cursor-pointer hover:text-gray-700">cs@gycora.com</p>
            <p className="text-sm font-medium underline cursor-pointer hover:text-gray-700">+62 895-1799-9768</p>
            <div className="space-y-1 text-sm font-medium">
              <p>Monday-Friday 9am-6pm ET</p>
              <p>Saturday 9am-3pm ET</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-medium tracking-tight">Need Help?</h3>
            <ul className="space-y-3">
              {/* [PERBAIKAN] Tambahkan prefix `/${lang}` di setiap Link */}
              <li><Link to={`/${lang}/help-center`} className="text-sm font-medium hover:text-gray-700">Help Center</Link></li>
              <li><Link to={`/${lang}/faq`} className="text-sm font-medium hover:text-gray-700">FAQ</Link></li>
              <li><Link to={`/${lang}/contact`} className="text-sm font-medium hover:text-gray-700">Contact Us</Link></li>
              <li><Link to={`/${lang}/returns/request`} className="text-sm font-medium hover:text-gray-700">Request a Return</Link></li>
              <li><Link to={`/${lang}/policies/refund`} className="text-sm font-medium hover:text-gray-700">Refund Policy</Link></li>
              <li><Link to={`/${lang}/policies/shipping`} className="text-sm font-medium hover:text-gray-700">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-medium tracking-tight">Legal</h3>
            <ul className="space-y-3">
              {/* [PERBAIKAN] Tambahkan prefix `/${lang}` di setiap Link */}
              <li><Link to={`/${lang}/legal/terms`} className="text-sm font-medium hover:text-gray-700">Terms of Service</Link></li>
              <li><Link to={`/${lang}/legal/privacy`} className="text-sm font-medium hover:text-gray-700">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Sign Up for Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-900 bg-white/50 focus:bg-white transition-all disabled:opacity-50" 
                required 
                disabled={isSubscribing}
              />
              <button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-[#D4FF32] text-gray-900 font-bold px-6 py-2.5 rounded-full hover:bg-[#bce520] transition-colors text-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px]"
              >
                {isSubscribing ? (
                  <div className="w-5 h-5 border-2 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col items-center justify-center pt-8 space-y-6 border-t border-green-700/30">
          <p className="text-xs tracking-wide text-gray-500">&copy; {new Date().getFullYear()} Gycora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}