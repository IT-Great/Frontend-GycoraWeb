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
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-4xl my-auto overflow-hidden bg-white shadow-2xl rounded-2xl">
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
//               <div className="relative w-full h-64 bg-gray-100 border-b border-gray-200 md:h-full md:w-1/2 md:border-b-0 md:border-r">
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
//               <form onSubmit={handleSubmitAddress} className="flex flex-col w-full p-6 space-y-6 overflow-y-auto md:w-1/2 custom-scrollbar">

//                 <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
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
//                 className="object-cover w-24 h-24 border-2 rounded-full shadow-md border-emerald-100"
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
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-4xl my-auto overflow-hidden bg-white shadow-2xl rounded-2xl">
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
//               <div className="relative w-full h-64 bg-gray-100 border-b border-gray-200 md:h-full md:w-1/2 md:border-b-0 md:border-r">
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
//               <form onSubmit={handleSubmitAddress} className="flex flex-col w-full p-6 space-y-6 overflow-y-auto md:w-1/2 custom-scrollbar">

//                 <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
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
//               <div className="flex w-full gap-2">
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
//                 <label className="block mb-1 text-xs font-semibold tracking-wide text-gray-700 uppercase">Kata Sandi Lama</label>
//                 <input
//                   type="password" required value={passwordFormData.old_password}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, old_password: e.target.value })}
//                   className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-xs font-semibold tracking-wide text-gray-700 uppercase">Kata Sandi Baru</label>
//                 <input
//                   type="password" required minLength={8} value={passwordFormData.password}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password: e.target.value })}
//                   className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 text-xs font-semibold tracking-wide text-gray-700 uppercase">Konfirmasi Kata Sandi Baru</label>
//                 <input
//                   type="password" required minLength={8} value={passwordFormData.password_confirmation}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password_confirmation: e.target.value })}
//                   className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100">Batal</button>
//                 <button type="submit" className="px-5 py-2 text-sm font-bold text-white transition-colors bg-gray-900 rounded-full shadow-md hover:bg-black">Ubah Sandi</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-4xl my-auto overflow-hidden bg-white shadow-2xl rounded-2xl">
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
//               <div className="relative w-full h-64 bg-gray-100 border-b border-gray-200 md:h-full md:w-1/2 md:border-b-0 md:border-r">
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
//               <form onSubmit={handleSubmitAddress} className="flex flex-col w-full p-6 space-y-6 overflow-y-auto md:w-1/2 custom-scrollbar">

//                 <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
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
//       <div className="flex items-center justify-center min-h-screen font-sans bg-[#F9FAFB]">
//         <div className="w-12 h-12 border-b-2 border-[#006A4E] rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-[#F9FAFB] animate-fade-in">
//       <div className="max-w-6xl px-4 mx-auto space-y-10 sm:px-6 lg:px-8">

//         {/* --- HEADER PROFIL --- */}
//         <div className="relative overflow-hidden bg-white shadow-sm rounded-3xl">
//           {/* Aksen Latar Belakang */}
//           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#006A4E] to-emerald-400 opacity-90"></div>

//           <div className="relative px-6 pb-8 sm:px-10 mt-14 sm:mt-16">
//             <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">

//               {/* AREA FOTO PROFIL */}
//               <div className="relative group shrink-0">
//                 <div className="p-1.5 bg-white rounded-full shadow-lg">
//                   {user.profile_image ? (
//                     <img
//                       src={user.profile_image}
//                       alt="Profile"
//                       className="object-cover border border-gray-100 rounded-full w-28 h-28 sm:w-32 sm:h-32"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 text-4xl font-extrabold text-[#006A4E] uppercase rounded-full bg-emerald-50">
//                       {user.first_name.charAt(0)}{user.last_name.charAt(0)}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={isUploadingImage}
//                   className="absolute inset-1.5 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 cursor-pointer bg-black/60 backdrop-blur-sm group-hover:opacity-100 disabled:cursor-not-allowed"
//                   title="Ubah Foto Profil"
//                 >
//                   {isUploadingImage ? (
//                     <span className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   )}
//                 </button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageUpload}
//                   accept="image/png, image/jpeg, image/jpg"
//                   className="hidden"
//                 />
//               </div>

//               <div className="flex-1 text-center sm:text-left sm:mb-2">
//                 <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{user.first_name} {user.last_name}</h1>
//                 <div className="flex flex-col items-center gap-2 mt-2 text-gray-500 sm:flex-row sm:gap-4">
//                   <span className="flex items-center gap-1.5 text-sm font-medium">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                     {user.email}
//                   </span>
//                   <span className="hidden sm:block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
//                   <span className="flex items-center gap-1.5 text-sm font-medium">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                     {user.phone ? user.phone : <span className="italic text-gray-400">Belum ada nomor</span>}
//                   </span>
//                 </div>
//               </div>

//               {/* SECTION POIN (Didesain ulang menjadi lencana mengambang) */}
//               <div className="flex items-center gap-4 p-4 mt-4 transition-transform bg-gray-900 shadow-lg rounded-2xl sm:mt-0 hover:-translate-y-1">
//                 <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-inner bg-[#006A4E]/20 text-[#006A4E]">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="pr-2 text-left">
//                   <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Gycora Points</p>
//                   <p className="text-2xl font-black text-white leading-none mt-0.5">
//                     {new Intl.NumberFormat('id-ID').format(user.point || 0)} <span className="ml-1 text-xs font-medium text-emerald-400">Pts</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* ACTION BUTTONS (Edit Profil, Ubah Sandi, Favorit) */}
//             <div className="flex flex-wrap justify-center gap-3 pt-6 mt-8 border-t border-gray-100 sm:justify-end">
//               <button onClick={() => navigate("/favorites")} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-[#006A4E]">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//                 Favorit
//               </button>
//               <button onClick={() => setIsPasswordModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-[#006A4E]">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg>
//                 Ubah Sandi
//               </button>
//               <button onClick={handleOpenProfileModal} className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
//                 Edit Profil
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- BUKU ALAMAT --- */}
//         <div className="p-6 bg-white shadow-sm sm:p-8 rounded-3xl">
//           <div className="flex flex-col gap-4 pb-6 mb-6 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Buku Alamat</h2>
//               <p className="mt-1 text-sm text-gray-500">Kelola alamat pengiriman untuk mempermudah proses checkout.</p>
//             </div>
//             <button onClick={() => handleOpenModal()} className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all bg-gray-900 shadow-md rounded-xl hover:bg-black hover:shadow-lg shrink-0">
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//               Tambah Alamat Baru
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 border-2 border-gray-200 border-dashed bg-gray-50 rounded-2xl">
//               <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//               <p className="text-lg font-bold text-gray-500">Belum ada alamat</p>
//               <p className="mt-1 text-sm text-gray-400">Tambahkan alamat pertama Anda sekarang.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div key={addr.id} className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${addr.is_default ? "border-[#006A4E] shadow-md bg-emerald-50/20" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}>

//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`flex items-center justify-center w-10 h-10 rounded-full ${addr.is_default ? "bg-emerald-100 text-[#006A4E]" : "bg-gray-100 text-gray-500"}`}>
//                         {addr.details.type === "home" ? (
//                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
//                         ) : addr.details.type === "office" ? (
//                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                         ) : (
//                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                         )}
//                       </div>
//                       <div>
//                         <h3 className="text-base font-bold text-gray-900">{addr.receiver.full_name}</h3>
//                         <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{addr.details.type}</p>
//                       </div>
//                     </div>
//                     {addr.is_default && (
//                       <span className="px-2.5 py-1 text-[9px] font-black tracking-widest text-[#006A4E] uppercase bg-emerald-100 rounded-md">
//                         Alamat Utama
//                       </span>
//                     )}
//                   </div>

//                   <p className="flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
//                     {addr.details.address_location} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>

//                   <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
//                     <p className="text-xs font-semibold text-gray-500 truncate max-w-[50%]">Kec. {addr.details.region}</p>
//                     <div className="flex items-center gap-3">
//                       <button onClick={() => handleOpenModal(addr)} className="text-xs font-bold transition-colors text-[#006A4E] hover:text-emerald-800">Edit</button>
//                       <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
//                       <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs font-bold text-red-500 transition-colors hover:text-red-700">Hapus</button>
//                     </div>
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
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">Edit Profil</h3>
//               <button onClick={() => setIsProfileModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">Nama Depan</label>
//                   <input type="text" required value={profileFormData.first_name} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//                 </div>
//                 <div>
//                   <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">Nama Belakang</label>
//                   <input type="text" required value={profileFormData.last_name} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
//                 <input type="email" required value={profileFormData.email} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">Nomor Telepon</label>
//                 <input type="tel" placeholder="Contoh: 081234567890" value={profileFormData.phone} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//               </div>
//               <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">Batal</button>
//                 <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">Simpan Profil</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM UBAH KATA SANDI --- */}
//       {isPasswordModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">Ubah Sandi</h3>
//               <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitPassword} className="p-6 space-y-5">
//               <div>
//                 <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sandi Saat Ini</label>
//                 <input
//                   type="password" required value={passwordFormData.old_password}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, old_password: e.target.value })}
//                   className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sandi Baru</label>
//                 <input
//                   type="password" required minLength={8} value={passwordFormData.password}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password: e.target.value })}
//                   className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Konfirmasi Sandi Baru</label>
//                 <input
//                   type="password" required minLength={8} value={passwordFormData.password_confirmation}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password_confirmation: e.target.value })}
//                   className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">Batal</button>
//                 <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-gray-900 rounded-xl hover:bg-black hover:shadow-lg">Ubah Sandi</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
//                 {editingId ? "Edit Alamat Pengiriman" : "Tambah Alamat Baru"}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
//               {/* BAGIAN PETA (KIRI) */}
//               <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
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

//                 <button
//                   type="button"
//                   onClick={handleGetCurrentLocation}
//                   disabled={isGettingLocation}
//                   className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
//                 >
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-4 h-4 text-[#006A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   )}
//                   Gunakan Lokasi Saat Ini
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}
//               <form onSubmit={handleSubmitAddress} className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar">

