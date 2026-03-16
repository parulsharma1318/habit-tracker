import HabitTable from '../components/HabitTable'

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
          Track Your Habits
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl">
          Monitor your daily progress with our premium habit tracking system. 
          Stay consistent and watch your streaks grow.
        </p>
      </div>
      <HabitTable />
    </div>
  )
}

export default Dashboard;