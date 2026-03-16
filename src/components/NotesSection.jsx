import { useState, useEffect } from "react"
import { useHabits } from "../context/HabitContext"
import { getWeekDays } from "../utils/dateUtils"
import { Edit3 } from "lucide-react"

const NotesSection = () => {

  const { notes, setNote } = useHabits()

  const [activeDate, setActiveDate] = useState(null)
  const [noteText, setNoteText] = useState("")

  const weekDays = getWeekDays()

  useEffect(() => {

    if (activeDate && notes[activeDate]) {

      const saved = notes[activeDate]

      setNoteText(
        typeof saved === "string"
          ? saved
          : saved?.text || ""
      )

    }

  }, [activeDate, notes])

  const handleNoteChange = (date) => {

    setActiveDate(date)

    const saved = notes[date]

    setNoteText(
      typeof saved === "string"
        ? saved
        : saved?.text || ""
    )

  }

  const saveNote = () => {

    if (!activeDate) return

    setNote(activeDate, noteText.trim())

  }

  return (

    <div className="glass p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl">

      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Daily Notes
      </h3>

      {/* Week selector */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 sm:gap-4 mb-6">

        {weekDays.map(day => (

          <button
            key={day.date}
            onClick={() => handleNoteChange(day.date)}
            className={`p-4 rounded-xl transition-all duration-200 h-24 flex flex-col items-center justify-center group ${
              activeDate === day.date
                ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg border-2 border-white/50"
                : "bg-white/10 hover:bg-white/20 border border-white/20 hover:shadow-md"
            }`}
          >

            <div className="font-semibold mb-1">{day.label}</div>
            <div className="text-xs text-gray-400">{day.date}</div>

            {notes[day.date] && (
              <div className="mt-1 w-2 h-2 bg-emerald-400 rounded-full" />
            )}

          </button>

        ))}

      </div>

      {activeDate && (

        <div className="space-y-4">

          <div className="flex items-center space-x-3">
            <Edit3 className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-gray-300">
              Note for {weekDays.find(d => d.date === activeDate)?.label}
            </span>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="What did you accomplish today?"
            className="w-full p-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            onBlur={saveNote}
          />

        </div>

      )}

    </div>

  )

}

export default NotesSection;