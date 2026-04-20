import { useState } from "react"
import { Plus } from "lucide-react"
import { useTimers } from "../context/TimerContext"

const AddTimer = () => {

  const [name, setName] = useState("")
  const { addTimer } = useTimers()

  const handleSubmit = e => {

    e.preventDefault()

    if (!name.trim()) return

    addTimer(name.trim())

    setName("")

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >

      <input
        value={name}
        onChange={e =>
          setName(e.target.value)
        }
        placeholder="New timer name..."
        className="p-3 bg-white/10 rounded-xl flex-1"
      />

      <button
        type="submit"
        className="btn-primary flex items-center gap-2"
      >

        <Plus size={18} />

        Add Timer

      </button>

    </form>

  )

}

export default AddTimer;