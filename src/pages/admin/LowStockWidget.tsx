import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import { Link } from "react-router-dom";

interface LowStockProduct {
  id: number;
  name: string;
  sku: string;
  stock: number;
  image_url: string;
}

export default function LowStockWidget() {
  const [products, setProducts] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BASE_URL}/api/products/alerts/low-stock`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setProducts(data.data || []);
        }
      } catch (error) {
        console.error("Gagal memuat low stock alerts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStock();
  }, []);

  if (loading) return <div className="p-4 bg-white rounded-xl shadow-sm animate-pulse h-40">Memuat peringatan stok...</div>;

  if (products.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Stok Aman</h3>
          <p className="text-sm text-gray-500">Tidak ada produk yang memerlukan restock segera.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-700">
          <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h3 className="font-bold tracking-widest uppercase text-sm">Peringatan Stok Kritis</h3>
        </div>
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">{products.length} Item</span>
      </div>
      
      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto custom-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition">
            <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
            <div className="flex-grow">
              <p className="text-sm font-bold text-gray-900 truncate w-48" title={product.name}>{product.name}</p>
              <p className="text-xs font-mono text-gray-500">{product.sku}</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-xl font-black ${product.stock === 0 ? 'text-red-600' : 'text-amber-600'}`}>
                {product.stock}
              </p>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sisa</p>
            </div>
            <Link to={`/admin/products/${product.id}/edit`} className="ml-2 p-2 text-gray-400 hover:text-gycora bg-gray-100 hover:bg-emerald-50 rounded-lg transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}