import svgPathsDtr from "../imports/svg-zdoyguif4t";

import { Calendar, ArrowLeft } from "lucide-react";

import React, { useState } from "react";
import clsx from 'clsx'; // This fixes the error in your screenshot


type AttendanceContentProps = {

  isDarkMode?: boolean;

};



// --- View Types ---

type ViewType = "table" | "calendar" | "dtrSummary";



// --- Data Structures ---

interface AttendanceRecord {

    name: string;

    date: string; // e.g., "May 18, 2023 at 8:00 am"

    status: "IN" | "OUT";

    role: string;

}



interface DtrEntry {

    time: string; // e.g., "8:00 am" or "11:59 am"

    status: "IN" | "OUT";

}



interface DtrSummaryEntry {

    employeeName: string;

    role: string;

    entries: DtrEntry[];

    totalHours: string;

}



interface DayDtrSummary {

    date: string; // e.g., "May 18, 2023"

    employeeSummaries: DtrSummaryEntry[];

}



// --- Reusable Button Components (Unchanged) ---

const ActionButton: React.FC<React.PropsWithChildren<{

    onClick: () => void;

    className?: string;

}>> = ({ children, onClick, className }) => (

    <button

        onClick={onClick}

        className={`bg-[#77b254] border border-[#4caf50] h-[46px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[164px] transition duration-200 hover:bg-[#65A30D] ${className || ""}`}

    >

        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[14px] text-center text-white">

            {children}

        </p>

    </button>

);


// 1. Add 'style?: React.CSSProperties' to the type definition
const ViewToggleButton: React.FC<React.PropsWithChildren<{
    isActive: boolean;
    isDarkMode: boolean;
    onClick: () => void;
}>> = ({ children, isActive, isDarkMode, onClick }) => {

    return (
        <button
            onClick={onClick}
            className={clsx(
                "px-4 py-2 rounded-md border transition-all duration-200 font-['Poppins:Medium',sans-serif]",
                isActive 
                    ? "shadow-inner scale-[0.98]" 
                    : "shadow-sm hover:opacity-90"
            )}
            style={{
                // ACTIVE (Selected) = Light Green (#6a9f4b)
                // INACTIVE (Not Selected) = Dark Green (#3f5e2d)
                backgroundColor: isActive ? "#3f5e2d" : "#6a9f4b",
                
                // Border matches the background color logic
                borderColor: isActive ? "#3f5e2d" : "#6a9f4b",

                // Text: Stays White for best readability on these greens
                color: "#ffffff"
            }}
        >
            {children}
        </button>
    );
};


// --- Daily Time Record Summary Component (Updated Back Button) ---



const DailyTimeRecordSummary: React.FC<{

    summary: DayDtrSummary;

    onBack: () => void;

}> = ({ summary, onBack }) => {



    const DTRCardRow: React.FC<{ employee: DtrSummaryEntry }> = ({ employee }) => {

        

        const TimeBadge: React.FC<{ time: string; status: "IN" | "OUT" }> = ({ time, status }) => {

            const isIN = status === "IN";

            const colorClasses = isIN 

                ? "bg-green-400/80 text-green-900" 

                : "bg-red-300/80 text-red-900"; 

                

            return (

                <div className={`rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap ${colorClasses}`}>

                    <span className="opacity-90">{status}:</span> {time}

                </div>

            );

        };

        

        const roleClasses = "bg-gray-400/80 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap";

        const totalHoursClasses = "bg-gray-500/80 text-white rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap";



        return (

            <div className="flex items-center justify-between p-3 my-2 border border-green-500/50 rounded-lg bg-green-50/50">

                

                {/* Employee Name */}

                <h3 className="text-lg font-bold text-green-700 min-w-[150px] whitespace-nowrap mr-4">

                    {employee.employeeName}

                </h3>



                <div className="flex items-center space-x-3 flex-grow justify-end">

                    

                    {/* Role */}

                    <div className={roleClasses}>Role: {employee.role}</div>



                    {/* Time Entries */}

                    {employee.entries.map((entry, index) => (

                        <TimeBadge key={index} time={entry.time} status={entry.status} />

                    ))}

                    

                    {/* Total Hours */}

                    <div className={totalHoursClasses}>Total hours: {employee.totalHours}</div>

                </div>

            </div>

        );

    };



    return (

        <div className="w-full">

            {/* Header Area */}

            <div className="flex justify-between items-center mb-6 p-4 rounded-t-xl bg-gray-200/50">

                <h2 className="text-2xl font-bold text-black">

                    DTR for {summary.date}

                </h2>
<button 
    onClick={onBack} 
    className="px-4 py-2 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition duration-200 hover:opacity-90 flex items-center font-['Poppins:Medium',sans-serif]"
    style={{
        backgroundColor: "#3f5e2d", // Static Dark Green
        color: "#ffffff"           // Static White Text
    }}
>
    Back to calendar
</button>

            </div>



            {/* DTR Cards List */}

            <div className="space-y-3 p-4 bg-gray-100/50 rounded-b-xl shadow-inner">

                {summary.employeeSummaries.map((employee, index) => (

                    <DTRCardRow key={index} employee={employee} />

                ))}

            </div>

        </div>

    );

};



