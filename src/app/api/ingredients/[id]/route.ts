import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH method to update a specific ingredient
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await req.json(); // Parse JSON data from the request body

    // Update the ingredient entry
    const updatedIngredient = await prisma.ingredients.update({
      where: { ingredientid: Number(params.id) },
      data: {
        ingredientname: updatedData.ingredientname,
        quantity: updatedData.quantity,
      },
    });

    return NextResponse.json({ message: "Ingredient updated successfully", updatedIngredient });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Failed to update ingredient" }, { status: 500 });
  }
}

// DELETE method to remove a specific ingredient
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const ingredientId = Number(params.id);

    // Delete the ingredient entry
    const deletedIngredient = await prisma.ingredients.delete({
      where: { ingredientid: ingredientId },
    });

    console.log(`Deleted ingredient ID: ${ingredientId}`);

    return NextResponse.json(deletedIngredient, { status: 200 });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return NextResponse.json({ error: "Failed to delete ingredient" }, { status: 500 });
  }
}
