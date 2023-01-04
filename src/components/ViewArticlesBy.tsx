import { fn } from "@/utils/fn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillClockCircle, AiFillLike } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { CiHashtag } from "react-icons/ci";

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
];

export const ViewArticlesBy = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { tagName } = router.query;
  const activeTag = tagName && typeof tagName === "string";
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
      {session && (
        <Link href="/bookmarks" className="tabItem group">
          <BsFillBookmarkFill className="group-hover:text-indigo-500" />{" "}
          Bookmarks
        </Link>
      )}
      {activeTag && (
        <span className={fn("tabItem group capitalize", activeTag && "active")}>
          <CiHashtag className="group-hover:text-indigo-500" /> {tagName}
        </span>
      )}
    </nav>
  );
};
