import React, { useEffect, useState } from "react"
import Page from "./Page"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
import LoadingAnimation from "./LoadingAnimation"
import ReactMarkdown from "react-markdown"
import NotFound from "./NotFound"

function ViewSinglePost() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    const currentRequest = Axios.CancelToken.source()

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: currentRequest.token })
        setPost(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("Request error / cancelation")
      }
    }

    fetchPost()

    return () => {
      currentRequest.cancel()
    }
  }, [])

  if (!isLoading && !post) {
    return <NotFound />
  }

  if (isLoading)
    return (
      <Page title="...">
        <LoadingAnimation />
      </Page>
    )

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={post.title}>
      <div className="singlePost__title">
        <h2>{post.title}</h2>
        <span className="">
          <Link to={`/post/${post._id}/edit`} className="singlePost__edit" title="Edit">
            <i className="fas fa-edit"></i>
          </Link>
          <Link to="#" className="singlePost__del" title="Delete">
            <i className="fas fa-trash"></i>
          </Link>
        </span>
      </div>

      <p className="singlePost__info">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
      </p>

      <div className="singlePost__content">
        <ReactMarkdown children={post.body} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
      </div>
    </Page>
  )
}

export default ViewSinglePost
