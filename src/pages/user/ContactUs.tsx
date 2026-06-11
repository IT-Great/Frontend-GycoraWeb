// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Mengganti useRouter dari Next.js
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function ContactUs() {
//   const navigate = useNavigate(); // Menggunakan useNavigate
//   const [user, setUser] = useState<any>(null);
//   const [description, setDescription] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Cek apakah user sudah login
//     const storedUser = localStorage.getItem("user_data");
//     if (!storedUser) {
//       Swal.fire({
//         icon: "info",
//         title: "Login Diperlukan",
//         text: "Silakan login terlebih dahulu untuk mengirim pesan ke layanan pelanggan kami.",
//       }).then(() => {
//         navigate("/login"); // Mengganti router.push
//       });
//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   }, [navigate]); // Menambahkan navigate ke dependency array

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!description.trim()) return;

//     setIsSubmitting(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       // Pastikan URL API sesuai dengan backend Anda (misalnya jika pindah ke Laravel menjadi port 8000)
//       const res = await fetch(`${BASE_URL}/api/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ description })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Terkirim!",
//           text: data.message,
//           confirmButtonColor: "#059669"
//         });
//         setDescription(""); // Kosongkan form setelah sukses
//       } else {
//         throw new Error(data.message || "Gagal mengirim pesan");
//       }
//     } catch (error: any) {
//       console.error("Gagal submit contact:", error); // Menghindari linter error "never used"
//       Swal.fire("Error", error.message || "Terjadi kesalahan pada server.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!user) return null; // Mencegah kedipan UI saat mengecek localStorage

//   return (
//     <div className="min-h-screen py-16 font-sans bg-gray-50">
//       <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="max-w-2xl mx-auto mb-16 text-center animate-fade-in-up">
//           <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">Get in Touch</h1>
//           <p className="text-lg text-gray-600">Punya pertanyaan seputar produk, pesanan, atau kolaborasi? Tim Gycora siap membantu Anda.</p>
//         </div>

//         <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl lg:flex-row animate-fade-in-up">
          
//           {/* Kolom Kiri: Informasi Kontak Perusahaan */}
//           <div className="flex flex-col justify-between p-10 text-white lg:w-1/3 bg-gradient-to-br from-gycora to-gycora-dark">
//             <div>
//               <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
//               <p className="mb-8 leading-relaxed text-emerald-50">
//                 Isi formulir di samping dan tim Customer Care kami akan merespons dalam waktu 1x24 jam kerja.
//               </p>
              
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                   <div>
//                     <p className="text-sm font-semibold text-emerald-100">Email</p>
//                     <p className="font-medium">gycora.essence@gmail.com</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                   <div>
//                     <p className="text-sm font-semibold text-emerald-100">Phone</p>
//                     <p className="font-medium">+62 895-1799-9768</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   <div>
//                     <p className="text-sm font-semibold text-emerald-100">Office</p>
//                     <p className="font-medium">Surabaya, East Java<br/>Indonesia</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Dekorasi Bulatan */}
//             <div className="relative mt-12">
//               <div className="absolute w-48 h-48 bg-white rounded-full -bottom-20 -right-20 opacity-10 blur-2xl"></div>
//             </div>
//           </div>

//           {/* Kolom Kanan: Form Contact */}
//           <div className="p-10 lg:w-2/3 md:p-12">
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 {/* Kolom Nama (Read Only) */}
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Lengkap</label>
//                   <div className="w-full p-3 font-medium text-gray-500 border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
//                     {user.first_name} {user.last_name}
//                   </div>
//                 </div>

//                 {/* Kolom Email (Read Only) */}
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
//                   <div className="w-full p-3 font-medium text-gray-500 truncate border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
//                     {user.email}
//                   </div>
//                 </div>
//               </div>

//               {/* Kolom Nomor Telepon (Read Only) */}
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Nomor Telepon</label>
//                 <div className="w-full p-3 font-medium text-gray-500 border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
//                   {user.phone ? user.phone : <span className="italic text-gray-400">Nomor telepon belum diatur di profil</span>}
//                 </div>
//               </div>

//               {/* Kolom Pesan (Bisa Diedit) */}
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Detail Pesan</label>
//                 <textarea 
//                   required
//                   rows={5}
//                   placeholder="Jelaskan kendala atau pertanyaan Anda secara detail di sini..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gycora outline-none resize-none transition-shadow"
//                 ></textarea>
//               </div>

//               <div className="flex justify-end pt-2">
//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className={`px-8 py-3.5 rounded-full font-bold text-white shadow-lg transition-all ${
//                     isSubmitting ? "bg-emerald-400 cursor-not-allowed" : "bg-gycora hover:bg-gycora-dark hover:-translate-y-0.5"
//                   }`}
//                 >
//                   {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
//                 </button>
//               </div>

