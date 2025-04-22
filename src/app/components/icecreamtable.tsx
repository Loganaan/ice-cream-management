import React from "react";
import { IceCream } from "@/interfaces/interfaces";

interface IceCreamTableProps {
  iceCreamData: IceCream[];
  handleViewIngredients: (iceCream: IceCream) => void;
  refreshIceCreamData: () => Promise<void>;
  menuVisible: number | null;
  toggleMenu: (iceCreamId: number) => void;
  openEditModal: (iceCream: IceCream) => void;  // Add this if missing
}

const IceCreamTable: React.FC<IceCreamTableProps> = ({
  iceCreamData,
  handleViewIngredients,
  refreshIceCreamData,
  menuVisible,
  toggleMenu,
  openEditModal,
}) => {
  // Handle Edit action
  const handleEdit = async (iceCream: IceCream) => {
    const updatedData = { flavorname: "Updated Flavor" }; // Example update
    const response = await fetch(`/api/icecreams/${iceCream.icecreamid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      console.log("Ice cream updated successfully.");
      refreshIceCreamData(); // Refresh data after edit
    } else {
      console.error("Failed to update ice cream.");
    }
  };

  // Handle Delete action
  const handleDelete = async (iceCream: IceCream) => {
    const response = await fetch(`/api/icecreams/${iceCream.icecreamid}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Ice cream deleted successfully.");
      refreshIceCreamData(); // Refresh data after delete
    } else {
      console.error("Failed to delete ice cream.");
    }
  };

  return (
    <div>
      <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Ice Cream</button>
      <h1>Ice Creams</h1>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope = "col" className = "px-6 py-3">Flavor</th>
              <th scope = "col" className = "px-6 py-3">Price</th>
              <th scope = "col" className = "px-6 py-3">Calories</th>
              <th scope = "col" className = "px-6 py-3">Action</th>
              <th scope = "col" className = "px-6 py-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {iceCreamData.map((iceCream) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" key={iceCream.icecreamid}>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{iceCream.flavorname}</td>
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
                <td className="relative px-6 py-4">
                  <button
                    onClick={() => toggleMenu(iceCream.icecreamid)} // Use toggleMenu from props
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &#x22EE;
                  </button>
                  {menuVisible === iceCream.icecreamid && (
                    <div className="absolute z-10 left-8 -mt-14 w-30 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <button
                        onClick={() => openEditModal(iceCream)}
                        className="block w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(iceCream)}
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

export default IceCreamTable;
