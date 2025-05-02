"use client"

import * as React from "react"
import { Bot, Maximize2, Minimize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotaAiChatCompact } from "@/components/nota-ai-chat-compact"
import { cn } from "@/lib/utils"

export function FloatingChat() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      )}

      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
          isMinimized ? "h-16 w-80" : "h-[600px] w-80 md:w-96",
        )}
      >
        <Card className="flex h-full w-full flex-col overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Bot className="h-5 w-5 text-primary" />
              Nota AI Assistant
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                <span className="sr-only">{isMinimized ? "Maximize" : "Minimize"}</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent
            className={cn("flex-1 p-0 transition-all duration-300", isMinimized ? "invisible h-0" : "visible h-full")}
          >
            <NotaAiChatCompact />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
