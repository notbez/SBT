const axios = require('axios');

// Токен бота, который ты получил от BotFather
const BOT_TOKEN = '7982544171:AAHwRRUebX2gy7Y43n6hI2CIsgAk4TMgq5w'; 

// ID пользователя или чата, куда отправить сообщение
const CHAT_ID = '1322759567'; 

// Ссылка на твоё приложение (например, с GitHub Pages)
const WEB_APP_URL = 'https://notbez.github.io/SBT/';

// Функция для отправки сообщения с кнопкой Web App
function sendWebAppButton() {
    axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: 'Открыть SBT Manager',
        reply_markup: {
            inline_keyboard: [[{
                text: 'Открыть SBT Manager',
                web_app: { url: WEB_APP_URL } // Ваша ссылка на miniapp
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

// Вызов функции для отправки сообщения
sendWebAppButton();