import React, { useEffect } from "react"
import Page from "./Page"

function ViewSinglePost() {
  return (
    <Page title="hardcpded title">
      <div className="">
        <h2>Example Post Title</h2>
        <span className="pt-2">
          <a href="#" className="" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="">
        <a href="#">
          <img className="" src={localStorage.getItem("tomappAvatar")} />
        </a>
        Posted by <a href="#">asdasda</a> on 4/3/2021
      </p>

      <div className="">
        <p>Some Post I wrote</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam maxime corporis consequatur nihil tempora tempore eaque exercitationem quos aliquid corrupti assumenda optio nesciunt in perferendis minus similique, dolore provident cumque possimus, officiis ut atque eveniet aspernatur voluptatum. Laudantium, numquam accusantium.</p>
      </div>
    </Page>
  )
}

export default ViewSinglePost
