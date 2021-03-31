import React from "react"
import ReactDOM from "react-dom"

// CSS
import "./styles/index.scss"

// components
import Header from "./components/Header"

function Main() {
  console.log("Main.js working")

  return (
    <>
      <Header />
      <div className="">
        <div className="">
          <div className="">
            <h1 className="">Lets manage work!!!</h1>
            <p className="">Do you need an to manage tasks between your workers and among collegues? Then use our app! We offer easy workflow solutions through easy task creation, destribution and traking!</p>
          </div>
          <div className="">
            <form>
              <div className="">
                <label for="username-register" className="">
                  <small>Username</small>
                </label>
                <input id="username-register" name="username" className="" type="text" placeholder="Pick a username" autocomplete="off" />
              </div>
              <div className="">
                <label for="email-register" className="">
                  <small>Email</small>
                </label>
                <input id="email-register" name="email" className="" type="text" placeholder="you@example.com" autocomplete="off" />
              </div>
              <div className="">
                <label for="password-register" className="">
                  <small>Password</small>
                </label>
                <input id="password-register" name="password" className="" type="password" placeholder="Create a password" />
              </div>
              <button type="submit" className="">
                Sign up for WorkManager
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="">
        <p>
          <a href="/" className="">
            Home
          </a>{" "}
          |{" "}
          <a className="" href="/about-us">
            About Us
          </a>{" "}
          |{" "}
          <a className="" href="/terms">
            Terms
          </a>
        </p>
        <p className="">
          Copyright &copy; 2021{" "}
          <a href="/" className="">
            WorkManager
          </a>
          . All rights reserved.
        </p>
      </footer>
    </>
  )
}

ReactDOM.render(<Main />, document.querySelector("#root"))

// instead of webpack reloading the browser, we just load js changes asynchronously live
if (module.hot) {
  module.hot.accept()
}
