import { NextResponse } from "next/server";

import getCurrentUser from "@/utils/getCurrentUser";
import { prisma } from "@/lib/prisma";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "plase login" }, { status: 401 });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { message: "No listing id found" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
