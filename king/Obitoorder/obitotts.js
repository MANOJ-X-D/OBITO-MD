// OBITO-MD Text-to-Speech Command - POWERED BY MANOJ XD

import axios from "axios";

import config from "../../config.cjs";

const textToSpeech = async (m, gss) => {

  const prefix = config.PREFIX;

  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  const args = m.body.split(" ").slice(1).join(" ");

  const validCommands = ["tts", "texttospeech", "speak"];

  if (validCommands.includes(cmd)) {

    if (!args) {

      await gss.sendMessage(

        m.from,

        { text: "❌ Please provide some text to convert into speech.\n\nExample: *!tts <your text>*" },

        { quoted: m }

      );

      return;

    }

    const apiUrl = `https://bk9.fun/tools/tts-beast?q=${encodeURIComponent(args)}`;

    try {

      await m.React("⏳"); // React with a loading icon

      const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

      if (response.status === 200) {

        const audioBuffer = Buffer.from(response.data, "binary");

        await gss.sendMessage(

          m.from,

          {

            audio: audioBuffer,

            mimetype: "audio/mpeg",

            caption: `🔊 *Text-to-Speech Output*\n\n🎙️ Your text has been converted to speech.\n\n😍 CREATED BY MANOJ XD😍`,

          },

          { quoted: m }

        );

      } else {

        throw new Error("Failed to fetch the audio response.");

      }

    } catch (error) {

      await gss.sendMessage(

        m.from,

        { text: `❌ Error: ${error.message}` },

        { quoted: m }

      );

    }

  }

};

export default textToSpeech;

// POWERED BY MANOJ XD