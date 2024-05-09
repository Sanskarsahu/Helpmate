"use client"
import axios from "axios"
import Header from '@/components/header'
import { MessageCircle, Send } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import  {ChatCompletionRequestMessage} from "openai";
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { useProModal } from "@/hooks/use-pro-modal"
import toast from "react-hot-toast"


export default function Conversation() {
  const proModal = useProModal();
  const router = useRouter();
  const [loder,setLoder]=useState<boolean>(false)
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",

    }
  });

  const isLoading = form.formState.isLoading;
 
  const onSubmit = async (values: z.infer<typeof formSchema>)=>{
    try{
      setLoder(true)
      const userMessage : ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessage =[...messages, userMessage];
      const response =await axios.post("/api/conversation",{
        messages: newMessage,
      });
      console.log(response)
      setMessages((current)=> [...current, userMessage, response.data]);

      form.reset();
    }
    catch(error:any) {
      if (error?.response?.status === 403){
        proModal.onOpen();
      }
      else{
        toast.error("something went wrong")
        }
    }
    finally{
      setLoder(false)
      router.refresh();
    }
  }
  return (
    <div className=''>
      <Header
        title='Conversation'
        description='Chat with our most advance AI helpmate'
        icon={MessageCircle}
        iconcolor='text-[#c9b078]'
      />
      <div className=" sm:w-[85vw] sm:h-[80vh] h-[62vh] flex sm:items-center  justify-center sm:px-16 sm:mt-10  mt-20  overflow-y-scroll ">
      <div className="space-y-4 ">
          {loder && (
            
              <Loader />
            
          )}
          {messages.length === 0 && !loder && (
            <div className='flex items-center  flex-col mt-20 sm:mt-0 '>
            <Image
            width={200}
            height={200}
            alt="Logo"
            src="/logo.png"/>
            <p className='text-xl font-bold'>Start chat with helpmate</p>
            </div>
          )}
          {messages.length != 0 && !loder && (
            <div className="flex flex-col gap-y-4 sm:h-[80vh] h-[70vh]  m-6  ">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
          )}
        </div>
        </div>
      <div className="px-4 lg:px-20 lg:w-fit w-full fixed bottom-5">
        <div>
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-row items-center gap-2'>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=''>
                    <FormControl className='m-0 p-0  w-[80vw] sm:w-[70vw]'>
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
