/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useNavigate } from "react-router-dom";

// // --- SOLUSI ERROR TYPESCRIPT ---
// declare global {
//   interface Window {
//     Pusher: any;
//     Echo: any;
//   }
// }

// // Setup Pusher di Window object
// window.Pusher = Pusher;

// interface Staff {
//   id: number;
//   first_name: string;
//   last_name: string;
//   usertype: string;
//   profile_image?: string;
// }

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   usertype: string;
//   is_subscribed: boolean;
//   created_at: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// export default function AdminUsersList() {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- STATE CHAT ADMIN ---
//   const [activeChat, setActiveChat] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // 👇 [PERBAIKAN] State untuk Otorisasi Aksi Pelanggan 👇
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

//   const activeChatRef = useRef<Staff | null>(null);

//   // Setiap kali activeChat berubah, update Ref-nya
//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("admin_token");

//       const res = await fetch(`${BASE_URL}/api/admin/users`, {
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Gagal load data pelanggan");

//       const data = await res.json();
//       const responseData = data.data ? data.data : data;
//       setUsers(responseData || []);
//     } catch (error) {
//       console.error("Gagal mengambil data users:", error);
//       Swal.fire("Error", "Gagal memuat daftar pelanggan", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Auto Scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER ADMIN (REAL-TIME FIX)
//   // ==========================================================
//   useEffect(() => {
//     if (!adminUser) return;

//     const token = localStorage.getItem("admin_token");

//     const echoInstance = new Echo({
//       broadcaster: "pusher",
//       key: "5b29faa8d41035b749a1",
//       cluster: "ap1",
//       forceTLS: true,
//       authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
//       auth: {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       },
//     });

//     window.Echo = echoInstance;

//     echoInstance
//       .private(`chat.${adminUser.id}`)
//       .listen(".MessageSent", (e: any) => {
//         console.log("Pesan diterima:", e);
//         const incomingMsg = e.message || e;

//         // GUNAKAN activeChatRef.current, BUKAN activeChat
//         if (
//           activeChatRef.current &&
//           incomingMsg.sender_id === activeChatRef.current.id
//         ) {
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       // Echo hanya di-cleanup saat currentUser logout/ganti, bukan saat ganti teman chat
//       echoInstance.leave(`chat.${adminUser.id}`);
//     };
//   }, [adminUser]);

//   const openChat = async (user: User) => {
//     setActiveChat(user);
//     const token = localStorage.getItem("admin_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${user.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !adminUser) return;

//     const token = localStorage.getItem("admin_token");
//     const messageText = newMessage.trim();
//     setNewMessage("");

//     // Optimistic Update
//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: adminUser.id,
//       receiver_id: activeChat.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     try {
//       await fetch(`${BASE_URL}/api/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           receiver_id: activeChat.id,
//           message: messageText,
//         }),
//       });
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     }).format(date);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh] font-sans">
//         <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
//       {/* Header Panel */}
//       <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Daftar Pelanggan</h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Kelola data pengguna terdaftar di Gycora.
//           </p>
//         </div>
//         <div className="px-4 py-2 text-sm font-bold border rounded-lg bg-emerald-50 text-emerald-700 border-emerald-100">
//           Total: {users.length} Pelanggan
//         </div>
//       </div>

