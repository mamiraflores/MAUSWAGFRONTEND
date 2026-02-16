import { useState } from "react";
import clsx from "clsx";

// Define the exact colors used for consistency
const PRIMARY_GREEN = "#77b254";

// --- Styles Helper Functions ---

// Card Classes customized to match the large format of Expense Summary Cards
const SalesSummaryCardClasses = (isDarkMode: boolean) =>
    clsx(
      "border rounded-[12px] p-5 w-[280px] transition-all duration-300 shadow-md flex-shrink-0",
      "transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer",
      isDarkMode ? "bg-[#3a3a3a]" : "bg-white",
    );

// Table Header Row Classes
// cleaner and more "Tailwind-like"
const TableHeaderClasses = `bg-[${PRIMARY_GREEN}] grid grid-cols-8 gap-2 px-6 py-4 rounded-t-[10px]`;

// Primary Action Button Class
const PrimaryActionButtonClasses = `h-[46px] px-6 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:opacity-90 font-['Inter:Regular',sans-serif] text-[14px] text-center text-white cursor-pointer`;

// Table Cell Button Class
const TableCellButtonBaseClasses = `h-[36px] px-4 py-1 rounded-[8px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.1)] font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300 w-fit whitespace-nowrap cursor-pointer`;


// Secondary Cancel Button Class
const SecondaryCancelButtonClasses =
  "h-[46px] px-6 rounded-[10px] transition-colors duration-300 font-['Inter:Regular',sans-serif] text-[14px] text-center text-black bg-white border border-gray-300 hover:bg-gray-100 cursor-pointer";

// --- Types ---
interface Client {
  id: number;
  name: string;
  address: string;
  contact: string;
  dateAdded: string;
  totalSales: string;
  paymentStatus: string;
}

interface Sale {
  id: number;
  product: string;
  quantity: number;
  price: string;
  date: string;
  time: string;
  client_id: number;
  clientName: string;
  paymentMode: string;
  remarks?: string;
}

type SalesContentProps = {
  isDarkMode?: boolean;
};

// --- Mock Data ---
const mockClientDetails: Client[] = [
  {
    id: 101,
    name: "Juan Dela Cruz",
    address: "Taga dyan lang sa kanto",
    contact: "0917-555-1234",
    dateAdded: "2023-10-01",
    totalSales: "₱300.00",
    paymentStatus: "Paid",
  },
  {
    id: 102,
    name: "Ana Reyes",
    address: "24-B Rizal Street, East Blue",
    contact: "0917-888-5678",
    dateAdded: "2023-11-10",
    totalSales: "₱500.00",
    paymentStatus: "Pending",
  },
  {
    id: 103,
    name: "Pedro Garcia",
    address: "Barangay 3, Konoha C",
    contact: "0917-222-9012",
    dateAdded: "2023-09-20",
    totalSales: "₱200.00",
    paymentStatus: "Half",
  },
];

const mockSalesData: Sale[] = [
  {
    id: 1,
    product: "Squash",
    quantity: 10,
    price: "₱125.00",
    date: "2025-09-07",
    time: "10:39 AM",
    client_id: 101,
    clientName: "Juan Dela Cruz",
    paymentMode: "Gcash",
    remarks: "Paid by Gcash. Delivered 9:30 AM.",
  },
  {
    id: 2,
    product: "Carrot",
    quantity: 30,
    price: "₱90.00",
    date: "2023-11-16",
    time: "10:15 AM",
    client_id: 102,
    clientName: "Ana Reyes",
    paymentMode: "Cash",
    remarks: "Client requested next-day delivery.",
  },
  {
    id: 3,
    product: "Eggplant",
    quantity: 2,
    price: "₱80.00",
    date: "2023-11-17",
    time: "11:00 AM",
    client_id: 103,
    clientName: "Pedro Garcia",
    paymentMode: "Bank Transfer",
    remarks: "Bayad sa katapusan na",
  },
];

const mockSummaryData = [
  {
    title: "Total Profit",
    value: "₱6,475.00",
    detail: "vs. Last Month: +12%",
    type: "sales",
  },
  {
    title: "Total Orders",
    value: "17",
    detail: "",
    type: "orders",
  },
  {
    title: "Most Sold Product",
    value: "Eggplant",
    detail: "10 sack(₱1000)",
    type: "product",
  },
];

// --- Component ---

