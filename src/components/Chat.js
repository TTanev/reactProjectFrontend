import React, { useEffect, useContext, useRef } from "react"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { useImmer } from "use-immer"
import { Link } from "react-router-dom"
import io from "socket.io-client"

function Chat() {
  const socket = useRef(null)
  const chatField = useRef(null)
  const chatLog = useRef(null)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    fieldValue: "",
    chatMessages: [],
  })

  useEffect(() => {
    if (appState.isChatOpen) {
      chatField.current.focus()
      appDispatch({ type: "resetUnread" })
    }
  }, [appState.isChatOpen])

  useEffect(() => {
    socket.current = io("http://localhost:8080")

    socket.current.on("chatFromServer", message => {
      setState(draft => {
        draft.chatMessages.push(message)
      })
    })

    return () => socket.current.disconnect()
  }, [])

  useEffect(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight
    if (!appState.isChatOpen && state.chatMessages.length) {
      appDispatch({ type: "addUnread" })
    }
  }, [state.chatMessages])

  function handleFieldChange(e) {
    const value = e.target.value
    setState(draft => {
      draft.fieldValue = value
    })
  }

  function handleSubmit(e) {
    socket.current.emit("chatFromBrowser", { message: state.fieldValue, token: appState.user.token })

    e.preventDefault()
    setState(draft => {
      draft.chatMessages.push({ message: draft.fieldValue, username: appState.user.username, avatar: appState.user.avatar })
      draft.fieldValue = ""
    })
  }

  return (
    <div id="chat-wrapper" className={"chat " + (appState.isChatOpen ? "chat--isVisible" : "")}>
      <div className="chat__title">
        Chat
        <span onClick={() => appDispatch({ type: "closeChat" })} className="chat__icon">
          <i className="fas fa-times-circle"></i>
        </span>
      </div>
      <div id="chat" className="chatLog" ref={chatLog}>
        {state.chatMessages.map((message, index) => {
          if (message.username == appState.user.username) {
            return (
              <div key={index} className="chatLog__me">
                <div className="chatLog__message">
                  <div className="chatLog__messageInner">{message.message}</div>
                </div>
                <img className="avatar avatar--small" src={message.avatar} />
              </div>
            )
          }

          return (
            <div key={index} className="chatLog__you">
              <Link to={`/profile/${message.username}`}>
                <img className="avatar avatar--small" src={message.avatar} />
              </Link>
              <div className="chatLog__message">
                <div className="chatLog__messageInner">
                  <Link to={`/profile/${message.username}`}>
                    <strong>{message.username}: </strong>
                  </Link>
                  {message.message}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <form onSubmit={handleSubmit} id="chatForm" className="chatForm">
        <input value={state.fieldValue} onChange={handleFieldChange} ref={chatField} type="text" className="chat-field" id="chatField" placeholder="Type here…" autoComplete="off" />
      </form>
    </div>
  )
}

export default Chat