//       {/* Tabel Data Pengguna */}
//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="border-b border-gray-100 bg-gray-50">
//               <tr>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">
//                   Pelanggan
//                 </th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">
//                   Email
//                 </th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">
//                   Status Berlangganan
//                 </th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">
//                   Tanggal Daftar
//                 </th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">
//                   Aksi
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {users.map((u) => (
//                 <tr key={u.id} className="transition-colors hover:bg-gray-50">
//                   <td className="flex items-center gap-3 p-4">
//                     <div className="flex items-center justify-center w-10 h-10 text-sm font-bold uppercase rounded-full bg-gycora-light text-gycora-dark shrink-0">
//                       {u.first_name.charAt(0)}
//                       {u.last_name.charAt(0)}
//                     </div>
//                     <div>
//                       <span className="block text-sm font-semibold text-gray-900">
//                         {u.first_name} {u.last_name}
//                       </span>
//                       <span className="text-xs text-gray-500">ID: {u.id}</span>
//                     </div>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">{u.email}</td>
//                   <td className="p-4 text-center">
//                     {u.is_subscribed ? (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
//                         Subscribed
//                       </span>
//                     ) : (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
//                         Reguler
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
//                     {formatDate(u.created_at)}
//                   </td>

//                   {/* --- AKSI TOMBOL --- */}
//                   <td className="p-4">
//                     <div className="flex items-center justify-center gap-2">
                      
//                       {/* BUNGKUS TOMBOL CHAT DENGAN RBAC */}
//                       {canAccess('users.chat') && (
//                         <button
//                           onClick={() => openChat(u)}
//                           className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white transition-colors bg-gycora rounded-lg shadow-sm hover:bg-gycora-dark"
//                           title="Chat dengan Pelanggan"
//                         >
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                             />
//                           </svg>
//                           Chat
//                         </button>
//                       )}

//                       {/* BUNGKUS TOMBOL DETAIL DENGAN RBAC */}
//                       {canAccess('users.detail') && (
//                         <button
//                           onClick={() => navigate(`/admin/users/${u.id}`)}
//                           className="px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
//                         >
//                           Detail
//                         </button>
//                       )}

//                       {/* FALLBACK JIKA TIDAK PUNYA AKSES KEDUANYA */}
//                       {!canAccess('users.chat') && !canAccess('users.detail') && (
//                          <span className="text-[10px] italic text-gray-400">No Action</span>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {users.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="p-8 text-center text-gray-500">
//                     Belum ada pelanggan yang terdaftar.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL CHAT POPUP (SISI ADMIN - FIXED POSITIONING) --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-96 md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[500px] md:rounded-t-2xl animate-fade-in-up">
//           {/* Header Fixed */}
//           <div className="flex items-center justify-between p-4 text-white bg-gray-900 shrink-0 md:rounded-t-2xl">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 font-bold text-gray-900 bg-white rounded-full shadow-sm">
//                 {activeChat.first_name.charAt(0)}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">
//                   {activeChat.first_name} {activeChat.last_name}
//                 </h4>
//                 <p className="text-[10px] tracking-widest text-gray-400 uppercase">
//                   Pelanggan
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setActiveChat(null)}
//               className="p-2 text-gray-300 transition-colors rounded-full hover:bg-white/20 hover:text-white"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Body Pesan (Scrollable) */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-gray-500">
//                   Belum ada percakapan dengan pelanggan ini.
//                 </p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${msg.sender_id === adminUser?.id ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === adminUser?.id ? "bg-gray-900 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}
//                   >
//                     {msg.message}
//                     <p
//                       className={`text-[9px] mt-1 text-right ${msg.sender_id === adminUser?.id ? "text-gray-400" : "text-gray-400"}`}
//                     >
//                       {new Date(msg.created_at).toLocaleTimeString("id-ID", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Footer Input Fixed */}
//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form
//               onSubmit={handleSendMessage}
//               className="flex items-center gap-2"
//             >
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Ketik balasan untuk pelanggan..."
//                 className="flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none focus:border-gray-900 bg-gray-50 focus:bg-white"
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim()}
//                 className="p-2.5 text-white transition-colors rounded-full bg-gray-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
//               >
//                 <svg
//                   className="w-5 h-5 translate-x-[1px] -translate-y-[1px]"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useNavigate } from "react-router-dom";

// declare global {
//   interface Window {
//     Pusher: any;
//     Echo: any;
//   }
// }

// window.Pusher = Pusher;

// interface Staff {
//   id: number;
//   first_name: string;
//   last_name: string;
//   usertype: string;
//   email?: string;
//   profile_image?: string;
// }

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   usertype: string;
//   is_subscribed: boolean;
//   created_at: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
//   sender?: Staff; // Relasi eager loading dari Laravel
// }

// export default function AdminUsersList() {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);

//   useEffect(() => {
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

//   const canAccess = (key: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true;
//     return allowedModules.includes(key);
//   };

//   const activeChatRef = useRef<User | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/users`, {
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Gagal load data pelanggan");
//       const data = await res.json();
//       setUsers(data.data ? data.data : data || []);
//     } catch (error) {
//       console.error("Gagal:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER (REAL-TIME HYBRID)
//   // ==========================================================
//   useEffect(() => {
//     if (!adminUser) return;
//     const token = localStorage.getItem("admin_token");

//     const echoInstance = new Echo({
//       broadcaster: "pusher",
//       key: "5b29faa8d41035b749a1", // Ganti sesuai Pusher Key Anda
//       cluster: "ap1",
//       forceTLS: true,
//       authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
//       auth: { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } },
//     });

//     window.Echo = echoInstance;

//     echoInstance
//       .private(`chat.${adminUser.id}`)
//       .listen(".MessageSent", (e: any) => {
//         const incomingMsg = e.message || e;

//         if (
//           activeChatRef.current &&
//           (incomingMsg.sender_id === activeChatRef.current.id || incomingMsg.receiver_id === activeChatRef.current.id)
//         ) {
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       echoInstance.leave(`chat.${adminUser.id}`);
//     };
//   }, [adminUser]);

//   const openChat = async (user: User) => {
//     setActiveChat(user);
//     const token = localStorage.getItem("admin_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${user.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !adminUser) return;

//     const token = localStorage.getItem("admin_token");
//     const messageText = newMessage.trim();
//     setNewMessage("");

//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: adminUser.id,
//       receiver_id: activeChat.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//       sender: adminUser
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     try {
//       await fetch(`${BASE_URL}/api/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ receiver_id: activeChat.id, message: messageText }),
//       });
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(dateString));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh] font-sans">
//         <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
//       <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Daftar Pelanggan</h1>
//           <p className="mt-1 text-sm text-gray-500">Kelola data pengguna terdaftar di Gycora.</p>
//         </div>
//         <div className="px-4 py-2 text-sm font-bold border rounded-lg bg-emerald-50 text-emerald-700 border-emerald-100">
//           Total: {users.length} Pelanggan
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="border-b border-gray-100 bg-gray-50">
//               <tr>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Pelanggan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Email</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Status Berlangganan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Tanggal Daftar</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {users.map((u) => (
//                 <tr key={u.id} className="transition-colors hover:bg-gray-50">
//                   <td className="flex items-center gap-3 p-4">
//                     <div className="flex items-center justify-center w-10 h-10 text-sm font-bold uppercase rounded-full bg-gycora-light text-gycora-dark shrink-0">
//                       {u.first_name.charAt(0)}{u.last_name.charAt(0)}
//                     </div>
//                     <div>
//                       <span className="block text-sm font-semibold text-gray-900">{u.first_name} {u.last_name}</span>
//                       <span className="text-xs text-gray-500">ID: {u.id}</span>
//                     </div>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">{u.email}</td>
//                   <td className="p-4 text-center">
//                     {u.is_subscribed ? (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Subscribed</span>
//                     ) : (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Reguler</span>
//                     )}
//                   </td>
//                   <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(u.created_at)}</td>
//                   <td className="p-4">
//                     <div className="flex items-center justify-center gap-2">
//                       {canAccess('users.chat') && (
//                         <button
//                           onClick={() => openChat(u)}
//                           className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white transition-colors bg-gycora rounded-lg shadow-sm hover:bg-gycora-dark"
//                         >
//                           Chat
//                         </button>
//                       )}
//                       {canAccess('users.detail') && (
//                         <button
//                           onClick={() => navigate(`/admin/users/${u.id}`)}
//                           className="px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
//                         >
//                           Detail
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL CHAT POPUP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
//           <div className="flex items-center justify-between p-4 text-white bg-gray-900 shrink-0 md:rounded-t-2xl">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 font-bold text-gray-900 bg-white rounded-full shadow-sm">
//                 {activeChat.first_name.charAt(0)}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">{activeChat.first_name} {activeChat.last_name}</h4>
//                 <p className="text-[10px] tracking-widest text-gray-400 uppercase">Pelanggan</p>
//               </div>
//             </div>
//             <button onClick={() => setActiveChat(null)} className="p-2 text-gray-300 transition-colors rounded-full hover:bg-white/20 hover:text-white">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-gray-500">Belum ada percakapan dengan pelanggan ini.</p>
//               </div>
//             ) : (
//               messages.map((msg) => {
//                 // 👇 LOGIKA 3 WARNA BUBBLE CHAT 👇
//                 const isCustomer = msg.sender_id === activeChat.id;
//                 const isAIBot = msg.sender?.email === 'ai@gycora.com';

