const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

// Токен бота
const BOT_TOKEN = '7982544171:AAHwRRUebX2gy7Y43n6hI2CIsgAk4TMgq5w'; 

// Ссылка на Web App
const WEB_APP_URL = 'https://notbez.github.io/SBT/';

const app = express();
app.use(bodyParser.json());

// Функция для отправки сообщения с кнопкой Web App
function sendWebAppButton(chatId) {
    axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: 'Добро пожаловать! Откройте SBT Manager с помощью кнопки ниже.',
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

// Маршрут для обработки webhook Telegram
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
    const { message } = req.body;

    if (message && message.text === '/start') {
        const chatId = message.chat.id;
        sendWebAppButton(chatId);
    }

    res.sendStatus(200);
});

// Устанавливаем Webhook
function setWebhook() {
    const url = `https://<https://notbez.github.io/SBT/>/bot${BOT_TOKEN}`;
    axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, { url })
        .then(response => {
            console.log('Webhook установлен:', response.data);
        })
        .catch(error => {
            console.error('Ошибка установки webhook:', error);
        });
}

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    setWebhook();
});