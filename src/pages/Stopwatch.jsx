import AddTimer from "../components/AddTimer"
import TimerRow from "../components/TimerRow"
import { useTimers } from "../context/TimerContext"

const StopwatchPage = () => {

  const {
    timers,
    resetAllTimers
  } = useTimers()

  /* CALCULATE TOTAL TIME */

  const totalSeconds = timers.reduce(
    (sum, timer) =>
      sum + timer.seconds,
    0
  )

  /* FORMAT TIME */

  const formatTime = (seconds) => {

    const hrs =
      Math.floor(seconds / 3600)

    const mins =
      Math.floor((seconds % 3600) / 60)

    const secs =
      seconds % 60

    return `${hrs
      .toString()
      .padStart(2,"0")}:${mins
      .toString()
      .padStart(2,"0")}:${secs
      .toString()
      .padStart(2,"0")}`

  }

  return (

    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}

      <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
        Time Tracker
      </h1>

      <p className="text-gray-400 text-lg">
        Track time for different activities with individual timers.
      </p>

      {/* TOTAL TIME + RESET ALL */}

      <div className="glass p-6 rounded-2xl flex items-center justify-between">

        <div>

          <p className="text-gray-400">
            Total Time
          </p>

          <h2 className="text-3xl font-mono font-bold text-blue-400">

            {formatTime(totalSeconds)}

          </h2>

        </div>

        <button
          onClick={resetAllTimers}
          className="px-5 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-medium transition"
        >
          Reset All
        </button>

      </div>

      {/* ADD TIMER */}

      <AddTimer />

      {/* TIMER LIST */}

      <div className="space-y-3 sm:space-y-4">

        {timers.length === 0 && (

          <div className="text-center text-gray-400 py-10">
            No timers yet. Add your first timer.
          </div>

        )}

        {timers.map(timer => (

          <TimerRow
            key={timer.id}
            timer={timer}
          />

        ))}

      </div>

    </div>

  )

}

export default StopwatchPage;