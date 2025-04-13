// app/page.tsx
import { getIceCreams } from '@/app/lib/icecream';
import Image from "next/image";

interface IceCream {
  icecreamid: number;
  flavorname: string; 
  price: number;
  calories: number;
}

export default async function Home() {
  const data: IceCream[] = await getIceCreams();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="text-sm/6 text-center sm:text-left">
          <label className="mb-2 tracking-[-.01em]">Test layout</label>
        </ol>
        {/* <ul>
          {data.map((item: IceCream) => (
            <li key={item.icecreamid}>
              {item.flavorname} - ${item.price.toFixed(2)} ({item.calories} cal)
            </li>
          ))}
        </ul> */}
      </main>
    </div>
  );
}
