"use client";

import { Post, allPosts } from 'contentlayer/generated'
import React from 'react'
import SinglePost from '../slug/SinglePost'
import { compareDesc } from 'date-fns'
import NotFound from '@/app/[...not_found]/page';

interface MemoProps {
  params : {
    slug : string
    slugs : string
  }
}

const Memo:React.FC<MemoProps> = ({params}) => {
  const post =  allPosts.filter((post : Post) => post._raw.flattenedPath.split("/")[1] === params.slug)[0]
  const postSort = allPosts
  .filter(post => post._id.startsWith('memo'))
  .sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  if(!post){
    return <NotFound />
  }

  return (
    <div>
      <SinglePost postmemo={false} params={params} post={post} postSort={postSort} />
    </div>
  )
}

export default Memo
