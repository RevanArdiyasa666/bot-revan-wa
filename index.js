const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
ffmpeg.setFfmpegPath(ffmpegPath);

const AUTHOR_NAME = "࿌࿆࿇ӦН Mⲯ RĚVAN";

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "botwa" }),
  puppeteer: { headless: true }
});

client.on("qr", qr => {
  qrcode.generate(qr, { small: true });
  console.log("👉 Scan QR pakai WhatsApp lalu commit .wwebjs_auth/");
});

client.on("ready", () => {
  console.log(`✅ Bot siap! Author: ${AUTHOR_NAME}`);
});

client.on("message", async msg => {
  const text = msg.body.toLowerCase();

  // YouTube → MP3
  if (text.startsWith("ytmp3 ")) {
    const url = msg.body.split(" ")[1];
    if (!ytdl.validateURL(url)) return msg.reply("❌ Link YouTube tidak valid!");
    const id = Date.now();
    const out = `temp/audio/${id}.mp3`;
    msg.reply("🔄 Mengunduh & convert ke mp3...");
    const stream = ytdl(url, { quality: "highestaudio" });
    ffmpeg(stream).audioBitrate(128).save(out)
      .on("end", async () => {
        const media = MessageMedia.fromFilePath(out);
        await msg.reply(media, undefined, { sendAudioAsVoice: false });
        fs.unlinkSync(out);
      });
  }

  // Stiker dari gambar
  else if (msg.hasMedia && text.includes("stiker")) {
    const media = await msg.downloadMedia();
    if (media) {
      await client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
        stickerAuthor: AUTHOR_NAME,
        stickerName: "AutoStiker"
      });
    }
  }

  // Game: suit
  else if (text === "suit") {
    const opts = ["gunting", "batu", "kertas"];
    const bot = opts[Math.floor(Math.random() * opts.length)];
    msg.reply(`🎮 Kamu lawan bot: *${bot}*`);
  }

  // Menu atau help
  else if (["menu", "help"].includes(text)) {
    msg.reply(`
🤖 Bot oleh ${AUTHOR_NAME}

📚 *Fitur tersedia:*
• \`ytmp3 <link>\` → YouTube ke MP3  
• Kirim gambar + ketik “stiker” → Buat stiker  
• \`suit\` → Game gunting-batu-kertas  
• \`menu\` atau \`help\` → Tampilkan menu
    `);
  }

  // Salam
  else if (["hai", "halo", "assalamualaikum"].includes(text)) {
    msg.reply("Waalaikumsalam! 😊");
  }
});

client.initialize();
