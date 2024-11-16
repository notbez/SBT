const TelegramBot = require('node-telegram-bot-api');

// Токен бота
const BOT_TOKEN = '7982544171:AAHwRRUebX2gy7Y43n6hI2CIsgAk4TMgq5w';
const WEB_APP_URL = 'https://notbez.github.io/SBT/';

// Создаем бота
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Обработчик нового чата с ботом
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Проверяем, что это первое сообщение (например, приветствие)
    if (msg.text === '/start') {
        bot.sendMessage(chatId, 'Добро пожаловать! Нажмите кнопку ниже, чтобы открыть приложение.', {
            reply_markup: {
                inline_keyboard: [[{
                    text: 'Открыть SBT Manager',
                    web_app: { url: WEB_APP_URL }
                }]]
            }
        });
    }
});