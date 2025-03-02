import { writeFile } from 'fs/promises';
import dotenv from 'dotenv';
import path from 'path';

// Load the .env file
dotenv.config();

const setprefixCommand = async (m, Matrix) => {
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const isCreator = [botNumber, process.env.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = process.env.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === 'setprefix') {
        if (!isCreator) {
            await Matrix.sendMessage(m.from, { text: "*🦴 THIS IS AN OWNER COMMAND*" }, { quoted: m });
            return;
        }

        if (text) {
            // Change the prefix in the .env file
            try {
                const envPath = path.resolve(__dirname, '../../.env'); // Path to your .env file
                const envFileContent = await fs.promises.readFile(envPath, 'utf-8');
                const updatedEnvContent = envFileContent.replace(/PREFIX=[^ \n]+/, `PREFIX=${text}`);

                // Write the updated .env file
                await writeFile(envPath, updatedEnvContent, 'utf-8');
                
                // Update the process environment variable for the current session
                process.env.PREFIX = text;

                m.reply(`Prefix has been successfully changed to '${text}'.`);
            } catch (error) {
                console.error('Error updating .env file:', error);
                m.reply('Failed to update the prefix in the .env file.');
            }
        } else {
            m.reply("Please specify a new prefix.");
        }
    }
};

export default setprefixCommand;