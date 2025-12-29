
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";

import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

// export const dynamic = 'force-static'
// export const revalidate = 30;
// false | 0 | number
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
export const metadata:Metadata={
    title:"Blog - Our Latest Articles and Insights",
    description:"Stay updated with our latest articles, insights, and trends in the industry. Explore our blog for valuable information and expert opinions.",
    category:'Web Development',
    authors:[{name:'Kshitij'}],
}


export default function BlogPage() {
    
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Insights,thoughts, and trends from our team.</p>
      </div>

        <Suspense fallback={<SkeletonLoadingUi/>}>
      <LoadBlogList />
        </Suspense>
    </div>
    
  );
}


async function LoadBlogList(){
    // "use cache";
    // cacheLife("hours");
    // cacheTag("blog");
    await connection();
    const data=await fetchQuery(api.posts.getPosts);
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post)=>(
            <Card key={post._id} className="pt-0">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                    src={post.imageUrl??"https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="image"
                    fill
                    className="rounded-t-lg object-cover"
                    />
                </div>

                <CardContent>
                    <Link href={`/blog/${post._id}`}>
                        <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
                    </Link>
                    <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                </CardContent>
                <CardFooter>
                    <Link className={buttonVariants({
                        className:"w-full",
                    })} href={`/blog/${post._id}`}>Read more</Link>
                </CardFooter>
            </Card>
        ))}
      </div>
    );

    
}


function SkeletonLoadingUi(){
    return (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {[...Array(3)].map((_,i)=><div className="flex flex-col space-y-3" key={i}>
                <Skeleton className="h-48 w-full rounded-xl"/>

                <div className="space-y-2 flex flex-col">
                    <Skeleton className="h-6 w-3/4"/>
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-2/"/>
                </div>
            </div>)}
        </div>
    )
}