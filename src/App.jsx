import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import { HabitProvider } from './context/HabitContext'
import { Menu } from 'lucide-react'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import { Toaster } from "react-hot-toast"
import Notes from "./pages/Notes"

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <HabitProvider>

  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-black text-white">
    <div className="flex h-screen overflow-hidden">

      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 overflow-y-auto p-8">
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'analytics' && <Analytics />}
        {activePage === 'calendar' && <Calendar />}
        {activePage === 'notes' && <Notes />}
        {activePage === 'settings' && <Settings />}
      </main>

    </div>
  </div>

  <Toaster position="top-right" />

</HabitProvider>
  )
}

export default App;