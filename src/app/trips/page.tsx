import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/utils/getCurrentUser";
import getReservations from "@/utils/getReservations";
import TripsClient from "./TripsClient";

export const dynamic = "force-dynamic";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have not reserved any trips."
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};
export default page;
