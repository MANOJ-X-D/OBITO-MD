import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const alive = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === "menu") {
    await m.React('⏳'); // React with a loading icon
    // Calculate uptime

    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);

    
    // Get real time
    const realTime = moment().tz("Asia/Karachi").format("HH:mm:ss");
    const xtime = moment.tz("Asia/Karachi").format("HH:mm:ss");
    const xdate = moment.tz("Asia/Karachi").format("DD/MM/YYYY");
    const time2 = moment().tz("Asia/Karachi").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

    const aliveMessage = `╭┈───────────────•*
*⇆𝐇𝐄𝐋𝐋𝐎 𝐌𝐑⇆*
          *${pushName}* _${pushwish}_
*⇆ ✨ 𝐎ʙɪᴛᴏ-𝐌ᴅ 𝐂ᴏᴍᴍᴀɴᴅ 𝐋ɪsᴛ ✨ ⇆*
*╰┈───────────────•*
*╭┈───────────────•* 
*│  ◦*  ʙᴏᴛ ɴᴀᴍᴇ: 𝐎ʙɪᴛᴏ-𝐌ᴅ
*│  ◦* ᴠᴇʀsɪᴏɴ: 1𝚂𝚃
*│  ◦* ᴅᴇᴠ: ᴍʀ.xᴅ-𝐌ᴀɴᴏᴊ 𝐗ᴅ
*│  ◦* ᴘʀᴇғɪx: *${prefix}*
*│  ◦* ᴍᴏᴅᴇ: *${mode}*
*│  ◦* ᴜᴘᴛɪᴍᴇ: *${days}d ${hours}h ${minutes}m ${seconds}s*
*│  ◦* ᴄᴜʀʀᴇɴᴛ ᴛɪᴍᴇ: *${realTime}*
*╰┈───────────────•*
*♡︎•━━━━━━☻︎━━━━━━•♡︎*
*[ • ☪️ ɪsʟᴀᴍɪᴄ ᴄᴍᴅ ☪️ • ]*
*╭┈───────────────•*
*┋*☪️ *${prefix}𝐐𝐔𝐑𝐀𝐍𝐕𝐈𝐃𝐄𝐎*
*╰┈───────────────•*
*[ • 🤴 ᴏᴡɴᴇʀ ᴄᴍᴅ🤴 ‎• ]*
*╭┈───────────────•*
*┋*👑 *${prefix}𝐁𝐋𝐎𝐂𝐊*
*┋*👑 *${prefix}𝐔𝐍𝐁𝐋𝐎𝐂𝐊*
*┋*👑 *${prefix}𝐉𝐎𝐈𝐍*
*┋*👑 *${prefix}𝐋𝐄𝐀𝐕𝐄*
*┋*👑 *${prefix}𝐒𝐄𝐓𝐕𝐀𝐑*
*┋*👑 *${prefix}𝐑𝐄𝐒𝐓𝐀𝐑𝐓*
*┋*👑 *${prefix}𝐒𝐄𝐓𝐏𝐏*
*┋*👑 *${prefix}𝐒𝐇𝐔𝐓𝐃𝐎𝐖𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*┋*👑 *${prefix}𝐂𝐎𝐍𝐈𝐍𝐆 𝐒𝐎𝐎𝐍*
*╰┈───────────────•*
*[ • 🔎 sᴇᴀʀᴄʜ ᴄᴍᴅ 🔍 ‎• ]*
*╭┈───────────────•*
*┋*🔍 *${prefix}𝐘𝐓𝐒*
*┋*🔍 *${prefix}𝐆𝐎𝐎𝐆𝐋𝐄*
*┋*🔍 *${prefix}𝐈𝐌𝐃𝐁*
*┋*🔍 *${prefix}𝐈𝐌𝐆*
*┋*🔍 *${prefix}𝐖𝐄𝐀𝐓𝐇𝐄𝐑*
*┋*🔍 *${prefix}𝐏𝐋𝐀𝐘𝐒𝐓𝐎𝐑𝐄*
*┋*🔍 *${prefix}𝐍𝐄𝐖𝐒*
*╰┈───────────────•*
*[ • 🧠 ᴀɪ ᴄᴍᴅ 🧠  ‎• ]*
*╭┈───────────────•*
*┋*🧠 *${prefix}𝐁𝐋𝐀𝐂𝐊𝐁𝐎𝐗𝐀𝐈*
*┋*🧠 *${prefix}𝐆𝐏𝐓*
*┋*🧠 *${prefix}𝐕𝐈𝐒𝐈𝐓*
*╰┈───────────────•*
*[ • 📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴄᴍᴅ 📥 ‎• ]*
*╭┈───────────────•*
*┋*⏬️ *${prefix}𝐅𝐁*
*┋*⏬️ *${prefix}𝐈𝐍𝐒𝐓𝐀*
*┋*⏬️ *${prefix}𝐕𝐈𝐃𝐄𝐎*
*┋*⏬️ *${prefix}𝐆𝐃𝐑𝐈𝐕𝐄*
*┋*⏬️ *${prefix}𝐓𝐖𝐈𝐓𝐓𝐄𝐑*
*┋*⏬️ *${prefix}𝐓𝐈𝐊𝐓𝐎𝐊*
*┋*⏬️ *${prefix}𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄*
*┋*⏬️ *${prefix}𝐒𝐎𝐍𝐆*
*┋*⏬️ *${prefix}𝐕𝐈𝐃𝐄𝐎*
*┋*⏬️ *${prefix}𝐀𝐏𝐊*
*┋*⏬️ *${prefix}𝐓𝐓𝐀𝐔𝐃𝐈𝐎*
*╰┈───────────────•*
*[ • 🚻 ɢʀᴏᴜᴘ ᴄᴍᴅ 🚻 ‎• ]*
*╭┈───────────────•*
*┋*⛔️ *${prefix}𝐃𝐄𝐋 <ʀᴇᴘʟʏ ғᴏʀ ᴅᴇʟᴇᴛᴇ sᴍs>*
*┋*🤝 *${prefix}𝐀𝐃𝐃*
*┋*🦵 *${prefix}𝐊𝐈𝐂𝐊*
*┋*🤗 *${prefix}𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐎𝐍*
*┋*🤗 *${prefix}𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐎𝐅𝐅*
*┋*🫅 *${prefix}𝐏𝐑𝐎𝐌𝐎𝐓𝐄*
*┋*🤵 *${prefix}𝐃𝐄𝐌𝐎𝐓𝐄*
*┋*🎳 *${prefix}𝐓𝐀𝐆𝐀𝐋𝐋*
*┋*📛 *${prefix}𝐇𝐈𝐃𝐄𝐓𝐀𝐆*
*┋*♻️ *${prefix}𝐈𝐍𝐕𝐈𝐓𝐄*
*┋*🔇 *${prefix}𝐌𝐔𝐓𝐄*
*┋*🔊 *${prefix}𝐔𝐍𝐌𝐔𝐓𝐄*
*┋*🔒 *${prefix}𝐆𝐑𝐎𝐔𝐏 𝐎𝐏𝐄𝐍*
*┋*🔓 *${prefix}𝐆𝐑𝐎𝐔𝐏 𝐂𝐋𝐎𝐒𝐄*
*┋*😞 *${prefix}𝐋𝐄𝐀𝐕𝐄*
*╰┈───────────────•*
*[ • 🎙️ ᴀᴜᴅɪᴏ ᴄᴍᴅ🎙️ ‎• ]*
*╭┈───────────────•*
*┋*🎙️ *${prefix}𝐃𝐄𝐄𝐏*
*┋*🎙️ *${prefix}𝐁𝐀𝐒𝐒*
*┋*🎙️ *${prefix}𝐑𝐎𝐁𝐎𝐓*
*┋*🎙️ *${prefix}𝐑𝐄𝐕𝐄𝐑𝐒𝐄*
*┋*🎙️ *${prefix}𝐒𝐋𝐎𝐖*
*┋*🎙️ *${prefix}𝐒𝐌𝐎𝐎𝐓𝐇*
*┋*🎙️ *${prefix}𝐍𝐈𝐆𝐇𝐓𝐂𝐎𝐑𝐄*
*╰┈───────────────•*
*[ • ☣ sᴛɪᴄᴋᴇʀᴄ ᴄᴍᴅ☣ ‎• ]*
*╭┈───────────────•*
*┋*☣ *${prefix}𝐃𝐀𝐍𝐂𝐄*
*┋*☣ *${prefix}𝐏𝐎𝐊𝐄*
*┋*☣ *${prefix}𝐖𝐈𝐍𝐊*
*┋*☣ *${prefix}𝐇𝐀𝐏𝐏𝐘*
*┋*☣ *${prefix}𝐊𝐈𝐂𝐊*
*┋*☣ *${prefix}𝐊𝐈𝐋𝐋*
*┋*☣ *${prefix}𝐒𝐋𝐀𝐏*
*┋*☣ *${prefix}𝐁𝐈𝐓𝐄*
*┋*☣ *${prefix}𝐍𝐎𝐌*
*┋*☣ *${prefix}𝐇𝐈𝐆𝐇𝐅𝐈𝐕𝐄*
*┋*☣ *${prefix}𝐖𝐀𝐕𝐄*
*┋*☣ *${prefix}𝐒𝐌𝐈𝐋𝐄*
*┋*☣ *${prefix}𝐁𝐋𝐔𝐒𝐇*
*┋*☣ *${prefix}𝐘𝐄𝐄𝐓*
*┋*☣ *${prefix}𝐁𝐎𝐍𝐊*
*┋*☣ *${prefix}𝐒𝐌𝐔𝐆*
*┋*☣ *${prefix}𝐏𝐀𝐓*
*┋*☣ *${prefix}𝐋𝐈𝐂𝐊*
*┋*☣ *${prefix}𝐊𝐈𝐒𝐒*
*┋*☣ *${prefix}𝐀𝐖𝐎𝐎*
*┋*☣ *${prefix}𝐇𝐔𝐆*
*┋*☣ *${prefix}𝐂𝐑𝐘*
*┋*☣ *${prefix}𝐂𝐔𝐃𝐃𝐋𝐄*
*┋*☣ *${prefix}𝐁𝐔𝐋𝐋𝐘*
*╰┈───────────────•*
*[ • 🤓 ᴏᴛʜᴇʀ ᴄᴍᴅ🤓 ‎• ]*
*╭┈───────────────•*
*┋*🤓 *${prefix}𝐅𝐀𝐍𝐂𝐘*
*┋*🤓 *${prefix}𝐄𝐁𝐈𝐍𝐀𝐑𝐘*
*┋*🤓 *${prefix}𝐃𝐁𝐈𝐍𝐀𝐑𝐘*
*┋*🤓 *${prefix}𝐆𝐄𝐓*
*┋*🤓 *${prefix}𝐅𝐄𝐓𝐂𝐇*
*┋*🤓 *${prefix}𝐔𝐏𝐃𝐀𝐓𝐄𝐍𝐎𝐖*
*┋*🤓 *${prefix}𝐌𝐏³*
*┋*🤓 *${prefix}𝐓𝐓𝐒*
*┋*🤓 *${prefix}𝐒𝐇𝐎𝐑𝐓𝐄𝐍*
*┋*🤓 *${prefix}𝐓𝐄𝐌𝐏𝐌𝐀𝐈𝐋*
*┋*🤓 *${prefix}𝐂𝐇𝐄𝐂𝐊𝐌𝐀𝐈𝐋*
*╰┈───────────────•*
*[ • 🤓 sᴛᴀʟᴋᴇʀ ᴄᴍᴅ 🤓 ‎• ]*
*╭┈───────────────•*
*┋*🤓 *${prefix}𝐆𝐈𝐓𝐒𝐓𝐀𝐋𝐊*
*┋*🤓 *${prefix}𝐓𝐈𝐊𝐒𝐓𝐀𝐋𝐊*
*┋*🤓 *${prefix}𝐍𝐏𝐌𝐒𝐓𝐀𝐋𝐊*
*┋*🤓 *${prefix}𝐏𝐎𝐏𝐈𝐍𝐅𝐎*
*┋*🤓 *${prefix}𝐋𝐎𝐎𝐊𝐔𝐏*
*┋*🤓 *${prefix}𝐖𝐀𝐂𝐇𝐀𝐍𝐍𝐄𝐋*
*╰┈───────────────•*
*[ • 🤵ʜᴇʀᴏᴋᴜ ᴄʟɪᴇɴᴛ🤵 ‎• ]*
*╭┈───────────────•*
*┋*🤵 *${prefix}𝐌𝐎𝐃𝐄 <𝙿𝚄𝙱𝙻𝙸𝙲/𝙿𝚁𝙸𝚅𝙰𝚃𝙴>*
*┋*🤵 *${prefix}𝐏𝐑𝐄𝐅𝐄𝐗 <𝚂𝚈𝙼𝙱𝙾𝙻>*
*┋*🤵 *${prefix}𝐀𝐔𝐓𝐎𝐒𝐕𝐈𝐄𝐖 <𝙾𝙽/𝙾𝙵𝙵>*
*┋*🤵 *${prefix}𝐀𝐔𝐓𝐎𝐑𝐄𝐀𝐂𝐓 <𝙾𝙽/𝙾𝙵𝙵>*
*┋*🤵 *${prefix}𝐀𝐋𝐖𝐀𝐘𝐒𝐎𝐍𝐋𝐈𝐍𝐄 <𝙾𝙽/𝙾𝙵𝙵>*
*┋*🤵 *${prefix}𝐀𝐔𝐓𝐎𝐑𝐄𝐀𝐃 <𝙾𝙽/𝙾𝙵𝙵>*
*┋*🤵 *${prefix}𝐀𝐔𝐓𝐎𝐁𝐋𝐎𝐂𝐊 <𝙾𝙽/𝙾𝙵𝙵>*
*┋*🤵 *${prefix}𝐀𝐍𝐓𝐈𝐂𝐀𝐋𝐋 <𝙾𝙽/𝙾𝙵𝙵>*
*┋*🤵 *${prefix}𝐀𝐔𝐓𝐎𝐑𝐄𝐂𝐎𝐑𝐃𝐈𝐍𝐆 <𝙾𝙽/𝙾𝙵𝙵>*
*┋*🤵 *${prefix}𝐀𝐔𝐓𝐎𝐓𝐘𝐏𝐈𝐍𝐆 <𝙾𝙽/𝙾𝙵𝙵>*
*╰┈───────────────•*
🌐 𝗠𝗢𝗥𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗖𝗢𝗠𝗜𝗡𝗚 𝗦𝗢𝗢𝗡! 🌐`;

    await m.React('🤡'); // React with a joker icon

    sock.sendMessage(
      m.from,
      {
        text: aliveMessage,
        contextInfo: {
          isForwarded: false,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '@newsletter',
            newsletterName: "Obito-MD",
            serverMessageId: -1,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "✨ Obito-MD ✨",
            body: "MY MENU",
            thumbnailUrl: 'https://cdn.ironman.my.id/i/amtivf.jpg', // Add thumbnail URL if required
            sourceUrl: 'https://whatsapp.com/channel/0029Vb8MXtb3GJOqeYi8VF0p', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default alive;
