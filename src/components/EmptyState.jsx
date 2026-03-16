import { PlusCircle } from 'lucide-react'
import AddHabit from './AddHabit'

const EmptyState = () => {
  return (
    <div className="text-center py-24 space-y-8">
      <div className="w-32 h-32 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-8">
        <PlusCircle className="w-20 h-20 text-gray-400" />
      </div>
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          No habits yet
        </h2>
        <p className="text-xl text-gray-400">
          Start building better habits by adding your first habit to track.
        </p>
      </div>
      <AddHabit />
    </div>
  )
}

export default EmptyState;