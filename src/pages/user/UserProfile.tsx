/* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Ganti dari next/navigation
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// export default function UserProfile() {
//   const navigate = useNavigate(); // Ganti useRouter
//   const [user, setUser] = useState<any>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- State Modal Alamat ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [formData, setFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- State Modal Edit Profil ---
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [profileFormData, setProfileFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); // Ganti router.push
//       return;
//     }

//     setUser(JSON.parse(storedUser));
//     fetchAddresses(token);
//   }, [navigate]); // Tambahkan navigate ke dependency array

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         // --- PERBAIKAN DI SINI ---
//         const addressArray = data.data ? data.data : data; 
//         setAddresses(addressArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal load alamat", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers untuk Profil ---
//   const handleOpenProfileModal = () => {
//     setProfileFormData({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       phone: user.phone || "",
//     });
//     setIsProfileModalOpen(true);
//   };

//   const handleSubmitProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(profileFormData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Profil Diperbarui!",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsProfileModalOpen(false);

//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));

//         // Memaksa reload agar Header membaca nama baru dari localStorage
//         setTimeout(() => window.location.reload(), 1500);
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update profil:", error); // Tambahkan console.error agar linter tidak protes
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   // --- Handlers untuk Alamat ---
//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
//       setFormData({
//         region: address.details.region,
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude,
//         longitude: address.details.longitude,
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setFormData({
//         region: "",
//         first_name_address: "",
//         last_name_address: "",
//         address_location: "",
//         city: "",
//         province: "",
//         postal_code: "",
//         location_type: "home",
//         latitude: "",
//         longitude: "",
//         is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId
//       ? `${BASE_URL}/api/addresses/${editingId}`
//       : `${BASE_URL}/api/addresses`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Hapus alamat?",
//       text: "Tindakan ini tidak dapat dibatalkan.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Hapus",
//     });
//     if (result.isConfirmed) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/addresses/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses(token!);
//       Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-gray-50">
//       <div className="max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
//         {/* --- PROFIL PENGGUNA --- */}
//         <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row md:items-start">
//           <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-tr from-gycora to-emerald-300 shrink-0">
//             {user.first_name.charAt(0)}
//             {user.last_name.charAt(0)}
//           </div>
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-3xl font-extrabold text-gray-900">
//               {user.first_name} {user.last_name}
//             </h1>
//             <p className="mt-1 text-gray-500">{user.email}</p>
//             <p className="mt-1 text-sm text-gray-500">
//               {user.phone ? (
//                 user.phone
//               ) : (
//                 <span className="italic">Belum ada nomor telepon</span>
//               )}
//             </p>
//             <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
//               Gycora Member
//             </div>
//           </div>
//           <button
//             onClick={handleOpenProfileModal}
//             className="px-6 py-2 text-sm font-semibold text-gray-700 transition-colors border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
//           >
//             Edit Profil
//           </button>
//         </div>

//         {/* --- BUKU ALAMAT (ADDRESS BOOK) --- */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-extrabold text-gray-900">
//               Buku Alamat
//             </h2>
//             <button
//               onClick={() => handleOpenModal()}
//               className="px-5 py-2 text-sm font-bold text-white transition-all rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//             >
//               + Tambah Alamat
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="py-12 text-center border border-gray-300 border-dashed bg-gray-50 rounded-xl">
//               <p className="font-medium text-gray-500">
//                 Anda belum memiliki alamat tersimpan.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div
//                   key={addr.id}
//                   className={`relative p-6 rounded-xl border-2 transition-all ${addr.is_default ? "border-gycora bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}
//                 >
//                   {addr.is_default && (
//                     <span className="absolute top-4 right-4 bg-gycora text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
//                       Utama
//                     </span>
//                   )}
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded">
//                       {addr.details.type === "home"
//                         ? "Rumah"
//                         : addr.details.type === "office"
//                           ? "Kantor"
//                           : "Lainnya"}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900">
//                     {addr.receiver.full_name}
//                   </h3>
//                   <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                     {addr.details.address_location} <br /> {addr.details.city},{" "}
//                     {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>
//                   <p className="mt-2 text-sm font-medium text-gray-500">
//                     Region: {addr.details.region}
//                   </p>
//                   <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-100">
//                     <button
//                       onClick={() => handleOpenModal(addr)}
//                       className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark"
//                     >
//                       Edit
//                     </button>
//                     <div className="w-px h-4 bg-gray-300"></div>
//                     <button
//                       onClick={() => handleDeleteAddress(addr.id)}
//                       className="text-sm font-bold text-red-500 transition-colors hover:text-red-700"
//                     >
//                       Hapus
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ======================================================= */}
//       {/* MODAL FORM EDIT PROFIL */}
//       {/* ======================================================= */}
//       {isProfileModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
//               <button
//                 onClick={() => setIsProfileModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-900"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Nama Depan
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={profileFormData.first_name}
//                     onChange={(e) =>
//                       setProfileFormData({
//                         ...profileFormData,
//                         first_name: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Nama Belakang
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={profileFormData.last_name}
//                     onChange={(e) =>
//                       setProfileFormData({
//                         ...profileFormData,
//                         last_name: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={profileFormData.email}
//                   onChange={(e) =>
//                     setProfileFormData({
//                       ...profileFormData,
//                       email: e.target.value,
//                     })
//                   }
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">
//                   Nomor Telepon
//                 </label>
//                 <input
//                   type="tel"
//                   placeholder="Contoh: 081234567890"
//                   value={profileFormData.phone}
//                   onChange={(e) =>
//                     setProfileFormData({
//                       ...profileFormData,
//                       phone: e.target.value,
//                     })
//                   }
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setIsProfileModalOpen(false)}
//                   className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   Simpan Perubahan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">
//                 {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
//               </h3>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-900"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <form
//               onSubmit={handleSubmitAddress}
//               className="flex-1 p-6 space-y-6 overflow-y-auto"
//             >
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Nama Depan Penerima
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.first_name_address}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         first_name_address: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Nama Belakang Penerima
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.last_name_address}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         last_name_address: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">
//                   Label Alamat (Rumah/Kantor)
//                 </label>
//                 <select
//                   value={formData.location_type}
//                   onChange={(e) =>
//                     setFormData({ ...formData, location_type: e.target.value })
//                   }
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">
//                   Alamat Lengkap (Jalan, RT/RW, Patokan)
//                 </label>
//                 <textarea
//                   required
//                   rows={3}
//                   value={formData.address_location}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       address_location: e.target.value,
//                     })
//                   }
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Provinsi
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.province}
//                     onChange={(e) =>
//                       setFormData({ ...formData, province: e.target.value })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Kota / Kabupaten
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.city}
//                     onChange={(e) =>
//                       setFormData({ ...formData, city: e.target.value })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Kecamatan / Region
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.region}
//                     onChange={(e) =>
//                       setFormData({ ...formData, region: e.target.value })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">
//                     Kode Pos
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.postal_code}
//                     onChange={(e) =>
//                       setFormData({ ...formData, postal_code: e.target.value })
//                     }
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox"
//                   id="is_default"
//                   checked={formData.is_default}
//                   onChange={(e) =>
//                     setFormData({ ...formData, is_default: e.target.checked })
//                   }
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label
//                   htmlFor="is_default"
//                   className="text-sm font-bold cursor-pointer select-none text-emerald-800"
//                 >
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-full shadow-lg transition-colors"
//                 >
//                   {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// export default function UserProfile() {
//   const navigate = useNavigate(); 
//   const [user, setUser] = useState<any>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- State Modal Alamat ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [formData, setFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- State Modal Edit Profil ---
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [profileFormData, setProfileFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); 
//       return;
//     }

//     setUser(JSON.parse(storedUser));
//     fetchAddresses(token);
//   }, [navigate]); 

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addressArray = data.data ? data.data : data; 
//         setAddresses(addressArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal load alamat", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers untuk Profil ---
//   const handleOpenProfileModal = () => {
//     setProfileFormData({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       phone: user.phone || "",
//     });
//     setIsProfileModalOpen(true);
//   };

//   const handleSubmitProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(profileFormData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Profil Diperbarui!",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsProfileModalOpen(false);

//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));

