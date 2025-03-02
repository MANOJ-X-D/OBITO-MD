import axios from 'axios';
import config from '../../config.cjs';

const weatherInfo = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.trim().split(' ').slice(1); // Extract location argument
  const location = args.join(' ');

  if (cmd === 'weather' && location) {
    try {
      const apiUrl = `https://api.giftedtech.my.id/api/search/weather?apikey=gifted&location=${encodeURIComponent(location)}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === 200 && response.data.success) {
        const weather = response.data.result;
        const weatherInfo = `
📍 *Location:* ${weather.location} (${weather.coord.lat}, ${weather.coord.lon})
🌡️ *Temperature:* ${weather.main.temp}°C (Feels like ${weather.main.feels_like}°C)
🌦️ *Condition:* ${weather.weather.main} - ${weather.weather.description}
💨 *Wind:* ${weather.wind.speed} m/s at ${weather.wind.deg}°
🌅 *Sunrise:* ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
🌇 *Sunset:* ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
📊 *Pressure:* ${weather.main.pressure} hPa | *Humidity:* ${weather.main.humidity}%
        `.trim();

        await gss.sendMessage(
          m.from,
          {
            text: `🌤️ *OBITO-MD Weather Information* 🌤️\n\n${weatherInfo}\n\n*Powered By MANOJ XD*`,
          },
          { quoted: m }
        );
      } else {
        throw new Error('Weather data not found!');
      }
    } catch (error) {
      await gss.sendMessage(
        m.from,
        {
          text: `❌ *Error fetching weather data!* \n\nMake sure the location is correct.\n\n*Powered By MANOJ XD*`,
        },
        { quoted: m }
      );
    }
  } else if (cmd === 'weather') {
    await gss.sendMessage(
      m.from,
      {
        text: `⚠️ *Usage:* ${prefix}weather <location>\n\nExample: ${prefix}weather Bandhi\n\n*Powered By MANOJ XD*`,
      },
      { quoted: m }
    );
  }
};

export default weatherInfo;

// OBITO-MD
// Powered By MANOJ XD
