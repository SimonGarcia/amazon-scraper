'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation";
import React from "react";
import { FormEvent, useRef } from "react"
import toast from "react-hot-toast";


function Header() {
    //Remember to use useRouter from next/navigation in NextJS 13
    const router = useRouter();
    //const inputRef = useRef<HTMLFormElement>(null);
    const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const input = inputRef.current?.value;
        if (!input) return;

        
        const notification = toast.loading(`Starting a Scraper for: ${input}`);


        if (inputRef.current?.value){
            inputRef.current.value = '';
        }

        try {

            // Call our API to activate the Scraper...
            // /api/activateScraper
            const response = await fetch('/api/activateScraper', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: input }),
            });

            //Obtenemos los datos de la coleccion 
            const { collection_id, start_eta } = await response.json();

            toast.success("Scraper Started Successfully", {id: notification})


            //Creamos la ruta con el id de la coleccion
            router.push(`/search/${collection_id}`);
        } catch (error) {
            //Handle any errors
            toast.error("Ups... Something went wrong!", {id: notification})
        }
        //Wait for the response come back
    };

    

  return (
    <header>
        <form className="flex items-center space-x-2 justify-center rounded-full py-2 px-2 bg-indigo-100 max-w-md" onSubmit={handleSearch}>
            <input 
            ref={inputRef}
            className="flex-1 outline-none bg-transparent text-indigo-400 placeholder:text-indigo-300" 
            type="text" 
            placeholder="Search..." 
            />

            <button hidden>Search</button>
            <MagnifyingGlassIcon className="h-6 w-6 text-indigo-300" />
        </form>
    </header>
  )
}

export default Header