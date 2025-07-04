import config from '../../config.cjs';

const menu = async (m, sock) => {
  if (!m.body) return; // Prevent crash if message has no body

  const prefix = config.PREFIX;
  const rawBody = m.body || '';
  const cmd = rawBody.startsWith(prefix)
    ? rawBody.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = rawBody.slice(prefix.length + cmd.length).trim();

  if (cmd === "menu") {
    const start = new Date().getTime();
    await m.React('✨');
    const end = new Date().getTime();
    const responseTime = ((end - start) / 1000).toFixed(2);

    const uptimeSeconds = process.uptime();
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    const uptime = `${hours}h ${minutes}m ${seconds}s`;

    // Default profile pic
    let profilePictureUrl = 'https://files.catbox.moe/ab8mf8.png';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);
      const pp = await sock.profilePictureUrl(m.sender, 'image', { signal: controller.signal });
      clearTimeout(timeout);
      if (pp) profilePictureUrl = pp;
    } catch {
      console.log('🖼️ Failed to fetch profile pic.');
    }

    const menuText = `
╔═❖ 「 *𝗣𝗢𝗣𝗞𝗜𝗗-𝗫𝗗 𝗕𝗢𝗧* 」❖═╗
┃ 🤖 *Name:* Popkid-XD
┃ 🔧 *Version:* 2.0.0
┃ 📡 *Mode:* Public
┃ ⚡ *Speed:* ${responseTime}s
┃ ⏱️ *Uptime:* ${uptime}
┃ 🧩 *Prefix:* ${prefix}
┃ 👑 *Owner:* Popkid Tech
╚═════════════════════╝

🌟 *Welcome to your Popkid-powered command hub!* 🌟

╭─❖ 🔰 *MAIN MENU* ❖─╮
│ 🧭 menu  
│ ⚙️ bugmenu  
│ 🚀 speed  
│ 📡 alive  
│ 🧑‍💻 sudo  
│ 💎 addpremium  
│ 🧪 dev  
│ 🧾 allvar  
│ 📍 ping  
│ 👑 owner  
╰────────────────╯

╭─❖ 👑 *OWNER COMMANDS* ❖─╮
│ 📥 join  
│ 👁️ autoread  
│ ⚙️ pair  
│ ❌ leave  
│ 📝 autostatusview  
│ ⌨️ autotyping  
│ 🔒 autoblock  
│ 🎥 autorecording  
│ 🌟 autosticker  
│ 🚫 antisticker  
│ 🔁 restart  
│ ❌ block  
│ ✅ unblock  
│ 📵 anticall  
│ 🗑️ antidelete  
│ ☁️ upload  
│ ⚙️ vv  
│ ✏️ setstatusmsg  
│ 🔐 allcmds  
│ 📉 calculater  
│ 🔄 alwaysonline  
│ 🗑️ delete  
│ 📊 vv2  
│ 💬 setprefix  
│ 🧑‍💼 setownername  
│ 👤 profile  
│ 🧾 repo  
╰─────────────────────╯

╭─❖ 🧠 *AI & CHAT* ❖─╮
│ 🤖 ai  
│ 🐞 bug  
│ 🧠 bot  
│ ❗ report  
│ 🌐 gemini  
│ 💬 chatbot  
│ 🧪 gpt  
│ 🤖 lydia  
│ 🌟 popkid-ai  
╰────────────────╯

╭─❖ 🎨 *CONVERTERS* ❖─╮
│ 🛡️ security  
│ 💼 sessioncheck  
│ 🔒 blockunknown  
│ 🔁 autoblock  
│ 🖥️ host  
│ 🚫 antispam  
│ ⚔️ antibugs  
│ 🖋️ attp  
│ 🖼️ gimage  
│ 🎵 mp3  
│ 📸 ss  
│ ✨ fancy  
│ 🔗 url  
│ 🔗 url2  
│ 📉 shorten  
│ 🪄 sticker  
│ 🧷 take  
╰────────────────╯

╭─❖ 🔍 *SEARCH & TOOLS* ❖─╮
│ 🌐 google  
│ 📁 mediafire  
│ 🕋 quranvideo  
│ 🕋 quraimage  
│ 📘 facebook  
│ 📸 instagram  
│ 🎶 tiktok  
│ 📄 lyrics  
│ 🔍 ytsearch  
│ 🧩 app  
│ 💻 bing  
│ 🕵️ ipstalk  
│ 🎥 imdb  
│ 📌 pinterest  
│ 🐱 githubstalk  
│ 🖼️ image  
│ 📱 ringtone  
│ 🏪 playstore  
│ 🎧 shazam  
╰────────────────────╯

╭─❖ 🎮 *FUN & GAMES* ❖─╮
│ 📸 getpp  
│ 👤 avatar  
│ 🎯 wcg  
│ 😂 joke  
│ ❌⭕ ttt  
│ 🤔 yesorno  
│ 🧩 connect4  
│ 🥇 rank  
│ 🧠 quizz  
│ 🎬 movie  
│ 😍 flirt  
│ 📜 givetext  
│ 🔥 roast  
│ 🧃 anime  
│ 👤 profile  
│ 🧮 ebinary  
│ 📦 fetch  
│ 🎨 qc  
│ 💕 couple  
│ 📊 poll  
│ 📈 score  
│ 🔳 toqr  
│ 📧 tempmail  
╰────────────────╯

╭─❖ 👥 *GROUP CONTROL* ❖─╮
│ ❌ kickall  
│ 🚫 remove  
│ 🏷️ tagall  
│ 👻 hidetag  
│ 🔁 forward  
│ 👥 getall  
│ 🟢 group open  
│ 🔴 group close  
│ ➕ add  
│ 📇 vcf  
│ 🔚 left  
│ ⬆️ promote  
│ ⬇️ demote  
│ 📝 setdescription  
│ 🔗 linkgc  
│ 🚫 antilink  
│ 🚫 antilink2  
│ 🛡️ antisticker  
│ 🚫 antispam  
│ 🆕 create  
│ ✏️ setname  
│ 📊 groupinfo  
│ 💰 balance  
╰────────────────────╯

╭─❖ 🔞 *HENTAI ZONE* ❖─╮
│ 🍑 hneko  
│ 🧢 trap  
│ 👧 hwaifu  
│ 🔞 hentai  
╰────────────────╯

╭─❖ 🎧 *AUDIO FX* ❖─╮
│ 💥 earrape  
│ 🎚️ deep  
│ 💨 blown  
│ 🔊 bass  
│ 🌙 nightcore  
│ 🍔 fat  
│ ⚡ fast  
│ 🤖 robot  
│ 🐿️ tupai  
│ 🎵 smooth  
│ 🐢 slow  
│ 🔁 reverse  
╰────────────────╯

╭─❖ 💫 *REACTIONS* ❖─╮
│ 🪓 bonk  
│ 👊 bully  
│ 🚀 yeet  
│ ✋ slap  
│ 🍽️ nom  
│ 👉 poke  
│ 🐺 awoo  
│ 👋 wave  
│ 😊 smile  
│ 💃 dance  
│ 😏 smug  
│ 😳 blush  
│ 😬 cringe  
│ 😢 sad  
│ 😃 happy  
│ 🍵 shinobu  
│ 🤗 cuddle  
│ 🤸 glomp  
│ ✋ handhold  
│ 🙌 highfive  
│ 👢 kick  
│ 🔪 kill  
│ 😘 kiss  
│ 😭 cry  
│ 😬 bite  
│ 👅 lick  
│ 🫴 pat  
│ 🤗 hug  
╰────────────────╯

━━━ ❖ ⚡ *POPᴋID GLE V2.0* ⚡ ❖ ━━━
✨ Innovating Chat, One Command at a Time ✨
    `.trim();

    const newsletterContext = {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: "Popkid-Gle",
        newsletterJid: "120363420342566562@newsletter"
      }
    };

    await sock.sendMessage(m.from, {
      image: { url: profilePictureUrl },
      caption: menuText,
      contextInfo: newsletterContext
    }, { quoted: m });

    // 🔊 Optional: Play random Popkid audio drop
    const songUrls = [
      'https://files.catbox.moe/2b33jv.mp3',
      'https://files.catbox.moe/0cbqfa.mp3',
      'https://files.catbox.moe/j4ids2.mp3',
      'https://files.catbox.moe/vv2qla.mp3'
    ];
    const randomSong = songUrls[Math.floor(Math.random() * songUrls.length)];

    await sock.sendMessage(m.from, {
      audio: { url: randomSong },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: newsletterContext
    }, { quoted: m });
  }
};

export default menu;
