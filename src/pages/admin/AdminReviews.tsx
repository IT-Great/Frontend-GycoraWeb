// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../config/api";
// import Swal from "sweetalert2";

// export default function AdminReviews() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 👇 [PERBAIKAN] State untuk Otorisasi Aksi Hapus Ulasan 👇
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);

//   useEffect(() => {
//     // Ambil data user & otorisasi dari localStorage saat komponen dimuat
//     const userStr = localStorage.getItem("admin_user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       setAdminUser(user);
//       try {
//         const policiesStr = localStorage.getItem("admin_access_policies");
//         if (policiesStr) {
//           const policies = JSON.parse(policiesStr);
//           if (user.usertype !== "superadmin") {
//             setAllowedModules(policies[user.usertype] || []);
//           }
//         }
//       } catch (error) {
//         console.error("Gagal membaca kebijakan akses:", error);
//       }
//     }
//   }, []);

//   // Fungsi Helper RBAC
//   const canAccess = (key: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true; 
//     return allowedModules.includes(key);
//   };
//   // 👆 ========================================== 👆

//   const fetchReviews = async () => {
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/reviews`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setReviews(data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch reviews", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleDelete = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Hapus Ulasan?",
//       text: "Ulasan ini akan dihapus secara permanen.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Ya, Hapus!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/admin/reviews/${id}`, {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.ok) {
//           Swal.fire("Terhapus!", "Ulasan berhasil dihapus.", "success");
//           fetchReviews(); // Refresh tabel
//         } else {
//           throw new Error("Gagal menghapus ulasan");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Terjadi kesalahan server.", "error");
//       }
//     }
//   };

//   const renderStars = (rating: number) => {
//     return (
//       <div className="flex text-amber-400">
//         {[...Array(5)].map((_, i) => (
//           <svg key={i} className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 md:p-8 animate-fade-in">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Manajemen Ulasan</h1>
//           <p className="mt-1 text-sm text-gray-500">Pantau dan kelola feedback dari pelanggan.</p>
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="border-b border-gray-200 bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Pelanggan</th>
//                 <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Produk</th>
//                 <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Rating & Ulasan</th>
//                 <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Foto</th>
//                 <th className="px-6 py-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {isLoading ? (
//                 <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Memuat data...</td></tr>
//               ) : reviews.length === 0 ? (
//                 <tr><td colSpan={5} className="px-6 py-10 italic text-center text-gray-500">Belum ada ulasan.</td></tr>
//               ) : (
//                 reviews.map((review) => (
//                   <tr key={review.id} className="transition-colors hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 shrink-0">
//                           {review.user?.first_name?.charAt(0) || "U"}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-gray-900">{review.user?.first_name} {review.user?.last_name}</p>
//                           <p className="text-[10px] text-gray-400 font-mono mt-0.5">{new Date(review.created_at).toLocaleDateString('id-ID')}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="text-sm font-medium text-gray-900 line-clamp-2">{review.product?.name || "Produk dihapus"}</p>
//                     </td>
//                     <td className="px-6 py-4 min-w-[250px]">
//                       {renderStars(review.rating)}
//                       <p className="mt-2 text-sm text-gray-600 line-clamp-3">"{review.comment}"</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       {review.image_url ? (
//                         <a href={review.image_url} target="_blank" rel="noopener noreferrer">
//                           <img src={review.image_url} alt="Review" className="object-cover w-16 h-16 transition-opacity border border-gray-200 rounded-lg hover:opacity-75" />
//                         </a>
//                       ) : (
//                         <span className="text-xs italic text-gray-400">Tidak ada foto</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       {/* 👇 BUNGKUS TOMBOL HAPUS DENGAN RBAC 👇 */}
//                       {canAccess('reviews.delete') ? (
//                         <button 
//                           onClick={() => handleDelete(review.id)}
//                           className="p-2 text-red-500 transition-colors rounded-lg hover:bg-red-50"
//                           title="Hapus Ulasan"
//                         >
//                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       ) : (
//                         <span className="text-[10px] italic text-gray-400">No Action</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import Swal from "sweetalert2";

export default function AdminReviews() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  // 👇 STATE UNTUK AI SUMMARIZER 👇
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setAdminUser(user);
      try {
        const policiesStr = localStorage.getItem("admin_access_policies");
        if (policiesStr) {
          const policies = JSON.parse(policiesStr);
          if (user.usertype !== "superadmin") {
            setAllowedModules(policies[user.usertype] || []);
          }
        }
      } catch (error) {
        console.error("Gagal membaca kebijakan akses:", error);
      }
    }
  }, []);

  const canAccess = (key: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true; 
    return allowedModules.includes(key);
  };

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus Ulasan?",
      text: "Ulasan ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/reviews/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          Swal.fire("Terhapus!", "Ulasan berhasil dihapus.", "success");
          fetchReviews();
        } else {
          throw new Error("Gagal menghapus ulasan");
        }
      } catch (err) {
        Swal.fire("Error", "Terjadi kesalahan server.", "error");
      }
    }
  };

  // 👇 [BARU] FUNGSI GENERATE KESIMPULAN SENTIMEN GLOBAL 👇
  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/reviews-summary`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: "application/json" 
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setAiSummary(data.data);
      } else {
        Swal.fire("Gagal", "Gagal memproses data AI", "error");
      }
    } catch (e) {
      Swal.fire("Error", "Terjadi kesalahan koneksi AI", "error");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // 👇 [BARU] FUNGSI GENERATE DRAF BALASAN OTOMATIS 👇
  const handleGenerateReply = async (reviewId: number) => {
    Swal.fire({
      title: "AI Sedang Mengetik...",
      text: "Meracik balasan terbaik untuk ulasan ini.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/reviews/${reviewId}/ai-reply`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });

      if (res.ok) {
        const data = await res.json();
        Swal.fire({
          title: "✨ Draf Balasan AI",
          html: `<textarea id="ai-reply-text" class="w-full h-40 p-3 mt-2 text-sm text-gray-700 border border-gray-300 rounded-lg outline-none resize-none bg-gray-50 focus:ring-2 focus:ring-blue-500" readonly>${data.reply}</textarea>`,
          showCancelButton: true,
          confirmButtonText: "Salin ke Clipboard",
          cancelButtonText: "Tutup",
          confirmButtonColor: "#000",
        }).then((result) => {
          if (result.isConfirmed) {
            const copyText = (document.getElementById("ai-reply-text") as HTMLTextAreaElement).value;
            navigator.clipboard.writeText(copyText);
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Teks disalin! Silakan balas via Chat/WA.',
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
      } else {
        throw new Error("Gagal");
      }
    } catch (e) {
      Swal.fire("Error", "Gagal menghubungi layanan AI.", "error");
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Ulasan</h1>
          <p className="mt-1 text-sm text-gray-500">Pantau dan kelola feedback dari pelanggan.</p>
        </div>
      </div>

      {/* 👇 WIDGET AI REVIEW SUMMARIZER 👇 */}
      <div className="relative p-6 mb-8 overflow-hidden text-white border border-indigo-800 shadow-xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl group">
        <div className="absolute top-0 right-0 p-4 transition-transform duration-700 transform translate-x-8 -translate-y-8 pointer-events-none opacity-10 group-hover:scale-110">
          <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-indigo-200 uppercase bg-indigo-950/50 rounded-full border border-indigo-700/50">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              Gemini AI Engine
            </div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-white">
              AI Sentiment Summarizer
            </h2>
            <p className="mt-1.5 text-sm text-indigo-200 max-w-xl leading-relaxed">
              Membaca ratusan ulasan secara instan untuk menemukan apa yang paling disukai dan dikeluhkan pelanggan bulan ini.
            </p>
          </div>
          
          <button 
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary || reviews.length === 0}
            className="px-6 py-3 font-bold text-indigo-900 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-0.5 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isGeneratingSummary ? (
              <>
                <svg className="w-5 h-5 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Membaca Ulasan...
              </>
            ) : (
              <>
                <span className="text-base">✨</span> Analisis Semua Ulasan
              </>
            )}
          </button>
        </div>

        {aiSummary && (
          <div className="p-6 mt-8 border shadow-inner bg-white/10 backdrop-blur-md rounded-xl border-white/20 animate-fade-in-up">
            <div 
              className="text-sm leading-relaxed prose text-indigo-50 prose-invert max-w-none prose-p:mb-3 prose-strong:text-white prose-ul:my-2 prose-li:mb-1 marker:text-indigo-300"
              dangerouslySetInnerHTML={{ __html: aiSummary }}
            />
          </div>
        )}
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Pelanggan</th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Produk</th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Rating & Ulasan</th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Foto</th>
                <th className="px-6 py-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Memuat data...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 italic text-center text-gray-500">Belum ada ulasan.</td></tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                          {review.user?.first_name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{review.user?.first_name} {review.user?.last_name}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{new Date(review.created_at).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{review.product?.name || "Produk dihapus"}</p>
                    </td>
                    <td className="px-6 py-4 min-w-[250px]">
                      {renderStars(review.rating)}
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">"{review.comment}"</p>
                    </td>
                    <td className="px-6 py-4">
                      {review.image_url ? (
                        <a href={review.image_url} target="_blank" rel="noopener noreferrer">
                          <img src={review.image_url} alt="Review" className="object-cover w-16 h-16 transition-opacity border border-gray-200 rounded-lg hover:opacity-75" />
                        </a>
                      ) : (
                        <span className="text-xs italic text-gray-400">Tidak ada foto</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* 👇 TOMBOL AI REPLY PER ULASAN 👇 */}
                        <button 
                          onClick={() => handleGenerateReply(review.id)}
                          disabled={!review.comment}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-indigo-700 transition-colors bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Generate Draf Balasan AI"
                        >
                          <span className="text-sm">✨</span> AI Reply
                        </button>

                        {canAccess('reviews.delete') && (
                          <button 
                            onClick={() => handleDelete(review.id)}
                            className="p-1.5 text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            title="Hapus Ulasan"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}