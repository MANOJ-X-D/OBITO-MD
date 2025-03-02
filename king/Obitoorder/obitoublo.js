import config from '../../config.cjs';

const blockUnblock = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['block', 'unblock'];

    if (!validCommands.includes(cmd)) return;

    if (!isCreator) return m.reply("*🦴< THIS IS AN OWNER COMMAND*");

    let userToBlockUnblock;

    // Check if a number or mention is provided after the command
    if (text) {
      userToBlockUnblock = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Clean up the number and append domain
    } else {
      // If no number is provided, check for mentioned users or quoted message sender
      userToBlockUnblock = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
    }

    // If no user is provided, return a helpful message
    if (!userToBlockUnblock) {
      return m.reply("Please provide a valid number or mention the user to block/unblock.");
    }

    // Perform block or unblock based on the command
    if (cmd === 'block') {
      await gss.updateBlockStatus(userToBlockUnblock, 'block')
        .then(() => m.reply(`Blocked ${userToBlockUnblock.split('@')[0]} successfully.`))
        .catch((err) => m.reply(`Failed to block user: ${err}`));
    } else if (cmd === 'unblock') {
      await gss.updateBlockStatus(userToBlockUnblock, 'unblock')
        .then(() => m.reply(`Unblocked ${userToBlockUnblock.split('@')[0]} successfully.`))
        .catch((err) => m.reply(`Failed to unblock user: ${err}`));
    }
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    // Prevent generic error message if there are no issues in processing
    if (m.body.startsWith(config.PREFIX) && m.body.split(' ').length === 1) {
      return m.reply("You must provide a valid number or mention the user after the command.");
    } else {
      m.reply('An error occurred while processing the command.');
    }
  }
};

export default blockUnblock;
