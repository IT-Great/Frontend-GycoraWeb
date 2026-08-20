// // Jika menggunakan Vite (standar React modern saat ini)
// // export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://back.gycoraessence.com";

// // ATAU, jika Anda menggunakan Create React App (CRA) lama:
// // export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";

// // ATAU, cara paling sederhana (tanpa .env):
// // export const BASE_URL = "https://backend-gycora-web.vercel.app/api";

// Jika menggunakan Vite (standar React modern saat ini)
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://back.gycoraessence.com";

// ATAU, jika Anda menggunakan Create React App (CRA) lama:
// export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://backend-gycora-web.vercel.app/api";

// ATAU, cara paling sederhana (tanpa .env):
// export const BASE_URL = "https://backend-gycora-web.vercel.app/api";


// ==============================================================
// [BARU] IMPLEMENTASI SILENT TOKEN REFRESH (Global Fetch Interceptor)
// ==============================================================
const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  // 1. Eksekusi request asli seperti biasa
  let response = await originalFetch(input, init);

  // 2. Jika server mengembalikan 401 Unauthorized (Token Mati/Expired)
  if (response.status === 401) {
    const currentToken = localStorage.getItem("user_token");
    const requestUrl = typeof input === "string" ? input : input.toString();

    // Pastikan kita tidak melakukan loop tak berujung jika request ke /refresh-token atau /login itu sendiri yang gagal
    if (currentToken && !requestUrl.includes("/refresh-token") && !requestUrl.includes("/login")) {
      try {
        // 3. SECARA DIAM-DIAM (SILENT): Minta token baru ke backend
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

          // 4. Update Local Storage dengan Token Baru
          localStorage.setItem("user_token", newToken);
          if (data.user) {
            localStorage.setItem("user_data", JSON.stringify(data.user));
          }

          // 5. Perbarui Header Authorization pada Request yang gagal tadi
          const newInit = { ...init };
          newInit.headers = {
            ...newInit.headers,
            Authorization: `Bearer ${newToken}`,
          };

          // 6. ULANGI REQUEST ASLI secara diam-diam. User tidak akan sadar ini terjadi.
          response = await originalFetch(input, newInit);
        } else {
          // Jika refresh gagal (misal: token sudah diblacklist/dihapus paksa di DB), keluarkan pengguna
          localStorage.removeItem("user_token");
          localStorage.removeItem("user_data");
          window.location.href = "/login"; // Tendang ke halaman login
        }
      } catch (error) {
        console.error("Gagal melakukan silent token refresh", error);
      }
    }
  }

  return response;
};