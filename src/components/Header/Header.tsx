import { useSession } from "next-auth/react";
import Link from "next/link";
import { FcHome } from "react-icons/fc";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between py-8">
      <span className="text-3xl font-bold text-gray-700">Blog App</span>
      <nav className="flex items-center gap-x-8">
        <Link
          href="/"
          className="flex items-center gap-x-2 font-medium text-gray-500 transition  hover:text-gray-700"
        >
          <FcHome className="text-2xl" />
          <span>Home</span>
        </Link>

        {status === "unauthenticated" && (
          <Link
            href="/signin"
            className="flex-shrink-0 rounded-full bg-gray-400 px-6 py-2 font-bold text-white"
          >
            Sign In
          </Link>
        )}
        {status === "authenticated" && session.user && (
          <UserMenu user={session.user} />
        )}
      </nav>
    </header>
  );
};
