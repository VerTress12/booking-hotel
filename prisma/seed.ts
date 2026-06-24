import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  const amenities = await prisma.amenities.createMany({
    data: [
      { name: "WiFi" },
      { name: "Spa" },
      { name: "Pool" },
      { name: "Gym" },
      { name: "Parking" },
      { name: "Restaurant" },
      { name: "Free Karoke" },
    ],
    skipDuplicates: true,
  });
  console.log("Seeded amenities:", amenities);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());