import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingAnimation from "./LoadingAnimation"
import Post from "./Post"

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
        return <Post noAuthor={true} post={post} key={post.key} />
      })}
    </div>
  )
}

export default ProfilePosts
