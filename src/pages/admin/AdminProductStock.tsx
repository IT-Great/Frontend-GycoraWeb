import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface ProductStock {
  id: number;
  batch_code: string;
  quantity: number;
  initial_quantity: number;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  stock: number;
  image_url: string;
  category: { name: string };
  stocks: ProductStock[];
}

export default function AdminProductStock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 👇 [PERBAIKAN] State untuk Otorisasi CRUD Stok 👇
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  useEffect(() => {
    // Ambil data user & otorisasi dari localStorage saat komponen dimuat
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setAdminUser(user);
      try {
        const policiesStr = localStorage.getItem("admin_access_policies");
        if (policiesStr) {
          const policies = JSON.parse(policiesStr);
          if (user.usertype !== "superadmin") {
            setAllowedModules(policies[user.usertype] || []);
          }
        }
      } catch (error) {
        console.error("Gagal membaca kebijakan akses:", error);
      }
    }
  }, []);

  // Fungsi Helper RBAC
  const canAccess = (key: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true; 
    return allowedModules.includes(key);
  };
  // 👆 ========================================== 👆

  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/product-stocks`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      const responseData = data.data ? data.data : data;
      setProducts(responseData || []);
    } catch (error) {
      console.error("Gagal load data stok:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleAddStock = async (productId: number, productName: string) => {
    const { value: quantity } = await Swal.fire({
      title: `Tambah Stok`,
      text: `Masukkan jumlah stok baru untuk ${productName}`,
      input: 'number',
      inputAttributes: {
        min: "1",
        step: "1"
      },
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#059669', // Warna gycora
      inputValidator: (value) => {
        if (!value || parseInt(value) < 1) {
          return 'Kuantitas harus minimal 1!';
        }
      }
    });

    if (quantity) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/admin/product-stocks/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ quantity: parseInt(quantity) })
        });

        if (res.ok) {
          Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Batch stok berhasil ditambahkan!', showConfirmButton: false, timer: 2000 });
          fetchStocks(); 
        } else {
          throw new Error("Gagal menambah stok");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Gagal menyimpan batch stok.", "error");
      }
    }
  };

  return (
    <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl">
      <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Stok & Batch</h1>
            <p className="mt-1 text-sm text-gray-500">Kelola pergerakan masuk stok barang Gudang Gycora.</p>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Produk & SKU</th>
                <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Total Stok Aktif</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Riwayat Batch (Tersedia)</th>
                <th className="p-4 text-xs font-bold text-right text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr><td colSpan={4} className="p-8 text-center text-gray-500 animate-pulse">Memuat data stok...</td></tr>
              ) : products.length === 0 ? (
                 <tr><td colSpan={4} className="p-8 text-center text-gray-500">Tidak ada produk ditemukan.</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p.id} className="transition-colors hover:bg-gray-50 group">
                    <td className="p-4">
                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                        <p className="mt-0.5 font-mono text-xs text-gray-500">{p.sku}</p>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-lg font-black ${p.stock < 10 ? 'text-red-500' : 'text-gycora'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-4">
                        {p.stocks && p.stocks.length > 0 ? (
                            <div className="flex flex-wrap max-w-xs gap-2">
                                {p.stocks.map(batch => (
                                    <div key={batch.id} className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-[10px]" title={`Tanggal: ${new Date(batch.created_at).toLocaleDateString('id-ID')}`}>
                                        <span className="font-bold text-gray-700">{batch.batch_code}</span>
                                        <span className="ml-1 font-black text-gycora-dark">({batch.quantity})</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span className="text-xs italic text-gray-400">Tidak ada batch aktif</span>
                        )}
                    </td>
                    <td className="p-4 text-right">
                      {/* BUNGKUS TOMBOL TAMBAH BATCH DENGAN RBAC */}
                      {canAccess('stocks.create') && (
                        <button 
                          onClick={() => handleAddStock(p.id, p.name)} 
                          className="px-4 py-2 text-xs font-bold text-white transition-colors bg-gray-900 rounded-lg shadow-sm hover:bg-black"
                        >
                          + Tambah Batch
                        </button>
                      )}
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