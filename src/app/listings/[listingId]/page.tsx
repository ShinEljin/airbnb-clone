import getCurrentUser from "@/utils/getCurrentUser";
import getListingById from "@/utils/getListingById";
// import getReservations from "@/utils/getReservations";

import EmptyState from "@/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  // const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      // reservations={reservations}
    />
  );
};

export default ListingPage;
