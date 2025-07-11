import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSessionPaid, setTid } from "@/store/slices/paymentSlice";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

const PaymentModal = ({ isOpen, onClose, categoryFee, onPaymentSuccess }) => {
  const [tid, setTidInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const { t, currentLanguage } = useLanguage();

  const handlePayment = async () => {
    if (!tid.trim()) {
      toast.error(t("ٹرانزیکشن آئی ڈی درج کریں", "Please enter Transaction ID"));
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    dispatch(setSessionPaid(true));
    dispatch(setTid(tid));
    
    toast.success(t("ادائیگی کامیاب ہوئی", "Payment successful!"));
    
    setIsProcessing(false);
    onPaymentSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold text-gray-900 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
                {t("براہِ مہربانی ادائیگی کریں", "Please Complete Payment")}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="X" className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium text-gray-700 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
                    {t("کل فیس", "Total Fee")}:
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ₨{categoryFee}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className={`font-semibold text-blue-900 mb-2 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
                  {t("JazzCash تفصیلات", "JazzCash Details")}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{t("نام", "Name")}:</span>
                    <span>Muhammad Hamid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t("نمبر", "Number")}:</span>
                    <span className="font-mono">0329 7356636</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className={currentLanguage === "urdu" ? "urdu-text" : "english-text"}>
                  {t("ٹرانزیکشن آئی ڈی", "Transaction ID")}
                </Label>
                <Input
                  type="text"
                  value={tid}
                  onChange={(e) => setTidInput(e.target.value)}
                  placeholder="1234567890"
                  className={`font-mono ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}
                />
              </div>

              <p className={`text-xs text-gray-600 ${currentLanguage === "urdu" ? "urdu-text" : "english-text"}`}>
                {t("آپ کو ادائیگی کی تصدیق کے فوراً بعد رسائی مل جائے گی", "You will get access immediately after confirmation")}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                {t("منسوخ", "Cancel")}
              </Button>
              <Button
                onClick={handlePayment}
                loading={isProcessing}
                className="flex-1"
              >
                {t("ادائیگی کی تصدیق کریں", "Confirm Payment")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;