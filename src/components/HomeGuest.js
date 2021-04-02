import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Page from "./Page"

function HomeGuest() {
  return (
    <Page title="HomeGues">
      <div className="home">
        <div className="home__left">
          <h1 className="">Lets organize!</h1>
          <p className="">Do you need an to manage tasks between your friends when creating a big event? Then use our app! We will offer easy workflow solutions through easy task creation, destribution and traking! Now we are just offering a chat for all group friends and chance to follow where they are on their tasks.</p>
        </div>
        <div className="home__right">
          <form>
            <div className="">
              <label htmlFor="username-register" className="">
                <small>Username</small>
              </label>
              <input id="username-register" name="username" className="" type="text" placeholder="Pick a username" autoComplete="off" />
            </div>
            <div className="">
              <label htmlFor="email-register" className="">
                <small>Email</small>
              </label>
              <input id="email-register" name="email" className="" type="text" placeholder="you@example.com" autoComplete="off" />
            </div>
            <div className="">
              <label htmlFor="password-register" className="">
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
    </Page>
  )
}

export default HomeGuest
