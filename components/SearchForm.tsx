import React from 'react'
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react'; // Example: Importing from react-icons

const SearchForm = ({query} :{query?: string}) => {

    return (
        <form action="/" className='max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5' >
            <input
                name='query'
                defaultValue={query}
                className='flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none'
                placeholder='Search startups, projects, ideas...'
            />
            <div className='flex gap-2'>
                {query && (<SearchFormReset />)}

                <button type='submit' title='Search' className='size-[50px] rounded-full bg-black flex justify-center items-center !important text-white'>
                    <Search className='hover:scale-150 transition-transform duration-200 size-5' />
                </button>
            </div>
        </form>
    )
}

export default SearchForm
