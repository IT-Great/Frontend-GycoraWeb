import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

interface Product {
  id: number;
  category_name: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
}

interface WishlistItem {
  id: number;
  product_id: number;
  product: Product;
}

export default function FavoritePage() {
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlists = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user_token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`${BASE_URL}/api/wishlists`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      if (res.ok) {
        const data = await res.json();
        setWishlists(data);
      }
    } catch (error) {
      console.error("Gagal memuat favorit:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault(); // Mencegah pindah ke detail produk
    e.stopPropagation();

    // Optimistic Delete: Langsung hilangkan dari UI agar terasa cepat
    const previousWishlists = [...wishlists];
    setWishlists((prev) => prev.filter(w => w.product.id !== productId));

    try {
      const token = localStorage.getItem("user_token");
      const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({ product_id: productId })
      });

      if (!res.ok) throw new Error("Gagal menghapus favorit");
      
      // Opsional: Dispatch event global jika diperlukan (seperti notifikasi jumlah favorit di header)
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (error) {
      // Rollback jika request ke server gagal
      setWishlists(previousWishlists);
      console.error(error);
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="relative min-h-screen px-4 py-16 font-sans bg-gray-50 md:px-12 animate-fade-in">
      {/* Overlay Loading */}
      {loading && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gray-50/60 backdrop-blur-sm">
          <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        
        {/* HEADER FAVORITE */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate("/profile")} 
            className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">Koleksi Favorit</h1>
        </div>

        {/* LIST PRODUK FAVORIT */}
        {/* {wishlists.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlists.map((item) => (
              <Link 
                key={item.id} 
                to={`/product/${item.product.id}`} 
                className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-gycora/20"
              >
                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                  {item.product.image_url ? (
                    <img 
                      src={item.product.image_url} 
                      alt={item.product.name} 
                      className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
                      Belum ada gambar
                    </div>
                  )}
                  
                  <div className="absolute flex flex-col gap-2 top-3 left-3">
                    <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
                      {item.product.category_name}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => handleToggleWishlist(e, item.product.id)}
                    className="absolute z-20 flex items-center justify-center w-10 h-10 transition-transform bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50 hover:scale-110"
                    title="Hapus dari Favorit"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      className="w-5 h-5 text-red-500 fill-current"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora line-clamp-2">
                    {item.product.name}
                  </h3>
                  <div className="mt-auto">
                    <p className="text-xl font-extrabold text-gycora">
                      {formatRupiah(item.product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
          {/* LIST PRODUK FAVORIT */}
        {wishlists.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlists.map((item) => {
              // PROTEKSI: Abaikan item jika produknya sudah dihapus dari database
              if (!item.product) return null;

              return (
                <Link 
                  key={item.id} 
                  to={`/products/${item.product.id}`} 
                  className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-gycora/20"
                >
                  {/* Product Image Area */}
                  <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                    {item.product.image_url ? (
                      <img 
                        src={item.product.image_url} 
                        alt={item.product.name} 
                        className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
                        Belum ada gambar
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute flex flex-col gap-2 top-3 left-3">
                      <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
                        {item.product.category_name}
                      </span>
                    </div>

                    {/* TOMBOL HAPUS FAVORIT */}
                    <button 
                      onClick={(e) => handleToggleWishlist(e, item.product.id)}
                      className="absolute z-20 flex items-center justify-center w-10 h-10 transition-transform bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50 hover:scale-110"
                      title="Hapus dari Favorit"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5 text-red-500 fill-current"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-grow p-5">
                    <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora line-clamp-2">
                      {item.product.name}
                    </h3>
                    <div className="mt-auto">
                      <p className="text-xl font-extrabold text-gycora">
                        {formatRupiah(item.product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          !loading && (
            <div className="py-24 text-center bg-white border border-gray-200 border-dashed rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <p className="mb-6 font-serif text-xl italic text-gray-400">Daftar favorit Anda masih kosong.</p>
              <button 
                onClick={() => navigate('/products')} 
                className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
              >
                Eksplorasi Produk
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}