import { NextResponse } from "next/server";

// =========================================================================
// 💡 CONFIGURATION (Aap yahan direct ya .env.local me values daal sakte hain)
// =========================================================================
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""; // e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";     // e.g. 987654321
const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK || ""; // Google Apps Script URL

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const tasks = [];

    // 1. 📲 TELEGRAM BOT NOTIFICATION
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramText = `🚀 *NEW MESSAGE FROM PORTFOLIO*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📌 *Subject:* ${subject || "General Inquiry"}\n` +
        `📝 *Message:*\n${message}\n\n` +
        `⏰ *Time:* ${timestamp}`;

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      tasks.push(
        fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
            parse_mode: "Markdown",
          }),
        }).catch((err) => console.error("Telegram send error:", err))
      );
    }

    // 2. 📊 GOOGLE SHEETS WEBHOOK (Appends row to Google Sheet)
    if (GOOGLE_SHEET_WEBHOOK) {
      tasks.push(
        fetch(GOOGLE_SHEET_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp,
            name,
            email,
            subject: subject || "N/A",
            message,
          }),
        }).catch((err) => console.error("Google Sheet send error:", err))
      );
    }

    // Wait for notifications to dispatch
    if (tasks.length > 0) {
      await Promise.allSettled(tasks);
    }

    return NextResponse.json({
      success: true,
      message: "Form submission received successfully!",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process form submission." },
      { status: 500 }
    );
  }
}
