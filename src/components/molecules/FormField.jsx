import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import { useLanguage } from "@/hooks/useLanguage";

const FormField = ({ 
  field, 
  value, 
  onChange, 
  error, 
  className = "" 
}) => {
  const { t, currentLanguage } = useLanguage();

  const handleChange = (e) => {
    onChange(field.name, e.target.value);
  };

  const getInputComponent = () => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            error={error}
            className={currentLanguage === "urdu" ? "urdu-text" : "english-text"}
          />
        );
      case "date":
      case "time":
      case "number":
        return (
          <Input
            id={field.name}
            type={field.type}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            error={error}
            className={currentLanguage === "urdu" ? "urdu-text" : "english-text"}
          />
        );
      default:
        return (
          <Input
            id={field.name}
            type="text"
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            error={error}
            className={currentLanguage === "urdu" ? "urdu-text" : "english-text"}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={field.name} className={currentLanguage === "urdu" ? "urdu-text" : "english-text"}>
        {currentLanguage === "urdu" ? field.labelUrdu : field.labelEnglish}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {getInputComponent()}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;