"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  className: string;
  src: string;
  height?: number;
  width?: number;
}

const Logo: React.FC<LogoProps> = ({
  className,
  src,
  height = 100,
  width = 150,
}) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className={`cursor-pointer ${className}`}
      height={height}
      width={width}
      src={src}
    />
  );
};
export default Logo;
