/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

interface CircleTier {
    id: string;
    name: string;
    minPoints: number;
    colorFrom: string;
    colorTo: string;
    textColor: string;
    icon: string;
    benefits: string[];
}

export default function GycoraCirclePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Definisi Level/Tier Gycora Circle
    const tiers: CircleTier[] = [
        {
            id: "silver",
            name: "Silver",
            minPoints: 0,
            colorFrom: "from-gray-100",
            colorTo: "to-gray-300",
            textColor: "text-gray-700",
            icon: "🥈",
            benefits: ["Akses ke katalog reguler", "Poin belanja standar (1 Pts = Rp 100.000)", "Dukungan CS 24/7"],
        },
        {
            id: "gold",
            name: "Gold",
            minPoints: 500,
            colorFrom: "from-amber-200",
            colorTo: "to-yellow-500",
            textColor: "text-amber-900",
            icon: "🥇",
            benefits: ["Semua benefit Silver", "Diskon Ongkir hingga 15rb/bulan", "Akses awal produk baru (Early Access)"],
        },
        {
            id: "platinum",
            name: "Platinum",
            minPoints: 2000,
            colorFrom: "from-slate-700",
            colorTo: "to-slate-900",
            textColor: "text-slate-100",
            icon: "💎",
            benefits: ["Semua benefit Gold", "Gratis Ongkir tanpa batas", "Prioritas komplain & retur instant", "Hadiah ulang tahun eksklusif"],
        },
        {
            id: "emerald",
            name: "Emerald",
            minPoints: 5000,
            colorFrom: "from-[#006A4E]",
            colorTo: "to-emerald-900",
            textColor: "text-emerald-50",
            icon: "👑",
            benefits: ["Semua benefit Platinum", "Multiplier Poin 2x lipat", "Undangan ke VIP Gathering Gycora", "Personal Shopper Assistant"],
        },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("user_token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const res = await fetch(`${BASE_URL}/api/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error("Gagal mengambil data user", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    // Hitung status tier saat ini
    const currentTierIndex = useMemo(() => {
        if (!user) return 0;
        const pts = user.point || 0;
        // Cari index tertinggi yang poinnya terpenuhi
        for (let i = tiers.length - 1; i >= 0; i--) {
            if (pts >= tiers[i].minPoints) return i;
        }
        return 0;
    }, [user]);

    const currentTier = tiers[currentTierIndex];
    const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;

    const pointsToNextTier = nextTier ? nextTier.minPoints - (user?.point || 0) : 0;
    const progressPercentage = nextTier
        ? Math.min(100, Math.max(0, ((user?.point || 0) - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints) * 100))
        : 100;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-[#006A4E] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 font-sans bg-gray-50">
            {/* HERO SECTION */}
            <div className={`relative w-full pt-32 pb-40 overflow-hidden bg-gradient-to-br ${currentTier.colorFrom} ${currentTier.colorTo}`}>
                {/* Dekorasi Latar */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black opacity-10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
                    <p className={`text-sm font-black tracking-[0.3em] uppercase mb-4 ${currentTier.textColor} opacity-80`}>
                        Gycora Circle Loyalty
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-6xl drop-shadow-lg">{currentTier.icon}</span>
                        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tighter ${currentTier.textColor}`}>
                            {currentTier.name}
                        </h1>
                    </div>
                    <p className={`text-lg font-medium max-w-2xl mx-auto ${currentTier.textColor} opacity-90`}>
                        Halo {user?.first_name}, Anda saat ini berada di tingkat {currentTier.name}. Nikmati berbagai keuntungan eksklusif khusus untuk Anda.
                    </p>
                </div>
            </div>

            <div className="relative z-20 px-4 mx-auto -mt-24 max-w-7xl sm:px-6 lg:px-8 space-y-12">
                {/* KARTU PROGRES POIN */}
                <div className="p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl shadow-gray-200/50">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-8">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Saldo Poin Anda</p>
                            <p className="text-4xl font-black text-gray-900">
                                {new Intl.NumberFormat("id-ID").format(user?.point || 0)} <span className="text-xl text-[#006A4E]">Pts</span>
                            </p>
                        </div>

                        {nextTier ? (
                            <div className="text-right">
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Menuju {nextTier.name}</p>
                                <p className="text-sm font-bold text-gray-800">
                                    Butuh <span className="text-rose-500">{new Intl.NumberFormat("id-ID").format(pointsToNextTier)} Pts</span> lagi
                                </p>
                            </div>
                        ) : (
                            <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                                <p className="text-sm font-bold text-[#006A4E]">Tingkat Tertinggi Tercapai 👑</p>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-4 overflow-hidden bg-gray-100 rounded-full shadow-inner">
                        <div
                            className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r ${currentTier.colorFrom} ${currentTier.colorTo}`}
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs font-bold text-gray-400">
                        <span>{currentTier.minPoints} Pts</span>
                        <span>{nextTier ? `${nextTier.minPoints} Pts` : 'MAX'}</span>
                    </div>
                </div>

                {/* TAMPILAN BENEFIT SEMUA TIER */}
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-center text-gray-900 mb-8">
                        Hak Istimewa Gycora Circle
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tiers.map((tier, idx) => {
                            const isAchieved = (user?.point || 0) >= tier.minPoints;
                            return (
                                <div
                                    key={tier.id}
                                    className={`relative p-6 rounded-3xl border transition-all duration-300 ${isAchieved ? `bg-gradient-to-br ${tier.colorFrom}${tier.colorTo} shadow-xl border-transparent transform hover:-translate-y-1` : 'bg-white border-gray-200 opacity-60 grayscale-[50%] hover:grayscale-0'}`}
                                >
                                    {isAchieved && idx === currentTierIndex && (
                                        <div className="absolute top-0 right-0 px-3 py-1 -mt-3 mr-4 text-[10px] font-black tracking-widest text-white uppercase bg-black rounded-full shadow-md">
                                            Current Tier
                                        </div>
                                    )}
                                    <div className="text-4xl mb-4">{tier.icon}</div>
                                    <h3 className={`text-xl font-black mb-1 ${isAchieved ? tier.textColor : 'text-gray-900'}`}>
                                        {tier.name}
                                    </h3>
                                    <p className={`text-xs font-bold mb-6 opacity-80 ${isAchieved ? tier.textColor : 'text-gray-500'}`}>
                                        Min. {new Intl.NumberFormat("id-ID").format(tier.minPoints)} Poin
                                    </p>

                                    <ul className="space-y-3">
                                        {tier.benefits.map((benefit, bIdx) => (
                                            <li key={bIdx} className="flex items-start gap-2">
                                                <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isAchieved ? tier.textColor : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className={`text-sm font-medium leading-tight ${isAchieved ? tier.textColor : 'text-gray-600'}`}>
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {!isAchieved && (
                                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-3xl opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="px-4 py-2 text-xs font-bold text-gray-900 bg-white rounded-full shadow-lg">
                                                Terkunci 🔒
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* INFO TAMBAHAN */}
                <div className="p-8 mt-12 bg-emerald-50 border border-emerald-100 rounded-3xl">
                    <h4 className="text-sm font-black tracking-widest text-[#006A4E] uppercase mb-4">Cara Mendapatkan Poin</h4>
                    <p className="text-sm leading-relaxed text-emerald-900/80">
                        Poin Gycora Circle otomatis ditambahkan ke akun Anda setiap kali Anda menyelesaikan transaksi. Setiap pembelanjaan senilai <strong>Rp 100.000</strong> akan memberikan Anda <strong>1 Poin</strong> (berlaku kelipatan). Kumpulkan terus poinnya dan nikmati fasilitas VIP dari Gycora!
                    </p>
                </div>

            </div>
        </div>
    );
}