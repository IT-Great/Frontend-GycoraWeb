// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api"; // Sesuaikan path ini

// export default function AdminProfilePage() {
//   const navigate = useNavigate();
//   const [adminData, setAdminData] = useState<any>(null);

//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   const [infoForm, setInfoForm] = useState({ first_name: "", last_name: "", email: "", phone: "" });
//   const [passForm, setPassForm] = useState({ old_password: "", password: "", password_confirmation: "" });

//   const fetchAdminProfile = async () => {
//     try {
//       const token = localStorage.getItem("admin_token");
//       if (!token) throw new Error("No token");

//       const res = await fetch(`${BASE_URL}/api/admin`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setAdminData(data);
//         localStorage.setItem("admin_user", JSON.stringify(data)); // Sync storage
//       } else if (res.status === 401) {
//         handleLogout();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const adminStr = localStorage.getItem("admin_user");
//     if (adminStr) {
//       setAdminData(JSON.parse(adminStr));
//     }
//     fetchAdminProfile();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const openInfoModal = () => {
//     setInfoForm({
//       first_name: adminData?.first_name || "",
//       last_name: adminData?.last_name || "",
//       email: adminData?.email || "",
//       phone: adminData?.phone || "",
//     });
//     setShowInfoModal(true);
//   };

//   const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const objectUrl = URL.createObjectURL(file);
//     const oldImage = adminData.profile_image;

//     // Optimistic Update
//     setAdminData((prev: any) => ({ ...prev, profile_image: objectUrl }));

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/update-image`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       if (res.ok) {
//         const data = await res.json();
//         if (data.admin) {
//           setAdminData(data.admin);
//           localStorage.setItem("admin_user", JSON.stringify(data.admin));
//         }
//         URL.revokeObjectURL(objectUrl);
//       } else {
//         throw new Error("Failed");
//       }
//     } catch (err) {
//       // Rollback
//       setAdminData((prev: any) => ({ ...prev, profile_image: oldImage }));
//       Swal.fire("Error", "Gagal mengunggah foto profil.", "error");
//     }
//   };

//   const submitInfoUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/update-info`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify(infoForm),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setAdminData(data.admin);
//         localStorage.setItem("admin_user", JSON.stringify(data.admin));
//         setShowInfoModal(false);
//         Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Profil diperbarui!", showConfirmButton: false, timer: 2000 });
//       } else {
//         throw new Error("Gagal mengupdate");
//       }
//     } catch {
//       Swal.fire("Error", "Gagal memperbarui informasi profil.", "error");
//     }
//   };

//   const submitPasswordUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/update-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify(passForm),
//       });

//       if (res.ok) {
//         setShowPasswordModal(false);
//         setPassForm({ old_password: "", password: "", password_confirmation: "" });
//         Swal.fire("Sukses", "Kata sandi berhasil diperbarui!", "success");
//       } else {
//         const data = await res.json();
//         throw new Error(data.message || "Gagal");
//       }
//     } catch (err: any) {
//       Swal.fire("Error", err.message || "Gagal memperbarui kata sandi.", "error");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("admin_token");
//     localStorage.removeItem("admin_user");
//     navigate("/admin/login");
//   };

//   if (!adminData) return <div className="flex items-center justify-center min-h-[600px] animate-pulse font-bold text-gray-400">Loading profile...</div>;

//   return (
//     <div className="max-w-5xl px-6 py-12 mx-auto lg:py-20 animate-fade-in">
//       <div className="p-8 bg-white border border-gray-100 shadow-sm lg:p-12 rounded-3xl">

//         {/* HEADER */}
//         <div className="flex items-center justify-between pb-6 mb-10 border-b border-gray-100">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Profile</h1>
//           <span className="bg-gycora text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
//             {adminData.usertype === 'superadmin' ? 'Super Admin' : 'Staf Manajemen'}
//           </span>
//         </div>

//         {/* MAIN BODY */}
//         <div className="flex flex-col gap-12 lg:flex-row">

