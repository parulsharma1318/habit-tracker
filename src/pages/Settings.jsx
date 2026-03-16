import { useState } from "react"
import { useHabits } from "../context/HabitContext"
import toast from "react-hot-toast"
import { getWeekDays } from "../utils/dateUtils"

const Settings = () => {

  const { habits, notes } = useHabits()
  const [fileName, setFileName] = useState("")

  const exportData = () => {

    const data = {
      habits,
      notes
    }

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    )

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "habit-data.json"
    a.click()

    URL.revokeObjectURL(url)

  }

const importData = (event) => {

  const file = event.target.files[0]
  if (!file) return

  setFileName(file.name)

  const reader = new FileReader()

  reader.onload = (e) => {

    try {

      const imported = JSON.parse(e.target.result)

      if (!imported.habits) {
        toast.error("Invalid backup file")
        return
      }

      // generate current week
      const currentWeek = getWeekDays()

      const updatedHabits = imported.habits.map(habit => ({
        ...habit,
        week: currentWeek
      }))

      const updatedData = {
        ...imported,
        habits: updatedHabits
      }

      localStorage.setItem(
        "habitTracker",
        JSON.stringify(updatedData)
      )

      toast.success("Backup restored successfully")

      setTimeout(() => {
        window.location.reload()
      }, 1200)

    } catch {
      toast.error("Invalid JSON file")
    }

  }

  reader.readAsText(file)

}

const resetData = () => {

  const confirmReset = window.confirm(
    "This will delete ALL habits and notes. Continue?"
  )

  if (!confirmReset) return

  localStorage.removeItem("habitTracker")

  toast.success("All data cleared")

  setTimeout(() => {
    window.location.reload()
  }, 1200)

}

  return (

    <div className="max-w-5xl mx-auto space-y-10">

      <h1 className="text-4xl font-bold">
        Settings
      </h1>

      {/* Data Management */}

      <div className="glass p-6 rounded-2xl space-y-6">

        <h2 className="text-xl font-semibold">
          Data Management
        </h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center">

          <button
            onClick={exportData}
            className="btn-primary"
          >
            Export Data
          </button>

          <label className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer text-white">

            Import Data

            <input
              type="file"
              accept="application/json"
              onChange={importData}
              className="hidden"
            />

          </label>

          {fileName && (
            <span className="text-sm text-gray-400">
              {fileName}
            </span>
          )}

          <button
            onClick={resetData}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Reset All Data
          </button>

        </div>

      </div>

    </div>

  )

}

export default Settings;