//         setTimeout(() => window.location.reload(), 1500);
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update profil:", error); 
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   // --- Handlers untuk Alamat ---
//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
//       setFormData({
//         region: address.details.region,
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude,
//         longitude: address.details.longitude,
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setFormData({
//         region: "",
//         first_name_address: "",
//         last_name_address: "",
//         address_location: "",
//         city: "",
//         province: "",
//         postal_code: "",
//         location_type: "home",
//         latitude: "",
//         longitude: "",
//         is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId
//       ? `${BASE_URL}/api/addresses/${editingId}`
//       : `${BASE_URL}/api/addresses`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Hapus alamat?",
//       text: "Tindakan ini tidak dapat dibatalkan.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Hapus",
//     });
//     if (result.isConfirmed) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/addresses/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses(token!);
//       Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-gray-50">
//       <div className="max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        
//         {/* --- PROFIL PENGGUNA --- */}
//         <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row md:items-start">
//           <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-tr from-gycora to-emerald-300 shrink-0">
//             {user.first_name.charAt(0)}
//             {user.last_name.charAt(0)}
//           </div>
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-3xl font-extrabold text-gray-900">
//               {user.first_name} {user.last_name}
//             </h1>
//             <p className="mt-1 text-gray-500">{user.email}</p>
//             <p className="mt-1 text-sm text-gray-500">
//               {user.phone ? (
//                 user.phone
//               ) : (
//                 <span className="italic">Belum ada nomor telepon</span>
//               )}
//             </p>
//             <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
//               Gycora Member
//             </div>
//           </div>
          
//           {/* TAUTAN FAVORIT & EDIT PROFIL */}
//           <div className="flex flex-col gap-3 sm:flex-row">
//             <button
//               onClick={() => navigate("/favorites")}
//               className="px-6 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-sm bg-gycora hover:bg-gycora-dark"
//             >
//               Lihat Favorit
//             </button>
//             <button
//               onClick={handleOpenProfileModal}
//               className="px-6 py-2 text-sm font-semibold text-gray-700 transition-colors border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
//             >
//               Edit Profil
//             </button>
//           </div>
//         </div>

//         {/* --- BUKU ALAMAT (ADDRESS BOOK) --- */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-extrabold text-gray-900">
//               Buku Alamat
//             </h2>
//             <button
//               onClick={() => handleOpenModal()}
//               className="px-5 py-2 text-sm font-bold text-white transition-all bg-gray-900 rounded-full shadow-md hover:bg-black"
//             >
//               + Tambah Alamat
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="py-12 text-center border border-gray-300 border-dashed bg-gray-50 rounded-xl">
//               <p className="font-medium text-gray-500">
//                 Anda belum memiliki alamat tersimpan.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div
//                   key={addr.id}
//                   className={`relative p-6 rounded-xl border-2 transition-all ${addr.is_default ? "border-gycora bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}
//                 >
//                   {addr.is_default && (
//                     <span className="absolute top-4 right-4 bg-gycora text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
//                       Utama
//                     </span>
//                   )}
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded">
//                       {addr.details.type === "home"
//                         ? "Rumah"
//                         : addr.details.type === "office"
//                           ? "Kantor"
//                           : "Lainnya"}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900">
//                     {addr.receiver.full_name}
//                   </h3>
//                   <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                     {addr.details.address_location} <br /> {addr.details.city},{" "}
//                     {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>
//                   <p className="mt-2 text-sm font-medium text-gray-500">
//                     Region: {addr.details.region}
//                   </p>
//                   <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-100">
//                     <button
//                       onClick={() => handleOpenModal(addr)}
//                       className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark"
//                     >
//                       Edit
//                     </button>
//                     <div className="w-px h-4 bg-gray-300"></div>
//                     <button
//                       onClick={() => handleDeleteAddress(addr.id)}
//                       className="text-sm font-bold text-red-500 transition-colors hover:text-red-700"
//                     >
//                       Hapus
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ======================================================= */}
//       {/* MODAL FORM EDIT PROFIL */}
//       {/* ======================================================= */}
//       {isProfileModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
//               <button
//                 onClick={() => setIsProfileModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-900"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan</label>
//                   <input
//                     type="text" required value={profileFormData.first_name}
//                     onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang</label>
//                   <input
//                     type="text" required value={profileFormData.last_name}
//                     onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
//                 <input
//                   type="email" required value={profileFormData.email}
//                   onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Nomor Telepon</label>
//                 <input
//                   type="tel" placeholder="Contoh: 081234567890" value={profileFormData.phone}
//                   onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setIsProfileModalOpen(false)}
//                   className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   Simpan Perubahan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">
//                 {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitAddress} className="flex-1 p-6 space-y-6 overflow-y-auto">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan Penerima</label>
//                   <input
//                     type="text" required value={formData.first_name_address}
//                     onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang Penerima</label>
//                   <input
//                     type="text" required value={formData.last_name_address}
//                     onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Label Alamat (Rumah/Kantor)</label>
//                 <select
//                   value={formData.location_type}
//                   onChange={(e) => setFormData({ ...formData, location_type: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat Lengkap (Jalan, RT/RW, Patokan)</label>
//                 <textarea
//                   required rows={3} value={formData.address_location}
//                   onChange={(e) => setFormData({ ...formData, address_location: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Provinsi</label>
//                   <input
//                     type="text" required value={formData.province}
//                     onChange={(e) => setFormData({ ...formData, province: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kota / Kabupaten</label>
//                   <input
//                     type="text" required value={formData.city}
//                     onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kecamatan / Region</label>
//                   <input
//                     type="text" required value={formData.region}
//                     onChange={(e) => setFormData({ ...formData, region: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kode Pos</label>
//                   <input
//                     type="text" required value={formData.postal_code}
//                     onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox" id="is_default" checked={formData.is_default}
//                   onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button" onClick={() => setIsModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-full shadow-lg transition-colors"
//                 >
//                   {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// export default function UserProfile() {
//   const navigate = useNavigate(); 
//   const [user, setUser] = useState<any>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- State Modal Alamat ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [formData, setFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- State Modal Edit Profil ---
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [profileFormData, setProfileFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); 
//       return;
//     }

//     // setUser(JSON.parse(storedUser));
//     // fetchAddresses(token);

//     // 1. Tampilkan data dari local storage dulu agar UI cepat me-render (Optimistic)
//     setUser(JSON.parse(storedUser));
    
//     // 2. Ambil data terbaru dari database di background (termasuk update Poin!)
//     fetchUserProfile(token);
    
//     // 3. Ambil data alamat
//     fetchAddresses(token);
//   }, [navigate]); 

//   // FUNGSI BARU: Mengambil data user terbaru dari database
//   const fetchUserProfile = async (token: string) => {
//     try {
//       // Biasanya di Laravel Sanctum, endpoint bawaan untuk ambil data user adalah /api/user
//       const res = await fetch(`${BASE_URL}/api/user`, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json"
//         },
//       });
      
//       if (res.ok) {
//         const freshUser = await res.json();
//         setUser(freshUser); // Update tampilan UI dengan poin terbaru
//         localStorage.setItem("user_data", JSON.stringify(freshUser)); // Update local storage agar sinkron
//       }
//     } catch (error) {
//       console.error("Gagal mengambil data profil terbaru:", error);
//     }
//   };

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addressArray = data.data ? data.data : data; 
//         setAddresses(addressArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal load alamat", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers untuk Profil ---
//   const handleOpenProfileModal = () => {
//     setProfileFormData({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       phone: user.phone || "",
//     });
//     setIsProfileModalOpen(true);
//   };

//   const handleSubmitProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(profileFormData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Profil Diperbarui!",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsProfileModalOpen(false);

//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));

//         setTimeout(() => window.location.reload(), 1500);
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update profil:", error); 
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   // --- Handlers untuk Alamat ---
//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
//       setFormData({
//         region: address.details.region,
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude,
//         longitude: address.details.longitude,
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setFormData({
//         region: "",
//         first_name_address: "",
//         last_name_address: "",
//         address_location: "",
//         city: "",
//         province: "",
//         postal_code: "",
//         location_type: "home",
//         latitude: "",
//         longitude: "",
//         is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId
//       ? `${BASE_URL}/api/addresses/${editingId}`
//       : `${BASE_URL}/api/addresses`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Hapus alamat?",
//       text: "Tindakan ini tidak dapat dibatalkan.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Hapus",
//     });
//     if (result.isConfirmed) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/addresses/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses(token!);
//       Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-gray-50">
//       <div className="max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        
//         {/* --- PROFIL PENGGUNA --- */}
//         <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row md:items-center">
          
//           <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-tr from-gycora to-emerald-300 shrink-0">
//             {user.first_name.charAt(0)}
//             {user.last_name.charAt(0)}
//           </div>
          
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-3xl font-extrabold text-gray-900">
//               {user.first_name} {user.last_name}
//             </h1>
//             <p className="mt-1 text-gray-500">{user.email}</p>
//             <p className="mt-1 text-sm text-gray-500">
//               {user.phone ? (
//                 user.phone
//               ) : (
//                 <span className="italic">Belum ada nomor telepon</span>
//               )}
//             </p>
//             <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
//               Gycora Member
//             </div>
//           </div>
          
//           {/* SECTION POIN DAN TOMBOL (Kanan) */}
//           <div className="flex flex-col items-center w-full gap-4 md:items-end md:w-auto">
            
//             {/* KARTU POIN ELEGANT */}
//             <div className="flex items-center w-full gap-4 px-5 py-3 border shadow-sm sm:w-auto border-gray-800/50 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl">
//               <div className="flex items-center justify-center w-10 h-10 text-gray-900 rounded-full shadow-inner bg-gycora">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                   <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Gycora Points</p>
//                 <p className="text-xl font-black text-white">
//                   {new Intl.NumberFormat('id-ID').format(user.point || 0)} <span className="text-xs font-medium text-gycora">Pts</span>
//                 </p>
//               </div>
//             </div>

//             {/* TAUTAN FAVORIT & EDIT PROFIL */}
//             <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
//               <button
//                 onClick={() => navigate("/favorites")}
//                 className="flex-1 px-6 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-sm sm:flex-none bg-gycora hover:bg-gycora-dark"
//               >
//                 Lihat Favorit
//               </button>
//               <button
//                 onClick={handleOpenProfileModal}
//                 className="flex-1 px-6 py-2 text-sm font-semibold text-gray-700 transition-colors border border-gray-300 rounded-full shadow-sm sm:flex-none hover:bg-gray-50"
//               >
//                 Edit Profil
//               </button>
//             </div>
//           </div>

//         </div>

//         {/* --- BUKU ALAMAT (ADDRESS BOOK) --- */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-extrabold text-gray-900">
//               Buku Alamat
//             </h2>
//             <button
//               onClick={() => handleOpenModal()}
//               className="px-5 py-2 text-sm font-bold text-white transition-all bg-gray-900 rounded-full shadow-md hover:bg-black"
//             >
//               + Tambah Alamat
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="py-12 text-center border border-gray-300 border-dashed bg-gray-50 rounded-xl">
//               <p className="font-medium text-gray-500">
//                 Anda belum memiliki alamat tersimpan.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div
//                   key={addr.id}
//                   className={`relative p-6 rounded-xl border-2 transition-all ${addr.is_default ? "border-gycora bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}
//                 >
//                   {addr.is_default && (
//                     <span className="absolute top-4 right-4 bg-gycora text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
//                       Utama
//                     </span>
//                   )}
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded">
//                       {addr.details.type === "home"
//                         ? "Rumah"
//                         : addr.details.type === "office"
//                           ? "Kantor"
//                           : "Lainnya"}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900">
//                     {addr.receiver.full_name}
//                   </h3>
//                   <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                     {addr.details.address_location} <br /> {addr.details.city},{" "}
//                     {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>
//                   <p className="mt-2 text-sm font-medium text-gray-500">
//                     Region: {addr.details.region}
//                   </p>
//                   <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-100">
//                     <button
//                       onClick={() => handleOpenModal(addr)}
//                       className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark"
//                     >
//                       Edit
//                     </button>
//                     <div className="w-px h-4 bg-gray-300"></div>
//                     <button
//                       onClick={() => handleDeleteAddress(addr.id)}
//                       className="text-sm font-bold text-red-500 transition-colors hover:text-red-700"
//                     >
//                       Hapus
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ======================================================= */}
//       {/* MODAL FORM EDIT PROFIL */}
//       {/* ======================================================= */}
//       {isProfileModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
//               <button
//                 onClick={() => setIsProfileModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-900"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan</label>
//                   <input
//                     type="text" required value={profileFormData.first_name}
//                     onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang</label>
//                   <input
//                     type="text" required value={profileFormData.last_name}
//                     onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
//                 <input
//                   type="email" required value={profileFormData.email}
//                   onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Nomor Telepon</label>
//                 <input
//                   type="tel" placeholder="Contoh: 081234567890" value={profileFormData.phone}
//                   onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setIsProfileModalOpen(false)}
//                   className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
//                 >
//                   Simpan Perubahan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ======================================================= */}
//       {/* MODAL FORM ALAMAT */}
//       {/* ======================================================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">
//                 {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitAddress} className="flex-1 p-6 space-y-6 overflow-y-auto">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan Penerima</label>
//                   <input
//                     type="text" required value={formData.first_name_address}
//                     onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang Penerima</label>
//                   <input
//                     type="text" required value={formData.last_name_address}
//                     onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Label Alamat (Rumah/Kantor)</label>
//                 <select
//                   value={formData.location_type}
//                   onChange={(e) => setFormData({ ...formData, location_type: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
//                 >
//                   <option value="home">Rumah</option>
//                   <option value="office">Kantor</option>
//                   <option value="other">Lainnya</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Alamat Lengkap (Jalan, RT/RW, Patokan)</label>
//                 <textarea
//                   required rows={3} value={formData.address_location}
//                   onChange={(e) => setFormData({ ...formData, address_location: e.target.value })}
//                   className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Provinsi</label>
//                   <input
//                     type="text" required value={formData.province}
//                     onChange={(e) => setFormData({ ...formData, province: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kota / Kabupaten</label>
//                   <input
//                     type="text" required value={formData.city}
//                     onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kecamatan / Region</label>
//                   <input
//                     type="text" required value={formData.region}
//                     onChange={(e) => setFormData({ ...formData, region: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Kode Pos</label>
//                   <input
//                     type="text" required value={formData.postal_code}
//                     onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
//                     className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
//                 <input
//                   type="checkbox" id="is_default" checked={formData.is_default}
//                   onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
//                   className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
//                 />
//                 <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                   Jadikan sebagai alamat utama
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button" onClick={() => setIsModalOpen(false)}
//                   className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-full shadow-lg transition-colors"
//                 >
//                   {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- IMPORT LEAFLET ---
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Memperbaiki bug ikon default Leaflet di React
// import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: iconRetina,
//   iconUrl: iconUrl,
//   shadowUrl: shadowUrl,
// });

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// export default function UserProfile() {
//   const navigate = useNavigate(); 
//   const [user, setUser] = useState<any>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- State Modal Alamat ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
  
//   // Default koordinat (Monas, Jakarta)
//   const defaultPosition: [number, number] = [-6.175392, 106.827153];
//   const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);

//   const [formData, setFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- State Modal Edit Profil ---
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [profileFormData, setProfileFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); 
//       return;
//     }

//     setUser(JSON.parse(storedUser));
//     fetchUserProfile(token);
//     fetchAddresses(token);
//   }, [navigate]); 

//   const fetchUserProfile = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/user`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//       });
//       if (res.ok) {
//         const freshUser = await res.json();
//         setUser(freshUser); 
//         localStorage.setItem("user_data", JSON.stringify(freshUser)); 
//       }
//     } catch (error) {
//       console.error("Gagal mengambil data profil terbaru:", error);
//     }
//   };

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addressArray = data.data ? data.data : data; 
//         setAddresses(addressArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal load alamat", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers Profil ---
//   const handleOpenProfileModal = () => {
//     setProfileFormData({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       phone: user.phone || "",
//     });
//     setIsProfileModalOpen(true);
//   };

//   const handleSubmitProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(profileFormData),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Profil Diperbarui!", timer: 1500, showConfirmButton: false });
//         setIsProfileModalOpen(false);
//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));
//         setTimeout(() => window.location.reload(), 1500);
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update profil:", error); 
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   // --- Handlers Peta & Geocoding ---
//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await res.json();
      
//       if (data && data.address) {
//         const { address } = data;
        
//         // Pemetaan dari OSM ke format form Anda
//         const newCity = address.city || address.town || address.county || "";
//         const newRegion = address.suburb || address.village || address.neighbourhood || "";
//         const newProvince = address.state || "";
//         const newPostal = address.postcode || "";
        
//         // Membentuk alamat jalan utama
//         const roadName = address.road || "";
//         const houseNumber = address.house_number || "";
//         const fullStreet = roadName ? `${roadName} ${houseNumber}`.trim() : data.display_name;

//         setFormData(prev => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),
//           address_location: fullStreet, 
//           city: newCity,
//           province: newProvince,
//           region: newRegion,
//           postal_code: newPostal
//         }));
//       }
//     } catch (error) {
//       console.error("Reverse Geocoding error:", error);
//     }
//   };

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setMapPosition([lat, lng]);
//           fetchAddressFromCoords(lat, lng);
//           setIsGettingLocation(false);
//         },
//         () => {
//           Swal.fire("Akses Ditolak", "Tolong izinkan akses lokasi di browser Anda.", "warning");
//           setIsGettingLocation(false);
//         }
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", "Browser Anda tidak mendukung fitur lokasi.", "error");
//       setIsGettingLocation(false);
//     }
//   };

//   // Komponen khusus untuk menangkap klik pada peta
//   const MapEvents = useCallback(() => {
//     useMapEvents({
//       click(e) {
//         setMapPosition([e.latlng.lat, e.latlng.lng]);
//         fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
//       },
//     });
//     return null;
//   }, []);

//   // Komponen khusus untuk mengatur center peta jika state mapPosition berubah
//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(position, map.getZoom());
//     }, [position, map]);
//     return null;
//   };

//   // --- Handlers Modal Alamat ---
//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
      
//       const lat = parseFloat(address.details.latitude);
//       const lng = parseFloat(address.details.longitude);
//       if (!isNaN(lat) && !isNaN(lng)) {
//         setMapPosition([lat, lng]);
//       } else {
//         setMapPosition(defaultPosition);
//       }

//       setFormData({
//         region: address.details.region || "",
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude || "",
//         longitude: address.details.longitude || "",
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setMapPosition(defaultPosition);
//       setFormData({
//         region: "", first_name_address: "", last_name_address: "", address_location: "",
//         city: "", province: "", postal_code: "", location_type: "home", 
//         latitude: "", longitude: "", is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Pastikan koordinat ada (validasi manual frontend)
//     if (!formData.latitude || !formData.longitude) {
//        Swal.fire("Pilih Lokasi", "Harap pilih titik lokasi pada peta.", "warning");
//        return;
//     }

//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId ? `${BASE_URL}/api/addresses/${editingId}` : `${BASE_URL}/api/addresses`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.", timer: 1500, showConfirmButton: false });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Hapus alamat?", text: "Tindakan ini tidak dapat dibatalkan.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Hapus",
//     });
//     if (result.isConfirmed) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/addresses/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses(token!);
//       Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-gray-50">
//       <div className="max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        
//         {/* --- PROFIL PENGGUNA --- */}
//         <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row md:items-center">
          
//           <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-tr from-gycora to-emerald-300 shrink-0">
//             {user.first_name.charAt(0)}{user.last_name.charAt(0)}
//           </div>
          
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-3xl font-extrabold text-gray-900">{user.first_name} {user.last_name}</h1>
//             <p className="mt-1 text-gray-500">{user.email}</p>
//             <p className="mt-1 text-sm text-gray-500">
//               {user.phone ? user.phone : <span className="italic">Belum ada nomor telepon</span>}
//             </p>
//             <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
//               Gycora Member
//             </div>
//           </div>
          
//           {/* SECTION POIN DAN TOMBOL */}
//           <div className="flex flex-col items-center w-full gap-4 md:items-end md:w-auto">
//             <div className="flex items-center w-full gap-4 px-5 py-3 border shadow-sm sm:w-auto border-gray-800/50 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl">
//               <div className="flex items-center justify-center w-10 h-10 text-gray-900 rounded-full shadow-inner bg-gycora">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                   <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Gycora Points</p>
//                 <p className="text-xl font-black text-white">
//                   {new Intl.NumberFormat('id-ID').format(user.point || 0)} <span className="text-xs font-medium text-gycora">Pts</span>
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
//               <button onClick={() => navigate("/favorites")} className="flex-1 px-6 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-sm sm:flex-none bg-gycora hover:bg-gycora-dark">
//                 Lihat Favorit
//               </button>
//               <button onClick={handleOpenProfileModal} className="flex-1 px-6 py-2 text-sm font-semibold text-gray-700 transition-colors border border-gray-300 rounded-full shadow-sm sm:flex-none hover:bg-gray-50">
//                 Edit Profil
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- BUKU ALAMAT --- */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-extrabold text-gray-900">Buku Alamat</h2>
//             <button onClick={() => handleOpenModal()} className="px-5 py-2 text-sm font-bold text-white transition-all bg-gray-900 rounded-full shadow-md hover:bg-black">
//               + Tambah Alamat
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="py-12 text-center border border-gray-300 border-dashed bg-gray-50 rounded-xl">
//               <p className="font-medium text-gray-500">Anda belum memiliki alamat tersimpan.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div key={addr.id} className={`relative p-6 rounded-xl border-2 transition-all ${addr.is_default ? "border-gycora bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}>
//                   {addr.is_default && (
//                     <span className="absolute top-4 right-4 bg-gycora text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
//                       Utama
//                     </span>
//                   )}
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded">
//                       {addr.details.type === "home" ? "Rumah" : addr.details.type === "office" ? "Kantor" : "Lainnya"}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900">{addr.receiver.full_name}</h3>
//                   <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                     {addr.details.address_location} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>
//                   <p className="mt-2 text-sm font-medium text-gray-500">Region: {addr.details.region}</p>
//                   <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-100">
//                     <button onClick={() => handleOpenModal(addr)} className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">Edit</button>
//                     <div className="w-px h-4 bg-gray-300"></div>
//                     <button onClick={() => handleDeleteAddress(addr.id)} className="text-sm font-bold text-red-500 transition-colors hover:text-red-700">Hapus</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MODAL FORM EDIT PROFIL --- */}
//       {isProfileModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
//               <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan</label>
//                   <input type="text" required value={profileFormData.first_name} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang</label>
//                   <input type="text" required value={profileFormData.last_name} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
//                 <input type="email" required value={profileFormData.email} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Nomor Telepon</label>
//                 <input type="tel" placeholder="Contoh: 081234567890" value={profileFormData.phone} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//               </div>
//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100">Batal</button>
//                 <button type="submit" className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark">Simpan Perubahan</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up overflow-y-auto pt-10 pb-10">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden my-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-lg font-bold text-gray-900">
//                 {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row h-auto md:h-[600px] overflow-y-auto">
//               {/* BAGIAN PETA (KIRI) */}
//               <div className="relative w-full h-64 md:h-full md:w-1/2 bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200">
//                 <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <Marker position={mapPosition}>
//                     <Popup>Lokasi yang dipilih</Popup>
//                   </Marker>
//                   <MapEvents />
//                   <MapCenterUpdater position={mapPosition} />
//                 </MapContainer>
                
//                 {/* Tombol Ambil Lokasi Saat Ini */}
//                 <button 
//                   type="button"
//                   onClick={handleGetCurrentLocation}
//                   disabled={isGettingLocation}
//                   className="absolute z-[1000] bottom-6 right-6 flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg font-bold text-xs hover:bg-gray-50 border border-gray-200"
//                 >
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-gycora border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-4 h-4 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   )}
//                   Gunakan Lokasi Saat Ini
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}
//               <form onSubmit={handleSubmitAddress} className="flex flex-col w-full p-6 space-y-6 md:w-1/2 overflow-y-auto custom-scrollbar">
                
