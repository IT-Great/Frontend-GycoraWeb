// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useMemo } from "react";
// import { BASE_URL } from "../../config/api";

// export default function SubscriberPage() {
//   const [subscribers, setSubscribers] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [selectedSub, setSelectedSub] = useState<any>(null);

//   // --- FETCH DATA ---
//   const fetchSubscribers = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/subscribers`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       if (!res.ok) throw new Error("Gagal mengambil data subscribers");
      
//       const data = await res.json();
//       setSubscribers(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 400);
//     }
//   };

//   useEffect(() => {
//     fetchSubscribers();
//   }, []);

//   // --- COMPUTED PROPERTIES ---
//   const filteredSubs = useMemo(() => {
//     const query = searchQuery.toLowerCase();
//     return subscribers.filter((sub) =>
//       sub.email.toLowerCase().includes(query)
//     );
//   }, [subscribers, searchQuery]);

//   const totalSubs = useMemo(() => subscribers.length, [subscribers]);
  
//   const registeredSubs = useMemo(
//     () => subscribers.filter((s) => s.is_registered).length,
//     [subscribers]
//   );
  
//   const guestSubs = useMemo(
//     () => subscribers.filter((s) => !s.is_registered).length,
//     [subscribers]
//   );

//   // --- HANDLERS ---
//   const openDetail = (sub: any) => {
//     setSelectedSub(sub);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedSub(null);
//   };

//   // --- RENDER ---
//   return (
//     <div className="relative p-8 font-sans bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px] animate-fade-in">
      
//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
//         <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
//           <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
//             Total Subscribers
//           </p>
//           <p className="text-4xl font-black text-black">{totalSubs}</p>
//         </div>
//         <div className="p-6 border bg-emerald-50/50 border-emerald-100 rounded-2xl">
//           <p className="mb-1 text-xs font-bold tracking-widest uppercase text-emerald-500">
//             Registered Users
//           </p>
//           <p className="text-4xl font-black text-emerald-600">{registeredSubs}</p>
//         </div>
//         <div className="p-6 border bg-amber-50/50 border-amber-100 rounded-2xl">
//           <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">
//             Guest Subscribers
//           </p>
//           <p className="text-4xl font-black text-amber-700">{guestSubs}</p>
//         </div>
//       </div>

//       {/* HEADER & SEARCH */}
//       <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Mailing List</h1>
//           <p className="text-sm text-gray-500">Manage your newsletter audience.</p>
//         </div>
//         <div className="relative w-full md:w-80">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </span>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search email..."
//             className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
//           />
//         </div>
//       </div>

//       {/* DATA TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse min-w-[700px]">
//           <thead>
//             <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100">
//               <th className="pb-4 pl-2 font-medium">Email Address</th>
//               <th className="pb-4 font-medium text-center">Identity</th>
//               <th className="pb-4 font-medium text-center">Status</th>
//               <th className="pb-4 font-medium text-center">Subscribed On</th>
//               <th className="pb-4 pr-2 font-medium text-right">Action</th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-600">
//             {isLoading ? (
//               Array.from({ length: 5 }).map((_, i) => (
//                 <tr key={`skeleton-${i}`} className="border-b border-gray-50 animate-pulse">
//                   <td className="py-6 pl-2">
//                     <div className="w-48 h-4 bg-gray-200 rounded"></div>
//                   </td>
//                   <td className="py-6">
//                     <div className="w-24 h-4 mx-auto bg-gray-200 rounded"></div>
//                   </td>
//                   <td className="py-6">
//                     <div className="w-16 h-4 mx-auto bg-gray-200 rounded"></div>
//                   </td>
//                   <td className="py-6">
//                     <div className="w-24 h-4 mx-auto bg-gray-200 rounded"></div>
//                   </td>
//                   <td className="py-6 pr-2">
//                     <div className="w-16 h-6 ml-auto bg-gray-200 rounded"></div>
//                   </td>
//                 </tr>
//               ))
//             ) : filteredSubs.length === 0 ? (
//               // Empty State
//               <tr>
//                 <td colSpan={5} className="py-12 italic text-center text-gray-400">
//                   No subscribers found.
//                 </td>
//               </tr>
//             ) : (
//               // Data Rows
//               filteredSubs.map((sub) => (
//                 <tr
//                   key={sub.id}
//                   className="transition border-b border-gray-50 hover:bg-gray-50"
//                 >
//                   <td className="py-4 pl-2 font-bold text-gray-900">
//                     {sub.email}
//                   </td>
//                   <td className="py-4 text-center">
//                     {sub.is_registered ? (
//                       <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
//                         Registered
//                       </span>
//                     ) : (
//                       <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
//                         Guest
//                       </span>
//                     )}
//                   </td>
//                   <td className="py-4 text-center">
//                     {sub.is_active ? (
//                       <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
//                         Active
//                       </span>
//                     ) : (
//                       <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
//                         Unsubscribed
//                       </span>
//                     )}
//                   </td>
//                   <td className="py-4 text-xs text-center text-gray-400">
//                     {new Date(sub.created_at).toLocaleDateString("id-ID")}
//                   </td>
//                   <td className="py-4 pr-2 text-right">
//                     <button
//                       onClick={() => openDetail(sub)}
//                       className="text-[10px] font-bold text-black border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-black hover:text-white transition"
//                     >
//                       Detail
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* DETAIL MODAL */}
//       {showModal && selectedSub && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
//           onClick={closeModal}
//         >
//           <div
//             className="relative w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="absolute text-gray-400 transition-colors top-6 right-6 hover:text-black"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <h2 className="pb-4 mb-6 text-xl font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">
//               Subscriber Info
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
//                   Email Address
//                 </p>
//                 <p className="text-lg font-bold text-black break-all">
//                   {selectedSub.email}
//                 </p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
//                     Account Type
//                   </p>
//                   <p className="text-sm font-medium">
//                     {selectedSub.is_registered
//                       ? "Registered Member"
//                       : "Guest Visitor"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
//                     Newsletter Status
//                   </p>
//                   <p
//                     className={`text-sm font-bold ${
//                       selectedSub.is_active ? "text-emerald-600" : "text-red-500"
//                     }`}
//                   >
//                     {selectedSub.is_active
//                       ? "Active Receiver"
//                       : "Unsubscribed"}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
//                   Subscribed Since
//                 </p>
//                 <p className="text-sm font-medium">
//                   {new Date(selectedSub.created_at).toLocaleString("id-ID")}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { BASE_URL } from "../../config/api";

