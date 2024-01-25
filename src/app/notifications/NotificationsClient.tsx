"use client";

import Container from "@/components/Container";
import { Notification } from "@prisma/client";
import Link from "next/link";

interface NotificationsClientProps {
  notifications?: Notification[];
}

const NotificationsClient: React.FC<NotificationsClientProps> = ({
  notifications,
}) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        {notifications?.map((notif) => (
          <Link href={notif.url} key={notif.id}>
            <div
              className={`border-b p-4 rounded-md ${
                !notif.read && "bg-gray-100"
              }`}
            >
              <h2 className="font-bold text-lg ">{notif.title}</h2>
              <p className="font-light text-gray-500">{notif.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};
export default NotificationsClient;
