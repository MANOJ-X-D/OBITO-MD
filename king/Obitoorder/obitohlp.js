import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import axios from 'axios';

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['menu', 'help', 'list'];
  
  const messageText = `╭───━═━═━⊷ 
🤖 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: *_OBITO MD_*
📟 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: *_1.0.0_*
👤 𝗗𝗘𝗩: *_MANOJ XD_*
📈 *uptime*: *${uptime}*
╰───━═━═━⊷

━━━━━🌟━━━━━

✨ 𝗢𝗕𝗜𝗧𝗢-𝗠𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 ✨

These commands will help you master using me!

╭━━━━◈ SYSTEM ◈━━━╮
➤ ${prefix}𝗣𝗶𝗻𝗴
➤ ${prefix}𝗔𝗹𝗶𝘃𝗲
➤ ${prefix}𝗢𝘄𝗻𝗲𝗿
➤ ${prefix}𝗠𝗲𝗻𝘂 
╰━━━━━━━◈━━━━━━━╯

╭━━━━◈ OWNER ◈━━━━╮
➤ ${prefix}𝗝𝗼𝗶𝗻
➤ ${prefix}𝗟𝗲𝗮𝘃𝗲
➤ ${prefix}𝗕𝗹𝗼𝗰𝗸
➤ ${prefix}𝗨𝗻𝗯𝗹𝗼𝗰𝗸
➤ ${prefix}𝗦𝗲𝘁𝗽𝗽𝗯𝗼𝘁
➤ ${prefix}𝗔𝗻𝘁𝗶𝗰𝗮𝗹𝗹
➤ ${prefix}𝗦𝗲𝘁𝘀𝘁𝗮𝘁𝘂𝘀
➤ ${prefix}𝗦𝗲𝘁𝗻𝗮𝗺𝗲𝗯𝗼𝘁
➤ ${prefix}𝗔𝘂𝘁𝗼𝗧𝘆𝗽𝗶𝗻𝗴
➤ ${prefix}𝗔𝗹𝘄𝗮𝘆𝘀𝗢𝗻𝗹𝗶𝗻𝗲
➤ ${prefix}𝗔𝘂𝘁𝗼𝗥𝗲𝗮𝗱
➤ ${prefix}𝗮𝘂𝘁𝗼𝘀𝘃𝗶𝗲𝘄
 ╰━━━━━━◈━━━━━━╯

╭━━━◈ 𝗚𝗣𝗧 ◈━━━━╮
➤ ${prefix}𝗦𝗮𝗿𝗸𝗮𝗿
➤ ${prefix}𝗕𝘂𝗴
➤ ${prefix}𝗥𝗲𝗽𝗼𝗿𝘁
➤ ${prefix}𝗿𝗮𝘀𝗵𝗶𝗱
➤ ${prefix}𝗗𝗮𝗹𝗹𝗲
➤ ${prefix}𝗥𝗲𝗺𝗶𝗻𝗶
➤ ${prefix}𝗚𝗲𝗺𝗶𝗻𝗶 
╰━━━━━━◈━━━━━━╯

╭━━━━ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥 ━━━╮
➤ ${prefix}𝗔𝗧𝗧𝗣
➤ ${prefix}𝗔𝗧𝗧𝗣𝟮
➤ ${prefix}𝗔𝗧𝗧𝗣𝟯
➤ ${prefix}𝗘𝗕𝗜𝗡𝗔𝗥𝗬
➤ ${prefix}𝗗𝗕𝗜𝗡𝗔𝗥𝗬
➤ ${prefix}𝗘𝗠𝗢𝗝𝗜𝗠𝗜𝗫
➤ ${prefix}𝗠𝗣𝟯 
╰━━━━━━━◈━━━━━━━╯

╭━━━━◈ 𝗚𝗥𝗢𝗨𝗣 ◈━━━╮
➤ ${prefix}𝗟𝗶𝗻𝗸𝗚𝗿𝗼𝘂𝗽
➤ ${prefix}𝗦𝗲𝘁𝗽𝗽𝗴𝗰
➤ ${prefix}𝗦𝗲𝘁𝗻𝗮𝗺𝗲
➤ ${prefix}𝗦𝗲𝘁𝗱𝗲𝘀𝗰
➤ ${prefix}𝗚𝗿𝗼𝘂𝗽
➤ ${prefix}𝗚𝗰𝘀𝗲𝘁𝘁𝗶𝗻𝗴
➤ ${prefix}𝗪𝗲𝗹𝗰𝗼𝗺𝗲
➤ ${prefix}𝗔𝗱𝗱
➤ ${prefix}𝗞𝗶𝗰𝗸
➤ ${prefix}𝗛𝗶𝗱𝗲𝗧𝗮𝗴
➤ ${prefix}𝗧𝗮𝗴𝗮𝗹𝗹
➤ ${prefix}𝗔𝗻𝘁𝗶𝗟𝗶𝗻𝗸
➤ ${prefix}𝗔𝗻𝘁𝗶𝗧𝗼𝘅𝗶𝗰
➤ ${prefix}𝗣𝗿𝗼𝗺𝗼𝘁𝗲
➤ ${prefix}𝗗𝗲𝗺𝗼𝘁𝗲
➤ ${prefix}𝗚𝗲𝘁𝗯𝗶𝗼 
╰━━━━━━━◈━━━━━━╯

╭━━◈ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 ◈━━━╮
➤ ${prefix}𝗔𝗽𝗸
➤ ${prefix}𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸
➤ ${prefix}𝗠𝗲𝗱𝗶𝗮𝗳𝗶𝗿𝗲
➤ ${prefix}𝗣𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁𝗱𝗹
➤ ${prefix}𝗚𝗶𝘁𝗰𝗹𝗼𝗻𝗲
➤ ${prefix}𝗚𝗱𝗿𝗶𝘃𝗲
➤ ${prefix}𝗜𝗻𝘀𝘁𝗮
➤ ${prefix}𝘆𝘁𝗺𝗽𝟯
➤ ${prefix}𝘆𝘁𝗺𝗽𝟰
➤ ${prefix}𝗣𝗹𝗮𝘆
➤ ${prefix}𝗦𝗼𝗻𝗴
➤ ${prefix}𝗩𝗶𝗱𝗲𝗼
➤ ${prefix}𝘆𝘁𝗺𝗽𝟯𝗱𝗼𝗰
➤ ${prefix}𝘆𝘁𝗺𝗽𝟰𝗱𝗼𝗰
➤ ${prefix}𝗧𝗶𝗸𝘁𝗼𝗸 
╰━━━━━━━◈━━━━━━━╯

╭━━━◈ 𝗦𝗘𝗔𝗥𝗖𝗛 ◈━━━╮
➤ ${prefix}𝗣𝗹𝗮𝘆
➤ ${prefix}𝘆𝘁𝘀
➤ ${prefix}𝗜𝗺𝗱𝗯
➤ ${prefix}𝗚𝗼𝗼𝗴𝗹𝗲
➤ ${prefix}𝗚𝗶𝗺𝗮𝗴𝗲
➤ ${prefix}𝗟𝘆𝗿𝗶𝗰𝘀 
╰━━━━━━━◈━━━━━━━╯

🌐 𝗠𝗢𝗥𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗖𝗢𝗠𝗜𝗡𝗚 𝗦𝗢𝗢𝗡! 🌐

*━─━─
`;
  const msg = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: messageText
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "© OBITO-MD by Manoj xd"
          }),
              }
        }),
      },
    },
  }, {});

  await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
    }
};

export default alive;
