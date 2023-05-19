import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Params {
  email: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const email = params.email;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 404 });
  }
}
