// Массив доступных SBT
const availableSBTs = [
    { id: 1, title: 'SBT #1', link: 'https://example.com', code: '8#683', deadline: '2021-12-01', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2023-10-30', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2023-10-30', image: 'https://via.placeholder.com/150' },
    { id: 6, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 7, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2023-10-30', image: 'https://via.placeholder.com/150' },
    { id: 8, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 9, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 10, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2023-10-30', image: 'https://via.placeholder.com/150' },
    { id: 11, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 12, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
];

// Массив пропущенных SBT
const missedSBTs = [];

// Массив для вкладки "My SBT"
const mySBTs = [];

// Функция проверки дедлайнов и перемещения просроченных SBT
function checkDeadlines() {
    const currentDate = new Date();
    availableSBTs.forEach((sbt, index) => {
        const sbtDeadline = new Date(sbt.deadline);
        if (sbtDeadline < currentDate) {
            missedSBTs.push(sbt);
            availableSBTs.splice(index, 1);  // Удаляем SBT из доступных после перемещения в пропущенные
        }
    });
}

// Функция рендеринга SBT на странице
function renderSBTs(listId, sbtArray, showDetails = false) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = '';  // Очищаем перед рендером

    sbtArray.forEach(sbt => {
        const sbtItem = document.createElement('div');
        sbtItem.classList.add('sbt-item');

        let content = `
            <img src="${sbt.image}" alt="SBT Image">
            ${showDetails ? '' : '<button class="grab-btn">Grab SBT</button>'}  <!-- Кнопка пропадает при детализации -->
        `;

        // Добавляем детальную информацию о SBT, если требуется
        if (showDetails) {
            content += `
                <p><strong>Link:</strong> <a href="${sbt.link}" target="_blank">${sbt.link}</a></p>
                <p><strong>Code:</strong> ${sbt.code}</p>
                <p><strong>Deadline:</strong> ${sbt.deadline}</p>
                <button class="complete-btn" data-link="${sbt.link}">COMPLETED!</button>
                <button id="back-btn" class="back-btn">Back to Main</button>
            `;
        }

        sbtItem.innerHTML = content;

        // Добавляем обработчик для кнопки "COMPLETED!"
        if (showDetails) {
            sbtItem.querySelector('.complete-btn').addEventListener('click', function() {
                const targetLink = this.getAttribute('data-link');
                if (targetLink) {
                    window.location.href = targetLink;  // Перенаправляем пользователя по ссылке
                }
            });

            // Обработчик для кнопки "Back to Main"
            sbtItem.querySelector('.back-btn').addEventListener('click', function() {
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

// Инициализация приложения
function init() {
    // Проверяем дедлайны и обновляем массивы
    checkDeadlines();

    // Рендерим доступные и пропущенные SBT
    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', missedSBTs);

    // Рендерим вкладку "My SBT"
    renderSBTs('my-sbt-list', mySBTs);

    // Инициализация Telegram WebApp API
    if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram Web App API инициализирован");
        Telegram.WebApp.ready();
    }

    // Обработчики для вкладок
    document.getElementById('available-tab').addEventListener('click', function() {
        showSection('main');
    });

    document.getElementById('missed-tab').addEventListener('click', function() {
        showSection('missed');
    });

    document.getElementById('my-sbt-tab').addEventListener('click', function() {
        showSection('my-sbt');
    });
}

// Функция переключения секций
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    document.querySelectorAll('nav button').forEach(button => {
        button.classList.toggle('active', button.id.includes(sectionId));
    });
}

// Запускаем приложение после загрузки DOM
document.addEventListener('DOMContentLoaded', init);