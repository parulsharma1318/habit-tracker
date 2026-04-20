import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Calendar from "./pages/Calendar"
import Notes from "./pages/Notes"
import Settings from "./pages/Settings"
import StopwatchPage from "./pages/Stopwatch"
import { HabitProvider } from "./context/HabitContext"
import { TimerProvider } from "./context/TimerContext"
import { Menu } from "lucide-react"

function App() {

  const [activePage, setActivePage] = useState("dashboard")
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <TimerProvider>
    <HabitProvider>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-black text-white">

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">HabitPro</h1>

          <button onClick={() => setOpenSidebar(true)}>
            <Menu />
          </button>
        </div>

        <div className="flex h-screen overflow-hidden">

          {/* SIDEBAR */}
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />

          {/* OVERLAY (mobile only) */}
          {openSidebar && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setOpenSidebar(false)}
            />
          )}

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "analytics" && <Analytics />}
            {activePage === "calendar" && <Calendar />}
            {activePage === "notes" && <Notes />}
            {activePage === "stopwatch" && <StopwatchPage />}
            {activePage === "settings" && <Settings />}
          </main>

        </div>

      </div>

    </HabitProvider>
    </TimerProvider>
  )
}

export default App;