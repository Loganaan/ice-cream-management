import { IceCreamIngredient } from '@/interfaces/interfaces';
import { prisma } from '@/lib/prisma';
import { Prisma } from "@prisma/client";
import { NextResponse } from 'next/server';

// Route handler for GET requests
export async function GET() {
  try {
    const icecreams = await prisma.icecreams.findMany({
      include: {
        icecreamingredients: {
          include: {
            ingredients: true, // Include the related ingredients
          },
        },
      },
    });
    console.log(icecreams);
    return NextResponse.json(icecreams); // Send response with status 200 automatically
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log("Received raw request:", req);
    const body = await req.json();
    console.log("Received body:", body); // Debug log

    // First, create the ice cream entry
    const newIceCream = await prisma.icecreams.create({
      data: {
        flavorname: body.flavorname,
        price: new Prisma.Decimal(body.price),
        calories: body.calories,
      },
      select: { icecreamid: true }, // Retrieve only the ID
    });

    console.log("Created Ice Cream:", newIceCream);

    // Then, add ingredients linked to that ice cream ID
    if (body.icecreamingredients && body.icecreamingredients.length > 0) {
      await prisma.icecreamingredients.createMany({
        data: body.icecreamingredients.map((icecreamingredient: IceCreamIngredient) => ({
          icecreamid: newIceCream.icecreamid, // ✅ Ensure correct relation
          ingredientid: icecreamingredient.ingredientid, // ✅ Pulling correctly from IceCreamIngredient
          quantityneeded: icecreamingredient.quantityneeded, // ✅ This field exists in IceCreamIngredient
        })),
      });
    
    

      console.log("Ingredients Added:", body.icecreamingredients);
    }

    return NextResponse.json(newIceCream, { status: 201 });
  } catch (error) {
    console.error("Error creating ice cream:", error);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}


