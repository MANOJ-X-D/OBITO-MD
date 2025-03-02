import config from '../../config.cjs';

const ownerContact = async (m, gss) => {
    const ownernumber = '917005439105'; // Owner number
    const ownername = 'MANOJ XD'; // Owner name
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === 'owner') {
        try {
            // Sending contact with the owner number and name
            await gss.sendContact(m.from, [{ number: ownernumber, name: ownername }], m);
            await m.React("✅"); // React with a success checkmark
        } catch (error) {
            console.error('Error sending owner contact:', error);
            m.reply('Error sending owner contact.');
            await m.React("❌"); // React with a failure cross mark
        }
    }
};

export default ownerContact;