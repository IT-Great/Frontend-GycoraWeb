// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; // Sesuaikan dengan path Anda
// import Swal from "sweetalert2";

// interface UserDetail {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string | null;
//   profile_image: string | null;
//   usertype: string;
//   is_membership: boolean;
//   point: number;
//   is_subscribed: boolean;
//   created_at: string;
//   // Anda bisa menambahkan interface addresses atau transactions di sini nanti jika diperlukan
//   addresses?: any[]; 
// }

// export default function UserDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDetail = async () => {
//       try {
//         const token = localStorage.getItem("admin_token");
//         // Asumsi Anda menggunakan endpoint getUserDetail yang ada di AuthController
//         const res = await fetch(`${BASE_URL}/api/admin/users/${id}`, {
//           headers: {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           if (res.status === 404) throw new Error("Pelanggan tidak ditemukan");
//           throw new Error("Gagal mengambil data pelanggan");
//         }

//         const data = await res.json();
//         // Sesuaikan jika backend mengembalikan format { data: {...} } atau langsung objek user
//         setUser(data.data ? data.data : data);
//       } catch (error: any) {
//         console.error("Error fetching user details:", error);
//         Swal.fire("Error", error.message || "Gagal memuat detail pelanggan", "error");
//         navigate("/admin/users"); // Redirect kembali jika error
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchUserDetail();
//   }, [id, navigate]);

//   const formatDate = (dateString: string) => {
//     return new Intl.DateTimeFormat("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit"
//     }).format(new Date(dateString));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh] font-sans">
//         <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
      
//       {/* --- HEADER --- */}
//       <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="p-2 text-gray-500 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900"
//             title="Kembali"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Detail Pelanggan</h1>
//             <p className="mt-1 text-sm text-gray-500">ID Pelanggan: #{user.id}</p>
//           </div>
//         </div>
//       </div>

//       {/* --- KONTEN UTAMA --- */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
//         {/* Kolom Kiri: Profil Singkat */}
//         <div className="flex flex-col items-center p-8 bg-white border border-gray-100 shadow-sm md:col-span-1 rounded-xl">
//           <div className="relative mb-6">
//             {user.profile_image ? (
//               <img 
//                 src={user.profile_image} 
//                 alt="Profile" 
//                 className="object-cover w-32 h-32 border-4 border-white shadow-lg rounded-3xl"
//               />
//             ) : (
//               <div className="flex items-center justify-center w-32 h-32 text-4xl font-extrabold text-white shadow-lg rounded-3xl bg-gradient-to-br from-gycora-light to-gycora">
//                 {user.first_name.charAt(0)}{user.last_name.charAt(0)}
//               </div>
//             )}
//             {user.is_membership && (
//               <div className="absolute top-0 right-0 p-1.5 bg-yellow-400 rounded-full shadow-sm text-white" title="Member Gycora">
//                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//               </div>
//             )}
//           </div>
          
//           <h2 className="text-xl font-bold text-center text-gray-900">{user.first_name} {user.last_name}</h2>
//           <p className="mt-1 text-sm text-gray-500">{user.email}</p>
          
//           <div className="flex flex-wrap justify-center gap-2 mt-4">
//             {user.is_subscribed && (
//               <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">Subscribed</span>
//             )}
//             <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-gray-600 bg-gray-100 rounded-full border border-gray-200">
//               {user.usertype}
//             </span>
//           </div>

//           <div className="w-full pt-6 mt-6 text-center border-t border-gray-100">
//             <p className="mb-1 text-xs tracking-widest text-gray-400 uppercase">Gycora Points</p>
//             <p className="text-3xl font-extrabold text-gycora">{user.point.toLocaleString('id-ID')}</p>
//           </div>
//         </div>

//         {/* Kolom Kanan: Detail Info */}
//         <div className="space-y-6 md:col-span-2">
          
//           {/* Card Informasi Personal */}
//           <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
//             <h3 className="pb-4 mb-6 text-lg font-bold text-gray-900 border-b border-gray-100">Informasi Personal</h3>
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Nama Depan</p>
//                 <p className="mt-1 text-sm font-medium text-gray-900">{user.first_name}</p>
//               </div>
//               <div>
//                 <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Nama Belakang</p>
//                 <p className="mt-1 text-sm font-medium text-gray-900">{user.last_name}</p>
//               </div>
//               <div>
//                 <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Nomor Telepon</p>
//                 <p className="mt-1 text-sm font-medium text-gray-900">{user.phone || "-"}</p>
//               </div>
//               <div>
//                 <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Tanggal Bergabung</p>
//                 <p className="mt-1 text-sm font-medium text-gray-900">{formatDate(user.created_at)}</p>
//               </div>
//             </div>
//           </div>

//           {/* Card Daftar Alamat (Jika relasi addresses di-load dari Backend) */}
//           <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
//             <h3 className="pb-4 mb-6 text-lg font-bold text-gray-900 border-b border-gray-100">Buku Alamat</h3>
            
