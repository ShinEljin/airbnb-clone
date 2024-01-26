"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeReservation, SafeUser } from "@/types";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import SwalConfirm from "@/components/modals/SwalConfirm";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string, reservation?: SafeReservation) => {
      const isConfirmed = await SwalConfirm(
        "Do you want to cancel this trip?",
        "question"
      );

      if (isConfirmed) {
        setDeletingId(id);
        try {
          await axios.delete(`/api/reservations/${id}`);

          await axios.post("/api/notifications", {
            userId: reservation?.listing.userId,
            title: currentUser?.name + " cancelled their reservation!",
            description:
              currentUser?.name +
              " cancelled their reservation at listing " +
              reservation?.listing.title,
            url: "/reservations",
          });

          toast.success("Reservation cancelled");
          router.refresh();
          setDeletingId("");
        } catch (error: any) {
          toast.error(error?.response?.data?.error);
          toast.error("Something went wrong");
        }
      }
    },
    [router, currentUser]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          3xl:grid-cols-6
          gap-6
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
