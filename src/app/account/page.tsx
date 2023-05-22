import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/utils/getCurrentUser";
import AcountClient from "./AcountClient";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return <AcountClient currentUser={currentUser} />;
};
export default page;
