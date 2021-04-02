import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="header">
      <div className="wrapper">
        <h4 className="header__title">
          <Link to="/" className="header__link">
            {" "}
            WorkManager{" "}
          </Link>
        </h4>
        <form className="header__form">
          <div className="header__formContainer">
            <div className="header__inputBox">
              <input name="username" className="" type="text" placeholder="Username" autoComplete="off" />
            </div>
            <div className="header__inputBox">
              <input name="password" className="" type="password" placeholder="Password" />
            </div>
            <div className="header__button">
              <button className="">Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header
