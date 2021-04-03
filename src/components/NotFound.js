import React, { useEffect } from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function notFound() {
  return (
    <Page>
      <div className="pageNotFound">
        <h2>404</h2>
        <p>
          Nothing here :( You can go back to the <Link to="/">homepage</Link> and try again!
        </p>
      </div>
    </Page>
  )
}

export default notFound
