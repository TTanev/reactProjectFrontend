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

  function handleSearchIcon(e) {
    e.preventDefault(e)
    appDispatch({ type: "openSearch" })
  }

  return (
    <div className="header__rightContainer">
      <a onClick={handleSearchIcon} href="#" className="header__icon">
        <i className="fas fa-search"></i>
      </a>
      <span
        style={{ position: "relative" }}
        onClick={() => {
          appDispatch({ type: "toggleChat" })
        }}
        className={"header__icon " + (appState.unreadMessages ? "colorDR" : "")}
      >
        <i className="fas fa-comment"></i>
        {appState.unreadMessages ? <span className="header__notification">{appState.unreadMessages < 10 ? appState.unreadMessages : "9+"}</span> : ""}
      </span>
      <Link to={`/profile/${appState.user.username}`} className="header__avatar">
        <img className="" src={appState.user.avatar} />
      </Link>
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
