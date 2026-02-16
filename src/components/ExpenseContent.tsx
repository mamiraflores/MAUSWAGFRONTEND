// ExpenseContent.tsx

import clsx from "clsx";
import { useState } from "react";
import { useEffect } from "react";

// --- START: SHARED UTILITY CLASSES & COMPONENTS ---
const TableCellButtonBaseClasses = `h-[36px] px-4 py-1 rounded-[8px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.1)] font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300 w-fit whitespace-nowrap cursor-pointer`;

// Define the styles for the content and cards
const SummaryCardClasses = (isDarkMode: boolean) =>
  clsx(
    "border rounded-[12px] p-5 w-[280px] transition-all duration-300 shadow-md flex-shrink-0",
    "transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer",
    isDarkMode ? "bg-[#3a3a3a]" : "bg-white",
  );

const ActionButtonClasses = clsx(
  "bg-[#77b254] hover:bg-[#6a9f4b] text-white px-6",
  "h-[46px] rounded-[10px] font-['Poppins:Medium',sans-serif] text-[14px] transition-colors cursor-pointer",
);

// Helper classes for form inputs to handle dark mode
const FormInputClasses = (isDarkMode: boolean) =>
  clsx(
    "w-full h-[40px] px-4 rounded-[8px] border text-[14px] transition-colors duration-300",
    isDarkMode
      ? "bg-[#3a3a3a] border-[#555] text-white placeholder:text-gray-400"
      : "bg-[#e8e8e8] border-[#d0d0d0] text-black placeholder:text-gray-500",
  );

const ModalContainerClasses = (isDarkMode: boolean) =>
  clsx(
    "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm  bg-opacity-30",
    "transition-opacity duration-300",
  );

const ModalContentClasses = (isDarkMode: boolean) =>
  clsx(
    "w-full md:w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl transition-all duration-300 border",

    "bg-white text-black border-[#d0d0d0]",
  );

const CloseButtonClasses = (isDarkMode: boolean) =>
  clsx(
    "text-2xl p-2 leading-none rounded-full cursor-pointer",
    "hover:bg-gray-200 text-black",
  );

// --- END: SHARED UTILITY CLASSES & COMPONENTS ---

// --- START: MODAL COMPONENTS (Kept the same logic as previous fix) ---

// Mock submit handler to prevent page reload
const handleFormSubmit = (
  e: React.FormEvent,
  onClose: () => void,
) => {
  e.preventDefault();
  console.log("Form submitted. Sending data to API...");
  onClose();
};


