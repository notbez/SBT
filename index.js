// index.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Указываем, что все статические файлы (HTML, CSS, JavaScript) находятся в папке 'public'
app.use(express.static(path.join(__dirname, 'miniao')));

// Обработчик главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'miniao', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});