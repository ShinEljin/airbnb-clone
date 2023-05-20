import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/utils/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "@/utils/getListings";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have not reserved any trips."
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};
export default page;
