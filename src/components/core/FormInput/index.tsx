"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface IFormInput {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
  defaultValue?: string;
  id?: string;
  // Menambahkan props untuk class kustom (opsional, tapi berguna untuk styling eksternal)
  inputClassName?: string;
  labelClassName?: string;
}

const FormInput: React.FC<IFormInput> = ({
  type,
  name,
  label,
  placeholder,
  onChange,
  ref,
  value,
  defaultValue,
  id,
  inputClassName, // Destructure the new prop
  labelClassName, // Destructure the new prop
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Fallback to name if id is not provided
  const inputElementId = id || name;

  if (type === "password") {
    let icon;
    let activeType;
    if (isVisible) {
      icon = <FaRegEye className="h-5 w-5" />; // Ukuran icon lebih jelas
      activeType = "text";
    } else {
      icon = <FaRegEyeSlash className="h-5 w-5" />; // Ukuran icon lebih jelas
      activeType = "password";
    }
    return (
      <div className="flex flex-col gap-2 w-full"> {/* Menambahkan w-full di sini */}
        {label && (
          <label
            htmlFor={inputElementId}
            className={`font-medium text-gray-700 text-sm tracking-wide ${labelClassName || ''}`} // Font lebih tipis, tracking wide
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputElementId}
            name={name}
            ref={ref as React.Ref<HTMLInputElement>}
            type={activeType}
            placeholder={placeholder}
            className={`w-full bg-gray-700/50 backdrop-blur-sm
                        border border-blue-600/50 rounded-md
                        px-4 py-2.5 text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                        transition-all duration-300 shadow-sm
                        ${inputClassName || ''}`} // Kelas baru untuk input
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
          />
          <Button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                        bg-blue-600/70 hover:bg-blue-500/80
                        text-white text-lg shadow-md
                        transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => setIsVisible(!isVisible)}
          >
            {icon}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-2"> {/* Menambahkan w-full di sini */}
      {label && (
        <label
          htmlFor={inputElementId}
          className={`font-medium text-gray-700 text-sm tracking-wide ${labelClassName || ''}`}
        >
          {label}
        </label>
      )}
      <input
        id={inputElementId}
        name={name}
        type={type}
        ref={ref as React.Ref<HTMLInputElement>}
        placeholder={placeholder}
        className={`w-full bg-gray-700/50 backdrop-blur-sm
                    border border-blue-600/50 rounded-md
                    px-4 py-2.5 text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    transition-all duration-300 shadow-sm
                    ${inputClassName || ''}`} // Kelas baru untuk input
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormInput;