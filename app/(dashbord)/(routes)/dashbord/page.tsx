"use client"
import Image from "next/image";
import { CodeXml, AudioLines, Images, LayoutDashboard, MessageCircle, Settings, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const routes = [
    
    {
      label: 'Conversation',
      icon: MessageCircle,
      href: '/conversation',
      color: "text-[#c9b078]",
      p:"ml-5"
    },
    {
        label: 'Code Generation',
        icon: CodeXml,
        color: "text-[#9c6cb2]",
        href: '/code',
        p:"ml-6"
    },
    {
      label: 'Image Generation',
      icon: Images,
      color: "text-[#c78585]",
      href: '/image',
      p:"ml-5"
    },
    {
      label: 'Video Generation',
      icon: Clapperboard,
      color: "text-[#3272f1]",
      href: '/video',
      p:"ml-5"
    },
    {
      label: 'Music Generation',
      icon: AudioLines,
      color: "text-[#ffd91a]",
      href: '/music',
      p:"ml-5"
    },
    
  ];

const Dashbord= ()=>{
    const pathname= usePathname();
    return( 
    <>
    <div className="flex flex-col items-center justify-center">
        <Image width={300} height={300} alt="Logo" className="drop-shadow-2xl" src="/logo.png"/>
        <p className="text-6xl font-bold  cursor-pointer"> HelpMate</p>
        <p className="lg:text-2xl  font-serif pt-6">Chat with your AI helper - Experience The power of AI</p>      
        <div className="flex flex-col lg:flex-row flex-wrap gap-10 mt-10 items-center justify-center ">
           {
            routes.map((r)=>(
            <div className="lg:w-52 lg:h-52 w-96 h-16 flex  items-center lg:justify-center shadow-lg rounded-lg bg-white hover:bg-slate-100 cursor-pointer hover:shadow-xl hover:scale-110 transition" key="r.href">
                <Link href={r.href} className="flex items-center flex-row gap-5 lg:flex-col lg:gap-0 " >
                    
                        <r.icon className={cn("lg:h-20 lg:w-20 w-6 h-6 drop-shadow-xl lg:ml-0 ", r.color, r.p )}/>
                        <div className="lg:pt-5">{r.label}</div>
                   
                </Link> 
            </div>
            ))
           }
        </div>
    
     </div>
    </>
    );
}
export default Dashbord ;