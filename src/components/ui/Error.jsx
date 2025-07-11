import ApperIcon from "@/components/ApperIcon";
import { useLanguage } from "@/hooks/useLanguage";

const Error = ({ message, onRetry, className = "" }) => {
  const { t } = useLanguage();

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("خرابی ہوئی ہے", "Something went wrong")}
        </h3>
        <p className="text-gray-600 mb-4">
          {message || t("ڈیٹا لوڈ کرنے میں خرابی", "Failed to load data")}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            {t("دوبارہ کوشش کریں", "Try Again")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;