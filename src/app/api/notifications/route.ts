import { prisma } from "@/lib/prisma/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Please Login" }, { status: 401 });
    }

    const body = await request.json();

    const { userId, title, description } = body;

    if (!userId || !title || !description) {
      return NextResponse.json(
        { message: "Please input all fields" },
        { status: 400 }
      );
    }

    const newNotif = await prisma.notification.create({
      data: body,
    });

    return NextResponse.json(newNotif, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 404 });
  }
}
