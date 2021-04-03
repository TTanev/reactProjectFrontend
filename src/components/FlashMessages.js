import React, { useEffect } from "react"

function ComponentName(props) {
  return (
    <div className="">
      {props.messages.map((msg, index) => {
        return (
          <div id={index} className="flashMessage flashMessage--success">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default ComponentName
