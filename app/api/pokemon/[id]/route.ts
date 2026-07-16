import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        evRecord: true,
        trainingSessions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!pokemon) {
      return NextResponse.json(
        { message: "Pokemon not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(pokemon);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch Pokemon" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    const body = await request.json();

    const pokemon = await prisma.pokemon.update({
      where: {
        id: Number(id),
      },
      data: {
        nickname: body.nickname,
        nature: body.nature,
        level: Number(body.level),
      },
    });

    return NextResponse.json(pokemon);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    await prisma.trainingSession.deleteMany({
      where: {
        pokemonId: Number(id),
      },
    });

    await prisma.eVRecord.deleteMany({
      where: {
        pokemonId: Number(id),
      },
    });

    await prisma.pokemon.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Pokemon deleted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
