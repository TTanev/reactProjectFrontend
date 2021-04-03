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
    <div className="header__rightContainer">
      <a href="#" className="header__icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="header__icon">
        <i className="fas fa-comment"></i>
        <span className=""> </span>
      </span>
      <a href="#" className="header__avatar">
        <img className="" src={appState.user.avatar} />
      </a>
      <Link className="button tac" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogout} className="button">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLoggedIn
