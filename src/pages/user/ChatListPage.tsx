// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

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

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
//   // useEffect(() => {
//   //   if (!currentUser) return;

//   //   const token = localStorage.getItem("user_token");

//   //   // Inisialisasi koneksi Echo
//   //   const echoInstance = new Echo({
//   //     broadcaster: 'pusher',
//   //     key: '5b29faa8d41035b749a1', // Ganti dengan PUSHER_APP_KEY dari file .env Laravel Anda
//   //     cluster: 'ap1',             // Ganti dengan PUSHER_APP_CLUSTER Anda (misal: ap1, mt1)
//   //     forceTLS: true,
//   //     authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
//   //     auth: {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         Accept: "application/json",
//   //       }
//   //     }
//   //   });

//   //   // Mulai mendengarkan di private channel milik user yang login
//   //   echoInstance.private(`chat.${currentUser.id}`)
//   //     // .listen() menerima nama Event dari Laravel.
//   //     // Jika di Laravel nama classnya MessageSent, formatnya '.MessageSent' atau 'MessageSent' (tergantung versi Echo).
//   //     .listen('MessageSent', (e: any) => {
//   //       // Jika pesan datang dari staf yang SEDANG DIBUKA pop-up chatnya, tambahkan ke layar
//   //       if (activeChat && e.message.sender_id === activeChat.id) {
//   //         setMessages((prev) => [...prev, e.message]);
//   //       }

//   //       // (Opsional) Jika pop-up tidak terbuka, Anda bisa men-trigger notifikasi toast/suara di sini
//   //     });

//   //   // Cleanup saat komponen ditutup agar tidak terjadi duplicate listener
//   //   return () => {
//   //     echoInstance.leave(`chat.${currentUser.id}`);
//   //   };
//   // }, [currentUser, activeChat]);

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
//     <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8 font-sans relative">
//       <div className="mb-8">
//         <h1 className="text-3xl font-extrabold text-gray-900">
//           Hubungi Pakar Kami
//         </h1>
//         <p className="mt-2 text-gray-500">
//           Pilih dokter atau staf Gycora untuk memulai konsultasi real-time.
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-12">
//           <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2">
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
//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora">
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
//                   {staff.usertype}
//                 </p>
//               </div>
//               <div className="p-2 transition-colors rounded-full text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white">
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
//         <div className="fixed bottom-0 right-0 z-[100] w-full md:w-96 md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[500px] md:rounded-t-2xl animate-fade-in-up">
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
//                   Mulai obrolan Anda di sini...
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
//                 placeholder="Ketik pesan..."
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

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Language Context

// --- SOLUSI ERROR TYPESCRIPT ---
// Memberi tahu TypeScript bahwa objek window sekarang memiliki properti Pusher
declare global {
  interface Window {
    Pusher: any;
  }
}

// Setup Pusher di Window object agar dikenali oleh Echo
window.Pusher = Pusher;

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  usertype: string;
  profile_image?: string;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

