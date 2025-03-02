// OBITO-MD Set Status Message Command - POWERED BY MANOJ XD

import config from "../../config.cjs";

// Main command function
const anticallCommand = async (m, Matrix) => {
  try {
    const botNumber = await Matrix.decodeJid(Matrix.user.id); // Get the bot's number
    const isCreator = [botNumber, `${config.OWNER_NUMBER}@s.whatsapp.net`].includes(m.sender); // Check if the sender is the owner
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
    const text = m.body.slice(prefix.length + cmd.length).trim(); // Extract the message text

    if (cmd === "setstatusmsg") {
      if (!isCreator) {
        // If the sender is not the bot's owner
        return await Matrix.sendMessage(m.from, { text: "*🦴 THIS IS AN OWNER COMMAND*" }, { quoted: m });
      }

      if (text) {
        // If a custom message is provided
        config.STATUS_READ_MSG = text; // Update the status message in the configuration
        await Matrix.sendMessage(
          m.from,
          { text: `✅ Custom reply message has been set to:\n"${text}"` },
          { quoted: m }
        );
      } else {
        // If no message is provided
        await Matrix.sendMessage(
          m.from,
          {
            text: `❌ Usage: *${prefix}setstatusmsg <message>*\n\nExample: *${prefix}setstatusmsg I am busy right now, call later!*`,
          },
          { quoted: m }
        );
      }
    }
  } catch (error) {
    console.error("Error processing your request:", error);
    await Matrix.sendMessage(
      m.from,
      { text: "❌ Error processing your request. Please try again later." },
      { quoted: m }
    );
  }
};

export default anticallCommand;

// POWERED BY MANOJ XD
