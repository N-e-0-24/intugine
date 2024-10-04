import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="bg-white shadow-md p-5 rounded-lg text-center w-full max-w-md">
        {session ? (
          <>
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Welcome, {session.user.name}
            </p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
          >
            Sign in
          </button>
        )}
      </header>
    </div>
  );
}
