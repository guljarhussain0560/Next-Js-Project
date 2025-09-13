"use client"
import Link from 'next/dist/client/link';
import { X } from 'lucide-react';
import React from 'react'

const SearchFormReset = () => {

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if (form) {
            form.reset();
        }
    }
    return (
        <div onClick={reset} title="Reset Search Form">
            <Link href='/' className='size-[50px] rounded-full bg-black flex justify-center items-center !important text-white'>
                <X className='size-5 hover:scale-150 transition-transform duration-200'/>
            </Link>
        </div>
    )
}

export default SearchFormReset
