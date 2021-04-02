import React, { useEffect } from "react"
import Container from "./Container"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | App`
    window.scrollTo(0, 0)
  }, [])

  return <Container tac={props.tac}>{props.children}</Container>
}

export default Page
