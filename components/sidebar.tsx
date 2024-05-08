'use client'

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils";
import { CodeXml, AudioLines, Images, LayoutDashboard, MessageCircle, Settings, Clapperboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";
const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashbord',
      color: "text-[#087258]"
    },
    {
      label: 'Conversation',
      icon: MessageCircle,
      href: '/conversation',
      color: "text-[#c9b078]",
    },
    {
        label: 'Code Generation',
        icon: CodeXml,
        color: "text-[#9c6cb2]",
        href: '/code',
    },
    {
      label: 'Image Generation',
      icon: Images,
      color: "text-[#c78585]",
      href: '/image',
    },
    {
      label: 'Video Generation',
      icon: Clapperboard,
      color: "text-[#3272f1]",
      href: '/video',
    },
    {
      label: 'Music Generation',
      icon: AudioLines,
      color: "text-[#ffd91a]",
      href: '/music',
    },
    
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

 const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
  }: {
    apiLimitCount: number;
    isPro: boolean;
  }) =>{
  const pathname= usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-blue-950 text-white">
        <div className="px-3 py-2 flex-1">
            <Link href ="/dashbord" className="flex items-center pl-2 pb-8 mr-4">
               <Image
                width={100}
                height={50}
                alt="Logo"
                src="/logo.png"/>
                <div className="text-2xl font-bold">
                    HelpMate
                </div>
            </Link>
            <div className="space-y-1">
                {routes.map((r)=>(
                    <Link href={r.href} key={r.href} className={cn("text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === r.href ? "text-white bg-white/10 roundes-lg ": "")}>
                        <div className="flex items-center flex-1">
                            <r.icon className={cn("h-5 w-5 mr-3", r.color)}/>
                            {r.label}
                        </div>

                    </Link>
                 ))}
            </div>
        </div>
        <FreeCounter
          apiLimitCount={apiLimitCount}
          isPro={isPro}
        />
    </div>
  )
}

export default Sidebar