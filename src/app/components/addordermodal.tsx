import React, { useState } from "react";
import Modal from "@/components/modal";
import { Order } from "@/interfaces/interfaces";

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddOrder: (newOrder: Order) => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ isOpen, onClose, handleAddOrder }) => {
  const [newOrder, setNewOrder] = useState<Order>({
    orderid: 0,
    totalamount: "0.00", 
    paymentmethod: "",
    orderdate: new Date().toISOString(), // Convert Date to string format
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Order">
      <label className="block text-sm font-medium text-gray-700">Total Amount</label>
      <input 
        type="text" 
        value={newOrder.totalamount} 
        onChange={(e) => setNewOrder({ ...newOrder, totalamount: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Payment Method</label>
      <input 
        type="text" 
        value={newOrder.paymentmethod} 
        onChange={(e) => setNewOrder({ ...newOrder, paymentmethod: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Order Date</label>
      <input 
        type="date" 
        value={newOrder.orderdate.split("T")[0]} // Format for date input
        onChange={(e) => setNewOrder({ ...newOrder, orderdate: e.target.value })}
        className="w-full mt-1 p-2 border rounded-md"
      />

      <button 
        onClick={() => handleAddOrder(newOrder)} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Order
      </button>
    </Modal>
  );
};

export default AddOrderModal;
