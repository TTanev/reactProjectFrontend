import React from "react"
import ReactDOM from "react-dom"

function Main() {
  return (
    <>
      <h1>REACT WORKING</h1>
      <p>Some text</p>
    </>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
