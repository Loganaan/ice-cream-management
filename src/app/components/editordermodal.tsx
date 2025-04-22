import React from "react";
import Modal from "@/components/modal";
import { Order } from "@/interfaces/interfaces";

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  setOrder: (updatedOrder: Order) => void;
  handleSaveOrderEdit: () => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  isOpen,
  onClose,
  order,
  setOrder,
  handleSaveOrderEdit,
}) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Order">
      <label className="block text-sm font-medium text-gray-700">Total Amount</label>
      <input 
        type="text" 
        value={order.totalamount} 
        onChange={(e) => setOrder({ ...order, totalamount: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Payment Method</label>
      <input 
        type="text" 
        value={order.paymentmethod} 
        onChange={(e) => setOrder({ ...order, paymentmethod: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Order Date</label>
      <input 
        type="date" 
        value={order.orderdate} 
        onChange={(e) => setOrder({ ...order, orderdate: e.target.value })} 
        className="w-full mt-1 p-2 border rounded-md"
      />

      <button onClick={handleSaveOrderEdit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save
      </button>
    </Modal>
  );
};

export default EditOrderModal;
