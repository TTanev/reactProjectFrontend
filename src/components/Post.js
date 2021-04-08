import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Post(props) {
  const post = props.post
  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Link onClick={props.onClick} to={`/post/${post._id}`} className="profilePost">
      <img className="avatar" src={post.author.avatar} /> <strong>{post.title}</strong>
      <span className="">
        {!props.noAuthor && <>by {post.author.username}</>} on {dateFormatted}{" "}
      </span>
    </Link>
  )
}

export default Post
