import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// MarkdownV2'de bütün kritik karakterleri kaçır
const escapeMarkdown = (text) =>
  text
    .replace(/_/g, "\\_")
    .replace(/\*/g, "\\*")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/~/g, "\\~")
    .replace(/`/g, "\\`")
    .replace(/>/g, "\\>")
    .replace(/#/g, "\\#")
    .replace(/\+/g, "\\+")
    .replace(/-/g, "\\-")
    .replace(/=/g, "\\=")
    .replace(/\|/g, "\\|")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\./g, "\\.")
    .replace(/!/g, "\\!");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const safeName = escapeMarkdown(name);
  const safeEmail = escapeMarkdown(email);
  const safeMessage = escapeMarkdown(message);

  // Dikkat: başlığı sadeleştirdik
  const text =
    `Yeni Mesaj Geldi\n` +
    `\nAd: ${safeName}` +
    `\nEmail: ${safeEmail}` +
    `\nMesaj: ${safeMessage}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: String(CHAT_ID),
        text,
        parse_mode: "MarkdownV2"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Telegram API error: ${errorText}`);
    }

    res.json({ success: true, message: "Message sent to Telegram." });
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

export default router;
