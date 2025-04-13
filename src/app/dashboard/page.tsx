"use client";

import { useState, useEffect } from "react";

interface IceCream {
  icecreamid: number;
  flavorname: string;
  price: string;
  calories: number;
  icecreamingredients: IceCreamIngredient[];
}

interface IceCreamIngredient {
  icecreamingredientid: number;
  icecreamid: number;
  ingredientid: number;
  quantityneeded: number;
  ingredients: Ingredient;
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
  const [selectedIceCream, setSelectedIceCream] = useState<IceCream | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchIceCreams() {
      try {
        const response = await fetch("/api/icecreams");
        if (!response.ok) throw new Error("Failed to fetch ice cream data");
        const data: IceCream[] = await response.json();
        setIceCreamData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchIceCreams();
  }, []);

  useEffect(() => {
    if (activeTab === "Ingredients") {
      async function fetchIngredients() {
        try {
          const response = await fetch("/api/ingredients");
          if (!response.ok) throw new Error("Failed to fetch ingredients data");
          const data: Ingredient[] = await response.json();
          setIngredientsData(data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchIngredients();
    }
  }, [activeTab]);

  const handleViewIngredients = (iceCream: IceCream) => {
    setSelectedIceCream(iceCream);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIceCream(null);
  };

  const renderModal = () => {
    if (!selectedIceCream) return null;
  
    return (
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden={!showModal}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full ${
          showModal ? "block" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 rounded-t-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ingredients</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseModal}
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal Body */}
          <div className="p-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              {selectedIceCream.flavorname}
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {selectedIceCream.icecreamingredients.map((ingredient) => (
                <li key={ingredient.ingredients.ingredientid}>
                  <p><strong>Name:</strong> {ingredient.ingredients.ingredientname}</p>
                  <p><strong>Quantity Available:</strong> {ingredient.ingredients.quantity}</p>
                  <p><strong>Quantity Needed:</strong> {ingredient.quantityneeded}</p>
                  <p><strong>Last Updated:</strong> {new Date(ingredient.ingredients.lastupdated).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* Modal Footer */}
          <div className="flex items-center p-4 border-t rounded-b-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
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
      <main className="mt-8">
        {activeTab === "Ice Cream" && !selectedIceCream && (
          <div>
            <h1>Ice Creams</h1>
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
                  {iceCreamData.map((iceCream) => (
                    <tr key={iceCream.icecreamid}>
                      <td className="px-6 py-4">{iceCream.flavorname}</td>
                      <td className="px-6 py-4">${Number(iceCream.price).toFixed(2)}</td>
                      <td className="px-6 py-4">{iceCream.calories} cal</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewIngredients(iceCream)}
                          className="text-blue-600 hover:underline"
                        >
                          View Ingredients
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "Ingredients" && (
          <div>
            <h1>Ingredients</h1>
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
                  {ingredientsData.map((ingredient) => (
                    <tr key={ingredient.ingredientid}>
                      <td className="px-6 py-4">{ingredient.ingredientname}</td>
                      <td className="px-6 py-4">{ingredient.quantity}</td>
                      <td className="px-6 py-4">{new Date(ingredient.lastupdated).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {showModal && renderModal()}
      </main>
    </div>
  );
}

