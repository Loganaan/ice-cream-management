import React from "react";
import { Order } from "@/interfaces/interfaces";

interface OrdersTableProps {
  ordersData: Order[];
  openAddOrderModal: () => void;
  refreshOrderData: () => Promise<void>;
  openEditOrderModal: (order: Order) => void;
  toggleOrderMenu: (orderId: number) => void;
  menuVisible: number | null;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  ordersData,
  openAddOrderModal,
  refreshOrderData,
  openEditOrderModal,
  toggleOrderMenu,
  menuVisible,
}) => {

  // Handle Delete action
  const handleDelete = async (order: Order) => {
    console.log("Deleting order with ID:", order.orderid);
    const response = await fetch(`/api/orders/${order.orderid}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Order deleted successfully.");
      refreshOrderData(); // Refresh data after deletion
    } else {
      console.error("Failed to delete order.");
    }
  };

  return (
    <div>
      <button
        onClick={openAddOrderModal}
        className="py-2.5 px-5 mb-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        Add Order
      </button>

      <h1 className="text-lg font-semibold mb-4">Orders</h1>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Total Amount</th>
              <th scope="col" className="px-6 py-3">Payment Method</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.orderid} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.orderid}
                </td>
                <td className="px-6 py-4">${order.totalamount}</td>
                <td className="px-6 py-4">{order.paymentmethod}</td>
                <td className="px-6 py-4">{new Date(order.orderdate).toLocaleDateString()}</td>
                <td className="relative px-6 py-4">
                  <button
                    onClick={() => toggleOrderMenu(order.orderid)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &#x22EE;
                  </button>
                  {menuVisible === order.orderid && (
                    <div className="absolute z-10 left-8 -mt-14 w-30 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <button
                        onClick={() => openEditOrderModal(order)}
                        className="block w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order)}
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

export default OrdersTable;
