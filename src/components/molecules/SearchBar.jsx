import { useState } from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { useLanguage } from "@/hooks/useLanguage";

const SearchBar = ({ onSearch, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t, currentLanguage } = useLanguage();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={t("تیمپلیٹ تلاش کریں...", "Search templates...")}
        value={searchTerm}
        onChange={handleChange}
        className={`pl-10 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}
      />
    </div>
  );
};

export default SearchBar;