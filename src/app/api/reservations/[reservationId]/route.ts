import { NextResponse } from "next/server";

import getCurrentUser from "@/utils/getCurrentUser";
import { prisma } from "@/lib/prisma";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      return NextResponse.json({ message: "No id found" }, { status: 400 });
    }

    await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(
      { message: "succesfully deleted" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
