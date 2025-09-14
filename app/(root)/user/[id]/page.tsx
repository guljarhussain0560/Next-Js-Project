import { auth } from "../../../../auth";
import { client } from "../../../../sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "../../../../sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "../../../../components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "../../../../components/StartupCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

    if (!user) return notFound();

    const isCurrentUser = session?.user?.id === id;

    return (
        <section className="w-full pb-10 pt-20 px-6 max-w-7xl mx-auto flex flex-col gap-10">
            {/* User Profile Section */}
            <div className="w-full px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-pink-600 border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit">
                <div className="w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 shadow-100 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0 before:-skew-y-6 before:w-full before:h-[60px] before:bg-black before:-z-[1] before:rounded-[20px]">
                    <h3 className="text-2xl font-bold uppercase text-center line-clamp-1">
                        {user.name}
                    </h3>
                </div>

                <Image
                    src={user.image || "https://placehold.co/48x48"}
                    alt={user.name}
                    width={220}
                    height={220}
                    className="rounded-full object-cover border-[3px] border-black"
                />

                <p className="text-3xl font-bold text-white mt-7 text-center">
                    @{user.username}
                </p>
                <p className="mt-1 text-center text-[16px] text-white">{user.bio}</p>
            </div>

            {/* User Startups Section */}
            <div className="flex-1 flex flex-col gap-5">
                <p className="text-2xl font-bold">
                    {isCurrentUser ? "Your" : "All"} Startups
                </p>
                <ul className="grid sm:grid-cols-2 gap-5">
                    <Suspense fallback={<StartupCardSkeleton />}>
                        <UserStartups id={id} />
                    </Suspense>
                </ul>
            </div>
        </section>
    );
};

export default Page;