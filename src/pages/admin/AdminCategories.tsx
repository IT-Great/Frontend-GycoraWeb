// import { useState, useEffect, useCallback, useMemo } from "react";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// interface Category {
//   id: number;
//   code: string;
//   name: string;
//   description: string;
// }

// export default function AdminCategories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   // State untuk Pencarian dan Pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       // Ganti localhost:8080 menjadi localhost:8000 jika sudah pakai Laravel API
//       const res = await fetch(`${BASE_URL}/api/categories`);
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       setCategories(data || []);
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // Logika Filtering dan Pagination (Dijalankan secara lokal agar cepat)
//   const filteredCategories = useMemo(() => {
//     return categories.filter(
//       (cat) =>
//         cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         cat.code.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//   }, [categories, searchTerm]);

//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//   const paginatedCategories = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredCategories, currentPage]);

//   // Fungsi untuk memanggil SweetAlert Form (Digunakan untuk Tambah & Edit)
//   const openFormModal = (categoryToEdit?: Category) => {
//     const isEdit = !!categoryToEdit;

//     Swal.fire({
//       title: isEdit ? "Edit Kategori" : "Tambah Kategori Baru",
//       html: `
//         <div class="space-y-4 text-left p-2">
//           <div>
//             <label class="block text-sm font-medium text-gray-700 mb-1">Kode Kategori</label>
//             <input id="swal-input-code" class="swal2-input !w-full !m-0 !h-10 text-sm" placeholder="Misal: HC-01" value="${categoryToEdit?.code || ""}">
//           </div>
//           <div>
//             <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
//             <input id="swal-input-name" class="swal2-input !w-full !m-0 !h-10 text-sm" placeholder="Misal: Hair Serum" value="${categoryToEdit?.name || ""}">
//           </div>
//           <div>
//             <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
//             <textarea id="swal-input-desc" class="swal2-textarea !w-full !m-0 text-sm p-2" rows="3" placeholder="Deskripsi singkat...">${categoryToEdit?.description || ""}</textarea>
//           </div>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: "Simpan",
//       cancelButtonText: "Batal",
//       confirmButtonColor: "#059669", // Warna gycora
//       preConfirm: () => {
//         const code = (
//           document.getElementById("swal-input-code") as HTMLInputElement
//         ).value;
//         const name = (
//           document.getElementById("swal-input-name") as HTMLInputElement
//         ).value;
//         const desc = (
//           document.getElementById("swal-input-desc") as HTMLTextAreaElement
//         ).value;

//         if (!code || !name) {
//           Swal.showValidationMessage("Kode dan Nama Kategori wajib diisi");
//           return false;
//         }
//         return { code, name, description: desc };
//       },
//     }).then(async (result) => {
//       if (result.isConfirmed && result.value) {
//         try {
//           const url = isEdit
//             ? `${BASE_URL}/api/categories/${categoryToEdit.id}`
//             : `${BASE_URL}/api/categories`;

//           const method = isEdit ? "PUT" : "POST";

//           const token = localStorage.getItem("admin_token");

//           const res = await fetch(url, {
//             method: method,
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(result.value),
//           });

//           if (res.ok) {
//             Swal.fire({
//               icon: "success",
//               title: "Berhasil!",
//               text: `Kategori berhasil ${isEdit ? "diperbarui" : "ditambahkan"}.`,
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             fetchCategories();
//           } else {
//             throw new Error("Gagal merespons dari server");
//           }
//         } catch (error) {
//           console.error("Error save category:", error); // Menghindari warning linter
//           Swal.fire(
//             "Error!",
//             "Terjadi kesalahan saat menyimpan data.",
//             "error",
//           );
//         }
//       }
//     });
//   };

//   const handleDelete = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Yakin ingin menghapus?",
//       text: "Data yang dihapus tidak dapat dikembalikan!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Ya, hapus!",
//       cancelButtonText: "Batal",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");

