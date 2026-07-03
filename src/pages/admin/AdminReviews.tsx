// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../config/api";
// import Swal from "sweetalert2";

// export default function AdminReviews() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

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
//           <p className="mt-1 text-sm text-gray-500">Pantau dan kelola *feedback* dari pelanggan.</p>
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
//                       <button 
//                         onClick={() => handleDelete(review.id)}
//                         className="p-2 text-red-500 transition-colors rounded-lg hover:bg-red-50"
//                         title="Hapus Ulasan"
//                       >
//                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
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

  // 👇 [PERBAIKAN] State untuk Otorisasi Aksi Hapus Ulasan 👇
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  useEffect(() => {
    // Ambil data user & otorisasi dari localStorage saat komponen dimuat
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

  // Fungsi Helper RBAC
  const canAccess = (key: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true; 
    return allowedModules.includes(key);
  };
  // 👆 ========================================== 👆

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
          fetchReviews(); // Refresh tabel
        } else {
          throw new Error("Gagal menghapus ulasan");
        }
      } catch (err) {
        Swal.fire("Error", "Terjadi kesalahan server.", "error");
      }
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Ulasan</h1>
          <p className="mt-1 text-sm text-gray-500">Pantau dan kelola feedback dari pelanggan.</p>
        </div>
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
                      {/* 👇 BUNGKUS TOMBOL HAPUS DENGAN RBAC 👇 */}
                      {canAccess('reviews.delete') ? (
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="p-2 text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Hapus Ulasan"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      ) : (
                        <span className="text-[10px] italic text-gray-400">No Action</span>
                      )}
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