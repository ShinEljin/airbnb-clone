"use client";

import { IconType } from "react-icons";
import Loader from "./Loader";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "button";
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  iconColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  isLoading,
  type = "submit",
  outline,
  small,
  icon: Icon,
  iconColor,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
      ${
        outline
          ? "bg-white border-black text-black"
          : "bg-gradient-to-r from-[#E61E4E] via-[#E31C5F] to-[#D80666] text-white"
      }
      ${
        small
          ? "py-2 md:py-1 text-md md:text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-2"
      } `}
    >
      {Icon && (
        <Icon
          size={24}
          className="absolute left-4 top-3"
          color={iconColor && iconColor}
        />
      )}
      {disabled ? <Loader /> : label}
    </button>
  );
};
export default Button;
