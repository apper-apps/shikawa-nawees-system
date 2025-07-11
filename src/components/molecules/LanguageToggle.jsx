import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "@/store/slices/languageSlice";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const LanguageToggle = ({ className = "" }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  const handleToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        <ApperIcon name="Languages" className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage === "urdu" ? "اردو" : "English"}
        </span>
      </div>
      <motion.div
        className="flex items-center"
        animate={{ rotate: currentLanguage === "urdu" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
      </motion.div>
    </motion.button>
  );
};

export default LanguageToggle;