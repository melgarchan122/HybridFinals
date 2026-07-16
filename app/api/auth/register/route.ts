import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
        },
        {
          status: 400,
        },
      );
    }

    const { username, email, password } = validation.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await prisma.role.findUnique({
      where: {
        name: "USER",
      },
    });

    if (!userRole) {
      return NextResponse.json(
        {
          message: "Default role not found",
        },
        {
          status: 500,
        },
      );
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId: userRole.id,
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        userId: user.id,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
