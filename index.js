import TelegramBot from 'node-telegram-bot-api';
import { post } from 'axios';

// Токен бота, который ты получил от BotFather
const BOT_TOKEN = '7982544171:AAHwRRUebX2gy7Y43n6hI2CIsgAk4TMgq5w';

// Создаем экземпляр бота с помощью токена
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Ссылка на твое веб-приложение
const WEB_APP_URL = 'https://notbez.github.io/SBT/';

// Функция для отправки сообщения с кнопкой Web App
function sendWebAppButton(chatId) {
    post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: 'Открыть SBT Manager',
        reply_markup: {
            inline_keyboard: [[{
                text: 'Открыть SBT Manager',
                web_app: { url: WEB_APP_URL }
            }]]
        }
    })
    .then(response => {
        console.log('Сообщение отправлено:', response.data);
    })
    .catch(error => {
        console.error('Ошибка при отправке сообщения:', error);
    });
}

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Отправляем сообщение с кнопкой Web App
    sendWebAppButton(chatId);

    // Приветственное сообщение
    bot.sendMessage(chatId, 'Привет! Я твой бот. Нажми на кнопку ниже, чтобы открыть SBT Manager.');
});