import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function HeaderLoggedIn(props) {
  function handleLogout() {
    props.setLoggedIn(false)
    localStorage.removeItem("tomappToken")
    localStorage.removeItem("tomappUsername")
    localStorage.removeItem("tomappAvatar")
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
        <img className="" src={localStorage.getItem("tomappAvatar")} />
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
