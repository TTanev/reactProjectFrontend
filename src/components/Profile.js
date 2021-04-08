import React, { useEffect, useContext } from "react"
import { useImmer } from "use-immer"
import Page from "./Page"
import { useParams, NavLink, Switch, Route } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"
import ProfilePosts from "./ProfilePosts"
// import ProfileFollowers from "./ProfileFollowers"
// import ProfileFollowing from "./ProfileFollowing"
import ProfileFollow from "./ProfileFollow"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsername: "...",
      profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" },
    },
  })

  useEffect(() => {
    const currentRequest = Axios.CancelToken.source()

    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: currentRequest.token })
        setState(draft => {
          draft.profileData = response.data
        })
      } catch (e) {
        console.log("Error fetching user data.")
      }
    }

    fetchData()
    return () => {
      currentRequest.cancel()
    }
  }, [username])

  useEffect(() => {
    if (state.startFollowingRequestCount) {
      const currentRequest = Axios.CancelToken.source()
      setState(draft => {
        draft.followActionLoading = true
      })

      async function fetchData() {
        try {
          const response = await Axios.post(`/addFollow/${state.profileData.profileUsername}`, { token: appState.user.token }, { cancelToken: currentRequest.token })
          setState(draft => {
            draft.profileData.isFollowing = true
            draft.profileData.counts.followerCount++
            draft.followActionLoading = false
          })
        } catch (e) {
          console.log("Error fetching user data.")
        }
      }

      fetchData()
      return () => {
        currentRequest.cancel()
      }
    }
  }, [state.startFollowingRequestCount])

  useEffect(() => {
    if (state.startFollowingRequestCount) {
      const currentRequest = Axios.CancelToken.source()
      setState(draft => {
        draft.followActionLoading = true
      })

      async function fetchData() {
        try {
          const response = await Axios.post(`/removeFollow/${state.profileData.profileUsername}`, { token: appState.user.token }, { cancelToken: currentRequest.token })
          setState(draft => {
            draft.profileData.isFollowing = false
            draft.profileData.counts.followerCount--
            draft.followActionLoading = false
          })
        } catch (e) {
          console.log("Error fetching user data.")
        }
      }

      fetchData()
      return () => {
        currentRequest.cancel()
      }
    }
  }, [state.stopFollowingRequestCount])

  // function checkConditions() {
  //   console.log(appState.loggedIn)
  //   console.log(!state.profileData.isFollowing)
  //   console.log(appState.user.username != state.profileData.profileUsername)
  //   console.log(state.profileData.profileUsername != "...")
  //   console.log("br")
  // }
  // checkConditions()

  function startFollowing() {
    setState(draft => {
      draft.startFollowingRequestCount++
    })
  }
  function stopFollowing() {
    setState(draft => {
      draft.stopFollowingRequestCount++
    })
  }
  return (
    <Page title="Profile Screen">
      <h2 className="profileTitle">
        <img className="avatar" src={state.profileData.profileAvatar} /> <span>{state.profileData.profileUsername}</span>
        {appState.loggedIn && !state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != "..." && (
          <button onClick={startFollowing} disabled={state.followActionLoading} className="">
            Follow +
          </button>
        )}
        {appState.loggedIn && state.profileData.isFollowing && appState.user.username != state.profileData.profileUsername && state.profileData.profileUsername != "..." && (
          <button style={{ color: "darkred" }} onClick={stopFollowing} disabled={state.followActionLoading} className="">
            Follow -
          </button>
        )}
      </h2>

      <div className="profileCounts">
        <NavLink activeClassName="profileCounts__active" exact to={`/profile/${state.profileData.profileUsername}`} className="profileCounts__category">
          Posts: {state.profileData.counts.postCount}
        </NavLink>
        <NavLink activeClassName="profileCounts__active" to={`/profile/${state.profileData.profileUsername}/followers`} className="profileCounts__category">
          Followers: {state.profileData.counts.followerCount}
        </NavLink>
        <NavLink activeClassName="profileCounts__active" to={`/profile/${state.profileData.profileUsername}/following`} className="profileCounts__category">
          Following: {state.profileData.counts.followingCount}
        </NavLink>
      </div>
      <Switch>
        <Route exact path="/profile/:username">
          <ProfilePosts />
        </Route>
        <Route path="/profile/:username/followers">
          <ProfileFollow action="followers" />
        </Route>
        <Route path="/profile/:username/following">
          <ProfileFollow action="following" />
        </Route>
      </Switch>
    </Page>
  )
}

export default Profile
