import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatINR(n: number, compact = false): string {
  if (compact) {
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + 'Cr'
    if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L'
    if (n >= 1000) return '₹' + (n / 1000).toFixed(0) + 'K'
  }
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export function calcSIPFV(monthly: number, ratePA: number, years: number): number {
  const r = ratePA / 12
  const n = years * 12
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

export function calcEMI(principal: number, ratePA: number, tenureYears: number): number {
  const r = ratePA / 100 / 12
  const n = tenureYears * 12
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
}

export function calcXIRR(invested: number, current: number, years: number): number {
  return (Math.pow(current / invested, 1 / years) - 1) * 100
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 65) return 'text-blue-400'
  if (score >= 45) return 'text-amber-400'
  return 'text-red-400'
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Good'
  if (score >= 45) return 'Fair'
  if (score >= 25) return 'Needs Work'
  return 'Critical'
}

export function calcOldRegimeTax(income: number): number {
  let tax = 0
  if (income > 1000000) { tax += (income - 1000000) * 0.30; income = 1000000 }
  if (income > 500000) { tax += (income - 500000) * 0.20; income = 500000 }
  if (income > 250000) tax += (income - 250000) * 0.05
  return Math.round(tax * 1.04)
}

export function calcNewRegimeTax(income: number): number {
  if (income <= 700000) return 0
  let tax = 0
  if (income > 1500000) { tax += (income - 1500000) * 0.30; income = 1500000 }
  if (income > 1200000) { tax += (income - 1200000) * 0.20; income = 1200000 }
  if (income > 1000000) { tax += (income - 1000000) * 0.15; income = 1000000 }
  if (income > 700000) { tax += (income - 700000) * 0.10; income = 700000 }
  if (income > 300000) tax += (income - 300000) * 0.05
  return Math.round(tax * 1.04)
}

export function daysToMarch31(): number {
  const now = new Date()
  const yr = now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear()
  return Math.ceil((new Date(yr, 2, 31).getTime() - now.getTime()) / 86400000)
}
