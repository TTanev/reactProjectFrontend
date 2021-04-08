import React, { useContext, useEffect } from "react"
import DispatchContext from "../DispatchContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import LoadingAnimation from "./LoadingAnimation"
import { Link } from "react-router-dom"
import Post from "./Post"

function Search() {
  const appDispatch = useContext(DispatchContext)

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0,
    isLoading: false,
  })

  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler)

    return () => document.removeEventListener("keyup", searchKeyPressHandler)
  }, [])

  useEffect(() => {
    if (state.searchTerm.trim()) {
      const delay = setTimeout(() => {
        setState(draft => {
          draft.requestCount++
        })
      }, 700)

      return () => clearTimeout(delay)
    } else {
      setState(draft => {
        draft.show = "neither"
      })
    }
  }, [state.searchTerm])

  useEffect(() => {
    if (state.requestCount) {
      const currentReques = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/search", { searchTerm: state.searchTerm }, { cancelToken: currentReques.token })
          setState(draft => {
            draft.results = response.data
            draft.show = "results"
          })
        } catch (error) {
          console.log("Search request problem / cancelation")
        }
      }
      fetchResults()
      return () => currentReques.cancel()
    }
  }, [state.requestCount])

  function searchKeyPressHandler(e) {
    if (e.keyCode == 27) {
      appDispatch({ type: "closeSearch" })
    }
  }

  function handleInput(e) {
    const value = e.target.value
    setState(draft => {
      draft.searchTerm = value
      draft.show = "loading"
    })
  }

  return (
    <div className="searchModal">
      <div className="searchTop">
        <label htmlFor="live-search-field" className="searchIcon">
          <i className="fas fa-search"></i>
        </label>
        <input onChange={handleInput} autoFocus type="text" autoComplete="off" id="live-search-field" className="" placeholder="Find Friends and Tasks" />
        <span onClick={() => appDispatch({ type: "closeSearch" })} className="searchTop__close">
          <i className="fas fa-times-circle"></i>
        </span>
      </div>

      <div className="searchBottom">
        {state.show == "loading" && <LoadingAnimation />}
        {state.show == "results" && (
          <div className="profilePosts">
            <div className="resultsListHeading">
              <strong>Search Results</strong> ({state.results.length} item{state.results.length == 1 ? "" : "s"} found)
            </div>

            {state.results.map(post => {
              return <Post post={post} key={post._id} onClick={() => appDispatch({ type: "closeSearch" })} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
