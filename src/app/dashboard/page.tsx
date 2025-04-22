"use client";
import { useState, useEffect, useCallback } from "react";
import IceCreamTable from "@/components/icecreamtable";
import IngredientTable from "@/components/ingredienttable";
import EditIceCreamModal from "@/components/editicecreammodal";
import AddIceCreamModal from "@/components/addicecreammodal"; // Import AddIceCreamModal
import AddIngredientModal from "@/components/addingredientmodal"
import EditIngredientModal from "@/components/editingredientsmodal";
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
  const [ingredientMenuVisible, setIngredientMenuVisible] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIceCream, setEditIceCream] = useState<IceCream | null>(null);
  const [editIngredientModalOpen, setEditIngredientModalOpen] = useState(false);
  const [editIngredient, setEditIngredient] = useState<Ingredient | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addIngredientModalOpen, setAddIngredientModalOpen] = useState(false);

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

  const openAddModal = () => {
    fetchIngredients(); // Ensure ingredients are fetched before opening
    setAddModalOpen(true);
  };


  // Open edit modal
  const openEditModal = (iceCream: IceCream) => {
    setEditIceCream(iceCream);
    setEditModalOpen(true);
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
        price: editIceCream.price,
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

  // Handle adding new ice cream
  const handleAddIceCream = async (newIceCream: IceCream) => {
    try {
      console.log("Sending to API:", JSON.stringify({
        flavorname: newIceCream.flavorname,
        price: newIceCream.price,
        calories: newIceCream.calories,
        icecreamingredients: newIceCream.icecreamingredients.map((ingredient) => ({
          ingredientid: ingredient.ingredients.ingredientid,
          quantityneeded: ingredient.quantityneeded,
        })),
      }));
      
      const response = await fetch("/api/icecreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flavorname: newIceCream.flavorname,
          price: newIceCream.price,
          calories: newIceCream.calories,
          icecreamingredients: newIceCream.icecreamingredients.map((ingredient) => ({
            ingredientid: ingredient.ingredients.ingredientid,
            quantityneeded: ingredient.quantityneeded,
          })),
        }),
      });
  
      if (response.ok) {
        console.log("Ice cream added successfully.");
        fetchIceCreams(); // Refresh data
        setAddModalOpen(false); // Close modal
      } else {
        const errorData = await response.json();
        console.error("Failed to add ice cream:", errorData);
      }
    } catch (error) {
      console.error("Error adding ice cream:", error);
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
            </li>
          ))}
        </ul>
      </Modal>
    );
  };

  const handleAddIngredient = async (newIngredient: Ingredient) => {
    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIngredient),
      });

      if (response.ok) {
        console.log("Ingredient added successfully.");
        fetchIngredients();
        setAddIngredientModalOpen(false);
      } else {
        console.error("Failed to add ingredient.");
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  const handleSaveIngredientEdit = async () => {
    if (!editIngredient) return;

    const response = await fetch(`/api/ingredients/${editIngredient.ingredientid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredientname: editIngredient.ingredientname,
        quantity: editIngredient.quantity,
      }),
    });

    if (response.ok) {
      console.log("Ingredient updated successfully.");
      fetchIngredients();
      closeEditIngredientModal();
    } else {
      console.error("Failed to update ingredient.");
    }
  };

  const toggleIngredientMenu = useCallback((ingredientId: number) => {
    setIngredientMenuVisible(ingredientMenuVisible === ingredientId ? null : ingredientId);
  }, [ingredientMenuVisible]);

  const openAddIngredientModal = () => {
    setAddIngredientModalOpen(true);
  };

  const openEditIngredientModal = (ingredient: Ingredient) => {
    setEditIngredient(ingredient);
    setEditIngredientModalOpen(true);
  };

  const closeEditIngredientModal = () => {
    setEditIngredientModalOpen(false);
    setEditIngredient(null);
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
            openAddModal={openAddModal} // Pass setAddModalOpen to IceCreamTable
          />
        )}
        {activeTab === "Ingredients" && (
          <IngredientTable
            ingredientsData={ingredientsData}
            openAddIngredientModal={openAddIngredientModal}
            refreshIngredientData={fetchIngredients}
            toggleIngredientMenu={toggleIngredientMenu}
            menuVisible={ingredientMenuVisible}
            openEditModal={openEditIngredientModal} 
          />

        )}     
        <AddIngredientModal 
          isOpen={addIngredientModalOpen} 
          onClose={() => setAddIngredientModalOpen(false)} 
          handleAddIngredient={handleAddIngredient} 
          />
        <EditIngredientModal 
          isOpen={editIngredientModalOpen}
          onClose={() => setEditIngredientModalOpen(false)}
          ingredient={editIngredient}
          setIngredient={setEditIngredient}
          handleSaveIngredientEdit={handleSaveIngredientEdit}
        />
        <EditIceCreamModal 
          isOpen={editModalOpen}
          onClose={closeEditModal}
          iceCream={editIceCream}
          setIceCream={setEditIceCream}
          handleSaveEdit={handleSaveEdit}
        />
        <AddIceCreamModal 
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          ingredientsData={ingredientsData}
          handleAddIceCream={handleAddIceCream}
        />
      </main>
    </div>
  );
}
