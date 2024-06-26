"use client"
import { AudioLines, Send } from 'lucide-react'
import axios from "axios"
import Header from '@/components/header'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from "react-hot-toast";
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Loader } from '@/components/loader'
import { useProModal } from '@/hooks/use-pro-modal'

export default function Music() {

  const proModal = useProModal();

  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post('/api/music', values);

      setMusic(response.data.audio);
      form.reset();
    }
    catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      else {
        toast.error("something went wrong")
      }
    }
    finally {
      router.refresh();
    }
  }
  return (
    <div>
      <Header
        title='Music Generation'
        description='Chat with our most advance AI to genrate music from promt'
        icon={AudioLines}
        iconcolor='text-[#ffd91a]'
      />

<div className=" sm:w-[85vw] sm:h-[80vh] h-[62vh] flex  justify-center sm:px-16 sm:mt-10  mt-20  overflow-y-scroll ">
        {isLoading && (
          <Loader />
        )}
        {!music && !isLoading && (
          <div className='flex items-center justify-center flex-col'>
            <Image
              width={200}
              height={200}
              alt="Logo"
              src="/logo.png" />
            <p className='text-xl font-bold'>Start your musical journey</p>
          </div>
        )}
        {music && (
          <audio controls className="w-full mt-8 mx-8">
            <source src={music} />
          </audio>
        )}
      </div>
      <div className="px-4 lg:px-20 lg:w-fit w-full fixed bottom-5">
        <div>
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-row items-center gap-2'>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=''>
                    <FormControl className='m-0 p-0 w-[80vw] lg:w-[70vw]'>
                    <Input
                        className=' leading-10 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-transparent w-[70vw] sm:[66vw]'
                        disabled={isLoading}
                        placeholder='write your question here...'
                        {...field}
                      />

                    </FormControl>

                  </FormItem>
                )}
              />

              <Button className=' bg-transparent hover:bg-transparent float-left sm:mr-0 pr:6 ' type="submit" disabled={isLoading}>
                <Send className='text-black hover:text-gray-300 transition sm:h-10 sm:w-10 h-6 w-6 ' />
              </Button>

            </form>

          </Form>
        </div>
      </div>
    </div>
  )
}
