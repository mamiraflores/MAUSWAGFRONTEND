import svgPaths from "../imports/svg-at96g6om8s";
import clsx from "clsx";
import React from "react";
import { useState } from "react";

// ✅ 1. IMPORT MODALS AND TYPES CORRECTLY
import AddProductModal from "./AddProductModal";
import CropDetailsModal, {
    ProductFormData,
} from "./CropDetailsModal";
// ✅ NEW IMPORT: Add the new Stock Modal and its type
import AddStockModal, { StockFormData } from "./AddStockModal";

// --- Imports ---
import img3 from "figma:asset/c570c50f97f09581bd85107e019c097b09d9ed24.png"; // Profile/Mini-Logo
import img28 from "figma:asset/d606819b9d8f888e9de6825f8642b9ab5cc7023b.png"; // Logo

// --- Type Definitions ---

type InventoryProps = {
    onNavigateToDashboard?: () => void;
    onNavigateToInventory?: () => void;
    onNavigateToAttendance?: () => void;
    onNavigateToSales?: () => void;
    onNavigateToCrops?: () => void;
    onNavigateToExpenses?: () => void;
    onLogout?: () => void;
};

type CropType = "Processed" | "Raw";

type IconProps = {
    isDarkMode?: boolean;
    isActive?: boolean;
};

type SidebarLinkProps = {
    onClick?: () => void;
    isDarkMode: boolean;
    isActive?: boolean;
    isCollapsed: boolean;
    IconComponent: React.ComponentType<IconProps>;
    label: string;
};

// --- Helper Functions and Components (Sidebar Icons - All unchanged) ---

const getIconColor = (
    isDarkMode: boolean,
    isActive: boolean,
) => (isActive ? "white" : isDarkMode ? "white" : "black");

const IconContainer = ({
    children,
}: React.PropsWithChildren<{}>) => (
    <div className="size-[20px] flex-shrink-0 flex items-center justify-center">
        <div className="size-full">{children}</div>
    </div>
);



// 1. Dashboard Icon (Grid)
function Grid({
    isDarkMode = false,
    isActive = false,
}: IconProps) {
    const color = getIconColor(isDarkMode, isActive);
    return (
        <IconContainer>
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 20 20"
            >
                <g id="grid 2">
                    <path
                        d={svgPaths.p1207200}
                        id="Vector"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.p259afa80}
                        id="Vector_2"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.p1a05d900}
                        id="Vector_3"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.p4ffcd00}
                        id="Vector_4"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </IconContainer>
    );
}

// 2. Inventory Icon (Archive)
function Archive({
    isDarkMode = false,
    isActive = false,
}: IconProps) {
    const color = getIconColor(isDarkMode, isActive);
    return (
        <IconContainer>
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 20 20"
            >
                <g id="archive 1">
                    <path
                        d={svgPaths.p2a621f40}
                        id="Vector"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.p147a9500}
                        id="Vector_2"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d="M8.33333 10H11.6667"
                        id="Vector_3"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </IconContainer>
    );
}

// 3. Attendance Icon (CheckSquare)
function CheckSquare({
    isDarkMode = false,
    isActive = false,
}: IconProps) {
    const strokeColor = getIconColor(isDarkMode, isActive);
    const innerColor = isActive
        ? "black" 
        : isDarkMode
            ? "white"
            : "black";
    return (
        <IconContainer>
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 20 20"
            >
                <g id="check-square 1">
                    <rect
                        height="19"
                        stroke={strokeColor}
                        width="19"
                        x="0.5"
                        y="0.5"
                    />
                    <path
                        d={svgPaths.p3fe63d80}
                        id="Vector"
                        stroke={innerColor}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.p2e9f900}
                        id="Vector_2"
                        stroke={innerColor}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </IconContainer>
    );
}

// 4. Sales Icon
function SalesIcon({
    isDarkMode = false,
    isActive = false,
}: IconProps) {
    const color = getIconColor(isDarkMode, isActive);
    return (
        <IconContainer>
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 21 20"
            >
                <g>
                    <path
                        d={svgPaths.pa2c5500}
                        id="Vector"
                        stroke={color}
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.p15ceff00}
                        id="Vector2"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        transform="translate(7.14 6.5)"
                    />
                </g>
            </svg>
        </IconContainer>
    );
}

