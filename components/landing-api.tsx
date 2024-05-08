import Image from 'next/image'
import React from 'react'

export default function Landingapi() {
  return (
    <div className=' h-[50vh] w-full flex items-center justify-center flex-col bg-slate-200'>
      <div className='text-center text-4xl font-extrabold mb-10'>
            Api used
      </div>
      <div className="px-20 flex flex-row items-center justify-center gap-14">
        <Image width={250} height={250} alt="" src='/openai_logo.png' className='bg-transparent'/>
        <Image width={250} height={250} alt="" src='/replicate.png' />
      </div>
    </div>
  )
}
