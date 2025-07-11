import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { categoryService } from "@/services/api/categoryService";
import { templateService } from "@/services/api/templateService";
import TemplateCard from "@/components/molecules/TemplateCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CategoryView = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    loadCategoryData();
  }, [categoryId]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [categoryData, templatesData] = await Promise.all([
        categoryService.getById(categoryId),
        templateService.getByCategoryId(categoryId)
      ]);
      
      setCategory(categoryData);
      setTemplates(templatesData);
      setFilteredTemplates(templatesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = templates.filter(template =>
      template.titleUrdu.includes(term) ||
      template.titleEnglish.toLowerCase().includes(term.toLowerCase()) ||
      template.content.includes(term)
    );
    setFilteredTemplates(filtered);
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCategoryData} />;
  }

  if (!category) {
    return (
      <Empty
        title={t("کیٹگری نہیں ملی", "Category not found")}
        description={t("یہ کیٹگری دستیاب نہیں ہے", "This category is not available")}
        actionLabel={t("واپس جائیں", "Go Back")}
        onAction={handleBack}
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
          className="mb-4"
        >
          {t("واپس", "Back")}
        </Button>
      </div>

      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <ApperIcon name={category.icon} className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {currentLanguage === "urdu" ? category.nameUrdu : category.nameEnglish}
            </h1>
            <p className="text-gray-600 mt-1">
              {category.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <ApperIcon name="FileText" className="h-4 w-4" />
            <span>{t("ٹیمپلیٹس", "Templates")}: {category.templateCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="DollarSign" className="h-4 w-4" />
            <span>{t("فیس", "Fee")}: ₨{category.baseFee}</span>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-md">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Templates List */}
      <div>
        <h2 className={`text-xl font-bold mb-4 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
          {t("دستیاب ٹیمپلیٹس", "Available Templates")}
        </h2>
        
        {filteredTemplates.length === 0 ? (
          <Empty
            title={t("کوئی ٹیمپلیٹ نہیں ملا", "No templates found")}
            description={searchTerm ? 
              t("تلاش کی شرائط تبدیل کریں", "Try changing your search terms") :
              t("اس کیٹگری میں ابھی کوئی ٹیمپلیٹ نہیں ہے", "No templates available in this category yet")
            }
            icon="Search"
          />
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map((template, index) => (
              <TemplateCard
                key={template.Id}
                template={template}
                categoryId={categoryId}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;