//                 <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
//                   <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                   <p className="text-xs leading-relaxed text-blue-800">
//                     <strong>Panduan:</strong> Geser dan klik pada peta di sebelah untuk mengisi data alamat otomatis. Anda tetap dapat mengedit isian di bawah ini secara manual.
//                   </p>
//                 </div>

//                 <div className="space-y-5">
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nama Depan</label>
//                       <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nama Belakang</label>
//                       <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Label Alamat</label>
//                     <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all">
//                       <option value="home">Rumah</option>
//                       <option value="office">Kantor</option>
//                       <option value="other">Lainnya</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Detail Alamat Lengkap</label>
//                     <textarea required rows={3} placeholder="Nama jalan, blok, RT/RW, atau patokan..." value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"></textarea>
//                   </div>

//                   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kecamatan</label>
//                       <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kota/Kabupaten</label>
//                       <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Provinsi</label>
//                       <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kode Pos</label>
//                       <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>

//                   <input type="hidden" value={formData.latitude} />
//                   <input type="hidden" value={formData.longitude} />

//                   <div className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100" onClick={() => setFormData({ ...formData, is_default: !formData.is_default })}>
//                     <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]" onClick={(e) => e.stopPropagation()} />
//                     <label htmlFor="is_default" className="text-sm font-bold text-gray-800 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>
//                       Jadikan Alamat Utama Pengiriman
//                     </label>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">
//                     Batal
//                   </button>
//                   <button type="submit" className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">
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
// import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Context Bahasa

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
//   const { t } = useLanguage(); // [BARU] Inisialisasi hook bahasa
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
//         Swal.fire({ icon: "success", title: t("toast_profile_updated"), timer: 1500, showConfirmButton: false });
//         setIsProfileModalOpen(false);
//         setUser(data.user);
//         localStorage.setItem("user_data", JSON.stringify(data.user));
//       } else {
//         Swal.fire(t("error"), data.message || "Gagal memperbarui profil", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update profil:", error);
//       Swal.fire(t("error"), t("server_error"), "error");
//     }
//   };

//   // --- FUNGSI UBAH KATA SANDI ---
//   const handleSubmitPassword = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (passwordFormData.password !== passwordFormData.password_confirmation) {
//       Swal.fire(t("notification"), t("warn_pwd_mismatch"), "warning");
//       return;
//     }

//     if (passwordFormData.password.length < 8) {
//       Swal.fire(t("notification"), t("warn_pwd_length"), "warning");
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
//         Swal.fire({ icon: "success", title: "Berhasil", text: t("toast_pwd_updated"), timer: 1500, showConfirmButton: false });
//         setIsPasswordModalOpen(false);
//         setPasswordFormData({ old_password: "", password: "", password_confirmation: "" }); // Reset form
//       } else {
//         Swal.fire(t("error"), data.message || "Gagal mengubah kata sandi", "error");
//       }
//     } catch (error) {
//       console.error("Gagal update password:", error);
//       Swal.fire("Error", t("server_error"), "error");
//     }
//   };

