"use client";

import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useRef, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterLoginModal from "@/hooks/useRegisterLoginModal";
import useRentModal from "@/hooks/useRentModal";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenuHL: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerLoginModal = useRegisterLoginModal();
  const rentModal = useRentModal();

  const menuItems = [
    {
      label: "My trips",
      href: "/trips",
    },
    {
      label: "My favorites",
      href: "/favorites",
    },
    {
      label: "Reservations",
      href: "/reservations",
    },
    {
      label: "Manage Listings",
      href: "/properties",
    },
    {
      label: "Account",
      href: "/account",
    },
  ];

  const onRent = useCallback(() => {
    if (!currentUser) {
      return registerLoginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, registerLoginModal, rentModal]);

  return (
    <Menu as="div" className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Bookease your home
        </div>
        <Menu.Button className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100 "
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute py-2 rounded-xl shadow-md w-[200px] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {menuItems.map((item, index) => (
                  <>
                    <Menu.Item as={Fragment} key={item.label}>
                      <MenuItem
                        onClick={() => router.push(item.href)}
                        label={item.label}
                      />
                    </Menu.Item>
                    {index === 1 && <hr />}
                  </>
                ))}

                <Menu.Item>
                  <MenuItem
                    onClick={() => rentModal.onOpen()}
                    label="Bookease my home"
                    className="block lg:hidden"
                  />
                </Menu.Item>

                <hr />
                <Menu.Item>
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <MenuItem
                    label="Sign up"
                    onClick={registerLoginModal.onOpen}
                  />
                </Menu.Item>
                <Menu.Item>
                  <MenuItem label="Login" onClick={registerLoginModal.onOpen} />
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default UserMenuHL;
