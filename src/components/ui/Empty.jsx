import ApperIcon from "@/components/ApperIcon";
import { useLanguage } from "@/hooks/useLanguage";

const Empty = ({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  icon = "FileText", 
  className = "" 
}) => {
  const { t } = useLanguage();

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title || t("کوئی ڈیٹا نہیں ملا", "No data found")}
        </h3>
        <p className="text-gray-600 mb-4">
          {description || t("ابھی کوئی آئٹم دستیاب نہیں ہے", "No items available at the moment")}
        </p>
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;