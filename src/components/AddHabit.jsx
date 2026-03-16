import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useHabits } from '../context/HabitContext'

const AddHabit = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [habitName, setHabitName] = useState('')
  const [color, setColor] = useState("green")

  const { addHabit } = useHabits()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (habitName.trim()) {
      addHabit(habitName.trim(), color)
      setHabitName('')
      setColor("green")
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Habit</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass p-8 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">New Habit</h3>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="What habit do you want to track?"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />

              {/* Color Picker */}
              <div className="flex gap-3 py-2">

                {["green","blue","purple","orange","pink"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      color === c ? "border-white scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}

              </div>

              <div className="flex space-x-3 pt-2">

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-6 border border-white/20 rounded-xl hover:bg-white/10 text-gray-300"
                >
                  Cancel
                </button>

                <button type="submit" className="btn-primary flex-1">
                  Create Habit
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddHabit;