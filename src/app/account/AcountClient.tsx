"use client";

import AccountItem from "@/components/AccountItem";
import Container from "@/components/Container";
import { SafeUser } from "@/types";

interface AccountClientProps {
  currentUser: SafeUser;
}

const AcountClient: React.FC<AccountClientProps> = ({ currentUser }) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div>
          <div className="text-4xl font-bold">Account</div>
          <div className="text-lg mt-2">
            <span className="font-bold">{currentUser.name},</span>{" "}
            {currentUser.email}
          </div>
        </div>
        <div className="mt-20 flex">
          <div className="flex flex-col gap-3 flex-[5]">
            <AccountItem
              id="accName"
              title="Name"
              value={currentUser.name}
              editable
              userId={currentUser.id}
            />
            <AccountItem
              id="accEmail"
              title="Email address"
              value={
                currentUser.email?.slice(0, 3) +
                "***" +
                "@" +
                currentUser.email?.split("@")[1]
              }
              userId={currentUser.id}
            />
            <AccountItem
              id="accPassword"
              title="Password"
              value={
                currentUser.hashedPassword ? "***********" : "No Password Set"
              }
              editable
              userId={currentUser.id}
            />
          </div>
          <div className="hidden md:block md:flex-[3]"></div>
        </div>
      </div>
    </Container>
  );
};

export default AcountClient;
