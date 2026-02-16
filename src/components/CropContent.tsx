import svgPaths from "../imports/svg-052b8uwino";
import clsx from "clsx";
import imgWow from "../assets/wow.png";
import imgBanana from "../assets/banana.png"
import imgSquash from "../assets/sq.png";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
// Import the new modal files
import AddCropModal from "../imports/AddCropModal";
import FarmInputModal from "../imports/FarmInputModal";

type CropContentProps = {
  isDarkMode?: boolean;
};

// --- View Types for Crop Content ---
type CropViewType = "grid" | "detail";

// --- Data Structure for Crops (to pass to detail view) ---
interface CropData {
  name: string;
  planted: string;
  expectedHarvest: string;
  area: string;
  status: "In Progress" | "Complete" | "Pending";
  currentDate: string; // Current date shown on the detail screen
}

// --- Data for Cards ---
const crops: CropData[] = [
  {
    name: "Eggplant",
    planted: "March 1, 2024",
    expectedHarvest: "June 1, 2024",
    area: "500 sq m",
    status: "In Progress",
    currentDate: "Sep 7, 2025",
  },
  {
    name: "Squash",
    planted: "January 15, 2024",
    expectedHarvest: "April 15, 2024",
    area: "300 sq m",
    status: "Complete",
    currentDate: "Sep 7, 2025",
  },
  {
    name: "Banana",
    planted: "February 10, 2024",
    expectedHarvest: "August 10, 2024",
    area: "1000 sq m",
    status: "In Progress",
    currentDate: "Sep 7, 2025",
  },
];

// --- 2. Crop Detail View Component ---
interface CropDetailViewProps {
  isDarkMode: boolean;
  crop: CropData;
  onBack: () => void;
  openFarmInputModal: () => void; // Passed down from parent
}

