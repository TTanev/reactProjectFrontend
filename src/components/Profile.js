import React, { useEffect, useContext, useState } from "react"
import Page from "./Page"
import { useParams } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"
import ProfilePosts from "./ProfilePosts"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" },
  })

  useEffect(() => {
    const currentRequest = Axios.CancelToken.source()

    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: currentRequest.token })
        setProfileData(response.data)
      } catch (e) {
        console.log("Error fetching user data.")
      }
    }

    fetchData()
    return () => {
      currentRequest.cancel()
    }
  }, [])

  return (
    <Page title="Profile Screen">
      <h2 className="profileTitle">
        <img className="avatar" src={profileData.profileAvatar} /> <span>{profileData.profileUsername}</span>
        <button className="">Follow +</button>
      </h2>

      <div className="profileCounts">
        <a href="#" className="">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="">
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  )
}

export default Profile
