import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH method to update a specific order
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await req.json(); // Parse JSON data from the request body

    // Update the order entry
    const updatedOrder = await prisma.orders.update({
      where: { orderid: Number(params.id) },
      data: {
        totalamount: updatedData.totalamount,
        paymentmethod: updatedData.paymentmethod,
        orderdate: updatedData.orderdate ? new Date(updatedData.orderdate) : undefined,
      },
    });

    return NextResponse.json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// DELETE method to remove a specific order
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = Number(params.id);

    // Delete the order entry
    const deletedOrder = await prisma.orders.delete({
      where: { orderid: orderId },
    });

    console.log(`Deleted order ID: ${orderId}`);

    return NextResponse.json(deletedOrder, { status: 200 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
