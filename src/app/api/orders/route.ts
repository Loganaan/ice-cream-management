import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// Route handler for GET requests
export async function GET() {
  try {
    const orders = await prisma.orders.findMany();
    console.log(orders);
    return NextResponse.json(orders); // Send response with status 200 automatically
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
