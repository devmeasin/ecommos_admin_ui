export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate)

  // Extract the parts of the date
  const day = date.toLocaleString('en-US', { day: '2-digit' })
  const month = date.toLocaleString('en-US', { month: 'short' }) // "Dec"
  const year = date.getFullYear() // 2024
  const time = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) // "01:51 AM"

  return `${day} ${month} ${year} | ${time}`
}