//             </form>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function ContactUs() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<any>(null);
//   const [description, setDescription] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State untuk Modal Riwayat
//   const [showHistoryModal, setShowHistoryModal] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);
//   const [histories, setHistories] = useState<any[]>([]);

//   useEffect(() => {
//     // Cek apakah user sudah login
//     const storedUser = localStorage.getItem("user_data");
//     if (!storedUser) {
//       Swal.fire({
//         icon: "info",
//         title: "Login Diperlukan",
//         text: "Silakan login terlebih dahulu untuk mengirim pesan ke layanan pelanggan kami.",
//       }).then(() => {
//         navigate("/login");
//       });
//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   }, [navigate]);

//   // Hook untuk mengambil data riwayat ketika modal dibuka
//   useEffect(() => {
//     if (showHistoryModal && user) {
//       fetchHistory();
//     }
//   }, [showHistoryModal, user]);

//   const fetchHistory = async () => {
//     setIsLoadingHistory(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       // Pastikan path API sesuai dengan endpoint Laravel Anda
//       const res = await fetch(`${BASE_URL}/api/user/contact-history`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json",
//         },
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setHistories(data);
//       } else {
//         console.error("Gagal mengambil riwayat:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching history:", error);
//     } finally {
//       setIsLoadingHistory(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!description.trim()) return;

//     setIsSubmitting(true);
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ description })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Terkirim!",
//           text: data.message || "Pesan Anda berhasil dikirim.",
//           confirmButtonColor: "#059669"
//         });
//         setDescription(""); // Kosongkan form setelah sukses
//       } else {
//         throw new Error(data.message || "Gagal mengirim pesan");
//       }
//     } catch (error: any) {
//       console.error("Gagal submit contact:", error);
//       Swal.fire("Error", error.message || "Terjadi kesalahan pada server.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!user) return null; // Mencegah kedipan UI saat mengecek localStorage

//   return (
//     <div className="relative min-h-screen py-16 font-sans bg-gray-50">
//       <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        
//         {/* Tombol Buka Riwayat */}
//         <div className="absolute top-0 right-4 sm:right-6 lg:right-8">
//           <button 
//             onClick={() => setShowHistoryModal(true)} 
//             className="pb-1 text-xs font-bold tracking-widest uppercase transition-colors border-b-2 text-emerald-700 border-emerald-700 hover:text-emerald-500 hover:border-emerald-500"
//           >
//             Riwayat Pesan Saya
//           </button>
//         </div>

//         {/* Header Section */}
//         <div className="max-w-2xl mx-auto mt-10 mb-16 text-center animate-fade-in-up md:mt-0">
//           <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">Get in Touch</h1>
//           <p className="text-lg text-gray-600">Punya pertanyaan seputar produk, pesanan, atau kolaborasi? Tim Gycora siap membantu Anda.</p>
//         </div>

//         <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl lg:flex-row animate-fade-in-up">
          
//           {/* Kolom Kiri: Informasi Kontak Perusahaan */}
//           <div className="relative flex flex-col justify-between p-10 overflow-hidden text-white lg:w-1/3 bg-gradient-to-br from-emerald-600 to-emerald-900">
//             <div className="relative z-10">
//               <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
//               <p className="mb-8 leading-relaxed text-emerald-50">
//                 Isi formulir di samping dan tim Customer Care kami akan merespons dalam waktu 1x24 jam kerja.
//               </p>
              
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                   <div>
//                     <p className="text-sm font-semibold text-emerald-100">Email</p>
//                     <p className="font-medium">gycora.essence@gmail.com</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                   <div>
//                     <p className="text-sm font-semibold text-emerald-100">Phone</p>
//                     <p className="font-medium">+62 895-1799-9768</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   <div>
//                     <p className="text-sm font-semibold text-emerald-100">Office</p>
//                     <p className="font-medium">Surabaya, East Java<br/>Indonesia</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Dekorasi Bulatan */}
//             <div className="absolute z-0 w-48 h-48 bg-white rounded-full -bottom-20 -right-20 opacity-10 blur-2xl"></div>
//           </div>

//           {/* Kolom Kanan: Form Contact */}
//           <div className="p-10 lg:w-2/3 md:p-12">
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Lengkap</label>
//                   <div className="w-full p-3 font-medium text-gray-500 border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
//                     {user.first_name} {user.last_name}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
//                   <div className="w-full p-3 font-medium text-gray-500 truncate border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
//                     {user.email}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Nomor Telepon</label>
//                 <div className="w-full p-3 font-medium text-gray-500 border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
//                   {user.phone ? user.phone : <span className="italic text-gray-400">Nomor telepon belum diatur di profil</span>}
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Detail Pesan</label>
//                 <textarea 
//                   required
//                   rows={5}
//                   placeholder="Jelaskan kendala atau pertanyaan Anda secara detail di sini..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-shadow"
//                 ></textarea>
//               </div>

