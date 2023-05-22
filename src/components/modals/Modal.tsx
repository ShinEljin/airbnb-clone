"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import Button from "../Button";
import { Dialog } from "@headlessui/react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: (e?: any) => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  isLoading?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  userState?: string;
  setUserState?: (userState: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  isLoading,
  secondaryAction,
  secondaryActionLabel,
  userState,
  setUserState,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleBack = useCallback(() => {
    if (disabled) {
      return;
    }

    setUserState?.("");
  }, [setUserState, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        onClose={handleClose}
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      >
        <Dialog.Panel className="relative w-full sm:w-[550px] my-6 mx-auto h-full sm:h-auto ">
          {/* CONTENT */}
          <div
            className={`duration-300 h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"} 
            ${showModal ? "op acity-100" : "opacity-0"}
            `}
          >
            <div className="h-full md:h-auto lg:h-auto  border-0 rounded-lg shadow-lg relative flex flex-col  w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <Dialog.Title className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                {userState === "" || !userState ? (
                  <button
                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                    onClick={handleClose}
                  >
                    <IoMdClose size={18} />
                  </button>
                ) : (
                  <button
                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                    onClick={handleBack}
                  >
                    <IoChevronBackOutline size={18} />
                  </button>
                )}
                <div className="text-lg font-semibold">{title}</div>
              </Dialog.Title>

              <form onSubmit={onSubmit}>
                {/* BODY */}
                <div className="relative px-6 pt-6 flex-auto">{body}</div>

                {/* FOOTER */}
                <div className="flex flex-col gap-2 px-6 pb-6 pt-4">
                  <div className="flex items-center gap-4 w-full">
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                        outline
                        type="button"
                      />
                    )}
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      isLoading={isLoading}
                    />
                  </div>
                  {footer}
                </div>
              </form>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
export default Modal;
