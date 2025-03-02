import { UploadFileUgu, TelegraPh } from '../uploader.js';
import { writeFile, unlink } from 'fs/promises';
import config from '../../config.cjs';

const MAX_FILE_SIZE_MB = 60;

const tourl = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['tourl', 'url'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || !['imageMessage', 'videoMessage', 'audioMessage'].includes(m.quoted.mtype)) {
      return m.reply(`Send/Reply with an image, video, or audio to upload ${prefix + cmd}`);
    }

    try {
      const loadingMessage = await gss.sendMessage(m.from, { text: "*「▰▰▰▱▱▱▱▱▱▱」* Processing your file..." }, { quoted: m });

      const media = await m.quoted.download();
      console.log('Downloaded Media:', media);
      if (!media) throw new Error('Failed to download media.');

      const fileSizeMB = media.length / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        await gss.sendMessage(m.from, { text: `File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.` }, { quoted: m });
        return;
      }

      const extension = getFileExtension(m.quoted.mtype);
      if (!extension) throw new Error('Unknown media type.');

      const filePath = `./${Date.now()}.${extension}`;
      console.log('Saving File to:', filePath);
      await writeFile(filePath, media);

      let response;
      if (m.quoted.mtype === 'imageMessage') {
        response = await TelegraPh(filePath);
      } else {
        response = await UploadFileUgu(filePath);
      }
      console.log('Upload Response:', response);

      const mediaUrl = response.url || response;
      await gss.sendMessage(m.from, { text: `*Here is your media, ${m.pushName}:*\n*URL:* ${mediaUrl}` }, { quoted: m });

      await unlink(filePath);
      console.log('Temporary File Deleted:', filePath);

    } catch (error) {
      console.error('Error processing media:', error);
      await gss.sendMessage(m.from, { text: `Error processing your media. Details: ${error.message}` }, { quoted: m });
    }
  }
};

const getFileExtension = (mtype) => {
  switch (mtype) {
    case 'imageMessage': return 'jpg';
    case 'videoMessage': return 'mp4';
    case 'audioMessage': return 'mp3';
    default: return null;
  }
};

export default tourl;
