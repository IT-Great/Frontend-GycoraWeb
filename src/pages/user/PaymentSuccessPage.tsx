/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mengambil parameter dari URL (misal: ?external_id=PAY-123&order_id=ORD-456)
  const externalId = searchParams.get("external_id");
  const orderId = searchParams.get("order_id");

  // [BARU] GTM Event: purchase
  useEffect(() => {
    if (orderId) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: orderId,
          currency: "IDR",
          // Catatan: Karena halaman ini tidak memiliki akses ke state keranjang/total harga, 
          // kita mengirimkan transaction_id saja. Meta akan tetap mencatat konversi (event), 
          // namun total nilai pendapatan (ROAS) lebih disarankan dicatat melalui Conversions API (Backend) Anda.
        }
      });
    }
  }, [orderId]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-sans bg-gray-50 animate-fade-in">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
        
        {/* Icon Success */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-emerald-100">
            <svg
              className="w-12 h-12 text-emerald-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 uppercase">
          Pembayaran Berhasil 🎉
        </h1>

        {/* Description */}
        <p className="mb-6 text-gray-600">
          Terima kasih! Pembayaran Anda telah berhasil diproses.
        </p>

        {/* Optional Info */}
        {(externalId || orderId) && (
          <div className="p-4 mb-8 text-sm text-left border border-gray-100 bg-gray-50 rounded-xl">
            {orderId && (
              <p className="mb-1">
                <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Order ID:</span>
                <br />
                <span className="font-mono font-bold text-gray-900">{orderId}</span>
              </p>
            )}
            {externalId && (
              <p className="mt-3">
                <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Payment Ref:</span>
                <br />
                <span className="font-mono text-xs text-gray-700">{externalId}</span>
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 text-xs font-bold tracking-widest text-white uppercase transition shadow-sm bg-gycora hover:bg-gycora-dark rounded-xl"
          >
            Lihat Pesanan Saya
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 hover:bg-gray-50 rounded-xl"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}