//           {/* FOTO PROFIL */}
//           <div className="flex flex-col items-center gap-6 lg:w-1/3">
//             <div className="relative group">
//               <div className="absolute inset-0 -m-2 rounded-full bg-black/5"></div>
//               <img
//                 key={adminData.profile_image}
//                 src={adminData.profile_image || `https://ui-avatars.com/api/?name=${adminData.first_name}+${adminData.last_name}&background=059669&color=fff&bold=true`}
//                 alt="Admin Avatar"
//                 className="relative z-10 object-cover w-40 h-40 border-4 border-white rounded-full shadow-md"
//                 onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminData.first_name}+${adminData.last_name}&background=059669&color=fff&bold=true`; }}
//               />
//               <label className="absolute inset-0 z-20 flex items-center justify-center transition-opacity rounded-full opacity-0 cursor-pointer bg-black/50 group-hover:opacity-100">
//                 <div className="flex flex-col items-center text-white">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                   <span className="font-bold text-[10px] uppercase tracking-widest">Change</span>
//                 </div>
//                 <input type="file" className="hidden" onChange={handleImageUpdate} accept="image/*" />
//               </label>
//             </div>
//             <div className="text-center">
//               <p className="text-xl font-black text-gray-900">{adminData.first_name} {adminData.last_name}</p>
//               <p className="mt-1 text-xs font-bold tracking-widest uppercase text-gycora">{adminData.email}</p>
//             </div>
//           </div>

//           {/* INFORMASI LAINNYA */}
//           <div className="flex-grow space-y-8">

//             <div className="relative p-6 border border-gray-100 bg-gray-50 rounded-2xl">
//               <button
//                 onClick={openInfoModal}
//                 className="absolute p-2 text-gray-500 transition rounded-full top-4 right-4 hover:bg-gray-200 hover:text-black"
//                 title="Edit Personal Info"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
//               </button>

//               <h3 className="mb-6 text-xs font-bold tracking-widest text-gray-400 uppercase">Personal Information</h3>

//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">First Name</p>
//                   <p className="font-semibold text-gray-900">{adminData.first_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Last Name</p>
//                   <p className="font-semibold text-gray-900">{adminData.last_name}</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email Address</p>
//                   <p className="font-semibold text-gray-900">{adminData.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Phone Number</p>
//                   <p className={`font-semibold ${adminData.phone ? 'text-gray-900' : 'text-gray-400 italic'}`}>
//                     {adminData.phone || "Not provided"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative p-6 border border-gray-100 bg-gray-50 rounded-2xl">
//               <button
//                 onClick={() => setShowPasswordModal(true)}
//                 className="absolute p-2 text-gray-500 transition rounded-full top-4 right-4 hover:bg-gray-200 hover:text-black"
//                 title="Change Password"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
//               </button>

//               <h3 className="mb-6 text-xs font-bold tracking-widest text-gray-400 uppercase">Security Settings</h3>
//               <div>
//                 <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Account Password</p>
//                 <p className="text-2xl tracking-[0.3em] text-gray-800 translate-y-1">••••••••</p>
//               </div>
//             </div>

//             <div className="flex items-center justify-between px-2">
//                <div>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Account Status</p>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-sm font-medium text-gray-700">Active & Verified</span>
//                   </div>
//                </div>
//                <div>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 text-right">Joined At</p>
//                   <p className="text-sm font-medium text-gray-700">
//                     {new Date(adminData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                   </p>
//                </div>
//             </div>

//           </div>
//         </div>

//         {/* LOGOUT BUTTON */}
//         <div className="flex justify-end mt-8">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest text-red-600 uppercase transition duration-200 border border-red-100 bg-red-50 hover:bg-red-100 rounded-xl"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
//             Sign Out
//           </button>
//         </div>

//       </div>

//       {/* MODALS */}
//       {showInfoModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black/40 backdrop-blur-sm" onClick={() => setShowInfoModal(false)}>
//           <div className="relative w-full max-w-lg p-8 bg-white shadow-2xl rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
//             <button onClick={() => setShowInfoModal(false)} className="absolute text-gray-400 top-6 right-6 hover:text-black">✕</button>
//             <h3 className="mb-2 text-2xl font-bold text-gray-900">Edit Personal Info</h3>
//             <p className="mb-6 text-xs text-gray-500">Update your administrative contact details.</p>

