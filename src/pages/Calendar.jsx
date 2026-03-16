import HabitHeatmap from "../components/HabitHeatmap"

const Calendar = () => {

  return (

    <div className="max-w-7xl mx-auto space-y-8">

      <div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
          Habit Calendar
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl">
          Visualize your habit completion history month by month.
        </p>

      </div>

      <HabitHeatmap />

    </div>

  )

}

export default Calendar;