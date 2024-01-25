import { prisma } from "@/lib/prisma";

export default async function getNotifications(
  userId: string,
  markAsRead?: boolean
) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (markAsRead) {
      await prisma.notification.updateMany({
        data: {
          read: true,
        },
        where: {
          userId,
        },
      });
    }

    return notifications;
  } catch (error: any) {
    throw new Error(error);
  }
}
