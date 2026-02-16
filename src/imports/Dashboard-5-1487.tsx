// --- Imports ---
import svgPaths from "../imports/svg-at96g6om8s";
import clsx from "clsx";
import React from "react";
import { useState, useEffect } from "react";

// --- Imports for Images ---
import img3 from "figma:asset/c570c50f97f09581bd85107e019c097b09d9ed24.png"; // Profile/Mini-Logo
import img28 from "figma:asset/d606819b9d8f888e9de6825f8642b9ab5cc7023b.png"; // Logo
import imgFarmer1 from "figma:asset/e0ad962b97c9adac7c75cb78fd6b52deee1e0236.png";
import imgBlueAndWhiteCircleSurfingClubLogo1 from "figma:asset/c9bf7b50b324f754579b0c39190a81246df82bea.png";

// --- MOCK DATA (Consolidated) ---
const mockData = {
  // DATA for Monthly Profit Bar Graph (12 months of mock data)
  monthlyProfit: [
    { month: "Jan", profit: 45000 },
    { month: "Feb", profit: 55000 },
    { month: "Mar", profit: 62000 },
    { month: "Apr", profit: 50000 },
    { month: "May", profit: 75000 },
    { month: "Jun", profit: 80000 },
    { month: "Jul", profit: 65000 },
    { month: "Aug", profit: 95000 },
    { month: "Sep", profit: 88000 },
    { month: "Oct", profit: 70000 },
    { month: "Nov", profit: 105000 },
    { month: "Dec", profit: 115000 }, // Current month
  ],

  // NEW DATA for Alerts
  lowStock: [
    { name: "Carrot Seeds", stock: 3, type: "Vegetable" },
    { name: "Water Pump", stock: 1, type: "Tool" },
    { name: "Mango Crates", stock: 5, type: "Fruit" },
  ],
  overdueTasks: [
    {
      plant: "Tomato",
      type: "Vegetable",
      plantedDate: "Oct 15, 2025",
    },
    {
      plant: "Dragon Fruit",
      type: "Fruit",
      plantedDate: "Mar 01, 2025",
    },
  ],

  // Existing data structure for remaining charts (Task and Worker Hours)
  cropTasks: [
    { day: "Mon", tasks: 8 },
    { day: "Tue", tasks: 6 },
    { day: "Wed", tasks: 12 },
    { day: "Thu", tasks: 5 },
  ],
  workerHours: [
    { worker: "Ramon", hours: 40 },
    { worker: "Carla", hours: 35 },
    { worker: "Pedro", hours: 45 },
  ],
  totalExpenses: 5500.75, // For the Current Period
};

// --- Helper Functions and Components (Using new colors and PHP format) ---

const formatCurrencyPHP = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

const formatNumberCompact = (amount: number) => {
  // Format large numbers for the Y-axis (e.g., 50,000 -> 50k)
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- 1. DashboardCard Component (The necessary container) ---

interface DashboardCardProps
  extends React.PropsWithChildren<{}> {
  title: string;
  isDarkMode: boolean;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  isDarkMode,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "p-4 rounded-xl shadow-lg flex flex-col min-h-[200px]",
        isDarkMode
          ? "bg-[#3a3a3a] text-white"
          : "bg-white text-gray-900",
        className,
      )}
    >
      <h3
        className={clsx(
          "text-lg font-['Poppins:SemiBold',sans-serif] mb-4 pb-2 border-b",
          isDarkMode ? "border-gray-600" : "border-gray-200",
        )}
      >
        {title}
      </h3>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
};

// --- 2. MonthlyProfitBarGraph Component (Vertical Bar Graph) ---

interface ProfitData {
  month: string;
  profit: number;
}

interface MonthlyProfitBarGraphProps {
  data: ProfitData[];
  isDarkMode: boolean;
}

const MonthlyProfitBarGraph: React.FC<
  MonthlyProfitBarGraphProps
