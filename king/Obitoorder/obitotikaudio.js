import axios from 'axios';
import config from '../../config.cjs';

const tiktokAudioDownloader = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const query = m.body.slice(prefix.length + cmd.length).trim();

  if (!['tiktokaudio', 'ttaudio'].includes(cmd)) return;

  if (!query) {
    return m.reply(`Usage: *${prefix}${cmd} <TikTok URL>*\n\nExample: *${prefix}${cmd} https://www.tiktok.com/@username/video/123456789*`);
  }

  try {
    // Fetch TikTok details from the API
    const apiUrl = `https://www.dark-yasiya-api.site/download/tiktok?url=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.status || !response.data?.result) {
      throw new Error('Failed to fetch TikTok data or invalid response.');
    }

    const { title, sound } = response.data.result;

    // Send audio to the user
    const mediaUrl = sound;
    const mediaType = 'mp3';
    const caption = `*${title}* (Audio)`;

    await Matrix.sendMedia(m.from, mediaUrl, mediaType, caption, m);
  } catch (error) {
    console.error('Error fetching TikTok audio:', error.message);
    await m.reply('An error occurred while fetching the TikTok audio. Please try again later.');
  }
};

export default tiktokAudioDownloader;
