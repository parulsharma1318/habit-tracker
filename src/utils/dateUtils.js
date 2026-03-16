export const getWeekDays = () => {
  const today = new Date()

  // find Monday of current week
  const weekStart = new Date(today)
  const day = today.getDay()
  const diff = day === 0 ? -6 : 1 - day
  weekStart.setDate(today.getDate() + diff)

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const dayNum = String(date.getDate()).padStart(2, '0')

    return {
      label: days[date.getDay()],
      date: `${year}-${month}-${dayNum}`,
      status: 'empty'
    }
  })
}