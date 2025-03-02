import axios from 'axios';
import config from '../../config.cjs';

const tiktokStalk = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const args = text.split(' ');

  const validCommands = ['tiktokstalk', 'ttstalk', 'tikstalk'];

  if (validCommands.includes(cmd)) {
    if (!args[0]) return m.reply('Mention a TikTok username to stalk.');

    const username = args[0];

    const apiResponse = await axios.get(`https://bk9.fun/stalk/tiktok?q=${username}`);
    const data = apiResponse.data;

    if (data.status) {
      const tiktokData = data.BK9;

      let responseMessage = `🎥 *OBITO-MD TikTok Stalker*\n\n`;
      responseMessage += `  ◦  *Name*: ${tiktokData.name || 'N/A'}\n`;
      responseMessage += `  ◦  *Username*: ${tiktokData.username || 'N/A'}\n`;
      responseMessage += `  ◦  *Bio*: ${tiktokData.bio || 'N/A'}\n`;
      responseMessage += `  ◦  *Followers*: ${tiktokData.followers || 'N/A'}\n`;
      responseMessage += `  ◦  *Following*: ${tiktokData.following || 'N/A'}\n`;
      responseMessage += `  ◦  *Likes*: ${tiktokData.likes || 'N/A'}\n`;

      await gss.sendMessage(
        m.from,
        {
          image: { url: tiktokData.profile },
          caption: `${responseMessage}\n\n🔖 *POWERED BY MANOJ XD*`,
        },
        { quoted: m }
      );
    } else {
      m.reply('❌ TikTok user not found. Please check the username.');
    }
  }
};

export default tiktokStalk;
