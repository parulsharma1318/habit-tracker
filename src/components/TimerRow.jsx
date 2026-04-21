import { useEffect } from "react"
import { Play, Pause, RotateCcw, Trash2, Pencil } from "lucide-react"
import { useTimers } from "../context/TimerContext"

const TimerRow = ({ timer }) => {

  const { updateTimer, deleteTimer, editTimer } =
    useTimers()

  /* REAL TIMER LOGIC */

  useEffect(() => {

    let interval

    if (timer.running && timer.startTime) {

      interval = setInterval(() => {

        const now = Date.now()

        const elapsed = Math.floor(
          (now - timer.startTime) / 1000
        )

        updateTimer({
          ...timer,
          seconds: elapsed
        })

      }, 1000)

    }

    return () => clearInterval(interval)

  }, [timer.running, timer.startTime])

  /* START / PAUSE */

  const toggle = () => {

    if (!timer.running) {

      updateTimer({
        ...timer,
        running: true,
        startTime:
          Date.now() - timer.seconds * 1000
      })

    } else {

      updateTimer({
        ...timer,
        running: false
      })

    }

  }

  /* RESET */

  const reset = () => {

    updateTimer({
      ...timer,
      seconds: 0,
      running: false,
      startTime: null
    })

  }

  /* EDIT NAME */

  const handleEdit = () => {

    const newName = prompt(
      "Edit timer name:",
      timer.name
    )

    if (newName && newName.trim()) {

      editTimer(
        timer.id,
        newName.trim()
      )

    }

  }

  /* FORMAT TIME */

  const formatTime = (s) => {

    const h =
      Math.floor(s / 3600)

    const m =
      Math.floor((s % 3600) / 60)

    const sec =
      s % 60

    return `${h
      .toString()
      .padStart(2,"0")}:${m
      .toString()
      .padStart(2,"0")}:${sec
      .toString()
      .padStart(2,"0")}`

  }

  return (

    <div className="bg-white/5 rounded-xl p-4 space-y-3">

      {/* NAME + TIME */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        <div className="font-medium break-words">

          {timer.name}

        </div>

        <div className="font-mono text-xl font-bold text-blue-400">

          {formatTime(timer.seconds)}

        </div>

      </div>

      {/* BUTTONS */}

      <div className="flex flex-wrap gap-2 sm:gap-3">

        <button
          onClick={toggle}
          className="btn-primary flex items-center justify-center px-4 py-2 flex-1 sm:flex-none"
        >
          {timer.running
            ? <Pause size={18} />
            : <Play size={18} />}
        </button>

        <button
          onClick={reset}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center justify-center flex-1 sm:flex-none"
        >
          <RotateCcw size={18} />
        </button>

        <button
          onClick={() =>
            deleteTimer(timer.id)
          }
          className="text-red-400 border border-red-400 px-4 py-2 rounded-lg flex items-center justify-center flex-1 sm:flex-none"
        >
          <Trash2 size={18} />
        </button>

        <button
          onClick={handleEdit}
          className="text-blue-400 border border-blue-400 px-4 py-2 rounded-lg flex items-center justify-center flex-1 sm:flex-none"
        >
          <Pencil size={18} />
        </button>

      </div>

    </div>

  )

}

export default TimerRow;