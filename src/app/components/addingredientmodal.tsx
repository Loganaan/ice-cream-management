import React, { useState } from "react";
import Modal from "@/components/modal";
import { Ingredient } from "@/interfaces/interfaces";

interface AddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddIngredient: (newIngredient: Ingredient) => void;
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({
  isOpen,
  onClose,
  handleAddIngredient,
}) => {
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    ingredientid: 0,
    ingredientname: "",
    quantity: 0,
    lastupdated: new Date().toISOString(), // Convert Date to string format
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Ingredient">
      <label className="block text-sm font-medium text-gray-700">Ingredient Name</label>
      <input
        type="text"
        value={newIngredient.ingredientname}
        onChange={(e) => setNewIngredient({ ...newIngredient, ingredientname: e.target.value })}
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Quantity</label>
      <input
        type="number"
        value={newIngredient.quantity}
        onChange={(e) => setNewIngredient({ ...newIngredient, quantity: Number(e.target.value) })}
        className="w-full mt-1 p-2 border rounded-md"
      />

      <button
        onClick={() => handleAddIngredient(newIngredient)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Ingredient
      </button>
    </Modal>
  );
};

export default AddIngredientModal;