//                 <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
//                   <p className="text-xs text-blue-800">
//                     <strong>Panduan:</strong> Geser dan klik pada peta di sebelah kiri untuk mengisi otomatis data alamat Anda. Anda tetap dapat mengedit isian di bawah ini secara manual.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Nama Depan</label>
//                     <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Nama Belakang</label>
//                     <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Detail Alamat (Jalan, Blok, Patokan)</label>
//                   <textarea required rows={3} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none bg-white"></textarea>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kecamatan/Desa</label>
//                     <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kota/Kabupaten</label>
//                     <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Provinsi</label>
//                     <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kode Pos</label>
//                     <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Label Alamat</label>
//                   <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white">
//                     <option value="home">Rumah</option>
//                     <option value="office">Kantor</option>
//                     <option value="other">Lainnya</option>
//                   </select>
//                 </div>

//                 {/* Hidden inputs untuk menyimpan titik Latitude dan Longitude yang nantinya akan dilempar ke backend Biteship jika diperlukan */}
//                 <input type="hidden" value={formData.latitude} />
//                 <input type="hidden" value={formData.longitude} />

//                 <div className="flex items-center gap-3 p-4 mt-2 border rounded-xl bg-emerald-50 border-emerald-100">
//                   <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora" />
//                   <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                     Jadikan Alamat Utama
//                   </label>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
//                     Batal
//                   </button>
//                   <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-full shadow-lg transition-colors">
//                     {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
//                   </button>
//                 </div>
//               </form>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- IMPORT LEAFLET ---
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Memperbaiki bug ikon default Leaflet di React
// import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: iconRetina,
//   iconUrl: iconUrl,
//   shadowUrl: shadowUrl,
// });

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// export default function UserProfile() {
//   const navigate = useNavigate(); 
//   const [user, setUser] = useState<any>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- State Modal Alamat ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
  
