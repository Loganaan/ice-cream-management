export interface IceCream {
    icecreamid: number;
    flavorname: string;
    price: string;
    calories: number;
    icecreamingredients: IceCreamIngredient[];
  }
  
  export interface IceCreamIngredient {
    icecreamingredientid: number;
    icecreamid: number;
    ingredientid: number;
    quantityneeded: number;
    ingredients: Ingredient;
  }
  
  export interface Ingredient {
    ingredientid: number;
    ingredientname: string;
    quantity: number;
    lastupdated: string;
  }

  export interface Order {
    orderid: number;
    totalamount: string; // Stored as a decimal in Prisma, represented as a string here to avoid precision issues
    paymentmethod: string;
    orderdate: string;
  }
  
  