import { useHabits } from "../context/HabitContext"

const Notes = () => {

  const { notes, habits } = useHabits()

  const sortedNotes = Object.entries(notes)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))

  const getStreakUntilDate = (date) => {

    let longest = 0

    habits.forEach(habit => {

      const completed = (habit.completedDates || [])
        .filter(d => new Date(d) <= new Date(date))
        .sort()

      let streak = 1

      for (let i = 1; i < completed.length; i++) {

        const diff =
          (new Date(completed[i]) - new Date(completed[i - 1])) /
          (1000 * 60 * 60 * 24)

        if (diff === 1) {
          streak++
          longest = Math.max(longest, streak)
        } else {
          streak = 1
        }

      }

    })

    return longest
  }

  return (

    <div className="max-w-6xl mx-auto space-y-10">

      <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
        Notes / Journal
      </h1>

      <p className="text-gray-400 text-lg">
        Your daily reflections and habit journey.
      </p>

      <div className="space-y-4">

        {sortedNotes.length === 0 && (
          <div className="text-gray-400">
            No notes yet.
          </div>
        )}

        {sortedNotes.map(([date, text]) => (

          <div
            key={date}
            className="glass p-6 rounded-2xl space-y-3"
          >

            <div className="text-gray-400 text-sm">
              {date}
            </div>

            <div className="text-gray-200">
              {typeof text === "string" ? text : text?.text}
            </div>

            <div className="text-xs text-orange-400">
              Best Streak: {getStreakUntilDate(date)} 🔥
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Notes;