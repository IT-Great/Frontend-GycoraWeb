/* eslint-disable @typescript-eslint/no-unused-vars */
// // // Jika menggunakan Vite (standar React modern saat ini)
// // // export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";
// // export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://back.gycoraessence.com";

// // // ATAU, jika Anda menggunakan Create React App (CRA) lama:
// // // export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";

// // // ATAU, cara paling sederhana (tanpa .env):
// // // export const BASE_URL = "https://backend-gycora-web.vercel.app/api";

// // Jika menggunakan Vite (standar React modern saat ini)
// // export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://back.gycoraessence.com";

// // ATAU, jika Anda menggunakan Create React App (CRA) lama:
// // export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";

// // ATAU, cara paling sederhana (tanpa .env):
// // export const BASE_URL = "https://backend-gycora-web.vercel.app/api";


// // ==============================================================
// // [BARU] IMPLEMENTASI SILENT TOKEN REFRESH (Global Fetch Interceptor)
// // ==============================================================
// const originalFetch = window.fetch;

// window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
//   // 1. Eksekusi request asli seperti biasa
//   let response = await originalFetch(input, init);

//   // 2. Jika server mengembalikan 401 Unauthorized (Token Mati/Expired)
//   if (response.status === 401) {
//     const currentToken = localStorage.getItem("user_token");
//     const requestUrl = typeof input === "string" ? input : input.toString();

//     // Pastikan kita tidak melakukan loop tak berujung jika request ke /refresh-token atau /login itu sendiri yang gagal
//     if (currentToken && !requestUrl.includes("/refresh-token") && !requestUrl.includes("/login")) {
//       try {
//         // 3. SECARA DIAM-DIAM (SILENT): Minta token baru ke backend
//         const refreshRes = await originalFetch(`${BASE_URL}/api/refresh-token`, {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${currentToken}`,
//             "Accept": "application/json",
//           },
//         });

//         if (refreshRes.ok) {
//           const data = await refreshRes.json();
//           const newToken = data.access_token;

//           // 4. Update Local Storage dengan Token Baru
//           localStorage.setItem("user_token", newToken);
//           if (data.user) {
//             localStorage.setItem("user_data", JSON.stringify(data.user));
//           }

//           // 5. Perbarui Header Authorization pada Request yang gagal tadi
//           const newInit = { ...init };
//           newInit.headers = {
//             ...newInit.headers,
//             Authorization: `Bearer ${newToken}`,
//           };

//           // 6. ULANGI REQUEST ASLI secara diam-diam. User tidak akan sadar ini terjadi.
//           response = await originalFetch(input, newInit);
//         } else {
//           // Jika refresh gagal (misal: token sudah diblacklist/dihapus paksa di DB), keluarkan pengguna
//           localStorage.removeItem("user_token");
//           localStorage.removeItem("user_data");
//           window.location.href = "/login"; // Tendang ke halaman login
//         }
//       } catch (error) {
//         console.error("Gagal melakukan silent token refresh", error);
//       }
//     }
//   }

//   return response;
// };

// window.fetch = async (...args) => {
//     const response = await originalFetch(...args);
//     // Tangkap kode 503 yang dilempar dari CheckMaintenanceMode
//     if (response.status === 503) {
//         const data = await response.clone().json().catch(() => ({}));
//         if (data.is_maintenance) {
//             // Arahkan pengunjung ke layar perbaikan statis (buat file MaintenancePage.tsx)
//             window.location.href = '/maintenance';
//         }
//     }
//     return response;
// };

// // Jika menggunakan Vite (standar React modern saat ini)
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://back.gycoraessence.com";

// // ==============================================================
// // IMPLEMENTASI GLOBAL FETCH INTERCEPTOR (401 & 503)
// // ==============================================================
// const originalFetch = window.fetch;

// window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
//   // 1. Eksekusi request asli seperti biasa
//   let response = await originalFetch(input, init);

//   const requestUrl = typeof input === "string" ? input : input.toString();

//   // -------------------------------------------------------------
//   // KASUS 1: SILENT TOKEN REFRESH (401 UNAUTHORIZED)
//   // -------------------------------------------------------------
//   if (response.status === 401) {
//     const currentToken = localStorage.getItem("user_token");

//     if (currentToken && !requestUrl.includes("/refresh-token") && !requestUrl.includes("/login")) {
//       try {
//         const refreshRes = await originalFetch(`${BASE_URL}/api/refresh-token`, {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${currentToken}`,
//             "Accept": "application/json",
//           },
//         });

//         if (refreshRes.ok) {
//           const data = await refreshRes.json();
//           const newToken = data.access_token;

