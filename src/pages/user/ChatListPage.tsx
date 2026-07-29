/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Language Context

// // --- SOLUSI ERROR TYPESCRIPT ---
// // Memberi tahu TypeScript bahwa objek window sekarang memiliki properti Pusher
// declare global {
//   interface Window {
//     Pusher: any;
//   }
// }

// // Setup Pusher di Window object agar dikenali oleh Echo
// window.Pusher = Pusher;

// interface Staff {
//   id: number;
//   first_name: string;
//   last_name: string;
//   usertype: string;
//   profile_image?: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// export default function ChatListPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage(); // [BARU] Inisialisasi hook bahasa
  
//   const [staffList, setStaffList] = useState<Staff[]>([]);
//   const [loading, setLoading] = useState(true);

//   // State untuk Chat Popup Fixed
//   const [activeChat, setActiveChat] = useState<Staff | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // TAMBAHKAN REF INI DI DEKAT STATE ACTIVECHAT (DI BAGIAN ATAS KOMPONEN)
//   const activeChatRef = useRef<Staff | null>(null);

//   // Setiap kali activeChat berubah, update Ref-nya
//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const userStr = localStorage.getItem("user_data");
//     if (!token || !userStr) {
//       navigate("/login");
//       return;
//     }
//     setCurrentUser(JSON.parse(userStr));

//     const fetchStaff = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) setStaffList(await res.json());
//       } catch (error) {
//         console.error("Gagal memuat kontak:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStaff();
//   }, [navigate]);

//   // Auto Scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER (REAL-TIME FIX)
//   // ==========================================================
//   useEffect(() => {
//     if (!currentUser) return;

//     const token = localStorage.getItem("user_token");

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
//       .private(`chat.${currentUser.id}`)
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
//       echoInstance.leave(`chat.${currentUser.id}`);
//     };
//   }, [currentUser]);

//   const openChat = async (staff: Staff) => {
//     setActiveChat(staff);
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !currentUser) return;

//     const token = localStorage.getItem("user_token");
//     const messageText = newMessage.trim();
//     setNewMessage(""); // Kosongkan input seketika

//     // Optimistic update (Pengirim melihat pesannya langsung)
//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: currentUser.id,
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

//   return (
//     // [PERBAIKAN LAYOUT] max-w-4xl diubah menjadi max-w-7xl agar lebih proporsional dengan halaman lain
//     <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
//       <div className="mb-8 md:mb-12">
//         <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
//           {t("chat_title")}
//         </h1>
//         <p className="mt-2 text-base text-gray-500">
//           {t("chat_subtitle")}
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-12">
//           <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//         </div>
//       ) : (
//         // [PERBAIKAN LAYOUT] Menambah kolom menjadi 3 pada layar besar (lg) agar tidak kepanjangan
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
//           {staffList.map((staff) => (
//             <div
//               key={staff.id}
//               onClick={() => openChat(staff)}
//               className="flex items-center gap-4 p-5 transition-all bg-white border border-gray-200 cursor-pointer rounded-2xl hover:border-gycora hover:shadow-lg group"
//             >
//               <div className="flex items-center justify-center font-bold text-white rounded-full shadow-inner w-14 h-14 bg-gycora shrink-0">
//                 {staff.first_name.charAt(0)}
//                 {staff.last_name.charAt(0)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-lg font-bold text-gray-900 truncate transition-colors group-hover:text-gycora">
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate">
//                   {staff.usertype}
//                 </p>
//               </div>
//               <div className="p-2 transition-colors rounded-full shrink-0 text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* --- MODAL CHAT POP-UP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
//           {/* Header Fixed */}
//           <div className="flex items-center justify-between p-4 text-white shrink-0 bg-gycora md:rounded-t-2xl">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full shadow-sm text-gycora">
//                 {activeChat.first_name.charAt(0)}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">
//                   {activeChat.first_name} {activeChat.last_name}
//                 </h4>
//                 <p className="text-[10px] tracking-widest uppercase opacity-90">
//                   {activeChat.usertype}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setActiveChat(null)}
//               className="p-2 transition-colors rounded-full hover:bg-white/20"
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

//           {/* Body Pesan */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-gray-500">
//                   {t("chat_empty_msg")}
//                 </p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === currentUser?.id ? "bg-gycora text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}
//                   >
//                     {msg.message}
//                     <p
//                       className={`text-[9px] mt-1 text-right ${msg.sender_id === currentUser?.id ? "text-emerald-100" : "text-gray-400"}`}
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

//           {/* Footer Input */}
//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form
//               onSubmit={handleSendMessage}
//               className="flex items-center gap-2"
//             >
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder={t("chat_input_placeholder")}
//                 className="flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none focus:border-gycora bg-gray-50 focus:bg-white"
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim()}
//                 className="p-2.5 text-white transition-colors rounded-full bg-gycora hover:bg-gycora-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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
// // 

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useLanguage } from "../../context/LanguageContext";

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
//   profile_image?: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// export default function ChatListPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage(); 
  
//   const [staffList, setStaffList] = useState<Staff[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<Staff | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   // State baru untuk animasi typing AI
//   const [isAITyping, setIsAITyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const activeChatRef = useRef<Staff | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const userStr = localStorage.getItem("user_data");
//     if (!token || !userStr) {
//       navigate("/login");
//       return;
//     }
//     setCurrentUser(JSON.parse(userStr));

//     const fetchStaff = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) setStaffList(await res.json());
//       } catch (error) {
//         console.error("Gagal memuat kontak:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStaff();
//   }, [navigate]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isAITyping]); // Tambah isAITyping agar scroll saat animasi muncul

//   // ==========================================================
//   // LARAVEL ECHO LISTENER (REAL-TIME FIX)
//   // ==========================================================
//   useEffect(() => {
//     if (!currentUser) return;

//     const token = localStorage.getItem("user_token");

//     const echoInstance = new Echo({
//       broadcaster: "pusher",
//       key: "5b29faa8d41035b749a1", // Sesuaikan dengan PUSHER_APP_KEY Anda
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
//       .private(`chat.${currentUser.id}`)
//       .listen(".MessageSent", (e: any) => {
//         const incomingMsg = e.message || e;

//         // Jika pengirimnya sesuai dengan yang sedang dibuka chat-nya (termasuk AI dengan ID 0)
//         if (
//           activeChatRef.current &&
//           incomingMsg.sender_id === activeChatRef.current.id
//         ) {
//           // Jika yang balas AI, matikan loading typing
//           if (incomingMsg.sender_id === 0) setIsAITyping(false);
          
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       echoInstance.leave(`chat.${currentUser.id}`);
//     };
//   }, [currentUser]);

//   const openChat = async (staff: Staff) => {
//     setActiveChat(staff);
//     setIsAITyping(false); // Reset status typing
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   // const handleSendMessage = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!newMessage.trim() || !activeChat || !currentUser) return;

