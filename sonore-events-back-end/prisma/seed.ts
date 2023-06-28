/* import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.equipment.createMany({
    data: [
      {
        userId: 1,
        name: "jbs1",
        type: "AUDIO",
        price: 20000,
        quantity: 5,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_877870-MLA32805205575_112019-O.webp",
      },
      {
        userId: 1,
        name: "lg1",
        type: "VIDEO",
        price: 30000,
        quantity: 5,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_935455-MLA44205269969_112020-O.webp",
      },
      {
        userId: 1,
        name: "laserLuz",
        type: "LUZ",
        price: 10000,
        quantity: 5,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_759244-MLB47967383578_102021-O.webp",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 */