const FarmExpenseModal = ({
  isOpen,
  onClose,
  isDarkMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className={ModalContainerClasses(isDarkMode)}>
      <div className={ModalContentClasses(isDarkMode)}>
        {/* ===== Modal Header ===== */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="text-xl font-semibold">Add New Farm Expense</h3>
          <button
            onClick={onClose}
            className={CloseButtonClasses(isDarkMode)}
          >
            &times;
          </button>
        </div>

        {/* ===== Form ===== */}
        <form
          className="space-y-5"
          onSubmit={(e) => handleFormSubmit(e, onClose)}
        >
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" required className={FormInputClasses(isDarkMode)} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select required className={FormInputClasses(isDarkMode)}>
                <option value="">Select Category</option>
                <option>Seeds</option>
                <option>Fertilizer</option>
                <option>Chemical</option>
                <option>Tool Maintenance</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                placeholder="e.g., Hybrid Tomato Seeds"
                required
                className={FormInputClasses(isDarkMode)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                type="text"
                placeholder="e.g., FarmBest"
                className={FormInputClasses(isDarkMode)}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Items</label>
              <input
                type="number"
                min="1"
                required
                placeholder="e.g., 50"
                className={FormInputClasses(isDarkMode)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price / piece (₱)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="e.g., 25.00"
                className={FormInputClasses(isDarkMode)}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount (₱)</label>
              <input
                type="number"
                readOnly
                placeholder="Calculated Total"
                className={FormInputClasses(isDarkMode)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Payment Method
              </label>
              <select required className={FormInputClasses(isDarkMode)}>
                <option value="">Select Method</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Credit</option>
              </select>
            </div>
          </div>

          {/* ===== Buttons ===== */}
          <div className="flex justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition"
            >
              Cancel
            </button>
            <button type="submit" className={ActionButtonClasses}   style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}>
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Corrected LaborExpenseModal with alignment fix

const LaborExpenseModal = ({
  isOpen,
  onClose,
  isDarkMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className={ModalContainerClasses(isDarkMode)}>
      <div className={ModalContentClasses(isDarkMode)}>
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="text-2xl font-['Poppins:SemiBold',sans-serif]">
            Add New Labor Expense
          </h3>
          <button
            onClick={onClose}
            className={CloseButtonClasses(isDarkMode)}
          >
            &times;
          </button>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => handleFormSubmit(e, onClose)}
        >
          {/* Row 1: Date and Worker Name (Correct) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                required
                className={FormInputClasses(isDarkMode)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Worker Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter worker name"
                className={FormInputClasses(isDarkMode)}
              />
            </div>
          </div>
          {/* Row 2: Task and Type (Correct) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Task
              </label>
              <input
                type="text"
                placeholder="e.g., Harvesting, Weeding"
                required
                className={FormInputClasses(isDarkMode)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Type
              </label>
              <select
                required
                className={FormInputClasses(isDarkMode)}
              >
                <option value="">Select Type</option>
                <option>Regular</option>
                <option>Overtime</option>
                <option>Undertime</option>
              </select>
            </div>
          </div>
          {/* Row 3: Hours Worked and Rate/Hour (Correct) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Hours Worked
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                placeholder="e.g., 8"
                required
                className={FormInputClasses(isDarkMode)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Rate/Hour (₱)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g., 150.00"
                required
                className={FormInputClasses(isDarkMode)}
              />
            </div>
          </div>
          {/* Row 4: Total Amount (FIXED to span full width by removing the empty flex-1 div) */}
          {/* It's now a single full-width field */}
          <div className="flex-1"> 
            <label className="block text-sm font-medium mb-1">
              Total Amount (₱)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Calculated Total"
              readOnly
              className={FormInputClasses(isDarkMode)}
            />
          </div>
          
          <div className="flex justify-end pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={ActionButtonClasses}
                style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
            >
              Save Labor Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditExpenseModal = ({
  isOpen,
  onClose,
  isDarkMode,
  expenseData,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  expenseData: any;
}) => {
  if (!isOpen || !expenseData) return null;

  const isFarmExpense = expenseData.type === "farm";
  const title = isFarmExpense
    ? `Edit Farm Expense: ${expenseData.description || "N/A"}`
    : `Edit Labor Expense: ${expenseData.worker || "N/A"}`;

  return (
    <div className={ModalContainerClasses(isDarkMode)}>
      <div className={ModalContentClasses(isDarkMode)}>
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="text-2xl font-['Poppins:SemiBold',sans-serif]">{title}</h3>
          <button onClick={onClose} className={CloseButtonClasses(isDarkMode)}>
            &times;
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, onClose)}>
          {/* Common Fields */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                required
                className={FormInputClasses(isDarkMode)}
                defaultValue={expenseData.date || ""}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Amount (₱)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                className={FormInputClasses(isDarkMode)}
                defaultValue={expenseData.amount || expenseData.total || 0}
              />
            </div>
          </div>

          {isFarmExpense ? (
            <>
              {/* Farm Expense Fields */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.category}
                  >
                    <option value="">Select Category</option>
                    <option>Seeds</option>
                    <option>Fertilizer</option>
                    <option>Chemical</option>
                    <option>Tool Maintenance</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="e.g., Hybrid Tomato Seeds"
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.description}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g., FarmBest"
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.brand}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Number of Items</label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    placeholder="e.g., 50"
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.items}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Price/piece (₱)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 25.00"
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.price}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <select
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.payment}
                  >
                    <option value="">Select Method</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>Credit</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Labor Expense Fields */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Worker Name</label>
                  <select
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.worker}
                  >
                    <option value="">Select Worker</option>
                    <option>Juan Dela Cruz</option>
                    <option>Ana Reyes</option>
                    <option>Pedro Garcia</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Task</label>
                  <input
                    type="text"
                    placeholder="e.g., Harvesting, Weeding"
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.task}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Hours Worked</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="e.g., 8"
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.hours}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Rate/Hour (₱)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 150.00"
                    required
                    className={FormInputClasses(isDarkMode)}
                    defaultValue={expenseData.rate}
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  required
                  className={FormInputClasses(isDarkMode)}
                  defaultValue={expenseData.type}
                >
                  <option value="">Select Type</option>
                  <option>Regular</option>
                  <option>Overtime</option>
                  <option>Undertime</option>
                </select>
              </div>
            </>
          )}

          {/* Remarks Field (Common) */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              rows={3}
              className={clsx(FormInputClasses(isDarkMode), "h-auto resize-none")}
              defaultValue={expenseData.remarks || ""}
              placeholder="Add or update remarks here..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 border-t mt-4 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className={ActionButtonClasses}  style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RemarksModal = ({
  isOpen,
  onClose,
  isDarkMode,
  remarksData,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  remarksData: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className={ModalContainerClasses(isDarkMode)}>
      <div className={ModalContentClasses(isDarkMode)}>
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="text-2xl font-['Poppins:SemiBold',sans-serif]">
            Remarks for {remarksData?.item || "Expense"}
          </h3>
          <button onClick={onClose} className={CloseButtonClasses(isDarkMode)}>
            &times;
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, onClose)}>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Current Remarks</label>
            <textarea
              rows={4}
              className={clsx(FormInputClasses(isDarkMode), "h-auto resize-none")}
              defaultValue={remarksData?.remarks || "No current remarks."}
              placeholder="Add or update remarks here..."
            />
          </div>

          <div className="flex justify-end pt-4 border-t mt-4 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
            <button type="submit" className={ActionButtonClasses}  style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
