// AddStockModal.tsx

import clsx from "clsx";
import React, { useState, useEffect } from "react";

// --- Type Definitions ---
export type StockFormData = {
  productName: string;
  quantity: number;
  manufacturedDate: string;
  expiryDate: string;
};

type AddStockModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StockFormData) => void;
  isDarkMode: boolean;
  availableProducts: string[];
};

// --- Reusable Form Elements ---
const FormLabel: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <label className="font-['Poppins:Medium',sans-serif] text-[16px]">{children}</label>
);

const FormInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isDarkMode: boolean;
  name: string;
  type?: string;
}> = ({ value, onChange, placeholder, isDarkMode, name, type = "text" }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={clsx(
      "w-full h-[40px] px-3 border rounded-[4px] text-[16px] font-['Poppins:Regular',sans-serif] transition-colors duration-300",
      isDarkMode
        ? "bg-[#4A4A4A] border-gray-600 text-white placeholder-gray-400"
        : "bg-white border-gray-300 text-black placeholder-gray-500"
    )}
  />
);

const FormSelect: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  isDarkMode: boolean;
  name: string;
}> = ({ value, onChange, options, isDarkMode, name }) => (
  <select
    value={value}
    onChange={onChange}
    name={name}
    className={clsx(
      "w-full h-[40px] px-3 border rounded-[4px] text-[16px] font-['Poppins:Regular',sans-serif] appearance-none cursor-pointer transition-colors duration-300",
      isDarkMode
        ? "bg-[#4A4A4A] border-gray-600 text-white"
        : "bg-white border-gray-300 text-black"
    )}
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

// --- Main Component ---
export default function AddStockModal({
  isOpen,
  onClose,
  onSubmit,
  isDarkMode,
  availableProducts,
}: AddStockModalProps) {
  const defaultFormData: StockFormData = {
    productName: availableProducts.length > 0 ? availableProducts[0] : "",
    quantity: 1,
    manufacturedDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState<StockFormData>(defaultFormData);

  useEffect(() => {
    if (isOpen && availableProducts.length > 0) {
      setFormData({
        ...defaultFormData,
        productName: availableProducts[0],
      });
    }
  }, [isOpen, availableProducts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || formData.quantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  // No available products
  if (availableProducts.length === 0) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className={clsx(
            "w-[400px] rounded-[16px] p-6 shadow-2xl",
            isDarkMode ? "bg-[#2d2d2d] text-white" : "bg-white text-black"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-['Poppins:SemiBold',sans-serif] mb-4">
            Cannot Add Stock
          </h2>
          <p className="mb-6">
            Please add at least one product using the "Add Product" button before stocking inventory.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={clsx(
                "h-[40px] w-[100px] rounded-[4px] font-['Poppins:Medium',sans-serif] text-[18px] transition duration-200",
                isDarkMode ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-300 text-black hover:bg-gray-400"
              )}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Modal
  return (
   <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
  onClick={onClose}
>
      <div
        className={clsx(
          "w-[600px] rounded-[16px] p-6 shadow-2xl transition-all duration-300",
          isDarkMode ? "bg-[#2d2d2d] text-white" : "bg-white text-black"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-['Poppins:SemiBold',sans-serif] mb-6">Add New Stock Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product */}
          <div className="space-y-1">
            <FormLabel>Product Name</FormLabel>
            <FormSelect
              value={formData.productName}
              onChange={handleChange}
              options={availableProducts}
              isDarkMode={isDarkMode}
              name="productName"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <FormLabel>Quantity</FormLabel>
            <FormInput
              value={formData.quantity.toString()}
              onChange={handleChange}
              placeholder="Enter quantity"
              isDarkMode={isDarkMode}
              name="quantity"
              type="number"
            />
          </div>

          {/* Manufactured Date */}
          <div className="space-y-1">
            <FormLabel>Manufactured Date</FormLabel>
            <FormInput
              value={formData.manufacturedDate}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              isDarkMode={isDarkMode}
              name="manufacturedDate"
              type="date"
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-1">
            <FormLabel>Expiry Date</FormLabel>
            <FormInput
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              isDarkMode={isDarkMode}
              name="expiryDate"
              type="date"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={clsx(
                "h-[40px] w-[100px] rounded-[4px] font-['Poppins:Medium',sans-serif] text-[18px] transition duration-200",
                isDarkMode ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-300 text-black hover:bg-gray-400"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[40px] w-[130px] rounded-[4px] bg-[#77B254] font-['Poppins:Medium',sans-serif] text-[18px] text-white hover:bg-[#65A30D] transition duration-200"
              style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
            >
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
