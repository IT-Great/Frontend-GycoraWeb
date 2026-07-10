import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function AutoLogout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Memisahkan referensi timer untuk menjaga isolasi sesi
  const adminTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const customerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Batas waktu aktivitas (Inactivity Threshold)
  const CUSTOMER_TIMEOUT = 60 * 60 * 1000; // 1 Jam
  const ADMIN_TIMEOUT = 15 * 60 * 1000;    // 15 Menit

  const resetTimer = () => {
    // 1. Bersihkan timer yang sedang berjalan sebelumnya
    if (adminTimeoutRef.current) clearTimeout(adminTimeoutRef.current);
    if (customerTimeoutRef.current) clearTimeout(customerTimeoutRef.current);

    // 2. Ambil data sesi secara independen dari localStorage
    const adminToken = localStorage.getItem("admin_token");
    const adminUserStr = localStorage.getItem("admin_user");
    const customerToken = localStorage.getItem("user_token");
    const customerUserStr = localStorage.getItem("user_data");

    // 3. JALANKAN TIMER UTK SESI ADMIN (Jika Admin sedang Logged In)
    if (adminToken && adminUserStr) {
      adminTimeoutRef.current = setTimeout(() => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Sesi Admin Habis",
          text: "Anda telah idle selama 15 menit. Silakan login kembali.",
          showConfirmButton: false,
          timer: 4000,
        });
        navigate("/admin/login", { replace: true });
      }, ADMIN_TIMEOUT);
    }

    // 4. JALANKAN TIMER UTK SESI CUSTOMER (Jika Customer sedang Logged In)
    if (customerToken && customerUserStr) {
      customerTimeoutRef.current = setTimeout(() => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_data");

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
      }, CUSTOMER_TIMEOUT);
    }
  };

  useEffect(() => {
    // Daftar event penanda aktivitas pengguna global pada window object
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

    // Inisialisasi atau set ulang timer saat rute berubah atau komponen dimuat
    resetTimer();

    const handleUserActivity = () => resetTimer();
    
    // Pasang event listener ke window
    events.forEach((event) => window.addEventListener(event, handleUserActivity));

    // Cleanup memori dan listener saat komponen dilepas (unmount)
    return () => {
      if (adminTimeoutRef.current) clearTimeout(adminTimeoutRef.current);
      if (customerTimeoutRef.current) clearTimeout(customerTimeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return <>{children}</>;
}