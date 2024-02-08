import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Registration successful",
        description:
          "Welcome to bookease " +
          user.name +
          " book your home and reserve other home",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(error, { status: 409 });
    } else {
    }
    return NextResponse.json(error, { status: 404 });
  }
}
