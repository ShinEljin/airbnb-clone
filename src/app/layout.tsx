import "./globals.css";

import { Suspense } from "react";
import { Nunito } from "next/font/google";
import { Notification } from "@prisma/client";

import Navbar from "@/components/navbar/Navbar";
import ToastProvider from "@/components/ToastProvider";
import getCurrentUser from "@/actions/getCurrentUser";
import RegisterLoginModal from "@/components/modals/RegisterLoginModal";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import getNotifications from "@/actions/getNotifications";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Bookease",
  description: "Bookease book now!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: any = await getCurrentUser();

  let notifications: Notification[] = [];

  if (currentUser) {
    notifications = await getNotifications(currentUser.id);
    notifications = notifications.filter(
      (notification) => notification.read === false
    );
  }

  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ToastProvider />
        <RegisterLoginModal />
        <RentModal />
        <Suspense>
          <SearchModal />
        </Suspense>
        <Navbar
          currentUser={currentUser}
          notifications={notifications.length}
        />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
