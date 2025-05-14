import { NextResponse } from "next/server"

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = "7565238718:AAGgWjTEn81YY_h_jTncM3tzc4tWJPdglds"
const TELEGRAM_CHAT_ID = "860517021"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Format message for Telegram
    const telegramMessage = `
📩 New Message from Website Chat:

👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
⏰ Time: ${new Date().toLocaleString()}
`

    // Send message to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("Telegram API error:", errorData)
      return NextResponse.json({ error: "Failed to send message to Telegram" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in send-telegram route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
