import "./globals.css";
import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import RegisterLoginModal from "@/components/modals/RegisterLoginModal";
import ToastProvider from "@/providers/ToastProvider";
import getCurrentUser from "@/utils/getCurrentUser";

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

  console.log(currentUser);

  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ToastProvider />
        <RegisterLoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
