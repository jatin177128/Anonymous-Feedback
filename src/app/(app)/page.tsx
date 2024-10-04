'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from "@/messages.json"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from 'framer-motion';

const Home = () => {
  const router = useRouter();
  const[signedIn, setSignedIn] = useState(false);
  const {data : session} = useSession();
  const handleSeeMessages = () => {
    if(session?.user.isVerified){
    router.replace('/dashboard')
    }else{
      router.replace('/sign-in')
    }
  }
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-white text-white">
        <section className="text-center mb-8 md:mb-12 ">
        <div className='textstructure'>
            {["Dive into the","World of ","Real Feedback"].map((item,index)=>{
            return (
                <div className='masker '>
                <div className='w-fit flex mr-[1vw] '>
                    {index === 1 && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "13vw" }}
                        transition={{ ease: [0.76, 0, 0.24, 1], duration: 1 }}
                        className="mr-[1vw] w-[8vw] rounded-md h-[5vw] top-[0.65vw] relative"
                      >
                        <img className="ml-[1vw] pb-[1vw] h-[5vw] w-[8vw] overflow-hidden" src="https://cdn.prod.website-files.com/6082ee0e95eb6459d78fac06/6657aad705a9dfa3988a4270_6349c1990124c0b3efac2dcd_Types-of-hackers-header-image.png" alt="ochii" />
                      </motion.div>
                    )}
                    <h1 className=" text-black uppercase text-[5vw] md:text-[3vw] lg:text-[6vw] leading-[5vw]  tracking-tighter font-mono font-semibold">
                      {item}
                    </h1>
                </div>
                </div>
            );
        })}
        </div>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
          Anonymous Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail  className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Button  onClick={handleSeeMessages}>See Messages</Button>
      </main>
      </>

  
  )
}

export default Home