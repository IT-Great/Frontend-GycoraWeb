import { useEffect, useState } from "react";
import logoGycora from "../../assets/gycora_logo.png"; // Sesuaikan path logo

export default function MaintenancePage() {
    const [dots, setDots] = useState("");

    // Efek animasi titik-titik (Loading)
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleRetry = () => {
        // Memaksa browser kembali ke halaman utama. 
        // Jika maintenance masih aktif, Interceptor api.ts akan otomatis menahan user di sini.
        // Jika sudah dimatikan admin, user akan tembus ke Beranda.
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 font-sans text-center bg-gray-50 animate-fade-in">
            <div className="w-full max-w-lg p-8 bg-white border border-gray-100 shadow-2xl md:p-12 rounded-[2rem]">

                <div className="flex justify-center mb-8">
                    <img
                        src={logoGycora}
                        alt="Gycora Essence"
                        className="object-contain h-12 md:h-16 animate-pulse"
                    />
                </div>

                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-amber-50 rounded-full">
                    <svg
                        className="w-12 h-12 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                <h1 className="mb-3 text-2xl font-black tracking-tight text-gray-900 uppercase md:text-3xl">
                    Pembaruan Sistem
                </h1>

                <p className="mb-8 text-sm leading-relaxed text-gray-500 md:text-base">
                    Kami sedang melakukan peningkatan performa pada server Gycora untuk memberikan pengalaman berbelanja yang lebih baik. Silakan kembali beberapa saat lagi.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={handleRetry}
                        className="px-8 py-3.5 text-sm font-bold tracking-widest text-white uppercase transition-all shadow-lg rounded-xl bg-gycora hover:bg-gycora-dark hover:-translate-y-0.5 active:scale-95"
                    >
                        Coba Lagi
                    </button>
                </div>

                <div className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status: Sedang Dikerjakan<span className="inline-block w-4 text-left">{dots}</span>
                </div>

            </div>
        </div>
    );
}