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
        bot.sendMessage(chatId, 'Добро пожаловать! xn.', {
            reply_markup: {
                inline_keyboard: [[{
                    text: 'Открыть SBT Manager',
                    web_app: { url: webAppUrl }
                }]]
            }
        });
    }
});

// Создаем веб-сервер (для Render)
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Telegram Bot is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});