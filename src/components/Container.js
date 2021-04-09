import React, { useEffect } from "react"

function Container(props) {
  return <div className={"wrapper mainHeight marginTB " + (props.tac ? "tac" : "")}>{props.children}</div>
}

export default Container
