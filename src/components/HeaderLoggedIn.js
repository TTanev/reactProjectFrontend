import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function HeaderLoggedIn(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  function handleLogout() {
    appDispatch({ type: "logout" })
  }

  return (
    <div className="">
      <a href="#" className="">
        <i className="fas fa-search"></i>
      </a>
      <span className="">
        <i className="fas fa-comment"></i>
        <span className=""> </span>
      </span>
      <a href="#" className="">
        <img className="" src={appState.user.avatar} />
      </a>
      <Link className="" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogout} className="">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLoggedIn
