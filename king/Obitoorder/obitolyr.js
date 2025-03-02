import axios from 'axios';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent } = pkg;
import config from '../../config.cjs';

const Lyrics = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['lyrics', 'lyric'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply(
        `Hello *_${m.pushName}_,*\nHere's Example Usage:\n_${prefix}lyrics Spectre|Alan Walker_`
      );
    }

    try {
      await m.React('🕘');
      await m.reply('A moment, *OBITO-MD* is generating your lyrics request...');

      if (!text.includes('|')) {
        return m.reply(
          `Please provide the song name and artist name separated by a "|".\nExample: _Spectre|Alan Walker_`
        );
      }

      const [title, artist] = text.split('|').map(part => part.trim());

      if (!title || !artist) {
        return m.reply(
          'Both song name and artist name are required. Please provide them in the format:\n_song name|artist name_'
        );
      }

      const apiUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.lyrics) {
        const lyrics = result.lyrics;

        const lyricsMessage = `*🎵 Lyrics Found 🎵*\n\n*Title:* ${title}\n*Artist:* ${artist}\n\n${lyrics}\n\n> *©OBITO-MD by bandaheali*`;

        const msg = generateWAMessageFromContent(
          m.from,
          {
            conversation: lyricsMessage,
          },
          {}
        );

        await Matrix.relayMessage(m.from, msg.message, { messageId: msg.key.id });
        await m.React('✅');
      } else {
        throw new Error('Lyrics not found in the API response.');
      }
    } catch (error) {
      console.error('Error getting lyrics:', error.message);
      await m.reply('Sorry, no lyrics found for the requested song.');
      await m.React('❌');
    }
  }
};

export default Lyrics;