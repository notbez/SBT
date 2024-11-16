const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const apiToken = process.env.API_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

// Создаем бота
const bot = new TelegramBot(apiToken, { polling: true });

// Обработчик нового чата с ботом
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.text === '/start') {
        bot.sendMessage(chatId, 'Добро пожаловать! Нажмите кнопку ниже, чтобы открыть приложение.', {
            reply_markup: {
                inline_keyboard: [[{
                    text: 'Открыть SBT Manager',
                    web_app: { url: webAppUrl }
                }]]
            }
        });
    }
});