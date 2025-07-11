import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { templateService } from "@/services/api/templateService";
import { categoryService } from "@/services/api/categoryService";
import { updateFormData } from "@/store/slices/templateSlice";
import FormField from "@/components/molecules/FormField";
import LetterPreview from "@/components/organisms/LetterPreview";
import ActionButtons from "@/components/organisms/ActionButtons";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const LetterGenerator = () => {
  const { categoryId, templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const letterPreviewRef = useRef(null);
  
  const [template, setTemplate] = useState(null);
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("form");
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    loadData();
  }, [categoryId, templateId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [templateData, categoryData] = await Promise.all([
        templateService.getById(templateId),
        categoryService.getById(categoryId)
      ]);
      
      setTemplate(templateData);
      setCategory(categoryData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (fieldName, value) => {
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);
    dispatch(updateFormData(newFormData));
  };

  const handleBack = () => {
    navigate(`/category/${categoryId}`);
  };

  const handleClearForm = () => {
    setFormData({});
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (!template || !category) {
    return (
      <Error
        message={t("ٹیمپلیٹ نہیں ملا", "Template not found")}
        onRetry={loadData}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          icon="ArrowLeft"
          onClick={handleBack}
        >
          {t("واپس", "Back")}
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            icon="RotateCcw"
            onClick={handleClearForm}
            size="sm"
          >
            {t("صاف کریں", "Clear")}
          </Button>
        </div>
      </div>

      {/* Template Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
            <ApperIcon name={category.icon} className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold text-gray-900 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {currentLanguage === "urdu" ? template.titleUrdu : template.titleEnglish}
            </h1>
            <p className="text-gray-600 text-sm">
              {currentLanguage === "urdu" ? category.nameUrdu : category.nameEnglish} • ₨{template.fee}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "form"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t("فارم", "Form")}
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t("پیش نظارہ", "Preview")}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className={`${activeTab === "form" ? "block" : "hidden"} lg:block`}>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className={`text-lg font-semibold mb-6 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {t("فارم بھریں", "Fill the Form")}
            </h2>
            
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {template.fields.map((field, index) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleFormChange}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`${activeTab === "preview" ? "block" : "hidden"} lg:block`}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className={`text-lg font-semibold ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
                {t("پیش نظارہ", "Preview")}
              </h2>
            </div>
            
            <div className="p-4 bg-gray-50">
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                <LetterPreview
                  ref={letterPreviewRef}
                  template={template}
                  formData={formData}
                  className="scale-75 origin-top"
                />
              </div>
            </div>
            
            <ActionButtons
              templateId={templateId}
              categoryFee={category.baseFee}
              letterPreviewRef={letterPreviewRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterGenerator;