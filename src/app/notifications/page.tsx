import EmptyState from "@/components/EmptyState";
import NotificationsClient from "./NotificationsClient";
import getCurrentUser from "@/utils/getCurrentUser";
import getNotifications from "@/utils/getNotifications";
import { Notification } from "@prisma/client";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const notifications: Notification[] = await getNotifications(
    currentUser.id,
    true
  );

  if (notifications.length === 0) {
    return (
      <EmptyState
        title="No Notifications found"
        subtitle="Looks like you don't have any notification."
      />
    );
  }

  return <NotificationsClient notifications={notifications} />;
};
export default page;
