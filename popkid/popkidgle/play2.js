import '../../config.cjs';
import ytSearch from 'yt-search';

const play = async (msg, sock) => {
  const input = msg.body.trim().toLowerCase();

  // Supported prefixes
  const prefixes = ["play", "video", "mp3", "mp4", "music", "song"];
  const matchedPrefix = prefixes.find(p => input.startsWith(p));

  if (matchedPrefix) {
    const query = input.replace(matchedPrefix, '').trim();
    if (!query) return msg.reply("❌ *Please provide a search query!*");

    await msg.React('🎧');

    try {
      const results = await ytSearch(query);
      if (!results.videos.length) return msg.reply("❌ *No results found!*");

      const video = results.videos[0];
      const caption = `
╭━━━〔 ᴘᴏᴘᴋɪᴅ ɢʟᴇ | ᴀɪ ᴘʟᴀʏᴇʀ 〕━━━

📌 *Title:* ${video.title}
⏱️ *Duration:* ${video.timestamp}
👁️ *Views:* ${video.views}
🎙️ *Channel:* ${video.author.name}

╰━━━━━━━━━━━━━━━━━━━━━━━
⏬ *Preparing your file...*
`;

      await sock.sendMessage(msg.from, {
        image: { url: video.thumbnail },
        caption
      }, { quoted: msg });

      const encodedUrl = encodeURIComponent(video.url);

      // Choose audio or video based on prefix
      const isAudio = ["play", "mp3", "music", "song"].includes(matchedPrefix);
      const apiList = isAudio
        ? [
            `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodedUrl}`,
            `https://apis.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encodedUrl}`
          ]
        : [
            `https://apis.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encodedUrl}`,
            `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodedUrl}`,
            `https://www.dark-yasiya-api.site/download/ytmp4?url=${encodedUrl}`,
            `https://api.giftedtech.web.id/api/download/dlmp4?url=${encodedUrl}&apikey=gifted-md`
          ];

      const fileType = isAudio ? 'audio' : 'video';
      const mime = isAudio ? 'audio/mpeg' : 'video/mp4';
      const successCaption = isAudio ? '🎵 *Audio ready!*' : '📽️ *Video ready!*';

      let downloadLink = null;
      for (const api of apiList) {
        try {
          const res = await fetch(api);
          const data = await res.json();
          if (data.success && data.result?.download_url) {
            downloadLink = data.result.download_url;
            break;
          }
        } catch (err) {
          console.log(`❌ API failed: ${api}`);
        }
      }

      if (!downloadLink) return msg.reply("❌ *All Popkid servers failed. Try again later.*");

      const media = {
        [fileType]: { url: downloadLink },
        mimetype: mime,
        caption: successCaption
      };

      await sock.sendMessage(msg.from, media, { quoted: msg });

    } catch (error) {
      console.error("❌ Error:", error);
      return msg.reply("⚠️ *Something went wrong while processing your request.*");
    }
  }
};

export default play;
