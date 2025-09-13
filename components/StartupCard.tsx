// components/StartupCard.tsx
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Startup } from '@/sanity/types'
import { Author } from '../sanity/types';

export type StartupCardType = Omit<Startup,"author"> & {author?: Author};

const StartupCard = ({ post }: { post: StartupCardType }) => {
    const {
        _createdAt,
        views,
        author,
        _id,
        description,
        image,
        category,
        title
    } = post;

    return (
        <li className="bg-gray-300 group flex flex-col justify-between border-[5px] border-black py-6 px-5 rounded-[22px] shadow-md transition-all duration-500 hover:bg-pink-300 hover:border-black group">

            {/* Date & Views */}
            <div className="flex justify-between items-center">
                <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5 items-center">
                    <EyeIcon className="size-6 text-black-200" />
                    <span className="font-medium text-[16px] text-black-200">
                        {views}
                    </span>
                </div>
            </div>

            {/* Author & Title */}
            <div className="flex justify-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="font-medium text-[16px] text-black line-clamp-1">
                            {author?.name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="font-semibold text-[26px] text-black line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image
                        src="https://placehold.co/48x48"
                        alt={author?.name || ''}
                        width={48}
                        height={48}
                        className="w-[48px] h-[48px] rounded-full object-cover"
                        priority
                    />
                </Link>
            </div>

            {/* Description & Main Image */}
            <Link href={`/startup/${_id}`}>
                <div>
                    <p className="font-normal text-[16px] text-black mt-4 line-clamp-3">
                        {description}
                    </p>
                    <Image
                        src={image || 'https://placehold.co/1470x980'}
                        alt={title || 'Startup image'}
                        width={1470}
                        height={980}
                        className="w-full h-auto rounded-lg mt-4"
                        priority
                    />
                </div>
            </Link>


            {/* Category & Button */}
            <div className="flex justify-between items-center gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="font-normal text-[16px] text-black line-clamp-1">
                        {category}
                    </p>
                </Link>

                <Button
                    className="rounded-full bg-black font-medium text-[16px] text-white px-5 py-3 hover:bg-primary transition"
                    asChild
                >
                    <Link href={`/startup/${_id}`}>
                        View Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard
