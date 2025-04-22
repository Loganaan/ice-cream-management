import React from "react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["Ice Cream", "Ingredients", "Orders"];

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {tabs.map((tab) => (
        <li key={tab} className="me-2">
          <button
            onClick={() => setActiveTab(tab)}
            className={`inline-block p-4 rounded-t-lg ${
              activeTab === tab
                ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabNavigation;
