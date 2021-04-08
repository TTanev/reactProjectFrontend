import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingAnimation from "./LoadingAnimation"

function ProfileFollow(props) {
  const action = props.action
  console.log(action)

  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const currentRequest = Axios.CancelToken.source()

    async function fetchData() {
      try {
        const response = await Axios.get(`/profile/${username}/${action}`, { cancelToken: currentRequest.token })
        setUsers(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(`There was a problem fetching Profile ${action}`)
      }
    }

    fetchData()
    return () => [currentRequest.cancel()]
  }, [action])

  if (isLoading) return <LoadingAnimation />
  if (!users.length) return <h1 className="tac wrapper wrapper--small marginTB">{action == "followers" ? "You have no followers yet. Start being more involved!" : "Search for the activity of your peers and roll your sleeves!"}</h1>

  return (
    <div className="profilePosts">
      {users.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="profilePost">
            <img className="avatar" src={follower.avatar} /> {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileFollow
