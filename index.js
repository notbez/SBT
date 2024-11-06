const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    inline_keyboard: [[{
      text: 'Открыть SBT Manager',
      web_app: { url: WEB_APP_URL }
    }]]
  };

  bot.sendMessage(chatId, 'Нажми кнопку ниже для доступа к SBT Manager', {
    reply_markup: keyboard
  });
});