// 5. Crops Icon
function CropsIcon({
    isDarkMode = false,
    isActive = false,
}: IconProps) {
    const strokeColor = getIconColor(isDarkMode, isActive);
    const innerFill = isActive
        ? "black"
        : isDarkMode
            ? "#e0e0e0"
            : "#282828";
    return (
        <IconContainer>
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 21 20"
            >
                <g>
                    <path
                        d={svgPaths.pa2c5500}
                        id="Vector"
                        stroke={strokeColor}
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.pa5b90f0}
                        fill={innerFill}
                        id="Vector1"
                        stroke={strokeColor}
                        strokeWidth="2"
                        transform="translate(6.12 3)"
                    />
                </g>
            </svg>
        </IconContainer>
    );
}

// 6. Expenses Icon
function ExpensesIcon({
    isDarkMode = false,
    isActive = false,
}: IconProps) {
    const color = getIconColor(isDarkMode, isActive);
    return (
        <IconContainer>
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 23 21"
            >
                <g id="Group 65" transform="translate(-1.27, -0.5)">
                    <path
                        d={svgPaths.p4c51f00}
                        id="Vector"
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                    <path
                        d={svgPaths.pc25c600}
                        id="Vector_2"
                        stroke={color}
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </IconContainer>
    );
}

// 7. Logout Icon
function LogoutIcon({
    isDarkMode = false,
    isActive = false,
}: IconProps) {
    const color = getIconColor(isDarkMode, isActive);
    return (
        <IconContainer>
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 21 20"
            >
                <path
                    d="M10 4H3C2.44772 4 2 4.44772 2 5V15C2 15.5523 2.44772 16 3 16H10"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 13L19 9.5L15 6"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19 9.5H7"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </IconContainer>
    );
}

// Collapse Button Icon (Arrow)
function DashboardVector({
    additionalClassNames = "",
    isDarkMode = false,
    onClick,
}: {
    additionalClassNames?: string;
    isDarkMode?: boolean;
    onClick?: () => void;
}) {
    return (
        <div
            className={clsx(
                "h-[12px] w-[6.752px] cursor-pointer",
                additionalClassNames,
            )}
            onClick={onClick}
        >
            <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 7 12"
            >
                <path
                    d={svgPaths.p3a6d71c0} 
                    fill={isDarkMode ? "white" : "black"}
                    id="Vector"
                />
            </svg>
        </div>
    );
}

// Dark Mode Icon component (Sun/Moon)
function DarkModeIcon({ isDarkMode = false }: IconProps) {
    return (
        <svg className="size-full" fill="none" viewBox="0 0 20 20">
            {isDarkMode ? (
                // Moon (Dark mode - Crescent shape)
                <path
                    d="M10 2a8 8 0 100 16v-16z"
                    fill="#333"
                    mask="url(#mask0_216_102)"
                />
            ) : (
                // Sun (Light mode - Sun with rays)
                <>
                    <circle cx="10" cy="10" r="4" fill="#ffc107" />
                    <path
                        stroke="#ffc107"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        d="M10 0v2 M10 18v2 M0 10h2 M18 10h2 M3 3l1.4 1.4 M15.6 15.6l1.4 1.4 M3 17l1.4-1.4 M15.6 4.4l1.4-1.4"
                    />
                </>
            )}
            <defs>
                <mask id="mask0_216_102">
                    <rect width="20" height="20" fill="white" />
                    <circle cx="15" cy="5" r="7" fill="black" />
                </mask>
            </defs>
        </svg>
    );
}

