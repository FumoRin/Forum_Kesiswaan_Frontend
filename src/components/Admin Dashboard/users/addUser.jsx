import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddUserForm = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      <Input 
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default AddUserForm;