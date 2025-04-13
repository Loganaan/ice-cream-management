"use client";

import { useState, useEffect } from "react";

interface IceCream {
  icecreamid: number;
  flavorname: string;
  price: number;
  calories: number;
}

interface Ingredient {
  ingredientid: number;
  ingredientname: string;
  quantity: number;
  lastupdated: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Ice Cream");
  const [iceCreamData, setIceCreamData] = useState<IceCream[]>([]);
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Ice Cream data
        const iceCreamResponse = await fetch("/api/icecreams");
        if (!iceCreamResponse.ok) throw new Error("Failed to fetch ice cream data");
        const iceCreamResult: IceCream[] = await iceCreamResponse.json();
        setIceCreamData(iceCreamResult);

        // Fetch Ingredients data
        const ingredientsResponse = await fetch("/api/ingredients");
        if (!ingredientsResponse.ok) throw new Error("Failed to fetch ingredients data");
        const ingredientsResult: Ingredient[] = await ingredientsResponse.json();
        setIngredientsData(ingredientsResult);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  const renderContent = () => {
    switch (activeTab) {
      case "Ice Cream":
        return (
          <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Flavor</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Calories</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {iceCreamData.map((item) => (
                  <tr
                    key={item.icecreamid}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.flavorname}
                    </th>
                    <td className="px-6 py-4">${Number(item.price).toFixed(2)}</td>
                    <td className="px-6 py-4">{item.calories} cal</td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Ingredients":
        return (
          <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Ingredient</th>
                  <th scope="col" className="px-6 py-3">Quantity</th>
                  <th scope="col" className="px-6 py-3">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {ingredientsData.map((item) => (
                  <tr
                    key={item.ingredientid}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.ingredientname}
                    </th>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{new Date(item.lastupdated).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Dashboard":
        return <p>Dashboard content goes here.</p>;
      case "Settings":
        return <p>Settings content goes here.</p>;
      case "Contacts":
        return <p>Contacts content goes here.</p>;
      default:
        return <p>Invalid tab</p>;
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      {/* Navbar */}
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {["Ice Cream", "Ingredients", "Dashboard", "Settings", "Contacts"].map((tab) => (
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

      {/* Tab Content */}
      <main className="mt-8">{renderContent()}</main>
    </div>
  );
}
