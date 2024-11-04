const axios = require('axios');

// Токен бота, который ты получил от BotFather
const BOT_TOKEN = '7982544171:AAHwRRUebX2gy7Y43n6hI2CIsgAk4TMgq5w'; 

// Массив с ID пользователей, которым нужно отправить сообщение
const USER_IDS = ['865178331', '1322759567', '7130123407']; 

// Ссылка на твоё приложение
const WEB_APP_URL = 'https://notbez.github.io/SBT/';

// Функция для отправки сообщения с кнопкой Web App
function sendWebAppButton(chatId) {
    axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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

// Отправляем сообщение всем пользователям из массива USER_IDS
USER_IDS.forEach(userId => {
    sendWebAppButton(userId);
});