>
              Save Remarks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- END: MODAL COMPONENTS ---

type ExpenseContentProps = {
  isDarkMode?: boolean;
};

export default function ExpenseContent({
  isDarkMode = false,
}: ExpenseContentProps) {
  const [farmStartDate, setFarmStartDate] = useState("");
  const [farmEndDate, setFarmEndDate] = useState("");
  const [laborStartDate, setLaborStartDate] = useState("");
  const [laborEndDate, setLaborEndDate] = useState("");
  const [totalStartDate, setTotalStartDate] = useState("");
  const [totalEndDate, setTotalEndDate] = useState(""); // State for the expense modals

  const [isFarmModalOpen, setIsFarmModalOpen] = useState(false);
  const [isLaborModalOpen, setIsLaborModalOpen] =
    useState(false); // State for Edit Modal

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null); // State for Remarks Modal

  const [isRemarksModalOpen, setIsRemarksModalOpen] =
    useState(false);
  const [remarksData, setRemarksData] = useState<any>(null); // Handlers

  const handleEditClick = (
    data: any,
    type: "farm" | "labor",
  ) => {
    // Prepare the data structure to include the type for the modal
    setEditData({ ...data, type });
    setIsEditModalOpen(true);
  };

  const handleRemarksClick = (data: any, item: string) => {
    setRemarksData({ ...data, item });
    setIsRemarksModalOpen(true);
  }; // Mock data structures

  const mockFarmExpenses = [
    {
      id: 1,
      date: "2024-03-15",
      category: "Seeds",
      description: "Tomato seeds",
      items: 50,
      price: 25,
      brand: "FarmBest",
      amount: 1250,
      payment: "Cash",
      remarks: "Received late, planted immediately.",
    },
    {
      id: 2,
      date: "2024-03-12",
      category: "Fertilizer",
      description: "Organic fertilizer",
      items: 850,
      price: 10,
      brand: "GreenGrow",
      amount: 8500,
      payment: "Bank Transfer",
      remarks: "Large order for main plot.",
    },
    {
      id: 3,
      date: "2024-03-10",
      category: "Chemical",
      description: "Stemichal",
      items: 1,
      price: 3200,
      brand: "AquaTech",
      amount: 3200,
      payment: "Cash",
      remarks: "Used for pest control.",
    },
  ];

  const mockLaborExpenses = [
    {
      id: 1,
      date: "2024-03-15",
      worker: "Juan Dela Cruz",
      task: "Planting",
      hours: 8,
      rate: 150,
      total: 1200,
      type: "Regular",
      remarks: "Efficiently planted the tomato seedlings.",
    },
    {
      id: 2,
      date: "2024-03-14",
      worker: "Maria Santos",
      task: "Harvesting",
      hours: 10,
      rate: 150,
      total: 1500,
      type: "Overtime",
      remarks: "Completed 2 sacks of harvest.",
    },
  ]; // --- End Mock Data ---
  // START: NEW TOTAL CALCULATION LOGIC
  const totalFarmExpense = mockFarmExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const totalLaborExpense = mockLaborExpenses.reduce(
    (sum, expense) => sum + expense.total,
    0,
  );
  // END: NEW TOTAL CALCULATION LOGIC

  const dateInputClasses = (hasValue: boolean) =>
    clsx(
      "w-[180px] h-[40px] px-4 rounded-[8px] border font-['Poppins',sans-serif] text-[14px] transition-colors duration-300",
      isDarkMode
        ? "bg-[#3a3a3a] border-[#555] text-white placeholder:text-gray-400"
        : "bg-[#e8e8e8] border-[#d0d0d0] text-black placeholder:text-gray-500",
    );

  const controlInputClasses = clsx(
    "flex-1 h-[50px] px-4 rounded-[8px] border font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
    isDarkMode
      ? "bg-[#3a3a3a] border-[#555] text-white placeholder:text-gray-400"
      : "bg-[#e8e8e8] border-[#d0d0d0] text-gray-700 placeholder:text-gray-500",
  );

  const selectClasses = clsx(
    "h-[50px] px-4 rounded-[8px] border font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
    isDarkMode
      ? "bg-[#3a3a3a] border-[#555] text-white"
      : "bg-[#e8e8e8] border-[#d0d0d0] text-gray-700",
  );

  const tableHeaderClasses = clsx(
  "text-left py-3 px-4 font-['Poppins:SemiBold',sans-serif] text-[14px] transition-colors duration-300 text-white",
  "bg-[#6a9f4b]" // This matches your "Edit" button and Dashboard green
);

  // NEW: Table Footer row classes
  const tableFooterClasses = clsx(
    "text-left py-3 px-4 font-['Poppins:Bold',sans-serif] text-[16px] transition-colors duration-300",
    isDarkMode
      ? "bg-[#3a3a3a] text-white border-t border-[#555]"
      : "bg-gray-100 text-black border-t border-gray-200",
  );

  const tableRowClasses = clsx(
    "py-3 px-4 font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
    isDarkMode ? "text-white" : "text-black",
  );

  return (
    <div
      className={clsx(
        "p-8 w-full min-h-screen",
        isDarkMode ? "bg-[#1a1a1a]" : "bg-white",
      )}
    >
   {/* Filter by Date */} 
      <div className="mb-4">
     {" "}
        <p
          className={clsx(
            " font-['Poppins',sans-serif] text-[14px] transition-colors duration-300",
            isDarkMode
              ? "text-white placeholder:text-gray-400"
              : "text-black placeholder:text-gray-500",
          )}
        >
                    Filter Date you want to see your total
          expense        {" "}
        </p>
               {" "}
        <div className="flex">
                   {" "}
          <input
            type="text"
            placeholder="Start Date"
            value={totalStartDate}
            onChange={(e) => setTotalStartDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) =>
              !e.target.value && (e.target.type = "text")
            }
            className={dateInputClasses(!!totalStartDate)}
          />
                   {" "}
          <input
            type="text"
            placeholder="End Date"
            value={totalEndDate}
            onChange={(e) => setTotalEndDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) =>
              !e.target.value && (e.target.type = "text")
            }
            className={dateInputClasses(!!totalEndDate)}
          />
                 {" "}
        </div>
             {" "}
      </div>
   
   {/* --- SUMMARY CARDS SECTION (Three Cards Side by Side) --- */}
