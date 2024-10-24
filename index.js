const axios = require('axios');

// Токен бота, который ты получил от BotFather
const BOT_TOKEN = 'ТВОЙ_БОТ_ТОКЕН'; 

// Массив с ID пользователей, которым нужно отправить сообщение
const USER_IDS = ['865178331', '1322759567']; 

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