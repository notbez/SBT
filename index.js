// Подключение необходимых библиотек
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Используем токен и URL из переменных окружения
const token = process.env.BOT_TOKEN;
const sbtManagerUrl = process.env.WEB_APP_URL;

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Создаем кнопку для открытия SBT Manager
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть SBT Manager',
            url: sbtManagerUrl,
          },
        ],
      ],
    },
  };

  // Отправляем сообщение с кнопкой
  bot.sendMessage(chatId, 'Добро пожаловать в SBT Manager! Нажмите на кнопку ниже, чтобы открыть приложение.', options);
});

// Дополнительные функции и обработчики команд бота можно добавить здесь