//   //   const token = localStorage.getItem("user_token");
//   //   const messageText = newMessage.trim();
//   //   setNewMessage("");

//   //   const tempMsg: Message = {
//   //     id: Date.now(),
//   //     sender_id: currentUser.id,
//   //     receiver_id: activeChat.id,
//   //     message: messageText,
//   //     created_at: new Date().toISOString(),
//   //   };
//   //   setMessages((prev) => [...prev, tempMsg]);

//   //   // Jika pesan dikirim ke AI, tampilkan animasi typing
//   //   if (activeChat.id === 0) {
//   //     setIsAITyping(true);
//   //   }

//   //   try {
//   //     await fetch(`${BASE_URL}/api/messages`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify({
//   //         receiver_id: activeChat.id,
//   //         message: messageText,
//   //       }),
//   //     });
//   //   } catch (error) {
//   //     console.error("Gagal mengirim:", error);
//   //     setIsAITyping(false); // Matikan loading jika API error
//   //   }
//   // };

//   // const handleSendMessage = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!newMessage.trim() || !activeChat || !currentUser) return;

//   //   const token = localStorage.getItem("user_token");
//   //   const messageText = newMessage.trim();
//   //   setNewMessage("");

//   //   // 1. Tampilkan pesan user ke layar (Optimistic Update)
//   //   const tempMsg: Message = {
//   //     id: Date.now(),
//   //     sender_id: currentUser.id,
//   //     receiver_id: activeChat.id,
//   //     message: messageText,
//   //     created_at: new Date().toISOString(),
//   //   };
//   //   setMessages((prev) => [...prev, tempMsg]);

//   //   // 2. Jika pesan dikirim ke AI, nyalakan animasi typing
//   //   if (activeChat.id === 0) {
//   //     setIsAITyping(true);
//   //   }

//   //   try {
//   //     const response = await fetch(`${BASE_URL}/api/messages`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify({
//   //         receiver_id: activeChat.id,
//   //         message: messageText,
//   //       }),
//   //     });

//   //     if (response.ok) {
//   //       const result = await response.json();
        
//   //       // 3. JIKA AI MEMBALAS (tangkap respon HTTP-nya)
//   //       if (activeChat.id === 0 && result.ai_message) {
//   //         setIsAITyping(false); // Matikan loading typing
          
//   //         // Masukkan balasan AI ke layar
//   //         setMessages((prev) => {
//   //           if (prev.some((m) => m.id === result.ai_message.id)) return prev;
//   //           return [...prev, result.ai_message];
//   //         });
//   //       }
//   //     } else {
//   //       throw new Error("Gagal memproses pesan.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Gagal mengirim:", error);
//   //     if (activeChat.id === 0) setIsAITyping(false);
//   //   }
//   // };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !currentUser) return;

//     const token = localStorage.getItem("user_token");
//     const messageText = newMessage.trim();
//     setNewMessage("");

//     // 1. Tampilkan pesan user ke layar seketika
//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: currentUser.id,
//       receiver_id: activeChat.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     // 2. Jika pesan dikirim ke AI, nyalakan animasi typing
//     if (activeChat.id === 0) {
//       setIsAITyping(true);
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/api/messages`, {
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

//       if (response.ok) {
//         const result = await response.json();
        
//         // 3. JIKA AI MEMBALAS (tangkap respon HTTP-nya)
//         if (activeChat.id === 0 && result.ai_message) {
//           setIsAITyping(false); // Matikan animasi typing
          
//           // Masukkan balasan AI ke layar
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === result.ai_message.id)) return prev;
//             return [...prev, result.ai_message];
//           });
//         }
//       } else {
//         throw new Error("Server mengembalikan respons error.");
//       }
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
      
//       // Jika error dan sedang chat dengan AI, beritahu user dan matikan animasi
//       if (activeChat.id === 0) {
//         setIsAITyping(false);
//         const errorMsg: Message = {
//           id: Date.now() + 1,
//           sender_id: 0,
//           receiver_id: currentUser.id,
//           message: "Maaf kak, gagal menghubungi server AI. Coba lagi sebentar ya.",
//           created_at: new Date().toISOString(),
//         };
//         setMessages((prev) => [...prev, errorMsg]);
//       }
//     }
//   };

//   return (
//     <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
//       <div className="mb-8 md:mb-12">
//         <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
//           {t("chat_title")}
//         </h1>
//         <p className="mt-2 text-base text-gray-500">
//           {t("chat_subtitle")}
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-12">
//           <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
//           {staffList.map((staff) => (
//             <div
//               key={`staff-${staff.id}`}
//               onClick={() => openChat(staff)}
//               className={`flex items-center gap-4 p-5 transition-all border cursor-pointer rounded-2xl group ${
//                 staff.id === 0 
//                 ? "bg-gradient-to-r from-purple-50 to-white border-purple-200 hover:border-purple-400 hover:shadow-purple-500/20 shadow-sm" 
//                 : "bg-white border-gray-200 hover:border-gycora hover:shadow-lg"
//               }`}
//             >
//               <div className={`flex items-center justify-center font-bold text-white rounded-full shadow-inner w-14 h-14 shrink-0 ${staff.id === 0 ? "bg-purple-600" : "bg-gycora"}`}>
//                 {staff.id === 0 ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{staff.first_name.charAt(0)}{staff.last_name.charAt(0)}</>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className={`text-lg font-bold truncate transition-colors ${staff.id === 0 ? "text-purple-900 group-hover:text-purple-600" : "text-gray-900 group-hover:text-gycora"}`}>
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p className={`text-xs font-bold uppercase tracking-widest mt-0.5 truncate ${staff.id === 0 ? "text-purple-500" : "text-gray-400"}`}>
//                   {staff.usertype}
//                 </p>
//               </div>
//               <div className={`p-2 transition-colors rounded-full shrink-0 ${staff.id === 0 ? "text-purple-600 bg-purple-100 group-hover:bg-purple-600 group-hover:text-white" : "text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white"}`}>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* --- MODAL CHAT POP-UP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
//           {/* Header Fixed */}
//           <div className={`flex items-center justify-between p-4 text-white shrink-0 md:rounded-t-2xl ${activeChat.id === 0 ? "bg-purple-600" : "bg-gycora"}`}>
//             <div className="flex items-center gap-3">
//               <div className={`flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full shadow-sm ${activeChat.id === 0 ? "text-purple-600" : "text-gycora"}`}>
//                 {activeChat.id === 0 ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{activeChat.first_name.charAt(0)}</>
//                 )}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">
//                   {activeChat.first_name} {activeChat.last_name}
//                 </h4>
//                 <p className="text-[10px] tracking-widest uppercase opacity-90">
//                   {activeChat.usertype}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setActiveChat(null)}
//               className="p-2 transition-colors rounded-full hover:bg-white/20"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           {/* Body Pesan */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-gray-500">
//                   {activeChat.id === 0 ? "Halo! Apa yang ingin Anda ketahui tentang produk Gycora?" : t("chat_empty_msg")}
//                 </p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === currentUser?.id ? (activeChat.id === 0 ? "bg-purple-600 text-white rounded-br-none" : "bg-gycora text-white rounded-br-none") : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
//                     <div dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br/>') }} />
//                     <p className={`text-[9px] mt-1 text-right ${msg.sender_id === currentUser?.id ? "text-white/70" : "text-gray-400"}`}>
//                       {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Animasi Mengetik Khusus AI */}
//             {isAITyping && activeChat.id === 0 && (
//               <div className="flex justify-start">
//                 <div className="max-w-[80%] px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Footer Input */}
//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder={t("chat_input_placeholder")}
//                 disabled={isAITyping} // Kunci input saat AI sedang mikir
//                 className={`flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none bg-gray-50 focus:bg-white ${activeChat.id === 0 ? "focus:border-purple-500" : "focus:border-gycora"}`}
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim() || isAITyping}
//                 className={`p-2.5 text-white transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${activeChat.id === 0 ? "bg-purple-600 hover:bg-purple-800" : "bg-gycora hover:bg-gycora-dark"}`}
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

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useLanguage } from "../../context/LanguageContext";

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
//   profile_image?: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// export default function ChatListPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage(); 
  