<div className="flex flex-wrap gap-6 mb-8 justify-center">
  
  {/* Card 1: Total Expenses */}
  <div className={`${SummaryCardClasses(isDarkMode)} flex-1 min-w-[220px]`}>
    <p
      className={clsx(
        "font-['Poppins:SemiBold',sans-serif] text-[16px] mb-2",
        isDarkMode ? "text-gray-300" : "text-gray-600"
      )}
    >
      Total Expenses
    </p>
    <p
      className={clsx(
        "text-[32px] font-['Poppins:Bold',sans-serif] mb-1",
        isDarkMode ? "text-white" : "text-black"
      )}
    >
      ₱{(totalFarmExpense + totalLaborExpense).toFixed(2)}
    </p>
    <p className="text-[14px] font-['Poppins:Regular',sans-serif] text-green-500">
      vs. Last Month: -5%
    </p>
  </div>

  {/* Card 2: Highest Farm Expense */}
  <div className={`${SummaryCardClasses(isDarkMode)} flex-1 min-w-[220px]`}>
    <p
      className={clsx(
        "font-['Poppins:SemiBold',sans-serif] text-[16px] mb-2",
        isDarkMode ? "text-gray-300" : "text-gray-600"
      )}
    >
      Highest Farm Expense
    </p>
    <p
      className={clsx(
        "text-[32px] font-['Poppins:Bold',sans-serif] mb-1",
        isDarkMode ? "text-white" : "text-black"
      )}
    >
      Fertilizer
    </p>
    <p
      className={clsx(
        "text-[14px] font-['Poppins:Regular',sans-serif]",
        isDarkMode ? "text-gray-400" : "text-gray-700"
      )}
    >
      ₱ 8,500.00
    </p>
  </div>

  {/* Card 3: Highest Labor Expense */}
  <div className={`${SummaryCardClasses(isDarkMode)} flex-1 min-w-[220px]`}>
    <p
      className={clsx(
        "font-['Poppins:SemiBold',sans-serif] text-[16px] mb-2",
        isDarkMode ? "text-gray-300" : "text-gray-600"
      )}
    >
      Highest Labor Expense
    </p>
    <p
      className={clsx(
        "text-[32px] font-['Poppins:Bold',sans-serif] mb-1",
        isDarkMode ? "text-white" : "text-black"
      )}
    >
      Harvesting
    </p>
    <p
      className={clsx(
        "text-[14px] font-['Poppins:Regular',sans-serif]",
        isDarkMode ? "text-gray-400" : "text-gray-700"
      )}
    >
      ₱ 1,500.00
    </p>
  </div>

