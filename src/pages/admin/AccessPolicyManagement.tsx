import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api"; // Sesuaikan path dengan struktur proyek Anda

// --- TIPE DATA ---
type Role = "admin" | "gudang" | "accounting" | "reseller";

interface ModuleDefinition {
  key: string;
  label: string;
  description: string;
}

// --- KONSTANTA MODUL (Sesuai dengan AdminLayout.tsx) ---
const AVAILABLE_MODULES: ModuleDefinition[] = [
  { key: "dashboard", label: "Dashboard", description: "Melihat ringkasan statistik utama." },
  { key: "categories", label: "Kategori Produk", description: "Mengelola kategori produk." },
  { key: "products", label: "Katalog Utama (Produk)", description: "Membuat, mengedit, dan menghapus produk." },
  { key: "stocks", label: "Stok & Batch Gudang", description: "Mengatur pergerakan dan batch stok." },
  { key: "treatments", label: "Daftar Treatment (Klinik)", description: "Mengelola layanan klinik kecantikan." },
  { key: "transactions", label: "Transaksi", description: "Memantau dan memproses pesanan." },
  { key: "sales_report", label: "Laporan Penjualan", description: "Melihat rekapan omzet dan grafik penjualan." },
  { key: "users", label: "Pelanggan", description: "Melihat data pelanggan aplikasi." },
  { key: "business_partners", label: "Partner Bisnis", description: "Manajemen data partner/reseller." },
  { key: "reviews", label: "Ulasan Pelanggan", description: "Memoderasi ulasan produk/treatment." },
  { key: "events", label: "Events", description: "Mengatur acara atau promo khusus." },
  { key: "subscribers", label: "Subscribers", description: "Mengelola data langganan email (newsletter)." },
  { key: "audit_logs", label: "System Logs", description: "Melihat riwayat aktivitas (audit trail)." },
  { key: "coas", label: "Chart of Accounts", description: "Manajemen kode akun akuntansi." },
  { key: "transfer_receive", label: "Payments", description: "Mencatat kas masuk/keluar." },
  { key: "suppliers", label: "Suppliers", description: "Data vendor/pemasok barang." },
  { key: "invoices", label: "Invoices", description: "Mengelola faktur tagihan." },
];

const ROLES: { id: Role; label: string }[] = [
  { id: "admin", label: "Admin Umum" },
  { id: "gudang", label: "Tim Gudang" },
  { id: "accounting", label: "Accounting & Finance" },
  { id: "reseller", label: "Reseller (B2B)" },
];

export default function AccessPolicyManagement() {
  const [activeTab, setActiveTab] = useState<Role>("admin");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // State untuk menyimpan kebijakan akses: Record<Role, string[]>
  // Contoh: { admin: ['dashboard', 'products'], gudang: ['stocks'] }
  const [policies, setPolicies] = useState<Record<Role, string[]>>({
    admin: [],
    gudang: [],
    accounting: [],
    reseller: [],
  });

  // Ambil data konfigurasi akses saat komponen dimuat
  const fetchPolicies = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${BASE_URL}/admin/access-policies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Asumsi backend mengembalikan data format JSON yang memetakan Role -> Array of Keys
      setPolicies(res.data.data);
    } catch (error) {
      console.error("Gagal memuat Access Policies", error);
      Swal.fire("Error", "Gagal mengambil data konfigurasi akses dari server.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Fungsi untuk membalikkan (toggle) status izin suatu modul
  const handleTogglePermission = (moduleKey: string) => {
    setPolicies((prev) => {
      const currentRolePermissions = prev[activeTab] || [];
      const hasPermission = currentRolePermissions.includes(moduleKey);

      let newPermissions;
      if (hasPermission) {
        // Hapus akses
        newPermissions = currentRolePermissions.filter((k) => k !== moduleKey);
      } else {
        // Tambahkan akses
        newPermissions = [...currentRolePermissions, moduleKey];
      }

      return {
        ...prev,
        [activeTab]: newPermissions,
      };
    });
  };

  // Fungsi untuk menyimpan perubahan ke backend
  const handleSavePolicies = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      await axios.put(
        `${BASE_URL}/admin/access-policies`,
        { policies },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Simpan juga ke localStorage agar layout langsung tahu tanpa refresh (Opsional)
      localStorage.setItem("admin_access_policies", JSON.stringify(policies));

      Swal.fire({
        title: "Tersimpan!",
        text: "Kebijakan akses berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal menyimpan Access Policies", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan pengaturan.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-gycora animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* HEADER SECTION */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Access Policy</h1>
          <p className="mt-1 text-sm text-gray-500">
            Atur visibilitas menu dan otorisasi akses untuk setiap tipe pengguna (Role). Superadmin secara otomatis memiliki akses penuh ke semua modul.
          </p>
        </div>
        <button
          onClick={handleSavePolicies}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-all rounded-lg bg-gycora hover:bg-gycora-dark focus:ring-4 focus:ring-gycora/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            "Menyimpan..."
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Simpan Konfigurasi
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* SIDEBAR TABS (ROLES) */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex flex-row overflow-x-auto bg-white border border-gray-200 md:flex-col rounded-xl custom-scrollbar">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveTab(role.id)}
                className={`flex items-center justify-between px-4 py-4 text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0 whitespace-nowrap md:whitespace-normal text-left ${
                  activeTab === role.id
                    ? "bg-gycora-light/30 text-gycora-dark border-l-4 border-l-gycora"
                    : "text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent"
                }`}
              >
                {role.label}
                <span className="hidden px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-md md:inline-block">
                  {policies[role.id]?.length || 0} Izin
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT (MODULES LIST) */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              Pengaturan Akses: {ROLES.find((r) => r.id === activeTab)?.label}
            </h2>
            <p className="text-sm text-gray-500">Pilih menu mana saja yang boleh dilihat dan diakses oleh Role ini di Dashboard Admin.</p>
          </div>

          <div className="divide-y divide-gray-100">
            {AVAILABLE_MODULES.map((module) => {
              const isGranted = policies[activeTab]?.includes(module.key) || false;

              return (
                <div key={module.key} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50">
                  <div className="pr-4">
                    <p className="font-bold text-gray-900">{module.label}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{module.description}</p>
                  </div>
                  
                  {/* TOGGLE SWITCH */}
                  <button
                    type="button"
                    onClick={() => handleTogglePermission(module.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gycora focus:ring-offset-2 ${
                      isGranted ? "bg-gycora" : "bg-gray-200"
                    }`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isGranted ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}