//         const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
//           method: "DELETE",
//           headers: {
//             // <-- TAMBAHKAN HEADER INI
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (res.ok) {
//           Swal.fire("Terhapus!", "Kategori telah dihapus.", "success");
//           fetchCategories();
//           // Pindahkan halaman ke prev jika halaman saat ini kosong setelah dihapus
//           if (paginatedCategories.length === 1 && currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//           }
//         }
//       } catch (error) {
//         console.error("Error delete category:", error); // Menghindari warning linter
//         Swal.fire("Error!", "Gagal menghapus data.", "error");
//       }
//     }
//   };

//   return (
//     <div className="p-8 font-sans">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header Action Bar */}
//         <div className="flex flex-col items-start justify-between gap-4 p-6 bg-white border border-gray-100 shadow-sm sm:flex-row sm:items-center rounded-xl">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Kategori Produk
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Kelola daftar klasifikasi katalog Anda.
//             </p>
//           </div>

//           <div className="flex w-full gap-3 sm:w-auto">
//             {/* Search Input */}
//             <div className="relative w-full sm:w-64">
//               <input
//                 type="text"
//                 placeholder="Cari kategori..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1); // Reset page saat mencari
//                 }}
//                 className="w-full py-2 pl-10 pr-4 text-sm transition-all border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gycora/20 focus:border-gycora"
//               />
//               <svg
//                 className="absolute w-4 h-4 text-gray-400 left-3 top-3"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>

//             <button
//               onClick={() => openFormModal()}
//               className="flex items-center flex-shrink-0 gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//               Tambah Kategori
//             </button>
//           </div>
//         </div>

//         {/* Tabel Data */}
//         <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="text-sm text-gray-600 border-b border-gray-100 bg-gray-50">
//                   <th className="w-24 p-4 font-semibold">Kode</th>
//                   <th className="w-1/4 p-4 font-semibold">Nama</th>
//                   <th className="p-4 font-semibold">Deskripsi</th>
//                   <th className="w-32 p-4 font-semibold text-right">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={4} className="p-8 text-center text-gray-500">
//                       Memuat data...
//                     </td>
//                   </tr>
//                 ) : paginatedCategories.length > 0 ? (
//                   paginatedCategories.map((cat) => (
//                     <tr
//                       key={cat.id}
//                       className="transition-colors hover:bg-gray-50/50 group"
//                     >
//                       <td className="p-4 text-sm font-medium text-gray-900">
//                         {cat.code}
//                       </td>
//                       <td className="p-4 text-sm font-medium text-gray-800">
//                         {cat.name}
//                       </td>
//                       <td className="p-4 text-gray-500 text-sm truncate max-w-[200px]">
//                         {cat.description}
//                       </td>
//                       <td className="p-4 text-right">
//                         <div className="flex justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
//                           <button
//                             onClick={() => openFormModal(cat)}
//                             className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                             title="Edit"
//                           >
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                               />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(cat.id)}
//                             className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                             title="Hapus"
//                           >
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={4} className="p-8 text-center text-gray-500">
//                       Data tidak ditemukan.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Footer */}
//           {!loading && totalPages > 1 && (
//             <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/30">
//               <span className="text-sm text-gray-500">
//                 Menampilkan{" "}
//                 <span className="font-medium text-gray-900">
//                   {(currentPage - 1) * itemsPerPage + 1}
//                 </span>{" "}
//                 hingga{" "}
//                 <span className="font-medium text-gray-900">
//                   {Math.min(
//                     currentPage * itemsPerPage,
//                     filteredCategories.length,
//                   )}
//                 </span>{" "}
//                 dari{" "}
//                 <span className="font-medium text-gray-900">
//                   {filteredCategories.length}
//                 </span>{" "}
//                 hasil
//               </span>
//               <div className="flex gap-1">
//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   className="px-3 py-1 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Prev
//                 </button>
//                 <button
//                   disabled={currentPage === totalPages}
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   className="px-3 py-1 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Category {
  id: number;
  code: string;
  name: string;
  description: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk Pencarian dan Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/categories`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Logika Filtering dan Pagination (Dijalankan secara lokal agar cepat)
  const filteredCategories = useMemo(() => {
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCategories, currentPage]);

  // Fungsi untuk memanggil SweetAlert Form (Digunakan untuk Tambah & Edit)
  const openFormModal = (categoryToEdit?: Category) => {
    const isEdit = !!categoryToEdit;

    Swal.fire({
      title: isEdit ? "Edit Kategori" : "Tambah Kategori Baru",
      html: `
        <div class="space-y-4 text-left p-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kode Kategori</label>
            <input id="swal-input-code" class="swal2-input !w-full !m-0 !h-10 text-sm" placeholder="Misal: HC-01" value="${categoryToEdit?.code || ""}">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
            <input id="swal-input-name" class="swal2-input !w-full !m-0 !h-10 text-sm" placeholder="Misal: Hair Serum" value="${categoryToEdit?.name || ""}">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea id="swal-input-desc" class="swal2-textarea !w-full !m-0 text-sm p-2" rows="3" placeholder="Deskripsi singkat...">${categoryToEdit?.description || ""}</textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#059669", // Warna gycora
      preConfirm: () => {
        const code = (
          document.getElementById("swal-input-code") as HTMLInputElement
        ).value;
        const name = (
          document.getElementById("swal-input-name") as HTMLInputElement
        ).value;
        const desc = (
          document.getElementById("swal-input-desc") as HTMLTextAreaElement
        ).value;

        if (!code || !name) {
          Swal.showValidationMessage("Kode dan Nama Kategori wajib diisi");
          return false;
        }
        return { code, name, description: desc };
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          const url = isEdit
            ? `${BASE_URL}/api/categories/${categoryToEdit.id}`
            : `${BASE_URL}/api/categories`;

          const method = isEdit ? "PUT" : "POST";
          const token = localStorage.getItem("admin_token");

          const res = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(result.value),
          });

          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: `Kategori berhasil ${isEdit ? "diperbarui" : "ditambahkan"}.`,
              showConfirmButton: false,
              timer: 1500,
            });
            fetchCategories();
          } else {
            throw new Error("Gagal merespons dari server");
          }
        } catch (error) {
          console.error("Error save category:", error);
          Swal.fire(
            "Error!",
            "Terjadi kesalahan saat menyimpan data.",
            "error",
          );
        }
      }
    });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");

        const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Cek jika response BUKAN 200 OK (termasuk 400 Bad Request dari backend)
        if (!res.ok) {
           const errData = await res.json();
           throw new Error(errData.message || "Gagal menghapus kategori");
        }

        Swal.fire("Terhapus!", "Kategori telah dihapus.", "success");
        fetchCategories();
        
        // Pindahkan halaman ke prev jika halaman saat ini kosong setelah dihapus
        if (paginatedCategories.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error delete category:", error);
        // Menampilkan pesan error spesifik dari backend
        Swal.fire({
            title: "Penghapusan Gagal!",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#059669" // Warna Gycora
        });
      }
    }
  };

  return (
    <div className="p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col items-start justify-between gap-4 p-6 bg-white border border-gray-100 shadow-sm sm:flex-row sm:items-center rounded-xl">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Kategori Produk
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola daftar klasifikasi katalog Anda.
            </p>
          </div>

          <div className="flex w-full gap-3 sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari kategori..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page saat mencari
                }}
                className="w-full py-2 pl-10 pr-4 text-sm transition-all border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gycora/20 focus:border-gycora"
              />
              <svg
                className="absolute w-4 h-4 text-gray-400 left-3 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              onClick={() => openFormModal()}
              className="flex items-center flex-shrink-0 gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-sm bg-gycora hover:bg-gycora-dark"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Kategori
            </button>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-600 border-b border-gray-100 bg-gray-50">
                  <th className="w-24 p-4 font-semibold">Kode</th>
                  <th className="w-1/4 p-4 font-semibold">Nama</th>
                  <th className="p-4 font-semibold">Deskripsi</th>
                  <th className="w-32 p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Memuat data...
                    </td>
                  </tr>
                ) : paginatedCategories.length > 0 ? (
                  paginatedCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="transition-colors hover:bg-gray-50/50 group"
                    >
                      <td className="p-4 text-sm font-medium text-gray-900">
                        {cat.code}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-800">
                        {cat.name}
                      </td>
                      <td className="p-4 text-gray-500 text-sm truncate max-w-[200px]">
                        {cat.description}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => openFormModal(cat)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Hapus"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/30">
              <span className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                hingga{" "}
                <span className="font-medium text-gray-900">
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredCategories.length,
                  )}
                </span>{" "}
                dari{" "}
                <span className="font-medium text-gray-900">
                  {filteredCategories.length}
                </span>{" "}
                hasil
              </span>
              <div className="flex gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-3 py-1 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="px-3 py-1 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