//                 let bubbleStyle = "";
//                 let labelName = "";

//                 if (isCustomer) {
//                   bubbleStyle = "bg-white border border-gray-200 text-gray-800 rounded-bl-none";
//                   labelName = "Pelanggan";
//                 } else if (isAIBot) {
//                   bubbleStyle = "bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-500/20";
//                   labelName = "AI Bot";
//                 } else {
//                   // Fallback ke Admin
//                   bubbleStyle = "bg-gray-900 text-white rounded-br-none shadow-md";
//                   labelName = "Admin";
//                 }

//                 return (
//                   <div key={msg.id} className={`flex flex-col mb-4 ${isCustomer ? "items-start" : "items-end"}`}>
//                     <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">
//                       {labelName}
//                     </span>
//                     <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${bubbleStyle}`}>
//                       {msg.message}
//                       <p className={`text-[9px] mt-1.5 text-right opacity-80 ${isCustomer ? "text-gray-400" : "text-gray-300"}`}>
//                         {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Ketik balasan untuk pelanggan..."
//                 className="flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none focus:border-gray-900 bg-gray-50 focus:bg-white"
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim()}
//                 className="p-2.5 text-white transition-colors rounded-full bg-gray-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
//               >
//                 <svg className="w-5 h-5 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useNavigate } from "react-router-dom";

