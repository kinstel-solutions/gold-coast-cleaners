import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, ChevronRight } from "lucide-react";
import { blogs } from "@/lib/blog-data";
import { renderMarkdown } from "@/lib/render-markdown";
import { CtaStrip } from "@/components/home/CtaStrip";

export function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - James Bond Cleaning`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get recent posts
  const recentPosts = blogs.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="bg-card pt-32 pb-16 sm:pt-40 sm:pb-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6">
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                <Tag className="w-4 h-4" />
                {post.category}
              </div>
              <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 font-display leading-tight">
              {post.title}
            </h1>

            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-md mb-12">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg prose-slate max-w-none bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
              {renderMarkdown(post.content)}
            </div>
          </div>
        </div>
      </div>

      {recentPosts.length > 0 && (
        <div className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-12 text-center font-display">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {recentPosts.map((recentPost) => (
                <article
                  key={recentPost.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5 group flex flex-col h-full hover:-translate-y-1">
                  <Link
                    href={`/blog/${recentPost.slug}`}
                    className="block relative h-48 overflow-hidden">
                    <Image
                      src={recentPost.imageUrl}
                      alt={recentPost.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-xs font-semibold text-primary mb-3">
                      {recentPost.category}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${recentPost.slug}`}>
                        {recentPost.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-2 text-sm">
                      {recentPost.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/blog/${recentPost.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      <CtaStrip />
    </>
  );
}