export default function SubscriberPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);

  // 👇 [PERBAIKAN] State untuk Otorisasi Aksi Subscribers 👇
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

  // --- FETCH DATA ---
  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/subscribers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal mengambil data subscribers");
      
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // --- COMPUTED PROPERTIES ---
  const filteredSubs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return subscribers.filter((sub) =>
      sub.email.toLowerCase().includes(query)
    );
  }, [subscribers, searchQuery]);

  const totalSubs = useMemo(() => subscribers.length, [subscribers]);
  
  const registeredSubs = useMemo(
    () => subscribers.filter((s) => s.is_registered).length,
    [subscribers]
  );
  
  const guestSubs = useMemo(
    () => subscribers.filter((s) => !s.is_registered).length,
    [subscribers]
  );

  // --- HANDLERS ---
  const openDetail = (sub: any) => {
    setSelectedSub(sub);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSub(null);
  };

  // --- RENDER ---
  return (
    <div className="relative p-8 font-sans bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px] animate-fade-in">
      
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
        <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
            Total Subscribers
          </p>
          <p className="text-4xl font-black text-black">{totalSubs}</p>
        </div>
        <div className="p-6 border bg-emerald-50/50 border-emerald-100 rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest uppercase text-emerald-500">
            Registered Users
          </p>
          <p className="text-4xl font-black text-emerald-600">{registeredSubs}</p>
        </div>
        <div className="p-6 border bg-amber-50/50 border-amber-100 rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">
            Guest Subscribers
          </p>
          <p className="text-4xl font-black text-amber-700">{guestSubs}</p>
        </div>
      </div>

      {/* HEADER & SEARCH */}
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mailing List</h1>
          <p className="text-sm text-gray-500">Manage your newsletter audience.</p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search email..."
            className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100">
              <th className="pb-4 pl-2 font-medium">Email Address</th>
              <th className="pb-4 font-medium text-center">Identity</th>
              <th className="pb-4 font-medium text-center">Status</th>
              <th className="pb-4 font-medium text-center">Subscribed On</th>
              <th className="pb-4 pr-2 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-600">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-gray-50 animate-pulse">
                  <td className="py-6 pl-2">
                    <div className="w-48 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-6">
                    <div className="w-24 h-4 mx-auto bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-6">
                    <div className="w-16 h-4 mx-auto bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-6">
                    <div className="w-24 h-4 mx-auto bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-6 pr-2">
                    <div className="w-16 h-6 ml-auto bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))
            ) : filteredSubs.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={5} className="py-12 italic text-center text-gray-400">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              // Data Rows
              filteredSubs.map((sub) => (
                <tr
                  key={sub.id}
                  className="transition border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="py-4 pl-2 font-bold text-gray-900">
                    {sub.email}
                  </td>
                  <td className="py-4 text-center">
                    {sub.is_registered ? (
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Registered
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Guest
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {sub.is_active ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Unsubscribed
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-xs text-center text-gray-400">
                    {new Date(sub.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4 pr-2 text-right">
                    {/* 👇 BUNGKUS TOMBOL DETAIL DENGAN RBAC 👇 */}
                    {canAccess('subscribers.detail') ? (
                      <button
                        onClick={() => openDetail(sub)}
                        className="text-[10px] font-bold text-black border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-black hover:text-white transition"
                      >
                        Detail
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

      {/* DETAIL MODAL */}
      {showModal && selectedSub && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute text-gray-400 transition-colors top-6 right-6 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="pb-4 mb-6 text-xl font-bold tracking-widest text-gray-800 uppercase border-b border-gray-100">
              Subscriber Info
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                  Email Address
                </p>
                <p className="text-lg font-bold text-black break-all">
                  {selectedSub.email}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                    Account Type
                  </p>
                  <p className="text-sm font-medium">
                    {selectedSub.is_registered
                      ? "Registered Member"
                      : "Guest Visitor"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                    Newsletter Status
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      selectedSub.is_active ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {selectedSub.is_active
                      ? "Active Receiver"
                      : "Unsubscribed"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                  Subscribed Since
                </p>
                <p className="text-sm font-medium">
                  {new Date(selectedSub.created_at).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}