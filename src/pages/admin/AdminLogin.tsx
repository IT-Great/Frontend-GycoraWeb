// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Ganti import next/navigation
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function AdminLogin() {
//   const navigate = useNavigate(); // Ganti useRouter
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Sesuaikan port API jika nanti beralih penuh ke Laravel (misal localhost:8000)
//       const res = await fetch(`${BASE_URL}/api/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Simpan token JWT ke localStorage persis seperti di Vue
//         localStorage.setItem("admin_token", data.access_token);
//         localStorage.setItem("admin_user", JSON.stringify(data.user));

//         Swal.fire({
//           icon: "success",
//           title: "Login Berhasil!",
//           text: `Selamat datang kembali, ${data.user.first_name}`,
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         navigate("/admin/dashboard"); // Ganti router.push
//       } else {
//         Swal.fire("Akses Ditolak", data.message, "error");
//       }
//     } catch (error) {
//       console.error("Login Admin Error:", error); // Mencegah linter error "never used"
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-extrabold text-gycora">Gycora Portal</h1>
//           <p className="mt-2 text-sm text-gray-500">Masuk ke panel manajemen (Admin/Staf)</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               required
//               className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
//               placeholder="admin@gycora.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
//             <input
//               type="password"
//               required
//               className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-gycora hover:bg-gycora-dark disabled:opacity-70"
//           >
//             {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";
// import logoGycora from "../../assets/gycora_logo.png";

// export default function AdminLogin() {
//   const navigate = useNavigate(); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("admin_token", data.access_token);
//         localStorage.setItem("admin_user", JSON.stringify(data.user));

//         Swal.fire({
//           icon: "success", title: "Login Berhasil!", text: `Selamat datang kembali, ${data.user.first_name}`, showConfirmButton: false, timer: 1500,
//         });

//         navigate("/admin/dashboard"); 
//       } else {
//         Swal.fire("Akses Ditolak", data.message, "error");
//       }
//     } catch (error) {
//       console.error("Login Admin Error:", error); 
//       Swal.fire("Error", "Gagal terhubung ke server", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
//         <div className="mb-8 text-center">
//           <div className="flex justify-center mb-6">
//             <img src={logoGycora} alt="Gycora Logo" className="object-contain h-10" />
//           </div>
//           <h1 className="text-3xl font-extrabold text-gycora">Gycora Portal</h1>
//           <p className="mt-2 text-sm text-gray-500">Masuk ke panel manajemen (Admin/Staf)</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
//             <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora" placeholder="admin@gycora.com" />
//           </div>
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="text-sm font-semibold text-gray-700">Password</label>
//               <Link to="/admin/forgot-password" className="text-xs font-bold transition-colors text-gycora hover:text-gycora-dark">Lupa Password?</Link>
//             </div>
//             <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora" placeholder="••••••••" />
//           </div>
//           <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-gycora hover:bg-gycora-dark disabled:opacity-70">
//             {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";
import logoGycora from "../../assets/gycora_logo.png";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

function AdminLoginForm() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
        Swal.fire("Error", "reCAPTCHA belum siap.", "error");
        return;
    }

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha("login_admin");

      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, recaptcha_token: recaptchaToken }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("admin_token", data.access_token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));

        Swal.fire({
          icon: "success", title: "Login Berhasil!", text: `Selamat datang kembali, ${data.user.first_name}`, showConfirmButton: false, timer: 1500,
        });

        navigate("/admin/dashboard"); 
      } else {
        Swal.fire("Akses Ditolak", data.message || "Gagal verifikasi.", "error");
      }
    } catch (error) {
      console.error("Login Admin Error:", error); 
      Swal.fire("Error", "Gagal terhubung ke server", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <img src={logoGycora} alt="Gycora Logo" className="object-contain h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-gycora">Gycora Portal</h1>
          <p className="mt-2 text-sm text-gray-500">Masuk ke panel manajemen (Admin/Staf)</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora" placeholder="admin@gycora.com" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <Link to="/admin/forgot-password" className="text-xs font-bold transition-colors text-gycora hover:text-gycora-dark">Lupa Password?</Link>
            </div>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-gycora" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-gycora hover:bg-gycora-dark disabled:opacity-70">
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>
        
        <p className="mt-6 text-[10px] text-center text-gray-400">
            Dilindungi oleh reCAPTCHA. <a href="https://policies.google.com/privacy" className="hover:underline">Privasi</a> - <a href="https://policies.google.com/terms" className="hover:underline">Ketentuan</a>
        </p>
      </div>
    </div>
  );
}

export default function AdminLogin() {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LdHKtUsAAAAAA9niqeYd5PgduCGtuiUcbiwhS4C";
    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
            <AdminLoginForm/>
        </GoogleReCaptchaProvider>
    );
}