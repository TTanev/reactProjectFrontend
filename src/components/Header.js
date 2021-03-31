import React from "react"

function Header() {
  return (
    <header className="header">
      <div className="wrapper">
        <h4 className="header__title">
          <a href="/" className="header__link">
            {" "}
            WorkManager{" "}
          </a>
        </h4>
        <form className="header__form">
          <div className="header__formContainer">
            <div className="">
              <input name="username" className="" type="text" placeholder="Username" autocomplete="off" />
            </div>
            <div className="">
              <input name="password" className="" type="password" placeholder="Password" />
            </div>
            <div className="">
              <button className="">Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header
