import React from "react";
import { Ingredient } from "@/interfaces/interfaces"; 

interface IngredientTableProps {
  ingredientsData: Ingredient[];
}

const IngredientTable: React.FC<IngredientTableProps> = ({ ingredientsData }) => {
  return (
    <div>
      <button
        
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
            </tr>
          </thead>
          <tbody>
            {ingredientsData.map((ingredient) => (
              <tr key={ingredient.ingredientid} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ingredient.ingredientname}</td>
                <td className="px-6 py-4">{ingredient.quantity}</td>
                <td className="px-6 py-4">{new Date(ingredient.lastupdated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientTable;
