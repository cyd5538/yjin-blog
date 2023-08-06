import { Post, allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@/utils/mdxcomponents";
import PostToc from "@/components/Post/PostToc";

type Props = {
  params: { slug: string, slugs: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateStaticParams = async () =>
  allPosts.map((post: Post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: Props): Metadata => {
  const post =  allPosts.filter((post : Post) => post._raw.flattenedPath.endsWith(params.slugs))[0];
  return { title: post?.title, description: post?.description };
};

const PostLayout = ({ params }: Props) => {
  const post = allPosts.filter((post) => post._raw.flattenedPath.endsWith(params.slugs))[0];

  let MDXContent;

  if (!post) {
    return
  } else {
    MDXContent = getMDXComponent(post!.body.code);
  }

  return (
    <div className="flex w-full justify-center gap-4 ">
      <div className="w-[1100px] h-fit flex flex-col pb-32">
        <div className="flex flex-col items-center p-2">
          <p className="text-slate-500  dark:text-white mb-4">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </p>
          <h1 className="text-slate-900 dark:text-white text-center md:text-5xl/snug text-4xl/snug font-bold">
            {post.title}
          </h1>
          <article className="w-[350px] min-[500px]:w-full  max-w-none prose dark:prose-invert">
          <MDXContent components={{ ...MDXComponents }} />
          </article>
        </div>
      </div>
      <div className="md:block w-[200px] relative">
        <PostToc toc={post.headings} slugs={params.slugs}/>
      </div>
    </div>
  )
}

export default PostLayout