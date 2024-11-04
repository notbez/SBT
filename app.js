// Массив доступных SBT
const availableSBTs = [
    { id: 1, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=cd468e61-7fc8-4ae2-afd8-cf805914fb99', code: 'N1GrowthLikets', deadline: '13.11.2024 - 22:00', image: 'https://storage.onton.live/ontonimage/pOodR_1729732353611_event_image.png' },
    { id: 2, title: 'SBT #2', link: 'https://t.me/theontonbot/event?startapp=09352665-dde8-4774-8aa8-50c5f8e0fca7', code: 'HLbootcampinspb24', deadline: '15.11.2024 - 22:00', image: 'https://storage.onton.live/ontonimage/DOECh_1729106955387_event_image.png' },
    { id: 1, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=30bc7aa9-cfd6-45b1-9e57-c201b4c1fa6c', code: 'society', deadline: '31.12.2024 - 21:30', image: 'https://onton.live/template-images/default.webp' },
    { id: 2, title: 'SBT #2', link: 'https://t.me/theontonbot/event?startapp=2f45b8cb-9bd7-4bd4-acd2-4cf14f2ac5c7', code: 'Society', deadline: '31.12.2024 - 21:30', image: 'https://storage.onton.live/onton/n1XzY_1727712730856_event_image.jpeg' },
    { id: 1, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=760361c8-ad58-4fc5-9061-d0e9b5899316', code: 'Society', deadline: '31.12.2024 - 21:30', image: 'https://storage.onton.live/ontonimage/CEVNi_1728755819803_event_image.jpeg' },
    { id: 2, title: 'SBT #2', link: 'https://t.me/theontonbot/event?startapp=760361c8-ad58-4fc5-9061-d0e9b5899316', code: 'Society', deadline: '31.12.2024 - 21:30', image: 'https://storage.onton.live/ontonimage/ON48n_1729233832966_event_image.jpeg' },
    
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
            <button class="grab-btn">${listId === 'missed-sbt-list' ? "It's over" : 'Grab SBT'}</button>
        `;

        // Если SBT в списке "available", добавляем событие для кнопки
        if (listId !== 'missed-sbt-list') {
            sbtItem.querySelector('.grab-btn').addEventListener('click', () => {
                showSBTFullScreen(sbt);
            });
        }

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
            <p style="margin: 10px;">
                <strong><a href="${sbt.link}" target="_blank" rel="noopener noreferrer">Link to SBT</a></strong>
            </p>
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

    // Кнопка "Complete" для перемещения SBT в "Missed"
    sbtContainer.querySelector('.complete-btn').addEventListener('click', () => {
        onCompleteButtonClick(sbt.id);
        hideSBTFullScreen();
    });
}

// Закрытие полного экрана
function hideSBTFullScreen() {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    sbtContainer.style.display = 'none';
    sbtContainer.innerHTML = '';
}

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    document.querySelectorAll('nav button').forEach(button => {
        button.classList.toggle('active', button.id.includes(sectionId));
    });
}

// Обработка нажатия на кнопку "Complete"
function onCompleteButtonClick(sbtId) {
    const sbtIndex = availableSBTs.findIndex(sbt => sbt.id === sbtId);
    if (sbtIndex !== -1) {
        const completedSBT = availableSBTs.splice(sbtIndex, 1)[0];
        missedSBTs.push(completedSBT);

        renderSBTs('available-sbt-list', availableSBTs);
        renderSBTs('missed-sbt-list', missedSBTs);

        showSection('available');
        console.log("SBT перенесён в missed");
    }
}



// Устанавливаем начальное состояние приложения при загрузке
function init() {
    checkDeadlines();
    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', missedSBTs);
    renderSBTs('my-sbt-list', mySBTs);

    // Скрываем все секции, кроме "Available" при загрузке
    showSection('main'); 

    if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram Web App API инициализирован");
        Telegram.WebApp.ready();
    }

    document.getElementById('available-tab').addEventListener('click', () => showSection('main'));
    document.getElementById('missed-tab').addEventListener('click', () => showSection('missed'));
    document.getElementById('my-sbt-tab').addEventListener('click', () => showSection('my-sbt'));
}

document.addEventListener('DOMContentLoaded', init);