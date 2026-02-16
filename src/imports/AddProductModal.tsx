import clsx from "clsx";
import React from "react";

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCropType: (type: 'Processed' | 'Raw') => void;
  isDarkMode?: boolean;
};

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSelectCropType,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  const handleButtonClick = (type: 'Processed' | 'Raw') => {
    if (typeof onSelectCropType === 'function') {
      onSelectCropType(type);
    } else {
      console.error("AddProductModal Error: 'onSelectCropType' prop is missing.");
    }
  };

  const modalClasses = clsx(
    "relative w-full max-w-sm p-8 rounded-[16px] shadow-2xl transition-all duration-300 transform",
    isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
  );

  const buttonClasses = (isPrimary: boolean) => clsx(
    "w-full py-3 rounded-[8px] font-['Poppins:SemiBold',sans-serif] transition duration-200 shadow-md",
    isPrimary
      ? "bg-[#77B254] text-white hover:bg-[#65A30D]"
      : "bg-gray-300 text-gray-800 hover:bg-gray-400",
      
  );

  return (
    /* BACKGROUND FIX: 
       Changed 'bg-black/90' (solid) to 'bg-black/40' (transparent).
       Added 'backdrop-blur-sm' to show the dashboard behind the modal.
    */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className={modalClasses}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={clsx(
            "text-xl font-['Poppins:SemiBold',sans-serif] mb-6 text-center",
            isDarkMode ? "text-white" : "text-gray-900",
          )}
        >
          Select Product Type
        </h2>

        <div className="space-y-4">
          <button
            type="button"
            className={buttonClasses(true)}
            onClick={() => handleButtonClick('Processed')}
            style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
          >
            Processed Crops
          </button>

          <button
            type="button"
            className={buttonClasses(false)}
            onClick={() => handleButtonClick('Raw')}
            
          >
            Raw Crops
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;