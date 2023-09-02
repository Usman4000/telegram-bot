const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const TOKEN = '6613150129:AAE0R_coAlfQzS-3BZgigW6jTrRZo0aaKwo';
const WEATHER_API = '9b6160d7b951deeb903132c5ec1eb520';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const userInput = msg.text;

	const result = await getTemperatureByCity(userInput, chatId);
	if (result) {
		const message = `Weather Temperature in ${userInput} is : ${Math.round(result)}`;

		bot.sendMessage(chatId, message);
	}
});

async function getTemperatureByCity(cityName, chatId) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API}`;

	try {
		const response = await axios.get(apiUrl);
		const temperatureInKelvin = response.data.main.temp;
		const temperatureInCelsius = temperatureInKelvin - 273.15; // Convert to Celsius

		return temperatureInCelsius;
	} catch (error) {
		bot.sendMessage(chatId, 'City Does not exist');
	}
}
