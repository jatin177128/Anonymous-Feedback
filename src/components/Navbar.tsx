"use client"
import Link from 'next/link'
import React from 'react'
import { useSession , signOut } from 'next-auth/react'
import { User} from 'next-auth';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const user : User = session?.user as User;
    const handleTrueFeedbackHome = () => {
        router.replace('/');
    }

  return (
    <nav data-theme = 'coffee' className="p-4 md:p-6 shadow-md  text-white font-serif font-semibold">
        <div className="container mx-auto flex flex-col md:flex-row gap-3 items-center">
                  <Avatar>
                     <AvatarImage src="https://svg.io/_next/image?url=https%3A%2F%2Fprod-svgio-infrastructure-contentbucketdd05a3b9-853uj7uztypy.s3.amazonaws.com%2F70%2F9f%2Fcd%2F0e%2Fa-logo-for-anonymous-feedback.png&w=1080&q=75" alt="@shadcn" />
                     </Avatar>
            <a href="#" onClick={handleTrueFeedbackHome} className="text-xl font-bold mb-4 md:mb-0">Anonymous Feedback</a>
            {
                session ? (
                    <>
                    <span className="mr-[30vw] ml-[22vw] items-center">Welcome , {user?.username||user?.email}</span>
                    <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black  " variant='outline'>Logout</Button>
                    </>
                ):(
                    <Link href={'/sign-in'}>
                        <Button className=" lg:ml-[62vw] md:ml-[32vw] w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
                    </Link>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar


