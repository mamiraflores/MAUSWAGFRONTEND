import React, { useState } from 'react';
import clsx from 'clsx';

interface AddCropModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
}

const AddCropModal: React.FC<AddCropModalProps> = ({ isOpen, onClose, isDarkMode }) => {
    // State to track which field has an active error for the tooltip
    const [errorField, setErrorField] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    // ISO/Ratio compliant input classes
    const getInputClasses = (field: string) => clsx(
        "w-full p-3 rounded-md border font-['Poppins:Regular',sans-serif] text-[14px] outline-none transition-all duration-200",
        isDarkMode 
            ? "bg-[#2d2d2d] border-[#555] text-white placeholder:text-gray-400" 
            : "bg-white border-[#d0d0d0] text-gray-700 placeholder:text-gray-500",
        // Highlights the specific field when an error is present
        errorField === field ? "border-red-500 ring-1 ring-red-500" : "focus:ring-[#77b254] focus:border-[#77b254]"
    );

    const handleSave = () => {
        // Example validation trigger that displays the indicator
        setErrorField('crop'); 
        setIsSaving(true);
        // Simulate a save delay
        setTimeout(() => setIsSaving(false), 2000);
    };

    // Reusable Tooltip Indicator Component
    const ErrorTooltip = ({ message }: { message: string }) => (
        <div className="absolute -top-12 left-0 z-[60] animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="relative bg-white border border-gray-300 px-3 py-2 rounded shadow-lg flex items-center gap-2">
                {/* Orange warning icon block */}
                <div className="bg-orange-500 text-white w-5 h-5 flex items-center justify-center rounded-sm font-bold text-xs italic">!</div>
                <span className="text-[13px] text-gray-800 whitespace-nowrap font-sans">{message}</span>
                {/* Tooltip Tail aligned with field start */}
                <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white border-r border-b border-gray-300 rotate-45"></div>
            </div>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={(e) => e.target === e.currentTarget && onClose()} 
        >
            <div 
                className={clsx(
                    "relative rounded-[16px] p-8 w-full max-w-lg shadow-2xl transition-colors duration-300",
                    isDarkMode ? "bg-[#3a3a3a] text-white" : "bg-white text-black"
                )}
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-['Poppins:SemiBold',sans-serif]">Add New Crop Planner</h2>
                    <button 
                        onClick={onClose} 
                        className={clsx("text-3xl leading-none", isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-700 hover:text-black")}
                    >
                        &times;
                    </button>
                </div>
                
                <div className="space-y-4">
                    {/* ADD PHOTO - ISO 1:1 Aspect Ratio Alignment */}
                    <div className={clsx(
                        "relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors",
                        isDarkMode ? "bg-[#2d2d2d] border-[#555]" : "bg-gray-50 border-[#d0d0d0]",
                        "hover:border-[#b8d4a8]" 
                    )}>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="#b8d4a8" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-[10px] text-gray-400 text-center font-['Poppins:Medium']">Add Photo</p>
                    </div>

                    {/* Crop Selection with active error indicator logic */}
                    <div className="relative">
                        {errorField === 'crop' && <ErrorTooltip message="Please select an item in the list." />}
                        <select 
                            className={getInputClasses('crop')} 
                            onFocus={() => setErrorField(null)}
                        >
                            <option value="">Choose a Crop...</option>
                        </select>
                    </div>

                    <input type="date" className={getInputClasses('date')}/>
                    <select className={getInputClasses('category')}><option value="">Category...</option></select>
                    <input type="text" placeholder="Variant of the Crop..." className={getInputClasses('variant')}/>
                    <input type="number" placeholder="Quantity Planted..." className={getInputClasses('quantity')}/>
                    
                    <div className="flex gap-2">
                        <select className={clsx(getInputClasses('area'), "flex-1")}><option value="">Select Area...</option></select>
                        <span className={clsx(
                            "p-3 rounded-md font-['Poppins:Medium',sans-serif] text-[14px] flex items-center", 
                            isDarkMode ? "bg-[#2d2d2d] border border-[#555] text-white" : "bg-gray-100 text-gray-700"
                        )}>
                            sq m
                        </span>
                    </div>
                </div>

                {/* Footer Buttons with ISO-Aligned Gap */}
                <div className="flex justify-end items-center gap-3 mt-8">
                    <button 
                        onClick={onClose} 
                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                           style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                        className="bg-[#77b254] hover:bg-[#6a9f4b] text-white px-6 py-2 rounded-[8px] font-['Poppins:Medium',sans-serif] shadow-md transition-all active:scale-95 disabled:opacity-70"
                    >
                        {isSaving ? "Saving..." : "Save Crop"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCropModal;