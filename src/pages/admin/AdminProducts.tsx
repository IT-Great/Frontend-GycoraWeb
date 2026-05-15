// /* eslint-disable react-hooks/set-state-in-effect */
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

// interface Product {
//   id: number;
//   category: { name: string }; // Diperbarui menyesuaikan relasi backend (with('category'))
//   sku: string;
//   name: string;
//   price: number;
//   stock: number;
//   image_url: string;
// }

// export default function AdminProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // const fetchProducts = async () => {
//   //   try {
//   //     const res = await fetch("https://backend-gycora-web.vercel.app/api/api/products");
//   //     const data = await res.json();
//   //     // PERBAIKAN: Tangani jika response langsung array atau dibungkus 'data'
//   //     const responseData = data.data ? data.data : data;
//   //     setProducts(responseData || []);
//   //   } catch (error) {
//   //     console.error("Gagal load produk:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("https://backend-gycora-web.vercel.app/api/api/products");
      
//       // Pengamanan: Cek apakah response itu JSON atau bukan
//       const contentType = res.headers.get("content-type");
//       if (contentType && contentType.indexOf("application/json") !== -1) {
//           const data = await res.json();
//           // Jika backend melempar struktur error custom yang kita buat tadi
//           if (data.status === 'error') {
//               console.error("Backend Error:", data.message);
//               Swal.fire("Error Backend", data.message, "error");
//               setProducts([]);
//               return;
//           }
//           const responseData = data.data ? data.data : data;
//           setProducts(responseData || []);
//       } else {
//           // Tangkap error jika backend masih membandel melempar HTML
//           const textData = await res.text();
//           console.error("Response bukan JSON. Kemungkinan error server fatal:", textData);
//           Swal.fire("Koneksi Gagal", "Server mengembalikan format yang tidak valid (HTML). Cek log Laravel.", "error");
//       }
//     } catch (error) {
//       console.error("Gagal load produk:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id: number) => {
//     const result = await Swal.fire({
//       title: 'Yakin menghapus produk ini?',
//       text: "Produk akan dinonaktifkan / dihapus permanen!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Hapus',
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
//         Swal.fire('Terhapus!', 'Produk telah dihapus.', 'success');
//       } catch (error) {
//         console.error("Gagal menghapus produk:", error);
//         Swal.fire('Error!', 'Terjadi kesalahan saat menghapus.', 'error');
//       }
//     }
//   };

//   return (
//     <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl">
//       <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>
//         <Link 
//           to="/admin/products/create" 
//           className="bg-gycora text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gycora-dark transition-all shadow-md"
//         >
//           + Tambah Produk
//         </Link>
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
//                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">Tidak ada produk...</td></tr>
//               ) : (
//                 products.map(p => (
//                   <tr key={p.id} className="transition-colors hover:bg-gray-50 group">
//                     <td className="flex items-center gap-3 p-4">
//                       <div className="w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 rounded-lg shrink-0">
//                         {p.image_url ? (
//                           <img src={p.image_url} alt={p.name} className="object-cover w-full h-full" />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
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
//                     <td className="p-4 text-sm font-bold text-gray-900 whitespace-nowrap">
//                       Rp {p.price.toLocaleString('id-ID')}
//                     </td>
//                     <td className="p-4 text-center">
//                       <span className={`text-sm font-bold ${p.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>
//                         {p.stock}
//                       </span>
//                     </td>
//                     <td className="p-4 space-x-3 text-right whitespace-nowrap">
//                       <Link to={`/admin/products/${p.id}`} className="text-sm font-medium text-gray-400 transition-colors hover:text-gycora">Detail</Link>
//                       <Link to={`/admin/products/${p.id}/edit`} className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-700">Edit</Link>
//                       <button onClick={() => handleDelete(p.id)} className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">Hapus</button>
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
//   price: number;
//   stock: number;
//   image_url: string;
//   status: string;
// }

// export default function AdminProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

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

//   useEffect(() => {
//     fetchProducts();
//   }, []);

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
//           <Link 
//             to="/admin/products/create" 
//             className="bg-gycora text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gycora-dark transition-all shadow-md"
//           >
//             + Tambah Produk
//           </Link>
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
//                           <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
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
//                     <td className="p-4 text-sm font-bold text-gray-900 whitespace-nowrap">
//                       Rp {p.price.toLocaleString('id-ID')}
//                     </td>
//                     <td className="p-4 text-center">
//                       <span className={`text-sm font-bold ${p.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>
//                         {p.stock}
//                       </span>
//                     </td>
//                     <td className="p-4 space-x-3 text-right whitespace-nowrap">
//                       <Link to={`/admin/products/${p.id}`} className="text-sm font-medium text-gray-400 transition-colors hover:text-gycora">Detail</Link>
//                       <Link to={`/admin/products/${p.id}/edit`} className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-700">Edit</Link>
//                       <button onClick={() => handleDelete(p.id)} className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">Nonaktifkan</button>
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
//   price: number;
//   discount_price?: number | null; // Tambahan field discount_price
//   stock: number;
//   image_url: string;
//   status: string;
// }

// export default function AdminProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

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

//   useEffect(() => {
//     fetchProducts();
//   }, []);

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
//           <Link 
//             to="/admin/products/create" 
//             className="bg-gycora text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gycora-dark transition-all shadow-md"
//           >
//             + Tambah Produk
//           </Link>
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
//                           <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
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
//                       <Link to={`/admin/products/${p.id}`} className="text-sm font-medium text-gray-400 transition-colors hover:text-gycora">Detail</Link>
//                       <Link to={`/admin/products/${p.id}/edit`} className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-700">Edit</Link>
//                       <button onClick={() => handleDelete(p.id)} className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">Nonaktifkan</button>
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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api"; 

interface Product {
  id: number;
  category: { name: string }; 
  sku: string;
  name: string;
  slug: string; // [PERBAIKAN] Tambahkan properti slug di sini
  price: number;
  discount_price?: number | null; 
  stock: number;
  image_url: string;
  status: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    // ... Logika hapus tetap menggunakan ID untuk keamanan database, JANGAN diubah
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
          <Link 
            to="/admin/products/create" 
            className="bg-gycora text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gycora-dark transition-all shadow-md"
          >
            + Tambah Produk
          </Link>
        </div>
      </div>

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
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
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
                      {/* [PERBAIKAN KRITIS] Mengarahkan URL admin detail & edit menggunakan SLUG */}
                      <Link to={`/admin/products/${p.slug}`} className="text-sm font-medium text-gray-400 transition-colors hover:text-gycora">Detail</Link>
                      <Link to={`/admin/products/${p.slug}/edit`} className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-700">Edit</Link>
                      
                      {/* [CATATAN] Penghapusan tetap menggunakan ID untuk keamanan ke endpoint API DELETE /api/products/{id} */}
                      <button onClick={() => handleDelete(p.id)} className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">Nonaktifkan</button>
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