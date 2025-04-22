"use client";
import { useState, useEffect, useCallback } from "react";
import IceCreamTable from "@/components/icecreamtable";
import IngredientTable from "@/components/ingredienttable";
import EditIceCreamModal from "@/components/editicecreammodal";
import Modal from "@/components/modal";
import { IceCream, Ingredient } from "@/interfaces/interfaces";

export default function Home() {
  // State management
  const [activeTab, setActiveTab] = useState("Ice Cream");
  const [iceCreamData, setIceCreamData] = useState<IceCream[]>([]);
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);
  const [selectedIceCream, setSelectedIceCream] = useState<IceCream | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIceCream, setEditIceCream] = useState<IceCream | null>(null);

  // Fetch ice cream data
  const fetchIceCreams = async () => {
    try {
      const response = await fetch("/api/icecreams");
      if (!response.ok) throw new Error("Failed to fetch ice cream data");
      const data: IceCream[] = await response.json();
      setIceCreamData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIceCreams();
  }, []);

  // Fetch ingredients data
  const fetchIngredients = async () => {
    try {
      const response = await fetch("/api/ingredients");
      if (!response.ok) throw new Error("Failed to fetch ingredients data");
      const data: Ingredient[] = await response.json();
      setIngredientsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeTab === "Ingredients") {
      fetchIngredients();
    }
  }, [activeTab]);

  // Handle viewing ingredients
  const handleViewIngredients = (iceCream: IceCream) => {
    setSelectedIceCream(iceCream);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIceCream(null);
  };

  // Toggle options menu
  const toggleMenu = useCallback((iceCreamId: number) => {
    setMenuVisible(menuVisible === iceCreamId ? null : iceCreamId);
  }, [menuVisible]);

  // Open edit modal
  const openEditModal = (iceCream: IceCream) => {
    setEditIceCream(iceCream);
    setEditModalOpen(true);
    console.log("hi");
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditIceCream(null);
  };

  // Save edited data
  const handleSaveEdit = async () => {
    if (!editIceCream) return;
    

    const response = await fetch(`/api/icecreams/${editIceCream.icecreamid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flavorname: editIceCream.flavorname,
        price: editIceCream.price, // Ensure frontend sends correct price format
        calories: editIceCream.calories,
        
        icecreamingredients: editIceCream.icecreamingredients.map((ingredient) => ({
          ingredientid: ingredient.ingredients.ingredientid,
          quantityneeded: ingredient.quantityneeded,
        })),
      }),
    });
    

    if (response.ok) {
      console.log("Updated successfully.");
      fetchIceCreams();
      closeEditModal();
    } else {
      console.error("Failed to update.");
    }
  };

  // Render ingredient modal
  const renderModal = () => {
    if (!selectedIceCream) return null;

    return (
      <Modal isOpen={showModal} onClose={handleCloseModal} title="Ingredients">
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
      </Modal>
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
        {activeTab === "Ice Cream" && (
          <IceCreamTable 
            iceCreamData={iceCreamData} 
            handleViewIngredients={handleViewIngredients} 
            refreshIceCreamData={fetchIceCreams} 
            toggleMenu={toggleMenu} 
            menuVisible={menuVisible}
            openEditModal={openEditModal}
          />
        )}
        {activeTab === "Ingredients" && <IngredientTable ingredientsData={ingredientsData} />}
        {showModal && renderModal()}
        <EditIceCreamModal 
          isOpen={editModalOpen}
          onClose={closeEditModal}
          iceCream={editIceCream}
          setIceCream={setEditIceCream}
          handleSaveEdit={handleSaveEdit}
        />
      </main>
    </div>
  );
}
