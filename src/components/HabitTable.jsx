import HabitRow from './HabitRow'
import AddHabit from './AddHabit'
import ProgressCard from './ProgressCard'
import NotesSection from './NotesSection'
import { useHabits } from '../context/HabitContext'
import { getWeekDays } from '../utils/dateUtils'
import EmptyState from './EmptyState'

const HabitTable = () => {
  const { habits } = useHabits()
  const weekDays = getWeekDays()

  if (habits.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      <ProgressCard />
      
      <div className="glass p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Weekly Tracker
          </h2>
          <AddHabit />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left pb-4 pr-8 font-semibold text-gray-300">Habit</th>
                {weekDays.map(day => (
                  <th key={day.date} className="text-center pb-4 px-2 font-semibold text-gray-300">
                    {day.label}
                    <div className="text-sm text-gray-500 mt-1">{day.date}</div>
                  </th>
                ))}
                <th className="text-right pb-4 pl-8 font-semibold text-gray-300">Streak</th>
              </tr>
            </thead>
            <tbody>
              {habits.map(habit => (
                <HabitRow key={habit.id} habit={habit} weekDays={weekDays} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NotesSection />
    </div>
  )
}

export default HabitTable;