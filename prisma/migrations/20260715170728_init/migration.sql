-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "species" TEXT NOT NULL,
    "nickname" TEXT,
    "nature" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EVRecord" (
    "id" SERIAL NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 0,
    "attack" INTEGER NOT NULL DEFAULT 0,
    "defense" INTEGER NOT NULL DEFAULT 0,
    "spAttack" INTEGER NOT NULL DEFAULT 0,
    "spDefense" INTEGER NOT NULL DEFAULT 0,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "EVRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" SERIAL NOT NULL,
    "stat" TEXT NOT NULL,
    "evGained" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EVRecord_pokemonId_key" ON "EVRecord"("pokemonId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EVRecord" ADD CONSTRAINT "EVRecord_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
