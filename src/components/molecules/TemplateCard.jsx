import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import ApperIcon from "@/components/ApperIcon";

const TemplateCard = ({ template, categoryId, index }) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();

  const handleClick = () => {
    navigate(`/generator/${categoryId}/${template.Id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div className="card hover:shadow-lg transition-all duration-300 group">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <ApperIcon name="FileText" className="h-4 w-4 text-primary" />
              </div>
              <h3 className={`font-medium group-hover:text-primary transition-colors ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
                {currentLanguage === "urdu" ? template.titleUrdu : template.titleEnglish}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary">
                ₨{template.fee}
              </span>
              <ApperIcon name="ChevronRight" className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {template.content.substring(0, 100)}...
          </p>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>{t("فیلڈز", "Fields")}: {template.fields.length}</span>
            <span>{t("کلک کریں", "Click to use")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;