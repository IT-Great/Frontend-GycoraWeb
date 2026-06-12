/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

type Currency = "IDR" | "USD" | "SGD" | "MYR" | "EUR" | "AUD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (basePriceIDR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ambil mata uang terakhir yang dipilih dari localStorage, atau default ke IDR
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem("user_currency") as Currency) || "IDR";
  });
  const [rates, setRates] = useState<Record<string, number>>({ IDR: 1 });

  useEffect(() => {
    // Ambil data kurs konversi dari Laravel saat aplikasi dimuat
    const fetchRates = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/exchange-rates`);
        const data = await res.json();
        // Asumsi response JSON: { data: { rates: { USD: 0.000065, ... } } }
        setRates(data.data.rates);
      } catch (error) {
        console.error("Gagal mengambil data kurs:", error);
      }
    };
    fetchRates();
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("user_currency", newCurrency);
  };

  const formatPrice = (basePriceIDR: number) => {
    if (currency === "IDR" || !rates[currency]) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(basePriceIDR || 0);
    }

    // Kalkulasi harga: Harga Dasar (IDR) dikali dengan nilai kurs tujuan
    const convertedPrice = basePriceIDR * rates[currency];
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};