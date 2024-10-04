'use client'
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/protected">Protected Page</Link>
      </div>
      <div>
        {session ? (
          <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn("keycloak")} className="bg-green-500 text-white px-4 py-2 rounded">
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}