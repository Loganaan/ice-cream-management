import React from "react";
import Modal from "@/components/modal";
import { IceCream } from "@/interfaces/interfaces";

interface EditIceCreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  iceCream: IceCream | null;
  setIceCream: (updatedIceCream: IceCream) => void;
  handleSaveEdit: () => void;
}

const EditIceCreamModal: React.FC<EditIceCreamModalProps> = ({
  isOpen,
  onClose,
  iceCream,
  setIceCream,
  handleSaveEdit,
}) => {
  if (!iceCream) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Ice Cream">
      <label className="block text-sm font-medium text-gray-700">Flavor Name</label>
      <input 
        type="text" 
        value={iceCream.flavorname} 
        onChange={(e) => setIceCream({ ...iceCream, flavorname: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Price ($)</label>
      <input 
        type="number" 
        step="0.01"
        value={iceCream.price} 
        onChange={(e) => setIceCream({ ...iceCream, price: String(e.target.value) })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Calories</label>
      <input 
        type="number" 
        value={iceCream.calories} 
        onChange={(e) => setIceCream({ ...iceCream, calories: Number(e.target.value) })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <h3 className="mt-4 font-semibold">Ingredients</h3>
      {iceCream.icecreamingredients.map((ingredient, index) => (
        <div key={ingredient.ingredients.ingredientid} className="mt-2">
          <label className="text-sm">{ingredient.ingredients.ingredientname}</label>
          <input
            type="number"
            value={ingredient.quantityneeded}
            onChange={(e) => {
              const updatedIngredients = [...iceCream.icecreamingredients];
              updatedIngredients[index].quantityneeded = Number(e.target.value);
              setIceCream({ ...iceCream, icecreamingredients: updatedIngredients });
            }}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
      ))}

      <button onClick={handleSaveEdit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save
      </button>
    </Modal>
  );
};

export default EditIceCreamModal;
