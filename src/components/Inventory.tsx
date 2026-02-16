import { useState } from "react";
import clsx from "clsx";

type InventoryPageProps = {
  isDarkMode: boolean;
};

type StockItem = {
  name: string;
  stock: number;
};

type Product = {
  id: number;
  name: string;
  category: string;
  variant: string;
  unit: string;
  measurement: string;
  price: string;
  package: string;
};

// --- UNIFIED Button Class (46px H, 10px R, 14px Text) ---
// This class enforces the strict requirements for button height, radius, and font size.
const UnifiedActionButtonClasses = `
  h-[46px] 
  px-6 
  rounded-[10px] 
  text-[14px] 
  font-['Inter:Regular',sans-serif]
  transition-colors 
  duration-200
  whitespace-nowrap
  flex items-center justify-center
`;

export default function InventoryPage({
  isDarkMode,
}: InventoryPageProps) {
  const [stockSearchQuery, setStockSearchQuery] = useState("");
  const [productSearchQuery, setProductSearchQuery] =
    useState("");

  const stockItems: StockItem[] = [
    { name: "Banana", stock: 0 },
    { name: "Squash", stock: 25 },
    { name: "Carrot", stock: 0 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Banana",
      category: "Fruit",
      variant: "Saba",
      unit: "kg",
      measurement: "10.00",
      price: "₱2000.00",
      package: "Sack",
    },
    {
      id: 2,
      name: "Potato",
      category: "Vegetables",
      variant: "-",
      unit: "kg",
      measurement: "10.00",
      price: "₱2000.00",
      package: "Sack",
    },
    {
      id: 3,
      name: "Apple",
      category: "Fruit",
      variant: "-",
      unit: "kg",
      measurement: "6.00",
      price: "₱2000.00",
      package: "Sack",
    },
  ];

  const filteredStockItems = stockItems.filter((item) =>
    item.name
      .toLowerCase()
      .includes(stockSearchQuery.toLowerCase()),
  );

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(productSearchQuery.toLowerCase()),
  ); // Reusable classes for input fields (ensuring they match the 10px round standard for input consistency)

  const inputClasses = (isDark: boolean) =>
    clsx(
      "w-full px-4 rounded-[10px] border outline-none transition-colors duration-300 h-[46px]",
      isDark
        ? "bg-[#3d3d3d] border-[#4d4d4d] text-white placeholder-gray-400"
        : "bg-[#f5f5f5] border-[#d0d0d0] text-[#282828] placeholder-gray-500",
    );

  return (
    <div className="absolute left-[370px] top-[71px] right-[40px] bottom-[40px] flex flex-col gap-6">
            {/* Header */}     {" "}
      <h1
        className={clsx(
          "text-[32px] transition-colors duration-300",
          isDarkMode ? "text-gray-200" : "text-[#282828]",
        )}
      >
                Inventory Management      {" "}
      </h1>
            {/* Current Stock Summary Section */}     {" "}
      <div
        className={clsx(
          "rounded-[16px] p-6 transition-colors duration-300",
          isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
        )}
      >
               {" "}
        <h2
          className={clsx(
            "text-[20px] mb-4 transition-colors duration-300",
            isDarkMode ? "text-gray-200" : "text-[#282828]",
          )}
        >
                    Current Stock Summary        {" "}
        </h2>
                        {" "}
        {/* Search Bar (UPDATED height/roundness to 46px/10px for consistency) */}
               {" "}
        <input
          type="text"
          placeholder="Search..."
          value={stockSearchQuery}
          onChange={(e) => setStockSearchQuery(e.target.value)}
          className={clsx(inputClasses(isDarkMode), "mb-4")}
        />
                {/* Stock Table */}       {" "}
        <div className="overflow-hidden rounded-lg">
                   {" "}
          <table className="w-full">
                       {" "}
            <thead>
                           {" "}
              <tr className="bg-[#77b254]">
                               {" "}
                <th className="text-left px-4 py-3 text-white">
                  Name
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white">
                  Total Stock
                </th>
                             {" "}
              </tr>
                         {" "}
            </thead>
                       {" "}
            <tbody>
                           {" "}
              {filteredStockItems.map((item, index) => (
                <tr
                  key={index}
                  className={clsx(
                    "border-b transition-colors duration-300",
                    isDarkMode
                      ? "border-[#4d4d4d]"
                      : "border-[#e0e0e0]",
                  )}
                >
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {item.name}             
                       {" "}
                  </td>
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3",
                      item.stock === 0
                        ? "text-[#ff1a1a]"
                        : isDarkMode
                          ? "text-gray-200"
                          : "text-[#282828]",
                    )}
                  >
                                        {item.stock}           
                         {" "}
                  </td>
                                 {" "}
                </tr>
              ))}
                         {" "}
            </tbody>
                     {" "}
          </table>
                 {" "}
        </div>
             {" "}
      </div>
            {/* Product List Section */}     {" "}
      <div
        className={clsx(
          "rounded-[16px] p-6 flex-1 flex flex-col transition-colors duration-300",
          isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
        )}
      >
               {" "}
        <h2
          className={clsx(
            "text-[20px] mb-4 transition-colors duration-300",
            isDarkMode ? "text-gray-200" : "text-[#282828]",
          )}
        >
                    Product List        {" "}
        </h2>
                        {" "}
        {/* Search Bar and Add Product Button */}       {" "}
        <div className="flex gap-3 mb-4">
                   {" "}
          {/* Search Input (UPDATED height/roundness to 46px/10px for consistency) */}
                   {" "}
          <input
            type="text"
            placeholder="Search..."
            value={productSearchQuery}
            onChange={(e) =>
              setProductSearchQuery(e.target.value)
            }
            className={clsx(inputClasses(isDarkMode), "flex-1")}
          />
                             {" "}
          {/* Add Product Button (UPDATED to UNIFIED CLASS) */} 
                 {" "}
          <button
            className={clsx(
              UnifiedActionButtonClasses,
              "bg-[#77b254] hover:bg-[#6aa047] text-white",
            )}
          >
                        Add Product          {" "}
          </button>
                 {" "}
        </div>
                {/* Product Table */}       {" "}
        <div className="overflow-auto flex-1 rounded-lg">
                   {" "}
          <table className="w-full">
                       {" "}
            <thead>
                           {" "}
              <tr className="bg-[#77b254]">
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Name
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Category
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Variant
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Unit
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Measurement
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Price
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Package
                </th>
                               {" "}
                <th className="text-left px-4 py-3 text-white whitespace-nowrap">
                  Action
                </th>
                             {" "}
              </tr>
                         {" "}
            </thead>
                       {" "}
            <tbody>
                           {" "}
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={clsx(
                    "border-b transition-colors duration-300",
                    isDarkMode
                      ? "border-[#4d4d4d]"
                      : "border-[#e0e0e0]",
                  )}
                >
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {product.name}         
                           {" "}
                  </td>
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {product.category}     
                               {" "}
                  </td>
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {product.variant}       
                             {" "}
                  </td>
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {product.unit}         
                           {" "}
                  </td>
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {product.measurement}   
                                 {" "}
                  </td>
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {product.price}         
                           {" "}
                  </td>
                                   {" "}
                  <td
                    className={clsx(
                      "px-4 py-3 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-200"
                        : "text-[#282828]",
                    )}
                  >
                                        {product.package}       
                             {" "}
                  </td>
                                   {" "}
                  <td className="px-4 py-3">
                                       {" "}
                    {/* Edit Button (UPDATED to UNIFIED CLASS) */}
                                       {" "}
                    <button
                      className={clsx(
                        UnifiedActionButtonClasses,
                        "px-4", // Use px-4 for smaller width in table
                        isDarkMode
                          ? "bg-[#4d4d4d] hover:bg-[#5d5d5d] text-gray-200"
                          : "bg-[#d0d0d0] hover:bg-[#c0c0c0] text-[#282828]",
                      )}
                    >
                                            Edit                
                         {" "}
                    </button>
                                     {" "}
                  </td>
                                 {" "}
                </tr>
              ))}
                         {" "}
            </tbody>
                     {" "}
          </table>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
}