//   const [staffList, setStaffList] = useState<Staff[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<Staff | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isAITyping, setIsAITyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const activeChatRef = useRef<Staff | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const userStr = localStorage.getItem("user_data");
//     if (!token || !userStr) {
//       navigate("/login");
//       return;
//     }
//     setCurrentUser(JSON.parse(userStr));

//     const fetchStaff = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) setStaffList(await res.json());
//       } catch (error) {
//         console.error("Gagal memuat kontak:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStaff();
//   }, [navigate]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isAITyping]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER
//   // ==========================================================
//   useEffect(() => {
//     if (!currentUser) return;

//     const token = localStorage.getItem("user_token");

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
//       .private(`chat.${currentUser.id}`)
//       .listen(".MessageSent", (e: any) => {
//         const incomingMsg = e.message || e;

//         if (activeChatRef.current && incomingMsg.sender_id === activeChatRef.current.id) {
//           if (activeChatRef.current.usertype === "ai") setIsAITyping(false);
          
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       echoInstance.leave(`chat.${currentUser.id}`);
//     };
//   }, [currentUser]);

//   const openChat = async (staff: Staff) => {
//     setActiveChat(staff);
//     setIsAITyping(false);
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !currentUser) return;

//     const token = localStorage.getItem("user_token");
//     const messageText = newMessage.trim();
//     setNewMessage("");

//     // Optimistic Update
//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: currentUser.id,
//       receiver_id: activeChat.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     const isAI = activeChat.usertype === "ai";
//     if (isAI) setIsAITyping(true);

//     try {
//       const response = await fetch(`${BASE_URL}/api/messages`, {
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

//       if (response.ok) {
//         const result = await response.json();
        
//         // JIKA AI MEMBALAS DARI HTTP RESPONSE
//         if (isAI && result.ai_message) {
//           setIsAITyping(false);
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === result.ai_message.id)) return prev;
//             return [...prev, result.ai_message];
//           });
//         }
//       } else {
//         throw new Error("Gagal memproses pesan.");
//       }
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//       if (isAI) {
//         setIsAITyping(false);
//         const errorMsg: Message = {
//           id: Date.now() + 1,
//           sender_id: activeChat.id,
//           receiver_id: currentUser.id,
//           message: "Maaf kak, gagal menghubungi server AI. Coba lagi sebentar ya.",
//           created_at: new Date().toISOString(),
//         };
//         setMessages((prev) => [...prev, errorMsg]);
//       }
//     }
//   };

//   return (
//     <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
//       <div className="mb-8 md:mb-12">
//         <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
//           {t("chat_title")}
//         </h1>
//         <p className="mt-2 text-base text-gray-500">
//           {t("chat_subtitle")}
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-12">
//           <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
//           {staffList.map((staff) => {
//             const isAI = staff.usertype === "ai";
//             return (
//             <div
//               key={`staff-${staff.id}`}
//               onClick={() => openChat(staff)}
//               className={`flex items-center gap-4 p-5 transition-all border cursor-pointer rounded-2xl group ${
//                 isAI 
//                 ? "bg-gradient-to-r from-purple-50 to-white border-purple-200 hover:border-purple-400 hover:shadow-purple-500/20 shadow-sm" 
//                 : "bg-white border-gray-200 hover:border-gycora hover:shadow-lg"
//               }`}
//             >
//               <div className={`flex items-center justify-center font-bold text-white rounded-full shadow-inner w-14 h-14 shrink-0 ${isAI ? "bg-purple-600" : "bg-gycora"}`}>
//                 {isAI ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{staff.first_name.charAt(0)}{staff.last_name.charAt(0)}</>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className={`text-lg font-bold truncate transition-colors ${isAI ? "text-purple-900 group-hover:text-purple-600" : "text-gray-900 group-hover:text-gycora"}`}>
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p className={`text-xs font-bold uppercase tracking-widest mt-0.5 truncate ${isAI ? "text-purple-500" : "text-gray-400"}`}>
//                   {staff.usertype === 'ai' ? 'Bot 24/7' : staff.usertype}
//                 </p>
//               </div>
//               <div className={`p-2 transition-colors rounded-full shrink-0 ${isAI ? "text-purple-600 bg-purple-100 group-hover:bg-purple-600 group-hover:text-white" : "text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white"}`}>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//             </div>
//             );
//           })}
//         </div>
//       )}

//       {/* --- MODAL CHAT POP-UP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
//           {/* Header Fixed */}
//           <div className={`flex items-center justify-between p-4 text-white shrink-0 md:rounded-t-2xl ${activeChat.usertype === "ai" ? "bg-purple-600" : "bg-gycora"}`}>
//             <div className="flex items-center gap-3">
//               <div className={`flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full shadow-sm ${activeChat.usertype === "ai" ? "text-purple-600" : "text-gycora"}`}>
//                 {activeChat.usertype === "ai" ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{activeChat.first_name.charAt(0)}</>
//                 )}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">
//                   {activeChat.first_name} {activeChat.last_name}
//                 </h4>
//                 <p className="text-[10px] tracking-widest uppercase opacity-90">
//                   {activeChat.usertype === 'ai' ? 'Bot 24/7' : activeChat.usertype}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setActiveChat(null)}
//               className="p-2 transition-colors rounded-full hover:bg-white/20"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           {/* Body Pesan */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-center text-gray-500">
//                   {activeChat.usertype === "ai" ? "Halo! Apa yang ingin Anda ketahui tentang produk Gycora?" : t("chat_empty_msg")}
//                 </p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === currentUser?.id ? (activeChat.usertype === "ai" ? "bg-purple-600 text-white rounded-br-none" : "bg-gycora text-white rounded-br-none") : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
//                     <div dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br/>') }} />
//                     <p className={`text-[9px] mt-1 text-right ${msg.sender_id === currentUser?.id ? "text-white/70" : "text-gray-400"}`}>
//                       {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Animasi Mengetik Khusus AI */}
//             {isAITyping && activeChat.usertype === "ai" && (
//               <div className="flex justify-start">
//                 <div className="max-w-[80%] px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Footer Input */}
//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder={t("chat_input_placeholder")}
//                 disabled={isAITyping} 
//                 className={`flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none bg-gray-50 focus:bg-white ${activeChat.usertype === "ai" ? "focus:border-purple-500" : "focus:border-gycora"}`}
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim() || isAITyping}
//                 className={`p-2.5 text-white transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${activeChat.usertype === "ai" ? "bg-purple-600 hover:bg-purple-800" : "bg-gycora hover:bg-gycora-dark"}`}
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

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useLanguage } from "../../context/LanguageContext";

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
//   email?: string; // Tambahkan email untuk identifikasi absolut
//   profile_image?: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// export default function ChatListPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage(); 
  