export default function SalesContent({
  isDarkMode = false,
}: SalesContentProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(
    null,
  );

  const [isClientModalOpen, setIsClientModalOpen] =
    useState(false);
  const [isViewClientModalOpen, setIsViewClientModalOpen] =
    useState(false);
  const [viewingClient, setViewingClient] =
    useState<Client | null>(null);

  const [isRemarksModalOpen, setIsRemarksModalOpen] =
    useState(false);
  const [currentRemarksSaleId, setCurrentRemarksSaleId] =
    useState<number | null>(null);

  const salesData = mockSalesData;

  // --- HANDLERS ---
  const closeSaleModal = () => {
    setIsModalOpen(false);
    setEditingSale(null);
  };

  const handleEditSale = (saleId: number) => {
    const sale = mockSalesData.find((s) => s.id === saleId);
    if (sale) {
      setEditingSale(sale);
      setIsModalOpen(true);
    } else {
      console.error(`Sale with ID ${saleId} not found.`);
    }
  };

  const handleViewClient = (clientId: number) => {
    const client = mockClientDetails.find(
      (c) => c.id === clientId,
    );
    if (client) {
      setViewingClient(client);
      setIsViewClientModalOpen(true);
    } else {
      console.error(`Client with ID ${clientId} not found.`);
    }
  };

  const handleRemarks = (saleId: number) => {
    setCurrentRemarksSaleId(saleId);
    setIsRemarksModalOpen(true);
  };

  const closeRemarksModal = () => {
    setIsRemarksModalOpen(false);
    setCurrentRemarksSaleId(null);
  };

  const handleAddSale = () => {
    setEditingSale(null);
    setIsModalOpen(true);
  };

  // --- STYLING VARS ---
  const textColor = isDarkMode ? "text-white" : "text-black";
  const containerBg = isDarkMode ? "bg-[#2d2d2d]" : "bg-white";
  const inputBgBorder = isDarkMode
    ? "bg-[#3a3a3a] border-[rgba(255,255,255,0.2)]"
    : "bg-[#f0f0f0] border-[rgba(40,40,40,0.2)]";
  const tableBorder = isDarkMode
    ? "border-[#444]"
    : "border-[#d0d0d0]";
  const tableRowHover = isDarkMode
    ? "hover:bg-[#3a3a3a]"
    : "hover:bg-[#f9f9f9]";
  const modalContentBg = isDarkMode
    ? "bg-[#3a3a3a]"
    : "bg-white";
  const modalTextColor = isDarkMode
    ? "text-white"
    : "text-black";
  const modalInputBgBorder = isDarkMode
    ? "bg-[#2d2d2d] border-[rgba(255,255,255,0.2)]"
    : "bg-[#f0f0f0] border-[rgba(40,40,40,0.2)]";

  const modalButtonClass = `h-[46px] px-6 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:opacity-90 font-['Inter:Regular',sans-serif] text-[14px] text-center text-white bg-[${PRIMARY_GREEN}] cursor-pointer`;
  const modalInputClass = `h-[46px] px-4 rounded-[10px] w-full border outline-none font-['Poppins:Regular',sans-serif] text-[14px] ${modalInputBgBorder} ${modalTextColor} placeholder:text-gray-400`;

  const dateInputBaseClasses = `h-[46px] px-4 rounded-[10px] w-[141px] border outline-none font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300 ${inputBgBorder} ${textColor} placeholder:text-gray-400`;

  const SearchIcon = (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      fill="none"
      className="mr-3 flex-shrink-0"
    >
      <path
        d="M23.95 21.05l-4.75-4.75a8.7 8.7 0 002-5.5c0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7 3.9 8.7 8.7 8.7c2 0 3.9-.7 5.5-2l4.75 4.75c.3.3.8.3 1.1 0l.9-.9c.3-.3.3-.8 0-1.1zM11.5 18.5a7 7 0 110-14 7 7 0 010 14z"
        fill={
          isDarkMode
            ? "rgba(255,255,255,0.5)"
            : "rgba(40,40,40,0.5)"
        }
        fillOpacity={isDarkMode ? "1" : "0.5"}
      />
    </svg>
  );

  // --- Helper Component for Summary Cards (FIXED ALIGNMENT + CLICKABLE) ---
  const SalesSummaryCards = () => {
    const getCardValueStyle = (type: string) => {
      const baseStyle = `text-4xl font-['Poppins:Bold',sans-serif] ${textColor} mb-1`;

      if (type === "product") {
        return `text-3xl font-['Poppins:Bold',sans-serif] ${textColor}`;
      }
      return baseStyle;
    };

    // Handler for clicking the product card
    const handleProductCardClick = (productName: string) => {
      console.log(
        `Navigating to detailed view for product: ${productName}`,
      );
    };

    return (
      <div className="flex flex-wrap gap-6 mb-8 justify-center">
        {mockSummaryData.map((card, index) => (
          <div
            key={index}
            className={SalesSummaryCardClasses(isDarkMode)}
            // CONDITIONAL CLICK HANDLER for the product card
            onClick={
              card.type === "product"
                ? () => handleProductCardClick(card.value)
                : undefined
            }
          >
            <div
              className={clsx("flex flex-col h-full", {
                // Left-aligned for sales and orders
                "justify-between items-start":
                  card.type !== "product",
                // Center-aligned for the product card
                "justify-center":
                  card.type === "product",
              })}
            >
              {/* Title (Stays at the top) */}
              <h3
                className={`text-sm font-['Poppins:Medium',sans-serif] ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                {card.title}
              </h3>

              {/* Main Value */}
              <p className={getCardValueStyle(card.type)}>
                {card.value}
              </p>

              {/* Detail/Percentage Text - Left Aligned Cards */}
              {card.type !== "product" && card.detail && (
                <p
                  className={clsx("text-xs mt-auto", {
                    "text-green-600 dark:text-green-400 font-['Poppins:Medium',sans-serif]":
                      card.type === "sales" &&
                      card.detail.includes("+"),
                    "text-gray-500 dark:text-gray-400 font-['Poppins:Regular',sans-serif]":
                      card.type === "orders",
                  })}
                >
                  {card.detail}
                </p>
              )}

              {/* Product detail text displayed separately for centering layout */}
              {card.type === "product" && card.detail && (
                <p
                  className={clsx(
                    "text-xs w-full",
                    "text-gray-500 dark:text-gray-400 font-['Poppins:Regular',sans-serif] w-full",
                  )}
                >
                  {card.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- Helper Component for the combined filter/action bar ---
  const FilterActionBar = ({
    openSaleModal,
    onAddClient,
  }: {
    openSaleModal: () => void;
    onAddClient: () => void;
  }) => (
    <div className="flex flex-wrap items-end gap-5 mb-6 w-full">
      <div className="flex items-end gap-5">
        {/* Date Filters */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) =>
              !e.target.value && (e.target.type = "text")
            }
            className={clsx(dateInputBaseClasses, {
              "text-gray-400": !startDate,
            })}
          />
          <input
            type="text"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) =>
              !e.target.value && (e.target.type = "text")
            }
            className={clsx(dateInputBaseClasses, {
              "text-gray-400": !endDate,
            })}
          />
        </div>

        {/* Search Bar */}
        <div
          className={`border-2 h-[46px] rounded-[10px] w-[300px] flex items-center px-4 transition-colors duration-300 ${inputBgBorder}`}
        >
          {SearchIcon}
          <input
            type="text"
            placeholder="Search sales..."
            className={`bg-transparent border-none outline-none font-['Poppins:Regular',sans-serif] text-[16px] w-full transition-colors duration-300 ${textColor} placeholder:text-[rgba(40,40,40,0.5)] dark:placeholder:text-[rgba(255,255,255,0.5)]`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter Dropdown */}
        <select
          className={`h-[46px] px-4 rounded-[10px] w-[180px] border outline-none font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300 appearance-none cursor-pointer ${inputBgBorder} ${textColor}`}
        >
          <option value="">Filter by Product</option>
          <option value="Tomato">Tomato</option>
          <option value="Carrot">Carrot</option>
          <option value="Eggplant">Eggplant</option>
        </select>
      </div>

      {/* Action Buttons (Right Aligned) */}
      <div className="flex gap-4 ml-auto">
        <button
          className={`${PrimaryActionButtonClasses} bg-[${PRIMARY_GREEN}]`}
          style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
          onClick={openSaleModal}
        >
          <p className="font-normal leading-[18px]">Add Sale</p>
        </button>

        <button
          className={`${PrimaryActionButtonClasses} bg-[${PRIMARY_GREEN}]`}
          style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
          onClick={onAddClient}
        >
          <p className="font-normal leading-[18px]">
            Add Client
          </p>
        </button>
      </div>
    </div>
  );

  // --- VIEW CLIENT MODAL COMPONENT (MODIFIED OVERLAY) ---
  const ViewClientModal = () => {
    if (!isViewClientModalOpen || !viewingClient) return null;

    const client = viewingClient;
    const closeModal = () => {
      setIsViewClientModalOpen(false);
      setViewingClient(null);
    };

    const DetailCard = ({
      title,
      value,
      isStatus = false,
    }: {
      title: string;
      value: string;
      isStatus?: boolean;
    }) => {
      let statusColor = "";
      if (isStatus) {
        if (value.includes("Good"))
          statusColor = "text-[#77b254]";
        else if (value.includes("Credit"))
          statusColor = "text-yellow-500";
        else if (value.includes("Delinquent"))
          statusColor = "text-red-500";
      }

      return (
        <div
          className={`p-4 rounded-[8px] border ${isDarkMode ? "bg-[#252525] border-[#444]" : "bg-gray-50 border-[#d0d0d0]"}`}
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p
            className={`text-lg font-['Poppins:SemiBold',sans-serif] ${modalTextColor} ${statusColor}`}
          >
            {value}
          </p>
        </div>
      );
    };

    return (
      <div
        className="fixed inset-0 z-[1020] bg-black/90 blur-backdrop-sm flex justify-center items-center p-4"
        onClick={closeModal}
      >
        <div
          className={`w-full max-w-lg p-6 rounded-[16px] shadow-2xl ${modalContentBg} ${modalTextColor}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-600">
            <h2
              className={`text-xl font-['Poppins:SemiBold',sans-serif] ${modalTextColor}`}
            >
              Client Details: {client.name}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl leading-none cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <DetailCard
                title="Client ID"
                value={`#${client.id}`}
              />
              <DetailCard
                title="Total Sale"
                value={client.totalSales}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailCard
                title="Payment Status"
                value={client.paymentStatus}
                isStatus={true}
              />
              <DetailCard
                title="Address"
                value={client.address}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailCard
                title="Contact Number"
                value={client.contact}
              />
              <DetailCard
                title="Date Added"
                value={client.dateAdded}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- REMARKS MODAL COMPONENT ---
  const RemarksModal = () => {
    if (!isRemarksModalOpen || currentRemarksSaleId === null)
      return null;

    const sale = mockSalesData.find(
      (s) => s.id === currentRemarksSaleId,
    );
    const initialRemarks = sale?.remarks || "";

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newRemarks = (
        e.currentTarget.elements.namedItem(
          "remarks",
        ) as HTMLTextAreaElement
      ).value;
      console.log(
        `Remarks confirmed for Sale ID ${currentRemarksSaleId}: ${newRemarks}`,
      );
      closeRemarksModal();
    };

    const confirmButtonClass = `h-[46px] px-6 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:opacity-90 font-['Inter:Regular',sans-serif] text-[14px] text-center text-white bg-[${PRIMARY_GREEN}] cursor-pointer`;

    return (
      <div
        className="fixed inset-0 z-[1030] bg-black/90 backdrop-blur-sm flex justify-center items-center p-4"
        onClick={closeRemarksModal}
      >
        <div
          className={`w-full max-w-sm p-6 rounded-[16px] shadow-2xl ${modalContentBg} ${modalTextColor}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            className={`text-xl font-['Poppins:SemiBold',sans-serif] mb-6 ${modalTextColor}`}
          >
            Remarks
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="w-full">
              <textarea
                id="remarks"
                name="remarks"
                className={`w-full h-32 p-4 rounded-[10px] border resize-none ${modalInputBgBorder} ${modalTextColor} placeholder:text-gray-400 font-['Poppins:Regular',sans-serif] text-[14px]`}
                placeholder="Put your remarks here"
                defaultValue={initialRemarks}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={closeRemarksModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={confirmButtonClass}
                 style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- ADD CLIENT MODAL COMPONENT ---
  const AddClientModal = () => {
    if (!isClientModalOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Client Form Submitted!");
      setIsClientModalOpen(false);
    };

    return (
      <div
        className="fixed inset-0 z-[1010] bg-black/90 backdrop-blur-sm flex justify-center items-center p-4"
        onClick={() => setIsClientModalOpen(false)}
      >
        <div
          className={`w-full max-w-md p-6 rounded-[16px] shadow-2xl ${modalContentBg} ${modalTextColor}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-xl font-['Poppins:SemiBold',sans-serif] ${modalTextColor}`}
            >
              Add New Client
            </h2>
            <button
              onClick={() => setIsClientModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl leading-none cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Client Name
              </label>
              <input
                type="text"
                className={modalInputClass}
                placeholder="e.g., Jane Doe"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                className={modalInputClass}
                placeholder="e.g., 123 Main St, Sorsogon City"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Date Added
              </label>
              <input
                type="date"
                className={modalInputClass}
                placeholder="Select Date"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                className={modalInputClass}
                placeholder="e.g., 0917-XXX-XXXX"
              />
            </div>

            <div className="col-span-2 pt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsClientModalOpen(false)}
               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition-colors cursor-pointer"

              >
                Cancel
              </button>
              <button
                type="submit"
                className={modalButtonClass}
                 style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
              >
                Create Client
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- SALE MODAL COMPONENT ---
  const SaleModal = () => {
    if (!isModalOpen) return null;

    const isEditMode = !!editingSale;
    const title = isEditMode
      ? `Edit Sale Record #${editingSale.id}`
      : "Add New Sale Record";
    const submitButtonText = isEditMode
      ? "Save Changes"
      : "Create";

    const initialValues = isEditMode
      ? {
          product: editingSale.product,
          quantity: editingSale.quantity.toString(),
          totalPrice: editingSale.price,
          clientName: editingSale.clientName,
        }
      : {
          product: "",
          quantity: "",
          totalPrice: "",
          clientName: "",
        };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isEditMode) {
        console.log(
          "Edit Sale Form Submitted! ID:",
          editingSale.id,
        );
      } else {
        console.log("New Sale Form Submitted!");
      }
      closeSaleModal();
    };

    return (
      <div
        className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex justify-center items-center p-4"
        onClick={closeSaleModal}
      >
        <div
          className={`w-full max-w-md p-8 rounded-[16px] shadow-2xl ${modalContentBg} ${modalTextColor}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-2xl font-['Poppins:SemiBold',sans-serif] ${modalTextColor}`}
            >
              {title}
            </h2>
            <button
              onClick={closeSaleModal}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl leading-none cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Select Product
              </label>
              <select
                className={modalInputClass}
                required
                defaultValue={initialValues.product}
              >
                <option value="" disabled>
                  Select a Product
                </option>
                <option value="Tomato">Tomato</option>
                <option value="Carrot">Carrot</option>
                <option value="Eggplant">Eggplant</option>
              </select>
            </div>
            <div className="col-span-1 flex flex-col justify-start pt-2">
              <p className="text-sm font-medium mb-1">
                Stock: <span className="font-bold">250</span>
              </p>
              <p className="text-sm font-medium">
                Price:{" "}
                <span className="font-bold">₱100/ kg</span>
              </p>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                className={modalInputClass}
                placeholder="Quantity"
                required
                min="1"
                defaultValue={initialValues.quantity}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Total Price (Auto-Calculated)
              </label>
              <input
                type="text"
                className={modalInputClass}
                placeholder="Auto-Calculated"
                readOnly
                defaultValue={initialValues.totalPrice}
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Client
              </label>
              <div className="flex items-center gap-2">
                <select
                  className={modalInputClass}
                  required
                  defaultValue={initialValues.clientName.replace(
                    /\s/g,
                    "",
                  )}
                >
                  <option value="" disabled>
                    Select a Client.
                  </option>
                  {mockClientDetails.map((client) => (
                    <option
                      key={client.id}
                      value={client.name.replace(/\s/g, "")}
                    >
                      {client.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(true)}
                  className={`h-[46px] px-3 rounded-[10px] text-white bg-[${PRIMARY_GREEN}] bg-ctransition-colors duration-300 flex-shrink-0 font-['Inter:Regular',sans-serif] text-[14px] cursor-pointer`}
                   style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                >
                  ADD
                </button>
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className={modalInputClass}
                placeholder="Client Name"
                readOnly
                defaultValue={initialValues.clientName}
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                className={modalInputClass}
                placeholder="Address"
                readOnly
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <input
                type="text"
                className={modalInputClass}
                placeholder="Contact Number"
                readOnly
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Payment Mode
              </label>
              <select className={modalInputClass}>
                <option value="" disabled selected>
                  Select Payment Mode
                </option>
                <option value="cash">Cash on Delivery</option>
                <option value="transfer">
                  Online Transfer / Gcash
                </option>
                <option value="credit">Credit/Terms</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Status
              </label>
              <select className={modalInputClass}>
                <option value="" disabled selected>
                  Select Payment Status
                </option>
                <option value="paid">Paid (Fully)</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial Payment</option>
                <option value="credit">On Credit</option>
              </select>
            </div>

            <div className="col-span-2 pt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={closeSaleModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-3 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={modalButtonClass}  
                 style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
              >
                {submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- Sales Table Component ---
  const SalesTable = () => {
    // Styles for table actions
    const remarksButtonDarkMode = isDarkMode
      ? "bg-[#555] text-white hover:bg-[#666]"
      : "bg-[#d0d0d0] text-gray-700 hover:bg-[#c0c0c0]";
    const editButtonDarkMode = isDarkMode
      ? "bg-[#6a9f4b] text-white hover:bg-[#5d8a42]"
      : "bg-[#b8d4a8] text-gray-700 hover:bg-[#a8c498]";
    const tableCellText = isDarkMode
      ? "text-white"
      : "text-gray-700";

    return (
      <div
        className={`overflow-x-auto rounded-[10px] border ${tableBorder} shadow-lg`}
      >
        <div className={TableHeaderClasses}>
          <div className="text-white font-['Poppins:Medium',sans-serif] col-span-1">
            Product
          </div>
          <div className="text-white font-['Poppins:Medium',sans-serif] col-span-1">
            Qty
          </div>
          <div className="text-white font-['Poppins:Medium',sans-serif] col-span-1">
            Price
          </div>
          <div className="text-white font-['Poppins:Medium',sans-serif] col-span-1">
            Date
          </div>
          <div className="text-white font-['Poppins:Medium',sans-serif] col-span-1">
            Client
          </div>
          <div className="text-white font-['Poppins:Medium',sans-serif] col-span-1">
            Payment Mode
          </div>
          <div className="text-white font-['Poppins:Medium',sans-serif] col-span-1 text-center">
            Actions
          </div>
        </div>

        {mockSalesData.map((sale) => (
          <div
            key={sale.id}
            className={`grid grid-cols-8 gap-1 px-6 py-4 border-b ${tableBorder} ${tableRowHover} ${tableCellText} text-sm`}
          >
            <div className="col-span-1">{sale.product}</div>
            <div className="col-span-1">{sale.quantity}</div>
            <div className="col-span-1">{sale.price}</div>
            <div className="col-span-1">{sale.date}</div>

            {/* Client Name with View Client Action */}
<div
  className={clsx(
    "flex items-center justify-center cursor-pointer transition-all duration-300",
    "px-4 py-1.5 rounded-lg text-[13px] font-semibold shadow-sm border",
    "w-fit min-w-[120px] h-[36px]",
    // Background stays green in both modes
    "bg-[#77b254] border-[#77b254] hover:opacity-90",
    // Text color logic: Black for Light Mode, White for Dark Mode
    isDarkMode ? "text-white" : "text-black"
  )}
  onClick={() => handleViewClient(sale.client_id)}
  title={`View details for ${sale.clientName}`}
>
  <span className={isDarkMode ? "text-white" : "text-black"}>
     {sale.clientName}
  </span>
</div>

            <div className="col-span-1">{sale.paymentMode}</div>

            {/* Actions */}
            <div className="col-span-2 flex gap-1 justify-center">
              {/* EDIT BUTTON: Triggers Edit Sale Modal */}
              <button
                className={clsx(
                  TableCellButtonBaseClasses,
                  editButtonDarkMode,
                  "text-white",
                )}
                style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                onClick={() => handleEditSale(sale.id)}
              >
                Edit
              </button>
              {/* REMARKS BUTTON: Triggers Remarks Modal */}
              <button
                className={clsx(
                  TableCellButtonBaseClasses,
                  remarksButtonDarkMode,
                )}
                style={{
                  backgroundColor: isDarkMode
                    ? "#555"
                    : "#b8d4a8",
                }}
                onClick={() => handleRemarks(sale.id)}
              >
                Remarks
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="size-full">
      <SaleModal />
      <AddClientModal />
      <ViewClientModal />
      <RemarksModal />

      <div
        className={`min-h-full rounded-[16px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] w-full p-8 transition-colors duration-300 ${containerBg}`}
      >
        <SalesSummaryCards />

        <FilterActionBar
          openSaleModal={handleAddSale}
          onAddClient={() => setIsClientModalOpen(true)}
        />

        <SalesTable />
      </div>
    </div>
  );
}