//               <div className="flex justify-end pt-2">
//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className={`px-8 py-3.5 rounded-full font-bold text-white shadow-lg transition-all ${
//                     isSubmitting ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5"
//                   }`}
//                 >
//                   {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
//                 </button>
//               </div>

//             </form>
//           </div>

//         </div>
//       </div>

//       {/* Modal Riwayat Pesan */}
//       {showHistoryModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//           <div className="relative flex flex-col w-full max-w-3xl max-h-[85vh] bg-gray-100 shadow-2xl rounded-3xl overflow-hidden">
            
//             {/* Header Modal */}
//             <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200 shrink-0">
//               <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 uppercase">Riwayat Pesan</h2>
//               <button 
//                 onClick={() => setShowHistoryModal(false)} 
//                 className="text-3xl text-gray-400 transition-colors hover:text-gray-700"
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Body Modal */}
//             <div className="p-8 overflow-y-auto grow">
//               {isLoadingHistory ? (
//                 <div className="py-10 text-xs font-bold tracking-widest text-center text-gray-500 uppercase animate-pulse">
//                   Memuat riwayat...
//                 </div>
//               ) : histories.length === 0 ? (
//                 <div className="py-20 text-lg italic text-center text-gray-500">
//                   Anda belum pernah mengirim pesan.
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {histories.map((item: any) => (
//                     <div key={item.id} className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//                       <div className="flex items-start justify-between mb-4">
//                         <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
//                           {new Date(item.created_at).toLocaleString('id-ID')}
//                         </span>
//                         {!item.response ? (
//                           <span className="px-2 py-1 text-[9px] font-bold tracking-wider text-amber-700 uppercase bg-amber-100 rounded">
//                             Menunggu Balasan
//                           </span>
//                         ) : (
//                           <span className="px-2 py-1 text-[9px] font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded">
//                             Telah Dibalas
//                           </span>
//                         )}
//                       </div>
                      
//                       <p className="mb-4 text-sm text-gray-800">"{item.description}"</p>

//                       <div className="p-4 border border-gray-200 bg-gray-50 rounded-xl">
//                         <p className="flex items-center gap-2 mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
//                             <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                             <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                           </svg>
//                           gycora.essence@gmail.com
//                         </p>
//                         {item.response ? (
//                           <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.response}</p>
//                         ) : (
//                           <p className="text-xs italic text-gray-400">Admin belum membalas pesan ini. Silakan periksa kembali nanti.</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
      
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";
import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

export default function ContactUs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage(); // [BARU] Inisialisasi hook bahasa

  const [user, setUser] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk Modal Riwayat
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [histories, setHistories] = useState<any[]>([]);

  // =========================================================
  // LOGIKA PREFIX URL PINTAR
  // Membaca URL saat ini untuk menentukan prefix navigasi
  // =========================================================
  const getUrlPrefix = () => {
    if (location.pathname.startsWith('/id')) return '/id';
    if (location.pathname.startsWith('/en')) return '/en';
    return ''; // Tanpa prefix
  };
  const urlPrefix = getUrlPrefix();

  useEffect(() => {
    // Cek apakah user sudah login
    const storedUser = localStorage.getItem("user_data");
    if (!storedUser) {
      Swal.fire({
        icon: "info",
        title: t("contact_login_req_title"),
        text: t("contact_login_req_desc"),
      }).then(() => {
        navigate(`${urlPrefix}/login`); // [PERBAIKAN] Menggunakan prefix bahasa dinamis
      });
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate, t, urlPrefix]);

  // Hook untuk mengambil data riwayat ketika modal dibuka
  useEffect(() => {
    if (showHistoryModal && user) {
      fetchHistory();
    }
  }, [showHistoryModal, user]);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    const token = localStorage.getItem("user_token");

    try {
      const res = await fetch(`${BASE_URL}/api/user/contact-history`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setHistories(data);
      } else {
        console.error("Gagal mengambil riwayat:", data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("user_token");

    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({ description })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: t("contact_sent_title"),
          text: data.message || t("contact_sent_desc"),
          confirmButtonColor: "#059669"
        });
        setDescription(""); // Kosongkan form setelah sukses
      } else {
        throw new Error(data.message || t("contact_err_send"));
      }
    } catch (error: any) {
      console.error("Gagal submit contact:", error);
      Swal.fire("Error", error.message || t("contact_err_server"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null; // Mencegah kedipan UI saat mengecek localStorage

  return (
    <div className="relative min-h-screen py-16 font-sans bg-gray-50">
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Tombol Buka Riwayat */}
        <div className="absolute top-0 right-4 sm:right-6 lg:right-8">
          <button 
            onClick={() => setShowHistoryModal(true)} 
            className="pb-1 text-xs font-bold tracking-widest uppercase transition-colors border-b-2 text-emerald-700 border-emerald-700 hover:text-emerald-500 hover:border-emerald-500"
          >
            {t("contact_history_btn")}
          </button>
        </div>

        {/* Header Section */}
        <div className="max-w-2xl mx-auto mt-10 mb-16 text-center animate-fade-in-up md:mt-0">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
            {t("contact_hero_title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("contact_hero_desc")}
          </p>
        </div>

        <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl lg:flex-row animate-fade-in-up">
          
          {/* Kolom Kiri: Informasi Kontak Perusahaan */}
          <div className="relative flex flex-col justify-between p-10 overflow-hidden text-white lg:w-1/3 bg-gradient-to-br from-emerald-600 to-emerald-900">
            <div className="relative z-10">
              <h3 className="mb-6 text-2xl font-bold">{t("contact_info_title")}</h3>
              <p className="mb-8 leading-relaxed text-emerald-50">
                {t("contact_info_desc")}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">{t("contact_label_email")}</p>
                    <p className="font-medium">gycora.essence@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">{t("contact_label_phone")}</p>
                    <p className="font-medium">+62 895-1799-9768</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 mt-1 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">{t("contact_label_office")}</p>
                    <p className="font-medium">
                      {t("contact_office_region")}<br/>
                      {t("contact_office_country")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dekorasi Bulatan */}
            <div className="absolute z-0 w-48 h-48 bg-white rounded-full -bottom-20 -right-20 opacity-10 blur-2xl"></div>
          </div>

          {/* Kolom Kanan: Form Contact */}
          <div className="p-10 lg:w-2/3 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    {t("contact_form_name")}
                  </label>
                  <div className="w-full p-3 font-medium text-gray-500 border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
                    {user.first_name} {user.last_name}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    {t("contact_form_email")}
                  </label>
                  <div className="w-full p-3 font-medium text-gray-500 truncate border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
                    {user.email}
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  {t("contact_form_phone")}
                </label>
                <div className="w-full p-3 font-medium text-gray-500 border border-gray-200 cursor-not-allowed bg-gray-50 rounded-xl">
                  {user.phone ? user.phone : <span className="italic text-gray-400">{t("contact_form_phone_empty")}</span>}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  {t("contact_form_message")}
                </label>
                <textarea 
                  required
                  rows={5}
                  placeholder={t("contact_form_message_placeholder")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-shadow"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`px-8 py-3.5 rounded-full font-bold text-white shadow-lg transition-all ${
                    isSubmitting ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? t("contact_btn_sending") : t("contact_btn_send")}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

      {/* Modal Riwayat Pesan */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative flex flex-col w-full max-w-3xl max-h-[85vh] bg-gray-100 shadow-2xl rounded-3xl overflow-hidden">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200 shrink-0">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 uppercase">
                {t("contact_modal_title")}
              </h2>
              <button 
                onClick={() => setShowHistoryModal(false)} 
                className="text-3xl text-gray-400 transition-colors hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-8 overflow-y-auto grow">
              {isLoadingHistory ? (
                <div className="py-10 text-xs font-bold tracking-widest text-center text-gray-500 uppercase animate-pulse">
                  {t("contact_modal_loading")}
                </div>
              ) : histories.length === 0 ? (
                <div className="py-20 text-lg italic text-center text-gray-500">
                  {t("contact_modal_empty")}
                </div>
              ) : (
                <div className="space-y-6">
                  {histories.map((item: any) => (
                    <div key={item.id} className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                          {new Date(item.created_at).toLocaleString('id-ID')}
                        </span>
                        {!item.response ? (
                          <span className="px-2 py-1 text-[9px] font-bold tracking-wider text-amber-700 uppercase bg-amber-100 rounded">
                            {t("contact_status_waiting")}
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-[9px] font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded">
                            {t("contact_status_replied")}
                          </span>
                        )}
                      </div>
                      
                      <p className="mb-4 text-sm text-gray-800">"{item.description}"</p>

                      <div className="p-4 border border-gray-200 bg-gray-50 rounded-xl">
                        <p className="flex items-center gap-2 mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          gycora.essence@gmail.com
                        </p>
                        {item.response ? (
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.response}</p>
                        ) : (
                          <p className="text-xs italic text-gray-400">
                            {t("contact_admin_unreplied")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
}