//             {user.addresses && user.addresses.length > 0 ? (
//               <div className="space-y-3">
//                 {user.addresses.map((address: any) => (
//                   <div key={address.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
//                     <div className="flex items-start justify-between mb-2">
//                        <p className="text-sm font-bold text-gray-900">{address.first_name_address} {address.last_name_address}</p>
//                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{address.location_type}</span>
//                     </div>
//                     <p className="text-sm leading-relaxed text-gray-600">{address.address_location}</p>
//                     <p className="text-sm text-gray-600">{address.city}, {address.province} - {address.postal_code}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="py-6 text-center text-gray-500 border border-gray-200 border-dashed bg-gray-50 rounded-xl">
//                 <p className="text-sm font-medium">Pelanggan ini belum menambahkan alamat pengiriman.</p>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api"; // Sesuaikan dengan path Anda
import Swal from "sweetalert2";

interface UserDetail {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  profile_image: string | null;
  usertype: string;
  is_membership: boolean;
  point: number;
  is_subscribed: boolean;
  created_at: string;
  // Anda bisa menambahkan interface addresses atau transactions di sini nanti jika diperlukan
  addresses?: any[]; 
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        // Asumsi Anda menggunakan endpoint getUserDetail yang ada di AuthController
        const res = await fetch(`${BASE_URL}/api/admin/users/${id}`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error("Pelanggan tidak ditemukan");
          throw new Error("Gagal mengambil data pelanggan");
        }

        const data = await res.json();
        // Sesuaikan jika backend mengembalikan format { data: {...} } atau langsung objek user
        setUser(data.data ? data.data : data);
      } catch (error: any) {
        console.error("Error fetching user details:", error);
        Swal.fire("Error", error.message || "Gagal memuat detail pelanggan", "error");
        navigate("/admin/users"); // Redirect kembali jika error
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserDetail();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] font-sans">
        <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-gray-500 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900"
            title="Kembali"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Pelanggan</h1>
            <p className="mt-1 text-sm text-gray-500">ID Pelanggan: #{user.id}</p>
          </div>
        </div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Kolom Kiri: Profil Singkat */}
        <div className="flex flex-col items-center p-8 bg-white border border-gray-100 shadow-sm md:col-span-1 rounded-xl">
          <div className="relative mb-6">
            {user.profile_image ? (
              <img 
                src={user.profile_image} 
                alt="Profile" 
                className="object-cover w-32 h-32 border-4 border-white shadow-lg rounded-3xl"
              />
            ) : (
              <div className="flex items-center justify-center w-32 h-32 text-4xl font-extrabold text-white shadow-lg rounded-3xl bg-gradient-to-br from-gycora-light to-gycora">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </div>
            )}
            
            {/* 👇 UPGRADE UI: LOGO BINTANG MEMBERSHIP & FIX ANGKA 0 👇 */}
            {user.is_membership ? (
              <div 
                className="absolute -top-2 -right-2 p-2 bg-gradient-to-tr from-yellow-300 to-amber-500 rounded-full shadow-lg ring-4 ring-white text-white z-10" 
                title="VIP Member Gycora"
              >
                 <svg className="w-5 h-5 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                 </svg>
              </div>
            ) : null}
          </div>
          
          <h2 className="text-xl font-bold text-center text-gray-900">{user.first_name} {user.last_name}</h2>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {/* 👇 UPGRADE UI: LABEL SUBSCRIBED & FIX ANGKA 0 👇 */}
            {user.is_subscribed ? (
              <span className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Subscribed
              </span>
            ) : null}
            
            <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-gray-600 bg-gray-100 rounded-full border border-gray-200 shadow-sm">
              {user.usertype}
            </span>
          </div>

          <div className="w-full pt-6 mt-6 text-center border-t border-gray-100">
            <p className="mb-1 text-xs tracking-widest text-gray-400 uppercase">Gycora Points</p>
            <p className="text-3xl font-extrabold text-gycora">{user.point.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Kolom Kanan: Detail Info */}
        <div className="space-y-6 md:col-span-2">
          
          {/* Card Informasi Personal */}
          <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h3 className="pb-4 mb-6 text-lg font-bold text-gray-900 border-b border-gray-100">Informasi Personal</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Nama Depan</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.first_name}</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Nama Belakang</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.last_name}</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Nomor Telepon</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.phone || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Tanggal Bergabung</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{formatDate(user.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Card Daftar Alamat */}
          <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h3 className="pb-4 mb-6 text-lg font-bold text-gray-900 border-b border-gray-100">Buku Alamat</h3>
            
            {user.addresses && user.addresses.length > 0 ? (
              <div className="space-y-3">
                {user.addresses.map((address: any) => (
                  <div key={address.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                       <p className="text-sm font-bold text-gray-900">{address.first_name_address} {address.last_name_address}</p>
                       <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{address.location_type}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{address.address_location}</p>
                    <p className="text-sm text-gray-600">{address.city}, {address.province} - {address.postal_code}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-gray-500 border border-gray-200 border-dashed bg-gray-50 rounded-xl">
                <p className="text-sm font-medium">Pelanggan ini belum menambahkan alamat pengiriman.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}