</div>
{/* --- END: SUMMARY CARDS SECTION --- */}


     {/* ===== FARM EXPENSE SECTION ===== */}
<div
  className={clsx(
    "rounded-[16px] p-6 shadow-lg transition-colors duration-300 w-full mb-8",
    isDarkMode ? "bg-[#2d2d2d]" : "bg-white"
  )}
>
  <h2
    className={clsx(
      "text-[24px] font-['Poppins:SemiBold',sans-serif] mb-4 transition-colors duration-300",
      isDarkMode ? "text-white" : "text-black"
    )}
  >
    Farm Expense
  </h2>

 <div className="flex flex-wrap gap-5">
  <input
    type="text"
    placeholder="Start Date"
    value={farmStartDate}
    onChange={(e) => setFarmStartDate(e.target.value)}
    onFocus={(e) => (e.target.type = "date")}
    onBlur={(e) => !e.target.value && (e.target.type = "text")}
    /* REMOVED flex-1, KEPT min-w OR USE w-[150px] */
    className={`${dateInputClasses(!!farmStartDate)} w-[150px]`}
  />
  <input
    type="text"
    placeholder="End Date"
    value={farmEndDate}
    onChange={(e) => setFarmEndDate(e.target.value)}
    onFocus={(e) => (e.target.type = "date")}
    onBlur={(e) => !e.target.value && (e.target.type = "text")}
    /* REMOVED flex-1, KEPT min-w OR USE w-[150px] */
    className={`${dateInputClasses(!!farmEndDate)} w-[150px]`}
  />
</div>


