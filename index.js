const axios = require('axios');

const BOT_TOKEN = '7982544171:AAHwRRUebX2gy7Y43n6hI2CIsgAk4TMgq5w';
const WEB_APP_URL = 'https://notbez.github.io/SBT/';

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Отправляем сообщение с кнопкой Web App любому, кто отправит команду /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, 'Открыть SBT Manager', {
        reply_markup: {
            inline_keyboard: [[{
                text: 'Открыть SBT Manager',
                web_app: { url: WEB_APP_URL }
            }]]
        }
    });
});

console.log('Бот запущен и готов принимать команды');