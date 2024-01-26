"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/types";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import SwalConfirm from "@/components/modals/SwalConfirm";
import EditRentModal from "@/components/modals/EditRentModal";
import useEditRentModal from "@/hooks/useEditRentModal";
import useRegisterLoginModal from "@/hooks/useRegisterLoginModal";

interface TripsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<TripsClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const registerLoginModal = useRegisterLoginModal();
  const { onOpen, setListing, isOpen, listing } = useEditRentModal();

  const onCancel = useCallback(
    async (id: string) => {
      const isConfirmed = await SwalConfirm(
        "Do you want to delete this listing?",
        "question"
      );

      if (isConfirmed) {
        setDeletingId(id);
        try {
          await axios.delete(`/api/listings/${id}`);
          toast.success("Listing Deleted");
          router.refresh();
          setDeletingId("");
        } catch (error: any) {
          toast.error(error?.response?.data?.error);
          toast.error("Something went wrong");
        }
      }
    },
    [router]
  );

  const onEdit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, listing: SafeListing) => {
      e.stopPropagation();
      if (!currentUser) {
        return registerLoginModal.onOpen();
      }
      onOpen();
      setListing(listing);
    },
    [onOpen, setListing, registerLoginModal, currentUser]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          3xl:grid-cols-6
          gap-6
        "
      >
        {listings.map((listing: any) => (
          <div key={listing.id}>
            <ListingCard
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
              editButton
              editAction={(e) => onEdit(e, listing)}
            />
          </div>
        ))}
      </div>
      {/* {useMemo(() => {
        return <EditRentModal />;
      }, [])} */}
      {isOpen && <EditRentModal />}
    </Container>
  );
};

export default PropertiesClient;
