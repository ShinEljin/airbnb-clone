"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import SwalConfirm from "@/components/modals/SwalConfirm";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string, reservation?: SafeReservation) => {
      const isConfirmed = await SwalConfirm(
        "Do you want to cancel this resercation?",
        "question"
      );

      if (isConfirmed) {
        try {
          await axios.delete(`/api/reservations/${id}`);

          await axios.post("/api/notifications", {
            userId: reservation?.userId,
            title: currentUser?.name + " cancelled your reservation!",
            description:
              currentUser?.name +
              " cancelled your reservation at listing " +
              reservation?.listing.title,
            url: "/trips",
          });

          toast.success("Reservation cancelled");
          router.refresh();
        } catch (error: any) {
          toast.error("Something went wrong");
        }

        setDeletingId("");
      }
    },
    [router, currentUser]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="mt-10 grid grid-cols-1     sm:grid-cols-2 
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
            3xl:grid-cols-6
            gap-6"
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default ReservationClient;
