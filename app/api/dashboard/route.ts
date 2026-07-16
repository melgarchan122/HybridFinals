import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    const pokemonCount = await prisma.pokemon.count({
      where: {
        userId: user.id,
      },
    });

    const trainingCount = await prisma.trainingSession.count({
      where: {
        pokemon: {
          userId: user.id,
        },
      },
    });

    const evRecords = await prisma.eVRecord.findMany({
      where: {
        pokemon: {
          userId: user.id,
        },
      },
    });

    const totalEV = evRecords.reduce(
      (total, ev) =>
        total +
        ev.hp +
        ev.attack +
        ev.defense +
        ev.spAttack +
        ev.spDefense +
        ev.speed,
      0,
    );

    return NextResponse.json({
      pokemonCount,
      trainingCount,
      totalEV,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      },
    );
  }
}
