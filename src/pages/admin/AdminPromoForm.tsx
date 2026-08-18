/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

// Trik: Freebies di state UI kita jadikan string (dipisah koma) agar mudah diketik admin
interface TierUI {
  min_purchase: number;
  discount_nominal: number;
  freebies_string: string;
}

export default function AdminPromoForm({ promoId, onSuccess, onCancel }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    banner_badge: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });

  const [tiers, setTiers] = useState<TierUI[]>([]);
  const [bundleFreebies, setBundleFreebies] = useState("");

  // Ambil data jika sedang mode Edit
  useEffect(() => {
    if (promoId) {
      fetchPromoData();
    }
  }, [promoId]);

  const fetchPromoData = async () => {
    const token = localStorage.getItem("user_token");
    const res = await fetch(`http://localhost:8000/api/admin/dynamic-promos/${promoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    
    // Format Date untuk input type="datetime-local" (YYYY-MM-DDTHH:mm)
    const formatDateTime = (dateStr: string) => dateStr.slice(0, 16);

    setFormData({
      name: data.name,
      banner_badge: data.banner_badge || "",
      start_date: formatDateTime(data.start_date),
      end_date: formatDateTime(data.end_date),
      is_active: data.is_active,
    });

    const parsedRules = typeof data.rules === 'string' ? JSON.parse(data.rules) : data.rules;
    
    // Parsing JSON Array menjadi String Koma untuk UI
    if (parsedRules.tiers) {
      setTiers(parsedRules.tiers.map((t: any) => ({
        min_purchase: t.min_purchase,
        discount_nominal: t.discount_nominal || 0,
        freebies_string: t.freebies ? t.freebies.join(", ") : ""
      })));
    }
    
    if (parsedRules.bundle_reward?.freebies) {
      setBundleFreebies(parsedRules.bundle_reward.freebies.join(", "));
    }
  };

  const handleAddTier = () => {
    setTiers([...tiers, { min_purchase: 0, discount_nominal: 0, freebies_string: "" }]);
  };

  const handleRemoveTier = (index: number) => {
    const newTiers = [...tiers];
    newTiers.splice(index, 1);
    setTiers(newTiers);
  };

  const handleTierChange = (index: number, field: keyof TierUI, value: any) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTiers(newTiers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🌟 MAGIC DI SINI: Mengubah state UI kembali menjadi struktur JSON Backend 🌟
    const formattedRules = {
      tiers: tiers.map(t => ({
        min_purchase: Number(t.min_purchase),
        discount_nominal: Number(t.discount_nominal),
        // Pecah string koma menjadi array, hilangkan spasi berlebih, filter string kosong
        freebies: t.freebies_string.split(",").map(f => f.trim()).filter(f => f !== "")
      })),
      bundle_reward: {
        freebies: bundleFreebies.split(",").map(f => f.trim()).filter(f => f !== "")
      }
    };

    const payload = {
      ...formData,
      rules: formattedRules
    };

    const token = localStorage.getItem("user_token");
    const method = promoId ? "PUT" : "POST";
    const url = promoId 
        ? `${BASE_URL}/api/admin/dynamic-promos/${promoId}` 
        : `${BASE_URL}/api/admin/dynamic-promos`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        Swal.fire("Berhasil", "Promo berhasil disimpan!", "success");
        if (onSuccess) onSuccess();
      } else {
        const err = await res.json();
        Swal.fire("Error", err.message || "Gagal menyimpan promo", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server bermasalah", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 font-sans bg-white border border-gray-200 shadow-md rounded-xl">
      <h2 className="mb-6 text-2xl font-bold">{promoId ? "Edit" : "Buat"} Promo Dinamis</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFO DASAR */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-xs font-bold text-gray-700 uppercase">Nama Promo</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-emerald-600" placeholder="Contoh: Merdeka Sale 17 Agustus" />
          </div>
          <div>
            <label className="block mb-1 text-xs font-bold text-gray-700 uppercase">Badge (Opsional)</label>
            <input type="text" value={formData.banner_badge} onChange={e => setFormData({...formData, banner_badge: e.target.value})} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-emerald-600" placeholder="Contoh: Merdeka Sale 🇮🇩" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-xs font-bold text-gray-700 uppercase">Mulai Promo</label>
            <input type="datetime-local" required value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full p-2 border border-gray-300 rounded outline-none" />
          </div>
          <div>
            <label className="block mb-1 text-xs font-bold text-gray-700 uppercase">Selesai Promo</label>
            <input type="datetime-local" required value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full p-2 border border-gray-300 rounded outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isActive" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 accent-emerald-600" />
          <label htmlFor="isActive" className="font-bold text-gray-700 cursor-pointer">Status Promo Aktif</label>
        </div>

        {/* LOGIKA ATURAN (TIERS) */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Tingkatan Belanja (Tiers)</h3>
            <button type="button" onClick={handleAddTier} className="px-3 py-1 text-xs font-bold text-white bg-gray-900 rounded hover:bg-black">+ Tambah Tier</button>
          </div>

          {tiers.length === 0 && <p className="text-xs italic text-gray-400">Belum ada aturan batas belanja.</p>}

          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div key={index} className="flex items-end gap-3 p-3 bg-white border border-gray-200 rounded">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Min. Belanja (Rp)</label>
                  <input type="number" required value={tier.min_purchase} onChange={e => handleTierChange(index, "min_purchase", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Diskon (Rp)</label>
                  <input type="number" value={tier.discount_nominal} onChange={e => handleTierChange(index, "discount_nominal", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded" />
                </div>
                <div className="flex-[2]">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Hadiah / Freebies (Pisahkan dg koma)</label>
                  <input type="text" placeholder="Free Pouch, Free Haircare" value={tier.freebies_string} onChange={e => handleTierChange(index, "freebies_string", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded" />
                </div>
                <button type="button" onClick={() => handleRemoveTier(index)} className="p-2 text-red-500 rounded hover:bg-red-50">Hapus</button>
              </div>
            ))}
          </div>
        </div>

        {/* LOGIKA REWARD BUNDLE */}
        <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
          <h3 className="mb-2 font-bold text-purple-900">Hadiah Spesial Pembelian Bundle (Opsional)</h3>
          <p className="mb-3 text-xs text-purple-600">Apa yang didapat pelanggan jika membeli produk bundle/BN-01 di masa promo ini?</p>
          <label className="block text-[10px] font-bold text-purple-700 uppercase">Hadiah / Freebies (Pisahkan dg koma)</label>
          <input type="text" placeholder="Free Gycora Pouch" value={bundleFreebies} onChange={e => setBundleFreebies(e.target.value)} className="w-full p-2 mt-1 text-sm border border-purple-300 rounded outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          {onCancel && <button type="button" onClick={onCancel} className="px-6 py-2 font-bold text-gray-700 bg-gray-100 rounded">Batal</button>}
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#006A4E] text-white font-bold rounded shadow-md hover:bg-emerald-900">
            {loading ? "Menyimpan..." : "Simpan Promo"}
          </button>
        </div>
      </form>
    </div>
  );
}