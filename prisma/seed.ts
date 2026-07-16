import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create Roles
  const adminRole = await prisma.role.upsert({
    where: {
      name: "ADMIN",
    },
    update: {},
    create: {
      name: "ADMIN",
    },
  });

  const userRole = await prisma.role.upsert({
    where: {
      name: "USER",
    },
    update: {},
    create: {
      name: "USER",
    },
  });

  // Password
  const password = await bcrypt.hash("123456", 10);

  // Create User
  const user = await prisma.user.upsert({
    where: {
      email: "trainer@gmail.com",
    },
    update: {},
    create: {
      username: "trainer",
      email: "trainer@gmail.com",
      password,
      roleId: userRole.id,
    },
  });

  // Create Pokemon
  const pokemon = await prisma.pokemon.create({
    data: {
      species: "Pikachu",
      nickname: "Sparky",
      nature: "Jolly",
      level: 25,
      userId: user.id,

      evRecord: {
        create: {
          hp: 0,
          attack: 252,
          defense: 0,
          spAttack: 0,
          spDefense: 4,
          speed: 252,
        },
      },

      trainingSessions: {
        create: {
          stat: "Speed",
          evGained: 252,
          method: "Battle Training",
        },
      },
    },
  });

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
