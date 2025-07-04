import config from '../../config.cjs';
import { runtime } from '../lib/functions.js';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "menu") {
    const start = Date.now();
    await m.react('🧠');
    const end = Date.now();
    const responseTime = ((end - start) / 1000).toFixed(2);
    const uptime = runtime(process.uptime());

    const menuMessage = `
╔═❖ 「 *𝗣𝗢𝗣𝗞𝗜𝗗-𝗫𝗗 𝗕𝗢𝗧* 」❖═╗
┃ 🤖 *Name:* Popkid-XD
┃ 🔧 *Version:* 2.0.0
┃ 📡 *Mode:* Public
┃ ⚡ *Speed:* ${responseTime}s
┃ ⏱️ *Uptime:* ${uptime}
┃ 🧩 *Prefix:* ${prefix}
┃ 👑 *Owner:* Popkid Tech
╚═════════════════════╝

▌📁 𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
├─ ❯ ${prefix}menu
├─ ❯ ${prefix}bugmenu
├─ ❯ ${prefix}speed
├─ ❯ ${prefix}alive
├─ ❯ ${prefix}sudo
├─ ❯ ${prefix}addpremium
├─ ❯ ${prefix}allvar
├─ ❯ ${prefix}ping
├─ ❯ ${prefix}owner

▌🛠️ 𝗢𝗪𝗡𝗘𝗥 𝗣𝗔𝗡𝗘𝗟
├─ ❯ ${prefix}join
├─ ❯ ${prefix}autoread
├─ ❯ ${prefix}pair
├─ ❯ ${prefix}leave
├─ ❯ ${prefix}autostatusview
├─ ❯ ${prefix}autotyping
├─ ❯ ${prefix}autoblock
├─ ❯ ${prefix}autorecording
├─ ❯ ${prefix}autosticker
├─ ❯ ${prefix}restart
├─ ❯ ${prefix}block
├─ ❯ ${prefix}unblock
├─ ❯ ${prefix}anticall
├─ ❯ ${prefix}antidelete
├─ ❯ ${prefix}upload
├─ ❯ ${prefix}delete
├─ ❯ ${prefix}allcmds
├─ ❯ ${prefix}alwaysonline
├─ ❯ ${prefix}vv
├─ ❯ ${prefix}vv2
├─ ❯ ${prefix}setprefix
├─ ❯ ${prefix}setownername

▌💬 𝗔𝗜 𝗠𝗢𝗗𝗨𝗟𝗘𝗦
├─ ❯ ${prefix}ai
├─ ❯ ${prefix}bot
├─ ❯ ${prefix}gemini
├─ ❯ ${prefix}chatbot
├─ ❯ ${prefix}gpt
├─ ❯ ${prefix}lydia
├─ ❯ ${prefix}popkid-ai

▌🎨 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥𝗦
├─ ❯ ${prefix}attp
├─ ❯ ${prefix}sticker
├─ ❯ ${prefix}take
├─ ❯ ${prefix}gimage
├─ ❯ ${prefix}mp3
├─ ❯ ${prefix}ss
├─ ❯ ${prefix}fancy
├─ ❯ ${prefix}url
├─ ❯ ${prefix}url2
├─ ❯ ${prefix}shorten

▌🔍 𝗧𝗢𝗢𝗟𝗦 & 𝗦𝗘𝗔𝗥𝗖𝗛
├─ ❯ ${prefix}google
├─ ❯ ${prefix}bing
├─ ❯ ${prefix}facebook
├─ ❯ ${prefix}instagram
├─ ❯ ${prefix}tiktok
├─ ❯ ${prefix}ytsearch
├─ ❯ ${prefix}mediafire
├─ ❯ ${prefix}lyrics
├─ ❯ ${prefix}githubstalk
├─ ❯ ${prefix}imdb
├─ ❯ ${prefix}playstore
├─ ❯ ${prefix}shazam

▌🎮 𝗙𝗨𝗡 & 𝗚𝗔𝗠𝗘𝗦
├─ ❯ ${prefix}joke
├─ ❯ ${prefix}ttt
├─ ❯ ${prefix}connect4
├─ ❯ ${prefix}flirt
├─ ❯ ${prefix}roast
├─ ❯ ${prefix}rank
├─ ❯ ${prefix}poll
├─ ❯ ${prefix}quizz
├─ ❯ ${prefix}anime
├─ ❯ ${prefix}tempmail
├─ ❯ ${prefix}toqr
├─ ❯ ${prefix}score

▌👥 𝗚𝗥𝗢𝗨𝗣 𝗠𝗔𝗡𝗔𝗚𝗘𝗠𝗘𝗡𝗧
├─ ❯ ${prefix}kickall
├─ ❯ ${prefix}remove
├─ ❯ ${prefix}tagall
├─ ❯ ${prefix}hidetag
├─ ❯ ${prefix}promote
├─ ❯ ${prefix}demote
├─ ❯ ${prefix}antilink
├─ ❯ ${prefix}antispam
├─ ❯ ${prefix}groupopen
├─ ❯ ${prefix}groupclose
├─ ❯ ${prefix}vcf
├─ ❯ ${prefix}linkgc
├─ ❯ ${prefix}setname

▌🔞 𝗛𝗘𝗡𝗧𝗔𝗜 𝗭𝗢𝗡𝗘
├─ ❯ ${prefix}hneko
├─ ❯ ${prefix}hwaifu
├─ ❯ ${prefix}trap
├─ ❯ ${prefix}hentai

▌🎧 𝗔𝗨𝗗𝗜𝗢 𝗘𝗙𝗙𝗘𝗖𝗧𝗦
├─ ❯ ${prefix}earrape
├─ ❯ ${prefix}deep
├─ ❯ ${prefix}bass
├─ ❯ ${prefix}blown
├─ ❯ ${prefix}nightcore
├─ ❯ ${prefix}robot
├─ ❯ ${prefix}reverse
├─ ❯ ${prefix}smooth
├─ ❯ ${prefix}slow

▌💫 𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡𝗦
├─ ❯ ${prefix}bonk
├─ ❯ ${prefix}slap
├─ ❯ ${prefix}hug
├─ ❯ ${prefix}smile
├─ ❯ ${prefix}wave
├─ ❯ ${prefix}poke
├─ ❯ ${prefix}cry
├─ ❯ ${prefix}kiss
├─ ❯ ${prefix}lick

╔═❖ 「 *𝗣𝗢𝗣𝗞𝗜𝗗-𝗫𝗗 𝗕𝗢𝗧* ❖═╗
     🫶❤️🥱💜🥱❣️🪴🦋❤️
           |••••••••••••••••••••••••|
╚══════════════════╝
    `.trim();

    // Send menu as image with caption
    await sock.sendMessage(m.from, {
      image: { url: 'https://i.ibb.co/zhWGyVZL/file-00000000c6b0624388a556a5aa392449.png' }, // Replace with your preferred banner/image URL
      caption: menuMessage
    }, { quoted: m });
  }
};

export default menu;
