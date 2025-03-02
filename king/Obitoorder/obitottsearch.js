import axios from 'axios';
import config from '../../config.cjs';

const tiktokSearch = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.trim().split(' ').slice(1); // Extract search query
  const query = args.join(' ');

  if (cmd === 'tiktoksearch' && query) {
    try {
      const apiUrl = `https://api.siputzx.my.id/api/s/tiktok?query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.status) {
        const results = response.data.data;
        let searchResults = `🎥 *OBITO-MD TikTok Search Results* 🎥\n\n`;

        // Iterate through all results and append to message
        results.forEach((result, index) => {
          const videoLink = `https://www.tiktok.com/@username/video/${result.video_id}`;
          searchResults += `
*${index + 1}. Video ID:* ${result.video_id}
📍 *Region:* ${result.region}
📝 *Title:* ${result.title}
🎥 *Video Link:* [Watch Video](${videoLink})
📸 [Cover Image](${result.cover})

`;
        });

        searchResults += `\n*Powered By MANOJ XD*`;

        // Send results to the user
        await gss.sendMessage(
          m.from,
          {
            text: searchResults.trim(),
          },
          { quoted: m }
        );
      } else {
        throw new Error('No results found!');
      }
    } catch (error) {
      await gss.sendMessage(
        m.from,
        {
          text: `❌ *Error fetching TikTok search results!*\n\nPlease make sure the query is correct.\n\n*Powered By MANOJ XD*`,
        },
        { quoted: m }
      );
    }
  } else if (cmd === 'tiktoksearch') {
    await gss.sendMessage(
      m.from,
      {
        text: `⚠️ *Usage:* ${prefix}tiktoksearch <query>\n\nExample: ${prefix}tiktoksearch imrankhan\n\n*Powered By MANOJ XD*`,
      },
      { quoted: m }
    );
  }
};

export default tiktokSearch;

// OBITO-MD
// Powered By MANOJ XD
