/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// 1. Definisi Tipe Data (Sesuai dengan relasi Backend Laravel Anda)
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Application {
  id: number;
  user_id: number;
  business_name: string;
  sales_platform: string;
  monthly_capacity: string;
  additional_notes: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user: User;
}

const AdminBusinessPartnerPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  
  // Asumsi token admin disimpan dengan nama 'admin_token' atau 'token'
  const token = localStorage.getItem('admin_token') || localStorage.getItem('token');

  // 2. Mengambil Data dari API
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/admin/resellers/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data.data || []);
    } catch (error) {
      console.error('Gagal mengambil data aplikasi:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: 'Terjadi kesalahan saat terhubung ke server.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Fungsi Approve (Setujui)
  const handleApprove = async (id: number, businessName: string) => {
    const confirm = await Swal.fire({
      title: 'Setujui Kemitraan?',
      text: `Anda akan memberikan akses Harga Grosir kepada "${businessName}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Setujui!',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.post(`${API_URL}/admin/resellers/applications/${id}/approve`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        Swal.fire('Disetujui!', 'Mitra bisnis baru telah diaktifkan.', 'success');
        fetchApplications(); // Muat ulang tabel
      } catch (error: any) {
        Swal.fire('Gagal', error.response?.data?.message || 'Terjadi kesalahan sistem.', 'error');
      }
    }
  };

  // 4. Fungsi Reject (Tolak)
  const handleReject = async (id: number, businessName: string) => {
    const confirm = await Swal.fire({
      title: 'Tolak Kemitraan?',
      text: `Anda akan menolak pengajuan dari "${businessName}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Ya, Tolak!',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.post(`${API_URL}/admin/resellers/applications/${id}/reject`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        Swal.fire('Ditolak', 'Pengajuan kemitraan telah ditolak.', 'info');
        fetchApplications(); // Muat ulang tabel
      } catch (error: any) {
        Swal.fire('Gagal', error.response?.data?.message || 'Terjadi kesalahan sistem.', 'error');
      }
    }
  };

  // Fungsi Helper untuk warna Badge Status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase tracking-wider rounded-full">Menunggu</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider rounded-full">Disetujui</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider rounded-full">Ditolak</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-full">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER DASBOR */}
        <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Business Partner</h1>
            <p className="mt-1 text-sm text-gray-500">
              Tinjau dan kelola pendaftaran kemitraan grosir (B2B) Gycora.
            </p>
          </div>
          <button 
            onClick={fetchApplications}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>

        {/* TABEL DATA */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tanggal</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Profil Pengguna</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Informasi Bisnis</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
                        <span className="text-sm font-medium animate-pulse">Memuat data...</span>
                      </div>
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-500">Belum ada pengajuan kemitraan yang masuk.</p>
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{app.user.first_name} {app.user.last_name}</span>
                          <span className="text-xs text-gray-500">{app.user.email}</span>
                        </div>
                      </td>
                      <td className="max-w-xs px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-gray-900 truncate">{app.business_name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">
                              {app.sales_platform}
                            </span>
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded">
                              {app.monthly_capacity}
                            </span>
                          </div>
                          {app.additional_notes && (
                            <p className="pl-2 mt-2 text-xs italic text-gray-500 border-l-2 border-gray-200 line-clamp-2">
                              "{app.additional_notes}"
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {app.status === 'pending' ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleApprove(app.id, app.business_name)}
                              className="p-2 text-green-600 transition-colors rounded-lg shadow-sm bg-green-50 hover:bg-green-600 hover:text-white"
                              title="Setujui"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleReject(app.id, app.business_name)}
                              className="p-2 text-red-600 transition-colors rounded-lg shadow-sm bg-red-50 hover:bg-red-600 hover:text-white"
                              title="Tolak"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs italic text-gray-400">Selesai</span>
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
    </div>
  );
};

export default AdminBusinessPartnerPage;