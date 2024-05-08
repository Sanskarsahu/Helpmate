import { Loader } from '@/components/loader'
import React from 'react'

export default function Loading() {
  return (
    <>
    <div className="h-full w-full flex items-center justify-center">
      <Loader/>
    </div>
    </>
    
  )
}