// /* eslint-disable react-hooks/set-state-in-effect */
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api"; 

// interface Product {
//   id: number;
//   category: { name: string }; 
//   sku: string;
//   name: string;
//   slug: string; 
//   price: number;
//   discount_price?: number | null; 
//   stock: number;
//   image_url: string;
//   status: string;
// }

// export default function AdminProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 👇 [PERBAIKAN] State untuk Otorisasi CRUD 👇
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [adminUser, setAdminUser] = useState<any>(null);
//   const [allowedModules, setAllowedModules] = useState<string[]>([]);

//   useEffect(() => {
//     // Ambil data user & otorisasi dari localStorage
//     const userStr = localStorage.getItem("admin_user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       setAdminUser(user);
//       try {
//         const policiesStr = localStorage.getItem("admin_access_policies");
//         if (policiesStr) {
//           const policies = JSON.parse(policiesStr);
//           if (user.usertype !== "superadmin") {
//             setAllowedModules(policies[user.usertype] || []);
//           }
//         }
//       } catch (error) {
//         console.error("Gagal membaca kebijakan akses:", error);
//       }
//     }
//     fetchProducts();
//   }, []);

//   // Fungsi Helper RBAC
//   const canAccess = (key: string) => {
//     if (!adminUser) return false;
//     if (adminUser.usertype === "superadmin") return true; 
//     return allowedModules.includes(key);
//   };
//   // 👆 ========================================== 👆

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/products`);
//       const contentType = res.headers.get("content-type");
//       if (contentType && contentType.indexOf("application/json") !== -1) {
//           const data = await res.json();
//           if (data.status === 'error') {
//               Swal.fire("Error Backend", data.message, "error");
//               setProducts([]);
//               return;
//           }
//           const responseData = data.data ? data.data : data;
//           setProducts(responseData || []);
//       }
//     } catch (error) {
//       console.error("Gagal load produk:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     const result = await Swal.fire({
//       title: 'Nonaktifkan Produk?',
//       text: "Produk akan disembunyikan dari pelanggan.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Nonaktifkan',
//       cancelButtonText: 'Batal'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("admin_token");
//         await fetch(`${BASE_URL}/api/products/${id}`, { 
//             method: "DELETE",
//             headers: { "Authorization": `Bearer ${token}` }
//         });
//         fetchProducts();
//         Swal.fire('Dinonaktifkan!', 'Produk telah disembunyikan.', 'success');
//       } catch (error) {
//         console.error("Terjadi kesalahan saat memproses.", error);
//         Swal.fire('Error!', 'Terjadi kesalahan saat memproses.', 'error');
//       }
//     }
//   };

//   const formatPrice = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
//   };

//   return (
//     <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl">
//       <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>
//         <div className="flex gap-3">
//           <Link 
//             to="/admin/products/inactive" 
//             className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
//           >
//             Produk Nonaktif
//           </Link>

//           {/* BUNGKUS TOMBOL TAMBAH DENGAN RBAC */}
//           {canAccess('products.create') && (
//             <Link 
//               to="/admin/products/create" 
//               className="px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-md bg-gycora rounded-lg hover:bg-gycora-dark"
//             >
//               + Tambah Produk
//             </Link>
//           )}
//         </div>
//       </div>

//       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="border-b border-gray-100 bg-gray-50">
//               <tr>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Produk</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">SKU</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Kategori</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Harga</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Stok</th>
//                 <th className="p-4 text-xs font-bold text-right text-gray-500 uppercase">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {loading ? (
//                  <tr><td colSpan={6} className="p-8 text-center text-gray-500 animate-pulse">Memuat data...</td></tr>
//               ) : products.length === 0 ? (
//                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">Tidak ada produk aktif...</td></tr>
//               ) : (
//                 products.map(p => (
//                   <tr key={p.id} className="transition-colors hover:bg-gray-50 group">
//                     <td className="flex items-center gap-3 p-4">
//                       <div className="w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 rounded-lg shrink-0">
//                         {p.image_url ? (
//                           <img src={p.image_url} alt={p.name} className="object-cover w-full h-full" />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full text-[10px] text-gray-400">No Image</div>
//                         )}
//                       </div>
//                       <span className="text-sm font-semibold text-gray-900 line-clamp-2">{p.name}</span>
//                     </td>
//                     <td className="p-4 font-mono text-sm text-gray-600">{p.sku}</td>
//                     <td className="p-4">
//                       <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark border border-gycora/10">
//                         {p.category?.name || "Uncategorized"}
//                       </span>
//                     </td>
//                     <td className="p-4 text-sm whitespace-nowrap">
//                       {p.discount_price && p.discount_price > 0 ? (
//                         <div className="flex flex-col">
//                           <span className="font-bold text-red-600">{formatPrice(p.discount_price)}</span>
//                           <span className="text-[10px] text-gray-400 line-through">{formatPrice(p.price)}</span>
//                         </div>
//                       ) : (
//                         <span className="font-bold text-gray-900">{formatPrice(p.price)}</span>
//                       )}
//                     </td>
//                     <td className="p-4 text-center">
//                       <span className={`text-sm font-bold ${p.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>
//                         {p.stock}
//                       </span>
//                     </td>
//                     <td className="p-4 space-x-3 text-right whitespace-nowrap">
                      
//                       {/* BUNGKUS TOMBOL DETAIL DENGAN RBAC */}
//                       {canAccess('products.detail') && (
//                         <Link to={`/admin/products/${p.slug}`} className="text-sm font-medium text-gray-400 transition-colors hover:text-gycora">Detail</Link>
//                       )}

//                       {/* BUNGKUS TOMBOL EDIT DENGAN RBAC */}
//                       {canAccess('products.edit') && (
//                         <Link to={`/admin/products/${p.slug}/edit`} className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-700">Edit</Link>
//                       )}
                      
//                       {/* BUNGKUS TOMBOL HAPUS DENGAN RBAC */}
//                       {canAccess('products.delete') && (
//                         <button onClick={() => handleDelete(p.id)} className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">Nonaktifkan</button>
//                       )}

//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Product {
  id: number;
  category: { name: string };
  sku: string;
  name: string;
  slug: string;
  price: number;
  discount_price?: number | null;
  wholesale_price?: number | null;
  voucher_discount_price?: number | null;
  stock: number;
  image_url: string;
  status: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk Otorisasi CRUD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  useEffect(() => {
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
    fetchProducts();
  }, []);

  const canAccess = (key: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true;
    return allowedModules.includes(key);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (data.status === 'error') {
          Swal.fire("Error Backend", data.message, "error");
          setProducts([]);
          return;
        }
        const responseData = data.data ? data.data : data;
        setProducts(responseData || []);
      }
    } catch (error) {
      console.error("Gagal load produk:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Nonaktifkan Produk?',
      text: "Produk akan disembunyikan dari pelanggan.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Nonaktifkan',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");
        await fetch(`${BASE_URL}/api/products/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        fetchProducts();
        Swal.fire('Dinonaktifkan!', 'Produk telah disembunyikan.', 'success');
      } catch (error) {
        console.error("Terjadi kesalahan saat memproses.", error);
        Swal.fire('Error!', 'Terjadi kesalahan saat memproses.', 'error');
      }
    }
  };

  const formatPrice = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  // 👇 [FITUR BARU] Hitung Statistik Cerdas menggunakan useMemo 👇
  const stats = useMemo(() => {
    let totalActive = 0;
    let healthyStock = 0;
    let lowStock = 0;
    let onSale = 0;

    products.forEach((p) => {
      totalActive++; // Asumsi API /products hanya mengembalikan yang aktif

      if (p.stock > 5) {
        healthyStock++;
      } else {
        lowStock++;
      }

      // Deteksi status promosi (Jika ada salah satu jenis diskon yang nilainya lebih dari 0)
      if (
        (p.discount_price && p.discount_price > 0) ||
        (p.wholesale_price && p.wholesale_price > 0) ||
        (p.voucher_discount_price && p.voucher_discount_price > 0)
      ) {
        onSale++;
      }
    });

    return { totalActive, healthyStock, lowStock, onSale };
  }, [products]);
  // 👆 ========================================================= 👆

  return (
    <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl">
      <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>
        <div className="flex gap-3">
          <Link
            to="/admin/products/inactive"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
          >
            Produk Nonaktif
          </Link>

          {canAccess('products.create') && (
            <Link
              to="/admin/products/create"
              className="px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-md bg-gycora rounded-lg hover:bg-gycora-dark"
            >
              + Tambah Produk
            </Link>
          )}
        </div>
      </div>

      {/* 👇 [FITUR BARU] Tampilan 4 Kartu Statistik 👇 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 animate-fade-in-up">
        {/* Card 1: Total Aktif */}
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Total Aktif</p>
            <h3 className="text-2xl font-black text-gray-900">{loading ? '-' : stats.totalActive}</h3>
          </div>
        </div>

        {/* Card 2: Healthy Stock */}
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Healthy Stock</p>
            <h3 className="text-2xl font-black text-emerald-600">{loading ? '-' : stats.healthyStock}</h3>
          </div>
        </div>

        {/* Card 3: Low Stock */}
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="flex items-center justify-center w-12 h-12 bg-red-50 text-red-600 rounded-lg shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Low Stock</p>
            <h3 className="text-2xl font-black text-red-600">{loading ? '-' : stats.lowStock}</h3>
          </div>
        </div>

        {/* Card 4: On Sale */}
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-50 text-amber-600 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">On Promo / Sale</p>
            <h3 className="text-2xl font-black text-amber-600">{loading ? '-' : stats.onSale}</h3>
          </div>
        </div>
      </div>
      {/* 👆 ========================================================= 👆 */}

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Produk</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">SKU</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Kategori</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Harga</th>
                <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Stok</th>
                <th className="p-4 text-xs font-bold text-right text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500 animate-pulse">Memuat data...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">Tidak ada produk aktif...</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p.id} className="transition-colors hover:bg-gray-50 group">
                    <td className="flex items-center gap-3 p-4">
                      <div className="w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 rounded-lg shrink-0">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="object-cover w-full h-full" />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-[10px] text-gray-400">No Image</div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-900 line-clamp-2">{p.name}</span>
                    </td>
                    <td className="p-4 font-mono text-sm text-gray-600">{p.sku}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark border border-gycora/10">
                        {p.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="p-4 text-sm whitespace-nowrap">
                      {p.discount_price && p.discount_price > 0 ? (
                        <div className="flex flex-col">
                          <span className="font-bold text-red-600">{formatPrice(p.discount_price)}</span>
                          <span className="text-[10px] text-gray-400 line-through">{formatPrice(p.price)}</span>
                        </div>
                      ) : (
                        <span className="font-bold text-gray-900">{formatPrice(p.price)}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-sm font-bold ${p.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-4 space-x-3 text-right whitespace-nowrap">

                      {/* BUNGKUS TOMBOL DETAIL DENGAN RBAC */}
                      {canAccess('products.detail') && (
                        <Link to={`/admin/products/${p.slug}`} className="text-sm font-medium text-gray-400 transition-colors hover:text-gycora">Detail</Link>
                      )}

                      {/* BUNGKUS TOMBOL EDIT DENGAN RBAC */}
                      {canAccess('products.edit') && (
                        <Link to={`/admin/products/${p.slug}/edit`} className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-700">Edit</Link>
                      )}

                      {/* BUNGKUS TOMBOL HAPUS DENGAN RBAC */}
                      {canAccess('products.delete') && (
                        <button onClick={() => handleDelete(p.id)} className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">Nonaktifkan</button>
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