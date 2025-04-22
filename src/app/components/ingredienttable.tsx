import React from "react";
import { Ingredient } from "@/interfaces/interfaces"; 

interface IngredientTableProps {
  ingredientsData: Ingredient[];
}

const IngredientTable: React.FC<IngredientTableProps> = ({ ingredientsData }) => {
  return (
    <div>
      <h1>Ingredients</h1>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {ingredientsData.map((ingredient) => (
              <tr key={ingredient.ingredientid}>
                <td>{ingredient.ingredientname}</td>
                <td>{ingredient.quantity}</td>
                <td>{new Date(ingredient.lastupdated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientTable;
