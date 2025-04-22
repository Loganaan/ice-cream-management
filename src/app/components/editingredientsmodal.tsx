import React from "react";
import Modal from "@/components/modal";
import { Ingredient } from "@/interfaces/interfaces";

interface EditIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
  setIngredient: (updatedIngredient: Ingredient) => void;
  handleSaveIngredientEdit: () => void;
}

const EditIngredientModal: React.FC<EditIngredientModalProps> = ({
  isOpen,
  onClose,
  ingredient,
  setIngredient,
  handleSaveIngredientEdit,
}) => {
  if (!ingredient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Ingredient">
      <label className="block text-sm font-medium text-gray-700">Ingredient Name</label>
      <input 
        type="text" 
        value={ingredient.ingredientname} 
        onChange={(e) => setIngredient({ ...ingredient, ingredientname: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Quantity</label>
      <input 
        type="number" 
        value={ingredient.quantity} 
        onChange={(e) => setIngredient({ ...ingredient, quantity: Number(e.target.value) })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <button onClick={handleSaveIngredientEdit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save
      </button>
    </Modal>
  );
};

export default EditIngredientModal;
