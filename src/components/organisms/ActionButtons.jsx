import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLanguage } from "@/hooks/useLanguage";
import Button from "@/components/atoms/Button";
import PaymentModal from "@/components/organisms/PaymentModal";
import html2pdf from "html2pdf.js";

const ActionButtons = ({ templateId, categoryFee, letterPreviewRef }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const { sessionPaid } = useSelector((state) => state.payment);
  const { t } = useLanguage();

  const handleActionRequest = (action) => {
    if (sessionPaid) {
      executeAction(action);
    } else {
      setPendingAction(action);
      setIsPaymentModalOpen(true);
    }
  };

  const executeAction = async (action) => {
    try {
      switch (action) {
        case "download":
          await downloadPDF();
          break;
        case "copy":
          await copyToClipboard();
          break;
        case "print":
          await printLetter();
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(t("خرابی ہوئی", "Something went wrong"));
    }
  };

  const downloadPDF = async () => {
    if (!letterPreviewRef.current) return;

    const element = letterPreviewRef.current;
    const options = {
      margin: 0.5,
      filename: `letter-${templateId}-${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    try {
      await html2pdf().from(element).set(options).save();
      toast.success(t("پی ڈی ایف ڈاؤن لوڈ ہو گیا", "PDF downloaded successfully"));
    } catch (error) {
      toast.error(t("ڈاؤن لوڈ میں خرابی", "Download failed"));
    }
  };

  const copyToClipboard = async () => {
    if (!letterPreviewRef.current) return;

    try {
      const text = letterPreviewRef.current.innerText;
      await navigator.clipboard.writeText(text);
      toast.success(t("کلپ بورڈ میں کاپی ہو گیا", "Copied to clipboard"));
    } catch (error) {
      toast.error(t("کاپی میں خرابی", "Copy failed"));
    }
  };

  const printLetter = async () => {
    if (!letterPreviewRef.current) return;

    try {
      const printWindow = window.open("", "_blank");
      const content = letterPreviewRef.current.outerHTML;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Letter Print</title>
          <style>
            body { font-family: 'Noto Nastaliq Urdu', serif; margin: 0; padding: 20px; }
            .letter-preview { box-shadow: none; margin: 0; padding: 0; }
            @media print {
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
      
      toast.success(t("پرنٹ کیا گیا", "Printed successfully"));
    } catch (error) {
      toast.error(t("پرنٹ میں خرابی", "Print failed"));
    }
  };

  const handlePaymentSuccess = () => {
    if (pendingAction) {
      executeAction(pendingAction);
      setPendingAction(null);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 p-4 bg-white border-t border-gray-200">
        <Button
          icon="Download"
          onClick={() => handleActionRequest("download")}
          className="flex-1 min-w-[120px]"
        >
          {t("ڈاؤن لوڈ PDF", "Download PDF")}
        </Button>
        
        <Button
          icon="Copy"
          variant="secondary"
          onClick={() => handleActionRequest("copy")}
          className="flex-1 min-w-[120px]"
        >
          {t("کاپی کریں", "Copy Text")}
        </Button>
        
        <Button
          icon="Printer"
          variant="outline"
          onClick={() => handleActionRequest("print")}
          className="flex-1 min-w-[120px]"
        >
          {t("پرنٹ کریں", "Print")}
        </Button>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        categoryFee={categoryFee}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default ActionButtons;