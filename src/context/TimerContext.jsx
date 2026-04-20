import { createContext, useContext, useReducer, useEffect } from "react"

const TimerContext = createContext()

const reducer = (state, action) => {

  switch (action.type) {

    case "RESET_ALL":

  return {
    ...state,
    timers: state.timers.map(timer => ({
      ...timer,
      seconds: 0,
      running: false
    }))
  }

  case "EDIT_TIMER":

  return {
    ...state,
    timers: state.timers.map(timer =>
      timer.id === action.payload.id
        ? {
            ...timer,
            name: action.payload.name
          }
        : timer
    )
  }

    case "ADD_TIMER":

      return {
        ...state,
        timers: [
          ...state.timers,
          {
            id: Date.now().toString(),
            name: action.payload,
            seconds: 0,
            running: false
          }
        ]
      }

    case "DELETE_TIMER":

      return {
        ...state,
        timers: state.timers.filter(
          t => t.id !== action.payload
        )
      }

    case "UPDATE_TIMER":

      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? action.payload
            : timer
        )
      }

    case "LOAD_DATA":

      return action.payload

    default:

      return state
  }

}

export const TimerProvider = ({ children }) => {

  const getInitialState = () => {

  try {

    const saved =
      localStorage.getItem("timers")

    if (saved) {

      return JSON.parse(saved)

    }

  } catch (error) {

    console.log("Failed to load timers")

  }

  return {
    timers: []
  }

}

const [state, dispatch] =
  useReducer(reducer, null, getInitialState)

  useEffect(() => {

    const saved =
      localStorage.getItem("timers")

    if (saved) {

      dispatch({
        type: "LOAD_DATA",
        payload: JSON.parse(saved)
      })

    }

  }, [])

  useEffect(() => {

  const handleUnload = () => {

    localStorage.setItem(
      "timers",
      JSON.stringify(state)
    )

  }

  window.addEventListener(
    "beforeunload",
    handleUnload
  )

  return () =>
    window.removeEventListener(
      "beforeunload",
      handleUnload
    )

}, [state])

  useEffect(() => {

    localStorage.setItem(
      "timers",
      JSON.stringify(state)
    )

  }, [state])

  const resetAllTimers = () => {

  dispatch({
    type: "RESET_ALL"
  })

}

  const addTimer = (name) => {

    dispatch({
      type: "ADD_TIMER",
      payload: name
    })

  }

  const deleteTimer = (id) => {

    dispatch({
      type: "DELETE_TIMER",
      payload: id
    })

  }

  const updateTimer = (timer) => {

    dispatch({
      type: "UPDATE_TIMER",
      payload: timer
    })

  }

  const editTimer = (id, name) => {

  dispatch({
    type: "EDIT_TIMER",
    payload: {
      id,
      name
    }
  })

}

  return (

    <TimerContext.Provider
      value={{
        timers: state.timers,
        addTimer,
        deleteTimer,
        updateTimer,
        resetAllTimers,
        editTimer
      }}
    >

      {children}

    </TimerContext.Provider>

  )

}

export const useTimers =
  () => useContext(TimerContext);