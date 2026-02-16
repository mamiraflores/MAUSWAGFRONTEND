import React from 'react';
import clsx from 'clsx';

interface FarmInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
}

const getInputClasses = (isDarkMode: boolean) => clsx(
    "w-full p-3 rounded-md border font-['Poppins:Regular',sans-serif] text-[14px] focus:ring-[#77b254] focus:border-[#77b254] outline-none transition-colors",
    isDarkMode 
        ? "bg-[#2d2d2d] border-[#555] text-white placeholder:text-gray-400" 
        : "bg-white border-[#d0d0d0] text-gray-700 placeholder:text-gray-500"
);

const FarmInputModal: React.FC<FarmInputModalProps> = ({ isOpen, onClose, isDarkMode }) => {
    if (!isOpen) return null;
    const inputClasses = getInputClasses(isDarkMode);

    return (
        <div 
            // UPDATED: Added bg-black/90 and backdrop-blur-sm
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className={clsx(
                    "rounded-[16px] p-8 w-full max-w-md shadow-2xl font-['Poppins:Regular',sans-serif] transition-colors duration-300",
                    isDarkMode ? "bg-[#3a3a3a] text-white" : "bg-white text-black"
                )}
                onClick={(e) => e.stopPropagation()} 
            >
                <h3 className="text-xl font-['Poppins:SemiBold',sans-serif] mb-6 text-center">Add Farm Input</h3>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-[12px] mb-1 font-medium">Farm input type</label>
                        <select className={inputClasses}>
                            <option value="">Select Type</option>
                            <option value="fertilizer">Fertilizer</option>
                            <option value="seeds">Seeds</option>
                            <option value="pesticide">Pesticide</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[12px] mb-1 font-medium">Volume</label>
                        <select className={inputClasses}>
                            <option value="">Select Unit</option>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="l">Liters (L)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[12px] mb-1 font-medium">Volume Amount</label>
                        <select className={inputClasses}>
                            <option value="">Select Amount</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[12px] mb-1 font-medium">Brand</label>
                        <select className={inputClasses}>
                            <option value="">Select Brand</option>
                            <option value="brand1">Brand A</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[12px] mb-1 font-medium">Quantity</label>
                        <input 
                            type="number" 
                            placeholder="Enter quantity" 
                            className={inputClasses} 
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-8">
                    <button 
                        onClick={onClose} 
                        className={clsx(
                            "px-6 py-2 rounded-[8px] font-['Poppins:Medium',sans-serif]", 
                            isDarkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        )}
                    >
                        Cancel
                    </button>
                    
                    <button 
                    onClick={onClose} 
                        className="px-6 py-2 rounded-[8px] font-['Poppins:Medium',sans-serif] transition-opacity hover:opacity-90 shadow-md"
                        style={{
                            backgroundColor: "#3f5e2d",
                            color: "#ffffff"
                        }}
                    >
                        Save
                    </button> 
                </div>
            </div>
        </div>
    );
};

export default FarmInputModal;