//             <form onSubmit={submitInfoUpdate} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">First Name</label>
//                   <input value={infoForm.first_name} onChange={e => setInfoForm({...infoForm, first_name: e.target.value})} className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" required />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last Name</label>
//                   <input value={infoForm.last_name} onChange={e => setInfoForm({...infoForm, last_name: e.target.value})} className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" required />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
//                 <input type="email" value={infoForm.email} onChange={e => setInfoForm({...infoForm, email: e.target.value})} className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" required />
//               </div>
//               <div>
//                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
//                 <input type="tel" value={infoForm.phone} onChange={e => setInfoForm({...infoForm, phone: e.target.value})} placeholder="+62..." className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" />
//               </div>

//               <div className="flex gap-3 pt-6">
//                 <button type="button" onClick={() => setShowInfoModal(false)} className="flex-1 font-bold text-gray-500 transition hover:bg-gray-50 rounded-xl">
//                   Cancel
//                 </button>
//                 <button type="submit" className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora rounded-xl hover:bg-gycora-dark shadow-gycora/20">
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showPasswordModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black/40 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)}>
//           <div className="relative w-full max-w-lg p-8 bg-white shadow-2xl rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
//             <button onClick={() => setShowPasswordModal(false)} className="absolute text-gray-400 top-6 right-6 hover:text-black">✕</button>
//             <h3 className="mb-2 text-2xl font-bold text-gray-900">Security Update</h3>
//             <p className="mb-6 text-xs text-gray-500">Ensure your new password is at least 8 characters long.</p>

//             <form onSubmit={submitPasswordUpdate} className="space-y-4">
//               <div>
//                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Password</label>
//                 <input type="password" value={passForm.old_password} onChange={e => setPassForm({...passForm, old_password: e.target.value})} className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" required />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">New Password</label>
//                   <input type="password" value={passForm.password} onChange={e => setPassForm({...passForm, password: e.target.value})} className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" required />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confirm Password</label>
//                   <input type="password" value={passForm.password_confirmation} onChange={e => setPassForm({...passForm, password_confirmation: e.target.value})} className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" required />
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-6">
//                 <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 font-bold text-gray-500 transition hover:bg-gray-50 rounded-xl">
//                   Cancel
//                 </button>
//                 <button type="submit" className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora rounded-xl hover:bg-gycora-dark shadow-gycora/30">
//                   Update Password
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

