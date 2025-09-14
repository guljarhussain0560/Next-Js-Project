import React from 'react'
import Ping from './Ping'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'

const View = async ({ id }: { id: string }) => {
  const result = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id })

  const totalViews = result?.views ?? 0

  await writeClient
    .patch(id)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit()

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="font-medium text-[16px] bg-pink-200 px-4 py-2 rounded-lg capitalize">
        <span className="font-black">Views : {totalViews}</span>
      </p>
    </div>
  )
}

export default View
