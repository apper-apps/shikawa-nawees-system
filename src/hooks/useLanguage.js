import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  const t = (urduText, englishText) => {
    return currentLanguage === "urdu" ? urduText : englishText;
  };

  return (
    <LanguageContext.Provider value={{ t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};