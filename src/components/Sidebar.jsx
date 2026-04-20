import { 
  LayoutDashboard, 
  BarChart3, 
  Calendar, 
  BookOpen,
  Settings,
  Flame,
  Clock
} from 'lucide-react'

const Sidebar = ({ activePage, setActivePage, openSidebar, setOpenSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stopwatch', label: 'Stopwatch', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div
  className={`fixed md:static top-0 left-0 h-full z-50 w-64 bg-primary-500/90 backdrop-blur-xl border-r border-white/10 flex flex-col transform transition-transform duration-300
  ${openSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
`}
>
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Flame className="w-8 h-8 text-orange-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            HabitPro
          </h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => {
              setActivePage(item.id)
              setOpenSidebar(false)
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                activePage === item.id
                  ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
                  : 'hover:bg-white/10 hover:shadow-md'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar;