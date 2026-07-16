import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pokemon = await prisma.pokemon.findMany({
      include: {
        evRecord: true,
        trainingSessions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pokemon);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch Pokemon" },
      { status: 500 },
    );
  }
}
