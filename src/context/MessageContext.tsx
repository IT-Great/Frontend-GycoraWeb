/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../config/api';

// interface MessageContextType {
//   unreadCount: number;
//   fetchUnreadMessages: () => Promise<void>;
//   decrementUnread: () => void;
// }

// const MessageContext = createContext<MessageContextType | undefined>(undefined);

// export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [unreadCount, setUnreadCount] = useState(0);

//   const fetchUnreadMessages = useCallback(async () => {
//     const token = localStorage.getItem("admin_token");
//     const userStr = localStorage.getItem("admin_user");
    
//     // Hanya fetch jika yang login adalah admin/staf
//     if (!token || !userStr) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/messages`, {
//         headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
//       });
      
//       if (res.ok) {
//         const messages = await res.json();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const unread = messages.filter((m: any) => !m.is_read).length;
//         setUnreadCount(unread);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil badge pesan:", error);
//     }
//   }, []);

//   // Fetch pertama kali saat provider di-mount
//   useEffect(() => {
//     fetchUnreadMessages();
//   }, [fetchUnreadMessages]);

//   // Fungsi utilitas jika admin membaca 1 pesan, kurangi badge langsung tanpa perlu fetch ulang
//   const decrementUnread = () => {
//     setUnreadCount(prev => Math.max(0, prev - 1));
//   };

//   return (
//     <MessageContext.Provider value={{ unreadCount, fetchUnreadMessages, decrementUnread }}>
//       {children}
//     </MessageContext.Provider>
//   );
// };

// export const useMessage = () => {
//   const context = useContext(MessageContext);
//   if (context === undefined) {
//     throw new Error('useMessage must be used within a MessageProvider');
//   }
//   return context;
// };

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../config/api';

interface MessageContextType {
  unreadCount: number;
  fetchUnreadMessages: () => Promise<void>;
  decrementUnread: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadMessages = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");
    
    // Hanya fetch jika yang login adalah admin/staf
    if (!token || !userStr) return;

    try {
      // 👇 PERBAIKAN: Gunakan API yang sudah kita siapkan untuk total pesan belum terbaca
      const res = await fetch(`${BASE_URL}/api/admin/users`, {
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      
      if (res.ok) {
        const usersData = await res.json();
        // usersData bisa berupa { data: [...] } atau array langsung tergantung response Laravel
        const userList = usersData.data ? usersData.data : usersData;
        
        const totalUnread = userList.reduce((sum: number, user: any) => sum + (user.unread_count || 0), 0);
        setUnreadCount(totalUnread);
      }
    } catch (error) {
      console.error("Gagal mengambil badge pesan:", error);
    }
  }, []);

  // Fetch pertama kali saat provider di-mount
  useEffect(() => {
    fetchUnreadMessages();
  }, [fetchUnreadMessages]);

  const decrementUnread = () => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <MessageContext.Provider value={{ unreadCount, fetchUnreadMessages, decrementUnread }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};