import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/utils/getCurrentUser";
import getReservations from "@/utils/getReservations";
import TripsClient from "./TripsClient";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trtips found"
        subtitle="Looks like you have not reserved any trips."
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};
export default page;
