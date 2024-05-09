"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 fixed top-0 w-[100vw]  backdrop-blur-xl flex items-center justify-between h-20">
      <Link href="/" className="flex items-center">
        <div className="relative sm:mr-1">
          <Image width={90} height={90} alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("sm:text-2xl text-lg font-bold text-white", font.className)}>
          HelpMate
        </h1>
      </Link>
      <div className="flex items-center sm:gap-x-2">
        <Link href={isSignedIn ? "/dashbord" : "/sign-up"}>
          <Button variant="outline" className="rounded-full bg-transparent border-s-gray-50 text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}