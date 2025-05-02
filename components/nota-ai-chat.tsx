"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bot,
  AlertTriangle,
  Shield,
  FileText,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Download,
  Loader2,
} from "lucide-react"
import { useVulnerabilityStore } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

interface SuggestedPrompt {
  text: string
  icon: React.ReactNode
}

export function NotaAiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm Nota, your AI security assistant. How can I help you today?",
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)
  const { vulnerabilities } = useVulnerabilityStore()
  const { toast } = useToast()

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      text: "Generate a daily security report",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      text: "How do I protect against the latest threats?",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      text: "Analyze current vulnerabilities",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
  ]

  // Check for speech recognition and synthesis support
  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setSpeechSupported(true)
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("")

        setInput(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        })
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }
    }

    // Check for speech synthesis support
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSpeechSynthesisSupported(true)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isListening, toast])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const toggleListening = () => {
    if (!speechSupported) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please try using Chrome.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      setInput("")
    }
  }

  const speakText = (text: string) => {
    if (!speechSynthesisSupported) {
      toast({
        title: "Speech Synthesis Not Supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      })
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text)

    // Get available voices
    const voices = window.speechSynthesis.getVoices()

    // Try to find a good English voice
    const preferredVoice = voices.find(
      (voice) => (voice.lang.includes("en") && voice.name.includes("Google")) || voice.name.includes("Female"),
    )

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.rate = 1.0
    utterance.pitch = 1.0

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => {
      setIsSpeaking(false)
      toast({
        title: "Speech Synthesis Error",
        description: "There was an error playing the audio.",
        variant: "destructive",
      })
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (speechSynthesisSupported) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Stop listening if active
    if (isListening) {
      toggleListening()
    }

    // Simulate AI thinking time
    setTimeout(() => {
      generateResponse(userMessage.content)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const generateResponse = (userMessage: string) => {
    let response = ""

    // Simple response logic based on keywords
    const lowercaseMessage = userMessage.toLowerCase()

    if (lowercaseMessage.includes("report") || lowercaseMessage.includes("summary")) {
      response = generateSecurityReport()
    } else if (lowercaseMessage.includes("protect") || lowercaseMessage.includes("prevent")) {
      response = generateProtectionAdvice()
    } else if (lowercaseMessage.includes("vulnerabilit") || lowercaseMessage.includes("threat")) {
      response = analyzeCurrentVulnerabilities()
    } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi ")) {
      response =
        "Hello! I'm Nota, your AI security assistant. I can help you with security reports, threat analysis, and protection recommendations. How can I assist you today?"
    } else {
      response =
        "I'm not sure I understand your query. Would you like me to generate a security report, provide protection recommendations, or analyze current vulnerabilities?"
    }

    const aiMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: Date.now(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, aiMessage])
  }

  const generateSecurityReport = () => {
    const criticalCount = vulnerabilities.filter((v) => v.severity === "critical").length
    const highCount = vulnerabilities.filter((v) => v.severity === "high").length
    const mediumCount = vulnerabilities.filter((v) => v.severity === "medium").length
    const lowCount = vulnerabilities.filter((v) => v.severity === "low").length

    const activeCount = vulnerabilities.filter((v) => v.status === "active").length
    const investigatingCount = vulnerabilities.filter((v) => v.status === "investigating").length
    const mitigatedCount = vulnerabilities.filter((v) => v.status === "mitigated").length

    const topThreats = vulnerabilities
      .filter((v) => v.status === "active")
      .sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return severityOrder[a.severity] - severityOrder[b.severity]
      })
      .slice(0, 3)

    return `
## Security Status Report - ${new Date().toLocaleDateString()}

### Threat Summary
- Total vulnerabilities detected: ${vulnerabilities.length}
- Critical: ${criticalCount}
- High: ${highCount}
- Medium: ${mediumCount}
- Low: ${lowCount}

### Current Status
- Active threats: ${activeCount}
- Under investigation: ${investigatingCount}
- Mitigated: ${mitigatedCount}

### Top Priority Threats
${topThreats.map((threat) => `- **${threat.severity.toUpperCase()}**: ${threat.name} - ${threat.description}`).join("\n")}

### Recommendations
1. Address all critical and high severity vulnerabilities immediately
2. Implement regular security scans and updates
3. Review and update security policies and procedures
4. Ensure all systems are patched and up-to-date
5. Conduct security awareness training for all staff

Would you like me to provide more detailed information on any specific aspect of this report?
    `
  }

  const generateProtectionAdvice = () => {
    return `
## Protection Recommendations

### Immediate Actions
1. **Patch and Update Systems**: Ensure all software, operating systems, and firmware are up-to-date with the latest security patches.
2. **Strengthen Authentication**: Implement multi-factor authentication across all systems and services.
3. **Review Access Controls**: Apply the principle of least privilege to all user accounts and services.
4. **Backup Critical Data**: Maintain regular backups following the 3-2-1 rule (3 copies, 2 different media types, 1 off-site).

### Ongoing Measures
1. **Regular Security Assessments**: Conduct vulnerability scans and penetration tests at least quarterly.
2. **Security Monitoring**: Implement 24/7 monitoring of network traffic and system logs for suspicious activity.
3. **Incident Response Plan**: Develop and regularly test your incident response procedures.
4. **Security Awareness Training**: Educate all staff on recognizing and reporting security threats.

### Advanced Protection
1. **Zero Trust Architecture**: Implement a zero trust security model - "never trust, always verify".
2. **Network Segmentation**: Divide your network into separate segments to limit the spread of attacks.
3. **Endpoint Detection and Response (EDR)**: Deploy advanced endpoint protection to detect and respond to threats.
4. **Threat Intelligence**: Subscribe to threat intelligence feeds to stay informed about emerging threats.

Would you like me to elaborate on any specific protection measure?
    `
  }

  const analyzeCurrentVulnerabilities = () => {
    const recentThreats = vulnerabilities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5)

    const threatTypes = vulnerabilities.reduce(
      (acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const mostCommonType = Object.entries(threatTypes)
      .sort((a, b) => b[1] - a[1])
      .map(([type]) => type)[0]

    return `
## Current Vulnerability Analysis

### Recent Threats
${recentThreats.map((threat) => `- **${threat.severity.toUpperCase()}**: ${threat.name} - Detected ${new Date(threat.timestamp).toLocaleString()}`).join("\n")}

### Threat Distribution
${Object.entries(threatTypes)
  .sort((a, b) => b[1] - a[1])
  .map(([type, count]) => `- ${type}: ${count} (${Math.round((count / vulnerabilities.length) * 100)}%)`)
  .join("\n")}

### Key Insights
1. The most common attack type is **${mostCommonType}**
2. ${vulnerabilities.filter((v) => v.status === "active").length} threats are currently active and require attention
3. ${vulnerabilities.filter((v) => v.severity === "critical" || v.severity === "high").length} threats are rated critical or high severity

### Recommended Actions
1. Prioritize addressing ${mostCommonType} attacks through specific countermeasures
2. Implement additional monitoring for the most targeted systems
3. Review security configurations for commonly affected services
4. Consider additional security controls for high-risk areas

Would you like a more detailed analysis of any specific threat type?
    `
  }

  const downloadChatHistory = () => {
    const chatContent = messages
      .map(
        (msg) =>
          `[${new Date(msg.timestamp).toLocaleString()}] ${msg.role === "user" ? "You" : "Nota"}: ${msg.content}`,
      )
      .join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nota-chat-${new Date().toLocaleDateString()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="cyber-border flex h-[calc(100vh-13rem)] flex-col overflow-hidden">
      <CardHeader className="border-b border-border/50 pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <span>Nota AI Assistant</span>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={downloadChatHistory}
              title="Download chat history"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Download chat history</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] flex-col gap-2 rounded-lg p-4",
                message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <div className="flex items-center gap-2">
                {message.role === "assistant" ? (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-background/20 text-xs">You</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-xs font-medium">{message.role === "assistant" ? "Nota" : "You"}</span>
                <span className="text-xs opacity-50">{new Date(message.timestamp).toLocaleTimeString()}</span>

                {message.role === "assistant" && speechSynthesisSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-6 w-6"
                    onClick={() => {
                      if (isSpeaking) {
                        stopSpeaking()
                      } else {
                        speakText(message.content)
                      }
                    }}
                  >
                    {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                    <span className="sr-only">{isSpeaking ? "Stop speaking" : "Speak message"}</span>
                  </Button>
                )}
              </div>

              <div className={cn("prose prose-sm max-w-none", message.role === "user" ? "prose-invert" : "")}>
                {message.role === "assistant" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">Nota</span>
                <span className="text-xs opacity-50">Typing...</span>
              </div>
              <div className="flex gap-1">
                <motion.div
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, delay: 0.2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, delay: 0.4, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <div className="border-t border-border/50 p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <Button
              key={prompt.text}
              variant="outline"
              size="sm"
              className="h-auto gap-1.5 py-1.5 text-xs"
              onClick={() => handleSuggestedPrompt(prompt.text)}
            >
              {prompt.icon}
              <span>{prompt.text}</span>
            </Button>
          ))}
        </div>

        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none pr-24"
            disabled={isListening}
          />

          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            {speechSupported && (
              <Button
                type="button"
                size="icon"
                variant={isListening ? "default" : "outline"}
                className={cn("h-8 w-8", isListening && "animate-pulse bg-destructive hover:bg-destructive")}
                onClick={toggleListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
              </Button>
            )}

            <Button
              type="button"
              size="icon"
              className="h-8 w-8"
              onClick={handleSendMessage}
              disabled={!input.trim() && !isListening}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>

        {isListening && (
          <div className="mt-2 flex items-center gap-2 text-sm text-primary">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Listening... Speak now</span>
          </div>
        )}
      </div>
    </Card>
  )
}