{/* Controls Row */}
<div className="flex flex-wrap items-center gap-4 mb-6 mt-4"> {/* Added mt-4 for top margin */}
    <input
      type="text"
      placeholder="Search farm expenses..."
      className={`${controlInputClasses} w-[300px] mt-2`} 
    />
    
    <select 
      /* Changed flex-1 to a fixed width */
      className={`${selectClasses} w-[200px] mt-2`}
    >
      <option>Filter by Category</option>
      <option>Seeds</option>
      <option>Fertilizer</option>
      <option>Chemical</option>
      <option>Tool Maintenance</option>
    </select>

    <button
      className={`${ActionButtonClasses} mt-2`}
      onClick={() => setIsFarmModalOpen(true)}
      style={{
        backgroundColor: isDarkMode ? "#6a9f4b" : "#3f5e2d",
      }}
    >
      Add Farm Expense
    </button>
</div>

  {/* Farm Expenses Table */}
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className={tableHeaderClasses}>Date</th>
          <th className={tableHeaderClasses}>Category</th>
          <th className={tableHeaderClasses}>Description</th>
          <th className={tableHeaderClasses}>Items</th>
          <th className={tableHeaderClasses}>Price/pc</th>
          <th className={tableHeaderClasses}>Brand</th>
          <th className={tableHeaderClasses}>Amount (₱)</th>
          <th className={tableHeaderClasses}>Payment</th>
          <th className={tableHeaderClasses}>Actions</th>
        </tr>
      </thead>
      <tbody className={clsx(isDarkMode ? "divide-[#555]" : "divide-gray-200", "divide-y")}>
        {mockFarmExpenses.map((expense) => (
          <tr key={expense.id}>
            <td className={tableRowClasses}>{expense.date}</td>
            <td className={tableRowClasses}>{expense.category}</td>
            <td className={tableRowClasses}>{expense.description}</td>
            <td className={tableRowClasses}>{expense.items}</td>
            <td className={tableRowClasses}>₱{expense.price.toFixed(2)}</td>
            <td className={tableRowClasses}>{expense.brand}</td>
            <td className={clsx(tableRowClasses, "font-['Poppins:SemiBold',sans-serif]")}>
              ₱{expense.amount.toFixed(2)}
            </td>
            <td className={tableRowClasses}>{expense.payment}</td>
            <td className={clsx(tableRowClasses, "space-x-2")}>
                <button
                           className={clsx(
                             TableCellButtonBaseClasses,
                             "text-white",
                           )}
                             style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                           onClick={() => handleEditClick(expense, "farm")}
                         >
                           Edit
                         </button>
              <button
                              className={clsx(
                                TableCellButtonBaseClasses,
                              )}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#555"
                                  : "#b8d4a8",
                              }}
                              onClick={() => handleRemarksClick(expense, expense.description)}
                            >
                              Remarks
                            </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7} className={clsx(tableFooterClasses, "text-right")}>
            Total Farm Expenses:
          </td>
          <td className={clsx(tableFooterClasses, "font-['Poppins:Bold',sans-serif]")}>
            ₱{totalFarmExpense.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

{/* ===== LABOR EXPENSE SECTION ===== */}
<div
  className={clsx(
    "rounded-[16px] p-6 shadow-lg transition-colors duration-300 w-full",
    isDarkMode ? "bg-[#2d2d2d]" : "bg-white"
  )}
>
  <h2
    className={clsx(
      "text-[24px] font-['Poppins:SemiBold',sans-serif] mb-4 transition-colors duration-300",
      isDarkMode ? "text-white" : "text-black"
    )}
  >
    Labor Expense
  </h2>

  {/* Filter by Date */}
<div className="mb-4">
  <p
    className={clsx(
      "text-[14px] font-['Poppins:Regular',sans-serif] mb-3 transition-colors duration-300",
      isDarkMode ? "text-gray-300" : "text-gray-600"
    )}
  >
    Filter by Date
  </p>
  <div className="flex flex-wrap gap-4">
    <input
      type="text"
      placeholder="Start Date"
      value={laborStartDate}
      onChange={(e) => setLaborStartDate(e.target.value)}
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => !e.target.value && (e.target.type = "text")}
      /* Removed flex-1 and min-w, set a fixed short width */
      className={`${dateInputClasses(!!laborStartDate)} w-[150px]`}
    />
    <input
      type="text"
      placeholder="End Date"
      value={laborEndDate}
      onChange={(e) => setLaborEndDate(e.target.value)}
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => !e.target.value && (e.target.type = "text")}
      /* Removed flex-1 and min-w, set a fixed short width */
      className={`${dateInputClasses(!!laborEndDate)} w-[150px]`}
    />
  </div>
