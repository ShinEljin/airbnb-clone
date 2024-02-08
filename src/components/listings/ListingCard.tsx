"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string, reservation?: SafeReservation) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  editButton?: boolean;
  editAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabledCancelBtn?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  editButton,
  editAction,
  disabledCancelBtn,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId, reservation);
    },
    [onAction, actionId, disabled, reservation]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const locationLength = data.location.split(", ").length;
  const location =
    locationLength > 1
      ? data.location.split(", ")[locationLength - locationLength] +
        ", " +
        data.location.split(", ")[locationLength - 1]
      : data.location;

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3 ">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
          <div className="absolute left-2 bottom-2">
            <div className="h-12 w-12 md:h-10 md:w-10 lg:h-8 lg:w-8 ">
              <Image
                alt="Avatar"
                className="rounded-full"
                fill
                src={data.user?.image || "/images/placeholder.jpg"}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-md">{location}</div>
          <div className="font-light text-sm text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1  text-sm">
            <div className="font-bold">${price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
        </div>
        {editButton && (
          <Button
            disabled={disabled}
            small
            outline
            label="Edit"
            onClick={editAction}
          />
        )}
        {onAction && actionLabel && !disabledCancelBtn && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
export default ListingCard;
