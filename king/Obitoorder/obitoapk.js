import axios from "axios";
import { createRequire } from "module";

// Import config.cjs using createRequire
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const apkDownloadCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const validCommands = ["apk", "appdownload"];

  if (validCommands.includes(cmd)) {
    // Extract the package name from the command (e.g., "!apk <package_id>")
    const packageId = m.body.split(" ")[1];

    if (!packageId) {
      await gss.sendMessage(
        m.from,
        { text: "❌ Please provide a valid package name after the command." },
        { quoted: m }
      );
      return;
    }

    const apiUrl = `https://www.dark-yasiya-api.site/download/apk?id=${encodeURIComponent(packageId)}`;
    await m.React('⏳');
    try {
      // Fetch data from API
      const response = await axios.get(apiUrl);
      const apiData = response.data;

      if (apiData.status && apiData.result) {
        const app = apiData.result;

        // Send APK download details
        await gss.sendMessage(
          m.from,
          {
            text: `*📱 App Name*: ${app.name}\n*📅 Last Update*: ${app.lastUpdate}\n*📦 Package ID*: ${app.package}\n*📏 Size*: ${app.size}\n\n🔗 [Download APK Here](${app.dl_link})\n\n🕹️ Enjoy!`,
            caption: app.image,
          },
          { quoted: m }
        );
        await m.React('✅'); 
      } else {
        await gss.sendMessage(
          m.from,
          { text: "❌ Failed to fetch app details. Please check the package name or try again later." },
          { quoted: m }
        );
      }
    } catch (error) {
      console.error("APK Download Command Error:", error);
      await gss.sendMessage(
        m.from,
        { text: "❌ An error occurred while processing the APK download command. Please try again later." },
        { quoted: m }
      );
    }
  }
};

export default apkDownloadCommand;

// POWERED BY MANOJ XD
