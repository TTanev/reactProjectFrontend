import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"
import { Link } from "react-router-dom"
import Axios from "axios"
import LoadingAnimation from "./LoadingAnimation"
import Post from "./Post"

function Home(props) {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    isLoading: true,
    feed: [],
  })

  useEffect(() => {
    const currentRequest = Axios.CancelToken.source()

    async function fetchData() {
      try {
        const response = await Axios.post("/getHomeFeed", { token: appState.user.token }, { cancelToken: currentRequest.token })
        setState(draft => {
          draft.isLoading = false
          draft.feed = response.data
        })
      } catch (e) {
        console.log("Error fetching user data.")
      }
    }

    fetchData()
    return () => {
      currentRequest.cancel()
    }
  }, [])

  if (state.isLoading) return <LoadingAnimation />

  return (
    <Page title="Your Feed">
      {state.feed.length > 0 && (
        <>
          <h2 className="resultsListHeading tac tdu marginBs">Latest developments in our group:</h2>
          <div className="profilePosts">
            {state.feed.map(post => {
              return <Post post={post} key={post._id} />
            })}
          </div>
        </>
      )}
      {state.feed.length == 0 && (
        <>
          <h2 className="tac">
            Hello <strong>{appState.user.username}</strong>, your feed is empty. Hello <strong>{localStorage.getItem("tomappToken")}</strong>, your feed is empty.
          </h2>
          <p className="tac">You can find where your peers are with the organization. If you dont follow any just search for them and join in the organization!</p>
        </>
      )}
    </Page>
  )
}

export default Home
