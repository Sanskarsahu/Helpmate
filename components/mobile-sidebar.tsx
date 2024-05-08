"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './sidebar';

interface MobilesidebarProps {
    apiLimitCount: number;
    isPro:boolean
}

export default function Mobilesidebar({apiLimitCount=0,isPro = false}: MobilesidebarProps) {

    const [isMounted, setMounted]= useState(false);
    useEffect(()=>{
       setMounted(true);
    },[])
    if(!isMounted){
        return null;
    }
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className='p-0'>
                    <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
                </SheetContent>
            </Sheet>
        </div>
    )
}
