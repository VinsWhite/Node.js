const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config({ path: './config.env'})
const axios = require('axios');
const schedule = require('node-schedule');

// SCRIPT DI PROVA

// configuration
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPENWEATHER_API_KEY = process.env.API_WEATHER;
const CHANNEL_ID = process.env.CHANNEL_ID;

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

const job = schedule.scheduleJob('0 8 * * *', function() {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
        
        (async () => {
            try {
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=catania&appid=${OPENWEATHER_API_KEY}&units=metric`);
                const weatherDescription = response.data.weather[0].description;
                const temperature = response.data.main.temp;
                channel.send(`Buongiorno! Oggi il tempo a Catania è ${weatherDescription} con una temperatura di ${temperature}°C.`);
            } catch (error) {
                console.log(error);
            }
        })();
    } else {
        console.log('Channel not found');
    }
});

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
            let description = weather.weather[0].description;

            const translations = {
                'clear sky': 'cielo sereno',
                'few clouds': 'parizialmente nuvoloso',
                'scattered clouds': 'nubi sparse',
                'broken clouds': 'nuvoloso',
                'overcast clouds': 'cielo coperto',
                'mist': 'nebbia',
                'fog': 'foschia',
                'light rain': 'pioggia leggera',
                'moderate rain': 'pioggia moderata',
                'heavy rain': 'pioggia forte',
                'light snow': 'neve leggera',
                'moderate snow': 'neve moderata',
                'heavy snow': 'neve forte',
                'thunderstorm': 'temporale',
                'drizzle': 'pioggerella',
                'haze': 'foschia'
            };

            for (const [key, value] of Object.entries(translations)) {
                if (description.includes(key)) {
                    description = description.replace(key, value);
                    break; 
                }
            }
            

            message.reply(`Il tempo a ${city}: ${temp}°C, ${description}`);
        } catch (error) {
            message.reply('Non sono riuscito a trovare le informazioni meteo per quella città.');
        }
    }
});

client.login(DISCORD_TOKEN);