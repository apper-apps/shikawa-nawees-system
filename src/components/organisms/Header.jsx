import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/molecules/LanguageToggle";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Header = () => {
  const { currentLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Scale" className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h1 className={`text-xl font-bold text-gray-900 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
                شکوہ نویس
              </h1>
              <p className="text-sm text-gray-500">Shikawa Nawees</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;