/* eslint-disable react-refresh/only-export-components */
// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type LanguageCode, type TranslationKey } from "../translations";

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: TranslationKey, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(
    (localStorage.getItem("app_lang") as LanguageCode) || "id"
  );

  useEffect(() => {
    localStorage.setItem("app_lang", lang);
  }, [lang]);

  // Fungsi penerjemah
  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    let text = translations[lang][key] || key; // Fallback ke key jika tidak ditemukan
    
    // Jika ada parameter dinamis (misal: {query})
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};