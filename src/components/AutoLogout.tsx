// src/components/AutoLogout.tsx

import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function AutoLogout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Waktu idle:
  // - Customer: 1 Jam (3600000 ms)
  // - Admin/Staff: 15 Menit (900000 ms)
  const CUSTOMER_TIMEOUT = 60 * 60 * 1000;
  const ADMIN_TIMEOUT = 15 * 60 * 1000;

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const userDataStr = localStorage.getItem("user_data");
    const token = localStorage.getItem("user_token");

    // Jika user tidak login, tidak perlu menjalankan timer
    if (!token || !userDataStr) return;

    const user = JSON.parse(userDataStr);
    const isAdminArea = user.usertype === "admin" || user.usertype === "staff";
    
    const timeoutDuration = isAdminArea ? ADMIN_TIMEOUT : CUSTOMER_TIMEOUT;

    timeoutRef.current = setTimeout(() => {
      // Aksi ketika waktu idle tercapai (Auto Logout)
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_data");

      if (isAdminArea) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Sesi Habis",
          text: "Anda telah idle selama 15 menit. Silakan login kembali.",
          showConfirmButton: false,
          timer: 4000,
        });
        navigate("/admin/login", { replace: true });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Sesi Habis",
          text: "Untuk keamanan Anda, Anda telah dikeluarkan karena tidak ada aktivitas selama 1 jam.",
          showConfirmButton: false,
          timer: 4000,
        });
        navigate("/login", { replace: true });
      }
    }, timeoutDuration);
  };

  useEffect(() => {
    // Event listener untuk mendeteksi aktivitas pengguna
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    
    // Inisialisasi timer saat pertama kali load
    resetTimer();

    // Pasang listener
    const handleUserActivity = () => resetTimer();
    events.forEach((event) => window.addEventListener(event, handleUserActivity));

    // Bersihkan listener saat komponen dilepas (unmount)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Timer direset juga setiap kali pindah rute

  return <>{children}</>;
}