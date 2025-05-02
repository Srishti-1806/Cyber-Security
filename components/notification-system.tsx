"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  read: boolean
  timestamp: Date
}

export function NotificationSystem() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "New Vulnerability Detected",
      message: "CVE-2023-1234 affects your system. Update required.",
      severity: "high",
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      title: "Suspicious Login Attempt",
      message: "Multiple failed login attempts from IP 192.168.1.105",
      severity: "medium",
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: "3",
      title: "System Update Available",
      message: "Security patch KB123456 is available for installation",
      severity: "low",
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getSeverityColor = (severity: Notification["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-red-500 bg-red-500/10"
      case "high":
        return "text-orange-500 bg-orange-500/10"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10"
      case "low":
        return "text-green-500 bg-green-500/10"
      default:
        return "text-blue-500 bg-blue-500/10"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed right-4 top-4 z-50 h-10 w-10 rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[70vh] overflow-y-auto" sideOffset={8}>
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          notifications
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex cursor-default flex-col items-start p-4 focus:bg-accent",
                  !notification.read && "bg-accent/50",
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex h-2 w-2 rounded-full",
                          notification.read ? "bg-muted" : "bg-primary",
                        )}
                      />
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                  <span
                    className={cn("rounded px-1.5 py-0.5 text-xs font-medium", getSeverityColor(notification.severity))}
                  >
                    {notification.severity}
                  </span>
                </div>
                <span className="mt-2 text-xs text-muted-foreground">
                  {notification.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" · "}
                  {notification.timestamp.toLocaleDateString()}
                </span>
              </DropdownMenuItem>
            ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
