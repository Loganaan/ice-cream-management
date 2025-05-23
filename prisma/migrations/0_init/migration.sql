-- CreateTable
CREATE TABLE "icecreamingredients" (
    "icecreamingredientid" SERIAL NOT NULL,
    "icecreamid" INTEGER NOT NULL,
    "ingredientid" INTEGER NOT NULL,
    "quantityneeded" INTEGER NOT NULL,

    CONSTRAINT "icecreamingredients_pkey" PRIMARY KEY ("icecreamingredientid")
);

-- CreateTable
CREATE TABLE "icecreams" (
    "icecreamid" SERIAL NOT NULL,
    "flavorname" VARCHAR(100) NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "icecreams_pkey" PRIMARY KEY ("icecreamid")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "ingredientid" SERIAL NOT NULL,
    "ingredientname" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lastupdated" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("ingredientid")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderid" SERIAL NOT NULL,
    "totalamount" DECIMAL(10,2) NOT NULL,
    "paymentmethod" VARCHAR(50) NOT NULL,
    "orderdate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderid")
);

-- AddForeignKey
ALTER TABLE "icecreamingredients" ADD CONSTRAINT "icecreamingredients_icecreamid_fkey" FOREIGN KEY ("icecreamid") REFERENCES "icecreams"("icecreamid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "icecreamingredients" ADD CONSTRAINT "icecreamingredients_ingredientid_fkey" FOREIGN KEY ("ingredientid") REFERENCES "ingredients"("ingredientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

