import { fn } from "@/utils/fn";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillClockCircle, AiFillLike } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";

const links = [
  {
    name: "Latest",
    path: "/",
    icon: <AiFillClockCircle className="group-hover:text-indigo-500" />,
  },
  {
    name: "Top",
    path: "/top",
    icon: <AiFillLike className="group-hover:text-indigo-500" />,
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: <BsFillBookmarkFill className="group-hover:text-indigo-500" />,
  },
];

export const ViewArticlesBy = () => {
  const router = useRouter();
  return (
    <nav className="flex items-center gap-x-8 border-b px-4 pt-2">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className={fn(
            "tabItem group",
            link.path === router.pathname && "active"
          )}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}
    </nav>
  );
};
