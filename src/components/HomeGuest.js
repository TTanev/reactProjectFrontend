import React, { useContext, useEffect } from "react"
import Page from "./Page"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import DispatchContext from "../DispatchContext"

function HomeGuest() {
  const appDispatch = useContext(DispatchContext)

  const initialState = {
    username: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0,
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0,
    },
    password: {
      value: "",
      hasErrors: false,
      message: "",
    },
    submitCount: 0,
  }

  function myReducer(draft, action) {
    switch (action.type) {
      case "usernameImmediately":
        draft.username.hasErrors = false
        draft.username.value = action.value
        if (draft.username.value.length > 30) {
          draft.username.hasErrors = true
          draft.username.message = "Username must not be over 30 symbols!"
        }
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasErrors = true
          draft.username.message = "Username has errors!"
        }
        return
      case "usernameAfterDelay":
        if (draft.username.value.length < 3) {
          draft.username.hasErrors = true
          draft.username.message = "Username must be at least 3 symbols!"
        }
        if (!draft.username.hasErrors && !action.noRequest) {
          draft.username.checkCount++
        }
        return
      case "usernameTaken":
        if (action.value) {
          draft.username.hasErrors = true
          draft.username.isUnique = false
          draft.username.message = "Username taken."
        } else {
          draft.username.isUnique = true
        }
        return
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.value = action.value
        return
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          // if (draft.email.value.length > 30) {
          draft.email.hasErrors = true
          draft.email.message = "Enter valid email!"
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++
        }
        return
      case "emailTaken":
        if (action.value) {
          draft.email.hasErrors = true
          draft.email.isUnique = false
          draft.email.message = "Email taken!"
        } else {
          draft.email.isUnique = true
        }
        return
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.value = action.value
        if (draft.password.value.length > 30) {
          draft.password.hasErrors = true
          draft.password.message = "Enter password up to 30 symbols!"
          console.log("draft.password.value.length over 30chars")
        }
        return
      case "passwordAfterDelay":
        if (draft.password.value.length < 12) {
          draft.password.hasErrors = true
          draft.password.message = "Enter password of at least 12 symbols!"
        }
        return
      case "submitForm":
        if (!draft.username.hasErrors && !draft.email.hasErrors && !draft.password.hasErrors && draft.username.isUnique && draft.email.isUnique) {
          draft.submitCount++
        }
        return
    }
  }

  const [state, dispatch] = useImmerReducer(myReducer, initialState)

  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => dispatch({ type: "usernameAfterDelay" }), 700)
      return () => clearTimeout(delay)
    }
  }, [state.username.value])

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 1700)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: "passwordAfterDelay" }), 700)
      return () => clearTimeout(delay)
    }
  }, [state.password.value])

  useEffect(() => {
    if (state.username.checkCount) {
      const currentReques = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesUsernameExist", { username: state.username.value }, { cancelToken: currentReques.token })
          dispatch({ type: "usernameTaken", value: response.data })
          console.log(response.data)
        } catch (error) {
          console.log("HomeForm request problem / cancelation")
        }
      }
      fetchResults()
      return () => currentReques.cancel()
    }
  }, [state.username.checkCount])

  useEffect(() => {
    if (state.email.checkCount) {
      const currentReques = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesEmailExist", { email: state.email.value }, { cancelToken: currentReques.token })
          dispatch({ type: "emailTaken", value: response.data })
        } catch (error) {
          console.log("HomeForm request problem / cancelation")
        }
      }
      fetchResults()
      return () => currentReques.cancel()
    }
  }, [state.email.checkCount])

  useEffect(() => {
    if (state.submitCount) {
      const currentReques = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/register", { username: state.username.value, email: state.email.value, password: state.password.value }, { cancelToken: currentReques.token })
          appDispatch({ type: "login", data: response.data })
          appDispatch({ type: "flashMessage", value: "Welcome and thank you for your registration!" })
        } catch (error) {
          console.log("HomeForm request problem / cancelation")
        }
      }
      fetchResults()
      return () => currentReques.cancel()
    }
  }, [state.submitCount])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "usernameImmediately", value: state.username.value })
    dispatch({ type: "usernameAfterDelay", value: state.username.value, noRequest: true })
    dispatch({ type: "emailImmediately", value: state.email.value })
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true })
    dispatch({ type: "passwordImmediately", value: state.password.value })
    dispatch({ type: "passwordAfterDelay", value: state.password.value })
    dispatch({ type: "submitForm" })
  }

  return (
    <Page title="HomeGues">
      <div className="home">
        <div className="home__left">
          <h1 className="">Lets organize!</h1>
          <p className="">Do you need an to manage tasks between your friends when creating a big event? Then use our app! We will offer easy workflow solutions through easy task creation, destribution and traking! Now we are just offering a chat for all group friends and chance to follow where they are on their tasks.</p>
        </div>
        <div className="home__right">
          <form onSubmit={handleSubmit} className="">
            <div className="home__inpDiv">
              <label htmlFor="username-register" className="">
                <small>Username</small>
              </label>
              <input onChange={e => dispatch({ type: "usernameImmediately", value: e.target.value })} id="username-register" name="username" className="" type="text" placeholder="Pick a username" autoComplete="off" />
              <CSSTransition in={state.username.hasErrors} timeout={300} classNames="form__errorBlock" unmountOnExit>
                <div className="form__error">{state.username.message}</div>
              </CSSTransition>
            </div>
            <div className="home__inpDiv">
              <label htmlFor="email-register" className="">
                <small>Email</small>
              </label>
              <input onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} id="email-register" name="email" className="" type="text" placeholder="you@example.com" autoComplete="off" />
              <CSSTransition in={state.email.hasErrors} timeout={300} classNames="form__errorBlock" unmountOnExit>
                <div className="form__error">{state.email.message}</div>
              </CSSTransition>
            </div>
            <div className="home__inpDiv">
              <label htmlFor="password-register" className="">
                <small>Password</small>
              </label>
              <input onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" className="" type="password" placeholder="Create a password" />
              <CSSTransition in={state.password.hasErrors} timeout={300} classNames="form__errorBlock" unmountOnExit>
                <div className="form__error">{state.password.message}</div>
              </CSSTransition>
            </div>
            <button type="submit" className="">
              Become Work Manager
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default HomeGuest