// declare global {
//   interface Window {
//     Pusher: any;
//     Echo: any;
//   }
// }

// window.Pusher = Pusher;

// interface Staff {
//   id: number;
//   first_name: string;
//   last_name: string;
//   usertype: string;
//   email?: string;
//   profile_image?: string;
// }

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   usertype: string;
//   is_subscribed: boolean;
//   created_at: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
//   sender?: Staff;
// }

// export default function AdminUsersList() {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);
  
//   // 👇 [PERBAIKAN 1] State untuk menyimpan ID "Gycora Care"
//   const [supportId, setSupportId] = useState<number | null>(null);

//   useEffect(() => {
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

//     // 👇 [PERBAIKAN 2] Ambil ID Gycora Care dari backend agar Pusher bisa menyadapnya
//     const fetchSupportId = async () => {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           if (data && data.length > 0) {
//             setSupportId(data[0].id);
//           }
//         }
//       } catch (e) {
//         console.error("Gagal mengambil ID Support", e);
//       }
//     };
//     fetchSupportId();

//   }, []);

//   const canAccess = (key: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true;
//     return allowedModules.includes(key);
//   };

//   const activeChatRef = useRef<User | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/users`, {
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Gagal load data pelanggan");
//       const data = await res.json();
//       setUsers(data.data ? data.data : data || []);
//     } catch (error) {
//       console.error("Gagal:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER (REAL-TIME HYBRID)
//   // ==========================================================
//   useEffect(() => {
//     // 👇 [PERBAIKAN 3] Jangan jalankan Pusher sebelum ID Gycora Care didapatkan
//     if (!adminUser || !supportId) return;
    
//     const token = localStorage.getItem("admin_token");

//     const echoInstance = new Echo({
//       broadcaster: "pusher",
//       key: "5b29faa8d41035b749a1",
//       cluster: "ap1",
//       forceTLS: true,
//       authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
//       auth: { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } },
//     });

//     window.Echo = echoInstance;

//     echoInstance
//       // 👇 [PERBAIKAN 4] Dengarkan kotak pos milik "Gycora Care", BUKAN milik admin pribadi!
//       .private(`chat.${supportId}`)
//       .listen(".MessageSent", (e: any) => {
//         const incomingMsg = e.message || e;

//         if (
//           activeChatRef.current &&
//           (incomingMsg.sender_id === activeChatRef.current.id || incomingMsg.receiver_id === activeChatRef.current.id)
//         ) {
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       // 👇 [PERBAIKAN 5] Tinggalkan kotak pos Gycora Care saat keluar
//       echoInstance.leave(`chat.${supportId}`);
//     };
//   }, [adminUser, supportId]); // Tambahkan supportId ke dependency array

//   const openChat = async (user: User) => {
//     setActiveChat(user);
//     const token = localStorage.getItem("admin_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${user.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !adminUser) return;

//     const token = localStorage.getItem("admin_token");
//     const messageText = newMessage.trim();
//     setNewMessage("");

//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: adminUser.id,
//       receiver_id: activeChat.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//       sender: adminUser
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     try {
//       await fetch(`${BASE_URL}/api/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ receiver_id: activeChat.id, message: messageText }),
//       });
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(dateString));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh] font-sans">
//         <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
//       <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Daftar Pelanggan</h1>
//           <p className="mt-1 text-sm text-gray-500">Kelola data pengguna terdaftar di Gycora.</p>
//         </div>
//         <div className="px-4 py-2 text-sm font-bold border rounded-lg bg-emerald-50 text-emerald-700 border-emerald-100">
//           Total: {users.length} Pelanggan
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="border-b border-gray-100 bg-gray-50">
//               <tr>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Pelanggan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Email</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Status Berlangganan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Tanggal Daftar</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {users.map((u) => (
//                 <tr key={u.id} className="transition-colors hover:bg-gray-50">
//                   <td className="flex items-center gap-3 p-4">
//                     <div className="flex items-center justify-center w-10 h-10 text-sm font-bold uppercase rounded-full bg-gycora-light text-gycora-dark shrink-0">
//                       {u.first_name.charAt(0)}{u.last_name.charAt(0)}
//                     </div>
//                     <div>
//                       <span className="block text-sm font-semibold text-gray-900">{u.first_name} {u.last_name}</span>
//                       <span className="text-xs text-gray-500">ID: {u.id}</span>
//                     </div>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">{u.email}</td>
//                   <td className="p-4 text-center">
//                     {u.is_subscribed ? (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Subscribed</span>
//                     ) : (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Reguler</span>
//                     )}
//                   </td>
//                   <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(u.created_at)}</td>
//                   <td className="p-4">
//                     <div className="flex items-center justify-center gap-2">
//                       {canAccess('users.chat') && (
//                         <button
//                           onClick={() => openChat(u)}
//                           className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white transition-colors bg-gycora rounded-lg shadow-sm hover:bg-gycora-dark"
//                         >
//                           Chat
//                         </button>
//                       )}
//                       {canAccess('users.detail') && (
//                         <button
//                           onClick={() => navigate(`/admin/users/${u.id}`)}
//                           className="px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
//                         >
//                           Detail
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL CHAT POPUP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
//           <div className="flex items-center justify-between p-4 text-white bg-gray-900 shrink-0 md:rounded-t-2xl">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 font-bold text-gray-900 bg-white rounded-full shadow-sm">
//                 {activeChat.first_name.charAt(0)}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">{activeChat.first_name} {activeChat.last_name}</h4>
//                 <p className="text-[10px] tracking-widest text-gray-400 uppercase">Pelanggan</p>
//               </div>
//             </div>
//             <button onClick={() => setActiveChat(null)} className="p-2 text-gray-300 transition-colors rounded-full hover:bg-white/20 hover:text-white">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-gray-500">Belum ada percakapan dengan pelanggan ini.</p>
//               </div>
//             ) : (
//               messages.map((msg) => {
//                 const isCustomer = msg.sender_id === activeChat.id;
//                 const isAIBot = msg.sender?.email === 'ai@gycora.com';

