import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import CategoryView from "@/components/pages/CategoryView";
import LetterGenerator from "@/components/pages/LetterGenerator";
import { LanguageProvider } from "@/hooks/useLanguage.jsx";

function App() {
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  return (
    <LanguageProvider>
      <div className={`min-h-screen ${currentLanguage === "urdu" ? "rtl" : "ltr"}`}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="/generator/:categoryId/:templateId" element={<LetterGenerator />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={currentLanguage === "urdu"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-[9999]"
        />
      </div>
    </LanguageProvider>
  );
}

export default App;