import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderStatusX = () => {
  const [selectedTab, setSelectedTab] = useState("All Orders");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const statuses = [
    { name: "All Orders", count: 48 },
    { name: "Pending", count: 0 },
    { name: "On Hold", count: 7 },
    { name: "Approved", count: 5 },
    { name: "Processing", count: 0 },
    { name: "Shipped", count: 0 },
    { name: "In-Transit", count: 8 },
    { name: "Delivered", count: 7 },
    { name: "Flagged", count: 0 },
    { name: "Cancelled", count: 21 },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  // Set the selected tab from the URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    if (tabFromUrl) {
      setSelectedTab(tabFromUrl);
    }
  }, [location]);

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
    // Update the URL with the new tab
    navigate(`?tab=${tabName}`);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Desktop / Larger screens */}
      <div className="hidden md:flex items-center bg-white shadow-lg p-2 rounded-full w-full max-w-3xl">
        {statuses.map((status, index) => (
          <div key={index} className="relative z-10">
            <input
              type="radio"
              id={`tab-${status.name}`}
              name="tabs"
              checked={selectedTab === status.name}
              onChange={() => handleTabChange(status.name)}
              className="hidden"
            />
            <label
              htmlFor={`tab-${status.name}`}
              className={`flex items-center justify-center w-48 h-14 text-lg font-medium cursor-pointer transition-colors rounded-full ${
                selectedTab === status.name ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{status.name}</span>
                <span
                  className={`ml-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    selectedTab === status.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {status.count}
                </span>
              </div>
            </label>
          </div>
        ))}
        <span
          className="absolute h-14 w-48 bg-gray-200 rounded-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${statuses.findIndex(
              (status) => status.name === selectedTab
            ) * 100}%)`,
          }}
        ></span>
      </div>

      {/* Mobile / Small screens */}
      <div className="md:hidden w-full">
        <button
          onClick={toggleDropdown}
          className="w-full bg-white border border-gray-300 text-gray-600 p-2 rounded-full"
        >
          {selectedTab} <span className="ml-2">▼</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute w-full bg-white shadow-md rounded-lg mt-1">
            {statuses.map((status, index) => (
              <div key={index} className="cursor-pointer p-2 text-gray-600 hover:bg-gray-100">
                <div
                  onClick={() => handleTabChange(status.name)}
                  className={`flex items-center justify-between ${
                    selectedTab === status.name ? "font-semibold text-blue-600" : ""
                  }`}
                >
                  <span>{status.name}</span>
                  <span
                    className={`ml-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      selectedTab === status.name
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {status.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusX;
