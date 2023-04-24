import Image from 'next/image';
import Head from "next/head";
import React, { useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function Home() {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onUpload = async () =>{
        if(!inputRef.current?.files?.[0]) return;
        const file = inputRef.current.files[0];

        inputRef.current.value =""

        const data = new FormData();
        data.append("file", file)

        await fetch("/api/upload", {
          method:"POST",
          body:data
        })
    }

    return(
      <div className='px-6  bg-slate-700'>
          <Head>
            <title>Google file upload</title>
            <meta 
              name="description"
              content="Uploading stuff to google cloud"
            />
            <link rel="icon" href="/favicon.ico"/>
          </Head>
          <main className='min-h-screen flex flex-col justify-center items-center py-16 flex-1'>
              <h1 className='m-0 text-6xl capitalize font-bold'>Upload a file</h1>
              <button
                type="button"
                onClick={()=>inputRef.current?.click()}
                className='mt-6 bg-gray-200 p-4 rounded-full'
              >
                  <AiOutlineCloudUpload size={30}/>
              </button>
          </main>
          <input 
            type="file"
            className='hidden'
            onInput={onUpload}
            ref={inputRef}
          />
      </div>
    )
}
