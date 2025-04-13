import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// Route handler for GET requests
export async function GET() {
  try {
    const ingredients = await prisma.ingredients.findMany();
    console.log(ingredients);
    return NextResponse.json(ingredients); // Send response with status 200 automatically
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
