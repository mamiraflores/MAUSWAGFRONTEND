import clsx from "clsx";
import React, { useState, useEffect } from "react";

// --- Type Definitions ---
export type ProductFormData = {
  name: string;
  category: string;
  variant: string;
  unit: string;
  quantity: number;
  price: number;
  packageType: string;
};

type CropDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  isDarkMode: boolean;
  cropType: 'Raw' | 'Processed';
  initialData?: ProductFormData; // Added to populate form during edit
};

const categories = ['Fruit', 'Vegetable', 'Grain', 'Other'];
const units = ['kg', 'g', 'pc', 'bunch', 'sack', 'box'];
const packageTypes = ['Sack', 'Box', 'Crate', 'Bag'];

// --- Custom Form Elements ---
const FormLabel: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <label className="font-['Poppins:Medium',sans-serif] text-[16px] block mb-1">
        {children}
    </label>
);

const FormInput: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isDarkMode: boolean;
    name: string;
}> = ({ value, onChange, placeholder, isDarkMode, name }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={clsx(
            "w-full h-[40px] px-3 border rounded-[4px] text-[16px] font-['Poppins:Regular',sans-serif] transition-colors duration-300",
            isDarkMode
                ? "bg-[#4A4A4A] border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black placeholder-gray-500",
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
                : "bg-white border-gray-300 text-black",
        )}
    >
        {options.map((option) => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
);

export default function CropDetailsModal({
    isOpen,
    onClose,
    onSubmit,
    isDarkMode,
    cropType,
    initialData
}: CropDetailsModalProps) {
    
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        category: categories[0],
        variant: '',
        unit: units[0],
        quantity: 0,
        price: 0,
        packageType: packageTypes[0],
    });

    // Populate form with existing data when editing
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData);
            } else {
                setFormData({
                    name: '',
                    category: categories[0],
                    variant: '',
                    unit: units[0],
                    quantity: 0,
                    price: 0,
                    packageType: packageTypes[0],
                });
            }
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ['quantity', 'price'].includes(name) ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
            <div
                className={clsx(
                    "w-[600px] rounded-[16px] p-6 shadow-2xl transition-all duration-300",
                    isDarkMode ? "bg-[#2d2d2d] text-white" : "bg-white text-black",
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-['Poppins:SemiBold',sans-serif] mb-6">
                    Edit {cropType} Crop Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        
                        {/* Product Name */}
                        <div className="w-full space-y-1">
                            <FormLabel>Product Name</FormLabel>
                            <FormInput
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                isDarkMode={isDarkMode}
                                name="name"
                            />
                        </div>

                        {/* Category - Fixed Mapping */}
                        <div className="w-full space-y-1">
                            <FormLabel>Category</FormLabel>
                            <FormInput
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Enter category"
                                isDarkMode={isDarkMode}
                                name="category"
                            />
                        </div>

                        {/* Variant - Fixed Mapping */}
                        <div className="w-full space-y-1">
                            <FormLabel>Variant</FormLabel>
                            <FormInput
                                value={formData.variant}
                                onChange={handleChange}
                                placeholder="Enter variant (e.g. Saba)"
                                isDarkMode={isDarkMode}
                                name="variant"
                            />
                        </div>

                        {/* Unit of Measure */}
                        <div className="w-full space-y-1">
                            <FormLabel>Unit of Measure</FormLabel>
                            <FormSelect
                                value={formData.unit}
                                onChange={handleChange}
                                options={units}
                                isDarkMode={isDarkMode}
                                name="unit"
                            />
                        </div>

                        {/* Quantity */}
                        <div className="w-full space-y-1">
                            <FormLabel>Quantity per Package</FormLabel>
                            <FormInput
                                value={formData.quantity.toString()}
                                onChange={handleChange}
                                placeholder="0.00"
                                isDarkMode={isDarkMode}
                                name="quantity"
                            />
                        </div>

                        {/* Price */}
                        <div className="w-full space-y-1">
                            <FormLabel>Selling Price</FormLabel>
                            <FormInput
                                value={formData.price.toString()}
                                onChange={handleChange}
                                placeholder="0.00"
                                isDarkMode={isDarkMode}
                                name="price"
                            />
                        </div>

                        {/* Package Type */}
                        <div className="w-full space-y-1">
                            <FormLabel>Package Type</FormLabel>
                            <FormSelect
                                value={formData.packageType}
                                onChange={handleChange}
                                options={packageTypes}
                                isDarkMode={isDarkMode}
                                name="packageType"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end pt-4 space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                             style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                            className="h-[40px] w-[130px] rounded-[4px] bg-[#77B254] font-['Poppins:Medium',sans-serif] text-[18px] text-white hover:bg-[#65A30D] transition"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}