export default function ChatListPage() {
  const navigate = useNavigate();
  const { t } = useLanguage(); // [BARU] Inisialisasi hook bahasa
  
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk Chat Popup Fixed
  const [activeChat, setActiveChat] = useState<Staff | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // TAMBAHKAN REF INI DI DEKAT STATE ACTIVECHAT (DI BAGIAN ATAS KOMPONEN)
  const activeChatRef = useRef<Staff | null>(null);

  // Setiap kali activeChat berubah, update Ref-nya
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  const [currentUser, setCurrentUser] = useState<any>(null);

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

  // Auto Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ==========================================================
  // LARAVEL ECHO LISTENER (REAL-TIME FIX)
  // ==========================================================
  useEffect(() => {
    if (!currentUser) return;

    const token = localStorage.getItem("user_token");

    const echoInstance = new Echo({
      broadcaster: "pusher",
      key: "5b29faa8d41035b749a1",
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
        console.log("Pesan diterima:", e);
        const incomingMsg = e.message || e;

        // GUNAKAN activeChatRef.current, BUKAN activeChat
        if (
          activeChatRef.current &&
          incomingMsg.sender_id === activeChatRef.current.id
        ) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === incomingMsg.id)) return prev;
            return [...prev, incomingMsg];
          });
        }
      });

    return () => {
      // Echo hanya di-cleanup saat currentUser logout/ganti, bukan saat ganti teman chat
      echoInstance.leave(`chat.${currentUser.id}`);
    };
  }, [currentUser]);

  const openChat = async (staff: Staff) => {
    setActiveChat(staff);
    const token = localStorage.getItem("user_token");
    const res = await fetch(`${BASE_URL}/api/messages/${staff.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setMessages(await res.json());
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !currentUser) return;

    const token = localStorage.getItem("user_token");
    const messageText = newMessage.trim();
    setNewMessage(""); // Kosongkan input seketika

    // Optimistic update (Pengirim melihat pesannya langsung)
    const tempMsg: Message = {
      id: Date.now(),
      sender_id: currentUser.id,
      receiver_id: activeChat.id,
      message: messageText,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      await fetch(`${BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_id: activeChat.id,
          message: messageText,
        }),
      });
    } catch (error) {
      console.error("Gagal mengirim:", error);
    }
  };

  return (
    // [PERBAIKAN LAYOUT] max-w-4xl diubah menjadi max-w-7xl agar lebih proporsional dengan halaman lain
    <div className="min-h-[80vh] px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 font-sans relative animate-fade-in-up">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          {t("chat_title")}
        </h1>
        <p className="mt-2 text-base text-gray-500">
          {t("chat_subtitle")}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-10 h-10 border-4 rounded-full border-emerald-100 border-t-gycora animate-spin"></div>
        </div>
      ) : (
        // [PERBAIKAN LAYOUT] Menambah kolom menjadi 3 pada layar besar (lg) agar tidak kepanjangan
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              onClick={() => openChat(staff)}
              className="flex items-center gap-4 p-5 transition-all bg-white border border-gray-200 cursor-pointer rounded-2xl hover:border-gycora hover:shadow-lg group"
            >
              <div className="flex items-center justify-center font-bold text-white rounded-full shadow-inner w-14 h-14 bg-gycora shrink-0">
                {staff.first_name.charAt(0)}
                {staff.last_name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate transition-colors group-hover:text-gycora">
                  {staff.first_name} {staff.last_name}
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate">
                  {staff.usertype}
                </p>
              </div>
              <div className="p-2 transition-colors rounded-full shrink-0 text-emerald-600 bg-emerald-50 group-hover:bg-gycora group-hover:text-white">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL CHAT POP-UP --- */}
      {activeChat && (
        <div className="fixed bottom-0 right-0 z-[100] w-full md:w-[400px] md:right-8 md:bottom-0 shadow-2xl bg-white border border-gray-200 flex flex-col h-[550px] md:rounded-t-2xl animate-fade-in-up">
          {/* Header Fixed */}
          <div className="flex items-center justify-between p-4 text-white shrink-0 bg-gycora md:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full shadow-sm text-gycora">
                {activeChat.first_name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">
                  {activeChat.first_name} {activeChat.last_name}
                </h4>
                <p className="text-[10px] tracking-widest uppercase opacity-90">
                  {activeChat.usertype}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveChat(null)}
              className="p-2 transition-colors rounded-full hover:bg-white/20"
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

          {/* Body Pesan */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-50">
                <p className="text-sm font-medium text-gray-500">
                  {t("chat_empty_msg")}
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender_id === currentUser?.id ? "bg-gycora text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}
                  >
                    {msg.message}
                    <p
                      className={`text-[9px] mt-1 text-right ${msg.sender_id === currentUser?.id ? "text-emerald-100" : "text-gray-400"}`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t("chat_input_placeholder")}
                className="flex-1 px-4 py-2.5 text-sm transition-colors border border-gray-200 rounded-full outline-none focus:border-gycora bg-gray-50 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2.5 text-white transition-colors rounded-full bg-gycora hover:bg-gycora-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <svg
                  className="w-5 h-5 translate-x-[1px] -translate-y-[1px]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
// 