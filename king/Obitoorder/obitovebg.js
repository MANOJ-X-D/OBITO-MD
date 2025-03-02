import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { removeBackgroundFromImageFile } from 'remove.bg';
import config from '../../config.cjs';

const tourl = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['removebg', 'nobg'];

  // Check if the command is valid
  if (validCommands.includes(cmd)) {
    const apiKeys = [
      'q61faXzzR5zNU6cvcrwtUkRU', 'S258diZhcuFJooAtHTaPEn4T',
      '5LjfCVAp4vVNYiTjq9mXJWHF', 'aT7ibfUsGSwFyjaPZ9eoJc61',
      'BY63t7Vx2tS68YZFY6AJ4HHF', '5Gdq1sSWSeyZzPMHqz7ENfi8',
      '86h6d6u4AXrst4BVMD9dzdGZ', 'xp8pSDavAgfE5XScqXo9UKHF',
      'dWbCoCb3TacCP93imNEcPxcL'
    ];

    const apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    // Check if the message is quoted with an image
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
      return m.reply(`> Please reply to an image with the command *${prefix + cmd}* to remove the background.`);
    }

    const localFilePath = `./src/remobg-${uuidv4()}`;
    const outputFilePath = `./src/hremo-${uuidv4()}.png`;
    const media = await m.quoted.download();

    // Save the downloaded image locally
    fs.writeFileSync(localFilePath, media);

    m.reply('Processing your image, please wait...');

    // Process the image to remove the background
    removeBackgroundFromImageFile({
      path: localFilePath,
      apiKey,
      size: 'regular',
      type: 'auto',
      scale: '100%',
      outputFile: outputFilePath
    }).then(async () => {
      // Send the processed image back to the user
      await gss.sendMessage(m.from, { 
        image: fs.readFileSync(outputFilePath), 
        caption: `> Hey ${m.pushName}, your image background has been removed successfully!` 
      }, { quoted: m });

      // Clean up the local files
      fs.unlinkSync(localFilePath);
      fs.unlinkSync(outputFilePath);
    }).catch(error => {
      console.error('Error processing image:', error);
      m.reply('There was an error processing the image. Please try again.');
      fs.unlinkSync(localFilePath);
    });
  }
};

export default tourl;