import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Ingredient} from '@/interfaces/interfaces';

// PATCH method to update a specific ice cream
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await req.json(); // Parse JSON data from the request body

    // Update the ice cream entry
    const updatedIceCream = await prisma.icecreams.update({
      where: { icecreamid: Number(params.id) },
      data: {
        flavorname: updatedData.flavorname,
        price: updatedData.price, 
        calories: updatedData.calories,

        icecreamingredients: {
          updateMany: updatedData.icecreamingredients.map((ingredient : Ingredient) => ({
            where: { ingredientid: ingredient.ingredientid },
            data: { quantityneeded: ingredient.quantity },
          })),
        },
      },
    });

    return NextResponse.json({ message: "Ice cream updated successfully", updatedIceCream });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Failed to update ice cream" }, { status: 500 });
  }
}

// DELETE method to remove a specific ice cream
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const icecreamId = Number(params.id);
    
    // Step 1: Delete related ingredients first
    await prisma.icecreamingredients.deleteMany({
      where: { icecreamid: icecreamId },
    });

    console.log(`Deleted ingredients linked to icecreamId: ${icecreamId}`);

    // Step 2: Delete the ice cream entry
    const deletedIceCream = await prisma.icecreams.delete({
      where: { icecreamid: icecreamId },
    });

    console.log(`Deleted ice cream ID: ${icecreamId}`);

    return NextResponse.json(deletedIceCream, { status: 200 });
  } catch (error) {
    console.error("Error deleting ice cream:", error);
    console.error("Delete failed:", error);
  }
}
