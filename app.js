// Массив доступных SBT
const availableSBTs = [
    { id: 1, title: 'SBT #1', link: 'https://example.com', code: '8#683', deadline: '2021-12-01', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 1, title: 'SBT #1', link: 'https://example.com', code: '8#683', deadline: '2021-12-01', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 1, title: 'SBT #1', link: 'https://example.com', code: '8#683', deadline: '2021-12-01', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    { id: 1, title: 'SBT #1', link: 'https://example.com', code: '8#683', deadline: '2021-12-01', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://example.com', code: '9#684', deadline: '2024-10-30', image: 'https://via.placeholder.com/150' },
    
    // добавьте остальные элементы по вашему примеру
];

// Массив пропущенных SBT
const missedSBTs = [];
const mySBTs = [];

// Проверка дедлайнов
function checkDeadlines() {
    const currentDate = new Date();
    availableSBTs.forEach((sbt, index) => {
        const sbtDeadline = new Date(sbt.deadline);
        if (sbtDeadline < currentDate) {
            missedSBTs.push(sbt);
            availableSBTs.splice(index, 1);
        }
    });
}

// Рендеринг SBT в списках
function renderSBTs(listId, sbtArray) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = '';

    sbtArray.forEach(sbt => {
        const sbtItem = document.createElement('div');
        sbtItem.classList.add('sbt-item');

        sbtItem.innerHTML = `
            <img src="${sbt.image}" alt="SBT Image">
            <button class="grab-btn">Grab SBT</button>
        `;

        // Кнопка "Grab SBT" для открытия полного экрана
        sbtItem.querySelector('.grab-btn').addEventListener('click', () => {
            showSBTFullScreen(sbt);
        });

        listElement.appendChild(sbtItem);
    });
}

// Полный экран для SBT
function showSBTFullScreen(sbt) {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    sbtContainer.style.display = 'flex';

    sbtContainer.innerHTML = `
    <div class="sbt-fullscreen-content">
        <img src="${sbt.image}" alt="SBT Image Fullscreen">
        
        <div class="sbt-info">
            <h2>Guide to obtaining SBT</h2>
            <p style="margin: 10px;"><strong>Link to SBT:</strong> <a href="${sbt.link}" target="_blank">${sbt.link}</a></p>
            <p style="margin: 10px;"><strong>Password:</strong> ${sbt.code}</p>
            <p style="margin: 10px;"><strong>Deadline:</strong> ${sbt.deadline}</p>
        </div>

        <div class="button-container">
            <button class="complete-btn">Complete</button>
            <button class="close-btn">Back to main</button>
        </div>
    </div>
`;

    // Кнопка "Close" для выхода из полного экрана
    sbtContainer.querySelector('.close-btn').addEventListener('click', hideSBTFullScreen);

    // Кнопка "COMPLETED!" для перехода по ссылке
    sbtContainer.querySelector('.complete-btn').addEventListener('click', () => {
        window.location.href = sbt.link;
    });
}

// Закрытие полного экрана
function hideSBTFullScreen() {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    sbtContainer.style.display = 'none';
    sbtContainer.innerHTML = '';
}

// Инициализация приложения
function init() {
    checkDeadlines();
    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', missedSBTs);
    renderSBTs('my-sbt-list', mySBTs);

    if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram Web App API инициализирован");
        Telegram.WebApp.ready();
    }

    document.getElementById('available-tab').addEventListener('click', () => showSection('main'));
    document.getElementById('missed-tab').addEventListener('click', () => showSection('missed'));
    document.getElementById('my-sbt-tab').addEventListener('click', () => showSection('my-sbt'));
}

// Переключение между секциями
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    document.querySelectorAll('nav button').forEach(button => {
        button.classList.toggle('active', button.id.includes(sectionId));
    });
}

document.addEventListener('DOMContentLoaded', init);