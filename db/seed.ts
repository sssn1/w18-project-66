import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";


const prisma = new PrismaClient().$extends(withAccelerate());


async function main() {
    await prisma.product.deleteMany()
    await prisma.product.createMany({
        data: sampleData.products,
    });
    await prisma.user.createMany({
        data: sampleData.users,
    });
    console.log("Database seeded successfully");
}

main()
    .then( async () => await prisma.$disconnect())
    .catch(async (error) => {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    });