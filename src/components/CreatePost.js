import React, { useEffect, useState, useContext } from "react"
import { withRouter } from "react-router-dom"
import Page from "./Page"
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body, token: appState.user.token })
      // redirect to new post
      appDispatch({ type: "flashMessage", value: "Post created!" })
      props.history.push(`/post/${response.data}`)
      // console.log("New post created.")
      // console.log(response.data)
    } catch (e) {
      console.log("Problem with create post request!")
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit} className="createPost__form">
        <div className="createPost__title">
          <label htmlFor="post-title" className="">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="" type="text" placeholder="title" autoComplete="off" />
        </div>

        <div className="createPost__title">
          <label htmlFor="post-body" className="">
            <small>Post Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="" type="text"></textarea>
        </div>

        <button className="button">Create Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)
