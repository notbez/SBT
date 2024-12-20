const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fs = require('fs');
const schedule = require('node-schedule');
require('dotenv').config();

const apiToken = process.env.API_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const subscribersPath = './subscribers.json';
const usersFilePath = './users.json';

const bot = new TelegramBot(apiToken, { polling: true });
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));


// Убедимся, что файл с пользователями существует
function ensureUsersFile() {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
}

// Сохраняем пользователя в файл
function saveUser(chatId) {
    ensureUsersFile();
    fs.readFile(usersFilePath, (err, data) => {
        const users = err ? [] : JSON.parse(data);

        // Проверяем, есть ли пользователь в файле
        const userExists = users.some(user => user.chat_id === chatId);
        if (!userExists) {
            users.push({ chat_id: chatId });
            fs.writeFile(usersFilePath, JSON.stringify(users), () => {
                console.log(`Пользователь ${chatId} добавлен в список.`);
            });
        }
    });
}

// Команда /start
const User = require('./models/User'); // Импорт модели

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    // Сохраняем пользователя
    try {
        const existingUser = await User.findOne({ chatId });

        if (!existingUser) {
            await User.create({
                chatId: chatId,
                username: msg.from.username,
                firstName: msg.from.first_name,
                lastName: msg.from.last_name,
            });

            console.log(`User ${chatId} has been added.`);
        } else {
            console.log(`User ${chatId} already exists.`);
        }
    } catch (err) {
        console.error('Error saving user:', err);
    }

    if (msg.text === '/start') {
        bot.sendMessage(chatId, '🎅 Ho ho ho, in the Happy New Year! Click the button below to open the app.', {
            reply_markup: {
                inline_keyboard: [[{
                    text: 'Open app',
                    web_app: { url: webAppUrl }
                }]]
            }
        });
    }
});

// Команда /donation
bot.onText(/\/donation/, (msg) => {
    const chatId = msg.chat.id;

    const walletMessage = `
SBT Hunters, if you have the desire and capabilities, you can support our project with the help of a donation.

Account:
1. Wallet address - \`\`\` UQAzlM-AUy_8bfccpr02rBdYvvaC6BK15su24Lz9S1fKxX-z \`\`\`
2. Account in CryptoBot - https://t.me/send?start=IVuyJP41URXq

We will appreciate and appreciate any support from you.`;

    bot.sendMessage(chatId, walletMessage, { parse_mode: 'Markdown' });
});

// Команда /subscription
//bot.onText(/\/subscription/, (msg) => {
//    const chatId = msg.chat.id;
//
//    bot.sendMessage(chatId, 'Оплатите подписку (5 USDT):', {
//        reply_markup: {
//            inline_keyboard: [[
//                {
//                    text: 'Оплатить 5 USDT',
//                    url: `https://link.trustwallet.com/send?coin=195&address=${donationWallet}&amount=5`
//                }
//            ]]
//        }
//    });
//
//    const expiresAt = new Date();
//    expiresAt.setMonth(expiresAt.getMonth() + 1);
//
//    ensureSubscribersFile();
//    fs.readFile(subscribersPath, (err, data) => {
//        const subscribers = err ? [] : JSON.parse(data);
//
//        const existingSubscriber = subscribers.find(sub => sub.chat_id === chatId);
//        if (existingSubscriber) {
//            existingSubscriber.expires_at = expiresAt.toISOString();
//        } else {
//            subscribers.push({ chat_id: chatId, expires_at: expiresAt.toISOString() });
//        }
//
//        fs.writeFile(subscribersPath, JSON.stringify(subscribers), () => {
//            bot.sendMessage(chatId, 'Вы успешно подписались на 1 месяц.');
//        });
//    });
//});


bot.onText(/\/users/, async (msg) => {
    const adminId = 7130123407; // Замените на ваш Telegram ID

    if (msg.chat.id !== adminId) {
        return bot.sendMessage(msg.chat.id, 'У вас нет доступа к этой команде.');
    }

    try {
        const users = await User.find({});
        const userCount = users.length;

        const userList = users.map(user => 
            `ID: ${user.chatId}, Name: ${user.firstName || ''} ${user.lastName || ''}, Username: @${user.username || 'N/A'}`
        ).join('\n');

        bot.sendMessage(adminId, `Пользователей: ${userCount}\n\n${userList}`);
    } catch (err) {
        console.error('Error fetching users:', err);
        bot.sendMessage(adminId, 'Ошибка при получении списка пользователей.');
    }
});

// Уведомление подписчиков
function notifySubscribers() {
    getActiveSubscribers().then((subscribers) => {
        if (!subscribers.length) {
            console.log('Нет активных подписчиков.');
            return;
        }

        subscribers.forEach(sub => {
            bot.sendMessage(sub.chat_id, '👋 Привет! Спасибо за подписку! Вот ваши обновления.');
        });
    });
}

// Проверка активных подписчиков
function getActiveSubscribers() {
    return new Promise((resolve) => {
        ensureSubscribersFile();
        fs.readFile(subscribersPath, (err, data) => {
            const now = new Date();
            const subscribers = err ? [] : JSON.parse(data);

            const activeSubscribers = subscribers.filter(sub => new Date(sub.expires_at) > now);
            fs.writeFile(subscribersPath, JSON.stringify(activeSubscribers), () => {
                resolve(activeSubscribers);
            });
        });
    });
}

// Проверка и создание файла подписчиков
function ensureSubscribersFile() {
    if (!fs.existsSync(subscribersPath)) {
        fs.writeFileSync(subscribersPath, JSON.stringify([]));
    }
}

// Планировщик для уведомлений
schedule.scheduleJob('0 9 * * *', () => {
    console.log('Отправка уведомлений активным подписчикам.');
    notifySubscribers();
});

// Очистка истёкших подписок
schedule.scheduleJob('0 0 * * *', () => {
    console.log('Очистка просроченных подписчиков.');
    getActiveSubscribers();
});

// Веб-сервер
app.get('/', (req, res) => {
    res.send('Telegram Bot is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    notifySubscribers();
});