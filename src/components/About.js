import React, { useEffect } from "react"
import Page from "./Page"

function About() {
  return (
    <Page title="About Us" tac={true}>
      <h2>About Us!!</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, libero perferendis. Facilis assumenda quasi molestias libero, ad totam consequuntur vel?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, libero perferendis. Facilis assumenda quasi molestias libero, ad totam consequuntur vel?</p>
      <h2>Here is our location</h2>
      <div>
        <h1>GOOGLE MAPS</h1>
      </div>
    </Page>
  )
}

export default About
