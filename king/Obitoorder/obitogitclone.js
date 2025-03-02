import axios from 'axios';
import config from '../../config.js'; // Assuming config is now a .js file

const gitCloneCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['gitclone', 'gitdownload'];

  if (validCommands.includes(cmd)) {
    // Extract the GitHub repository URL from the command (e.g., "!gitclone <url>")
    const repoUrl = m.body.split(' ')[1];

    if (!repoUrl) {
      await gss.sendMessage(
        m.from,
        { text: '❌ Please provide a valid GitHub repository URL after the command.' },
        { quoted: m }
      );
      return;
    }

    const apiUrl = `https://api.giftedtech.my.id/api/download/gitclone?apikey=gifted&url=${encodeURIComponent(repoUrl)}`;

    try {
      // Fetch data from API
      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data); // Log the full response for debugging

      const apiData = response.data;

      if (apiData.status === 200 && apiData.success) {
        const result = apiData.result;
        const downloadUrl = result.download_url;

        await gss.sendMessage(
          m.from,
          { text: `*📦 Repository Name*: ${result.name}\n*🔗 Downloaded Repo:* ${downloadUrl}` },
          { quoted: m }
        );
      } else {
        await gss.sendMessage(
          m.from,
          { text: '❌ Failed to fetch repository details. Please check the URL or try again later.' },
          { quoted: m }
        );
      }
    } catch (error) {
      console.error('GitClone Command Error:', error); // Log the error message for debugging
      await gss.sendMessage(
        m.from,
        { text: '❌ An error occurred while processing the GitClone command. Please try again later.' },
        { quoted: m }
      );
    }
  }
};

export default gitCloneCommand;
