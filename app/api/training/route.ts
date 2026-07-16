import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
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

    const body = await request.json();

    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: Number(body.pokemonId),
      },
      include: {
        evRecord: true,
      },
    });

    if (!pokemon) {
      return NextResponse.json(
        {
          message: "Pokemon not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.trainingSession.create({
      data: {
        stat: body.stat,
        evGained: Number(body.evGained),
        method: body.method,
        pokemonId: pokemon.id,
      },
    });

    const updateData: any = {};

    updateData[body.stat] =
      (pokemon.evRecord as any)[body.stat] + Number(body.evGained);

    await prisma.eVRecord.update({
      where: {
        pokemonId: pokemon.id,
      },
      data: updateData,
    });

    return NextResponse.json({
      message: "Training added successfully",
    });
  } catch (error) {
    console.error("TRAINING ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to add training",
      },
      {
        status: 500,
      },
    );
  }
}
