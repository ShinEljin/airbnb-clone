"use client";

import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

import useRegisterLoginModal from "@/hooks/useRegisterLoginModal";
import useRentModal from "@/hooks/useRentModal";
import { SafeUser } from "@/types";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  notifications?: number;
}

const UserMenuHL: React.FC<UserMenuProps> = ({
  currentUser,
  notifications,
}) => {
  const router = useRouter();
  const registerLoginModal = useRegisterLoginModal();
  const rentModal = useRentModal();

  const menuItems = [
    {
      label: "Notifications",
      href: "/notifications",
    },
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
        {/* bookease your home  */}
        <div
          onClick={onRent}
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Bookease your home
        </div>

        {/* user button  */}
        <Menu.Button className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </Menu.Button>
      </div>

      {/* menu items  */}
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
                  <div key={item.label}>
                    {item.label === "Notifications" ? (
                      <Menu.Item as={Fragment} key={item.label}>
                        <MenuItem
                          onClick={() => router.push(item.href)}
                          label={item.label}
                          notifications={notifications}
                        />
                      </Menu.Item>
                    ) : (
                      <Menu.Item as={Fragment} key={item.label}>
                        <MenuItem
                          onClick={() => router.push(item.href)}
                          label={item.label}
                        />
                      </Menu.Item>
                    )}
                    {index === 0 && <hr />}
                    {index === 2 && <hr />}
                  </div>
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
