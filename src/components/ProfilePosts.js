import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingAnimation from "./LoadingAnimation"

function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const currentRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: currentRequest.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("Error fetching posts")
      }
    }

    fetchPosts()
    return () => [currentRequest.cancel()]
  }, [])

  if (isLoading) return <LoadingAnimation />

  return (
    <div className="profilePosts">
      {posts.map(post => {
        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

        return (
          <Link key={post._id} to={`/post/${post._id}`} className="profilePost">
            <img className="avatar" src={post.author.avatar} /> <span>{post.title}</span>
            <span className="">on {dateFormatted} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts
