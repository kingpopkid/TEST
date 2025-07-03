// Load env vars
import dotenv from 'dotenv';
dotenv.config();

import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
} from '@whiskeysockets/baileys';

import { Handler, Callupdate, GroupUpdate } from './popkid/popkidd/popkiddd.js';
import express from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';
import pino from 'pino';
import moment from 'moment-timezone';
import { File } from 'megajs';
import NodeCache from 'node-cache';
import { fileURLToPath } from 'url';
import config from './config.cjs';
import pkg from './lib/autoreact.cjs';

const { emojis, doReact } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

const MAIN_LOGGER = pino({
  timestamp: () => `,"time":"${new Date().toJSON()}"`,
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";
let useQR = false;
let initialConnection = true;

if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

const msgRetryCounterCache = new NodeCache();

const lifeQuotes = [
  "The only way to do great work is to love what you do.",
  "Strive not to be a success, but rather to be of value.",
  "The mind is everything. What you think you become.",
  "Life is what happens when you're busy making other plans.",
  "Be the change that you wish to see in the world.",
  "It is never too late to be what you might have been.",
  "The journey of a thousand miles begins with a single step."
];

async function updateBio(sock) {
  try {
    const now = moment().tz('Africa/Nairobi');
    const quote = lifeQuotes[Math.floor(Math.random() * lifeQuotes.length)];
    const bio = `🧛‍♋️ ACTIVE AT ${now.format('HH:mm:ss')} | ${quote}`;
    await sock.updateProfileStatus(bio);
    console.log(chalk.yellow(`ℹ️ Bio updated: ${bio}`));
  } catch (e) {
    console.log(chalk.red("❌ Bio update failed: " + e.message));
  }
}

async function updateLiveBio(sock) {
  try {
    const now = moment().tz('Africa/Nairobi');
    await sock.updateProfileStatus(`🧛‍♋️ ACTIVE AT ${now.format('HH:mm:ss')}`);
  } catch (e) {
    console.log(chalk.red("❌ Live bio update failed: " + e.message));
  }
}

async function downloadSessionData() {
  try {
    const envSession = config.SESSION_ID;

    if (!envSession || !envSession.startsWith("POPKID;;;")) {
      console.log(chalk.red("❌ SESSION_ID missing or invalid format."));
      return false;
    }

    const sessdata = envSession.split("POPKID;;;")[1];
    if (!sessdata || !sessdata.includes("#")) {
      console.log(chalk.red("❌ SESSION_ID format must be: POPKID;;;fileid#key"));
      return false;
    }

    const [fileID, decryptKey] = sessdata.split("#");
    const file = File.fromURL(`https://mega.nz/file/${fileID}#${decryptKey}`);

    console.log("🔄 Downloading session from MEGA...");
    const data = await new Promise((resolve, reject) => {
      file.download((err, data) => err ? reject(err) : resolve(data));
    });

    await fs.promises.writeFile(credsPath, data);
    console.log(chalk.green("✅ Session restored from MEGA."));
    return true;

  } catch (err) {
    console.error(chalk.red("❌ Session download error: " + err.message));
    return false;
  }
}

async function start() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    console.log(`📆 WhatsApp version: ${version.join(".")}`);

    const sock = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: useQR,
      browser: ["Popkid", "Safari", "10.0"],
      auth: state,
      getMessage: async () => ({
        conversation: "popkid xmd user bot"
      }),
    });

    sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
      if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode;
        console.log(chalk.red(`❌ Disconnected [Reason: ${reason}]`));
        if (reason !== DisconnectReason.loggedOut) start();
      } else if (connection === "open") {
        console.log(chalk.green("✅ BOT ONLINE"));

        try {
          await sock.groupAcceptInvite("FHDEPkBBf281sUcdj17eU9");
          console.log(chalk.green("✅ Joined group."));
        } catch (err) {
          console.error(chalk.red("❌ Group join failed: " + err.message));
        }

        try {
          await sock.newsletterFollow("120363420342566562@newsletter");
          console.log(chalk.cyan("📨 Followed newsletter."));
        } catch (err) {
          console.error(chalk.red("❌ Newsletter follow failed: " + err.message));
        }

        await updateBio(sock);

        await sock.sendMessage(sock.user.id, {
          image: { url: 'https://files.catbox.moe/alnj32.jpg' },
          caption: `╔═════ ∘◦ ✧ ✦ ✧ ◦∘ ═════╗
🅟🅞🅟🅚🅘🅓 • 🅧🅜🅓 • 🅢🅨🅢
╚═════ ∘◦ ✧ ✦ ✧ ◦∘ ═════╝

💻 BOT:       𝙿𝙾𝙿𝙺𝙸𝙳 𝚇𝙼𝙳  
🧑‍💼 OWNER:     👑 ᴘᴏᴘᴋɪᴅ  
🛠️ MODE:      ${config.MODE.toUpperCase()}  
🎮 PREFIX:    ${config.PREFIX}  
📡 STATUS:    ✅ 𝗢𝗡𝗟𝗜𝗡𝗘 • 𝗥𝗘𝗔𝗗𝗬 • 𝗙𝗜𝗥𝗘

🕶️ ᴘᴏᴘᴋɪᴅ ᴅᴏᴇꜱɴ'ᴛ ᴄʀᴀꜱʜ, ʜᴇ ʀᴇʙᴏᴏᴛꜱ.
═══════════════════════════`,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363420342566562@newsletter',
              newsletterName: "popkid xmd ʙᴏᴛ",
              serverMessageId: -1,
            },
            externalAdReply: {
              title: "ᴘᴏᴘᴋɪᴅ xᴍᴅ ʙᴏᴛ",
              body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴏᴘᴋɪᴅ",
              thumbnailUrl: 'https://files.catbox.moe/nk71o3.jpg',
              sourceUrl: 'https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31',
              mediaType: 1,
              renderLargerThumbnail: false,
            },
          },
        });

        if (!global.isLiveBioRunning) {
          global.isLiveBioRunning = true;
          setInterval(() => updateLiveBio(sock), 60 * 1000);
        }

        initialConnection = false;
      }
    });

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on("messages.upsert", async (chatUpdate) => {
      if (!chatUpdate.messages?.length) return;
      await Handler(chatUpdate, sock, logger);

      try {
        const mek = chatUpdate.messages[0];
        if (!mek.key.fromMe && config.AUTO_REACT && mek.message) {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          await doReact(emoji, mek, sock);
        }
      } catch (err) {
        console.error('❌ Auto-react failed:', err.message);
      }
    });

    sock.ev.on("call", (json) => Callupdate(json, sock));
    sock.ev.on("group-participants.update", (msg) => GroupUpdate(sock, msg));
    sock.public = config.MODE === "public";

  } catch (err) {
    console.error('❌ Startup Error:', err.stack || err.message);
    process.exit(1);
  }
}

async function init() {
  global.isLiveBioRunning = false;

  if (fs.existsSync(credsPath)) {
    console.log(chalk.green("🔐 Local session found. Starting..."));
    await start();
  } else {
    const ok = await downloadSessionData();
    if (ok) {
      await start();
    } else {
      console.log(chalk.yellow("📸 Starting in QR mode..."));
      useQR = true;
      await start();
    }
  }
}

init();

// Express UI + keep alive
app.use(express.static(path.join(__dirname, 'mydata')));
app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'mydata', 'index.html')));

const SELF_URL = process.env.SELF_URL || `http://localhost:${PORT}`;
setInterval(() => {
  axios.get(SELF_URL).catch(() => {});
}, 4 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
