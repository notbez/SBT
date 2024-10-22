// Данные для примера SBT
const availableSBTs = [
    { id: 1, title: 'SBT #1', link: 'https://example.com', code: '8#683', deadline: '28.10.2026', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '31.01.2026', image: 'https://via.placeholder.com/150' },
];

const missedSBTs = [];
const mySBTs = [];

// Проверка дедлайнов и перенос просроченных SBT
function checkDeadlines() {
    const currentDate = new Date();
    availableSBTs.forEach((sbt, index) => {
        const deadlineDate = new Date(sbt.deadline.split('.').reverse().join('-'));
        if (deadlineDate < currentDate) {
            missedSBTs.push(sbt);
            availableSBTs.splice(index, 1);  // Удаляем из доступных SBT
        }
    });
}

// Функция для отображения SBT
function renderSBTs(listId, sbtArray, showDetails = false) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = '';  // Очищаем перед рендером

    sbtArray.forEach(sbt => {
        const sbtItem = document.createElement('div');
        sbtItem.classList.add('sbt-item');

        let content = `
            <h3>${sbt.title}</h3>
            <img src="${sbt.image}" alt="SBT Image" style="width: 150px; height: 150px;">
        `;

        if (showDetails) {
            content += `
                <p><strong>Link:</strong> <a href="${sbt.link}" target="_blank">${sbt.link}</a></p>
                <p><strong>Code:</strong> ${sbt.code}</p>
                <p><strong>Deadline:</strong> ${sbt.deadline}</p>
                <button class="complete-btn" data-link="${sbt.link}">COMPLETED!</button>
                <button id="back-btn" class="complete-btn" style="background-color: gray;">Back to Main</button>
            `;
        }

        sbtItem.innerHTML = content;

        // Добавляем обработчик для кнопки "COMPLETED!"
        if (showDetails) {
            sbtItem.querySelector('.complete-btn').addEventListener('click', function() {
                const targetLink = this.getAttribute('data-link');
                if (targetLink) {
                    window.location.href = targetLink;
                }
            });

            // Обработчик для кнопки "Back to Main"
            document.getElementById('back-btn').addEventListener('click', function() {
                renderSBTs('available-sbt-list', availableSBTs);  // Возврат к списку SBT
            });
        }

        // Добавляем обработчик для открытия детальной информации о SBT
        if (!showDetails) {
            sbtItem.addEventListener('click', function() {
                renderSBTs(listId, [sbt], true);  // Показ деталей при клике
            });
        }

        listElement.appendChild(sbtItem);
    });
}

// Инициализация всех данных
function init() {
    checkDeadlines();  // Переносим истекшие SBT
    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', missedSBTs);
    renderSBTs('my-sbt-list', mySBTs);
}

// Изменение вкладки "My SBT"
function renderMySBT() {
    const mySbtElement = document.getElementById('my-sbt-list');
    mySbtElement.innerHTML = '<h2 style="text-align: center;">Soon...</h2>';
}

// Обработка переключения вкладок
document.querySelectorAll('nav ul li a').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('nav ul li a.active').classList.remove('active');
        tab.classList.add('active');
        
        // Скрываем все вкладки и показываем текущую
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        const activeTab = tab.getAttribute('data-tab');
        document.getElementById(activeTab).classList.add('active');

        // Специальная логика для вкладки "My SBT"
        if (activeTab === 'my-sbt') {
            renderMySBT();
        }
    });
});

// Запуск приложения
init();