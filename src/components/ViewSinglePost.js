import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import { useParams, Link, withRouter } from "react-router-dom"
import Axios from "axios"
import LoadingAnimation from "./LoadingAnimation"
import ReactMarkdown from "react-markdown"
import NotFound from "./NotFound"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function ViewSinglePost(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
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
  }, [id])

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

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username
    }
  }

  async function deleteHandler() {
    const conformation = window.confirm("Are you sure you want to delete this post?")
    if (conformation) {
      try {
        const response = await Axios.delete(`post/${id}`, { data: { token: appState.user.token } })
        if (response.data == "Success") {
          appDispatch({ type: "flashMessage", value: "Post delete." })
          props.history.push(`/profile/${appState.user.username}`)
        }
      } catch (error) {
        console.log("there was a problem / cancelled delete request")
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="singlePost__title">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="">
            <Link to={`/post/${post._id}/edit`} className="singlePost__edit" title="Edit">
              <i className="fas fa-edit"></i>
            </Link>
            <Link onClick={deleteHandler} to="#" className="singlePost__del" title="Delete">
              <i className="fas fa-trash"></i>
            </Link>
          </span>
        )}
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

export default withRouter(ViewSinglePost)
