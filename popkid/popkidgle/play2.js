// play2.js

import ytSearch from 'yt-search';
import '../../config.cjs';

const prefix = ['.', '!', '/']; // Customize this list as you want

const play2 = async (m, sock) => {
  const text = m.body?.trim();
  const usedPrefix = prefix.find(p => text?.startsWith(p + 'play2'));
  if (!usedPrefix) return;

  const query = text.slice((usedPrefix + 'play2').length).trim();
  if (!query) return m.reply("❌ *Please provide a search query!*");

  await m.React('🔍');

  try {
    const result = await ytSearch(query);
    if (!result.videos.length) return m.reply("❌ *No results found!*");

    const video = result.videos[0];
    const caption = `
╭━━━〔 *ᴘᴏᴘᴋɪᴅ-ɢʟᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 〕━━━

📌 *Title:* ${video.title}
⏱️ *Duration:* ${video.timestamp}
👁️ *Views:* ${video.views}
📺 *Channel:* ${video.author.name}

╰━━━━━━━━━━━━━━━━━━━━

🎧 Reply with a number to choose format:

1️⃣ Audio  
2️⃣ Video  
3️⃣ Audio 📄  
4️⃣ Video 📄  
5️⃣ Voice Note 🎙️`;

    await sock.sendMessage(m.from, {
      image: { url: video.thumbnail },
      caption
    }, { quoted: m });

    global.gle_play2 = global.gle_play2 || {};
    global.gle_play2[m.key.id] = {
      url: video.url,
      title: video.title
    };

  } catch (err) {
    console.error(err);
    m.reply("❌ *An error occurred while searching.*");
  }
};

const handlePlay2Reply = async (m, sock) => {
  const ref = m.quoted?.key?.id;
  if (!ref || !global.gle_play2?.[ref]) return;

  const selection = m.body.trim();
  const videoData = global.gle_play2[ref];
  const formats = {
    "1": { type: 'audio', mimetype: 'audio/mpeg', caption: '🎵 *Here is your audio*' },
    "2": { type: 'video', mimetype: 'video/mp4', caption: '🎬 *Here is your video*' },
    "3": { type: 'audioDocument', mimetype: 'audio/mpeg', caption: '📄 *Audio Doc*' },
    "4": { type: 'videoDocument', mimetype: 'video/mp4', caption: '📄 *Video Doc*' },
    "5": { type: 'voice', mimetype: 'audio/ogg; codecs=opus', caption: '🗣️ *Voice Note*' },
  };

  if (!formats[selection]) return m.reply("❌ *Invalid selection. Please reply with 1–5.*");

  const selected = formats[selection];
  await m.React('⏳');

  const encoded = encodeURIComponent(videoData.url);
  const sources = [
    `https://apis.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encoded}`,
    `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encoded}`,
    `https://www.dark-yasiya-api.site/download/ytmp3?url=${encoded}`,
    `https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encoded}`
  ];

  let fileURL = null;
  for (const api of sources) {
    try {
      const res = await fetch(api);
      const json = await res.json();
      if (json?.result?.download_url) {
        fileURL = json.result.download_url;
        break;
      }
    } catch (e) {
      console.error(`API failed: ${api}`);
    }
  }

  if (!fileURL) return m.reply("❌ *All download sources failed. Try again later.*");

  const sendOpts = { quoted: m, caption: selected.caption };

  if (selected.type.includes("Document")) {
    sendOpts.document = { url: fileURL };
    sendOpts.mimetype = selected.mimetype;
    sendOpts.fileName = `${videoData.title}.${selected.mimetype.split("/")[1]}`;
  } else if (selected.type === "voice") {
    sendOpts.audio = { url: fileURL };
    sendOpts.mimetype = selected.mimetype;
    sendOpts.ptt = true;
  } else {
    sendOpts[selected.type] = { url: fileURL };
    sendOpts.mimetype = selected.mimetype;
  }

  await sock.sendMessage(m.from, sendOpts);
  await m.React('✅');

  delete global.gle_play2[ref]; // Clean up
};

export { play2, handlePlay2Reply };
