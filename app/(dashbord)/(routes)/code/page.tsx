"use client"
import Header from '@/components/header'
import { CodeXml, Send } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios"
import * as z from 'zod'
import ReactMarkdown from "react-markdown"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import Image from 'next/image'
import { UserAvatar } from '@/components/user-avatar'
import { BotAvatar } from '@/components/bot-avatar'
import { cn } from '@/lib/utils'
import { ChatCompletionRequestMessage } from 'openai'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constants'
import { useForm } from 'react-hook-form'
import { Loader } from '@/components/loader'
import { Input } from '@/components/ui/input'
import { useProModal } from '@/hooks/use-pro-modal'
import toast from 'react-hot-toast'



export default function CodeGenration() {

  const promodal = useProModal();
  const router = useRouter();
  const [loder, setLoder] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",

    }
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoder(true)
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessage = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessage,
      });
      console.log(response)
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    }
    catch (error: any) {
      if (error?.response?.status === 403){
        promodal.onOpen();
      }
      else{
      toast.error("something went wrong")
      }
   }
    finally {
      setLoder(false)
      router.refresh();
    }
  }
  return (
    <div>
      <Header
        title='Code Generation'
        description='Chat with our most advance AI to genrate your code from promt'
        icon={CodeXml}
        iconcolor='text-[#9c6cb2]'
      />
      <div className=" sm:w-[85vw] sm:h-[80vh] h-[72vh] flex items-center justify-center lg:px-16 sm:mt-10 mt-28  overflow-y-scroll ">
        <div className="space-y-4 mt-4">
          {loder && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !loder && (
            <div className='flex items-center justify-center flex-col'>
              <Image
                width={200}
                height={200}
                alt="Logo"
                src="/logo.png" />
              <p className='text-xl font-bold'>Start your coding journey whith helpmate</p>
            </div>
          )}
          {messages.length != 0 && !loder && (
            <div className="flex flex-col gap-y-4 sm:h-[80vh] h-[72vh] m-6">
              {messages.map((message) => (
                <div
                  key={message.content}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-xl",
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    )
                  }} className="text-sm overflow-hidden leading-7">
                    {message.content || ""}
                  </ReactMarkdown>
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
                    <FormControl className='m-0 p-0 w-[80vw] lg:w-[70vw]'>
                      <Input
                        className=' leading-10 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-transparent w-[76vw] lg:[66vw]'
                        disabled={isLoading}
                        placeholder='write your question here...'
                        {...field}
                      />

                    </FormControl>

                  </FormItem>
                )}
              />

              <Button className=' bg-transparent hover:bg-transparent float-left' type="submit" disabled={isLoading}>
                <Send className='text-black hover:text-gray-300 transition h-10 w-10 ' />
              </Button>

            </form>

          </Form>
        </div>
      </div>
    </div>
  )
}