export default function AdminProfilePage() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<any>(null);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [infoForm, setInfoForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [passForm, setPassForm] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) throw new Error("No token");

      const res = await fetch(`${BASE_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAdminData(data);
        localStorage.setItem("admin_user", JSON.stringify(data));
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const adminStr = localStorage.getItem("admin_user");
    if (adminStr) {
      setAdminData(JSON.parse(adminStr));
    }
    fetchAdminProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openInfoModal = () => {
    setInfoForm({
      first_name: adminData?.first_name || "",
      last_name: adminData?.last_name || "",
      email: adminData?.email || "",
      phone: adminData?.phone || "",
    });
    setShowInfoModal(true);
  };

  // =========================================================================
  // FUNGSI UPLOAD S3 DIRECT (SAMA SEPERTI PRODUK)
  // =========================================================================
  const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Batasi ukuran (misal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire(
        "File Terlalu Besar",
        "Maksimal ukuran foto adalah 5MB.",
        "warning",
      );
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const oldImage = adminData.profile_image;

    // Optimistic Update UI (Biar kelihatan instan ganti foto)
    setAdminData((prev: any) => ({ ...prev, profile_image: objectUrl }));

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) throw new Error("Akses ditolak");

      // Tampilkan Loading
      Swal.fire({
        title: "Mengunggah...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const ext = file.name.split(".").pop();
      const contentType = file.type;

      // 1. MINTA PRE-SIGNED URL KE LARAVEL
      const presignedRes = await fetch(`${BASE_URL}/api/admin/presigned-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ extension: ext, content_type: contentType }),
      });

      if (!presignedRes.ok) throw new Error("Gagal mengambil kunci upload S3");
      const { upload_url, upload_headers, file_url } =
        await presignedRes.json();

      // 2. UPLOAD LANGSUNG KE S3 CLEVER CLOUD
      const s3UploadRes = await fetch(upload_url, {
        method: "PUT",
        body: file,
        headers: {
          ...upload_headers,
          "Content-Type": contentType,
          "x-amz-acl": "public-read",
        },
      });

      if (!s3UploadRes.ok) throw new Error("Gagal mengunggah foto ke S3");

      // 3. BERITAHU LARAVEL UNTUK MENYIMPAN URL BARU
      const saveRes = await fetch(`${BASE_URL}/api/admin/update-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ image_url: file_url }), // Kirim URL-nya saja
      });

      if (saveRes.ok) {
        const data = await saveRes.json();
        if (data.admin) {
          setAdminData(data.admin);
          localStorage.setItem("admin_user", JSON.stringify(data.admin));
        }
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Foto diperbarui!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        throw new Error("Gagal menyimpan ke database");
      }

      URL.revokeObjectURL(objectUrl);
    } catch (err: any) {
      console.error(err);
      // Rollback jika gagal
      setAdminData((prev: any) => ({ ...prev, profile_image: oldImage }));
      Swal.fire(
        "Error",
        err.message || "Gagal mengunggah foto profil.",
        "error",
      );
    }
  };

  const submitInfoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/update-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(infoForm),
      });

      if (res.ok) {
        const data = await res.json();
        setAdminData(data.admin);
        localStorage.setItem("admin_user", JSON.stringify(data.admin));
        setShowInfoModal(false);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Profil diperbarui!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        throw new Error("Gagal mengupdate");
      }
    } catch {
      Swal.fire("Error", "Gagal memperbarui informasi profil.", "error");
    }
  };

  const submitPasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(passForm),
      });

      if (res.ok) {
        setShowPasswordModal(false);
        setPassForm({
          old_password: "",
          password: "",
          password_confirmation: "",
        });
        Swal.fire("Sukses", "Kata sandi berhasil diperbarui!", "success");
      } else {
        const data = await res.json();
        throw new Error(data.message || "Gagal");
      }
    } catch (err: any) {
      Swal.fire(
        "Error",
        err.message || "Gagal memperbarui kata sandi.",
        "error",
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  // Di AdminProfilePage.tsx
  // const handleLogout = () => {
  //   localStorage.removeItem("user_token"); // Pastikan kuncinya sama dengan yang dibaca di App.tsx
  //   localStorage.removeItem("user_data");

  //   // Opsional: hapus juga admin_token jika masih ada sisa
  //   localStorage.removeItem("admin_token");
  //   localStorage.removeItem("admin_user");

  //   navigate("/admin/login", { replace: true });
  //   window.location.reload(); // Paksa reload agar memory React bersih total
  // };

  if (!adminData)
    return (
      <div className="flex items-center justify-center min-h-[600px] animate-pulse font-bold text-gray-400">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-5xl px-6 py-12 mx-auto lg:py-20 animate-fade-in">
      <div className="p-8 bg-white border border-gray-100 shadow-sm lg:p-12 rounded-3xl">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-gray-100">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Profile
          </h1>
          <span className="bg-gycora text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
            {adminData.usertype === "superadmin"
              ? "Super Admin"
              : "Staf Manajemen"}
          </span>
        </div>

        {/* MAIN BODY */}
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* FOTO PROFIL */}
          <div className="flex flex-col items-center gap-6 lg:w-1/3">
            <div className="relative group">
              <div className="absolute inset-0 -m-2 rounded-full bg-black/5"></div>
              <img
                key={adminData.profile_image}
                src={
                  adminData.profile_image ||
                  `https://ui-avatars.com/api/?name=${adminData.first_name}+${adminData.last_name}&background=059669&color=fff&bold=true`
                }
                alt="Admin Avatar"
                className="relative z-10 object-cover w-40 h-40 border-4 border-white rounded-full shadow-md"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${adminData.first_name}+${adminData.last_name}&background=059669&color=fff&bold=true`;
                }}
              />
              <label className="absolute inset-0 z-20 flex items-center justify-center transition-opacity rounded-full opacity-0 cursor-pointer bg-black/50 group-hover:opacity-100">
                <div className="flex flex-col items-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-bold text-[10px] uppercase tracking-widest">
                    Change
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpdate}
                  accept="image/*"
                />
              </label>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-gray-900">
                {adminData.first_name} {adminData.last_name}
              </p>
              <p className="mt-1 text-xs font-bold tracking-widest uppercase text-gycora">
                {adminData.email}
              </p>
            </div>
          </div>

          {/* INFORMASI LAINNYA */}
          <div className="flex-grow space-y-8">
            <div className="relative p-6 border border-gray-100 bg-gray-50 rounded-2xl">
              <button
                onClick={openInfoModal}
                className="absolute p-2 text-gray-500 transition rounded-full top-4 right-4 hover:bg-gray-200 hover:text-black"
                title="Edit Personal Info"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
              </button>

              <h3 className="mb-6 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    First Name
                  </p>
                  <p className="font-semibold text-gray-900">
                    {adminData.first_name}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    Last Name
                  </p>
                  <p className="font-semibold text-gray-900">
                    {adminData.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    Email Address
                  </p>
                  <p className="font-semibold text-gray-900">
                    {adminData.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    Phone Number
                  </p>
                  <p
                    className={`font-semibold ${adminData.phone ? "text-gray-900" : "text-gray-400 italic"}`}
                  >
                    {adminData.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative p-6 border border-gray-100 bg-gray-50 rounded-2xl">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="absolute p-2 text-gray-500 transition rounded-full top-4 right-4 hover:bg-gray-200 hover:text-black"
                title="Change Password"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
              </button>

              <h3 className="mb-6 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Security Settings
              </h3>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                  Account Password
                </p>
                <p className="text-2xl tracking-[0.3em] text-gray-800 translate-y-1">
                  ••••••••
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                  Account Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Active & Verified
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 text-right">
                  Joined At
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(adminData.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest text-red-600 uppercase transition duration-200 border border-red-100 bg-red-50 hover:bg-red-100 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* MODALS */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black/40 backdrop-blur-sm"
          onClick={() => setShowInfoModal(false)}
        >
          <div
            className="relative w-full max-w-lg p-8 bg-white shadow-2xl rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute text-gray-400 top-6 right-6 hover:text-black"
            >
              ✕
            </button>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Edit Personal Info
            </h3>
            <p className="mb-6 text-xs text-gray-500">
              Update your administrative contact details.
            </p>

            <form onSubmit={submitInfoUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    First Name
                  </label>
                  <input
                    value={infoForm.first_name}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, first_name: e.target.value })
                    }
                    className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Last Name
                  </label>
                  <input
                    value={infoForm.last_name}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, last_name: e.target.value })
                    }
                    className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  type="email"
                  value={infoForm.email}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, email: e.target.value })
                  }
                  className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={infoForm.phone}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, phone: e.target.value })
                  }
                  placeholder="+62..."
                  className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                />
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowInfoModal(false)}
                  className="flex-1 font-bold text-gray-500 transition hover:bg-gray-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora rounded-xl hover:bg-gycora-dark shadow-gycora/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black/40 backdrop-blur-sm"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="relative w-full max-w-lg p-8 bg-white shadow-2xl rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute text-gray-400 top-6 right-6 hover:text-black"
            >
              ✕
            </button>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Security Update
            </h3>
            <p className="mb-6 text-xs text-gray-500">
              Ensure your new password is at least 8 characters long.
            </p>

            <form onSubmit={submitPasswordUpdate} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passForm.old_password}
                  onChange={(e) =>
                    setPassForm({ ...passForm, old_password: e.target.value })
                  }
                  className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passForm.password}
                    onChange={(e) =>
                      setPassForm({ ...passForm, password: e.target.value })
                    }
                    className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={passForm.password_confirmation}
                    onChange={(e) =>
                      setPassForm({
                        ...passForm,
                        password_confirmation: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 font-bold text-gray-500 transition hover:bg-gray-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora rounded-xl hover:bg-gycora-dark shadow-gycora/30"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