//   // Default koordinat (Monas, Jakarta)
//   const defaultPosition: [number, number] = [-6.175392, 106.827153];
//   const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);

//   const [formData, setFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- State Modal Edit Profil ---
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [profileFormData, setProfileFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   // --- STATE UNTUK UPLOAD FOTO PROFIL ---
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isUploadingImage, setIsUploadingImage] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); 
//       return;
//     }

//     setUser(JSON.parse(storedUser));
//     fetchUserProfile(token);
//     fetchAddresses(token);
//   }, [navigate]); 

//   const fetchUserProfile = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/user`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//       });
//       if (res.ok) {
//         const freshUser = await res.json();
//         setUser(freshUser); 
//         localStorage.setItem("user_data", JSON.stringify(freshUser)); 
//       }
//     } catch (error) {
//       console.error("Gagal mengambil data profil terbaru:", error);
//     }
//   };

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addressArray = data.data ? data.data : data; 
//         setAddresses(addressArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal load alamat", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers Profil ---
//   const handleOpenProfileModal = () => {
//     setProfileFormData({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       phone: user.phone || "",
//     });
//     setIsProfileModalOpen(true);
//   };

//   const handleSubmitProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(profileFormData),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Profil Diperbarui!", timer: 1500, showConfirmButton: false });
//         setIsProfileModalOpen(false);
//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));
//         // Kita tidak perlu reload halaman penuh, cukup biarkan React me-render ulang berdasarkan state 'user'
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update profil:", error); 
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   // --- FUNGSI UPLOAD GAMBAR PROFIL ---
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validasi ukuran dan tipe di frontend
//     if (file.size > 2 * 1024 * 1024) {
//       Swal.fire("Ukuran Terlalu Besar", "Maksimal ukuran foto adalah 2MB.", "warning");
//       return;
//     }
//     if (!file.type.startsWith('image/')) {
//       Swal.fire("Format Tidak Sesuai", "Harap unggah file berupa gambar (JPG, PNG).", "warning");
//       return;
//     }

