import svgPaths from "../imports/svg-at96g6om8s";

import clsx from "clsx";

import React from "react";

import { useState } from "react";

import AttendanceContent from "./AttendanceContent";

// --- Imports ---

import img3 from "figma:asset/c570c50f97f09581bd85107e019c097b09d9ed24.png"; // Profile/Mini-Logo

import img28 from "figma:asset/d606819b9d8f888e9de6825f8642b9ab5cc7023b.png"; // Logo

// --- Type Definitions (Omitted for brevity) ---

type AttendanceProps = {
  onNavigateToDashboard?: () => void;

  onNavigateToInventory?: () => void;

  onNavigateToAttendance?: () => void;

  onNavigateToSales?: () => void;

  onNavigateToCrops?: () => void;

  onNavigateToExpenses?: () => void;

  onLogout?: () => void;
};

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

// --- Helper Functions and Components (Sidebar Icons) ---

// Helper function to determine the icon stroke/outer color

const getIconColor = (
  isDarkMode: boolean,

  isActive: boolean,
) => (isActive ? "white" : isDarkMode ? "white" : "black");

// Standard Icon Container for Flex Layout

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
    ? "black" // Correct: Black checkmark on green active background
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

// 4. Sales Icon (FIXED: Using correct path variable from Inventory)

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
            d={svgPaths.pa2c5500} // <-- **FIXED:** Box Outline
            id="Vector"
            stroke={color}
            strokeWidth="2"
          />

          <path
            d="M10.2 4.5V17.5"
            id="Vector2"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />

          <path
            d={svgPaths.p15ceff00} // <-- **Verified:** Graph Line
            id="Vector3"
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

// 5. Crops Icon (Vector + Vector1)

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

// 6. Expenses Icon (Helper)

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

// 7. Logout Icon - REVERTED TO ORIGINAL WORKING STATE

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

// Collapse Button Icon (Arrow) (Unchanged)

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
          d="M0.272727 6.71642L5.45455 11.7313C5.81818 12.0896 6.36364 12.0896 6.72727 11.7313C7.09091 11.3731 7.09091 10.8358 6.72727 10.4776L2.27273 6L6.72727 1.52239C7.09091 1.16418 7.09091 0.626865 6.72727 0.268656C6.54545 0.089552 6.36364 0 6.09091 0C5.81818 0 5.63636 0.089552 5.45455 0.268656L0.272727 5.28358C-0.0909091 5.73134 -0.0909091 6.26866 0.272727 6.71642C0.272727 6.62687 0.272727 6.62687 0.272727 6.71642Z"
          fill={isDarkMode ? "white" : "black"}
          id="Vector"
        />
      </svg>
    </div>
  );
}

// Dark Mode Icon component (Sun/Moon) (Unchanged)

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

// SidebarLink component (Unchanged)

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

// --- Main Attendance Component (Flexbox Layout) ---

export default function Attendance({
  onNavigateToDashboard,

  onNavigateToInventory,

  onNavigateToAttendance,

  onNavigateToSales,

  onNavigateToCrops,

  onNavigateToExpenses,

  onLogout,
}: AttendanceProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    document.documentElement.classList.toggle(
      "dark",

      !isDarkMode,
    );
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={clsx(
        "flex size-full transition-colors duration-300",

        isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e0e0e0]",
      )}
      data-name="Attendance"
    >
      {/* 1. Sidebar Container */}

      <div
        className={clsx(
          "relative flex-shrink-0 h-full rounded-[22px] p-4 transition-all duration-300 mx-10 my-10",

          isCollapsed ? "w-[100px]" : "w-[260px]",

          isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
        )}
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Profile Section (Unchanged) */}
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
          {/* Collapse Toggle Button (Unchanged) */}
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
              onClick={onNavigateToInventory}
              isDarkMode={isDarkMode}
              isCollapsed={isCollapsed}
              IconComponent={Archive}
              label="Inventory"
            />

            <SidebarLink
              isActive
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
                        {/* 1. LOGOUT BUTTON */}
                        <SidebarLink
                            onClick={onLogout}
                            isDarkMode={isDarkMode}
                            isCollapsed={isCollapsed}
                            IconComponent={LogoutIcon}
                            label="Logout"
                            isActive={false}
                        />
                        {/* 2. DARK MODE TOGGLE WRAPPER */}
                        <div
                            className={clsx(
                                "flex items-center h-[40px] w-full",
                                isCollapsed
                                    ? "justify-center px-0"
                                    : "justify-center px-5",
                            )}
                        >
                            {/* Toggle Switch Button */}
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
      {/* 2. Main Content Area (Updated with Title) */}

      <div
        className={clsx(
          "flex-1 min-w-0 h-full rounded-[16px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] overflow-y-auto",

          isDarkMode ? "bg-[#2d2d2d]" : "bg-white",

          "mt-10 mb-10 mr-10",

          "p-8", // Added padding to the container
        )}
        style={{ height: "calc(100vh - 80px)" }}
      >
        {/* Title/Header for the Attendance Page */}

        <h1
          className={clsx(
            "text-3xl font-['Poppins:SemiBold',sans-serif] mb-6", // Styling the title

            isDarkMode ? "text-white" : "text-gray-900", // Responsive text color
          )}
        >
          Attendance DTR
        </h1>

        <AttendanceContent isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}