//                 let bubbleStyle = "";
//                 let labelName = "";

//                 if (isCustomer) {
//                   bubbleStyle = "bg-white border border-gray-200 text-gray-800 rounded-bl-none";
//                   labelName = "Pelanggan";
//                 } else if (isAIBot) {
//                   bubbleStyle = "bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-500/20";
//                   labelName = "AI Bot";
//                 } else {
//                   bubbleStyle = "bg-gray-900 text-white rounded-br-none shadow-md";
//                   labelName = "Admin";
//                 }

//                 return (
//                   <div key={msg.id} className={`flex flex-col mb-4 ${isCustomer ? "items-start" : "items-end"}`}>
//                     <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">
//                       {labelName}
//                     </span>
//                     <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${bubbleStyle}`}>
//                       {msg.message}
//                       <p className={`text-[9px] mt-1.5 text-right opacity-80 ${isCustomer ? "text-gray-400" : "text-gray-300"}`}>
//                         {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Ketik balasan untuk pelanggan..."
//                 className="flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none focus:border-gray-900 bg-gray-50 focus:bg-white"
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim()}
//                 className="p-2.5 text-white transition-colors rounded-full bg-gray-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
//               >
//                 <svg className="w-5 h-5 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef, useMemo } from "react";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useNavigate } from "react-router-dom";

// declare global {
//   interface Window {
//     Pusher: any;
//     Echo: any;
//   }
// }

// window.Pusher = Pusher;

// interface Staff {
//   id: number;
//   first_name: string;
//   last_name: string;
//   usertype: string;
//   email?: string;
//   profile_image?: string;
// }

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   usertype: string;
//   is_subscribed: boolean;
//   created_at: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
//   sender?: Staff;
// }

// export default function AdminUsersList() {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);
  
//   const [supportId, setSupportId] = useState<number | null>(null);

//   useEffect(() => {
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

