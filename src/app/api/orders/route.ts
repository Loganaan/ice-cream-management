import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all orders
export async function GET() {
  try {
    const orders = await prisma.orders.findMany();
    console.log(orders);
    return NextResponse.json(orders); // Send response with status 200 automatically
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    console.log("Received raw request:", req);
    const body = await req.json();
    console.log("Received body:", body); // Debug log

    const newOrder = await prisma.orders.create({
      data: {
        totalamount: body.totalamount,
        paymentmethod: body.paymentmethod,
        orderdate: new Date(),
      },
    });

    console.log("Created Order:", newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}
