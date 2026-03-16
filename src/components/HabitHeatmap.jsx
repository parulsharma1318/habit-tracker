import { useState } from "react"
import { useHabits } from "../context/HabitContext"

const HabitHeatmap = () => {

  const { habits } = useHabits()

  const [selectedHabit, setSelectedHabit] = useState("all")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Generate calendar grid
  const generateCalendarDays = () => {

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const prevMonthDays = new Date(year, month, 0).getDate()

    const calendar = []

    // Previous month days
    for (let i = firstDayOfMonth; i > 0; i--) {
      calendar.push({
        date: new Date(year, month - 1, prevMonthDays - i + 1),
        currentMonth: false
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push({
        date: new Date(year, month, i),
        currentMonth: true
      })
    }

    // Next month days
    while (calendar.length < 42) {
      const nextDay = calendar.length - (firstDayOfMonth + daysInMonth) + 1

      calendar.push({
        date: new Date(year, month + 1, nextDay),
        currentMonth: false
      })
    }

    return calendar
  }

  const calendarDays = generateCalendarDays()

  const getCompletionCount = (date) => {

    if (selectedHabit === "all") {
      return habits.filter(h =>
        h.completedDates?.includes(date)
      ).length
    }

    const habit = habits.find(h => h.id === selectedHabit)

    return habit?.completedDates?.includes(date) ? 1 : 0
  }

 const getColor = (count) => {

  if (count === 0) return "bg-white/10"
  if (count === 1) return "bg-emerald-900"
  if (count === 2) return "bg-emerald-700"
  if (count === 3) return "bg-emerald-500"
  return "bg-emerald-400"

}

  const prevMonth = () => {
    const date = new Date(currentMonth)
    date.setMonth(date.getMonth() - 1)
    setCurrentMonth(date)
  }

  const nextMonth = () => {
    const date = new Date(currentMonth)
    date.setMonth(date.getMonth() + 1)
    setCurrentMonth(date)
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (

    <div className="glass p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl space-y-6">

      {/* Month Navigation */}

      <div className="flex items-center justify-between flex-wrap gap-4">

        <button
          onClick={prevMonth}
          className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20"
        >
          ←
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center flex-1">
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button
          onClick={nextMonth}
          className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20"
        >
          →
        </button>

      </div>

      {/* Habit Filter */}

      <select
  value={selectedHabit}
  onChange={(e) => setSelectedHabit(e.target.value)}
  className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
>
        <option value="all" className="text-black">
  All Habits
</option>

{habits.map(habit => (
  <option
    key={habit.id}
    value={habit.id}
    className="text-black"
  >
    {habit.name}
  </option>
))}

      </select>

      {/* Weekday Labels */}

      <div className="grid grid-cols-7 text-xs sm:text-sm text-gray-400">

        {weekdays.map(day => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}

      </div>

      {/* Calendar Grid */}

      <div className="grid grid-cols-7 gap-2 sm:gap-3">

        {calendarDays.map((day, index) => {

          const iso = day.date.getFullYear() + "-" +
  String(day.date.getMonth() + 1).padStart(2, "0") + "-" +
  String(day.date.getDate()).padStart(2, "0")
          const count = getCompletionCount(iso)

          return (

            <div
              key={index}
              title={`${iso} — ${count} habits completed`}
              className={`h-10 sm:h-12 md:h-14 rounded-lg transition transform hover:scale-105 flex items-center justify-center text-xs sm:text-sm transition
              ${day.currentMonth ? getColor(count) : "bg-white/5 text-gray-500"}
              `}
            >

              {day.date.getDate()}

            </div>

          )

        })}

      </div>

{/* Heatmap Legend */}

<div className="flex items-center justify-end gap-2 text-xs text-gray-400 pt-4">

  <span>Less</span>

  <div className="flex gap-1">

    <div className="w-4 h-4 rounded bg-white/10"></div>
    <div className="w-4 h-4 rounded bg-emerald-900"></div>
    <div className="w-4 h-4 rounded bg-emerald-700"></div>
    <div className="w-4 h-4 rounded bg-emerald-500"></div>
    <div className="w-4 h-4 rounded bg-emerald-400"></div>

  </div>

  <span>More</span>

</div>
    </div>

  )

}

export default HabitHeatmap;