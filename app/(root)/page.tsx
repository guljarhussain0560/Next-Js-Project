// app/(root)/page.tsx

import React from 'react';
import SearchForm from '../../components/SearchForm';

import { STARTUP_QUERY } from '@/sanity/lib/queries';
import StartupCard, { StartupCardType } from '@/components/StartupCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';


async function Page({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = {search: query || null};

  const { data: posts } = await sanityFetch({query: STARTUP_QUERY, params});


  return (
    <>
      <section className='w-full bg-pink-600 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6'>
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          Pitch Your Startup,<br /> connect with Entrepreneurs
        </h1>

        <p className='font-medium text-[20px] text-white !max-w-3xl text-center break-words'>
          Submit Ideas | Collaborate on Projects | Find Co-Founders | Get Feedback | Network with Peers
        </p>

        <SearchForm query={query} />

      </section>

      <section className='px-6 py-10 max-w-7xl mx-auto'>
        <p className='flex justify-center items-center text-[30px] font-extrabold text-black mb-6'>
          {query ? `Search Results for "${query}"` : 'All Startups'}
        </p>

        <ul className='mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
          {posts?.length > 0 ?(
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
          ))
          ) : (
            <li>
              <div className='flex flex-col items-center justify-center text-center bg-gray-100 p-6 rounded-lg shadow-md'>
                <p className='text-gray-700 text-xl font-semibold mb-2'>
                No startups found.
                </p>
                <p className='text-gray-500 text-sm'>
                Try adjusting your search or explore other categories.
                </p>
                <div className='mt-4'>
                <button className='px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition'>
                  Explore Categories
                </button>
                </div>
              </div>
            </li>
          )}

        </ul>

      </section>
      <SanityLive/>
    </>
  );
}

export default Page;
