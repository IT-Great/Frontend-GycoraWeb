import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Product {
  id: number;
  category: { name: string };
  sku: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function InactiveProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInactiveProducts = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/products/inactive`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data.data ? data.data : data || []);
    } catch (error) {
      console.error("Gagal load produk nonaktif:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInactiveProducts();
  }, []);

  // const handleRestore = async (id: number) => {
  //   try {
  //     const token = localStorage.getItem("admin_token");
  //     await fetch(`${BASE_URL}/api/products/${id}/restore`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     fetchInactiveProducts();
  //     Swal.fire({
  //       toast: true,
  //       position: "top-end",
  //       icon: "success",
  //       title: "Produk Aktif Kembali",
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //   } catch (error) {
  //     console.error("Gagal mengaktifkan produk.", error);
  //     Swal.fire("Error!", "Gagal mengaktifkan produk.", "error");
  //   }
  // };

  const handleRestore = async (id: number) => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/products/${id}/restore`, {
        method: "PUT", // Pastikan route Laravel menggunakan POST. Jika PUT, ubah jadi "PUT"
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json", // Wajib untuk Laravel API
          "Content-Type": "application/json"
        },
      });

      if (res.ok) {
        // Hanya refresh data dan munculkan alert JIKA API benar-benar sukses (Status 200-299)
        fetchInactiveProducts();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Produk Aktif Kembali",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Tangkap jika terjadi error HTTP dari Laravel
        const errorData = await res.json();
        console.error("Gagal dari server:", errorData);
        Swal.fire("Gagal", errorData.message || "Gagal mengaktifkan produk.", "error");
      }
    } catch (error) {
      // Catch ini hanya menangkap masalah jaringan (misal: server mati atau koneksi terputus)
      console.error("Network / Server error:", error);
      Swal.fire("Error!", "Terjadi kesalahan koneksi.", "error");
    }
  };

  const handleForceDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus Permanen?",
      text: "Data produk dan gambar di S3 akan terhapus selamanya!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Musnahkan",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/products/${id}/force`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          fetchInactiveProducts();
          Swal.fire("Terhapus!", "Produk telah dihapus permanen.", "success");
        } else {
          const data = await res.json();
          Swal.fire("Gagal", data.message || "Gagal menghapus produk", "error");
        }
      } catch (error) {
        console.error("Terjadi kesalahan server.", error);
        Swal.fire("Error!", "Terjadi kesalahan server.", "error");
      }
    }
  };

  return (
    <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl">
      <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/products"
            className="p-2 transition-colors rounded-lg hover:bg-gray-50"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Produk Nonaktif (Arsip)
          </h1>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                  Produk
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                  SKU
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                  Harga
                </th>
                <th className="p-4 text-xs font-bold text-right text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-500 animate-pulse"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Arsip Kosong...
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-gray-50 group opacity-70 hover:opacity-100"
                  >
                    <td className="flex items-center gap-3 p-4">
                      <div className="w-12 h-12 overflow-hidden bg-gray-200 rounded-lg shrink-0 grayscale">
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt={p.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {p.name}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm text-gray-600">
                      {p.sku}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900">
                      Rp {p.price.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 space-x-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleRestore(p.id)}
                        className="text-sm font-bold transition-colors text-emerald-600 hover:text-emerald-800"
                      >
                        Aktifkan
                      </button>
                      <button
                        onClick={() => handleForceDelete(p.id)}
                        className="text-sm font-bold text-red-600 transition-colors hover:text-red-800"
                      >
                        Hapus Permanen
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
