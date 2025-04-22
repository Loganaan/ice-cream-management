import React, { useState } from "react";
import Modal from "@/components/modal";
import { IceCream, Ingredient, IceCreamIngredient } from "@/interfaces/interfaces";

interface AddIceCreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredientsData: Ingredient[];
  handleAddIceCream: (newIceCream: IceCream) => void;
}

const AddIceCreamModal: React.FC<AddIceCreamModalProps> = ({
  isOpen,
  onClose,
  ingredientsData,
  handleAddIceCream,
}) => {
  const [newIceCream, setNewIceCream] = useState<IceCream>({
    icecreamid: 0,
    flavorname: "",
    price: '0',
    calories: 0,
    icecreamingredients: [],
  });

  // Handle ingredient selection
  const handleIngredientSelection = (ingredientId: number) => {
    const selectedIngredient = ingredientsData.find((ingredient) => ingredient.ingredientid === ingredientId);
    if (selectedIngredient) {
      setNewIceCream((prev) => ({
        ...prev,
        icecreamingredients: [
          ...prev.icecreamingredients,
          {
            ingredients: selectedIngredient, // Store full ingredient object
            quantityneeded: 1
          } as IceCreamIngredient,
        ],
      }));
    }
  };
  

  // Handle quantity update
  const handleQuantityChange = (index: number, value: number) => {
    const updatedIngredients = [...newIceCream.icecreamingredients];
    updatedIngredients[index].quantityneeded = value;
    setNewIceCream({ ...newIceCream, icecreamingredients: updatedIngredients });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Ice Cream">
      <label className="block text-sm font-medium text-gray-700">Flavor Name</label>
      <input 
        type="text" 
        value={newIceCream.flavorname} 
        onChange={(e) => setNewIceCream({ ...newIceCream, flavorname: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Price ($)</label>
      <input 
        type="number" 
        step="0.01"
        value={newIceCream.price} 
        onChange={(e) => setNewIceCream({ ...newIceCream, price: String(e.target.value) })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Calories</label>
      <input 
        type="number" 
        value={newIceCream.calories} 
        onChange={(e) => setNewIceCream({ ...newIceCream, calories: Number(e.target.value) })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <h3 className="mt-4 font-semibold">Ingredients</h3>
      {/* Ingredient Selection */}
      <label className="block text-sm font-medium text-gray-700">Select Ingredient:</label>
      <select
        onChange={(e) => handleIngredientSelection(Number(e.target.value))}
        className="w-full mt-1 p-2 border rounded-md"
      >
        <option value="">-- Choose an ingredient --</option>
        {ingredientsData.map((ingredient) => (
          <option key={ingredient.ingredientid} value={ingredient.ingredientid}>
            {ingredient.ingredientname}
          </option>
        ))}
      </select>

      {/* Selected Ingredients */}
      {newIceCream.icecreamingredients.map((ingredient, index) => (
        <div key={ingredient.ingredients.ingredientid} className="mt-2">
          <p className="text-sm font-medium">{ingredient.ingredients.ingredientname}</p>
          <label className="text-sm">Quantity Needed</label>
          <input
            type="number"
            value={ingredient.quantityneeded}
            onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
      ))}

      <button onClick={() => handleAddIceCream(newIceCream)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Add Ice Cream
      </button>
    </Modal>
  );
};

export default AddIceCreamModal;
