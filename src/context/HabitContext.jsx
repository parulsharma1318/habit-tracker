import { createContext, useContext, useReducer, useEffect } from 'react'
import { getWeekDays } from '../utils/dateUtils'

const HabitContext = createContext()

const habitReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, action.payload]
      }

      case 'DELETE_HABIT':
  return {
    ...state,
    habits: state.habits.filter(habit => habit.id !== action.payload)
  }

  case 'EDIT_HABIT':
  return {
    ...state,
    habits: state.habits.map(habit =>
      habit.id === action.payload.id
        ? { ...habit, name: action.payload.name }
        : habit
    )
  }

  case "SYNC_WEEK":
  return {
    ...state,
    habits: state.habits.map(habit => ({
      ...habit,
      week: action.payload
    }))
  }

    case 'TOGGLE_HABIT':
  const updatedHabits = state.habits.map(habit => {

    if (habit.id === action.payload.habitId) {

      const dayIndex = habit.week.findIndex(
        day => day.date === action.payload.date
      )

      if (dayIndex !== -1) {

        const updatedWeek = [...habit.week]

        updatedWeek[dayIndex] = {
          ...updatedWeek[dayIndex],
          status: action.payload.status
        }

        let updatedCompletedDates = [...(habit.completedDates || [])]

        if (action.payload.status === 'completed') {
          if (!updatedCompletedDates.includes(action.payload.date)) {
            updatedCompletedDates.push(action.payload.date)
          }
        }

        if (action.payload.status !== 'completed') {
          updatedCompletedDates =
            updatedCompletedDates.filter(
              d => d !== action.payload.date
            )
        }

        const newStreak = calculateStreak(updatedCompletedDates)

        return {
  ...habit,
  week: updatedWeek,
  completedDates: updatedCompletedDates,
  streak: newStreak,
  longestStreak: Math.max(habit.longestStreak || 0, newStreak)
}
      }
    }

    return habit
  })

  return { ...state, habits: updatedHabits }

  case 'SET_NOTES':
  return {
    ...state,
    notes: {
      ...state.notes,
      [action.payload.date]: action.payload.note
    }
  }

  case 'CLEAR_NOTES':
  return {
    ...state,
    notes: {}
  }

  case 'DELETE_NOTE':
  const updatedNotes = { ...state.notes }
  delete updatedNotes[action.payload]

  return {
    ...state,
    notes: updatedNotes
  }

    case 'LOAD_DATA':
      return action.payload

    default:
      return state
  }
}

const calculateStreak = (dates) => {

  if (!dates || dates.length === 0) return 0

  const sorted = [...dates].sort()

  let streak = 1

  for (let i = sorted.length - 1; i > 0; i--) {

    const current = new Date(sorted[i])
    const previous = new Date(sorted[i - 1])

    const diff =
      (current - previous) / (1000 * 60 * 60 * 24)

    if (diff === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitReducer, {
    habits: [],
    notes: {}
  })

 useEffect(() => {
  const data = localStorage.getItem("habitTracker")

  if (data) {
    const parsed = JSON.parse(data)

    dispatch({
      type: "LOAD_DATA",
      payload: parsed
    })
  }

  // NEW — sync week
  syncWeekIfNeeded()

}, [])

 useEffect(() => {

  if (state.habits.length === 0 && Object.keys(state.notes).length === 0) {
    return
  }

  localStorage.setItem('habitTracker', JSON.stringify(state))

}, [state])

  const addHabit = (name, color) => {

  const week = getWeekDays()

  dispatch({
    type: "ADD_HABIT",
    payload: {
      id: Date.now().toString(),
      name,
      color,
      week,
      streak: 0,
      longestStreak: 0,
      completedDates: []
    }
  })
}

  const toggleHabit = (habitId, date, currentStatus) => {
    const status =
      currentStatus === 'empty'
        ? 'completed'
        : currentStatus === 'completed'
        ? 'missed'
        : 'empty'

    dispatch({
      type: 'TOGGLE_HABIT',
      payload: { habitId, date, status }
    })
  }

  const setNote = (date, note) => {
    dispatch({
      type: 'SET_NOTES',
      payload: { date, note }
    })
  }

  const deleteHabit = (habitId) => {
  dispatch({
    type: 'DELETE_HABIT',
    payload: habitId
  })
}

const editHabit = (id, name) => {
  dispatch({
    type: 'EDIT_HABIT',
    payload: { id, name }
  })
}

const clearNotes = () => {
  dispatch({
    type: 'CLEAR_NOTES'
  })
}

const deleteNote = (date) => {
  dispatch({
    type: 'DELETE_NOTE',
    payload: date
  })
}

const syncWeekIfNeeded = () => {
  const currentWeek = getWeekDays()

  dispatch({
    type: "SYNC_WEEK",
    payload: currentWeek
  })
}

  return (
    <HabitContext.Provider
      value={{
  ...state,
  addHabit,
  toggleHabit,
  setNote,
  deleteHabit,
  editHabit,
  clearNotes,
  deleteNote
}}
    >
      {children}
    </HabitContext.Provider>
  )
}

export const useHabits = () => useContext(HabitContext);