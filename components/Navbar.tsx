import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="bg-pink-400 hover:bg-pink-600 transition-all duration-100 rounded-2xl px-4 py-2 flex items-center gap-2 hover:shadow-md active:scale-95">
                <span className="max-sm:hidden font-medium ">Create</span>
                <BadgePlus className="size-6 sm:hidden hover:text-pink-600" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="bg-pink-400 hover:bg-pink-600 hover:text-black transition-all duration-100 rounded-2xl px-4 py-2 flex items-center gap-2 hover:shadow-md active:scale-95">
                  <span className="max-sm:hidden font-medium text-black hover:text-black">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-600 hover:text-black" />
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`} className="hover:scale-105 transition-all duration-300">
                <Avatar className="size-10 border-2 border-pink-100 hover:border-pink-600">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="bg-pink-400 hover:bg-pink-600 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95">
                Login With GitHub
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

