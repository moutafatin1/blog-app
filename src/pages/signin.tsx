import { Header } from "@/components/Header";
import type { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";

const SignInPage = () => {
  return (
    <div>
      <Header />
      <main className="mx-auto flex max-w-7xl justify-center">
        <div className="mt-24 flex w-full max-w-lg flex-col items-center rounded-lg border bg-gray-50 p-4 shadow-md">
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="rounded-full bg-teal-500 px-6 py-2 font-bold text-white transition hover:scale-95 hover:opacity-75 active:scale-100"
          >
            Sign In with Github
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
