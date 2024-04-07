import React, { useEffect, useState } from 'react'
import "./query-posts.css"
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../../../../../../services/post/reducers/postSlice'
import { UserPostCard } from '../../../../../societies'
import EmptyQueryResult from '../emptyQueryResult/EmptyQueryResult'

const QueryPosts = ({queryResults}) => {
  const allPosts = useSelector(selectAllPosts)
  const queryPost = allPosts?.filter(post => post.post.toLowerCase().includes(queryResults))

  if(!queryPost.length){
    return <EmptyQueryResult emptySearchMessage={`No Posts match "${queryResults}"`} />
  }

  if(queryResults === ""){
    return <EmptyQueryResult emptySearchMessage={"Search for Posts"} />
  }

  return (
    <section className="query-post-section">
      {queryPost?.map(post => {
        return <UserPostCard key={post?._id} posts={post}/>
      })}
    </section>
  )
}

export default QueryPosts