//     setIsUploadingImage(true);
//     const token = localStorage.getItem("user_token");
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile/image`, {
//         method: "POST", // Di Laravel bisa POST untuk upload file baru
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Update state user lokal agar foto langsung berubah
//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));
//         Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Foto berhasil diperbarui", showConfirmButton: false, timer: 2000 });
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal mengunggah foto.", "error");
//       }
//     } catch (error) {
//       console.error("Error upload image:", error);
//       Swal.fire("Error", "Terjadi kesalahan pada server saat mengunggah gambar.", "error");
//     } finally {
//       setIsUploadingImage(false);
//       // Reset input agar pengguna bisa mengunggah file yang sama jika gagal
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   // --- Handlers Peta & Geocoding ---
//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await res.json();
      
//       if (data && data.address) {
//         const { address } = data;
        
//         const newCity = address.city || address.town || address.county || "";
//         const newRegion = address.suburb || address.village || address.neighbourhood || "";
//         const newProvince = address.state || "";
//         const newPostal = address.postcode || "";
        
//         const roadName = address.road || "";
//         const houseNumber = address.house_number || "";
//         const fullStreet = roadName ? `${roadName} ${houseNumber}`.trim() : data.display_name;

//         setFormData(prev => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),
//           address_location: fullStreet, 
//           city: newCity,
//           province: newProvince,
//           region: newRegion,
//           postal_code: newPostal
//         }));
//       }
//     } catch (error) {
//       console.error("Reverse Geocoding error:", error);
//     }
//   };

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setMapPosition([lat, lng]);
//           fetchAddressFromCoords(lat, lng);
//           setIsGettingLocation(false);
//         },
//         () => {
//           Swal.fire("Akses Ditolak", "Tolong izinkan akses lokasi di browser Anda.", "warning");
//           setIsGettingLocation(false);
//         }
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", "Browser Anda tidak mendukung fitur lokasi.", "error");
//       setIsGettingLocation(false);
//     }
//   };

//   const MapEvents = useCallback(() => {
//     useMapEvents({
//       click(e) {
//         setMapPosition([e.latlng.lat, e.latlng.lng]);
//         fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
//       },
//     });
//     return null;
//   }, []);

//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(position, map.getZoom());
//     }, [position, map]);
//     return null;
//   };

//   // --- Handlers Modal Alamat ---
//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
      
//       const lat = parseFloat(address.details.latitude);
//       const lng = parseFloat(address.details.longitude);
//       if (!isNaN(lat) && !isNaN(lng)) {
//         setMapPosition([lat, lng]);
//       } else {
//         setMapPosition(defaultPosition);
//       }

//       setFormData({
//         region: address.details.region || "",
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude || "",
//         longitude: address.details.longitude || "",
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setMapPosition(defaultPosition);
//       setFormData({
//         region: "", first_name_address: "", last_name_address: "", address_location: "",
//         city: "", province: "", postal_code: "", location_type: "home", 
//         latitude: "", longitude: "", is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.latitude || !formData.longitude) {
//        Swal.fire("Pilih Lokasi", "Harap pilih titik lokasi pada peta.", "warning");
//        return;
//     }

//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId ? `${BASE_URL}/api/addresses/${editingId}` : `${BASE_URL}/api/addresses`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.", timer: 1500, showConfirmButton: false });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Hapus alamat?", text: "Tindakan ini tidak dapat dibatalkan.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Hapus",
//     });
//     if (result.isConfirmed) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/addresses/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses(token!);
//       Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-gray-50">
//       <div className="max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        
//         {/* --- PROFIL PENGGUNA --- */}
//         <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row md:items-center">
          
//           {/* AREA FOTO PROFIL */}
//           <div className="relative group">
//             {user.profile_image ? (
//               <img 
//                 src={user.profile_image} 
//                 alt="Profile" 
//                 className="object-cover w-24 h-24 rounded-full shadow-md border-2 border-emerald-100"
//               />
//             ) : (
//               <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-tr from-gycora to-emerald-300">
//                 {user.first_name.charAt(0)}{user.last_name.charAt(0)}
//               </div>
//             )}
            
//             {/* Overlay Edit Button (Upload) */}
//             <button 
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isUploadingImage}
//               className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/50 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 disabled:cursor-not-allowed"
//               title="Ubah Foto Profil"
//             >
//               {isUploadingImage ? (
//                 <span className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
//               ) : (
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//               )}
//             </button>
//             <input 
//               type="file" 
//               ref={fileInputRef} 
//               onChange={handleImageUpload} 
//               accept="image/png, image/jpeg, image/jpg" 
//               className="hidden" 
//             />
//           </div>
          
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-3xl font-extrabold text-gray-900">{user.first_name} {user.last_name}</h1>
//             <p className="mt-1 text-gray-500">{user.email}</p>
//             <p className="mt-1 text-sm text-gray-500">
//               {user.phone ? user.phone : <span className="italic">Belum ada nomor telepon</span>}
//             </p>
//             <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
//               Gycora Member
//             </div>
//           </div>
          
//           {/* SECTION POIN DAN TOMBOL */}
//           <div className="flex flex-col items-center w-full gap-4 md:items-end md:w-auto">
//             <div className="flex items-center w-full gap-4 px-5 py-3 border shadow-sm sm:w-auto border-gray-800/50 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl">
//               <div className="flex items-center justify-center w-10 h-10 text-gray-900 rounded-full shadow-inner bg-gycora">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                   <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Gycora Points</p>
//                 <p className="text-xl font-black text-white">
//                   {new Intl.NumberFormat('id-ID').format(user.point || 0)} <span className="text-xs font-medium text-gycora">Pts</span>
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
//               <button onClick={() => navigate("/favorites")} className="flex-1 px-6 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-sm sm:flex-none bg-gycora hover:bg-gycora-dark">
//                 Lihat Favorit
//               </button>
//               <button onClick={handleOpenProfileModal} className="flex-1 px-6 py-2 text-sm font-semibold text-gray-700 transition-colors border border-gray-300 rounded-full shadow-sm sm:flex-none hover:bg-gray-50">
//                 Edit Profil
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- BUKU ALAMAT --- */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-extrabold text-gray-900">Buku Alamat</h2>
//             <button onClick={() => handleOpenModal()} className="px-5 py-2 text-sm font-bold text-white transition-all bg-gray-900 rounded-full shadow-md hover:bg-black">
//               + Tambah Alamat
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="py-12 text-center border border-gray-300 border-dashed bg-gray-50 rounded-xl">
//               <p className="font-medium text-gray-500">Anda belum memiliki alamat tersimpan.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div key={addr.id} className={`relative p-6 rounded-xl border-2 transition-all ${addr.is_default ? "border-gycora bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}>
//                   {addr.is_default && (
//                     <span className="absolute top-4 right-4 bg-gycora text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
//                       Utama
//                     </span>
//                   )}
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded">
//                       {addr.details.type === "home" ? "Rumah" : addr.details.type === "office" ? "Kantor" : "Lainnya"}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900">{addr.receiver.full_name}</h3>
//                   <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                     {addr.details.address_location} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>
//                   <p className="mt-2 text-sm font-medium text-gray-500">Region: {addr.details.region}</p>
//                   <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-100">
//                     <button onClick={() => handleOpenModal(addr)} className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">Edit</button>
//                     <div className="w-px h-4 bg-gray-300"></div>
//                     <button onClick={() => handleDeleteAddress(addr.id)} className="text-sm font-bold text-red-500 transition-colors hover:text-red-700">Hapus</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MODAL FORM EDIT PROFIL --- */}
//       {isProfileModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
//               <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan</label>
//                   <input type="text" required value={profileFormData.first_name} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang</label>
//                   <input type="text" required value={profileFormData.last_name} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
//                 <input type="email" required value={profileFormData.email} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Nomor Telepon</label>
//                 <input type="tel" placeholder="Contoh: 081234567890" value={profileFormData.phone} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//               </div>
//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100">Batal</button>
//                 <button type="submit" className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark">Simpan Perubahan</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up overflow-y-auto pt-10 pb-10">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden my-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-lg font-bold text-gray-900">
//                 {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row h-auto md:h-[600px] overflow-y-auto">
//               {/* BAGIAN PETA (KIRI) */}
//               <div className="relative w-full h-64 md:h-full md:w-1/2 bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200">
//                 <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <Marker position={mapPosition}>
//                     <Popup>Lokasi yang dipilih</Popup>
//                   </Marker>
//                   <MapEvents />
//                   <MapCenterUpdater position={mapPosition} />
//                 </MapContainer>
                
//                 {/* Tombol Ambil Lokasi Saat Ini */}
//                 <button 
//                   type="button"
//                   onClick={handleGetCurrentLocation}
//                   disabled={isGettingLocation}
//                   className="absolute z-[1000] bottom-6 right-6 flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg font-bold text-xs hover:bg-gray-50 border border-gray-200"
//                 >
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-gycora border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-4 h-4 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   )}
//                   Gunakan Lokasi Saat Ini
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}
//               <form onSubmit={handleSubmitAddress} className="flex flex-col w-full p-6 space-y-6 md:w-1/2 overflow-y-auto custom-scrollbar">
                
//                 <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
//                   <p className="text-xs text-blue-800">
//                     <strong>Panduan:</strong> Geser dan klik pada peta di sebelah kiri untuk mengisi otomatis data alamat Anda. Anda tetap dapat mengedit isian di bawah ini secara manual.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Nama Depan</label>
//                     <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Nama Belakang</label>
//                     <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Detail Alamat (Jalan, Blok, Patokan)</label>
//                   <textarea required rows={3} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none bg-white"></textarea>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kecamatan/Desa</label>
//                     <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kota/Kabupaten</label>
//                     <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Provinsi</label>
//                     <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kode Pos</label>
//                     <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Label Alamat</label>
//                   <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white">
//                     <option value="home">Rumah</option>
//                     <option value="office">Kantor</option>
//                     <option value="other">Lainnya</option>
//                   </select>
//                 </div>

//                 <input type="hidden" value={formData.latitude} />
//                 <input type="hidden" value={formData.longitude} />

//                 <div className="flex items-center gap-3 p-4 mt-2 border rounded-xl bg-emerald-50 border-emerald-100">
//                   <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora" />
//                   <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                     Jadikan Alamat Utama
//                   </label>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
//                     Batal
//                   </button>
//                   <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-full shadow-lg transition-colors">
//                     {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
//                   </button>
//                 </div>
//               </form>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- IMPORT LEAFLET ---
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Memperbaiki bug ikon default Leaflet di React
// import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: iconRetina,
//   iconUrl: iconUrl,
//   shadowUrl: shadowUrl,
// });

// interface Address {
//   id: number;
//   receiver: { first_name: string; last_name: string; full_name: string };
//   details: {
//     region: string;
//     address_location: string;
//     type: string;
//     city: string;
//     province: string;
//     postal_code: string;
//     latitude: string;
//     longitude: string;
//   };
//   is_default: boolean;
// }

// export default function UserProfile() {
//   const navigate = useNavigate(); 
//   const [user, setUser] = useState<any>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- State Modal Alamat ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
  
//   // Default koordinat (Monas, Jakarta)
//   const defaultPosition: [number, number] = [-6.175392, 106.827153];
//   const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);

//   const [formData, setFormData] = useState({
//     region: "",
//     first_name_address: "",
//     last_name_address: "",
//     address_location: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     location_type: "home",
//     latitude: "",
//     longitude: "",
//     is_default: false,
//   });

//   // --- State Modal Edit Profil ---
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [profileFormData, setProfileFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   });

//   // --- STATE UNTUK UPLOAD FOTO PROFIL ---
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isUploadingImage, setIsUploadingImage] = useState(false);

