import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react'
import React from 'react'

interface Headingprops{
  title: string;
  description:string;
  icon:any;
  iconcolor?:string;


}
export default function Header({
  title ,
  description,
  icon :Icon,
  iconcolor,
}:Headingprops) {
  return (
   <>
    <div className='mt-12 md:ml-5 mx-4 absolute lg:mt-0 top-3 flex items-center gap-3 md:gap-6'>
       <Icon className={cn('h-20 w-20 drop-shadow-xl', iconcolor)}/>
       <div className="flex flex-col">
        <h1 className='text-2xl md:text-4xl font-bold pt-2'>{title}</h1>
        <h5>{description}</h5>
      </div>
    </div>
    
   </>
  )
}
