import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Computes daily rate based on start date
 * - Starts at 250€ at start date
 * - 0 to 5 years: linear evolution from 250€ to 500€ (monthly)
 * - 5 to 10 years: linear evolution from 500€ to 700€ (monthly)
 * - After 10 years: +5€ per month
 * - Rounded down to nearest 10
 */
export function computeTjm(startDate: Date): number {
  const now = new Date()
  const diffInMs = now.getTime() - startDate.getTime()
  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.44) // Average days per month

  let tjm: number

  if (diffInMonths <= 60) {
    // 0 to 5 years: linear evolution from 250€ to 500€
    // Increase of 250€ over 60 months = 4.1667€ per month
    tjm = 250 + diffInMonths * (250 / 60)
  } else if (diffInMonths <= 120) {
    // 5 to 10 years: linear evolution from 500€ to 700€
    // Increase of 200€ over 60 months = 3.3333€ per month
    const monthsAfter60 = diffInMonths - 60
    tjm = 500 + monthsAfter60 * (200 / 60)
  } else {
    // After 10 years: +5€ per month
    const monthsAfter120 = diffInMonths - 120
    tjm = 700 + monthsAfter120 * 5
  }

  // Round down to nearest 10
  return Math.floor(tjm / 10) * 10
}