//   const [staffList, setStaffList] = useState<Staff[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<Staff | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isAITyping, setIsAITyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const activeChatRef = useRef<Staff | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const [currentUser, setCurrentUser] = useState<any>(null);

//   // Helper identifikasi AI yang kebal bug
//   const isChatAI = activeChat?.usertype === "ai" || activeChat?.email === "ai@gycora.com";

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const userStr = localStorage.getItem("user_data");
//     if (!token || !userStr) {
//       navigate("/login");
//       return;
//     }
//     setCurrentUser(JSON.parse(userStr));

//     const fetchStaff = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) setStaffList(await res.json());
//       } catch (error) {
//         console.error("Gagal memuat kontak:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStaff();
//   }, [navigate]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isAITyping]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER
//   // ==========================================================
//   useEffect(() => {
//     if (!currentUser) return;

//     const token = localStorage.getItem("user_token");

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
//       .private(`chat.${currentUser.id}`)
//       .listen(".MessageSent", (e: any) => {
//         const incomingMsg = e.message || e;

//         if (activeChatRef.current && incomingMsg.sender_id === activeChatRef.current.id) {
//           if (activeChatRef.current.usertype === "ai" || activeChatRef.current.email === "ai@gycora.com") {
//             setIsAITyping(false);
//           }
          
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       echoInstance.leave(`chat.${currentUser.id}`);
//     };
//   }, [currentUser]);

//   const openChat = async (staff: Staff) => {
//     setActiveChat(staff);
//     setIsAITyping(false);
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !currentUser) return;

//     const token = localStorage.getItem("user_token");
//     const messageText = newMessage.trim();
//     setNewMessage("");

//     // Optimistic Update
//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: currentUser.id,
//       receiver_id: activeChat.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     if (isChatAI) setIsAITyping(true);

//     try {
//       const response = await fetch(`${BASE_URL}/api/messages`, {
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

//       if (response.ok) {
//         const result = await response.json();
        
//         // JIKA AI MEMBALAS DARI HTTP RESPONSE
//         if (isChatAI && result.ai_message) {
//           setIsAITyping(false);
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === result.ai_message.id)) return prev;
//             return [...prev, result.ai_message];
//           });
//         }
//       } else {
//         throw new Error("Gagal memproses pesan.");
//       }
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//       if (isChatAI) {
//         setIsAITyping(false);
//         const errorMsg: Message = {
//           id: Date.now() + 1,
//           sender_id: activeChat.id,
//           receiver_id: currentUser.id,
//           message: "Maaf kak, gagal menghubungi server AI. Coba lagi sebentar ya.",
//           created_at: new Date().toISOString(),
//         };
//         setMessages((prev) => [...prev, errorMsg]);
//       }
//     }
//   };

//   return (
//     <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
//       <div className="mb-8 md:mb-12">
//         <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
//           {t("chat_title")}
//         </h1>
//         <p className="mt-2 text-base text-gray-500">
//           {t("chat_subtitle")}
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-12">
//           <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
//           {staffList.map((staff) => {
//             const isAI = staff.usertype === "ai" || staff.email === "ai@gycora.com";
//             return (
//             <div
//               key={`staff-${staff.id}`}
//               onClick={() => openChat(staff)}
//               className={`flex items-center gap-4 p-5 transition-all border cursor-pointer rounded-2xl group ${
//                 isAI 
//                 ? "bg-gradient-to-r from-purple-50 to-white border-purple-200 hover:border-purple-400 hover:shadow-purple-500/20 shadow-sm" 
//                 : "bg-white border-gray-200 hover:border-gycora hover:shadow-lg"
//               }`}
//             >
//               <div className={`flex items-center justify-center font-bold text-white rounded-full shadow-inner w-14 h-14 shrink-0 ${isAI ? "bg-purple-600" : "bg-gycora"}`}>
//                 {isAI ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{staff.first_name.charAt(0)}{staff.last_name.charAt(0)}</>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className={`text-lg font-bold truncate transition-colors ${isAI ? "text-purple-900 group-hover:text-purple-600" : "text-gray-900 group-hover:text-gycora"}`}>
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p className={`text-xs font-bold uppercase tracking-widest mt-0.5 truncate ${isAI ? "text-purple-500" : "text-gray-400"}`}>
//                   {isAI ? 'Bot 24/7' : staff.usertype}
//                 </p>
//               </div>
//               <div className={`p-2 transition-colors rounded-full shrink-0 ${isAI ? "text-purple-600 bg-purple-100 group-hover:bg-purple-600 group-hover:text-white" : "text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white"}`}>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//             </div>
//             );
//           })}
//         </div>
//       )}

