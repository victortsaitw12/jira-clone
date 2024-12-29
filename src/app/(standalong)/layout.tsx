import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@/components/user-button";
interface StandalongLayoutProps {
  children: React.ReactNode;
}

function StandalongLayout({ children }: StandalongLayoutProps) {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <Image src={"/logo.svg"} alt="logo" height={56} width={152} />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
}

export default StandalongLayout;
