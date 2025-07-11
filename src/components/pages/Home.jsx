import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { categoryService } from "@/services/api/categoryService";
import CategoryCard from "@/components/molecules/CategoryCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
      setFilteredCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = categories.filter(category =>
      category.nameUrdu.includes(term) ||
      category.nameEnglish.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCategories} />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-gradient ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
          {t("شکوہ نویس میں خوش آمدید", "Welcome to Shikawa Nawees")}
        </h1>
        <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
          {t("قانونی، سماجی اور سرکاری معاملات کے لیے پیشہ ورانہ شکایتی خطوط تیار کریں", "Generate professional complaint letters for legal, social, and official matters")}
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className={`text-2xl font-bold mb-6 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
          {t("کیٹگریز", "Categories")}
        </h2>
        
        {filteredCategories.length === 0 ? (
          <Empty
            title={t("کوئی کیٹگری نہیں ملی", "No categories found")}
            description={t("تلاش کی شرائط تبدیل کریں", "Try changing your search terms")}
            icon="Search"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={category.Id}
                category={category}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-12"
      >
        <h2 className={`text-2xl font-bold text-center mb-8 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
          {t("خصوصیات", "Features")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {t("آسان استعمال", "Easy to Use")}
            </h3>
            <p className={`text-gray-600 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {t("صرف فارم بھریں اور فوری طور پر خط تیار کریں", "Just fill the form and generate letter instantly")}
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {t("فوری ڈاؤن لوڈ", "Instant Download")}
            </h3>
            <p className={`text-gray-600 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {t("PDF فارمیٹ میں فوری طور پر ڈاؤن لوڈ کریں", "Download instantly in PDF format")}
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {t("کم فیس", "Low Cost")}
            </h3>
            <p className={`text-gray-600 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
              {t("بہت کم قیمت میں پیشہ ورانہ خطوط", "Professional letters at very low cost")}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;