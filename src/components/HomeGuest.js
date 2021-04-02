import React, { useState } from "react"
import Page from "./Page"
import Axios from "axios"

function HomeGuest() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await Axios.post("/register", { username, email, password })
      console.log("user registered")
    } catch (e) {
      console.log("problem with submit request")
    }
  }

  return (
    <Page title="HomeGues">
      <div className="home">
        <div className="home__left">
          <h1 className="">Lets organize!</h1>
          <p className="">Do you need an to manage tasks between your friends when creating a big event? Then use our app! We will offer easy workflow solutions through easy task creation, destribution and traking! Now we are just offering a chat for all group friends and chance to follow where they are on their tasks.</p>
        </div>
        <div className="home__right">
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="username-register" className="">
                <small>Username</small>
              </label>
              <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="" type="text" placeholder="Pick a username" autoComplete="off" />
            </div>
            <div className="">
              <label htmlFor="email-register" className="">
                <small>Email</small>
              </label>
              <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="" type="text" placeholder="you@example.com" autoComplete="off" />
            </div>
            <div className="">
              <label htmlFor="password-register" className="">
                <small>Password</small>
              </label>
              <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="" type="password" placeholder="Create a password" />
            </div>
            <button type="submit" className="">
              Become WorkManager
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default HomeGuest
