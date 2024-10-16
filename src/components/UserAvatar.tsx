import { Avatar, AvatarIcon } from "@nextui-org/react";

export default function UserAvatar() {
  return (
    <div className="flex items-center justify-center">
      <Avatar
        isBordered
        as="button"
        icon={<AvatarIcon />}
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}
        className="w-[50px] h-[50px]"
      />
    </div>
  );
}
