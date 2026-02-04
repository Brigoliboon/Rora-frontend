'use client';

import React, { useEffect, useState } from 'react';
import DesignEditorSidebar from '@/components/DesignEditorSidebar';
import Image from 'next/image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Canvas from '@/components/sections/Canvas';
import { useAuth } from '@/components/AuthProvider';
import ThreeDCanvas from '@/components/sections/ThreeDCanvas';
import { Button } from '@/components/ui/Button';
import { RequestMannequin, RequestPattern } from '@/lib/models/fetchdata/FetchData';


const sample_patterns = [
  'shirt_mean_pattern.svg',
  'dress_pencil_pattern.svg',
  't_shirt_pattern.svg',
]

export default function CanvasPage() {
  const { user, token, loading, signOut } = useAuth()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setLoading] = useState(false)

  const [defaultMannequin, setDefaultMannequin] = useState('')
  const [defaultPattern, setDefaultPattern] = useState<string>('')

  useEffect(() => {

    if (!token) return
    
    async function fetchData(){
      if (!token) return

      try{
        // const default_mannequin = await new RequestMannequin('front').getDefault(token)
        const default_pattern = await new RequestPattern('front').getDefault(token)

        // setDefaultMannequin(default_mannequin)
        setDefaultPattern(default_pattern.svg_path || '')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, loading, defaultPattern])

  if (isLoading) return <></>

  if (defaultPattern)
  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar */}
      <DesignEditorSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Canvas Area */}
      <main
        className={`flex-1 relative flex transition-all duration-300 ${
          isSidebarOpen ? 'ml-80' : 'ml-0'
        }`
      }
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
      >
        <section className="w-[50%]">
          {/* Floating top container */}
          <div className="absolute top justify-self-center">
            <input type="text" name="garment" value={'Default Garment'} id="name" />
          </div>
          {/* Canvas Content */}
        <TransformWrapper
          initialScale={isSidebarOpen?0.6:1}
          initialPositionX={0}
          initialPositionY={0}
          minScale={0.5}
          maxScale={3}
          wheel={{ step: 0.1 }}
        >
          <TransformComponent
            wrapperStyle={{
              minWidth:'100%',
              height:'100%'
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
              
            }}
          >
            <div
              className="w-[100%]"
            >
              <Image
                  className='absolute opacity-40 top-5 left-5'
                  src="model_outline.svg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  />
                  <Image
                    className="absolute ml-37 mt-30"
                    src={defaultPattern}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                  />
            </div>
          </TransformComponent>
          <div className='absolute bottom-0 flex gap-5 m-5 justify-self-center'>
            <Button>Render</Button>
            <Button variant='outline'>Save Design</Button>
          </div>
        </TransformWrapper>
        {/* Floating bottom container for first section */}
        </section>
        <div className="w-px bg-slate-300 mx-4" />
        <section className="w-[50%] h-max justify-center align-center">
          {/* Floating top container */}
          <div className="absolute top">
          </div>
          <ThreeDCanvas/>
          {/* Floating bottom container */}
          <div className="absolute bottom-0 flex gap-2 m-5 justify-self-center">
            <Button>Save Model</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
