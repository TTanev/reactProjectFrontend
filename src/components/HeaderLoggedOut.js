import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await Axios.post("/login", { username, password })
      if (response.data) {
        appDispatch({ type: "login", data: response.data })
        appDispatch({ type: "flashMessage", value: "Successful login!" })
      } else {
        console.log("incorrect username / password")
        appDispatch({ type: "flashMessage", value: "Invalid username / password!" })
      }
    } catch (e) {
      console.log("login request error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="header__form">
      <div className="header__formContainer">
        <div className="header__inputBox">
          <input onChange={e => setUsername(e.target.value)} name="username" className="" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="header__inputBox">
          <input onChange={e => setPassword(e.target.value)} name="password" className="" type="password" placeholder="Password" />
        </div>
        <div className="header__button">
          <button className="">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
