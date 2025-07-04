import config from '../../config.cjs';
import { cmd } from '../command.js';

cmd({
  pattern: 'menu2',
  desc: 'Stylish interactive menu with reply numbers',
  category: 'menu',
  filename: __filename
}, async (conn, m, msg, { from, reply }) => {
  try {
    const userName = m.pushName || 'User';

    const mainMenu = `
┏━👾 𝗣𝗢𝗣𝗞𝗜𝗗-𝗚𝗟𝗘 𝗠𝗘𝗡𝗨 ━┓
┃ Hello, *${userName}* 🪐
┃ React with a number below:
┃
┃ 1️⃣ 𝗠𝗲𝗱𝗶𝗮 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿𝘀
┃ 2️⃣ 🤖 𝗔𝗜 & 𝗖𝗵𝗮𝘁𝗯𝗼𝘁𝘀
┃ 3️⃣ 👥 𝗚𝗿𝗼𝘂𝗽 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁
┃ 4️⃣ 👑 𝗢𝘄𝗻𝗲𝗿 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀
┃ 5️⃣ ⚙️ 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼 / 𝗨𝗽𝘁𝗶𝗺𝗲
┗━━━━━━━━━━━━━━━━━━━
📩 *Reply with a number to view commands*
`.trim();

    await conn.sendMessage(from, { text: mainMenu }, { quoted: m });

    // Wait for reply
    conn.ev.once('messages.upsert', async ({ messages }) => {
      const response = messages[0];
      if (!response.message || response.key.fromMe || response.key.id !== m.key.id) return;

      const replyText = (response.message.conversation || '').trim();

      let section = '';
      switch (replyText) {
        case '1':
          section = `
🎬 *𝗠𝗲𝗱𝗶𝗮 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿𝘀*
- play [song name]
- video [title]
- mp3 [url]
- mp4 [url]
- tiktok
- instagram
- facebook
          `.trim();
          break;
        case '2':
          section = `
🧠 *𝗔𝗜 & 𝗖𝗵𝗮𝘁 𝗧𝗼𝗼𝗹𝘀*
- ai [prompt]
- gemini [prompt]
- chatbot on/off
- bug
- lydia
- popkid-ai
          `.trim();
          break;
        case '3':
          section = `
👥 *𝗚𝗿𝗼𝘂𝗽 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁*
- tagall
- hidetag
- kick
- promote
- demote
- group open/close
- setname / setdesc
          `.trim();
          break;
        case '4':
          section = `
👑 *𝗢𝘄𝗻𝗲𝗿 𝗖𝗼𝗻𝘁𝗿𝗼𝗹*
- join
- block / unblock
- restart
- setstatusmsg
- alwaysonline
- delete
          `.trim();
          break;
        case '5':
          section = `
⚙️ *𝗕𝗼𝘁 𝗜𝗻𝗳𝗼 & 𝗧𝗼𝗼𝗹𝘀*
- speed
- uptime
- alive
- allvar
- ping
- repo
          `.trim();
          break;
        default:
          section = '❌ Invalid input. Please reply with a valid number like 1, 2, or 3.';
          break;
      }

      await conn.sendMessage(from, { text: section }, { quoted: response });
    });

  } catch (err) {
    console.error('❌ Menu2 Error:', err);
    await reply('⚠️ Error loading interactive menu.');
  }
});
