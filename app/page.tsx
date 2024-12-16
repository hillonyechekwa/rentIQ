"use client"

import { Separator } from "@/components/ui/separator";
import { redirect } from 'next/navigation'
import { useSession } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession();


  if (session && session.user) {
    redirect("/feed")
  }

  return (
    <main className="">
      <header className="w-full h-screen flex flex-col justify-between items-center">
        <section className="grid grid-rows-1 grid-cols-2 justify-center items-center">
          <article className="text-wrap px-16 py-32 text-sm flex flex-col gap-y-5">
            <p className="whitespace-pre-wrap">
              A community where you the house hunter are the priority and where the information you find about any place is passed through a system of trust.
              Find the information you need about the next place you want to lease before you put pen to paper.
            </p>
            <p className="whitespace-pre-wrap">
              A community where you the house hunter are the priority and where the information you find about any place is passed through a system of trust.
              Find the information you need about the next place you want to lease before you put pen to paper.
            </p>        
          </article>
          {/* <Separator orientation="vertical" className="h-3/5 w-0.5"/> */}
          <p className="text-3xl whitespace-pre-wrap px-20 self-center py-24">Know before you lease with leaseIQ</p>
        </section>
        <Separator orientation="horizontal" className="w-4/5 h-1.5 mx-auto" />
        <section className="flex justify-center items-center w-full h-full">
          <h1 className="text-8xl font-medium mx-auto">LeaseIQ</h1>
        </section>
      </header>
      <section className="w-full h-screen p-5"></section>
    </main>
  );
}
