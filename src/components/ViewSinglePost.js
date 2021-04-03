import React, { useEffect } from "react"
import Page from "./Page"

function ViewSinglePost() {
  return (
    <Page title="hardcpded title">
      <div className="singlePost__title">
        <h2>Example Post Title</h2>
        <span className="">
          <a href="#" className="singlePost__edit" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="singlePost__del" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="singlePost__info">
        <a href="#">
          <img className="singlePost__avatar" src={localStorage.getItem("tomappAvatar")} />
        </a>
        Posted by <a href="#">asdasda</a> on 4/3/2021
      </p>

      <div className="singlePost__content">
        <p>Some Post I wrote</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam maxime corporis consequatur nihil tempora tempore eaque exercitationem quos aliquid corrupti assumenda optio nesciunt in perferendis minus similique, dolore provident cumque possimus, officiis ut atque eveniet aspernatur voluptatum. Laudantium, numquam accusantium.</p>
      </div>
    </Page>
  )
}

export default ViewSinglePost
