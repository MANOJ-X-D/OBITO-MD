import config from '../../config.cjs';

const invite = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['invite', 'add'];

    if (!validCommands.includes(cmd)) return;
    if (!m.isGroup) return m.reply("*🚫 THIS COMMAND CAN ONLY BE USED IN GROUPS*");

    if (!text) return m.reply(`*🦴 ENTER THE NUMBER YOU WANT TO INVITE TO THE GROUP*\n\nExample:\n*${prefix + cmd}* 923253617422`);
    if (text.includes('+')) return m.reply(`*🦴 ENTER THE NUMBER WITHOUT *+* `);
    if (isNaN(text)) return m.reply(`*🦴 ENTER ONLY THE NUMBERS PLUS YOUR COUNTRY CODE WITHOUT SPACES*`);

    const botNumber = await gss.decodeJid(gss.user.id);
    const groupMetadata = await gss.groupMetadata(m.from);
    const isBotAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = groupMetadata.participants.find(p => p.id === m.sender)?.admin;

    if (!isBotAdmin) return m.reply('*🦴 BOT MUST BE AN ADMIN TO USE THIS COMMAND*');
    if (!senderAdmin) return m.reply('*🦴 YOU MUST BE AN ADMIN TO USE THIS COMMAND*');

    const userJid = `${text}@s.whatsapp.net`;

    try {
      // Attempt to directly add the user to the group
      await gss.groupParticipantsUpdate(m.from, [userJid], 'add');
      m.reply(`*☑ USER HAS BEEN ADDED TO THE GROUP*`);
    } catch (error) {
      // If adding fails, send an invite link as a fallback
      console.warn('Direct add failed, sending invite link instead:', error.message);

      const inviteLink = 'https://chat.whatsapp.com/' + await gss.groupInviteCode(m.from);
      const inviteMessage = `≡ *GROUP INVITATION*\n\nA USER INVITES YOU TO JOIN THE GROUP "${groupMetadata.subject}".\n\nInvite Link: ${inviteLink}\n\nINVITED BY: @${m.sender.split('@')[0]}`;

      await gss.sendMessage(userJid, { text: inviteMessage, mentions: [m.sender] });
      m.reply(`*☑ AN INVITE LINK IS SENT TO THE USER*`);
    }
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default invite;
