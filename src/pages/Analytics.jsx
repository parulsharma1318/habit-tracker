import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import { useHabits } from '../context/HabitContext'
import { getWeekDays } from '../utils/dateUtils'

const Analytics = () => {
  const { habits } = useHabits()
  
 const weekDays = getWeekDays()

const chartData = habits.map(habit => ({
  name: habit.name,
  completed:
    habit.completedDates?.filter(date =>
      weekDays.some(day => day.date === date)
    ).length || 0,
  total: 7,
  streak: habit.streak
}))

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16']

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
          Analytics
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Visualize your habit completion trends and track your progress over time.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold mb-8">Weekly Habit Completion</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#d1d5db' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#d1d5db' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px'
              }}
            />
            <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl">
          <h4 className="text-xl font-bold mb-6">Top Streaks</h4>
          <div className="space-y-4">
            {chartData
              .sort((a, b) => b.streak - a.streak)
              .slice(0, 3)
              .map((habit, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="font-medium">{habit.name}</span>
                  <span className="font-bold text-orange-400">{habit.streak} days 🔥</span>
                </div>
              ))}
          </div>
        </div>

        <div className="glass p-8 rounded-3xl shadow-2xl">
          <h4 className="text-xl font-bold mb-6">Habit Consistency</h4>
          <div className="space-y-3">
            {chartData.map((habit, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm font-medium truncate">{habit.name}</span>
                <div className="w-20 bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                    style={{ width: `${(habit.completed / 7) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-mono">{habit.completed}/7</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;