//           localStorage.setItem("user_token", newToken);
//           if (data.user) {
//             localStorage.setItem("user_data", JSON.stringify(data.user));
//           }

//           const newInit = { ...init };
//           newInit.headers = {
//             ...newInit.headers,
//             Authorization: `Bearer ${newToken}`,
//           };

//           // Ulangi request asli secara diam-diam
//           response = await originalFetch(input, newInit);
//         } else {
//           localStorage.removeItem("user_token");
//           localStorage.removeItem("user_data");
//           // Pastikan tidak menendang jika sedang di panel admin
//           if (!window.location.pathname.startsWith("/admin")) {
//               window.location.href = "/login"; 
//           }
//         }
//       } catch (error) {
//         console.error("Gagal melakukan silent token refresh", error);
//       }
//     }
//   }

//   // -------------------------------------------------------------
//   // KASUS 2: MAINTENANCE MODE (503 SERVICE UNAVAILABLE)
//   // -------------------------------------------------------------
//   if (response.status === 503) {
//       try {
//           const cloneRes = response.clone();
//           const data = await cloneRes.json();
//           const currentPath = window.location.pathname;

//           if (data.is_maintenance) {
//               // 👇 PERBAIKAN MUTLAK 👇
//               // JANGAN redirect jika user sudah berada di halaman /maintenance (Mencegah Loop)
//               // JANGAN redirect jika user sedang berada di halaman /admin (Mencegah Admin Lockout)
//               if (currentPath !== '/maintenance' && !currentPath.startsWith('/admin')) {
//                   window.location.href = '/maintenance';
//               }
//           }
//       } catch (e) {
//           // Abaikan jika respons bukan JSON
//       }
//   }

//   return response;
// };

// Jika menggunakan Vite (standar React modern saat ini)
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://back.gycoraessence.com";

// ==============================================================
// IMPLEMENTASI GLOBAL FETCH INTERCEPTOR (401 & 503)
// ==============================================================

// 👇 [PERBAIKAN KRUSIAL] Mengikat fungsi asli ke window agar terhindar dari Illegal Invocation
const originalFetch = window.fetch.bind(window);

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  // 1. Eksekusi request asli seperti biasa (Sekarang sudah aman dan sah)
  let response = await originalFetch(input, init);

  const requestUrl = typeof input === "string" ? input : input.toString();

  // -------------------------------------------------------------
  // KASUS 1: SILENT TOKEN REFRESH (401 UNAUTHORIZED)
  // -------------------------------------------------------------
  if (response.status === 401) {
    const currentToken = localStorage.getItem("user_token");

    // Pastikan tidak melakukan loop jika yang gagal adalah endpoint refresh atau login itu sendiri
    if (currentToken && !requestUrl.includes("/refresh-token") && !requestUrl.includes("/login")) {
      try {
        // Minta token baru secara diam-diam
        const refreshRes = await originalFetch(`${BASE_URL}/api/refresh-token`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${currentToken}`,
            "Accept": "application/json",
          },
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          const newToken = data.access_token;

          // Update Local Storage
          localStorage.setItem("user_token", newToken);
          if (data.user) {
            localStorage.setItem("user_data", JSON.stringify(data.user));
          }

          // Perbarui Header Authorization pada request yang gagal tadi
          const newInit = { ...init };
          newInit.headers = {
            ...newInit.headers,
            Authorization: `Bearer ${newToken}`,
          };

          // Ulangi request asli secara diam-diam dengan token baru
          response = await originalFetch(input, newInit);
        } else {
          // Jika refresh token ditolak server (misal akun diblokir), paksa keluar
          localStorage.removeItem("user_token");
          localStorage.removeItem("user_data");
          if (!window.location.pathname.startsWith("/admin")) {
              window.location.href = "/login"; 
          }
        }
      } catch (error) {
        console.error("Gagal melakukan silent token refresh", error);
      }
    }
  }

  // -------------------------------------------------------------
  // KASUS 2: MAINTENANCE MODE (503 SERVICE UNAVAILABLE)
  // -------------------------------------------------------------
  if (response.status === 503) {
      try {
          const cloneRes = response.clone();
          const data = await cloneRes.json();
          const currentPath = window.location.pathname;

          if (data.is_maintenance) {
              // Hanya redirect jika user BELUM berada di halaman maintenance 
              // dan JANGAN redirect jika user sedang di area Admin (Mencegah Admin terblokir dari Dashboard)
              if (currentPath !== '/maintenance' && !currentPath.startsWith('/admin')) {
                  window.location.href = '/maintenance';
              }
          }
      } catch (e) {
          // Abaikan error parsing jika respons 503 ternyata berupa HTML statis dari Nginx, bukan JSON
      }
  }

  return response;
};