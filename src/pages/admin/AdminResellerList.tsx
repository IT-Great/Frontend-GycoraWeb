import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import Swal from "sweetalert2";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface ResellerApp {
    id: number;
    user_id: number;
    business_name: string;
    sales_platform: string;
    monthly_capacity: string;
    additional_notes: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
    user: User;
}

export default function AdminResellerList() {
    const [applications, setApplications] = useState<ResellerApp[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            // Asumsi route backend Anda mengarah ke ResellerController@index
            const res = await fetch(`${BASE_URL}/api/reseller-applications`, {
                headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Gagal load data aplikasi");
            const data = await res.json();
            setApplications(data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleApprove = async (id: number) => {
        const token = localStorage.getItem("admin_token");
        try {
            const res = await fetch(`${BASE_URL}/api/reseller-applications/${id}/approve`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                Swal.fire("Disetujui!", data.message, "success");
                fetchApplications();
            } else {
                Swal.fire("Gagal", data.message, "error");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            Swal.fire("Error", "Terjadi kesalahan sistem", "error");
        }
    };

    const handleReject = async (id: number) => {
        const token = localStorage.getItem("admin_token");
        try {
            const res = await fetch(`${BASE_URL}/api/reseller-applications/${id}/reject`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                Swal.fire("Ditolak", data.message, "success");
                fetchApplications();
            } else {
                Swal.fire("Gagal", data.message, "error");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            Swal.fire("Error", "Terjadi kesalahan sistem", "error");
        }
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(dateString));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
            </div>
        );
    }

    return (
        <div className="relative p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
            <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen Affiliate & Reseller</h1>
                    <p className="mt-1 text-sm text-gray-500">Tinjau dan setujui pendaftaran mitra bisnis (B2B).</p>
                </div>
                <div className="px-4 py-2 text-sm font-bold border rounded-lg bg-blue-50 text-blue-700 border-blue-100">
                    Total: {applications.length} Pendaftar
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => (
                    <div key={app.id} className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className={`p-4 text-white font-bold flex justify-between items-center ${app.status === 'pending' ? 'bg-amber-500' : app.status === 'approved' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                            <span className="uppercase tracking-wider text-xs">{app.status}</span>
                            <span className="text-[10px] bg-white/20 px-2 py-1 rounded">{formatDate(app.created_at)}</span>
                        </div>
                        <div className="p-5 flex-1">
                            <h3 className="text-lg font-extrabold text-gray-900 mb-1">{app.business_name}</h3>
                            <p className="text-xs text-gray-500 mb-4">{app.user.first_name} {app.user.last_name} • {app.user.email}</p>

                            <div className="space-y-2 text-sm text-gray-700">
                                <p><strong>Platform:</strong> {app.sales_platform}</p>
                                <p><strong>Kapasitas Bulanan:</strong> {app.monthly_capacity}</p>
                                {app.additional_notes && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs italic text-gray-600 border border-gray-100">
                                        "{app.additional_notes}"
                                    </div>
                                )}
                            </div>
                        </div>

                        {app.status === 'pending' && (
                            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                                <button onClick={() => handleReject(app.id)} className="flex-1 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                                    Tolak
                                </button>
                                <button onClick={() => handleApprove(app.id)} className="flex-1 py-2 text-xs font-bold text-white bg-[#006A4E] rounded-lg hover:bg-emerald-800 transition-colors shadow-md">
                                    Setujui
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {applications.length === 0 && (
                    <div className="col-span-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                        Belum ada pendaftar Reseller/Affiliate saat ini.
                    </div>
                )}
            </div>
        </div>
    );
}