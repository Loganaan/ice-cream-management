import React, { useState } from "react";
import { Ingredient } from "@/interfaces/interfaces";

interface IngredientTableProps {
  ingredientsData: Ingredient[];
  openAddIngredientModal: () => void;
  refreshIngredientData: () => Promise<void>;
  openEditModal: (ingredient: Ingredient) => void;
  toggleIngredientMenu: (ingredientId: number) => void;
  menuVisible: number | null;
}

const IngredientTable: React.FC<IngredientTableProps> = ({
  ingredientsData,
  openAddIngredientModal,
  refreshIngredientData,
  openEditModal,
  toggleIngredientMenu,
  menuVisible,
}) => {

  // Handle Delete action
  const handleDelete = async (ingredient: Ingredient) => {
    const response = await fetch(`/api/ingredients/${ingredient.ingredientid}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Ingredient deleted successfully.");
      refreshIngredientData(); // Refresh data after deletion
    } else {
      console.error("Failed to delete ingredient.");
    }
  };

  return (
    <div>
      <button
        onClick={openAddIngredientModal}
        className="py-2.5 px-5 mb-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        Add Ingredient
      </button>

      <h1 className="text-lg font-semibold mb-4">Ingredients</h1>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Ingredient</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Last Updated</th>
              <th scope="col" className="px-6 py-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {ingredientsData.map((ingredient) => (
              <tr key={ingredient.ingredientid} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ingredient.ingredientname}
                </td>
                <td className="px-6 py-4">{ingredient.quantity}</td>
                <td className="px-6 py-4">{new Date(ingredient.lastupdated).toLocaleDateString()}</td>
                <td className="relative px-6 py-4">
                  <button
                    onClick={() => toggleIngredientMenu(ingredient.ingredientid)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &#x22EE;
                  </button>
                  {menuVisible === ingredient.ingredientid && (
                    <div className="absolute z-10 left-8 -mt-14 w-30 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <button
                        onClick={() => openEditModal(ingredient)}
                        className="block w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ingredient)}
                        className="block w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientTable;
