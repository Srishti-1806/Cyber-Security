// Real-time API integration for vulnerability data
import { create } from "zustand"

// Types for vulnerability data
export interface Vulnerability {
  id: string
  name: string
  severity: "critical" | "high" | "medium" | "low"
  source: string
  target: string
  type: string
  timestamp: number
  description: string
  status: "active" | "mitigated" | "investigating"
}

// Store for managing vulnerability data
interface VulnerabilityStore {
  vulnerabilities: Vulnerability[]
  recentThreats: Vulnerability[]
  isConnected: boolean
  isLoading: boolean
  connect: () => void
  disconnect: () => void
  addVulnerability: (vulnerability: Vulnerability) => void
}

// Create a store with Zustand
export const useVulnerabilityStore = create<VulnerabilityStore>((set) => ({
  vulnerabilities: [],
  recentThreats: [],
  isConnected: false,
  isLoading: false,
  connect: () => {
    set({ isLoading: true })

    // Simulate initial data load
    setTimeout(() => {
      const initialVulnerabilities = generateMockVulnerabilities(15)
      set({
        vulnerabilities: initialVulnerabilities,
        recentThreats: initialVulnerabilities.slice(0, 5),
        isConnected: true,
        isLoading: false,
      })

      // Set up interval for real-time updates
      const interval = setInterval(() => {
        const newVulnerability = generateMockVulnerability()
        set((state) => ({
          vulnerabilities: [newVulnerability, ...state.vulnerabilities].slice(0, 100),
          recentThreats: [newVulnerability, ...state.recentThreats].slice(0, 5),
        }))
      }, 10000) // New vulnerability every 10 seconds

      // Store interval ID in window for cleanup
      window.vulnerabilityInterval = interval
    }, 2000)
  },
  disconnect: () => {
    if (window.vulnerabilityInterval) {
      clearInterval(window.vulnerabilityInterval)
    }
    set({ isConnected: false })
  },
  addVulnerability: (vulnerability) => {
    set((state) => ({
      vulnerabilities: [vulnerability, ...state.vulnerabilities],
      recentThreats: [vulnerability, ...state.recentThreats].slice(0, 5),
    }))
  },
}))

// Helper function to generate mock vulnerabilities
function generateMockVulnerability(): Vulnerability {
  const types = ["Malware", "DDoS", "Phishing", "Ransomware", "SQL Injection", "XSS", "CSRF"]
  const sources = ["185.143.223.12", "103.235.46.108", "91.134.175.89", "45.227.255.206", "Unknown Source"]
  const targets = ["Web Server", "Database", "User Portal", "Admin Dashboard", "API Gateway", "Authentication Service"]
  const severities: ("critical" | "high" | "medium" | "low")[] = ["critical", "high", "medium", "low"]
  const statuses: ("active" | "mitigated" | "investigating")[] = ["active", "mitigated", "investigating"]

  const type = types[Math.floor(Math.random() * types.length)]
  const severity =
    type === "Ransomware" || type === "SQL Injection"
      ? Math.random() > 0.5
        ? "critical"
        : "high"
      : severities[Math.floor(Math.random() * severities.length)]

  return {
    id: `vuln-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: `${type} Attack Detected`,
    severity,
    source: sources[Math.floor(Math.random() * sources.length)],
    target: targets[Math.floor(Math.random() * targets.length)],
    type,
    timestamp: Date.now(),
    description: `A ${severity} ${type.toLowerCase()} attack has been detected from ${sources[Math.floor(Math.random() * sources.length)]} targeting your ${targets[Math.floor(Math.random() * targets.length)]}.`,
    status: Math.random() > 0.7 ? "active" : Math.random() > 0.5 ? "investigating" : "mitigated",
  }
}

function generateMockVulnerabilities(count: number): Vulnerability[] {
  return Array.from({ length: count }, () => generateMockVulnerability()).sort((a, b) => b.timestamp - a.timestamp)
}

// Add to window for TypeScript
declare global {
  interface Window {
    vulnerabilityInterval: number
  }
}
