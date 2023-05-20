import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Please Login" }, { status: 401 });
    }

    const body = await request.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { message: "Please input all fields" },
        { status: 400 }
      );
    }

    await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Reservation success!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(error, { status: 404 });
  }
}
