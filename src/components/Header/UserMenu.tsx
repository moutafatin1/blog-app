import { Popover } from "@headlessui/react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { HiCog, HiLogout, HiPencilAlt } from "react-icons/hi";

type UserMenuProps = {
  user: User;
};

export const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <Popover className="relative">
      <Popover.Button>
        <img
          src={user.image ?? ""}
          alt={user.name ?? "Avatar"}
          className="h-12 w-12 rounded-full"
        />
      </Popover.Button>
      <Popover.Panel className="absolute right-1/2 z-10 w-40   rounded-lg border bg-gray-100 py-2 shadow-md">
        <div className="flex flex-col gap-y-2">
          <Link
            href="#"
            className="flex items-center gap-x-2 rounded-lg p-2 transition hover:bg-gray-300/50"
          >
            <HiPencilAlt className="text-xl text-teal-500" />
            <span className="font-medium text-gray-800">New Article</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-x-2 p-2 transition hover:bg-gray-300/50"
          >
            <HiCog className="text-xl text-indigo-500" />
            <span className="font-medium text-gray-800">Settings</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-x-2 p-2 transition hover:bg-gray-300/50"
          >
            <HiLogout className="text-xl text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
