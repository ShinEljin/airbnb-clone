"use client";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
  className?: string;
  notifications?: number | undefined;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  className,
  notifications,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3  hover:bg-neutral-100 transition font-semibold ${className} ${
        notifications && "flex flex-row justify-between"
      }`}
    >
      <p>{label}</p>
      {notifications! > 0 && (
        <p className="bg-main-400 rounded-full px-[6px] text-white">
          {notifications}
        </p>
      )}
    </div>
  );
};
export default MenuItem;
