import Tesseract from 'tesseract.js';
import translate from 'translate-google-api';
import { writeFile, unlink } from 'fs/promises';
import config from '../../config.cjs';

const translateCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['translate', 'trt'];

  if (validCommands.includes(cmd)) {
    const targetLang = args.split(' ')[0];
    const text = args.slice(targetLang.length).trim();

    if (m.quoted) {
      // Handle quoted image message
      if (m.quoted.mtype === 'imageMessage') {
        try {
          const media = await m.quoted.download();
          if (!media) throw new Error('Failed to download media.');

          // Save the image locally
          const filePath = `./${Date.now()}.png`;
          await writeFile(filePath, media);

          // Perform OCR (text recognition) using Tesseract.js
          const { data: { text: extractedText } } = await Tesseract.recognize(filePath, 'eng', {
            logger: (m) => console.log(m),
          });

          // Translate the extracted text
          const result = await translate(extractedText, { to: targetLang });
          const translatedText = result[0];

          // Respond with translated text
          const responseMessage = `Translated Text in ${targetLang}:\n\n${translatedText}`;
          await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m });

          // Clean up the temporary file
          await unlink(filePath);
        } catch (error) {
          console.error("Error extracting and translating text from image:", error);
          await sock.sendMessage(m.from, { text: 'Error extracting and translating text from the image.' }, { quoted: m });
        }
      } else if (m.quoted.text) {
        // Handle quoted text message
        try {
          const quotedText = m.quoted.text;
          const result = await translate(quotedText, { to: targetLang });
          const translatedText = result[0];

          // Respond with translated text
          const responseMessage = `Translated Text in ${targetLang}:\n\n${translatedText}`;
          await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m });
        } catch (error) {
          console.error("Error translating quoted text:", error);
          await sock.sendMessage(m.from, { text: 'Error translating quoted text.' }, { quoted: m });
        }
      }
    } else if (text && targetLang) {
      // Handle text translation (when no quote is present)
      try {
        const result = await translate(text, { to: targetLang });
        const translatedText = result[0];

        // Respond with translated text
        const responseMessage = `Translated Text in ${targetLang}:\n\n${translatedText}`;
        await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m });
      } catch (error) {
        console.error("Error translating text:", error);
        await sock.sendMessage(m.from, { text: 'Error translating text.' }, { quoted: m });
      }
    } else {
      // Provide usage instructions if the command is used incorrectly
      const responseMessage = `
        *Usage Instructions:*

        1. To translate quoted text or media:
        - Reply to any image or text with the command:
          *Example:*
          /translate <target_language> <text>

        2. To translate a specific text (without quoting):
        - Example: /translate en Bonjour le monde
          (Translates "Bonjour le monde" to English)

        - Supported languages: English (en), Hindi (hi), Spanish (es), etc.

        3. To translate text from an image:
        - Simply reply to an image with the command:
          *Example:*
          /translate <target_language>
          (The bot will extract text from the image and translate it.)

        *Example command usage:*
        /translate en कैसे हो भाई
        (Translates "कैसे हो भाई" to English)
      `;
      await sock.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    }
  }
};

export default translateCommand;