//       {/* --- MODAL CHAT POP-UP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
//           {/* Header Fixed */}
//           <div className={`flex items-center justify-between p-4 text-white shrink-0 md:rounded-t-2xl ${isChatAI ? "bg-purple-600" : "bg-gycora"}`}>
//             <div className="flex items-center gap-3">
//               <div className={`flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full shadow-sm ${isChatAI ? "text-purple-600" : "text-gycora"}`}>
//                 {isChatAI ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{activeChat.first_name.charAt(0)}</>
//                 )}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">
//                   {activeChat.first_name} {activeChat.last_name}
//                 </h4>
//                 <p className="text-[10px] tracking-widest uppercase opacity-90">
//                   {isChatAI ? 'Bot 24/7' : activeChat.usertype}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setActiveChat(null)}
//               className="p-2 transition-colors rounded-full hover:bg-white/20"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           {/* Body Pesan */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="text-sm font-medium text-center text-gray-500">
//                   {isChatAI ? "Halo! Apa yang ingin Anda ketahui tentang produk Gycora?" : t("chat_empty_msg")}
//                 </p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === currentUser?.id ? (isChatAI ? "bg-purple-600 text-white rounded-br-none" : "bg-gycora text-white rounded-br-none") : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
//                     <div dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br/>') }} />
//                     <p className={`text-[9px] mt-1 text-right ${msg.sender_id === currentUser?.id ? "text-white/70" : "text-gray-400"}`}>
//                       {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Animasi Mengetik Khusus AI */}
//             {isAITyping && isChatAI && (
//               <div className="flex justify-start">
//                 <div className="max-w-[80%] px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Footer Input */}
//           <div className="p-3 bg-white border-t border-gray-100 shrink-0">
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder={t("chat_input_placeholder")}
//                 disabled={isAITyping} 
//                 className={`flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none bg-gray-50 focus:bg-white ${isChatAI ? "focus:border-purple-500" : "focus:border-gycora"}`}
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim() || isAITyping}
//                 className={`p-2.5 text-white transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${isChatAI ? "bg-purple-600 hover:bg-purple-800" : "bg-gycora hover:bg-gycora-dark"}`}
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

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useLanguage } from "../../context/LanguageContext";

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
//   email?: string; // Tambahkan email untuk identifikasi absolut
//   profile_image?: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// // 👇 DAFTAR PERTANYAAN CEPAT (Bisa disesuaikan dengan kebutuhan Gycora) 👇
// const QUICK_REPLIES = [
//   "Apa produk paling laris?",
//   "Cara pakai Ethereal Glow Brush?",
//   "Berapa hari pengirimannya?",
//   "Ada promo apa hari ini?",
//   "Cara refund barang cacat?"
// ];

// export default function ChatListPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage(); 
  
//   const [staffList, setStaffList] = useState<Staff[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<Staff | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isAITyping, setIsAITyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const activeChatRef = useRef<Staff | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const [currentUser, setCurrentUser] = useState<any>(null);

//   // Helper identifikasi AI yang kebal bug
//   const isChatAI = activeChat?.usertype === "ai" || activeChat?.email === "ai@gycora.com";

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const userStr = localStorage.getItem("user_data");
//     if (!token || !userStr) {
//       navigate("/login");
//       return;
//     }
//     setCurrentUser(JSON.parse(userStr));

//     const fetchStaff = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) setStaffList(await res.json());
//       } catch (error) {
//         console.error("Gagal memuat kontak:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStaff();
//   }, [navigate]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isAITyping]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER
//   // ==========================================================
//   useEffect(() => {
//     if (!currentUser) return;

//     const token = localStorage.getItem("user_token");

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
//       .private(`chat.${currentUser.id}`)
//       .listen(".MessageSent", (e: any) => {
//         const incomingMsg = e.message || e;

//         if (activeChatRef.current && incomingMsg.sender_id === activeChatRef.current.id) {
//           if (activeChatRef.current.usertype === "ai" || activeChatRef.current.email === "ai@gycora.com") {
//             setIsAITyping(false);
//           }
          
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       echoInstance.leave(`chat.${currentUser.id}`);
//     };
//   }, [currentUser]);

//   const openChat = async (staff: Staff) => {
//     setActiveChat(staff);
//     setIsAITyping(false);
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   // Fungsi khusus untuk menangani pengiriman pesan dari Quick Reply Button
//   const handleSendQuickReply = async (text: string) => {
//     if (!activeChat || !currentUser || isAITyping) return;
//     await processMessageSending(text);
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !currentUser || isAITyping) return;
    
//     const textToSend = newMessage.trim();
//     setNewMessage(""); // Kosongkan input segera
//     await processMessageSending(textToSend);
//   };

//   // Logika inti pengiriman pesan dipisah agar bisa dipakai oleh Form Input dan Quick Reply
//   const processMessageSending = async (messageText: string) => {
//     const token = localStorage.getItem("user_token");

//     // Optimistic Update
//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: currentUser.id,
//       receiver_id: activeChat!.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     const _isChatAI = activeChat?.usertype === "ai" || activeChat?.email === "ai@gycora.com";
//     if (_isChatAI) setIsAITyping(true);

//     try {
//       const response = await fetch(`${BASE_URL}/api/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           receiver_id: activeChat!.id,
//           message: messageText,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
        
//         // JIKA AI MEMBALAS DARI HTTP RESPONSE
//         if (_isChatAI && result.ai_message) {
//           setIsAITyping(false);
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === result.ai_message.id)) return prev;
//             return [...prev, result.ai_message];
//           });
//         }
//       } else {
//         throw new Error("Gagal memproses pesan.");
//       }
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//       if (_isChatAI) {
//         setIsAITyping(false);
//         const errorMsg: Message = {
//           id: Date.now() + 1,
//           sender_id: activeChat!.id,
//           receiver_id: currentUser.id,
//           message: "Maaf kak, gagal menghubungi server AI. Coba lagi sebentar ya.",
//           created_at: new Date().toISOString(),
//         };
//         setMessages((prev) => [...prev, errorMsg]);
//       }
//     }
//   };

//   return (
//     <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
//       <div className="mb-8 md:mb-12">
//         <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
//           {t("chat_title")}
//         </h1>
//         <p className="mt-2 text-base text-gray-500">
//           {t("chat_subtitle")}
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-12">
//           <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
//           {staffList.map((staff) => {
//             const isAI = staff.usertype === "ai" || staff.email === "ai@gycora.com";
//             return (
//             <div
//               key={`staff-${staff.id}`}
//               onClick={() => openChat(staff)}
//               className={`flex items-center gap-4 p-5 transition-all border cursor-pointer rounded-2xl group ${
//                 isAI 
//                 ? "bg-gradient-to-r from-purple-50 to-white border-purple-200 hover:border-purple-400 hover:shadow-purple-500/20 shadow-sm" 
//                 : "bg-white border-gray-200 hover:border-gycora hover:shadow-lg"
//               }`}
//             >
//               <div className={`flex items-center justify-center font-bold text-white rounded-full shadow-inner w-14 h-14 shrink-0 ${isAI ? "bg-purple-600" : "bg-gycora"}`}>
//                 {isAI ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{staff.first_name.charAt(0)}{staff.last_name.charAt(0)}</>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className={`text-lg font-bold truncate transition-colors ${isAI ? "text-purple-900 group-hover:text-purple-600" : "text-gray-900 group-hover:text-gycora"}`}>
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p className={`text-xs font-bold uppercase tracking-widest mt-0.5 truncate ${isAI ? "text-purple-500" : "text-gray-400"}`}>
//                   {isAI ? 'Bot 24/7' : staff.usertype}
//                 </p>
//               </div>
//               <div className={`p-2 transition-colors rounded-full shrink-0 ${isAI ? "text-purple-600 bg-purple-100 group-hover:bg-purple-600 group-hover:text-white" : "text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white"}`}>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//             </div>
//             );
//           })}
//         </div>
//       )}

