import config from '../../config.cjs';

const restartBot = async (m) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix)
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
      : '';

    // Check if the command is 'restart'
    if (cmd === 'restart') {
      // Get the owner's number with the WhatsApp identifier (@s.whatsapp.net)
      const ownerNumber = `${config.OWNER_NUMBER}@s.whatsapp.net`;

      // Check if the sender is the owner (either by phone number or WhatsApp identifier)
      if (m.sender === config.OWNER_NUMBER || m.sender === ownerNumber) {
        m.reply('⏳ Processing your request...');

        // Simulate a short delay before restarting for better user feedback
        setTimeout(() => {
          process.exit(0); // Use exit code 0 for a clean restart
        }, 2000);
      } else {
        // If the sender is not the owner, deny the command and send custom message
        return m.reply('🦴 THIS IS AN OWNER COMMAND');
      }
    }
  } catch (error) {
    console.error(error);

    // React with ❌ if there's an error
    await m.react("❌");
    return m.reply(`⚠️ An error occurred while restarting the bot: ${error.message}`);
  }
};

export default restartBot;