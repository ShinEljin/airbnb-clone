"use client";

import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterLoginModal from "@/hooks/useRegisterLoginModal";
import useRentModal from "@/hooks/useRentModal";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerLoginModal = useRegisterLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return registerLoginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, registerLoginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Bookease your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute py-2 rounded-xl shadow-md w-[200px] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
                <hr />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="Manage Listings"
                />
                <MenuItem
                  onClick={() => router.push("/account")}
                  label="Account"
                />
                <MenuItem
                  onClick={() => rentModal.onOpen()}
                  label="Bookease my home"
                  className="block lg:hidden"
                />

                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem label="Sign up" onClick={registerLoginModal.onOpen} />
                <MenuItem label="Login" onClick={registerLoginModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
