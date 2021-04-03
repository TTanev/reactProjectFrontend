import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../StateContext"

function Home(props) {
  const appState = useContext(StateContext)

  return (
    <Page title="Your Feed">
      <h2 className="tac">
        Hello <strong>{appState.user.username}</strong>, your feed is empty. Hello <strong>{localStorage.getItem("tomappToken")}</strong>, your feed is empty.
      </h2>
      <p className="tac">You can find where your peers are with the organization. If you dont follow any just search for them and join in the organization!</p>
    </Page>
  )
}

export default Home