// --- UPDATED Calendar View Component ---



const CalendarView: React.FC<{ 

    isDarkMode: boolean; 

    onEmployeeClick: (date: string) => void;

}> = ({ isDarkMode, onEmployeeClick }) => {

    

    // Day names 

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    

    // Date layout for May 2023 (Starts on Monday, so two days are previous month)

    const monthDates = [

        { date: 29, isCurrentMonth: false }, // Apr

        { date: 30, isCurrentMonth: false, isActiveBar: true }, // Apr (Active Bar Example)

        { date: 1 },

        { date: 2 },

        { date: 3 },

        { date: 4 },

        { date: 5 },

        { date: 6 },

        { date: 7 },

        { date: 8 },

        { date: 9 },

        { date: 10 },

        { date: 11 },

        { date: 12 },

        { date: 13 },

        { date: 14 },

        { date: 15, isSelected: true }, // Example Selected Day

        { date: 16 },

        { date: 17 },

        { date: 18, isDTRDay: true }, // Highlighted DTR Day

        { date: 19 },

        { date: 20 },

        { date: 21 },

        { date: 22 },

        { date: 23 },

        { date: 24 },

        { date: 25 },

        { date: 26 },

        { date: 27 },

        { date: 28 },

        { date: 29 },

        { date: 30 },

        { date: 31 },

        { date: 13, isCurrentMonth: false }, // Jun

        { date: 13, isCurrentMonth: false }, // Jun

    ];



    // Data for DTR names to display on May 18th

    const dtrNamesMay18 = ["Bong Avicenna", "Juan Dela Cruz", "Rey Avicenna"];

    

    const backgroundClass = isDarkMode ? "bg-[#3a3a3a]" : "bg-white";

    const textColor = isDarkMode ? "text-white" : "text-black";



    const renderCalendarDay = (day: typeof monthDates[0]) => {

        

        const isSelected = day.isSelected;

        const isDTRDay = day.isDTRDay;

        const dateString = `May ${day.date}, 2023`;



        const dateClasses = `font-semibold text-center rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 

            ${day.isCurrentMonth === false ? "text-gray-400" : textColor}

            ${isSelected ? "bg-black text-white" : (isDarkMode ? "hover:bg-[#555]" : "hover:bg-gray-100")}`;

            

        return (

            <div 

                key={day.date + (day.isCurrentMonth === false ? "next" : "curr")}

                className={`w-full aspect-square p-2 text-sm flex flex-col items-end relative transition-colors duration-300 

                    ${isDarkMode ? "border-gray-700/50" : "border-gray-100"}`}

            >

                {/* Date Number */}

                <div className={dateClasses}>

                    {day.date}

                </div>

                

                {/* Active Bar (e.g., May 30 from screenshot) */}

                {day.isActiveBar && (

                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-2 bg-green-300/80 rounded"></div>

                )}

                

                {/* DTR Employee Names (May 18) */}

                {isDTRDay && (

                    <div className="absolute top-8 left-0 right-0 p-1 space-y-0.5 text-xs">

                        {dtrNamesMay18.map((name) => (

                            <button

                                key={name}

                                onClick={() => onEmployeeClick(dateString)} // Click the name to launch the summary

                                className="w-full text-left px-1 py-0.5 bg-green-300/80 text-green-900 rounded hover:bg-green-400 transition-colors duration-150"

                            >

                                {name}

                            </button>

                        ))}

                    </div>

                )}

            </div>

        );

    };



    return (

        <div className={`w-full p-6 rounded-[16px] shadow-xl transition-colors duration-300 ${backgroundClass}`}>

            

            {/* Header: Month and Year, Navigation */}

            <div className="flex justify-between items-center mb-6">

                <h2 className={`text-3xl font-light ${textColor}`}>

                    <span className="font-semibold">May</span> 2023

                </h2>

                <div className="flex space-x-2 text-gray-500">
 
                    <button className={`p-2 rounded-full transition-colors duration-200 ${isDarkMode ? "hover:bg-[#555]" : "hover:bg-gray-200"}`}> 

                        <ArrowLeft size={20} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />

                    </button>

                    <button className={`p-2 rounded-full transition-colors duration-200 ${isDarkMode ? "hover:bg-[#555]" : "hover:bg-gray-200"}`}>

                        <ArrowLeft size={20} className={isDarkMode ? "text-gray-400" : "text-gray-600"} style={{ transform: 'rotate(180deg)' }} />

                    </button>

                </div>

            </div>



            {/* Day Labels */}

            <div className="grid grid-cols-7 text-center text-sm mb-2 font-medium">

                {dayLabels.map(day => (

                    <div key={day} className={`py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{day}</div>

                ))}

            </div>



            {/* Dates Grid */}

            <div className="grid grid-cols-7 border-t border-l">

                {monthDates.map(day => (

                    <div 

                        key={day.date + (day.isCurrentMonth === false ? "next" : "curr")}

                        className={`border-r border-b h-24 ${isDarkMode ? "border-gray-700" : "border-gray-200"} hover:bg-opacity-80`}

                    >

                        {renderCalendarDay(day)}

                    </div>

                ))}

            </div>

        </div>

    );

};





// --- Attendance Data ---

// Detailed DTR summary data for the day (May 18, 2023)

const may18Summary: DayDtrSummary = {

    date: "May 18, 2023",

    employeeSummaries: [

        {

            employeeName: "JUAN DELA CRUZ",

            role: "Employee",

            entries: [

                { time: "8:00 am", status: "IN" },

                { time: "11:59 am", status: "OUT" },

                { time: "1:00 pm", status: "IN" },

                { time: "5:01 pm", status: "OUT" },

            ],

            totalHours: "8 hrs",

        },

        {

            employeeName: "BONG AVICENNA",

            role: "CEO",

            entries: [

                { time: "8:00 am", status: "IN" },

                { time: "11:59 am", status: "OUT" },

                { time: "1:00 pm", status: "IN" },

                { time: "6:01 pm", status: "OUT" },

            ],

            totalHours: "9 hrs",

        },

        {

            employeeName: "REY AVICENNA",

            role: "Admin",

            entries: [

                { time: "8:00 am", status: "IN" },

                { time: "11:59 am", status: "OUT" },

                { time: "1:00 pm", status: "IN" },

                { time: "3:01 pm", status: "OUT" },

            ],

            totalHours: "5 hrs",

        },

    ],

};



const attendanceData: AttendanceRecord[] = [

    { name: "Bong Avicenna", date: "May 18, 2023 at 8:00 am", status: "IN", role: "CEO" },

    { name: "Paul Barrera", date: "May 18, 2023 at 8:00 am", status: "IN", role: "Developer" },

    { name: "Juan Dela Cruz", date: "May 18, 2023 at 8:00 am", status: "IN", role: "Admin/Manager" },

    { name: "Juan Dela Cruz", date: "May 18, 2023 at 11:59 am", status: "OUT", role: "Developer" },

    { name: "Andrea Torres", date: "May 18, 2023 at 8:00 am", status: "IN", role: "Marketing" },

    { name: "Michael V.", date: "May 18, 2023 at 11:59 am", status: "OUT", role: "Developer" },

    { name: "Jane Doe", date: "May 19, 2023 at 8:00 am", status: "IN", role: "CEO" },

    { name: "Richard Gomez", date: "May 19, 2023 at 8:00 am", status: "IN", role: "Admin/Manager" },

    { name: "Luzviminda Ramos", date: "May 19, 2023 at 11:59 am", status: "OUT", role: "HR Specialist" },

    { name: "Jose Santos", date: "May 19, 2023 at 8:00 am", status: "IN", role: "Sales" },

    { name: "Maria Garcia", date: "May 19, 2023 at 11:59 am", status: "OUT", role: "Sales" },

];





// --- Main Component ---

export default function AttendanceContent({

  isDarkMode = false,

}: AttendanceContentProps) {

    const [searchQuery, setSearchQuery] = useState("");

    const [startDate, setStartDate] = useState("");

    const [endDate, setEndDate] = useState("");

    const [activeView, setActiveView] = useState<ViewType>("calendar"); // Start in Calendar View

    const [activeDaySummary, setActiveDaySummary] = useState<DayDtrSummary | null>(null);



    const handleClearFilters = () => {

        setSearchQuery("");

        setStartDate("");

        setEndDate("");

    };



    const handleExportCsv = () => {

        alert("Exporting CSV data...");

    };

    

    // Function to handle click from the Calendar view

    const handleCalendarEmployeeClick = (dateString: string) => {

        // Assume this function fetches the DTR summary for the given date

        if (dateString.includes("May 18, 2023")) {

            setActiveDaySummary(may18Summary);

            setActiveView("dtrSummary");

        } else {

            alert(`DTR summary not available for ${dateString} in this example.`);

        }

    };



    const renderContent = () => {

        if (activeView === "dtrSummary" && activeDaySummary) {

            return (

                <DailyTimeRecordSummary 

                    summary={activeDaySummary} 

                    onBack={() => setActiveView("calendar")} 

                />

            );

        }



        if (activeView === "calendar") {

            return <CalendarView isDarkMode={isDarkMode} onEmployeeClick={handleCalendarEmployeeClick} />;

        }



        // Default to Table View

        return (

            <div className="w-full">

                {/* Table Header */}

                <div

                    className={`grid grid-cols-4 border-b pb-2 mb-2 sticky top-0 transition-colors duration-300 ${isDarkMode ? "border-[#444] bg-[#2d2d2d]" : "border-slate-200 bg-white"}`}

                >

                    <p className={`font-['Noto_Sans:Regular',sans-serif] text-[16px] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>Name</p>

                    <p className={`font-['Noto_Sans:Regular',sans-serif] text-[16px] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>Date & Time</p>

                    <p className={`font-['Noto_Sans:Regular',sans-serif] text-[16px] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>Status</p>

                    <p className={`font-['Noto_Sans:Regular',sans-serif] text-[16px] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>Roles</p>

                </div>



                {/* Table Rows (No longer clickable to view DTR summary) */}

                {attendanceData.map((row, index) => (

                    <div

                        key={index}

                        className={`grid grid-cols-4 py-3 border-b items-center transition-colors duration-300 ${isDarkMode ? "border-[#444]" : "border-slate-200"}`}

                    >

                        <p className={`font-['Poppins:Regular',sans-serif] text-[16px] font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>{row.name}</p>

                        <p className={`font-['Poppins:Regular',sans-serif] text-[16px] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>{row.date}</p>

                        <p className={`font-['Noto_Sans:Regular',sans-serif] text-[14px] ${row.status === "IN" ? "text-green-600" : "text-rose-600"}`}>{row.status}</p>

                        <p className={`font-['Noto_Sans:Regular',sans-serif] text-[14px] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>{row.role}</p>

                    </div>

                ))}

            </div>

        );

    };





    // Only show view toggles when not in the DTR summary screen

    const showViewToggles = activeView !== "dtrSummary";

    

    // Hide CSV Upload area if not in table view

    const showCsvUpload = activeView === 'table';





    return (

        <div className="size-full">

            <div

                className={`min-h-full rounded-[16px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.1)] w-full p-8 transition-colors duration-300 ${isDarkMode ? "bg-[#2d2d2d]" : "bg-white"}`}

            >

                

                {/* 🧭 Top Action and View Toggle Row (Hidden in DTR Summary View) */}

                {showViewToggles && (

                    <div className="flex gap-[10px] mb-8">

                        

                        {/* TABLE VIEW Toggle */}

                        <ViewToggleButton

                            isActive={activeView === "table"} 

                            isDarkMode={isDarkMode}

                            onClick={() => setActiveView("table")}
                            

                        >

                            Table View
                        </ViewToggleButton>

                        

                        {/* CALENDAR VIEW Toggle */}

                        <ViewToggleButton

                            isActive={activeView === "calendar"} 

                            isDarkMode={isDarkMode}

                            onClick={() => setActiveView("calendar")}

                        >

                            Calendar View

                        </ViewToggleButton>



                        {/* EXPORT CSV Button */}

                        <ActionButton onClick={handleExportCsv} className="w-[164px]">

                            Export CSV

                        </ActionButton>

                    </div>

                )}



                {/* Filters Row (Hidden in DTR Summary View or Calendar View) */}

                {activeView === "table" && (

                    <div className="flex flex-wrap items-end gap-5 mb-8">

                        {/* Search Bar (Unchanged) */}

                        <div>

                            <p className={`h-7 font-['Poppins:Regular',sans-serif] leading-[normal] text-[14px] mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"} invisible`}>Search label</p>

                            <div

                                className={`border-2 h-[46px] rounded-[10px] w-[280px] flex items-center px-4 transition-colors duration-300 ${isDarkMode ? "bg-[#3a3a3a] border-[rgba(255,255,255,0.2)]" : "bg-[#f0f0f0] border-[rgba(40,40,40,0.2)]"}`}

                            >

                                <svg

                                    width="25"

                                    height="23"

                                    viewBox="0 0 25 23"

                                    fill="none"

                                    className="mr-3 flex-shrink-0"

                                >

                                    <path

                                        d={svgPathsDtr.p15968380}

                                        fill={

                                            isDarkMode

                                                ? "rgba(255,255,255,0.5)"

                                                : "#282828"

                                        }

                                        fillOpacity={isDarkMode ? "1" : "0.5"}

                                    />

                                </svg>

                                <input

                                    type="text"

                                    placeholder="Search..."

                                    className={`bg-transparent border-none outline-none font-['Poppins:Regular',sans-serif] text-[16px] w-full transition-colors duration-300 ${isDarkMode ? "text-white placeholder:text-[rgba(255,255,255,0.5)]" : "text-[rgba(40,40,40,0.5)] placeholder:text-[rgba(40,40,40,0.5)]"}`}

                                    value={searchQuery}

                                    onChange={(e) => setSearchQuery(e.target.value)}

                                />

                            </div>

                        </div>



                        {/* Start date label and input (Unchanged) */}

                        <div>

                            <p className={`font-['Poppins:Regular',sans-serif] leading-[normal] text-[14px] mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>Start date</p>

                            <div

                                className={`border h-[46px] rounded-[10px] w-[141px] flex items-center justify-between px-4 transition-colors duration-300 ${isDarkMode ? "bg-[#3a3a3a] border-[#555]" : "bg-white border-black"}`}

                            >

                                <input

                                    type="date"

                                    className={`bg-transparent border-none outline-none font-['Poppins:Regular',sans-serif] text-[14px] w-full transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}

                                    value={startDate}

                                    onChange={(e) => setStartDate(e.target.value)}

                                />

                                <Calendar

                                    size={16}

                                    className={`flex-shrink-0 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-[#59587E]"}`}

                                />

                            </div>

                        </div>



                        {/* End date label and input (Unchanged) */}

                        <div>

                            <p className={`font-['Poppins:Regular',sans-serif] leading-[normal] text-[14px] mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>End date</p>

                            <div

                                className={`border h-[46px] rounded-[10px] w-[141px] flex items-center justify-between px-4 transition-colors duration-300 ${isDarkMode ? "bg-[#3a3a3a] border-[#555]" : "bg-white border-black"}`}

                            >

                                <input

                                    type="date"

                                    className={`bg-transparent border-none outline-none font-['Poppins:Regular',sans-serif] text-[14px] w-full transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}

                                    value={endDate}

                                    onChange={(e) => setEndDate(e.target.value)}

                                />

                                <Calendar

                                    size={16}

                                    className={`flex-shrink-0 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-[#59587E]"}`}

                                />

                            </div>

                        </div>



                        {/* CLEAR FILTER Button (Unchanged) */}

                        <div>

                            <p className={`h-7 font-['Poppins:Regular',sans-serif] leading-[normal] text-[14px] mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"} invisible`}>Clear Filter label</p>

                            <button

                                className="bg-[#ee5b5b] h-[46px] px-[30px] py-[11px] rounded-[10px] w-[180px] flex justify-center items-center"

                                onClick={handleClearFilters}

                            >

                                <p className="font-['Poppins:Regular',sans-serif] text-[16px] text-white">

                                    Clear Filter

                                </p>

                            </button>

                        </div>

                    </div>

                )}



                {/* ⏫ Conditional CSV Upload Area (Only visible for Table View) */}

                {showCsvUpload && (

                    <div

                        className={`border rounded-[8px] w-full mb-8 transition-colors duration-300 ${isDarkMode ? "bg-[rgba(255,255,255,0.05)] border-[#444]" : "bg-[rgba(243,245,247,0.3)] border-slate-200"}`}

                    >

                        <div className={clsx(
                                                    "relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors",
                                                    isDarkMode ? "bg-[#2d2d2d] border-[#555]" : "bg-gray-50 border-[#d0d0d0]",
                                                    "hover:border-[#b8d4a8]" 
                                                )}>
                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                                    <svg

                                    width="28"

                                    height="28"

                                    viewBox="0 0 28 28"

                                    fill="none"

                                >  

                                    <path

                                        clipRule="evenodd"

                                        d={svgPathsDtr.p235f4400}

                                        fill={isDarkMode ? "#888" : "#4A4A4A"}

                                        fillRule="evenodd"

                                    />

                                </svg>

                                                    <p className="text-[10px] text-gray-400 text-center font-['Poppins:Medium']">Drop CSV File Here</p>
                                                </div>

                    </div>

                )}

                

                {/* Content Area - Renders Table, Calendar, or DTR Summary */}

                {renderContent()}



            </div>

        </div>

    );

}