import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

export default function Home() {

  return(
    <>
      <Suspense fallback={<SkeletonLoadingUi/>}>
            <HomePage/>
        </Suspense>
    </>
  )
  
}

async function HomePage(){
  await connection();
  // "use cache";
  // cacheLife("hours");
  // cacheTag("home");
  const data = await fetchQuery(api.posts.getPosts);
  const homeBlogs = data?.slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground px-6">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto mt-20">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover <span className="text-primary">Ideas</span>,
          <br /> Stories & Knowledge
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Read high-quality blogs written by developers, creators, and thinkers.
        </p>
      </section>

      {/* Blog Cards */}
      <section className="max-w-7xl mx-auto mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {homeBlogs?.map((post) => (
          <Card
            key={post._id}
            className="pt-0 bg-card text-card-foreground border-border"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={
                  post.imageUrl ??
                  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1474&auto=format&fit=crop"
                }
                alt={post.title}
                fill
                className="rounded-t-lg object-cover"
              />
            </div>

            <CardContent>
              <Link href={`/blog/${post._id}`}>
                <h2 className="text-2xl font-bold hover:text-primary transition">
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted-foreground line-clamp-3 mt-2">
                {post.body}
              </p>
            </CardContent>

            <CardFooter>
              <Link
                className={buttonVariants({ className: "w-full" })}
                href={`/blog/${post._id}`}
              >
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* View All */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <Link
          href="/blog"
          className={buttonVariants({ variant: "outline" })}
        >
          View All Blogs →
        </Link>
      </div>
    </main>
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