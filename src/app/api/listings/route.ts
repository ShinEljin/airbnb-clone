import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }

    const body = await request.json();
    console.log(body);
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error: any) {
    console.log(error.message.status);
    return NextResponse.json(error, { status: 404 });
  }
}