import { useState } from "react";

import Login from "./imports/Login";

import Dashboard from "./imports/Dashboard-5-1487";

import InventoryManagementModule from "./imports/InventoryManagementModule";

import Attendance from "./components/Attendance";

import SalesManagement from "./components/SalesManagement";

import CropManagement from "./components/CropManagement";

import ExpenseManagement from "./components/ExpenseManagement";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentPage, setCurrentPage] = useState<
    | "dashboard"
    | "inventory"
    | "attendance"
    | "sales"
    | "crops"
    | "expenses"
  >("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);

    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    setCurrentPage("dashboard");
  };

  const navigateToAttendance = () => {
    setCurrentPage("attendance");
  };

  const navigateToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const navigateToInventory = () => {
    setCurrentPage("inventory");
  };

  const navigateToSales = () => {
    setCurrentPage("sales");
  };

  const navigateToCrops = () => {
    setCurrentPage("crops");
  };

  const navigateToExpenses = () => {
    setCurrentPage("expenses");
  };

  return (
    <div className="min-h-screen w-full">
      {isLoggedIn ? (
        <>
          {currentPage === "inventory" && (
            <InventoryManagementModule // 🌟 CHANGE THIS LINE
              // REMOVE the redundant currentPage="inventory" prop
              onLogout={handleLogout}
              onNavigateToAttendance={navigateToAttendance}
              onNavigateToInventory={navigateToInventory}
              onNavigateToDashboard={navigateToDashboard}
              onNavigateToSales={navigateToSales}
              onNavigateToCrops={navigateToCrops}
              onNavigateToExpenses={navigateToExpenses}
            />
          )}
          {currentPage === "attendance" && (
            <Attendance
              onLogout={handleLogout}
              onNavigateToDashboard={navigateToDashboard}
              onNavigateToInventory={navigateToInventory}
              onNavigateToSales={navigateToSales}
              onNavigateToCrops={navigateToCrops}
              onNavigateToExpenses={navigateToExpenses}
            />
          )}

          {currentPage === "dashboard" && (
            <Dashboard
              currentPage="dashboard"
              onLogout={handleLogout}
              onNavigateToAttendance={navigateToAttendance}
              onNavigateToInventory={navigateToInventory}
              onNavigateToDashboard={navigateToDashboard}
              onNavigateToSales={navigateToSales}
              onNavigateToCrops={navigateToCrops}
              onNavigateToExpenses={navigateToExpenses}
            />
          )}
          {currentPage === "sales" && (
            <SalesManagement
              onLogout={handleLogout}
              onNavigateToDashboard={navigateToDashboard}
              onNavigateToInventory={navigateToInventory}
              onNavigateToAttendance={navigateToAttendance}
              onNavigateToCrops={navigateToCrops}
              onNavigateToExpenses={navigateToExpenses}
            />
          )}

          {currentPage === "crops" && (
            <CropManagement
              onLogout={handleLogout}
              onNavigateToDashboard={navigateToDashboard}
              onNavigateToInventory={navigateToInventory}
              onNavigateToAttendance={navigateToAttendance}
              onNavigateToSales={navigateToSales}
              onNavigateToExpenses={navigateToExpenses}
            />
          )}

          {currentPage === "expenses" && (
            <ExpenseManagement
              onLogout={handleLogout}
              onNavigateToDashboard={navigateToDashboard}
              onNavigateToInventory={navigateToInventory}
              onNavigateToAttendance={navigateToAttendance}
              onNavigateToSales={navigateToSales}
              onNavigateToCrops={navigateToCrops}
            />
          )}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}