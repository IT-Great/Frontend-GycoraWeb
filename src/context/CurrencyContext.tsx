/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (basePriceIDR: number) => string;
  // 👇 [BARU] Daftarkan exchangeRates di tipe Context 👇
  exchangeRates: Record<string, number>; 
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Samakan dengan key localStorage yang dipakai di Header.vue ("currency")
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem("currency") as Currency) || "IDR";
  });
  
  // 👇 [PERBAIKAN] Ubah nama state dari 'rates' menjadi 'exchangeRates' 👇
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ IDR: 1 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/exchange-rates`);
        const data = await res.json();
        // Asumsi response JSON: { data: { rates: { USD: 0.000065, ... } } }
        setExchangeRates(data.data.rates);
      } catch (error) {
        console.error("Gagal mengambil data kurs:", error);
      }
    };
    fetchRates();
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    // Simpan ke key "currency" agar sinkron dengan event listener di sistem Anda
    localStorage.setItem("currency", newCurrency); 
    
    // Trigger custom event untuk memberitahu komponen Vue/lainnya jika ada
    window.dispatchEvent(new Event("currency-changed"));
  };

  const formatPrice = (basePriceIDR: number) => {
    if (currency === "IDR" || !exchangeRates[currency]) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(basePriceIDR || 0);
    }

    const convertedPrice = basePriceIDR * exchangeRates[currency];
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(convertedPrice);
  };

  return (
    // 👇 [BARU] Lempar exchangeRates ke dalam Provider 👇
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};