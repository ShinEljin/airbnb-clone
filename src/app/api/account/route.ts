import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, password, id } = await request.json();

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: name
        ? {
            name,
          }
        : {
            hashedPassword,
          },
    });

    return NextResponse.json(
      { message: "Succesfully updated" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(error, { status: 404 });
  }
}