//       {/* --- MODAL CHAT POP-UP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[600px] md:rounded-t-2xl animate-fade-in-up">
//           {/* Header Fixed */}
//           <div className={`flex items-center justify-between p-4 text-white shrink-0 md:rounded-t-2xl ${isChatAI ? "bg-purple-600" : "bg-gycora"}`}>
//             <div className="flex items-center gap-3">
//               <div className={`flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full shadow-sm ${isChatAI ? "text-purple-600" : "text-gycora"}`}>
//                 {isChatAI ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{activeChat.first_name.charAt(0)}</>
//                 )}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">
//                   {activeChat.first_name} {activeChat.last_name}
//                 </h4>
//                 <p className="text-[10px] tracking-widest uppercase opacity-90">
//                   {isChatAI ? 'Bot 24/7' : activeChat.usertype}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setActiveChat(null)}
//               className="p-2 transition-colors rounded-full hover:bg-white/20"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           {/* Body Pesan */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="px-6 text-sm font-medium text-center text-gray-500">
//                   {isChatAI ? "Halo! Ada yang bisa saya bantu terkait produk Gycora?" : t("chat_empty_msg")}
//                 </p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === currentUser?.id ? (isChatAI ? "bg-purple-600 text-white rounded-br-none" : "bg-gycora text-white rounded-br-none") : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
//                     <div dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br/>') }} />
//                     <p className={`text-[9px] mt-1 text-right ${msg.sender_id === currentUser?.id ? "text-white/70" : "text-gray-400"}`}>
//                       {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Animasi Mengetik Khusus AI */}
//             {isAITyping && isChatAI && (
//               <div className="flex justify-start">
//                 <div className="max-w-[80%] px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* 👇 FOOTER INPUT BESERTA QUICK REPLIES 👇 */}
//           <div className="flex flex-col bg-white border-t border-gray-100 shrink-0">
            
//             {/* Quick Replies (Hanya muncul jika chat dengan AI) */}
//             {isChatAI && (
//               <div className="flex gap-2 p-3 overflow-x-auto border-b border-gray-50 custom-scrollbar scroll-smooth">
//                 {QUICK_REPLIES.map((replyText, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => handleSendQuickReply(replyText)}
//                     disabled={isAITyping}
//                     className="shrink-0 px-3 py-1.5 text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-100 rounded-full transition-colors hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
//                   >
//                     {replyText}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Kotak Input Form */}
//             <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-3">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder={t("chat_input_placeholder")}
//                 disabled={isAITyping} 
//                 className={`flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none bg-gray-50 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${isChatAI ? "focus:border-purple-500" : "focus:border-gycora"}`}
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim() || isAITyping}
//                 className={`p-2.5 text-white transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md shrink-0 ${isChatAI ? "bg-purple-600 hover:bg-purple-800" : "bg-gycora hover:bg-gycora-dark"}`}
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

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useLanguage } from "../../context/LanguageContext";

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
//   email?: string; // Tambahkan email untuk identifikasi absolut
//   profile_image?: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// // 👇 DAFTAR PERTANYAAN CEPAT (Bisa disesuaikan dengan kebutuhan Gycora) 👇
// const QUICK_REPLIES = [
//   "Apa produk paling laris?",
//   "Cara pakai Ethereal Glow Brush?",
//   "Berapa hari pengirimannya?",
//   "Ada promo apa hari ini?",
//   "Cara refund barang cacat?"
// ];

// export default function ChatListPage() {
//   const navigate = useNavigate();
//   const { t } = useLanguage(); 
  
//   const [staffList, setStaffList] = useState<Staff[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [activeChat, setActiveChat] = useState<Staff | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isAITyping, setIsAITyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const activeChatRef = useRef<Staff | null>(null);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   const [currentUser, setCurrentUser] = useState<any>(null);

//   // Helper identifikasi AI yang kebal bug
//   const isChatAI = activeChat?.usertype === "ai" || activeChat?.email === "ai@gycora.com";

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     const userStr = localStorage.getItem("user_data");
//     if (!token || !userStr) {
//       navigate("/login");
//       return;
//     }
//     setCurrentUser(JSON.parse(userStr));

//     const fetchStaff = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/staff-list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) setStaffList(await res.json());
//       } catch (error) {
//         console.error("Gagal memuat kontak:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStaff();
//   }, [navigate]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isAITyping]);

//   // ==========================================================
//   // LARAVEL ECHO LISTENER
//   // ==========================================================
//   useEffect(() => {
//     if (!currentUser) return;

//     const token = localStorage.getItem("user_token");

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
//       .private(`chat.${currentUser.id}`)
//       .listen(".MessageSent", (e: any) => {
//         const incomingMsg = e.message || e;

//         if (activeChatRef.current && incomingMsg.sender_id === activeChatRef.current.id) {
//           if (activeChatRef.current.usertype === "ai" || activeChatRef.current.email === "ai@gycora.com") {
//             setIsAITyping(false);
//           }
          
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === incomingMsg.id)) return prev;
//             return [...prev, incomingMsg];
//           });
//         }
//       });

//     return () => {
//       echoInstance.leave(`chat.${currentUser.id}`);
//     };
//   }, [currentUser]);

//   const openChat = async (staff: Staff) => {
//     setActiveChat(staff);
//     setIsAITyping(false);
//     const token = localStorage.getItem("user_token");
//     const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) setMessages(await res.json());
//   };

//   // Fungsi khusus untuk menangani pengiriman pesan dari Quick Reply Button
//   const handleSendQuickReply = async (text: string) => {
//     if (!activeChat || !currentUser || isAITyping) return;
//     await processMessageSending(text);
//   };

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeChat || !currentUser || isAITyping) return;
    
//     const textToSend = newMessage.trim();
//     setNewMessage(""); // Kosongkan input segera
//     await processMessageSending(textToSend);
//   };

//   // Logika inti pengiriman pesan dipisah agar bisa dipakai oleh Form Input dan Quick Reply
//   const processMessageSending = async (messageText: string) => {
//     const token = localStorage.getItem("user_token");

//     // Optimistic Update
//     const tempMsg: Message = {
//       id: Date.now(),
//       sender_id: currentUser.id,
//       receiver_id: activeChat!.id,
//       message: messageText,
//       created_at: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, tempMsg]);

//     const _isChatAI = activeChat?.usertype === "ai" || activeChat?.email === "ai@gycora.com";
//     if (_isChatAI) setIsAITyping(true);

//     try {
//       const response = await fetch(`${BASE_URL}/api/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           receiver_id: activeChat!.id,
//           message: messageText,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
        
//         // JIKA AI MEMBALAS DARI HTTP RESPONSE
//         if (_isChatAI && result.ai_message) {
//           setIsAITyping(false);
//           setMessages((prev) => {
//             if (prev.some((m) => m.id === result.ai_message.id)) return prev;
//             return [...prev, result.ai_message];
//           });
//         }
//       } else {
//         throw new Error("Gagal memproses pesan.");
//       }
//     } catch (error) {
//       console.error("Gagal mengirim:", error);
//       if (_isChatAI) {
//         setIsAITyping(false);
//         const errorMsg: Message = {
//           id: Date.now() + 1,
//           sender_id: activeChat!.id,
//           receiver_id: currentUser.id,
//           message: "Maaf kak, gagal menghubungi server AI. Coba lagi sebentar ya.",
//           created_at: new Date().toISOString(),
//         };
//         setMessages((prev) => [...prev, errorMsg]);
//       }
//     }
//   };

