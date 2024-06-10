const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config({ path: './config.env'})
const axios = require('axios');
const schedule = require('node-schedule');

// SCRIPT DI PROVA

// configuration
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPENWEATHER_API_KEY = process.env.API_WEATHER;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

/* const job = schedule.scheduleJob('26 * * * *', function(message){
    message.send('test')
}); */

const contents = ['meteo', '!meteo', 'previsioni', 'tempo']; // conditions startsWith

client.on('messageCreate', async message => {
    const startsWithContent = contents.some(prefix => message.content.startsWith(prefix));

    if (startsWithContent) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.reply('Per favore, specifica una città.');
        }
        const city = args.slice(1).join(' ');

        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
            const weather = response.data;
            const temp = weather.main.temp;
            const description = weather.weather[0].description;

            message.reply(`Il tempo a ${city}: ${temp}°C, ${description}`);
        } catch (error) {
            message.reply('Non sono riuscito a trovare le informazioni meteo per quella città.');
        }
    }
});

client.login(DISCORD_TOKEN);