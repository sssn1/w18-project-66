import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";


const prisma = new PrismaClient().$extends(withAccelerate());

const createProducts = async () => {
    const products = await prisma.product.createMany({
        data: sampleData.products,
    });
    console.log(JSON.stringify(products))
}
const getProducts = async () => {
    const products = await prisma.product.findMany()
    console.log(JSON.stringify(products))
}
const deleteProducts = async () => {
    const products = await prisma.product.deleteMany()
    console.log("deleteProducts",JSON.stringify(products))
}
async function main() {
    await createProducts();
  // await getProducts();
 // await deleteProducts();
}

main()
    .then( async () => await prisma.$disconnect())
    .catch(async (error) => {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    });