//   return (
//     <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
//       <div className="mb-8 md:mb-12">
//         <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
//           {t("chat_title")}
//         </h1>
//         <p className="mt-2 text-base text-gray-500">
//           {t("chat_subtitle")}
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-12">
//           <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
//           {staffList.map((staff) => {
//             const isAI = staff.usertype === "ai" || staff.email === "ai@gycora.com";
//             return (
//             <div
//               key={`staff-${staff.id}`}
//               onClick={() => openChat(staff)}
//               className={`flex items-center gap-4 p-5 transition-all border cursor-pointer rounded-2xl group ${
//                 isAI 
//                 ? "bg-gradient-to-r from-purple-50 to-white border-purple-200 hover:border-purple-400 hover:shadow-purple-500/20 shadow-sm" 
//                 : "bg-white border-gray-200 hover:border-gycora hover:shadow-lg"
//               }`}
//             >
//               <div className={`flex items-center justify-center font-bold text-white rounded-full shadow-inner w-14 h-14 shrink-0 ${isAI ? "bg-purple-600" : "bg-gycora"}`}>
//                 {isAI ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{staff.first_name.charAt(0)}{staff.last_name.charAt(0)}</>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className={`text-lg font-bold truncate transition-colors ${isAI ? "text-purple-900 group-hover:text-purple-600" : "text-gray-900 group-hover:text-gycora"}`}>
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p className={`text-xs font-bold uppercase tracking-widest mt-0.5 truncate ${isAI ? "text-purple-500" : "text-gray-400"}`}>
//                   {isAI ? 'Bot 24/7' : staff.usertype}
//                 </p>
//               </div>
//               <div className={`p-2 transition-colors rounded-full shrink-0 ${isAI ? "text-purple-600 bg-purple-100 group-hover:bg-purple-600 group-hover:text-white" : "text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white"}`}>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//             </div>
//             );
//           })}
//         </div>
//       )}

//       {/* --- MODAL CHAT POP-UP --- */}
//       {activeChat && (
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[600px] md:rounded-t-2xl animate-fade-in-up">
//           {/* Header Fixed */}
//           <div className={`flex items-center justify-between p-4 text-white shrink-0 md:rounded-t-2xl ${isChatAI ? "bg-purple-600" : "bg-gycora"}`}>
//             <div className="flex items-center gap-3">
//               <div className={`flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full shadow-sm ${isChatAI ? "text-purple-600" : "text-gycora"}`}>
//                 {isChatAI ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                 ) : (
//                   <>{activeChat.first_name.charAt(0)}</>
//                 )}
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold leading-tight">
//                   {activeChat.first_name} {activeChat.last_name}
//                 </h4>
//                 <p className="text-[10px] tracking-widest uppercase opacity-90">
//                   {isChatAI ? 'Bot 24/7' : activeChat.usertype}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setActiveChat(null)}
//               className="p-2 transition-colors rounded-full hover:bg-white/20"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>
//           </div>

//           {/* Body Pesan */}
//           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full opacity-50">
//                 <p className="px-6 text-sm font-medium text-center text-gray-500">
//                   {isChatAI ? "Halo! Ada yang bisa saya bantu terkait produk Gycora?" : t("chat_empty_msg")}
//                 </p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === currentUser?.id ? (isChatAI ? "bg-purple-600 text-white rounded-br-none" : "bg-gycora text-white rounded-br-none") : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
//                     <div dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br/>') }} />
//                     <p className={`text-[9px] mt-1 text-right ${msg.sender_id === currentUser?.id ? "text-white/70" : "text-gray-400"}`}>
//                       {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Animasi Mengetik Khusus AI */}
//             {isAITyping && isChatAI && (
//               <div className="flex justify-start">
//                 <div className="max-w-[80%] px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
//                   <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* 👇 FOOTER INPUT, QUICK REPLIES, & DISCLAIMER 👇 */}
//           <div className="flex flex-col bg-white border-t border-gray-100 shrink-0">
            
//             {/* Quick Replies */}
//             {isChatAI && (
//               <div className="flex gap-2 p-3 overflow-x-auto border-b border-gray-50 custom-scrollbar scroll-smooth">
//                 {QUICK_REPLIES.map((replyText, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => handleSendQuickReply(replyText)}
//                     disabled={isAITyping}
//                     className="shrink-0 px-3 py-1.5 text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-100 rounded-full transition-colors hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
//                   >
//                     {replyText}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Kotak Input Form */}
//             <form onSubmit={handleSendMessage} className={`flex items-center gap-2 px-3 pt-3 ${isChatAI ? 'pb-2' : 'pb-3'}`}>
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder={t("chat_input_placeholder")}
//                 disabled={isAITyping} 
//                 className={`flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none bg-gray-50 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${isChatAI ? "focus:border-purple-500" : "focus:border-gycora"}`}
//               />
//               <button
//                 type="submit"
//                 disabled={!newMessage.trim() || isAITyping}
//                 className={`p-2.5 text-white transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md shrink-0 ${isChatAI ? "bg-purple-600 hover:bg-purple-800" : "bg-gycora hover:bg-gycora-dark"}`}
//               >
//                 <svg className="w-5 h-5 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                 </svg>
//               </button>
//             </form>

//             {/* 👇 DISCLAIMER AI 👇 */}
//             {isChatAI && (
//               <div className="px-4 pb-2 text-center">
//                 <p className="text-[9px] leading-tight text-gray-400">
//                   Fitur AI ChatBot masih dalam tahap pengembangan. Kami mohon maaf jika terdapat respon yang keliru atau kurang sempurna.
//                 </p>
//               </div>
//             )}
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }

// Modifikasi ke 1 akun dengan implementasi AI 

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
// import { useLanguage } from "../../context/LanguageContext";

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

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

const QUICK_REPLIES = [
  "Apa produk paling laris?",
  "Cara pakai Ethereal Glow Brush?",
  "Berapa hari pengirimannya?",
  "Ada promo apa hari ini?",
  "Cara refund barang cacat?",
  "Bicara dengan Admin"
];