</div>

{/* Controls Row */}
<div className="flex flex-wrap items-center gap-4 mb-6 mt-6"> {/* Added items-center and mt-6 */}
  <input
    type="text"
    placeholder="Search labor expenses..."
    /* Fixed width for the search bar to keep it short */
    className={`${controlInputClasses} w-[250px]`}
  />
  <select 
    /* Fixed width for the dropdown */
    className={`${selectClasses} w-[200px]`}
  >
    <option>Filter by Worker</option>
    <option>Juan Dela Cruz</option>
    <option>Ana Reyes</option>
    <option>Pedro Garcia</option>
  </select>
  <button
    className={ActionButtonClasses}
    onClick={() => setIsLaborModalOpen(true)}
    style={{
      backgroundColor: isDarkMode ? "#6a9f4b" : "#3f5e2d", // Removed extra 'ff'
    }}
  >
    Add Labor Expense
  </button>
</div>

  {/* Labor Expenses Table */}
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className={tableHeaderClasses}>Date</th>
          <th className={tableHeaderClasses}>Worker Name</th>
          <th className={tableHeaderClasses}>Task</th>
          <th className={tableHeaderClasses}>Hours</th>
          <th className={tableHeaderClasses}>Rate/Hr</th>
          <th className={tableHeaderClasses}>Type</th>
          <th className={tableHeaderClasses}>Total (₱)</th>
          <th className={tableHeaderClasses}>Actions</th>
        </tr>
      </thead>
      <tbody className={clsx(isDarkMode ? "divide-[#555]" : "divide-gray-200", "divide-y")}>
        {mockLaborExpenses.map((expense) => (
          <tr key={expense.id}>
            <td className={tableRowClasses}>{expense.date}</td>
            <td className={tableRowClasses}>{expense.worker}</td>
            <td className={tableRowClasses}>{expense.task}</td>
            <td className={tableRowClasses}>{expense.hours}</td>
            <td className={tableRowClasses}>₱{expense.rate.toFixed(2)}</td>
            <td className={tableRowClasses}>{expense.type}</td>
            <td className={clsx(tableRowClasses, "font-['Poppins:SemiBold',sans-serif]")}>
              ₱{expense.total.toFixed(2)}
            </td>
            <td className={clsx(tableRowClasses, "space-x-2")}>
              <button
                           className={clsx(
                             TableCellButtonBaseClasses,
                             "text-white",
                           )}
                           style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                           onClick={() => handleEditClick(expense, "labor")}
                         >
                           Edit
                         </button>
                 <button
                              className={clsx(
                                TableCellButtonBaseClasses,
                              )}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#555"
                                  : "#b8d4a8",
                              }}
                              onClick={() => handleRemarksClick(expense, expense.description)}
                            >
                              Remarks
                            </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7} className={clsx(tableFooterClasses, "text-right")}>
            Total Labor Expenses:
          </td>
          <td className={clsx(tableFooterClasses, "font-['Poppins:Bold',sans-serif]")}>
            ₱{totalLaborExpense.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

            {/* Modals */}     {" "}
      <FarmExpenseModal
        isOpen={isFarmModalOpen}
        onClose={() => setIsFarmModalOpen(false)}
        isDarkMode={isDarkMode}
      />
           {" "}
      <LaborExpenseModal
        isOpen={isLaborModalOpen}
        onClose={() => setIsLaborModalOpen(false)}
        isDarkMode={isDarkMode}
      />
           {" "}
      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        isDarkMode={isDarkMode}
        expenseData={editData}
      />
           {" "}
      <RemarksModal
        isOpen={isRemarksModalOpen}
        onClose={() => setIsRemarksModalOpen(false)}
        isDarkMode={isDarkMode}
        remarksData={remarksData}
      />
         {" "}
    </div>
  );
}