//     const fetchSupportId = async () => {
//       try {
//         const token = localStorage.getItem("admin_token");
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           if (data && data.length > 0) {
//             setSupportId(data[0].id);
//           }
//         }
//       } catch (e) {
//         console.error("Gagal mengambil ID Support", e);
//       }
//     };
//     fetchSupportId();

//   }, []);

//   const canAccess = (key: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true;
//     return allowedModules.includes(key);
//   };

//   const activeChatRef = useRef<User | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("admin_token");
//       const res = await fetch(`${BASE_URL}/api/admin/users`, {
//         headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Gagal load data pelanggan");
//       const data = await res.json();
//       setUsers(data.data ? data.data : data || []);
//     } catch (error) {
//       console.error("Gagal:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER (REAL-TIME HYBRID)
//   // ==========================================================
//   useEffect(() => {
//     if (!adminUser || !supportId) return;
    
//     const token = localStorage.getItem("admin_token");

//     const echoInstance = new Echo({
//       broadcaster: "pusher",
//       key: "5b29faa8d41035b749a1",
//       cluster: "ap1",
//       forceTLS: true,
//       authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
//       auth: { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } },
//     });

//     window.Echo = echoInstance;

//     echoInstance.private(`chat.${supportId}`).listen(".MessageSent", (e: any) => {
//       const incomingMsg = e.message || e;

//       if (activeChatRef.current && (incomingMsg.sender_id === activeChatRef.current.id || incomingMsg.receiver_id === activeChatRef.current.id)) {
//         setMessages((prev) => {
//           if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//           return [...prev, incomingMsg];
//         });
        
//         // Tandai otomatis dibaca karena Admin sedang menatap layar tersebut
//         if (incomingMsg.sender_id === activeChatRef.current.id) {
//            fetch(`${BASE_URL}/api/chat/read/${activeChatRef.current.id}`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }});
//            window.dispatchEvent(new Event("refresh-admin-chat-badge"));
//         }
//       } else {
//         // Minta tabel merender ulang posisi jika admin TIDAK sedang membuka obrolannya
//         fetchUsers();
//         window.dispatchEvent(new Event("refresh-admin-chat-badge"));
//       }
//     });

//     return () => {
//       echoInstance.leave(`chat.${supportId}`);
//     };
//   }, [adminUser, supportId]);

//   const openChat = async (user: User) => {
//     setActiveChat(user);
//     const token = localStorage.getItem("admin_token");
    
//     try {
//       await fetch(`${BASE_URL}/api/chat/read/${user.id}`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       window.dispatchEvent(new Event("refresh-admin-chat-badge"));
//       fetchUsers(); // Refresh tabel agar pengurutan kembali normal
//     } catch (e) {}

//     const res = await fetch(`${BASE_URL}/api/messages/${user.id}`, { headers: { Authorization: `Bearer ${token}` } });
//     if (res.ok) setMessages(await res.json());
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !adminUser) return;

//     const token = localStorage.getItem("admin_token");
//     const messageText = newMessage.trim();
//     setNewMessage("");

//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: adminUser.id,
//       receiver_id: activeChat.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//       sender: adminUser
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     try {
//       await fetch(`${BASE_URL}/api/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ receiver_id: activeChat.id, message: messageText }),
//       });
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(dateString));
//   };

//   const sortedUsers = useMemo(() => {
//     const result = [...users];
//     return result.sort((a, b) => {
//       const aUnread = (a as any).unread_count || 0;
//       const bUnread = (b as any).unread_count || 0;
//       if (aUnread !== bUnread) return bUnread - aUnread;
//       return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//     });
//   }, [users]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh] font-sans">
//         <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
//       <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Daftar Pelanggan</h1>
//           <p className="mt-1 text-sm text-gray-500">Kelola data pengguna terdaftar di Gycora.</p>
//         </div>
//         <div className="px-4 py-2 text-sm font-bold border rounded-lg bg-emerald-50 text-emerald-700 border-emerald-100">
//           Total: {users.length} Pelanggan
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="border-b border-gray-100 bg-gray-50">
//               <tr>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Pelanggan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Email</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Status Berlangganan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Tanggal Daftar</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {sortedUsers.map((u) => (
//                 <tr key={u.id} className={`transition-colors ${(u as any).unread_count > 0 ? "bg-red-50/40" : "hover:bg-gray-50"}`}>
//                   <td className="flex items-center gap-3 p-4">
//                     <div className="flex items-center justify-center w-10 h-10 text-sm font-bold uppercase rounded-full bg-gycora-light text-gycora-dark shrink-0">
//                       {u.first_name.charAt(0)}{u.last_name.charAt(0)}
//                     </div>
//                     <div>
//                       <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
//                         {u.first_name} {u.last_name}
//                         {(u as any).unread_count > 0 && (
//                           <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-red-600 rounded-full shadow-sm animate-pulse">
//                             {(u as any).unread_count} New
//                           </span>
//                         )}
//                       </span>
//                       <span className="block mt-0.5 text-xs text-gray-500">ID: {u.id}</span>
//                     </div>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">{u.email}</td>
//                   <td className="p-4 text-center">
//                     {u.is_subscribed ? (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Subscribed</span>
//                     ) : (
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Reguler</span>
//                     )}
//                   </td>
//                   <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(u.created_at)}</td>
//                   <td className="p-4">
//                     <div className="flex items-center justify-center gap-2">
//                       {canAccess('users.chat') && (
//                         <button
//                           onClick={() => openChat(u)}
//                           className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white transition-colors bg-gycora rounded-lg shadow-sm hover:bg-gycora-dark"
//                         >
//                           Chat
//                         </button>
//                       )}
//                       {canAccess('users.detail') && (
//                         <button
//                           onClick={() => navigate(`/admin/users/${u.id}`)}
//                           className="px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
//                         >
//                           Detail
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL CHAT POPUP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
//           <div className="flex items-center justify-between p-4 text-white bg-gray-900 shrink-0 md:rounded-t-2xl">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 font-bold text-gray-900 bg-white rounded-full shadow-sm">
//                 {activeChat.first_name.charAt(0)}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">{activeChat.first_name} {activeChat.last_name}</h4>
//                 <p className="text-[10px] tracking-widest text-gray-400 uppercase">Pelanggan</p>
//               </div>
//             </div>
//             <button onClick={() => setActiveChat(null)} className="p-2 text-gray-300 transition-colors rounded-full hover:bg-white/20 hover:text-white">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-gray-500">Belum ada percakapan dengan pelanggan ini.</p>
//               </div>
//             ) : (
//               messages.map((msg) => {
//                 const isCustomer = msg.sender_id === activeChat.id;
//                 const isAIBot = msg.sender?.email === 'ai@gycora.com';

