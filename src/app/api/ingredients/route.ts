import { prisma } from '@/lib/prisma';
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

export async function POST(req: Request) {
  try {
    console.log("Received raw request:", req);
    const body = await req.json();
    console.log("Received body:", body); // Debug log

    // Create the ingredient entry
    const newIngredient = await prisma.ingredients.create({
      data: {
        ingredientname: body.ingredientname,
        quantity: body.quantity,
        lastupdated: new Date(),
      },
    });

    console.log("Created Ingredient:", newIngredient);

    return NextResponse.json(newIngredient, { status: 201 });
  } catch (error) {
    console.error("Error creating ingredient:", error);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}
