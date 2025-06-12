"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"

interface Message {
  id: number
  text: string
  sender: "user" | "admin"
  timestamp: Date
}

export function TelegramChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! How can I help you today?",
      sender: "admin",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isSubmittingInfo, setIsSubmittingInfo] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    // If user hasn't submitted info yet, collect it first
    if (isSubmittingInfo) {
      if (!userName) {
        setUserName(newMessage)
        setNewMessage("")
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            text: newMessage,
            sender: "user",
            timestamp: new Date(),
          },
          {
            id: messages.length + 2,
            text: "Great! Now, please enter your email so I can get back to you if we get disconnected:",
            sender: "admin",
            timestamp: new Date(),
          },
        ])
        return
      }

      if (!userEmail) {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newMessage)) {
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              text: newMessage,
              sender: "user",
              timestamp: new Date(),
            },
            {
              id: messages.length + 2,
              text: "That doesn't look like a valid email. Please try again:",
              sender: "admin",
              timestamp: new Date(),
            },
          ])
          setNewMessage("")
          return
        }

        setUserEmail(newMessage)
        setIsSubmittingInfo(false)
        setNewMessage("")
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            text: newMessage,
            sender: "user",
            timestamp: new Date(),
          },
          {
            id: messages.length + 2,
            text: `Thanks, ${userName}! How can I help you today?`,
            sender: "admin",
            timestamp: new Date(),
          },
        ])
        return
      }
    }

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setIsSending(true)

    try {
      // Send message to Telegram bot
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          message: newMessage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Add a "message received" confirmation
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "Message received! I'll respond as soon as possible.",
            sender: "admin",
            timestamp: new Date(),
          },
        ])
        setIsSending(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: "Sorry, there was an error sending your message. Please try again later.",
          sender: "admin",
          timestamp: new Date(),
        },
      ])
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:opacity-90 transition-all"
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] bg-background border rounded-lg shadow-xl flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-medium">Chat with Sangeeth</h3>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70" aria-label="Close chat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isSubmittingInfo && messages.length === 1 && (
              <div className="bg-muted p-3 rounded-lg mb-4">
                <p className="text-sm">
                  To get started, please provide your name and email so I can better assist you.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isSubmittingInfo ? (!userName ? "Enter your name..." : "Enter your email...") : "Type your message..."
                }
                className="resize-none"
                rows={2}
              />
              <Button variant="glass"
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSending}
                size="icon"
                className="h-auto"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
