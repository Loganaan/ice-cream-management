// lib/icecream.ts
import { prisma } from '@/app/lib/prisma';

export async function getIceCreams() {
  return await prisma.icecreams.findMany();
}