//   // --- STATE MODAL UBAH KATA SANDI ---
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [passwordFormData, setPasswordFormData] = useState({
//     old_password: "",
//     password: "",
//     password_confirmation: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const storedUser = localStorage.getItem("user_data");

//     if (!token || !storedUser) {
//       navigate("/login"); 
//       return;
//     }

//     setUser(JSON.parse(storedUser));
//     fetchUserProfile(token);
//     fetchAddresses(token);
//   }, [navigate]); 

//   const fetchUserProfile = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/user`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//       });
//       if (res.ok) {
//         const freshUser = await res.json();
//         setUser(freshUser); 
//         localStorage.setItem("user_data", JSON.stringify(freshUser)); 
//       }
//     } catch (error) {
//       console.error("Gagal mengambil data profil terbaru:", error);
//     }
//   };

//   const fetchAddresses = async (token: string) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/addresses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const addressArray = data.data ? data.data : data; 
//         setAddresses(addressArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal load alamat", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers Profil ---
//   const handleOpenProfileModal = () => {
//     setProfileFormData({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       phone: user.phone || "",
//     });
//     setIsProfileModalOpen(true);
//   };

//   const handleSubmitProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("user_token");

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(profileFormData),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Profil Diperbarui!", timer: 1500, showConfirmButton: false });
//         setIsProfileModalOpen(false);
//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update profil:", error); 
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   // --- FUNGSI UBAH KATA SANDI ---
//   const handleSubmitPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (passwordFormData.password !== passwordFormData.password_confirmation) {
//       Swal.fire("Peringatan", "Kata sandi baru dan konfirmasi tidak cocok.", "warning");
//       return;
//     }

//     if (passwordFormData.password.length < 8) {
//       Swal.fire("Peringatan", "Kata sandi minimal 8 karakter.", "warning");
//       return;
//     }

//     const token = localStorage.getItem("user_token");
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/profile/password`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, "Accept": "application/json" },
//         body: JSON.stringify(passwordFormData),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Berhasil", text: "Kata sandi berhasil diperbarui.", timer: 1500, showConfirmButton: false });
//         setIsPasswordModalOpen(false);
//         setPasswordFormData({ old_password: "", password: "", password_confirmation: "" }); // Reset form
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal mengubah kata sandi", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update password:", error);
//       Swal.fire("Error", "Terjadi kesalahan pada server.", "error");
//     }
//   };

//   // --- FUNGSI UPLOAD GAMBAR PROFIL ---
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       Swal.fire("Ukuran Terlalu Besar", "Maksimal ukuran foto adalah 2MB.", "warning");
//       return;
//     }
//     if (!file.type.startsWith('image/')) {
//       Swal.fire("Format Tidak Sesuai", "Harap unggah file berupa gambar (JPG, PNG).", "warning");
//       return;
//     }

//     setIsUploadingImage(true);
//     const token = localStorage.getItem("user_token");
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const res = await fetch(`${BASE_URL}/api/profile/image`, {
//         method: "POST", 
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));
//         Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Foto berhasil diperbarui", showConfirmButton: false, timer: 2000 });
//       } else {
//         Swal.fire("Gagal", data.message || "Gagal mengunggah foto.", "error");
//       }
//     } catch (error) {
//       console.error("Error upload image:", error);
//       Swal.fire("Error", "Terjadi kesalahan pada server saat mengunggah gambar.", "error");
//     } finally {
//       setIsUploadingImage(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   // --- Handlers Peta & Geocoding ---
//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await res.json();
      
//       if (data && data.address) {
//         const { address } = data;
        
//         const newCity = address.city || address.town || address.county || "";
//         const newRegion = address.suburb || address.village || address.neighbourhood || "";
//         const newProvince = address.state || "";
//         const newPostal = address.postcode || "";
        
//         const roadName = address.road || "";
//         const houseNumber = address.house_number || "";
//         const fullStreet = roadName ? `${roadName} ${houseNumber}`.trim() : data.display_name;

//         setFormData(prev => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),
//           address_location: fullStreet, 
//           city: newCity,
//           province: newProvince,
//           region: newRegion,
//           postal_code: newPostal
//         }));
//       }
//     } catch (error) {
//       console.error("Reverse Geocoding error:", error);
//     }
//   };

//   const handleGetCurrentLocation = () => {
//     setIsGettingLocation(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setMapPosition([lat, lng]);
//           fetchAddressFromCoords(lat, lng);
//           setIsGettingLocation(false);
//         },
//         () => {
//           Swal.fire("Akses Ditolak", "Tolong izinkan akses lokasi di browser Anda.", "warning");
//           setIsGettingLocation(false);
//         }
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", "Browser Anda tidak mendukung fitur lokasi.", "error");
//       setIsGettingLocation(false);
//     }
//   };

//   const MapEvents = useCallback(() => {
//     useMapEvents({
//       click(e) {
//         setMapPosition([e.latlng.lat, e.latlng.lng]);
//         fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
//       },
//     });
//     return null;
//   }, []);

//   const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(position, map.getZoom());
//     }, [position, map]);
//     return null;
//   };

//   // --- Handlers Modal Alamat ---
//   const handleOpenModal = (address: Address | null = null) => {
//     if (address) {
//       setEditingId(address.id);
      
//       const lat = parseFloat(address.details.latitude);
//       const lng = parseFloat(address.details.longitude);
//       if (!isNaN(lat) && !isNaN(lng)) {
//         setMapPosition([lat, lng]);
//       } else {
//         setMapPosition(defaultPosition);
//       }

//       setFormData({
//         region: address.details.region || "",
//         first_name_address: address.receiver.first_name,
//         last_name_address: address.receiver.last_name,
//         address_location: address.details.address_location,
//         city: address.details.city,
//         province: address.details.province,
//         postal_code: address.details.postal_code,
//         location_type: address.details.type,
//         latitude: address.details.latitude || "",
//         longitude: address.details.longitude || "",
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingId(null);
//       setMapPosition(defaultPosition);
//       setFormData({
//         region: "", first_name_address: "", last_name_address: "", address_location: "",
//         city: "", province: "", postal_code: "", location_type: "home", 
//         latitude: "", longitude: "", is_default: false,
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmitAddress = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.latitude || !formData.longitude) {
//        Swal.fire("Pilih Lokasi", "Harap pilih titik lokasi pada peta.", "warning");
//        return;
//     }

//     const token = localStorage.getItem("user_token");
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId ? `${BASE_URL}/api/addresses/${editingId}` : `${BASE_URL}/api/addresses`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.", timer: 1500, showConfirmButton: false });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Hapus alamat?", text: "Tindakan ini tidak dapat dibatalkan.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Hapus",
//     });
//     if (result.isConfirmed) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/addresses/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses(token!);
//       Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-gray-50">
//       <div className="max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        
//         {/* --- PROFIL PENGGUNA --- */}
//         <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row md:items-center">
          
//           {/* AREA FOTO PROFIL */}
//           <div className="relative group shrink-0">
//             {user.profile_image ? (
//               <img 
//                 src={user.profile_image} 
//                 alt="Profile" 
//                 className="object-cover w-24 h-24 border-2 rounded-full shadow-md border-emerald-100"
//               />
//             ) : (
//               <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-tr from-gycora to-emerald-300">
//                 {user.first_name.charAt(0)}{user.last_name.charAt(0)}
//               </div>
//             )}
            
//             <button 
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isUploadingImage}
//               className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 cursor-pointer bg-black/50 group-hover:opacity-100 disabled:cursor-not-allowed"
//               title="Ubah Foto Profil"
//             >
//               {isUploadingImage ? (
//                 <span className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
//               ) : (
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//               )}
//             </button>
//             <input 
//               type="file" 
//               ref={fileInputRef} 
//               onChange={handleImageUpload} 
//               accept="image/png, image/jpeg, image/jpg" 
//               className="hidden" 
//             />
//           </div>
          
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-3xl font-extrabold text-gray-900">{user.first_name} {user.last_name}</h1>
//             <p className="mt-1 text-gray-500">{user.email}</p>
//             <p className="mt-1 text-sm text-gray-500">
//               {user.phone ? user.phone : <span className="italic">Belum ada nomor telepon</span>}
//             </p>
//             <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
//               Gycora Member
//             </div>
//           </div>
          
//           {/* SECTION POIN DAN TOMBOL */}
//           <div className="flex flex-col items-center w-full gap-4 md:items-end md:w-auto">
//             <div className="flex items-center w-full gap-4 px-5 py-3 border shadow-sm sm:w-auto border-gray-800/50 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl">
//               <div className="flex items-center justify-center w-10 h-10 text-gray-900 rounded-full shadow-inner bg-gycora">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                   <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Gycora Points</p>
//                 <p className="text-xl font-black text-white">
//                   {new Intl.NumberFormat('id-ID').format(user.point || 0)} <span className="text-xs font-medium text-gycora">Pts</span>
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col w-full gap-2 sm:w-auto">
//               <div className="flex gap-2 w-full">
//                 <button onClick={() => navigate("/favorites")} className="flex-1 px-4 py-2 text-xs font-bold text-white transition-colors rounded-full shadow-sm bg-gycora hover:bg-gycora-dark">
//                   Lihat Favorit
//                 </button>
//                 <button onClick={handleOpenProfileModal} className="flex-1 px-4 py-2 text-xs font-semibold text-gray-700 transition-colors border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
//                   Edit Profil
//                 </button>
//               </div>
//               {/* TOMBOL UBAH PASSWORD */}
//               <button onClick={() => setIsPasswordModalOpen(true)} className="w-full px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gycora hover:bg-gray-50">
//                 Ubah Kata Sandi
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- BUKU ALAMAT --- */}
//         <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-extrabold text-gray-900">Buku Alamat</h2>
//             <button onClick={() => handleOpenModal()} className="px-5 py-2 text-sm font-bold text-white transition-all bg-gray-900 rounded-full shadow-md hover:bg-black">
//               + Tambah Alamat
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="py-12 text-center border border-gray-300 border-dashed bg-gray-50 rounded-xl">
//               <p className="font-medium text-gray-500">Anda belum memiliki alamat tersimpan.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div key={addr.id} className={`relative p-6 rounded-xl border-2 transition-all ${addr.is_default ? "border-gycora bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}>
//                   {addr.is_default && (
//                     <span className="absolute top-4 right-4 bg-gycora text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
//                       Utama
//                     </span>
//                   )}
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded">
//                       {addr.details.type === "home" ? "Rumah" : addr.details.type === "office" ? "Kantor" : "Lainnya"}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900">{addr.receiver.full_name}</h3>
//                   <p className="mt-2 text-sm leading-relaxed text-gray-600">
//                     {addr.details.address_location} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>
//                   <p className="mt-2 text-sm font-medium text-gray-500">Region: {addr.details.region}</p>
//                   <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-100">
//                     <button onClick={() => handleOpenModal(addr)} className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">Edit</button>
//                     <div className="w-px h-4 bg-gray-300"></div>
//                     <button onClick={() => handleDeleteAddress(addr.id)} className="text-sm font-bold text-red-500 transition-colors hover:text-red-700">Hapus</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MODAL FORM EDIT PROFIL --- */}
//       {isProfileModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
//               <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Depan</label>
//                   <input type="text" required value={profileFormData.first_name} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                 </div>
//                 <div>
//                   <label className="block mb-1 text-sm font-semibold text-gray-700">Nama Belakang</label>
//                   <input type="text" required value={profileFormData.last_name} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
//                 <input type="email" required value={profileFormData.email} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//               </div>
//               <div>
//                 <label className="block mb-1 text-sm font-semibold text-gray-700">Nomor Telepon</label>
//                 <input type="tel" placeholder="Contoh: 081234567890" value={profileFormData.phone} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//               </div>
//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100">Batal</button>
//                 <button type="submit" className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark">Simpan Perubahan</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM UBAH KATA SANDI --- */}
//       {isPasswordModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-2xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-lg font-bold text-gray-900">Ubah Kata Sandi</h3>
//               <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitPassword} className="p-6 space-y-4">
//               <div>
//                 <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">Kata Sandi Lama</label>
//                 <input 
//                   type="password" required value={passwordFormData.old_password} 
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, old_password: e.target.value })} 
//                   className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" 
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">Kata Sandi Baru</label>
//                 <input 
//                   type="password" required minLength={8} value={passwordFormData.password} 
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password: e.target.value })} 
//                   className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" 
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">Konfirmasi Kata Sandi Baru</label>
//                 <input 
//                   type="password" required minLength={8} value={passwordFormData.password_confirmation} 
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password_confirmation: e.target.value })} 
//                   className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" 
//                 />
//               </div>
              