// SidebarLink component
const SidebarLink: React.FC<SidebarLinkProps> = ({
    IconComponent,
    label,
    onClick,
    isDarkMode,
    isActive = false,
    isCollapsed,
}) => {
    const textColor = isActive
        ? "text-white"
        : isDarkMode
            ? "text-white"
            : "text-black";

    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex items-center h-[46px] rounded-[5px] w-full cursor-pointer transition-colors duration-300",
                isCollapsed
                    ? "justify-center px-0"
                    : "justify-start px-5",
                isActive
                    ? "bg-[#77B254]"
                    : isDarkMode
                        ? "hover:bg-[#3a3a3a]"
                        : "hover:bg-gray-100",
            )}
        >
            <IconComponent
                isActive={isActive}
                isDarkMode={isDarkMode}
            />
            {!isCollapsed && (
                <span
                    className={clsx(
                        "ml-4 text-[16px] font-['Poppins:Regular',sans-serif]",
                        textColor,
                    )}
                >
                    {label}
                </span>
            )}
        </button>
    );
};

// --- START: Inventory Content Components ---

// 1. TOP TABLE: Current Stock Summary (UNCHANGED)
function CurrentStockSummary({
    isDarkMode = false,
}: {
    isDarkMode?: boolean;
}) {
    return (
        <div
            className={clsx(
                "relative w-full min-h-[200px] p-4 rounded-[16px] transition-colors duration-300",
                isDarkMode ? "bg-[#3A3A3A]" : "bg-white",
            )}
            data-name="CurrentStockSummary-Top"
        >
            <p
                className={clsx(
                    "font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[18px] mb-4 transition-colors duration-300",
                    isDarkMode ? "text-gray-200" : "text-[#282828]",
                )}
            >
                Current Stock Summary
            </p>

            <div className="flex mb-4">
                <div
                    className={clsx(
                        "h-[30px] rounded-[4px] w-[247px] flex items-center px-3",
                        isDarkMode ? "bg-gray-700" : "bg-gray-200",
                    )}
                >
                    <p
                        className={clsx(
                            "font-['Poppins:Regular',sans-serif] text-[16px]",
                            isDarkMode ? "text-gray-400" : "text-gray-500",
                        )}
                    >
                        Search...
                    </p>
                </div>
            </div>
            {/* Header Row */}
            <div className="flex bg-[#77B254] h-[40px] rounded-[4px] items-center text-white font-['Poppins:Regular',sans-serif] text-[16px] px-3 mb-2">
                <p className="w-[50%]">Name</p>
                <p className="w-[50%]">Total Stock</p>
            </div>
            {/* Data Rows */}
            {(
                [
                    { name: "Banana", stock: 0 },
                    { name: "Squash", stock: 25 },
                    { name: "Carrot", stock: 0 },
                ] as const
            ).map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        className={clsx(
                            "flex h-[40px] items-center font-['Poppins:Regular',sans-serif] text-[16px] px-3",
                            isDarkMode ? "text-gray-200" : "text-black",
                        )}
                    >
                        <p className="w-[50%]">{item.name}</p>
                        <p
                            className={clsx(
                                "w-[50%]",
                                item.stock === 0
                                    ? "text-red-500"
                                    : isDarkMode
                                        ? "text-gray-200"
                                        : "text-black",
                            )}
                        >
                            {item.stock}
                        </p>
                    </div>
                    {/* Divider Line: Use dark mode aware border */}
                    {index < 2 && (
                        <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600 my-1"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// 2. MIDDLE TABLE: Product List (UNCHANGED in structure, receives mock data)
function ProductList({
    isDarkMode = false,
    onOpenModal,
    mockProductData,
    onEditProduct, // ✅ ADD THIS PROP
}: {
    isDarkMode?: boolean;
    onOpenModal: () => void;
    mockProductData: any[];
    onEditProduct: (product: any) => void; // ✅ ADD THIS TYPE
}) {
    return (
        <div
            className={clsx(
                "relative w-full min-h-[292px] p-4 rounded-[16px] transition-colors duration-300",
                isDarkMode ? "bg-[#3A3A3A]" : "bg-white",
            )}
            data-name="ProductList-Middle"
        >
            <p
                className={clsx(
                    "font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[18px] mb-4 transition-colors duration-300",
                    isDarkMode ? "text-gray-200" : "text-[#282828]",
                )}
            >
                Product List
            </p>

            <div className="flex mb-4">
                <div
                    className={clsx(
                        "h-[30px] rounded-[4px] w-[247px] flex items-center px-3",
                        isDarkMode ? "bg-gray-700" : "bg-gray-200",
                    )}
                >
                    <p
                        className={clsx(
                            "font-['Poppins:Regular',sans-serif] text-[16px]",
                            isDarkMode ? "text-gray-400" : "text-gray-500",
                        )}
                    >
                        Search...
                    </p>
                </div>
                {/* Add Product Button */}
                <div
                    onClick={onOpenModal}
                    className="h-[30px] rounded-[4px] w-[170px] ml-4 flex items-center justify-center cursor-pointer hover:opacity-80 transition duration-200"
                    style={{
                        backgroundColor: isDarkMode ? "#6a9f4b" : "#3f5e2dff",
                    }}
                >
                    <p className="font-['Poppins:Regular',sans-serif] text-[16px] text-white">
                        Add Product
                    </p>
                </div>
            </div>

            {/* Header Row */}
            <div className="flex bg-[#77B254] h-[40px] rounded-[4px] items-center text-white font-['Poppins:Medium',sans-serif] text-[16px] px-3 mb-2">
                <p className="w-[10%]">Name</p>
                <p className="w-[10%]">Category</p>
                <p className="w-[10%]">Variant</p>
                <p className="w-[10%]">Unit</p>
                <p className="w-[15%]">Measurement</p>
                <p className="w-[10%]">Price</p>
                <p className="w-[10%]">Package</p>
                <p className="w-[15%] text-right">Action</p>
            </div>

            {/* Data Rows */}
            {mockProductData.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        className={clsx(
                            "flex h-[40px] items-center font-['Poppins:Regular',sans-serif] text-[16px] px-3",
                            isDarkMode ? "text-gray-200" : "text-black",
                        )}
                    >
                        <p className="w-[10%]">{item.name}</p>
                        <p className="w-[10%]">{item.category}</p>
                        <p className="w-[10%]">{item.variant}</p>
                        <p className="w-[10%]">{item.unit}</p>
                        <p className="w-[15%]">{item.quantity}</p>
                        <p className="w-[10%]">{item.price}</p>
                        <p className="w-[10%]">{item.packageType}</p>

                        {/* ✅ FIXED: Action Button (Edit) now triggers the handler */}
                        <div className="w-[15%] flex justify-end">
                            <div 
                                onClick={() => onEditProduct(item)} 
                                 style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                                className="bg-[#b8d4a8] h-[30px] rounded-[4px] w-[87px] flex items-center justify-center cursor-pointer hover:bg-[#a1c48d] transition duration-200"
                            >
                                <p className="text-[16px] text-white font-['Poppins:Regular',sans-serif]">
                                    Edit
                                </p>
                            </div>
                        </div>
                    </div>

                    {index < mockProductData.length - 1 && (
                        <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600 my-1"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// 3. BOTTOM TABLE: Detailed Stock Movement (UPDATED with button handler)
function DetailedStockMovement({
    isDarkMode = false,
    // ✅ NEW PROP: Handler to open the Add Stock Modal
    onOpenStockModal,
}: {
    isDarkMode?: boolean;
    onOpenStockModal: () => void;
}) {
    const stockData = [
        {
            name: "Banana",
            quantity: 20,
            type: "Stock in",
            date: "2025-09-07",
            time: "10:39:13",
            mfg: "2025-09-07",
            expiry: "2025-09-07",
        },
        {
            name: "Squash",
            quantity: 10,
            type: "Stock out",
            date: "2025-09-07",
            time: "10:39:13",
            mfg: "2025-09-07",
            expiry: "2025-09-07",
        },
        {
            name: "Carrot",
            quantity: 0,
            type: "Stock in",
            date: "2025-09-07",
            time: "10:39:13",
            mfg: "2025-09-07",
            expiry: "2025-09-07",
        },
    ];

    return (
        <div
            className={clsx(
                "relative w-full min-h-[292px] p-4 rounded-[16px] transition-colors duration-300",
                isDarkMode ? "bg-[#3A3A3A]" : "bg-white",
            )}
            data-name="CurrentStockSummary-Detailed"
        >
            <p
                className={clsx(
                    "font-['Poppins:Medium',sans-serif] leading-[normal] not-italic text-[18px] mb-4 transition-colors duration-300",
                    isDarkMode ? "text-gray-200" : "text-[#282828]",
                )}
            >
                Current Stock Summary
            </p>

            <div className="flex mb-4">
                <div
                    className={clsx(
                        "h-[30px] rounded-[4px] w-[247px] flex items-center px-3",
                        isDarkMode ? "bg-gray-700" : "bg-gray-200",
                    )}
                >
                    <p
                        className={clsx(
                            "font-['Poppins:Regular',sans-serif] text-[16px]",
                            isDarkMode ? "text-gray-400" : "text-gray-500",
                        )}
                    >
                        Search...
                    </p>
                </div>
                {/* Add Stock Button - ATTACH HANDLER */}
                <div
                    onClick={onOpenStockModal} // ✅ ATTACHED NEW HANDLER
                      style={{
                  backgroundColor: isDarkMode
                    ? "#6a9f4b"
                    : "#3f5e2dff",
                }}
                    className="bg-[#77B254] h-[30px] rounded-[4px] w-[110px] ml-4 flex items-center justify-center cursor-pointer hover:bg-[#65A30D] transition duration-200"
                > 
                    <p className="font-['Poppins:Regular',sans-serif] text-[16px] text-white">
                        Add Stock
                    </p>
                </div>
            </div>

            {/* Header Row */}
            <div className="flex bg-[#77B254] h-[40px] rounded-[4px] items-center text-white font-['Poppins:Medium',sans-serif] text-[16px] px-3 mb-2">
                <p className="w-[10%]">Name</p>
                <p className="w-[8%]">Quantity</p>
                <p className="w-[12%]">Type</p>
                <p className="w-[18%]">Date</p>
                <p className="w-[12%]">Time</p>
                <p className="w-[20%]">Manufactured Date</p>
                <p className="w-[20%]">Expiry Date</p>
            </div>
            {/* Data Rows */}
            {stockData.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        className={clsx(
                            "flex h-[40px] items-center font-['Poppins:Regular',sans-serif] text-[16px] px-3",
                            isDarkMode ? "text-gray-200" : "text-black",
                        )}
                    >
                        <p className="w-[10%]">{item.name}</p>
                        <p className="w-[8%]">{item.quantity}</p>
                        <p
                            className={clsx(
                                "w-[12%]",
                                item.type === "Stock in"
                                    ? "text-[#77B254]"
                                    : "text-red-500",
                            )}
                        >
                            {item.type}
                        </p>
                        <p className="w-[18%]">{item.date}</p>
                        <p className="w-[12%]">{item.time}</p>
                        <p className="w-[20%]">{item.mfg}</p>
                        <p className="w-[20%]">{item.expiry}</p>
                    </div>
                    {/* Divider Line: Use dark mode aware border */}
                    {index < stockData.length - 1 && (
                        <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600 my-1"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// Wrapper for all Inventory Content (UPDATED to pass stock handler)
function InventoryContent({
    isDarkMode = false,
    onOpenModal,
    onOpenStockModal,
    onEditProduct, // ✅ ADD THIS PROP
}: {
    isDarkMode?: boolean;
    onOpenModal: () => void;
    onOpenStockModal: () => void;
    onEditProduct: (product: any) => void; // ✅ ADD THIS TYPE
}) {
    // Mock product data (Update price/measurement to numbers if your form expects numbers)
    const mockProductData = [
        { name: "Banana", category: "Fruit", variant: "Saba", unit: "kg", quantity: 10.00, price: 20.00, packageType: "Sack" },
        { name: "Potato", category: "Vegetables", variant: "-", unit: "kg", quantity: 10.00, price: 500.00, packageType: "Sack" },
        { name: "Apple", category: "Fruit", variant: "-", unit: "kg", quantity: 6.00, price: 300.00, packageType: "Plastic Bag" },
    ];

    return (
        <div className="space-y-6 pb-8">
            {/* 1. Top Table: Current Stock Summary */}
            <CurrentStockSummary isDarkMode={isDarkMode} />
            
            {/* 2. Middle Table: Product List */}
            <ProductList
                isDarkMode={isDarkMode}
                onOpenModal={onOpenModal}
                mockProductData={mockProductData}
                onEditProduct={onEditProduct} // ✅ PASS IT DOWN
            />
            
            {/* 3. Bottom Table: Detailed Stock Movement */}
            <DetailedStockMovement
                isDarkMode={isDarkMode}
                onOpenStockModal={onOpenStockModal}
            />
        </div>
    );
}
// --- Main InventoryManagementModule Component (FIXED) ---

export default function InventoryManagementModule({
    onNavigateToDashboard,
    onNavigateToInventory,
    onNavigateToAttendance,
    onNavigateToSales,
    onNavigateToCrops,
    onNavigateToExpenses,
    onLogout,
}: InventoryProps) {
    // 1. STATE MANAGEMENT
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // MODAL 1 & 2 (Add Product) states 
    const [isSelectTypeModalOpen, setIsSelectTypeModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedCropType, setSelectedCropType] = useState<CropType>("Raw");

    // ✅ NEW STATE FOR EDITING
    const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);

    // ✅ NEW STATE: Add Stock Modal
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);

    // Mock product list for the Add Stock dropdown
    const mockAvailableProducts = ["Banana (Saba)", "Potato", "Apple"];

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark", !isDarkMode);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // ✅ NEW HANDLER: Opens the details modal with existing product data
    const handleEditProduct = (product: ProductFormData) => {
        setEditingProduct(product);
        setSelectedCropType(product.type); // Ensure modal matches product type
        setIsDetailsModalOpen(true);
    };

    // ✅ MODIFIED HANDLER: Resets editing state when starting a fresh "Add" flow
    const handleOpenAddProduct = () => {
        setEditingProduct(null); 
        setIsSelectTypeModalOpen(true);
    };

    // Handler 1: Closes Modal 1, sets crop type, and Opens Modal 2 (CropDetailsModal)
    const handleCropTypeSelect = (type: CropType) => {
        setSelectedCropType(type);
        setIsSelectTypeModalOpen(false); 
        setIsDetailsModalOpen(true); 
    };

    // Handler 2: Receives product data from Modal 2 and closes it
    const handleProductSubmit = (data: ProductFormData) => {
        if (editingProduct) {
            console.log("Updating Product:", data);
            alert(`Updated product: ${data.name}`);
        } else {
            console.log("New Product Added:", data);
            alert(`Added product: ${data.name} (Type: ${selectedCropType})`);
        }
        setIsDetailsModalOpen(false);
        setEditingProduct(null); // Clear editing state after submit
    };

    // ✅ NEW HANDLER: Submits stock data and closes the Add Stock modal
    const handleStockSubmit = (data: StockFormData) => {
        console.log("New Stock Added:", data);
        alert(`Added ${data.quantity} units of ${data.productName} to stock!`);
        setIsStockModalOpen(false);
    };

    return (
        <div
            className={clsx(
                "flex size-full transition-colors duration-300",
                isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e0e0e0]",
            )}
            data-name="InventoryManagementModule"
        >
            {/* 1. Sidebar Container (Omitted for brevity) */}
            <div
                className={clsx(
                    "relative flex-shrink-0 h-full rounded-[22px] p-4 transition-all duration-300 mx-10 my-10 z-10",
                    isCollapsed ? "w-[100px]" : "w-[260px]",
                    isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
                )}
                style={{ height: "calc(100vh - 80px)" }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Profile Section */}
                    <div
                        className={clsx(
                            "flex items-center mb-8 h-[43px] overflow-hidden transition-all duration-300",
                            isCollapsed ? "justify-center" : "justify-start",
                        )}
                    >
                        <div className="size-[43px] flex-shrink-0">
                            <img
                                alt="Profile Icon"
                                className="size-full rounded-full object-cover"
                                src={img3}
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="ml-3 transition-opacity duration-300">
                                <img
                                    alt="Mauswag RecordSync Logo"
                                    className="w-[125px] h-auto"
                                    src={img28}
                                />
                            </div>
                        )}
                    </div>
                    {/* Collapse Toggle Button */}
                    <button
                        onClick={toggleCollapse}
                        className={clsx(
                            "absolute cursor-pointer hover:opacity-70 transition-transform duration-300",
                            "top-1/2 -translate-y-1/2",
                            isCollapsed
                                ? "left-[calc(100%-10px)] rotate-0"
                                : "left-[calc(100%-10px)] rotate-180",
                            isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e0e0e0]",
                            "rounded-full p-2",
                        )}
                        style={{ zIndex: 10 }}
                    >
                        <DashboardVector isDarkMode={isDarkMode} />
                    </button>
                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-3 mt-4">
                        <SidebarLink
                            onClick={onNavigateToDashboard}
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={Grid}
                            label="Dashboard"
                        />
                        <SidebarLink
                            isActive
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={Archive}
                            label="Inventory"
                        />
                        <SidebarLink
                            onClick={onNavigateToAttendance}
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={CheckSquare}
                            label="Attendance"
                        />
                        <SidebarLink
                            onClick={onNavigateToSales}
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={SalesIcon}
                            label="Sales"
                        />
                        <SidebarLink
                            onClick={onNavigateToCrops}
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={CropsIcon}
                            label="Crops"
                        />
                        <SidebarLink
                            onClick={onNavigateToExpenses}
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={ExpensesIcon}
                            label="Expenses"
                        />
                    </nav>
                    {/* Footer: Logout and Dark Mode Toggle */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                        <SidebarLink
                            onClick={onLogout}
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={LogoutIcon}
                            label="Logout"
                            isActive={false}
                        />
                        <div
                            className={clsx(
                                "flex items-center h-[40px] w-full",
                                isCollapsed
                                    ? "justify-center px-0"
                                    : "justify-center px-5",
                            )}
                        >
                            <button
                                onClick={toggleDarkMode}
                                className={clsx(
                                    "h-[40px] w-[73px] flex items-center p-[5px] rounded-full transition-all duration-300 flex-shrink-0",
                                    isDarkMode ? "bg-[#4a4a4a]" : "bg-[#CCCCCC]",
                                )}
                            >
                                <div
                                    className={clsx(
                                        "size-[30px] rounded-full bg-white transition-transform duration-300 flex items-center justify-center",
                                        isDarkMode
                                            ? "translate-x-[33px]"
                                            : "translate-x-0",
                                    )}
                                >
                                    <DarkModeIcon isDarkMode={isDarkMode} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 2. Main Content Area */}
            <div
                className={clsx(
                    "flex-1 min-w-0 h-full rounded-[16px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] overflow-y-auto",
                    isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
                    "mt-10 mb-10 mr-10",
                    "p-8",
                )}
                style={{ height: "calc(100vh - 80px)" }}
            >
                <h1
                    className={clsx(
                        "text-3xl font-['Poppins:SemiBold',sans-serif] mb-8",
                        isDarkMode ? "text-white" : "text-gray-900",
                    )}
                >
                    Inventory Management
                </h1>
                <InventoryContent
                    isDarkMode={isDarkMode}
                    // ✅ Updated to use the reset handler
                    onOpenModal={handleOpenAddProduct}
                    onOpenStockModal={() => setIsStockModalOpen(true)}
                    // ✅ NEW PROP: Pass the edit handler to content
                    onEditProduct={handleEditProduct} 
                />
            </div>

            <AddProductModal
                isOpen={isSelectTypeModalOpen}
                onClose={() => setIsSelectTypeModalOpen(false)}
                isDarkMode={isDarkMode}
                onSelectCropType={handleCropTypeSelect}
            />

            <CropDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setEditingProduct(null); // Ensure state is cleared on close
                }}
                isDarkMode={isDarkMode}
                cropType={selectedCropType}
                onSubmit={handleProductSubmit}
                // ✅ NEW PROP: Pass existing data for editing
                initialData={editingProduct} 
            />

            <AddStockModal
                isOpen={isStockModalOpen}
                onClose={() => setIsStockModalOpen(false)}
                isDarkMode={isDarkMode}
                onSubmit={handleStockSubmit}
                availableProducts={mockAvailableProducts}
            />
        </div>
    );
}