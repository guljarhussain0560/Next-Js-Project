import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import React, { Suspense } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';


const md = new markdownit();
export const experimental_ppr = true;

const Page = async ({ params }: { params: { id: string } }) => {

    const id = (await params).id;
    console.log(id);

    const [post, playlist] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
    ]);

    const editorPosts = playlist?.select ?? [];
    
    if (!post) {
        return notFound();
    }

    const parsedPitch = md.render(post?.pitch || '');



    return (
        <div>
            <section className="w-full bg-pink-600 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6 !min-h-[230px]">
                <p className="bg-[#FBE843] px-6 py-3 font-bold rounded-sm uppercase relative before:content-[''] before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent">
                    {format(new Date(post._createdAt), 'MMMM dd, yyyy')}
                </p>
                <h1 className='uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5'>
                    {post.title}
                </h1>

                <p className='font-medium text-[20px] text-white max-w-2xl text-center break-words !max-w-5xl'>
                    {post.description}
                </p>
            </section>

            <section className='px-6 py-10 max-w-7xl mx-auto'>
                <img src={post.image}
                    alt="thumbnail"
                    className='w-full h-auto rounded-lg'
                />

                <div className='space-y-6 mt-10 max-w-4xl mx-auto'>
                    <div className='flex justify-between items-center gap-5'>
                        <Link
                            href={`/user/${post.author?._id}`}
                            className='flex gap-2 items-center mb-3'
                        >
                            <Image
                                src={post.author?.image || 'https://placehold.co/48x48'}
                                alt="avatar"
                                width={64}
                                height={64}
                                className='rounded-full drop-shadow-lg'
                            />
                            <div>
                                <p className='font-semibold text-[18px] text-black line-clamp-1'>
                                    {post.author?.name}
                                </p>
                                <p className='text-[14px] text-gray-600'>
                                    @{post.author?.username}
                                </p>
                            </div>
                        </Link>

                        <p className='font-medium text-[19px] bg-pink-200 px-4 py-2 rounded-full'>
                            {post.category}

                        </p>



                    </div>

                    <h3 className='text-[30px] font-bold text-black'>
                        Pitch Details
                    </h3>

                    {parsedPitch ? (
                        <article
                            className='prose max-w-4xl font-work-sans break-all'
                            dangerouslySetInnerHTML={{ __html: parsedPitch }}
                        />
                    ) : (
                        <p className='text-black text-sm font-normal'>No pitch found.</p>
                    )}

                </div>

                <hr className='my-10 border-t border-gray-200' />

                {/* TODO: EDITOR SELECTED STARTUPS */}
                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-[30px] font-bold text-black">Editor Picks</p>

                        <ul className="mt-7 grid sm:grid-cols-2 gap-5">
                            {editorPosts.map((post: StartupCardType, i: number) => (
                                <StartupCard key={i} post={post} />
                            ))}
                        </ul>
                    </div>
                )}


            </section>

            <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3' />}>
                <View id={id} />
            </Suspense>
        </div>
    );
};

export default Page