> = ({ data, isDarkMode }) => {
  // 1. Data Scaling
  const allProfits = data.map((d) => d.profit);
  const maxProfit = Math.max(...allProfits);
  const minProfit = 0; // Start at 0 for accurate bar heights
  const scale = maxProfit * 1.1; // Add 10% buffer for padding

  const primaryColor = "#65A30D"; // Green color
  const highlightColor = "#4D7C0F"; // Darker green for current month

  // Y-Axis Tick Labels (Simple 3 points: 0, Max/2, Max)
  const midProfit = Math.floor(maxProfit / 2);
  const yTicks = [maxProfit, midProfit, minProfit];

  // Get current month's profit for display
  const currentProfit = data[data.length - 1].profit;

  return (
    <div className="flex flex-col h-full pl-6 pr-2">
      {/* Y-Axis Label */}
      <span className="text-xs font-['Poppins:Regular',sans-serif] text-gray-500 mb-2">
        Profit (in PHP)
      </span>

      {/* Graph Area */}
      <div className="flex flex-1 relative">
        {/* Y-Axis (Left side: Ticks and Grid Lines) */}
        <div className="absolute left-0 w-full h-full pr-2">
          {yTicks.map((tick, index) => {
            const topPosition =
              index === yTicks.length - 1
                ? 97 // Position 0 slightly above bottom edge
                : (1 - tick / scale) * 100;

            return (
              <div
                key={tick}
                className="absolute right-0 w-full"
                style={{ top: `${topPosition}%` }}
              >
                {/* Tick Label */}
                <span
                  className={clsx(
                    "text-xs absolute right-full mr-2",
                    isDarkMode
                      ? "text-gray-400"
                      : "text-gray-600",
                    index === yTicks.length - 1 &&
                      "translate-y-[-100%]", // Shift 0 label up
                  )}
                >
                  {formatNumberCompact(tick)}
                </span>
                {/* Grid Line */}
                {index !== yTicks.length - 1 && ( // Don't draw line for 0 tick
                  <div
                    className={clsx(
                      "h-[1px] w-full border-b border-dashed",
                      isDarkMode
                        ? "border-gray-600"
                        : "border-gray-300",
                    )}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bars Container */}
        <div className="flex flex-1 justify-around items-end relative pb-4 border-b border-gray-300 dark:border-gray-600">
          {data.map((d, i) => {
            const heightPercentage = (d.profit / scale) * 100;
            const isCurrentMonth = i === data.length - 1;

            return (
              <div
                key={d.month}
                className="flex flex-col items-center justify-end h-full w-[4%] mx-2 group relative"
              >
                {/* Bar */}
                <div
                  className={clsx(
                    "w-full rounded-t-sm transition-all duration-500 ease-out",
                    isCurrentMonth
                      ? `bg-[${highlightColor}]`
                      : `bg-[${primaryColor}]`,
                    "shadow-md",
                  )}
                  style={{ height: `${heightPercentage}%` }}
                >
                  {/* Tooltip / Label */}
                  <div
                    className={clsx(
                      "absolute bottom-[100%] left-1/2 transform -translate-x-1/2 mb-1 p-1 rounded bg-gray-700 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                      isCurrentMonth &&
                        "!opacity-100 !bg-[#16A34A] !font-bold", // Always show for current month (Keeping dark tooltip here for bar label contrast)
                    )}
                  >
                    {formatCurrencyPHP(d.profit)}
                  </div>
                </div>
                {/* X-Axis Label */}
                <span
                  className={clsx(
                    "text-xs mt-1 absolute bottom-[-16px]",
                    isDarkMode ? "text-white" : "text-gray-700",
                    isCurrentMonth &&
                      "font-bold text-[#16A34A] dark:text-[#4ade80]",
                  )}
                >
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <div
        className={clsx(
          "mt-6 pt-3 border-t text-sm font-['Poppins:SemiBold',sans-serif]",
          isDarkMode ? "border-gray-700" : "border-gray-200",
        )}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">
            Current Month (Dec) Profit:
          </span>
          <span className="text-[#16A34A] dark:text-[#4ade80]">
            {formatCurrencyPHP(currentProfit)}
          </span>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500 mt-2 font-['Poppins:Regular',sans-serif]">
        **Time Range:** Last 12 Months
      </p>
    </div>
  );
};

// --- 3. TaskBarGraph (Horizontal) ---
const TaskBarGraph: React.FC<{
  data: typeof mockData.cropTasks;
  isDarkMode: boolean;
}> = ({ data, isDarkMode }) => (
  <div className="flex flex-col space-y-3 pt-2">
    <span className="text-xs font-['Poppins:Regular',sans-serif] text-gray-500 text-right pr-4">
      Total Tasks (Max 15)
    </span>
    {data.map((item) => (
      <div key={item.day} className="flex items-center">
        <span className="text-sm w-16 flex-shrink-0 text-gray-600 dark:text-gray-400 font-['Poppins:SemiBold',sans-serif]">
          {item.day}
        </span>
        <div className="flex-grow h-6 bg-gray-200 rounded-full dark:bg-gray-700 ml-2 relative">
          <div
            className="h-full bg-[#65A30D] rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${(item.tasks / 15) * 100}%` }} // Max 15 tasks
          >
            <span className="text-sm font-bold text-white leading-4">
              {item.tasks}
            </span>
          </div>
        </div>
      </div>
    ))}
    <p className="text-xs text-center text-gray-500 mt-2 font-['Poppins:Regular',sans-serif]">
      **Time Range:** Next 4 Working Days
    </p>
  </div>
);

// --- 4. Worker Hours Bar Graph (Unchanged) ---
const WorkerHoursBarGraph: React.FC<{
  data: typeof mockData.workerHours;
}> = ({ data }) => (
  <div className="flex flex-col space-y-3 pt-2">
    <span className="text-xs font-['Poppins:Regular',sans-serif] text-gray-500 text-right pr-4">
      Total Hours (Max 50)
    </span>
    {data.map((item) => (
      <div key={item.worker} className="flex items-center">
        <span className="text-sm w-16 flex-shrink-0 text-gray-600 dark:text-gray-400 font-['Poppins:SemiBold',sans-serif]">
          {item.worker}
        </span>
        <div className="flex-grow h-6 bg-gray-200 rounded-full dark:bg-gray-700 ml-2 relative">
          <div
            className="h-full bg-[#65A30D] rounded-full transition-all duration-500 flex items-center justify-end pr-2" // NEW GREEN
            style={{ width: `${(item.hours / 50) * 100}%` }} // Max 50 hours
          >
            <span className="text-sm font-bold text-white leading-4">
              {item.hours} hrs
            </span>
          </div>
        </div>
      </div>
    ))}
    <p className="text-xs text-center text-gray-500 mt-2 font-['Poppins:Regular',sans-serif]">
      **Time Range:** Current Week Allocation
    </p>
  </div>
);


type DashboardProps = {
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
// --- 6. Main Dashboard Component ---

export default function Dashboard({
  onNavigateToDashboard,
  onNavigateToInventory,
  onNavigateToAttendance,
  onNavigateToSales,
  onNavigateToCrops,
  onNavigateToExpenses,
  onLogout,
}: DashboardProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

 return (
  <div
    className={clsx(
      "flex size-full transition-colors duration-300",
      isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e0e0e0]"
    )}
    data-name="Dashboard"
  >
    {/* Sidebar Container */}
    <div
      className={clsx(
        "relative flex-shrink-0 h-full rounded-[22px] p-4 transition-all duration-300 mx-10 my-10",
        isCollapsed ? "w-[100px]" : "w-[260px]",
        isDarkMode ? "bg-[#2d2d2d]" : "bg-white"
      )}
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Profile Section */}
        <div
          className={clsx(
            "flex items-center mb-8 h-[43px] overflow-hidden transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-start"
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
            "absolute cursor-pointer hover:opacity-70 transition-transform duration-300 top-1/2 -translate-y-1/2",
            isCollapsed
              ? "left-[calc(100%-10px)] rotate-0"
              : "left-[calc(100%-10px)] rotate-180",
            isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e0e0e0]",
            "rounded-full p-2"
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
            isActive
          />
          <SidebarLink
            onClick={onNavigateToInventory}
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

        {/* Footer: Logout & Dark Mode Toggle */}
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
              isCollapsed ? "justify-center px-0" : "justify-center px-5"
            )}
          >
            <button
              onClick={toggleDarkMode}
              className={clsx(
                "h-[40px] w-[73px] flex items-center p-[5px] rounded-full transition-all duration-300 flex-shrink-0",
                isDarkMode ? "bg-[#4a4a4a]" : "bg-[#CCCCCC]"
              )}
            >
              <div
                className={clsx(
                  "size-[30px] rounded-full bg-white transition-transform duration-300 flex items-center justify-center",
                  isDarkMode ? "translate-x-[33px]" : "translate-x-0"
                )}
              >
                <DarkModeIcon isDarkMode={isDarkMode} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
      {/* 2. Main Content Area (BENTO BOX LAYOUT) */}
      <div
        className={clsx(
          "flex-1 min-w-0 h-full rounded-[16px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] overflow-y-auto",
          isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
          "mt-10 mb-10 mr-10 p-8",
        )}
        style={{ height: "calc(100vh - 80px)" }}
      >
        <h1
          className={clsx(
            "text-3xl font-['Poppins:SemiBold',sans-serif] mb-6",
            isDarkMode ? "text-white" : "text-gray-900",
          )}
        >
          Dashboard
        </h1>
        {/* 2.1: Welcome Banner (Height and Color updated) */}
        <div className="bg-[#65A30D] h-[120px] rounded-xl w-full flex items-center p-6 relative overflow-hidden mb-6">
          <div className="z-10">
            <p className="font-['Poppins:Bold',sans-serif] text-[24px] text-white">
              Hello, Sir Bong! 👋
            </p>
            <p className="font-['Poppins:Regular',sans-serif] text-[16px] text-white opacity-90 mt-1">
              Welcome back to Mauswag RecordSync Dashboard.
            </p>
          </div>
          {/* Farmer Image */}
          <div className="absolute right-[-100px] top-[-100px] size-[279px]">
            <img
              alt=""
              className="size-full object-cover opacity-60"
              src={imgFarmer1}
            />
          </div>
        </div>
        {/* 2.2: BENTO BOX GRID LAYOUT (3 columns structure) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {/* LARGE BOX 1: Monthly Profit Bar Graph (Span 2 columns, height auto) */}
          <DashboardCard
            title="Monthly Profit Performance"
            isDarkMode={isDarkMode}
            className="col-span-1 md:col-span-2 row-span-2"
          >
            <MonthlyProfitBarGraph
              data={mockData.monthlyProfit}
              isDarkMode={isDarkMode}
            />
          </DashboardCard>

          {/* SMALL BOX 2: Current Time & Date (Color updated) */}
          <div className="col-span-1 p-4 rounded-xl bg-[#4F8C33] !text-white flex flex-col justify-center shadow-lg min-h-[150px]">
            <p className="text-sm font-['Poppins:Regular',sans-serif] mb-1">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="font-['Poppins:Bold',sans-serif] text-4xl text-[#A6D96E]">
              {formatTime(currentTime)}
            </p>
          </div>

          {/* SMALL BOX 3: Alerts: Low Stock (Span 1 column) */}
          <DashboardCard
            title="Low Stock Alert"
            isDarkMode={isDarkMode}
            className="col-span-1 border-2 border-[#F97316]" // Deep Orange
          >
            {mockData.lowStock.slice(0, 3).map((alert) => (
              <div
                key={alert.name}
                className="flex justify-between text-sm py-1"
              >
                <div>
                  <span className="text-[#F97316] font-bold">
                    🚨 {alert.name}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {alert.type}
                  </p>
                </div>
                <span className="font-bold text-[#F97316]">
                  {alert.stock} left
                </span>
              </div>
            ))}
          </DashboardCard>

          {/* MEDIUM BOX 4: Worker Hours (Span 1 column) */}
          <DashboardCard
            title="Worker Hours Worked (Weekly)"
            isDarkMode={isDarkMode}
            className="col-span-1 row-span-1"
          >
            <WorkerHoursBarGraph data={mockData.workerHours} />
          </DashboardCard>

          {/* MEDIUM BOX 5: Remaining Crop Tasks (Span 1 column) */}
          <DashboardCard
            title="Remaining Crop Tasks by Day"
            isDarkMode={isDarkMode}
            className="col-span-1 row-span-1"
          >
            <TaskBarGraph
              data={mockData.cropTasks}
              isDarkMode={isDarkMode}
            />
          </DashboardCard>

          {/* SMALL BOX 6: Alerts: Overdue Tasks (Span 1 column) */}
          <DashboardCard
            title="Overdue Tasks"
            isDarkMode={isDarkMode}
            className="col-span-1 border-2 border-[#DC2626]" // Red
          >
            {mockData.overdueTasks
              .slice(0, 2)
              .map((alert, index) => (
                <div key={index} className="text-sm py-1">
                  <span className="text-[#DC2626] font-bold">
                    ⚠️ {alert.plant} ({alert.type})
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Planted Date: {alert.plantedDate}
                  </p>
                </div>
              ))}
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}