import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

// CSS
import "./styles/index.scss"
// context
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
// components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
import Profile from "./components/Profile"
import EditPost from "./components/EditPost"
import NotFound from "./components/NotFound"
import Search from "./components/Search"
import Chat from "./components/Chat"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("tomappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("tomappToken"),
      username: localStorage.getItem("tomappUsername"),
      avatar: localStorage.getItem("tomappAvatar"),
    },
    isSearchOpen: false,
    isChatOpen: false,
    unreadMessages: 0,
  }

  function appReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "openSearch":
        draft.isSearchOpen = true
        return
      case "closeSearch":
        draft.isSearchOpen = false
        return
      case "toggleChat":
        draft.isChatOpen = !draft.isChatOpen
        return
      case "closeChat":
        draft.isChatOpen = false
        return
      case "addUnread":
        draft.unreadMessages++
        return
      case "resetUnread":
        draft.unreadMessages = 0
        return
    }
  }

  const [state, dispatch] = useImmerReducer(appReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("tomappToken", state.user.token)
      localStorage.setItem("tomappUsername", state.user.username)
      localStorage.setItem("tomappAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("tomappToken")
      localStorage.removeItem("tomappUsername")
      localStorage.removeItem("tomappAvatar")
    }
  }, [state.loggedIn])

  useEffect(() => {
    if (state.loggedIn) {
      const currentReques = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/checkToken", { token: state.user.token }, { cancelToken: currentReques.token })
          if (!response.data) {
            dispatch({ type: "logout" })
            dispatch({ type: "flashMessage", value: "Token expired. Login again!" })
          }
        } catch (error) {
          console.log("Search request problem / cancelation")
        }
      }
      fetchResults()
      return () => currentReques.cancel()
    }
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/profile/:username">
              <Profile />
            </Route>
            <Route path="/" exact>
              {state.loggedIn ? <Home username={localStorage.getItem("tomappUsername")} /> : <HomeGuest />}
            </Route>
            <Route path="/post/:id" exact>
              <ViewSinglePost />
            </Route>
            <Route path="/post/:id/edit" exact>
              <EditPost />
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <CSSTransition timeout={400} in={state.isSearchOpen} classNames="searchModal" unmountOnExit>
            <Search />
          </CSSTransition>
          <Chat />
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#root"))

// instead of webpack reloading the browser, we just load js changes asynchronously live
if (module.hot) {
  module.hot.accept()
}
