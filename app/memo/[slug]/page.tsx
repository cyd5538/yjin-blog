import Memo from '@/components/memo/Memo';
import { Post, allPosts } from 'contentlayer/generated';
import type { Metadata } from 'next'

type Props = {
  params: { slug: string, slugs: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateStaticParams = async () =>
  allPosts.map((post: Post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: Props): Metadata => {
  const post =  allPosts.filter((post : Post) => post._raw.flattenedPath.split("/")[1] === params.slug)[0]

  return { title: post?.title, description: post?.description };
};

export default function Home({ params }: Props) {

  return (
    <div className='pb-32'>
      <Memo params={params}/>
    </div>
  )
}