//                 let bubbleStyle = "";
//                 let labelName = "";

//                 if (isCustomer) {
//                   bubbleStyle = "bg-white border border-gray-200 text-gray-800 rounded-bl-none";
//                   labelName = "Pelanggan";
//                 } else if (isAIBot) {
//                   bubbleStyle = "bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-500/20";
//                   labelName = "AI Bot";
//                 } else {
//                   bubbleStyle = "bg-gray-900 text-white rounded-br-none shadow-md";
//                   labelName = "Admin";
//                 }

//                 return (
//                   <div key={msg.id} className={`flex flex-col mb-4 ${isCustomer ? "items-start" : "items-end"}`}>
//                     <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">
//                       {labelName}
//                     </span>
//                     <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${bubbleStyle}`}>
//                       {msg.message}
//                       <p className={`text-[9px] mt-1.5 text-right opacity-80 ${isCustomer ? "text-gray-400" : "text-gray-300"}`}>
//                         {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Ketik balasan untuk pelanggan..."
//                 className="flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none focus:border-gray-900 bg-gray-50 focus:bg-white"
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim()}
//                 className="p-2.5 text-white transition-colors rounded-full bg-gray-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
//               >
//                 <svg className="w-5 h-5 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useMemo } from "react";
import { BASE_URL } from "../../config/api";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}

window.Pusher = Pusher;

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  usertype: string;
  email?: string;
  profile_image?: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  usertype: string;
  is_subscribed: boolean;
  created_at: string;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
  sender?: Staff;
}