//   // --- FUNGSI UPLOAD GAMBAR PROFIL ---
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       Swal.fire("Peringatan", t("toast_img_too_large"), "warning");
//       return;
//     }
//     if (!file.type.startsWith('image/')) {
//       Swal.fire("Peringatan", t("toast_img_wrong_format"), "warning");
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
//         Swal.fire({ toast: true, position: 'top-end', icon: "success", title: t("toast_img_updated"), showConfirmButton: false, timer: 2000 });
//       } else {
//         Swal.fire(t("error"), data.message || "Gagal mengunggah foto.", "error");
//       }
//     } catch (error) {
//       console.error("Error upload image:", error);
//       Swal.fire("Error", t("server_error"), "error");
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
//           Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning");
//           setIsGettingLocation(false);
//         }
//       );
//     } else {
//       Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error");
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
//        Swal.fire(t("notification"), t("warn_select_location"), "warning");
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
//         Swal.fire({ icon: "success", title: "Berhasil!", text: editingId ? t("toast_address_updated") : t("toast_address_added"), timer: 1500, showConfirmButton: false });
//         setIsModalOpen(false);
//         fetchAddresses(token!);
//       } else {
//         throw new Error("Gagal menyimpan alamat");
//       }
//     } catch (error) {
//       console.error("Gagal submit alamat:", error);
//       Swal.fire(t("error"), t("server_error"), "error");
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     const result = await Swal.fire({
//       title: t("prompt_delete_address_title"),
//       text: t("prompt_delete_address_text"),
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: t("btn_confirm_delete"),
//       cancelButtonText: t("cancel")
//     });
//     if (result.isConfirmed) {
//       const token = localStorage.getItem("user_token");
//       await fetch(`${BASE_URL}/api/addresses/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddresses(token!);
//       Swal.fire("Berhasil!", t("toast_address_deleted"), "success");
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-[#F9FAFB]">
//         <div className="w-12 h-12 border-b-2 border-[#006A4E] rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 font-sans bg-[#F9FAFB] animate-fade-in">
//       <div className="max-w-6xl px-4 mx-auto space-y-10 sm:px-6 lg:px-8">

//         {/* --- HEADER PROFIL --- */}
//         <div className="relative overflow-hidden bg-white shadow-sm rounded-3xl">
//           {/* Aksen Latar Belakang */}
//           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#006A4E] to-emerald-400 opacity-90"></div>

//           <div className="relative px-6 pb-8 sm:px-10 mt-14 sm:mt-16">
//             <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">

//               {/* AREA FOTO PROFIL */}
//               <div className="relative group shrink-0">
//                 <div className="p-1.5 bg-white rounded-full shadow-lg">
//                   {user.profile_image ? (
//                     <img
//                       src={user.profile_image}
//                       alt="Profile"
//                       className="object-cover border border-gray-100 rounded-full w-28 h-28 sm:w-32 sm:h-32"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 text-4xl font-extrabold text-[#006A4E] uppercase rounded-full bg-emerald-50">
//                       {user.first_name.charAt(0)}{user.last_name.charAt(0)}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={isUploadingImage}
//                   className="absolute inset-1.5 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 cursor-pointer bg-black/60 backdrop-blur-sm group-hover:opacity-100 disabled:cursor-not-allowed"
//                   title="Ubah Foto Profil"
//                 >
//                   {isUploadingImage ? (
//                     <span className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   )}
//                 </button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageUpload}
//                   accept="image/png, image/jpeg, image/jpg"
//                   className="hidden"
//                 />
//               </div>

//               <div className="flex-1 text-center sm:text-left sm:mb-2">
//                 <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{user.first_name} {user.last_name}</h1>
//                 <div className="flex flex-col items-center gap-2 mt-2 text-gray-500 sm:flex-row sm:gap-4">
//                   <span className="flex items-center gap-1.5 text-sm font-medium">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                     {user.email}
//                   </span>
//                   <span className="hidden sm:block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
//                   <span className="flex items-center gap-1.5 text-sm font-medium">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//                     {user.phone ? user.phone : <span className="italic text-gray-400">{t("profile_not_set")}</span>}
//                   </span>
//                 </div>
//               </div>

//               {/* SECTION POIN (Didesain ulang menjadi lencana mengambang) */}
//               <div className="flex items-center gap-4 p-4 mt-4 transition-transform bg-gray-900 shadow-lg rounded-2xl sm:mt-0 hover:-translate-y-1">
//                 <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-inner bg-[#006A4E]/20 text-[#006A4E]">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="pr-2 text-left">
//                   <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t("profile_gycora_points")}</p>
//                   <p className="text-2xl font-black text-white leading-none mt-0.5">
//                     {new Intl.NumberFormat('id-ID').format(user.point || 0)} <span className="ml-1 text-xs font-medium text-emerald-400">{t("profile_pts_label")}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* ACTION BUTTONS (Edit Profil, Ubah Sandi, Favorit) */}
//             <div className="flex flex-wrap justify-center gap-3 pt-6 mt-8 border-t border-gray-100 sm:justify-end">
//               <button onClick={() => navigate("/favorites")} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-[#006A4E]">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//                 {t("btn_favorite")}
//               </button>
//               <button onClick={() => setIsPasswordModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-[#006A4E]">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg>
//                 {t("btn_change_password")}
//               </button>
//               <button onClick={handleOpenProfileModal} className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
//                 {t("btn_edit_profile")}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- BUKU ALAMAT --- */}
//         <div className="p-6 bg-white shadow-sm sm:p-8 rounded-3xl">
//           <div className="flex flex-col gap-4 pb-6 mb-6 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{t("address_book_title")}</h2>
//               <p className="mt-1 text-sm text-gray-500">{t("address_book_desc")}</p>
//             </div>
//             <button onClick={() => handleOpenModal()} className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all bg-gray-900 shadow-md rounded-xl hover:bg-black hover:shadow-lg shrink-0">
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//               {t("btn_add_address")}
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 border-2 border-gray-200 border-dashed bg-gray-50 rounded-2xl">
//               <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//               <p className="text-lg font-bold text-gray-500">{t("empty_address_title")}</p>
//               <p className="mt-1 text-sm text-gray-400">{t("empty_address_desc")}</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {addresses.map((addr) => (
//                 <div key={addr.id} className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${addr.is_default ? "border-[#006A4E] shadow-md bg-emerald-50/20" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}>

//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`flex items-center justify-center w-10 h-10 rounded-full ${addr.is_default ? "bg-emerald-100 text-[#006A4E]" : "bg-gray-100 text-gray-500"}`}>
//                         {addr.details.type === "home" ? (
//                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
//                         ) : addr.details.type === "office" ? (
//                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                         ) : (
//                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                         )}
//                       </div>
//                       <div>
//                         <h3 className="text-base font-bold text-gray-900">{addr.receiver.full_name}</h3>
//                         <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
//                           {addr.details.type === "home" ? t("option_home") : addr.details.type === "office" ? t("option_office") : t("option_other")}
//                         </p>
//                       </div>
//                     </div>
//                     {addr.is_default && (
//                       <span className="px-2.5 py-1 text-[9px] font-black tracking-widest text-[#006A4E] uppercase bg-emerald-100 rounded-md">
//                         {t("label_main_address")}
//                       </span>
//                     )}
//                   </div>

//                   <p className="flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
//                     {addr.details.address_location} <br /> {addr.details.city}, {addr.details.province} <br /> {addr.details.postal_code}
//                   </p>

//                   <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
//                     <p className="text-xs font-semibold text-gray-500 truncate max-w-[50%]">Kec. {addr.details.region}</p>
//                     <div className="flex items-center gap-3">
//                       <button onClick={() => handleOpenModal(addr)} className="text-xs font-bold transition-colors text-[#006A4E] hover:text-emerald-800">{t("btn_edit")}</button>
//                       <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
//                       <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs font-bold text-red-500 transition-colors hover:text-red-700">{t("btn_delete")}</button>
//                     </div>
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
//           <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">{t("modal_edit_profile_title")}</h3>
//               <button onClick={() => setIsProfileModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">{t("label_first_name")}</label>
//                   <input type="text" required value={profileFormData.first_name} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//                 </div>
//                 <div>
//                   <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">{t("label_last_name")}</label>
//                   <input type="text" required value={profileFormData.last_name} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">{t("label_email")}</label>
//                 <input type="email" required value={profileFormData.email} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">{t("label_phone")}</label>
//                 <input type="tel" placeholder={t("placeholder_phone")} value={profileFormData.phone} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all" />
//               </div>
//               <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">{t("btn_cancel")}</button>
//                 <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">{t("btn_save_profile")}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM UBAH KATA SANDI --- */}
//       {isPasswordModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">{t("modal_change_pwd_title")}</h3>
//               <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmitPassword} className="p-6 space-y-5">
//               <div>
//                 <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_current_pwd")}</label>
//                 <input
//                   type="password" required value={passwordFormData.old_password}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, old_password: e.target.value })}
//                   className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_new_pwd")}</label>
//                 <input
//                   type="password" required minLength={8} value={passwordFormData.password}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password: e.target.value })}
//                   className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_confirm_new_pwd")}</label>
//                 <input
//                   type="password" required minLength={8} value={passwordFormData.password_confirmation}
//                   onChange={(e) => setPasswordFormData({ ...passwordFormData, password_confirmation: e.target.value })}
//                   className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
//                 <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">{t("btn_cancel")}</button>
//                 <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-gray-900 rounded-xl hover:bg-black hover:shadow-lg">{t("btn_save_pwd")}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
//               <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
//                 {editingId ? t("modal_edit_address_title") : t("modal_add_address_title")}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
//               {/* BAGIAN PETA (KIRI) */}
//               <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
//                 <MapContainer center={mapPosition} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <Marker position={mapPosition}>
//                     <Popup>{t("popup_selected_location")}</Popup>
//                   </Marker>
//                   <MapEvents />
//                   <MapCenterUpdater position={mapPosition} />
//                 </MapContainer>

//                 <button
//                   type="button"
//                   onClick={handleGetCurrentLocation}
//                   disabled={isGettingLocation}
//                   className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
//                 >
//                   {isGettingLocation ? (
//                     <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
//                   ) : (
//                     <svg className="w-4 h-4 text-[#006A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   )}
//                   {t("btn_use_current_location")}
//                 </button>
//               </div>

//               {/* BAGIAN FORM (KANAN) */}
//               <form onSubmit={handleSubmitAddress} className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar">

//                 <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
//                   <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                   <p className="text-xs leading-relaxed text-blue-800">
//                     {t("guide_map_text")}
//                   </p>
//                 </div>

//                 <div className="space-y-5">
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_first_name")}</label>
//                       <input type="text" required value={formData.first_name_address} onChange={(e) => setFormData({ ...formData, first_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_last_name")}</label>
//                       <input type="text" required value={formData.last_name_address} onChange={(e) => setFormData({ ...formData, last_name_address: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_address_type")}</label>
//                     <select value={formData.location_type} onChange={(e) => setFormData({ ...formData, location_type: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all">
//                       <option value="home">{t("option_home")}</option>
//                       <option value="office">{t("option_office")}</option>
//                       <option value="other">{t("option_other")}</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_full_address")}</label>
//                     <textarea required rows={3} placeholder={t("placeholder_full_address")} value={formData.address_location} onChange={(e) => setFormData({ ...formData, address_location: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"></textarea>
//                   </div>

//                   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_region")}</label>
//                       <input type="text" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_city")}</label>
//                       <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_province")}</label>
//                       <input type="text" required value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                     <div>
//                       <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("label_postal_code")}</label>
//                       <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all" />
//                     </div>
//                   </div>

//                   <input type="hidden" value={formData.latitude} />
//                   <input type="hidden" value={formData.longitude} />

//                   <div className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100" onClick={() => setFormData({ ...formData, is_default: !formData.is_default })}>
//                     <input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })} className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]" onClick={(e) => e.stopPropagation()} />
//                     <label htmlFor="is_default" className="text-sm font-bold text-gray-800 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>
//                       {t("label_set_default_address")}
//                     </label>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">
//                     {t("btn_cancel")}
//                   </button>
//                   <button type="submit" className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg">
//                     {editingId ? t("btn_update_address") : t("btn_save_address")}
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
import { useLanguage } from "../../context/LanguageContext";

// --- IMPORT LEAFLET ---
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
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

// [BARU] Interface untuk hasil pencarian (Suggestions)
interface SearchSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  // --- State Modal Alamat ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const defaultPosition: [number, number] = [-6.175392, 106.827153];
  const [mapPosition, setMapPosition] =
    useState<[number, number]>(defaultPosition);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // [BARU] State untuk Pencarian Alamat
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // --- State Modal Edit Profil & Sandi ---
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (res.ok) {
        const freshUser = await res.json();
        setUser(freshUser);
        localStorage.setItem("user_data", JSON.stringify(freshUser));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddresses = async (token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.data ? data.data : data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileFormData),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: t("toast_profile_updated"),
          timer: 1500,
          showConfirmButton: false,
        });
        setIsProfileModalOpen(false);
        setUser(data.user);
        localStorage.setItem("user_data", JSON.stringify(data.user));
      } else {
        Swal.fire(
          t("error"),
          data.message || "Gagal memperbarui profil",
          "error",
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire(t("error"), t("server_error"), "error");
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordFormData.password !== passwordFormData.password_confirmation) {
      Swal.fire(t("notification"), t("warn_pwd_mismatch"), "warning");
      return;
    }
    if (passwordFormData.password.length < 8) {
      Swal.fire(t("notification"), t("warn_pwd_length"), "warning");
      return;
    }
    const token = localStorage.getItem("user_token");
    try {
      const res = await fetch(`${BASE_URL}/api/profile/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(passwordFormData),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: t("toast_pwd_updated"),
          timer: 1500,
          showConfirmButton: false,
        });
        setIsPasswordModalOpen(false);
        setPasswordFormData({
          old_password: "",
          password: "",
          password_confirmation: "",
        });
      } else {
        Swal.fire(
          t("error"),
          data.message || "Gagal mengubah kata sandi",
          "error",
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", t("server_error"), "error");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire("Peringatan", t("toast_img_too_large"), "warning");
      return;
    }
    if (!file.type.startsWith("image/")) {
      Swal.fire("Peringatan", t("toast_img_wrong_format"), "warning");
      return;
    }

    setIsUploadingImage(true);
    const token = localStorage.getItem("user_token");
    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await fetch(`${BASE_URL}/api/profile/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user_data", JSON.stringify(data.user));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t("toast_img_updated"),
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire(
          t("error"),
          data.message || "Gagal mengunggah foto.",
          "error",
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", t("server_error"), "error");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // --- Handlers Peta & Geocoding ---
  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=id`,
      );
      const data = await res.json();

      if (data && data.address) {
        const { address } = data;
        const newCity = address.city || address.town || address.county || "";
        const newRegion =
          address.suburb || address.village || address.neighbourhood || "";
        const newProvince = address.state || "";
        const newPostal = address.postcode || "";
        const roadName = address.road || "";
        const houseNumber = address.house_number || "";
        const fullStreet = roadName
          ? `${roadName} ${houseNumber}`.trim()
          : data.display_name;

        setFormData((prev) => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
          address_location: fullStreet,
          city: newCity,
          province: newProvince,
          region: newRegion,
          postal_code: newPostal,
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
          Swal.fire("Akses Ditolak", t("warn_location_denied"), "warning");
          setIsGettingLocation(false);
        },
      );
    } else {
      Swal.fire("Tidak Mendukung", t("warn_location_unsupported"), "error");
      setIsGettingLocation(false);
    }
  };

  // [BARU] FUNGSI PENCARIAN LOKASI DARI TEXT (FORWARD GEOCODING)
  const searchLocation = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=id&limit=5&accept-language=id`,
      );
      const data = await res.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("Gagal mencari alamat:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    // Debounce agar tidak spam API
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(val);
    }, 800);
  };

  const handleSelectSuggestion = (place: SearchSuggestion) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    setMapPosition([lat, lng]);
    setSearchQuery(""); // Bersihkan input setelah dipilih
    setSuggestions([]); // Tutup dropdown

    // Tarik data detail alamat dari koordinat baru ini
    fetchAddressFromCoords(lat, lng);
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

  const handleOpenModal = (address: Address | null = null) => {
    setSearchQuery(""); // Reset pencarian
    setSuggestions([]);

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
    }
    setIsModalOpen(true);
  };

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.latitude || !formData.longitude) {
      Swal.fire(t("notification"), t("warn_select_location"), "warning");
      return;
    }

    const token = localStorage.getItem("user_token");
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${BASE_URL}/api/addresses/${editingId}`
      : `${BASE_URL}/api/addresses`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: editingId
            ? t("toast_address_updated")
            : t("toast_address_added"),
          timer: 1500,
          showConfirmButton: false,
        });
        setIsModalOpen(false);
        fetchAddresses(token!);
      } else {
        throw new Error("Gagal menyimpan alamat");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(t("error"), t("server_error"), "error");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const result = await Swal.fire({
      title: t("prompt_delete_address_title"),
      text: t("prompt_delete_address_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: t("btn_confirm_delete"),
      cancelButtonText: t("cancel"),
    });
    if (result.isConfirmed) {
      const token = localStorage.getItem("user_token");
      await fetch(`${BASE_URL}/api/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses(token!);
      Swal.fire("Berhasil!", t("toast_address_deleted"), "success");
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-[#F9FAFB]">
        <div className="w-12 h-12 border-b-2 border-[#006A4E] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 font-sans bg-[#F9FAFB] animate-fade-in">
      <div className="max-w-6xl px-4 mx-auto space-y-10 sm:px-6 lg:px-8">
        {/* --- HEADER PROFIL --- */}
        <div className="relative overflow-hidden bg-white shadow-sm rounded-3xl">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#006A4E] to-emerald-400 opacity-90"></div>

          <div className="relative px-6 pb-8 sm:px-10 mt-14 sm:mt-16">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
              <div className="relative group shrink-0">
                <div className="p-1.5 bg-white rounded-full shadow-lg">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="object-cover border border-gray-100 rounded-full w-28 h-28 sm:w-32 sm:h-32"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 text-4xl font-extrabold text-[#006A4E] uppercase rounded-full bg-emerald-50">
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="absolute inset-1.5 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 cursor-pointer bg-black/60 backdrop-blur-sm group-hover:opacity-100 disabled:cursor-not-allowed"
                  title="Ubah Foto Profil"
                >
                  {isUploadingImage ? (
                    <span className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                  ) : (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
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

              <div className="flex-1 text-center sm:text-left sm:mb-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {user.first_name} {user.last_name}
                </h1>
                <div className="flex flex-col items-center gap-2 mt-2 text-gray-500 sm:flex-row sm:gap-4">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {user.email}
                  </span>
                  <span className="hidden sm:block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {user.phone ? (
                      user.phone
                    ) : (
                      <span className="italic text-gray-400">
                        {t("profile_not_set")}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 mt-4 transition-transform bg-gray-900 shadow-lg rounded-2xl sm:mt-0 hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-inner bg-[#006A4E]/20 text-[#006A4E]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="pr-2 text-left">
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {t("profile_gycora_points")}
                  </p>
                  <p className="text-2xl font-black text-white leading-none mt-0.5">
                    {new Intl.NumberFormat("id-ID").format(user.point || 0)}{" "}
                    <span className="ml-1 text-xs font-medium text-emerald-400">
                      {t("profile_pts_label")}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-6 mt-8 border-t border-gray-100 sm:justify-end">
              <button
                onClick={() => navigate("/favorites")}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-[#006A4E]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {t("btn_favorite")}
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-[#006A4E]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                {t("btn_change_password")}
              </button>
              <button
                onClick={handleOpenProfileModal}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                {t("btn_edit_profile")}
              </button>
            </div>
          </div>
        </div>

        {/* --- BUKU ALAMAT --- */}
        <div className="p-6 bg-white shadow-sm sm:p-8 rounded-3xl">
          <div className="flex flex-col gap-4 pb-6 mb-6 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                {t("address_book_title")}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {t("address_book_desc")}
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all bg-gray-900 shadow-md rounded-xl hover:bg-black hover:shadow-lg shrink-0"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {t("btn_add_address")}
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-gray-200 border-dashed bg-gray-50 rounded-2xl">
              <svg
                className="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-lg font-bold text-gray-500">
                {t("empty_address_title")}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {t("empty_address_desc")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${addr.is_default ? "border-[#006A4E] shadow-md bg-emerald-50/20" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${addr.is_default ? "bg-emerald-100 text-[#006A4E]" : "bg-gray-100 text-gray-500"}`}
                      >
                        {addr.details.type === "home" ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                        ) : addr.details.type === "office" ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {addr.receiver.full_name}
                        </h3>
                        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                          {addr.details.type === "home"
                            ? t("option_home")
                            : addr.details.type === "office"
                              ? t("option_office")
                              : t("option_other")}
                        </p>
                      </div>
                    </div>
                    {addr.is_default && (
                      <span className="px-2.5 py-1 text-[9px] font-black tracking-widest text-[#006A4E] uppercase bg-emerald-100 rounded-md">
                        {t("label_main_address")}
                      </span>
                    )}
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {addr.details.address_location} <br /> {addr.details.city},{" "}
                    {addr.details.province} <br /> {addr.details.postal_code}
                  </p>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 truncate max-w-[50%]">
                      Kec. {addr.details.region}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenModal(addr)}
                        className="text-xs font-bold transition-colors text-[#006A4E] hover:text-emerald-800"
                      >
                        {t("btn_edit")}
                      </button>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-xs font-bold text-red-500 transition-colors hover:text-red-700"
                      >
                        {t("btn_delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL FORM EDIT PROFIL */}
      {/* ======================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    required
                    value={profileFormData.first_name}
                    onChange={(e) =>
                      setProfileFormData({
                        ...profileFormData,
                        first_name: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    required
                    value={profileFormData.last_name}
                    onChange={(e) =>
                      setProfileFormData({
                        ...profileFormData,
                        last_name: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={profileFormData.email}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={profileFormData.phone}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FORM UBAH KATA SANDI (Diabaikan untuk mempersingkat) --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="flex flex-col w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
                {t("modal_change_pwd_title")}
              </h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmitPassword} className="p-6 space-y-5">
              <div>
                <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {t("label_current_pwd")}
                </label>
                <input
                  type="password"
                  required
                  value={passwordFormData.old_password}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      old_password: e.target.value,
                    })
                  }
                  className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {t("label_new_pwd")}
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={passwordFormData.password}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      password: e.target.value,
                    })
                  }
                  className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {t("label_confirm_new_pwd")}
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={passwordFormData.password_confirmation}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      password_confirmation: e.target.value,
                    })
                  }
                  className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  {t("btn_cancel")}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md bg-gray-900 rounded-xl hover:bg-black hover:shadow-lg"
                >
                  {t("btn_save_pwd")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FORM ALAMAT DENGAN PETA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0">
              <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
                {editingId
                  ? t("modal_edit_address_title")
                  : t("modal_add_address_title")}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
              {/* BAGIAN PETA DENGAN PENCARIAN ALAMAT (KIRI) */}
              <div className="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0">
                {/* [BARU] Search Bar Overlay di atas peta */}
                <div className="absolute top-4 left-4 right-4 z-[1000]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari jalan atau nama tempat..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-3 pl-10 text-sm font-medium text-gray-900 bg-white border-0 shadow-lg outline-none rounded-xl focus:ring-2 focus:ring-[#006A4E]"
                    />
                    <svg
                      className="absolute w-5 h-5 text-gray-400 left-3 top-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {isSearching && (
                      <span className="absolute right-3 top-3.5 w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
                    )}
                  </div>

                  {/* Dropdown Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="absolute w-full mt-2 overflow-hidden bg-white shadow-xl rounded-xl">
                      {suggestions.map((place) => (
                        <div
                          key={place.place_id}
                          onClick={() => handleSelectSuggestion(place)}
                          className="px-4 py-3 text-sm transition-colors border-b border-gray-100 cursor-pointer hover:bg-gray-50 last:border-b-0"
                        >
                          <p className="font-bold text-gray-800 line-clamp-1">
                            {place.display_name.split(",")[0]}
                          </p>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            {place.display_name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <MapContainer
                  center={mapPosition}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={mapPosition}>
                    <Popup>{t("popup_selected_location")}</Popup>
                  </Marker>
                  <MapEvents />
                  <MapCenterUpdater position={mapPosition} />
                </MapContainer>

                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isGettingLocation}
                  className="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
                >
                  {isGettingLocation ? (
                    <span className="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"></span>
                  ) : (
                    <svg
                      className="w-4 h-4 text-[#006A4E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                  {t("btn_use_current_location")}
                </button>
              </div>

              {/* BAGIAN FORM (KANAN) */}
              <form
                onSubmit={handleSubmitAddress}
                className="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar"
              >
                <div className="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
                  <svg
                    className="w-5 h-5 text-blue-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs leading-relaxed text-blue-800">
                    {t("guide_map_text")}
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_first_name")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.first_name_address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name_address: e.target.value,
                          })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_last_name")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.last_name_address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name_address: e.target.value,
                          })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {t("label_address_type")}
                    </label>
                    <select
                      value={formData.location_type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location_type: e.target.value,
                        })
                      }
                      className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all"
                    >
                      <option value="home">{t("option_home")}</option>
                      <option value="office">{t("option_office")}</option>
                      <option value="other">{t("option_other")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {t("label_full_address")}
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={t("placeholder_full_address")}
                      value={formData.address_location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address_location: e.target.value,
                        })
                      }
                      className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_region")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.region}
                        onChange={(e) =>
                          setFormData({ ...formData, region: e.target.value })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_city")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_province")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.province}
                        onChange={(e) =>
                          setFormData({ ...formData, province: e.target.value })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t("label_postal_code")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postal_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postal_code: e.target.value,
                          })
                        }
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <input type="hidden" value={formData.latitude} />
                  <input type="hidden" value={formData.longitude} />

                  <div
                    className="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        is_default: !formData.is_default,
                      })
                    }
                  >
                    <input
                      type="checkbox"
                      id="is_default"
                      checked={formData.is_default}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_default: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor="is_default"
                      className="text-sm font-bold text-gray-800 cursor-pointer select-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("label_set_default_address")}
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                  >
                    {t("btn_cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg"
                  >
                    {editingId
                      ? t("btn_update_address")
                      : t("btn_save_address")}
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
