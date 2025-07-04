import config from '../../config.cjs';

const startTime = Date.now();

const formatRuntime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "menu") {
    const start = new Date().getTime();
    await m.React('🪆');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const runtime = formatRuntime(Date.now() - startTime);
    const mode = m.isGroup ? "public" : "private";
    const ownerName = config.OWNER_NAME || "POPKID";

    let profilePictureUrl = 'https://files.catbox.moe/e1k73u.jpg'; // Default
    try {
      const pp = await sock.profilePictureUrl(m.sender, 'image');
      if (pp) profilePictureUrl = pp;
    } catch (err) {
      console.error("Error fetching profile picture:", err);
    }

    const menuText = `
╭───────────────⭓
│ 🤖 ʙᴏᴛ : *ᴘᴏᴘᴋɪᴅ-xᴅ*
│ ⏱️ ʀᴜɴᴛɪᴍᴇ : ${uptime}
│ ⚡ sᴘᴇᴇᴅ : ${responseTime}s
│ 🌐 ᴍᴏᴅᴇ : public
│ 🧩 ᴘʀᴇғɪx : ${prefix}
│ 👑 ᴏᴡɴᴇʀ : ᴘᴏᴘᴋɪᴅ
│ 🛠️ ᴅᴇᴠ : *ᴘᴏᴘᴋɪᴅ*
│ 🧪 ᴠᴇʀ : *2.0.0*
╰───────────────⭓
━━━━━━━━━━━━━━━━━━
💥 *𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙋𝙊𝙋𝙆𝙄𝘿-𝙓𝘿* 💥
━━━━━━━━━━━━━━━━━━

📜 『 *𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨* 』
❏ menu
❏ bugmenu
❏ speed
❏ alive
❏ sudo
❏ addpremium
❏ dev
❏ allvar
❏ ping
❏ owner

👑 『 *𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦* 』
❏ join
❏ autoread
❏ pair
❏ leave
❏ autostatusview
❏ autotyping
❏ autoblock
❏ autorecording
❏ autosticker
❏ antisticker
❏ restart
❏ block
❏ unblock
❏ anticall
❏ antidelete
❏ upload
❏ vv
❏ setstatusmsg
❏ allcmds
❏ calculater
❏ alwaysonline
❏ delete
❏ vv2
❏ setprefix
❏ setownername
❏ profile
❏ repo

🧠 『 *𝗔𝗜 & 𝗖𝗛𝗔𝗧* 』
❏ ai
❏ bug
❏ bot
❏ report
❏ gemini
❏ chatbot
❏ gpt
❏ lydia
❏ popkid-ai

🎨 『 *𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥𝗦* 』
❏ attp
❏ gimage
❏ mp3
❏ ss
❏ fancy
❏ url
❏ url2
❏ shorten
❏ sticker
❏ take

🔍 『 *𝗦𝗘𝗔𝗥𝗖𝗛 & 𝗧𝗢𝗢𝗟𝗦* 』
❏ google
❏ mediafire
❏ quranvideo
❏ quraimage
❏ facebook
❏ instagram
❏ tiktok
❏ lyrics
❏ ytsearch
❏ app
❏ bing
❏ ipstalk
❏ imdb
❏ pinterest
❏ githubstalk
❏ image
❏ ringtone
❏ playstore
❏ shazam

🎮 『 *𝗙𝗨𝗡 & 𝗚𝗔𝗠𝗘𝗦* 』
❏ getpp
❏ avatar
❏ wcg
❏ joke
❏ ttt
❏ yesorno
❏ connect4
❏ rank
❏ quizz
❏ movie
❏ flirt
❏ givetext
❏ roast
❏ anime
❏ profile
❏ ebinary
❏ fetch
❏ qc
❏ couple
❏ poll
❏ score
❏ toqr
❏ tempmail

👥 『 *𝗚𝗥𝗢𝗨𝗣 𝗖𝗢𝗡𝗧𝗥𝗢𝗟* 』
❏ kickall
❏ remove
❏ tagall
❏ hidetag
❏ forward
❏ getall
❏ group open
❏ group close
❏ add
❏ vcf
❏ left
❏ promoteall
❏ demoteall
❏ setdescription
❏ linkgc
❏ antilink
❏ antilink2
❏ antisticker
❏ antispam
❏ create
❏ setname
❏ promote
❏ demote
❏ groupinfo
❏ balance

🔞 『 *𝗛𝗘𝗡𝗧𝗔𝗜* 』
❏ hneko
❏ trap
❏ hwaifu
❏ hentai

🎧 『 *𝗔𝗨𝗗𝗜𝗢 𝗘𝗙𝗙𝗘𝗖𝗧𝗦* 』
❏ earrape
❏ deep
❏ blown
❏ bass
❏ nightcore
❏ fat
❏ fast
❏ robot
❏ tupai
❏ smooth
❏ slow
❏ reverse

💫 『 *𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡𝗦* 』
❏ bonk
❏ bully
❏ yeet
❏ slap
❏ nom
❏ poke
❏ awoo
❏ wave
❏ smile
❏ dance
❏ smug
❏ blush
❏ cringe
❏ sad
❏ happy
❏ shinobu
❏ cuddle
❏ glomp
❏ handhold
❏ highfive
❏ kick
❏ kill
❏ kiss
❏ cry
❏ bite
❏ lick
❏ pat
❏ hug

━━━━━━━━━━━━━━━━━━
⚡ *POPᴋID GLE V2.0* ⚡
━━━━━━━━━━━━━━━━━━
`;

    await sock.sendMessage(m.from, {
      image: { url: profilePictureUrl },
      caption: menuText.trim(),
      contextInfo: {
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "POPKID TECH",
          newsletterJid: "120363420342566562@newsletter"
        }
      }
    }, { quoted: m });
  }
};

export default menu;