export default function AdminUsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeChat, setActiveChat] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  const [supportId, setSupportId] = useState<number | null>(null);

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

    const fetchSupportId = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/staff-list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSupportId(data[0].id);
          }
        }
      } catch (e) {
        console.error("Gagal mengambil ID Support", e);
      }
    };
    fetchSupportId();

  }, []);

  const canAccess = (key: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true;
    return allowedModules.includes(key);
  };

  const activeChatRef = useRef<User | null>(null);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/users`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal load data pelanggan");
      const data = await res.json();
      setUsers(data.data ? data.data : data || []);
    } catch (error) {
      console.error("Gagal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!adminUser || !supportId) return;

    const token = localStorage.getItem("admin_token");

    const echoInstance = new Echo({
      broadcaster: "pusher",
      key: "5b29faa8d41035b749a1",
      cluster: "ap1",
      forceTLS: true,
      authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
      auth: { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } },
    });

    window.Echo = echoInstance;

    echoInstance.private(`chat.${supportId}`).listen(".MessageSent", (e: any) => {
      const incomingMsg = e.message || e;

      if (activeChatRef.current && (incomingMsg.sender_id === activeChatRef.current.id || incomingMsg.receiver_id === activeChatRef.current.id)) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === incomingMsg.id)) return prev;
          return [...prev, incomingMsg];
        });

        if (incomingMsg.sender_id === activeChatRef.current.id) {
          fetch(`${BASE_URL}/api/chat/read/${activeChatRef.current.id}`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
          window.dispatchEvent(new Event("refresh-admin-chat-badge"));
        }
      } else {
        fetchUsers();
        window.dispatchEvent(new Event("refresh-admin-chat-badge"));
      }
    });

    return () => {
      echoInstance.leave(`chat.${supportId}`);
    };
  }, [adminUser, supportId]);

  const openChat = async (user: User) => {
    setActiveChat(user);
    const token = localStorage.getItem("admin_token");

    try {
      await fetch(`${BASE_URL}/api/chat/read/${user.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      window.dispatchEvent(new Event("refresh-admin-chat-badge"));
      fetchUsers();
    } catch (e) { }

    const res = await fetch(`${BASE_URL}/api/messages/${user.id}`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setMessages(await res.json());
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !adminUser) return;

    const token = localStorage.getItem("admin_token");
    const messageText = newMessage.trim();
    setNewMessage("");

    const tempMsg: Message = {
      id: Date.now(),
      sender_id: adminUser.id,
      receiver_id: activeChat.id,
      message: messageText,
      created_at: new Date().toISOString(),
      sender: adminUser
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      await fetch(`${BASE_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ receiver_id: activeChat.id, message: messageText }),
      });
    } catch (error) {
      console.error("Gagal mengirim:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(dateString));
  };

  const sortedUsers = useMemo(() => {
    const result = [...users];
    return result.sort((a, b) => {
      const aUnread = (a as any).unread_count || 0;
      const bUnread = (b as any).unread_count || 0;
      if (aUnread !== bUnread) return bUnread - aUnread;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [users]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] font-sans">
        <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  return (
    <div className="relative p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
      <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Pelanggan</h1>
          <p className="mt-1 text-sm text-gray-500">Kelola data pengguna terdaftar di Gycora.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 text-sm font-bold border rounded-lg bg-emerald-50 text-emerald-700 border-emerald-100">
            Total: {users.length} Pelanggan
          </div>
          {/* 👇 TOMBOL MENUJU HALAMAN RESELLER 👇 */}
          <button
            onClick={() => navigate('/admin/resellers')}
            className="px-4 py-2 text-sm font-bold text-white transition-colors rounded-lg bg-gycora hover:bg-gycora-dark shadow-md"
          >
            Kelola Reseller / Affiliate
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Pelanggan</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Status Berlangganan</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Tanggal Daftar</th>
                <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedUsers.map((u) => (
                <tr key={u.id} className={`transition-colors ${(u as any).unread_count > 0 ? "bg-red-50/40" : "hover:bg-gray-50"}`}>
                  <td className="flex items-center gap-3 p-4">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-bold uppercase rounded-full bg-gycora-light text-gycora-dark shrink-0">
                      {u.first_name.charAt(0)}{u.last_name.charAt(0)}
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        {u.first_name} {u.last_name}
                        {(u as any).unread_count > 0 && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-red-600 rounded-full shadow-sm animate-pulse">
                            {(u as any).unread_count} New
                          </span>
                        )}
                      </span>
                      <span className="block mt-0.5 text-xs text-gray-500">ID: {u.id}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{u.email}</td>
                  <td className="p-4 text-center">
                    {u.is_subscribed ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Subscribed</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Reguler</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(u.created_at)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {canAccess('users.chat') && (
                        <button
                          onClick={() => openChat(u)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white transition-colors bg-gycora rounded-lg shadow-sm hover:bg-gycora-dark"
                        >
                          Chat
                        </button>
                      )}
                      {canAccess('users.detail') && (
                        <button
                          onClick={() => navigate(`/admin/users/${u.id}`)}
                          className="px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
                        >
                          Detail
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL CHAT POPUP (Sama seperti sebelumnya) --- */}
      {activeChat && (
        <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
          <div className="flex items-center justify-between p-4 text-white bg-gray-900 shrink-0 md:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-gray-900 bg-white rounded-full shadow-sm">
                {activeChat.first_name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">{activeChat.first_name} {activeChat.last_name}</h4>
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">Pelanggan</p>
              </div>
            </div>
            <button onClick={() => setActiveChat(null)} className="p-2 text-gray-300 transition-colors rounded-full hover:bg-white/20 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-50">
                <p className="text-sm font-medium text-gray-500">Belum ada percakapan dengan pelanggan ini.</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isCustomer = msg.sender_id === activeChat.id;
                const isAIBot = msg.sender?.email === 'ai@gycora.com';

                let bubbleStyle = "";
                let labelName = "";

                if (isCustomer) {
                  bubbleStyle = "bg-white border border-gray-200 text-gray-800 rounded-bl-none";
                  labelName = "Pelanggan";
                } else if (isAIBot) {
                  bubbleStyle = "bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-500/20";
                  labelName = "AI Bot";
                } else {
                  bubbleStyle = "bg-gray-900 text-white rounded-br-none shadow-md";
                  labelName = "Admin";
                }

                return (
                  <div key={msg.id} className={`flex flex-col mb-4 ${isCustomer ? "items-start" : "items-end"}`}>
                    <span className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">
                      {labelName}
                    </span>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${bubbleStyle}`}>
                      {msg.message}
                      <p className={`text-[9px] mt-1.5 text-right opacity-80 ${isCustomer ? "text-gray-400" : "text-gray-300"}`}>
                        {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ketik balasan untuk pelanggan..."
                className="flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none focus:border-gray-900 bg-gray-50 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2.5 text-white transition-colors rounded-full bg-gray-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <svg className="w-5 h-5 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}