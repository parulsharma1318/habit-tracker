import { Flame, Trash2, Pencil } from 'lucide-react'
import { useHabits } from '../context/HabitContext'

const HabitRow = ({ habit, weekDays }) => {
  const { toggleHabit, deleteHabit, editHabit } = useHabits()
  const handleEdit = () => {
  const newName = prompt("Edit habit name:", habit.name)

  if (newName && newName.trim()) {
    editHabit(habit.id, newName.trim())
  }
}

  return (
    <tr className="group hover:bg-white/5 transition-all duration-200 border-b border-white/10 last:border-b-0">
      <td className="py-6 pr-8 font-medium text-gray-200">

  <div className="flex items-center gap-3">

    <span
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: habit.color || "green" }}
    />

    <span>{habit.name}</span>

  </div>

</td>
      
      {weekDays.map(day => {
        const dayData = habit.week.find(d => d.date === day.date)
        const status = dayData?.status || 'empty'
        
        return (
          <td key={day.date} className="p-0">
            <div
              className={`habit-cell mx-1 my-2 ${status === 'completed' ? 'habit-completed' : status === 'missed' ? 'habit-missed' : 'habit-empty'}`}
              onClick={() => toggleHabit(habit.id, day.date, status)}
              title={`Mark ${status === 'completed' ? 'as missed' : status === 'missed' ? 'as empty' : 'as completed'} on ${day.label}`}
            >
              {status === 'completed' && '✔'}
              {status === 'missed' && '✘'}
            </div>
          </td>
        )
      })}
      
      <td className="py-4 sm:py-6 pl-4 sm:pl-8 text-right">
  <div className="flex items-center justify-end gap-3">

    {habit.streak > 0 && (
      <div className="flex items-center space-x-2 text-orange-400">
        <Flame className="w-4 h-4 fill-current" />
        <span className="font-bold">{habit.streak}</span>
      </div>
    )}

    <button
      onClick={handleEdit}
      className="text-blue-400 hover:text-blue-500 transition"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={() => deleteHabit(habit.id)}
      className="text-red-400 hover:text-red-500 transition"
    >
      <Trash2 size={18} />
    </button>

  </div>
</td>
    </tr>
  )
}

export default HabitRow;