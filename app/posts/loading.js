'use client'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-full h-[98vh] flex flex-col gap-2 items-center justify-center">
       <div className="w-[60px] h-[60px]  border-4 border-blue-700 rounded-full animate-spin">
        
       </div>
       <p className="text-xl text-blue-500 font-bold">Loading...</p>
    </div>
  )
}

export default Loading