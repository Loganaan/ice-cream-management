import { prisma } from '@/app/lib/prisma';
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
