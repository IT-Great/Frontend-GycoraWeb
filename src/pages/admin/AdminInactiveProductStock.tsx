/* eslint-disable prefer-const */
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
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

export default function AdminInactiveProductStock() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // State untuk Otorisasi
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
    }, []);

    const canAccess = (key: string) => {
        if (!adminUser) return false;
        if (adminUser.usertype === "superadmin") return true;
        return allowedModules.includes(key);
    };

    const fetchStocks = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            // Asumsi: Backend mendukung query parameter status=inactive. 
            // Jika Backend Anda menggunakan route khusus, sesuaikan endpoint ini (misal: /api/admin/product-stocks/inactive).
            const res = await fetch(`${BASE_URL}/api/admin/product-stocks?status=inactive`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            const responseData = data.data ? data.data : data;
            setProducts(responseData || []);
        } catch (error) {
            console.error("Gagal load data stok inaktif:", error);
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
            inputAttributes: { min: "1", step: "1" },
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#006A4E',
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

    // 👇 Statistik Stok untuk Produk Inaktif 👇
    const stats = useMemo(() => {
        let totalProducts = products.length;
        let healthyStock = 0;
        let lowStock = 0;
        let outOfStock = 0;

        products.forEach((p) => {
            if (p.stock >= 10) healthyStock++;
            else if (p.stock > 0 && p.stock < 10) lowStock++;
            else if (p.stock <= 0) outOfStock++;
        });

        return { totalProducts, healthyStock, lowStock, outOfStock };
    }, [products]);

    return (
        <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
            <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen Stok (Nonaktif)</h1>
                    <p className="mt-1 text-sm text-gray-500">Melihat persediaan barang yang sudah ditarik/dinonaktifkan dari etalase.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/admin/product-stocks"
                        className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-black transition-all shadow-sm"
                    >
                        Kembali ke Produk Aktif
                    </Link>
                </div>
            </div>

            {/* Tampilan 4 Kartu Statistik Stok */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
                {/* Card 1 */}
                <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl opacity-80">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-gray-600 shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Total Produk (Inaktif)</p>
                        <h3 className="text-2xl font-black text-gray-900">{loading ? '-' : stats.totalProducts}</h3>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl opacity-80">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-emerald-600 shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Stok Aman (≥ 10)</p>
                        <h3 className="text-2xl font-black text-gray-600">{loading ? '-' : stats.healthyStock}</h3>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl opacity-80">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-amber-600 shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Stok Menipis (&lt; 10)</p>
                        <h3 className="text-2xl font-black text-gray-600">{loading ? '-' : stats.lowStock}</h3>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-xl opacity-80">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 text-red-600 rounded-lg shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Stok Habis (0)</p>
                        <h3 className="text-2xl font-black text-gray-600">{loading ? '-' : stats.outOfStock}</h3>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden bg-gray-50 border border-gray-200 shadow-sm rounded-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse opacity-75">
                        <thead className="border-b border-gray-200 bg-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Produk & SKU</th>
                                <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Total Stok</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Riwayat Batch (Tersedia)</th>
                                <th className="p-4 text-xs font-bold text-right text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-500 animate-pulse">Memuat data stok...</td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Tidak ada produk inaktif.</td></tr>
                            ) : (
                                products.map(p => (
                                    <tr key={p.id} className="transition-colors hover:bg-gray-100 group">
                                        <td className="p-4">
                                            <p className="text-sm font-bold text-gray-700">{p.name}</p>
                                            <p className="mt-0.5 font-mono text-xs text-gray-400">{p.sku}</p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`text-lg font-black ${p.stock < 10 ? 'text-red-400' : 'text-gray-600'}`}>
                                                {p.stock}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {p.stocks && p.stocks.length > 0 ? (
                                                <div className="flex flex-wrap max-w-xs gap-2">
                                                    {p.stocks.map(batch => (
                                                        <div key={batch.id} className="bg-white border border-gray-300 px-2 py-1 rounded text-[10px]" title={`Tanggal: ${new Date(batch.created_at).toLocaleDateString('id-ID')}`}>
                                                            <span className="font-bold text-gray-500">{batch.batch_code}</span>
                                                            <span className="ml-1 font-black text-gray-400">({batch.quantity})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-xs italic text-gray-400">Tidak ada batch aktif</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            {canAccess('stocks.create') && (
                                                <button
                                                    onClick={() => handleAddStock(p.id, p.name)}
                                                    className="px-4 py-2 text-xs font-bold text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
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