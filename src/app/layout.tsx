import "./globals.css";
import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import RegisterLoginModal from "@/components/modals/RegisterLoginModal";
import ToastProvider from "@/providers/ToastProvider";
import getCurrentUser from "@/utils/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ToastProvider />
        <RegisterLoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
