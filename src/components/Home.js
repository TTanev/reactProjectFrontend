import React, { useEffect } from "react"
import Page from "./Page"

function Home(props) {
  return (
    <Page title="Your Feed">
      <h2 className="tac">
        Hello <strong>{localStorage.getItem("tomappUsername")}</strong>, your feed is empty.
      </h2>
      <p className="tac">You can find where your peers are with the organization. If you dont follow any just search for them and join in the organization!</p>
    </Page>
  )
}

export default Home