export default function ChatListPage() {
  const navigate = useNavigate();
  // const { t } = useLanguage(); 
  
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeChat, setActiveChat] = useState<Staff | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChatRef = useRef<Staff | null>(null);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  const [currentUser, setCurrentUser] = useState<any>(null);

  // Helper identifikasi akun resmi (Support Hybrid)
  const isOfficialSupport = activeChat?.email === "support@gycora.com";

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const userStr = localStorage.getItem("user_data");
    if (!token || !userStr) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(userStr));

    const fetchStaff = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/staff-list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setStaffList(await res.json());
      } catch (error) {
        console.error("Gagal memuat kontak:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAITyping]);

  useEffect(() => {
    if (!currentUser) return;
    const token = localStorage.getItem("user_token");

    const echoInstance = new Echo({
      broadcaster: "pusher",
      key: "5b29faa8d41035b749a1", // Sesuaikan key pusher Anda
      cluster: "ap1",
      forceTLS: true,
      authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    });

    window.Echo = echoInstance;

    echoInstance
      .private(`chat.${currentUser.id}`)
      .listen(".MessageSent", (e: any) => {
        const incomingMsg = e.message || e;

        // Jika pesan datang dari lawan bicara (Hanya jika admin asli membalas manual via Websocket)
        if (activeChatRef.current && incomingMsg.sender_id === activeChatRef.current.id) {
          setIsAITyping(false);
          setMessages((prev) => {
            if (prev.some((m) => m.id === incomingMsg.id)) return prev;
            return [...prev, incomingMsg];
          });
        }
      });

    return () => {
      echoInstance.leave(`chat.${currentUser.id}`);
    };
  }, [currentUser]);

  const openChat = async (staff: Staff) => {
    setActiveChat(staff);
    setIsAITyping(false);
    const token = localStorage.getItem("user_token");
    const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setMessages(await res.json());
  };

  const handleSendQuickReply = async (text: string) => {
    if (!activeChat || !currentUser || isAITyping) return;
    await processMessageSending(text);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !currentUser || isAITyping) return;
    
    const textToSend = newMessage.trim();
    setNewMessage(""); 
    await processMessageSending(textToSend);
  };

  const processMessageSending = async (messageText: string) => {
    const token = localStorage.getItem("user_token");

    // Optimistic Update UI Send
    const tempMsg: Message = {
      id: Date.now(),
      sender_id: currentUser.id,
      receiver_id: activeChat!.id,
      message: messageText,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    // Nyalakan Loading AI 
    if (isOfficialSupport) setIsAITyping(true);

    try {
      const response = await fetch(`${BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_id: activeChat!.id,
          message: messageText,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Matikan loading animasi 
        setIsAITyping(false);

        // Jika ada balasan instan dari AI, langsung render
        if (result.ai_message) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === result.ai_message.id)) return prev;
            return [...prev, result.ai_message];
          });
        }
      } else {
        throw new Error("Gagal memproses pesan.");
      }
    } catch (error) {
      console.error("Gagal mengirim:", error);
      setIsAITyping(false);
    }
  };

  return (
    <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
      <div className="mb-8 text-center md:mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          Pusat Bantuan
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Hubungi layanan pelanggan resmi kami
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
        </div>
      ) : (
        <div className="flex justify-center">
          {staffList.map((staff) => (
            <div
              key={`staff-${staff.id}`}
              onClick={() => openChat(staff)}
              className="flex items-center w-full max-w-lg gap-4 p-6 transition-all bg-white border border-gray-200 cursor-pointer rounded-2xl group hover:border-black hover:shadow-lg"
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=GC&backgroundColor=000000`}
                className="object-cover w-16 h-16 rounded-full shadow-sm shrink-0"
                alt="Support Avatar"
              />
              <div className="flex-1 min-w-0">
                <h3 className="flex items-center gap-2 text-lg font-bold tracking-widest text-gray-900 uppercase truncate transition-colors group-hover:text-black">
                  {staff.first_name} {staff.last_name}
                  {/* Verified Badge */}
                  <svg className="w-5 h-5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 7.1-7.1 1.4 1.4-8.5 8.5z"/>
                  </svg>
                </h3>
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mt-0.5 truncate">
                  Official Business Account
                </p>
              </div>
              <div className="p-2 text-gray-400 transition-colors rounded-full bg-gray-50 shrink-0 group-hover:bg-black group-hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL CHAT POP-UP --- */}
      {activeChat && (
        <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[450px] md:right-8 md:bottom-0 shadow-2xl bg-[#F9FAFB] border border-gray-200 flex flex-col h-[650px] md:rounded-t-2xl animate-fade-in-up">
          {/* Header Fixed */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm shrink-0 md:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=GC&backgroundColor=000000`}
                className="object-cover w-10 h-10 rounded-full shadow-sm"
                alt="Avatar"
              />
              <div>
                <h4 className="text-sm font-bold leading-tight tracking-widest text-black uppercase">
                  {activeChat.first_name} {activeChat.last_name}
                </h4>
                <p className="text-[10px] tracking-widest uppercase text-green-500 font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveChat(null)}
              className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Body Pesan */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#F9FAFB] custom-scrollbar">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-50">
                <p className="px-6 text-sm font-medium text-center text-gray-500">
                  Halo! Ada yang bisa kami bantu terkait produk Gycora hari ini?
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm relative ${msg.sender_id === currentUser?.id ? "bg-black text-white rounded-tr-none" : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"}`}>
                    <div dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br/>') }} />
                    <p className={`text-[9px] mt-1.5 text-right opacity-70 ${msg.sender_id === currentUser?.id ? "text-gray-300" : "text-gray-400"}`}>
                      {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Animasi Mengetik AI */}
            {isAITyping && (
              <div className="flex justify-start w-full mb-4">
                <div className="flex items-center gap-1.5 px-5 py-4 bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-sm h-[46px]">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 👇 FOOTER INPUT, QUICK REPLIES, & DISCLAIMER 👇 */}
          <div className="flex flex-col bg-white border-t border-gray-200 shrink-0">
            
            {/* Quick Replies */}
            {isOfficialSupport && (
              <div className="flex gap-2 px-3 pt-3 pb-2 overflow-x-auto border-b border-gray-50 custom-scrollbar scroll-smooth">
                {QUICK_REPLIES.map((replyText, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuickReply(replyText)}
                    disabled={isAITyping}
                    className="shrink-0 px-4 py-1.5 text-[11px] font-bold tracking-wide text-black bg-gray-100 border border-gray-200 rounded-full transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {replyText}
                  </button>
                ))}
              </div>
            )}

            {/* Kotak Input Form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 px-3 pt-3 pb-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ketik pesan Anda..."
                disabled={isAITyping} 
                className="flex-grow p-3 text-xs transition border border-gray-200 outline-none md:text-sm bg-gray-50 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isAITyping}
                className="flex items-center justify-center w-10 h-10 text-white transition-all bg-black shadow-lg md:w-12 md:h-12 shrink-0 rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 ml-0.5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>

            {/* 👇 DISCLAIMER HYBRID 👇 */}
            {isOfficialSupport && (
              <div className="px-4 pt-1 pb-3 text-center border-t border-gray-100 bg-gray-50">
                <p className="text-[10px] leading-tight text-gray-400">
                  Asisten AI akan merespons pesan secara instan 24/7. Ketik <strong>"Bicara dengan admin"</strong> kapan saja jika Anda membutuhkan bantuan manusia.
                </p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}