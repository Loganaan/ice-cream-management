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
  