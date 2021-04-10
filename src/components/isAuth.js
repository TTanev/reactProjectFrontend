import { useContext } from "react"
import { useHistory } from "react-router-dom"
import StateContext from "../StateContext"

const isAuth = InnerComponent => {
  const OutherComponent = props => {
    const appContext = useContext(StateContext)
    const history = useHistory()
    // console.log(appContext)

    if (!appContext.loggedIn) {
      history.push("/")

      return null
    }

    return <InnerComponent {...props} />
  }

  return OutherComponent
}

export default isAuth
