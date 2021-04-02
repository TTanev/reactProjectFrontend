import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Page from "./Page"
import Axios from "axios"

function CreatePost() {
  async function handleSubmit() {
    try {
      await Axios.post("/create-post", { title: "Test Title", body: "Test content here", token: localStorage.getItem("tomappToken") })
      console.log("new post created")
    } catch (e) {
      console.log("problem with create post request")
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="post-title" className="">
            <small>Title</small>
          </label>
          <input autoFocus name="title" id="post-title" className="" type="text" placeholder="title" autoComplete="off" />
        </div>

        <div className="">
          <label htmlFor="post-body" className="">
            <small>Post Content</small>
          </label>
          <textarea name="body" id="post-body" className="" type="text"></textarea>
        </div>

        <button className="button">Create Post</button>
      </form>
    </Page>
  )
}

export default CreatePost
