/**
 * Voting period configuration
 * End date: November 6, 2025 at 23:59:59 (GMT+7)
 */
export const VOTING_END_DATE = {
  year: 2025,
  month: 10, // November (0-based, so 10 = November)
  day: 6,
  hour: 23,
  minute: 59,
  second: 59,
}

/**
 * Check if the voting period has ended
 * @returns true if current date/time is after the voting end date
 */
export function isVotingPeriodEnded(): boolean {
  const now = new Date()
  
  // Create end date in GMT+7 (Vietnam timezone)
  const endDate = new Date()
  endDate.setFullYear(VOTING_END_DATE.year)
  endDate.setMonth(VOTING_END_DATE.month)
  endDate.setDate(VOTING_END_DATE.day)
  endDate.setHours(VOTING_END_DATE.hour, VOTING_END_DATE.minute, VOTING_END_DATE.second, 999)
  
  // Convert to GMT+7 (Vietnam timezone)
  const vietnamOffset = 7 * 60 // GMT+7 in minutes
  const utcTime = endDate.getTime() + endDate.getTimezoneOffset() * 60000
  const vietnamEndTime = new Date(utcTime + vietnamOffset * 60000)
  
  return now.getTime() > vietnamEndTime.getTime()
}

/**
 * Get the voting end date as a Date object
 * @returns Date object representing the voting end date/time
 */
export function getVotingEndDate(): Date {
  const endDate = new Date()
  endDate.setFullYear(VOTING_END_DATE.year)
  endDate.setMonth(VOTING_END_DATE.month)
  endDate.setDate(VOTING_END_DATE.day)
  endDate.setHours(VOTING_END_DATE.hour, VOTING_END_DATE.minute, VOTING_END_DATE.second, 999)
  
  // Convert to GMT+7 (Vietnam timezone)
  const vietnamOffset = 7 * 60 // GMT+7 in minutes
  const utcTime = endDate.getTime() + endDate.getTimezoneOffset() * 60000
  return new Date(utcTime + vietnamOffset * 60000)
}

