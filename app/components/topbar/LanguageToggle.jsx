import { useState } from "react";

export default function LanguageToggle() {
  const [language, setLanguage] = useState("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "BN" : "EN"));
  };

  return (
    <div
      onClick={toggleLanguage}
      className="cursor-pointer px-2.5 py-2 rounded-full transition-all duration-300 bg-[#F5F5F5]"
    >
      <p className="text-lg text-secondary transition-colors duration-200">
        {language}
      </p>
    </div>
  );
}