//               <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100">Batal</button>
//                 <button type="submit" className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gray-900 hover:bg-black">Ubah Sandi</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up overflow-y-auto pt-10 pb-10">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden my-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-lg font-bold text-gray-900">
//                 {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row h-auto md:h-[600px] overflow-y-auto">
//               {/* BAGIAN PETA (KIRI) */}
//               <div className="relative w-full h-64 md:h-full md:w-1/2 bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200">
//                 <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <Marker position={mapPosition}>
//                     <Popup>Lokasi yang dipilih</Popup>
//                   </Marker>
//                   <MapEvents />
//                   <MapCenterUpdater position={mapPosition} />
//                 </MapContainer>
                
//                 {/* Tombol Ambil Lokasi Saat Ini */}
//                 <button 
//                   type="button"
//                   onClick={handleGetCurrentLocation}
//                   disabled={isGettingLocation}
//                   className="absolute z-[1000] bottom-6 right-6 flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg font-bold text-xs hover:bg-gray-50 border border-gray-200"
//                 >
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-gycora border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-4 h-4 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   )}
//                   Gunakan Lokasi Saat Ini
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}
//               <form onSubmit={handleSubmitAddress} className="flex flex-col w-full p-6 space-y-6 md:w-1/2 overflow-y-auto custom-scrollbar">
                
//                 <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
//                   <p className="text-xs text-blue-800">
//                     <strong>Panduan:</strong> Geser dan klik pada peta di sebelah kiri untuk mengisi otomatis data alamat Anda. Anda tetap dapat mengedit isian di bawah ini secara manual.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Nama Depan</label>
//                     <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Nama Belakang</label>
//                     <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Detail Alamat (Jalan, Blok, Patokan)</label>
//                   <textarea required rows={3} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none bg-white"></textarea>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kecamatan/Desa</label>
//                     <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kota/Kabupaten</label>
//                     <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Provinsi</label>
//                     <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Kode Pos</label>
//                     <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase">Label Alamat</label>
//                   <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white">
//                     <option value="home">Rumah</option>
//                     <option value="office">Kantor</option>
//                     <option value="other">Lainnya</option>
//                   </select>
//                 </div>

//                 <input type="hidden" value={formData.latitude} />
//                 <input type="hidden" value={formData.longitude} />

//                 <div className="flex items-center gap-3 p-4 mt-2 border rounded-xl bg-emerald-50 border-emerald-100">
//                   <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora" />
//                   <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-emerald-800">
//                     Jadikan Alamat Utama
//                   </label>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
//                     Batal
//                   </button>
//                   <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-full shadow-lg transition-colors">
//                     {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
//                   </button>
//                 </div>
//               </form>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

// --- IMPORT LEAFLET ---
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Memperbaiki bug ikon default Leaflet di React
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

interface Address {
  id: number;
  receiver: { first_name: string; last_name: string; full_name: string };
  details: {
    region: string;
    address_location: string;
    type: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: string;
    longitude: string;
  };
  is_default: boolean;
}

