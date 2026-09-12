import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.unlockCode.upsert({
    where: { code: "CYPHER-DEMO0001" },
    update: {},
    create: { code: "CYPHER-DEMO0001", maxUses: 50, isActive: true },
  });
  console.log("Seeded unlock code: CYPHER-DEMO0001 (50 uses)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
