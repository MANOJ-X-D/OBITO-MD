import axios from 'axios';
import config from '../../config.cjs';

const instagramVideoDownloader = async (message, client) => {
  const prefix = config.PREFIX; // Bot prefix from configuration
  const command = message.body.startsWith(prefix)
    ? message.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : '';
  let args = message.body.slice(prefix.length + command.length).trim();

  const validCommands = ["insta", "instagram", "igdl"];
  if (validCommands.includes(command)) {
    if (!args) {
      return client.sendMessage(message.from, {
        text: `Please provide an Instagram video URL. Example usage: ${prefix}${command} <Instagram URL>`
      });
    }

    // Validate Instagram URL
    if (!/^https?:\/\/(www\.)?instagram\.com\/.*$/.test(args)) {
      return client.sendMessage(message.from, {
        text: "Invalid Instagram URL. Please provide a valid Instagram video link."
      });
    }

    try {
      // Inform the user that the bot is processing
      await client.sendMessage(message.from, { text: "*Fetching the video, please wait...*" });

      // Fetch the video from the API
      const apiEndpoint = `https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(args)}`;
      const response = await axios.get(apiEndpoint);

      if (response.status === 200 && response.data?.status) {
        const videoData = response.data.data?.[0]; // Extract the first video object
        if (videoData?.url) {
          // Send the video back to the user
          await client.sendMessage(message.from, {
            video: { url: videoData.url },
            caption: "*DOWNLOADED BY OBITO-MD*"
          });
        } else {
          throw new Error("Video URL not found in API response.");
        }
      } else {
        throw new Error(response.data?.message || "API returned an error.");
      }
    } catch (error) {
      console.error("Error downloading Instagram video:", error);
      await client.sendMessage(message.from, {
        text: "*Oops! Something went wrong while downloading the video. Please try again later.*"
      });
    }
  }
};

export default instagramVideoDownloader;