const CropDetailView: React.FC<CropDetailViewProps> = ({
  isDarkMode,
  crop,
  onBack,
  openFarmInputModal,
}) => {
  // Dynamic classes based on dark mode
  const textPrimary = isDarkMode ? "text-white" : "text-black";
  const textSecondary = isDarkMode
    ? "text-gray-300"
    : "text-gray-600";
  const detailCardBg = isDarkMode
    ? "bg-gray-800/20"
    : "bg-white";

  // NEW: Simulated Weather Data
  const weatherData = {
    condition: "Sunny",
    temp: "32°C",
    humidity: "65%",
    wind: "5 km/h NE",
  };

  // Function to get the correct image based on crop name
  const getCropImage = (cropName: string) => {
    switch (cropName) {
      case "Eggplant":
        return imgWow;
      case "Squash":
        return imgSquash;
      case "Banana":
        return imgBanana;
      default:
        return imgWow; // Fallback
    }
  };

  return (
    <div className="w-full font-['Poppins:Regular',sans-serif]">
      {/* TOP HEADER: Back, Delete, Crop Name */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-[8px] font-['Poppins:Medium',sans-serif] text-[16px] transition-colors"
             style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
          >
            Back
          </button>
          {/* Delete Button */}
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-[8px] font-['Poppins:Medium',sans-serif] text-[16px] transition-colors">
            Delete
          </button>
        </div>
        {/* Crop Name */}
        <h1
          className={clsx(
            "text-[32px] font-['Poppins:SemiBold',sans-serif] transition-colors",
            textPrimary,
          )}
        >
          {crop.name}
        </h1>
        <div className="w-[180px]"></div>{" "}
        {/* Spacer for balance */}
      </div>

      {/* SECONDARY HEADER: Date */}
      <div className="mb-4 flex items-center justify-start">
        <p
          className={clsx(
            "text-[20px] font-['Poppins:Regular',sans-serif] transition-colors",
            textPrimary,
          )}
        >
          {crop.currentDate}
        </p>
      </div>

      {/* MAIN CONTENT AREA: Task, Farm Inputs, Weather, Notes */}
      <div className="flex items-center justify-center w-full">
        {/* Left Carousel Arrow */}
        <button
          className={clsx(
            "p-2 rounded-full mx-4 transition-colors",
            isDarkMode
              ? "bg-gray-700/50 hover:bg-gray-700"
              : "bg-gray-200/50 hover:bg-gray-300",
            textPrimary,
          )}
        >
          <ArrowLeft size={24} />
        </button>

        {/* Main Card Container */}
        <div
          className={clsx(
            "rounded-[16px] border border-[#77b254] transition-colors duration-300 p-6 flex flex-1 shadow-lg",
            detailCardBg,
          )}
        >
          <div className="flex flex-1 gap-6">
            {/* 1. Task Section (25%) */}
            <div className="w-1/4 min-w-[180px]">
              <h3
                className={clsx(
                  "text-[18px] font-['Poppins:Medium',sans-serif] mb-3 transition-colors",
                  textPrimary,
                )}
              >
                Task
              </h3>
              <div className="space-y-3 text-[14px]">
                {/* Tasks from the screenshot */}
                {[
                  "Bubuuan mo na ning tubig",
                  "Bubuuan mo ulit ta mainit",
                  "Kagan mo na fertilizer",
                  "Pwede na yan iharvest",
                  "Bubuuan mo ulit ta mainit",
                ].map((task, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={index < 2 || index === 4}
                      className="form-checkbox text-[#77b254] rounded-sm border-gray-400 focus:ring-[#77b254]"
                    />
                    <span className={textPrimary}>{task}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Farm Inputs Section (25%) */}
            <div className="w-1/4 min-w-[180px] border-l border-r border-gray-200/50 px-6">
              <h3
                className={clsx(
                  "text-[18px] font-['Poppins:Medium',sans-serif] mb-3 transition-colors",
                  textPrimary,
                )}
              >
                Farm Inputs
              </h3>
              <div className="flex flex-col items-center">
                {/* Add Input Button (+) */}
                <button
                  onClick={openFarmInputModal}
                    style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                  className="text-white bg-[#77b254] hover:bg-[#6a9f4b] w-6 h-6 rounded-full text-xl font-['Poppins:Medium',sans-serif] leading-none transition-colors mb-2 flex items-center justify-center"
                >
                  +
                </button>
                {/* Input List (from screenshot) */}
                <p
                  className={clsx(
                    "text-[14px] font-['Poppins:Regular',sans-serif] transition-colors text-center",
                    textSecondary,
                  )}
                >
                  INS – 500ml – PREV x12
                </p>
              </div>
            </div>

            {/* 3. Weather Section (25%) - API STYLE OUTPUT APPLIED HERE */}
            <div className="w-1/4 min-w-[180px]">
              <h3
                className={clsx(
                  "text-[18px] font-['Poppins:Medium',sans-serif] mb-3 transition-colors",
                  textPrimary,
                )}
              >
                Weather
              </h3>
              {/* New API-style Output Box */}
              <div
                className={clsx(
                  "p-3 rounded-lg font-['monospace', sans-serif] text-sm leading-relaxed",
                  isDarkMode
                    ? "bg-gray-700/50 border border-gray-600"
                    : "bg-gray-100 border border-gray-300",
                )}
              >
                <p
                  className={clsx(
                    "text-lg font-['Poppins:Medium',sans-serif] mb-2",
                    isDarkMode
                      ? "text-yellow-400"
                      : "text-yellow-600",
                  )}
                >
                  {weatherData.condition}
                </p>
                <div
                  className={clsx(
                    "flex justify-between",
                    textPrimary,
                  )}
                >
                  <span>Temp:</span>
                  <span className="font-['Poppins:SemiBold',sans-serif]">
                    {weatherData.temp}
                  </span>
                </div>
                <div
                  className={clsx(
                    "flex justify-between",
                    textPrimary,
                  )}
                >
                  <span>Humidity:</span>
                  <span>{weatherData.humidity}</span>
                </div>
                <div
                  className={clsx(
                    "flex justify-between",
                    textPrimary,
                  )}
                >
                  <span>Wind:</span>
                  <span>{weatherData.wind}</span>
                </div>
              </div>
            </div>

            {/* 4. Notes Section (25%) */}
            <div className="w-1/4 min-w-[180px] border-l border-gray-200/50 pl-6">
              <h3
                className={clsx(
                  "text-[18px] font-['Poppins:Medium',sans-serif] mb-3 transition-colors",
                  textPrimary,
                )}
              >
                Notes
              </h3>
              <textarea
                placeholder="Notes..."
                rows={4}
                className={clsx(
                  "w-full p-2 rounded-md text-[14px] font-['Poppins:Regular',sans-serif] transition-colors resize-none mb-3",
                  isDarkMode
                    ? "bg-[#3a3a3a] text-white border border-[#555]"
                    : "bg-gray-200 text-gray-700 border border-[#d0d0d0]",
                )}
              ></textarea>
              <div className="flex items-center justify-end text-[14px] gap-2">
                <span className={textSecondary}>
                  Dead crop:
                </span>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  className={clsx(
                    "w-12 p-1 text-center rounded-md border text-[14px] font-['Poppins:Regular',sans-serif] transition-colors",
                    isDarkMode
                      ? "bg-[#3a3a3a] text-white border-[#555]"
                      : "bg-white text-black border-[#d0d0d0]",
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Carousel Arrow */}
        <button
          className={clsx(
            "p-2 rounded-full mx-4 transition-colors",
            isDarkMode
              ? "bg-gray-700/50 hover:bg-gray-700"
              : "bg-gray-200/50 hover:bg-gray-300",
            textPrimary,
          )}
          style={{ transform: "rotate(180deg)" }}
        >
          <ArrowLeft size={24} />
        </button>
      </div>
    </div>
  );
};

// --- Main Component (Parent) ---
export default function CropContent({
  isDarkMode = false,
}: CropContentProps) {
  const [isAddCropModalOpen, setIsAddCropModalOpen] =
    useState(false);
  const [isFarmInputModalOpen, setIsFarmInputModalOpen] =
    useState(false); // State for Farm Input Modal
  const [activeView, setActiveView] =
    useState<CropViewType>("grid");
  const [selectedCropData, setSelectedCropData] =
    useState<CropData | null>(crops[0]);

  const openAddCropModal = () => setIsAddCropModalOpen(true);
  const closeAddCropModal = () => setIsAddCropModalOpen(false);

  const openFarmInputModal = () =>
    setIsFarmInputModalOpen(true); // Handlers for Farm Input
  const closeFarmInputModal = () =>
    setIsFarmInputModalOpen(false);

  // Function to switch to the Detail View
  const openDetailView = (crop: CropData) => {
    setSelectedCropData(crop);
    setActiveView("detail");
  };
  // Function to switch back to the Grid View
  const closeDetailView = () => setActiveView("grid");

  // Renders either the Grid of Cards or the Detail View
  const renderContent = () => {
    if (activeView === "detail" && selectedCropData) {
      return (
        <CropDetailView
          isDarkMode={isDarkMode}
          crop={selectedCropData}
          onBack={closeDetailView}
          openFarmInputModal={openFarmInputModal} // Pass handler
        />
      );
    }

    // Default: Render the Crop Card Grid
    return (
      <>
        {/* Filter and Add Crop section */}
        <div className="flex gap-4 mb-6">
          {/* Search input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search crops..."
              className={clsx(
                "w-full h-[50px] px-4 rounded-[8px] border font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
                isDarkMode
                  ? "bg-[#3a3a3a] border-[#555] text-white placeholder:text-gray-400"
                  : "bg-[#e8e8e8] border-[#d0d0d0] text-gray-700 placeholder:text-gray-500",
              )}
            />
          </div>

          {/* Filter by Status dropdown */}
          <select
            className={clsx(
              "h-[50px] px-4 rounded-[8px] border font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
              isDarkMode
                ? "bg-[#3a3a3a] border-[#555] text-white"
                : "bg-[#e8e8e8] border-[#d0d0d0] text-gray-700",
            )}
          >
            <option>Filter by Status</option>
            <option>Complete</option>
            <option>In Progress</option>
            <option>Pending</option>
          </select>

          {/* Filter by Type dropdown */}
          <select
            className={clsx(
              "h-[50px] px-4 rounded-[8px] border font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
              isDarkMode
                ? "bg-[#3a3a3a] border-[#555] text-white"
                : "bg-[#e8e8e8] border-[#d0d0d0] text-gray-700",
            )}
          >
            <option>Filter by Type</option>
            <option>Vegetable</option>
            <option>Fruit</option>
          </select>

          {/* Add Crop button */}
          <button
            onClick={openAddCropModal}
              style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
            className="bg-[#77b254] hover:bg-[#6a9f4b] text-white px-8 h-[50px] rounded-[8px] font-['Poppins:Medium',sans-serif] text-[16px] transition-colors"
          >
            Add Crop
          </button>
        </div>

        {/* Crop Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {crops.map((crop, index) => (
            <div
              key={index}
              className={clsx(
                "rounded-[16px] border overflow-hidden transition-colors duration-300",
                isDarkMode
                  ? "bg-[#3a3a3a] border-[#555]"
                  : "bg-white border-[#d0d0d0]",
              )}
            >
              {/* Image Placeholder/Component */}
              <img
                src={
                  crop.name === "Eggplant"
                    ? imgWow
                    : crop.name === "Squash"
                      ? imgSquash
                      : imgBanana
                }
                alt={crop.name}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-6">
                <h3
                  className={clsx(
                    "text-[24px] font-['Poppins:SemiBold',sans-serif] mb-2 transition-colors duration-300",
                    isDarkMode ? "text-white" : "text-black",
                  )}
                >
                  {crop.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={clsx(
                        "font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
                        isDarkMode
                          ? "text-gray-300"
                          : "text-gray-600",
                      )}
                    >
                      Planted:
                    </span>
                    <span
                      className={clsx(
                        "font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
                        isDarkMode
                          ? "text-white"
                          : "text-black",
                      )}
                    >
                      {crop.planted}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={clsx(
                        "font-['Poppins:Regular',sans-serif] text-[12px] whitespace-nowrap transition-colors duration-300",
                        isDarkMode
                          ? "text-gray-300"
                          : "text-gray-600",
                      )}
                    >
                      {crop.status === "Complete"
                        ? "Harvested:"
                        : "Expected Harvest:"}
                    </span>
                    <span
                      className={clsx(
                        "font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
                        isDarkMode
                          ? "text-white"
                          : "text-black",
                      )}
                    >
                      {crop.expectedHarvest}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={clsx(
                        "font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
                        isDarkMode
                          ? "text-gray-300"
                          : "text-gray-600",
                      )}
                    >
                      Status:
                    </span>
                    <span
                      className={clsx(
                        "font-['Poppins:Medium',sans-serif] text-[14px]",
                        crop.status === "Complete"
                          ? "text-green-600"
                          : "text-orange-500",
                      )}
                    >
                      {crop.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={clsx(
                        "font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
                        isDarkMode
                          ? "text-gray-300"
                          : "text-gray-600",
                      )}
                    >
                      Area:
                    </span>
                    <span
                      className={clsx(
                        "font-['Poppins:Regular',sans-serif] text-[14px] transition-colors duration-300",
                        isDarkMode
                          ? "text-white"
                          : "text-black",
                      )}
                    >
                      {crop.area}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openDetailView(crop)}
                    style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                  className="w-full mt-4 bg-[#77b254] hover:bg-[#6a9f4b] text-white py-2 rounded-[8px] font-['Poppins:Medium',sans-serif] text-[14px] transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="p-8 w-full min-h-screen">
      {/* Main Content Container */}
      <div
        className={clsx(
          "rounded-[16px] p-8 transition-colors duration-300",
          isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
        )}
      >
        {/* Render the appropriate content based on the activeView state */}
        {renderContent()}
      </div>

      {/* Modals outside the main content area for proper layering */}
      <AddCropModal
        isOpen={isAddCropModalOpen}
        onClose={closeAddCropModal}
        isDarkMode={isDarkMode}
      />

      <FarmInputModal
        isOpen={isFarmInputModalOpen}
        onClose={closeFarmInputModal}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}