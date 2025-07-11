import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();

  const handleClick = () => {
    navigate(`/category/${category.Id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
              <ApperIcon name={category.icon} className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">
                {t("ٹیمپلیٹس", "Templates")}
              </span>
              <div className="text-2xl font-bold text-primary">
                {category.templateCount}
              </div>
            </div>
          </div>
          
          <h3 className={`text-lg font-semibold mb-2 group-hover:text-primary transition-colors ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
            {currentLanguage === "urdu" ? category.nameUrdu : category.nameEnglish}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {t("فیس", "Fee")}:
              </span>
              <span className="font-semibold text-primary">
                ₨{category.baseFee}
              </span>
            </div>
            <ApperIcon name="ChevronRight" className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;