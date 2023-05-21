"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { SafeUser } from "@/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white shadow-sm z-10">
      <div className="py-4 md:border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-6 lg:gap-0">
            <Logo src="/logo/logo2.png" className="hidden md:block" />
            <Logo
              src="/logo/logo.png"
              className="block md:hidden"
              width={35}
              height={35}
            />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
};

export default Navbar;