export default function UserProfile() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  // --- State Modal Alamat ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Default koordinat (Monas, Jakarta)
  const defaultPosition: [number, number] = [-6.175392, 106.827153];
  const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const [formData, setFormData] = useState({
    region: "",
    first_name_address: "",
    last_name_address: "",
    address_location: "",
    city: "",
    province: "",
    postal_code: "",
    location_type: "home",
    latitude: "",
    longitude: "",
    is_default: false,
  });

  // --- State Modal Edit Profil ---
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // --- STATE UNTUK UPLOAD FOTO PROFIL ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // --- STATE MODAL UBAH KATA SANDI ---
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const storedUser = localStorage.getItem("user_data");

    if (!token || !storedUser) {
      navigate("/login"); 
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchUserProfile(token);
    fetchAddresses(token);
  }, [navigate]); 

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.ok) {
        const freshUser = await res.json();
        setUser(freshUser); 
        localStorage.setItem("user_data", JSON.stringify(freshUser)); 
      }
    } catch (error) {
      console.error("Gagal mengambil data profil terbaru:", error);
    }
  };

  const fetchAddresses = async (token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const addressArray = data.data ? data.data : data; 
        setAddresses(addressArray || []);
      }
    } catch (error) {
      console.error("Gagal load alamat", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers Profil ---
  const handleOpenProfileModal = () => {
    setProfileFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone || "",
    });
    setIsProfileModalOpen(true);
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");

    try {
      const res = await fetch(`${BASE_URL}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileFormData),
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Profil Diperbarui!", timer: 1500, showConfirmButton: false });
        setIsProfileModalOpen(false);
        setUser(data.user);
        localStorage.setItem("user_data", JSON.stringify(data.user));
      } else {
        Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
      }
    } catch (error) {
      console.error("Gagal update profil:", error); 
      Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  // --- FUNGSI UBAH KATA SANDI ---
  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordFormData.password !== passwordFormData.password_confirmation) {
      Swal.fire("Peringatan", "Kata sandi baru dan konfirmasi tidak cocok.", "warning");
      return;
    }

    if (passwordFormData.password.length < 8) {
      Swal.fire("Peringatan", "Kata sandi minimal 8 karakter.", "warning");
      return;
    }

    const token = localStorage.getItem("user_token");
    
    try {
      const res = await fetch(`${BASE_URL}/api/profile/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, "Accept": "application/json" },
        body: JSON.stringify(passwordFormData),
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Berhasil", text: "Kata sandi berhasil diperbarui.", timer: 1500, showConfirmButton: false });
        setIsPasswordModalOpen(false);
        setPasswordFormData({ old_password: "", password: "", password_confirmation: "" }); // Reset form
      } else {
        Swal.fire("Gagal", data.message || "Gagal mengubah kata sandi", "error");
      }
    } catch (error) {
      console.error("Gagal update password:", error);
      Swal.fire("Error", "Terjadi kesalahan pada server.", "error");
    }
  };

  // --- FUNGSI UPLOAD GAMBAR PROFIL ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire("Ukuran Terlalu Besar", "Maksimal ukuran foto adalah 2MB.", "warning");
      return;
    }
    if (!file.type.startsWith('image/')) {
      Swal.fire("Format Tidak Sesuai", "Harap unggah file berupa gambar (JPG, PNG).", "warning");
      return;
    }

    setIsUploadingImage(true);
    const token = localStorage.getItem("user_token");
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${BASE_URL}/api/profile/image`, {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user_data", JSON.stringify(data.user));
        Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Foto berhasil diperbarui", showConfirmButton: false, timer: 2000 });
      } else {
        Swal.fire("Gagal", data.message || "Gagal mengunggah foto.", "error");
      }
    } catch (error) {
      console.error("Error upload image:", error);
      Swal.fire("Error", "Terjadi kesalahan pada server saat mengunggah gambar.", "error");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // --- Handlers Peta & Geocoding ---
  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      
      if (data && data.address) {
        const { address } = data;
        
        const newCity = address.city || address.town || address.county || "";
        const newRegion = address.suburb || address.village || address.neighbourhood || "";
        const newProvince = address.state || "";
        const newPostal = address.postcode || "";
        
        const roadName = address.road || "";
        const houseNumber = address.house_number || "";
        const fullStreet = roadName ? `${roadName} ${houseNumber}`.trim() : data.display_name;

        setFormData(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
          address_location: fullStreet, 
          city: newCity,
          province: newProvince,
          region: newRegion,
          postal_code: newPostal
        }));
      }
    } catch (error) {
      console.error("Reverse Geocoding error:", error);
    }
  };

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapPosition([lat, lng]);
          fetchAddressFromCoords(lat, lng);
          setIsGettingLocation(false);
        },
        () => {
          Swal.fire("Akses Ditolak", "Tolong izinkan akses lokasi di browser Anda.", "warning");
          setIsGettingLocation(false);
        }
      );
    } else {
      Swal.fire("Tidak Mendukung", "Browser Anda tidak mendukung fitur lokasi.", "error");
      setIsGettingLocation(false);
    }
  };

  const MapEvents = useCallback(() => {
    useMapEvents({
      click(e) {
        setMapPosition([e.latlng.lat, e.latlng.lng]);
        fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }, []);

  const MapCenterUpdater = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom());
    }, [position, map]);
    return null;
  };

  // --- Handlers Modal Alamat ---
  const handleOpenModal = (address: Address | null = null) => {
    if (address) {
      setEditingId(address.id);
      
      const lat = parseFloat(address.details.latitude);
      const lng = parseFloat(address.details.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapPosition([lat, lng]);
      } else {
        setMapPosition(defaultPosition);
      }

      setFormData({
        region: address.details.region || "",
        first_name_address: address.receiver.first_name,
        last_name_address: address.receiver.last_name,
        address_location: address.details.address_location,
        city: address.details.city,
        province: address.details.province,
        postal_code: address.details.postal_code,
        location_type: address.details.type,
        latitude: address.details.latitude || "",
        longitude: address.details.longitude || "",
        is_default: address.is_default,
      });
    } else {
      setEditingId(null);
      setMapPosition(defaultPosition);
      setFormData({
        region: "", first_name_address: "", last_name_address: "", address_location: "",
        city: "", province: "", postal_code: "", location_type: "home", 
        latitude: "", longitude: "", is_default: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.latitude || !formData.longitude) {
       Swal.fire("Pilih Lokasi", "Harap pilih titik lokasi pada peta.", "warning");
       return;
    }

    const token = localStorage.getItem("user_token");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${BASE_URL}/api/addresses/${editingId}` : `${BASE_URL}/api/addresses`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.", timer: 1500, showConfirmButton: false });
        setIsModalOpen(false);
        fetchAddresses(token!);
      } else {
        throw new Error("Gagal menyimpan alamat");
      }
    } catch (error) {
      console.error("Gagal submit alamat:", error);
      Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus alamat?", text: "Tindakan ini tidak dapat dibatalkan.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Hapus",
    });
    if (result.isConfirmed) {
      const token = localStorage.getItem("user_token");
      await fetch(`${BASE_URL}/api/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses(token!);
      Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-[#006A4E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 font-sans bg-[#FAFAFA] animate-fade-in">
      
      {/* --- HERO BACKDROP --- */}
      <div className="absolute top-0 left-0 w-full h-64 bg-emerald-800 rounded-b-[3rem] shadow-sm z-0 hidden md:block pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        
        {/* --- PROFIL PENGGUNA --- */}
        <div className="flex flex-col items-center gap-8 p-8 bg-white border border-gray-100 shadow-xl rounded-3xl md:flex-row md:items-start md:mt-8">
          
          {/* AREA FOTO PROFIL */}
          <div className="relative group shrink-0">
            {user.profile_image ? (
              <img 
                src={user.profile_image} 
                alt="Profile" 
                className="object-cover border-4 border-white rounded-full shadow-lg w-28 h-28 md:w-36 md:h-36 bg-gray-50"
              />
            ) : (
              <div className="flex items-center justify-center border-4 border-white rounded-full shadow-lg w-28 h-28 md:w-36 md:h-36 text-4xl md:text-5xl font-bold text-[#006A4E] uppercase bg-emerald-50">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </div>
            )}
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 cursor-pointer bg-black/40 backdrop-blur-sm group-hover:opacity-100 disabled:cursor-not-allowed"
              title="Ubah Foto Profil"
            >
              {isUploadingImage ? (
                <span className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/png, image/jpeg, image/jpg" 
              className="hidden" 
            />
          </div>
          
          <div className="flex-1 text-center md:text-left pt-2 md:pt-4">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{user.first_name} {user.last_name}</h1>
            <p className="mt-1.5 text-gray-500 font-medium">{user.email}</p>
            <p className="mt-1 text-sm text-gray-400">
              {user.phone ? user.phone : <span className="italic">Belum menambahkan nomor telepon</span>}
            </p>
            {user.is_membership && (
               <div className="inline-flex items-center px-4 py-1 mt-4 text-xs font-bold tracking-widest uppercase border rounded-full bg-emerald-50 text-emerald-800 border-emerald-200">
                 Gycora VIP Member
               </div>
            )}
          </div>
          
          {/* SECTION POIN DAN TOMBOL */}
          <div className="flex flex-col items-center w-full gap-4 md:items-end md:w-auto md:pt-4">
            <div className="flex items-center w-full gap-5 px-6 py-4 border shadow-sm sm:w-auto border-gray-100 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center w-12 h-12 text-white rounded-full shadow-inner bg-[#006A4E]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Loyalty Points</p>
                <p className="text-2xl font-black text-gray-900">
                  {new Intl.NumberFormat('id-ID').format(user.point || 0)} <span className="text-sm font-bold text-[#006A4E]">Pts</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
              <button onClick={() => navigate("/favorites")} className="px-5 py-2.5 text-xs font-bold text-white uppercase tracking-widest transition-colors rounded-xl shadow-md bg-[#006A4E] hover:bg-emerald-900 border border-transparent">
                Favorit
              </button>
              <button onClick={handleOpenProfileModal} className="px-5 py-2.5 text-xs font-bold text-gray-700 uppercase tracking-widest transition-colors border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 bg-white">
                Edit Profil
              </button>
            </div>
            
            <button onClick={() => setIsPasswordModalOpen(true)} className="text-[11px] font-bold tracking-wider text-gray-400 transition-colors hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 mt-2">
              Ubah Kata Sandi
            </button>
          </div>
        </div>

        {/* --- BUKU ALAMAT --- */}
        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
          <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
            <div>
               <h2 className="text-2xl font-extrabold text-gray-900">Buku Alamat</h2>
               <p className="text-sm text-gray-500 mt-1">Kelola alamat pengiriman untuk mempermudah checkout.</p>
            </div>
            <button onClick={() => handleOpenModal()} className="px-5 py-2.5 text-xs font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-xl shadow-md hover:bg-black w-full sm:w-auto">
              + Tambah Alamat
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="py-16 text-center border-2 border-gray-200 border-dashed bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <p className="font-bold text-gray-600">Buku alamat Anda masih kosong.</p>
              <p className="text-sm text-gray-400 mt-1">Tambahkan alamat baru untuk mulai berbelanja.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {addresses.map((addr) => (
                <div key={addr.id} className={`relative p-6 rounded-2xl border-2 transition-all ${addr.is_default ? "border-[#006A4E] bg-emerald-50/20" : "border-gray-100 hover:border-gray-200 bg-white"}`}>
                  {addr.is_default && (
                    <span className="absolute top-5 right-5 bg-[#006A4E] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                      Utama
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase bg-gray-100 rounded">
                      {addr.details.type === "home" ? "Rumah" : addr.details.type === "office" ? "Kantor" : "Lainnya"}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{addr.receiver.full_name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {addr.details.address_location} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.postal_code}
                  </p>
                  <p className="mt-2 text-xs font-bold text-gray-400">Region: <span className="font-medium text-gray-600">{addr.details.region}</span></p>
                  
                  <div className="flex items-center gap-4 pt-5 mt-5 border-t border-gray-100">
                    <button onClick={() => handleOpenModal(addr)} className="text-xs font-bold tracking-widest uppercase transition-colors text-[#006A4E] hover:text-emerald-900">Edit</button>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs font-bold tracking-widest uppercase text-red-500 transition-colors hover:text-red-700">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL FORM EDIT PROFIL --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-gray-900">Edit Profil</h3>
              <button onClick={() => setIsProfileModalOpen(false)} className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmitProfile} className="p-6 space-y-5 bg-gray-50/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">Nama Depan</label>
                  <input type="text" required value={profileFormData.first_name} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block mb-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">Nama Belakang</label>
                  <input type="text" required value={profileFormData.last_name} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all shadow-sm" />
                </div>
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">Email</label>
                <input type="email" required value={profileFormData.email} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">Nomor Telepon</label>
                <input type="tel" placeholder="Contoh: 081234567890" value={profileFormData.phone} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all shadow-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-6 py-2.5 text-xs font-bold tracking-widest text-gray-600 uppercase transition-colors bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Batal</button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold tracking-widest text-white uppercase transition-colors shadow-md rounded-xl bg-[#006A4E] hover:bg-emerald-900">Simpan Profil</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FORM UBAH KATA SANDI --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="flex flex-col w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-gray-900">Ubah Kata Sandi</h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmitPassword} className="p-6 space-y-5 bg-gray-50/30">
              <div>
                <label className="block mb-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">Kata Sandi Lama</label>
                <input 
                  type="password" required value={passwordFormData.old_password} 
                  onChange={(e) => setPasswordFormData({ ...passwordFormData, old_password: e.target.value })} 
                  className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all shadow-sm" 
                />
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">Kata Sandi Baru</label>
                <input 
                  type="password" required minLength={8} value={passwordFormData.password} 
                  onChange={(e) => setPasswordFormData({ ...passwordFormData, password: e.target.value })} 
                  className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all shadow-sm" 
                />
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase">Konfirmasi Kata Sandi Baru</label>
                <input 
                  type="password" required minLength={8} value={passwordFormData.password_confirmation} 
                  onChange={(e) => setPasswordFormData({ ...passwordFormData, password_confirmation: e.target.value })} 
                  className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all shadow-sm" 
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-6 py-2.5 text-xs font-bold tracking-widest text-gray-600 uppercase transition-colors bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Batal</button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold tracking-widest text-white uppercase transition-colors bg-gray-900 shadow-md rounded-xl hover:bg-black">Ubah Sandi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up overflow-y-auto pt-10 pb-10">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden my-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
              <h3 className="text-xl font-extrabold text-gray-900">
                {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row h-auto md:h-[600px] overflow-hidden">
              {/* BAGIAN PETA (KIRI) */}
              <div className="relative w-full h-64 md:h-full md:w-1/2 bg-gray-100 border-b md:border-b-0 md:border-r border-gray-100">
                <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true} className="z-10">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={mapPosition}>
                    <Popup>Lokasi pengiriman Anda</Popup>
                  </Marker>
                  <MapEvents />
                  <MapCenterUpdater position={mapPosition} />
                </MapContainer>
                
                {/* Tombol Ambil Lokasi Saat Ini */}
                <button 
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isGettingLocation}
                  className="absolute z-[1000] bottom-6 right-6 flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all"
                >
                  {isGettingLocation ? (
                    <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
                  ) : (
                    <svg className="w-4 h-4 text-[#006A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                  Gunakan Lokasi Saat Ini
                </button>
              </div>

              {/* BAGIAN FORM (KANAN) */}
              <form onSubmit={handleSubmitAddress} className="flex flex-col w-full p-8 space-y-6 md:w-1/2 overflow-y-auto custom-scrollbar bg-gray-50/30">
                
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <p className="text-xs font-medium leading-relaxed text-emerald-800">
                    <strong className="block mb-1 text-sm">Panduan Lokasi</strong>
                    Geser dan klik pada peta di sebelah kiri untuk mengisi otomatis data alamat Anda. Anda tetap dapat mengedit isian secara manual.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Nama Depan</label>
                    <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Nama Belakang</label>
                    <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Detail Alamat (Jalan, Blok, Patokan)</label>
                  <textarea required rows={3} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Kecamatan/Desa</label>
                    <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Kota/Kabupaten</label>
                    <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Provinsi</label>
                    <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Kode Pos</label>
                    <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Label Alamat</label>
                  <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-3 text-sm bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all cursor-pointer">
                    <option value="home">Rumah</option>
                    <option value="office">Kantor</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <input type="hidden" value={formData.latitude} />
                <input type="hidden" value={formData.longitude} />

                <div className="flex items-center gap-3 p-4 mt-2 bg-white border border-gray-200 shadow-sm rounded-xl">
                  <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]" />
                  <label htmlFor="is_default" className="text-sm font-bold cursor-pointer select-none text-gray-800">
                    Jadikan Alamat Pengiriman Utama
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-xs font-bold tracking-widest text-gray-600 uppercase transition-colors bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                    Batal
                  </button>
                  <button type="submit" className="px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors bg-gray-900 shadow-md rounded-xl hover:bg-black">
                    {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}