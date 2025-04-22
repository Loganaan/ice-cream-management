import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// PATCH method to update a specific ice cream
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await req.json(); // Parse JSON data from the request body
    const updatedIceCream = await prisma.icecreams.update({
      where: { icecreamid: Number(params.id) },
      data: updatedData,
    });

    return NextResponse.json({ message: 'Ice cream updated successfully', updatedIceCream });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update ice cream' }, { status: 500 });
  }
}

// DELETE method to remove a specific ice cream
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.icecreams.delete({
      where: { icecreamid: Number(params.id) },
    });

    return NextResponse.json({ message: 'Ice cream deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete ice cream' }, { status: 500 });
  }
}