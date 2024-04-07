import React from 'react'
import "./bookmark.css"
import BookmarkPost from '../../features/bookmark/components/bookmarkPost/BookmarkPost'

const Bookmark = () => {
  return (
    <main className="bookmark">
      <div className="bookmark-layout">
        <BookmarkPost />
      </div>

    </main>
  )
}

export default Bookmark
