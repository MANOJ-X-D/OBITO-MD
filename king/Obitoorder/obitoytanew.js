/* OBITO-MD
import axios from 'axios';
import config from '../../config.cjs';

const youtubeVideo = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['ytvid', 'yvid', 'youtubevideo'];

  if (validCommands.includes(cmd)) {
    const query = m.body.slice(prefix.length + cmd.length).trim();
    if (!query) {
      return await gss.sendMessage(m.from, { text: 'Please provide a YouTube video link or video name.' }, { quoted: m });
    }

    try {
      await gss.sendMessage(m.from, { text: 'Fetching your video, please wait...' }, { quoted: m }); // Loading message
      const response = await axios.get(
        `https://api.giftedtech.my.id/api/search/yts?apikey=gifted&query=${encodeURIComponent(query)}`
      );

      // Check API response structure
      const results = response.data?.results;
      if (results && results.length > 0) {
        const video = results[0]; // Fetch the first video result
        const { url, title, description, thumbnail, duration, views, author } = video;

        await gss.sendMessage(
          m.from,
          {
            video: { url },
            caption: `🎬 *YouTube Video* 🎬\n\n*Title:* ${title}\n*Description:* ${description}\n*Duration:* ${duration.timestamp}\n*Views:* ${views.toLocaleString()}\n*Author:* ${author.name}\n\n🎥 Powered by MANOJ XD 🎥`,
            thumbnail: { url: thumbnail },
          },
          { quoted: m }
        );
      } else {
        await gss.sendMessage(m.from, { text: 'Sorry, no video found for that query.' }, { quoted: m });
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      await gss.sendMessage(m.from, { text: 'Failed to fetch the video. Please try again later.' }, { quoted: m });
    }
  }
};

export default youtubeVideo;
// POWERED BY MANOJ XD */

// OBITO-MD
// OBITO-MD
import axios from 'axios';
import config from '../../config.cjs';

const youtubeMp3 = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['ytmp3', 'ymp3', 'youtubeaudio'];

  if (validCommands.includes(cmd)) {
    const query = m.body.slice(prefix.length + cmd.length).trim();
    if (!query) {
      return await gss.sendMessage(m.from, { text: 'Please provide a YouTube video link.' }, { quoted: m });
    }

    try {
      await gss.sendMessage(m.from, { text: 'Fetching your audio, please wait...' }, { quoted: m }); // Loading message
      const response = await axios.get(
        `https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(query)}`
      );

      console.log(response.data);  // Log the entire API response for debugging

      // Check API response structure
      const data = response.data;
      if (data.success) {
        const { title, thumbnail, download_url } = data.result;

        if (!download_url) {
          console.error('Download URL is missing.');
          await gss.sendMessage(m.from, { text: 'Sorry, the audio is not available for that video.' }, { quoted: m });
          return;
        }

        // Send the audio directly to the user
        await gss.sendMessage(
          m.from,
          {
            audio: { url: download_url },
            mimetype: 'audio/mp4', // Ensure it's recognized as audio
            caption: `🎶 *YouTube Audio* 🎶\n\n*Title:* ${title}\n\n🎧 Powered by MANOJ XD 🎧`,
            thumbnail: { url: thumbnail },
          },
          { quoted: m }
        );
      } else {
        console.error('API response was not successful:', data);
        await gss.sendMessage(m.from, { text: 'Sorry, no audio found for that query.' }, { quoted: m });
      }
    } catch (error) {
      console.error('Error fetching audio:', error);  // Log error for debugging
      await gss.sendMessage(m.from, { text: 'Failed to fetch the audio. Please try again later.' }, { quoted: m });
    }
  }
};

export default youtubeMp3;
// POWERED BY MANOJ XD
