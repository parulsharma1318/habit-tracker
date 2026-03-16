import { useHabits } from '../context/HabitContext'
import { TrendingUp } from 'lucide-react'

const ProgressCard = () => {
  const { habits } = useHabits()
  
  const totalCells = habits.length * 7
  const completedCells = habits.reduce((acc, habit) => {
    return acc + habit.week.filter(day => day.status === 'completed').length
  }, 0)
  
  const percentage = totalCells > 0 ? Math.round((completedCells / totalCells) * 100) : 0

  return (
    <div className="glass p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-100 mb-1">Weekly Progress</h3>
          <p className="text-gray-400">This week completion rate</p>
        </div>
        <TrendingUp className="w-12 h-12 text-blue-400" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {percentage}%
            <p className="text-sm text-gray-400 mt-1">
Consistency Score
</p>
          </span>
          <span className="text-sm text-gray-400">
            {completedCells}/{totalCells} completed
          </span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full shadow-lg transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressCard;