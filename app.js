// Массив доступных SBT
const availableSBTs = [
];

// Массив предстоящих SBT
const upcomingSBTs = [
    { id: 100, title: 'Upcoming SBT #1', link: 'https://example.com/upcoming1', code: 'UpcomingCode1', releaseDate: '2024-12-01 22:00:00', image: 'https://storage.onton.live/onton/n1XzY_1727712730856_event_image.jpeg' },
    { id: 101, title: 'Upcoming SBT #1', link: 'https://example.com/upcoming1', code: 'UpcomingCode1', releaseDate: '2024-12-01 22:00:00', image: 'https://storage.onton.live/onton/n1XzY_1727712730856_event_image.jpeg' },
    { id: 101, title: 'Upcoming SBT #1', link: 'https://example.com/upcoming1', code: 'UpcomingCode1', releaseDate: '2024-12-01 22:00:00', image: 'https://storage.onton.live/onton/n1XzY_1727712730856_event_image.jpeg' },
    { id: 101, title: 'Upcoming SBT #1', link: 'https://example.com/upcoming1', code: 'UpcomingCode1', releaseDate: '2024-12-01 22:00:00', image: 'https://storage.onton.live/onton/n1XzY_1727712730856_event_image.jpeg' },
];

// Массив пропущенных SBT
const missedSBTs = [];
const mySBTs = [];

// Сохранение данных в Local Storage
function saveSBTData() {
    localStorage.setItem('availableSBTs', JSON.stringify(availableSBTs));
    localStorage.setItem('missedSBTs', JSON.stringify(missedSBTs));
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

// Загрузка данных из Local Storage при запуске
function loadSBTData() {
    const savedAvailableSBTs = localStorage.getItem('availableSBTs');
    const savedMissedSBTs = localStorage.getItem('missedSBTs');
    console.log('Raw missedSBTs from Local Storage:', savedMissedSBTs); // Сырые данные

    if (savedAvailableSBTs) {
        const parsedAvailableSBTs = JSON.parse(savedAvailableSBTs);
        if (Array.isArray(parsedAvailableSBTs)) {
            availableSBTs.splice(0, availableSBTs.length, ...parsedAvailableSBTs);
        }
    }

    if (savedMissedSBTs) {
        const parsedMissedSBTs = JSON.parse(savedMissedSBTs);
        if (Array.isArray(parsedMissedSBTs)) {
            missedSBTs.splice(0, missedSBTs.length, ...parsedMissedSBTs);
        }
    }
    console.log('Loaded missedSBTs:', missedSBTs);

    console.log('availableSBTs after deadline check:', availableSBTs);
    console.log('missedSBTs after deadline check:', missedSBTs);


}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

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
    console.log('Updated availableSBTs:', availableSBTs); // После перемещения
    console.log('Updated missedSBTs:', missedSBTs);

    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', missedSBTs)

    console.log('availableSBTs after deadline check:', availableSBTs);
    console.log('missedSBTs after deadline check:', missedSBTs);
    saveSBTData();
}


console.log('availableSBTs after deadline check:', availableSBTs);
console.log('missedSBTs after deadline check:', missedSBTs);

function checkUpcomingReleases() {
    const currentDate = new Date();
    upcomingSBTs.forEach((sbt, index) => {
        const releaseDate = new Date(sbt.releaseDate);
        if (releaseDate <= currentDate) {
            availableSBTs.push(sbt);
            upcomingSBTs.splice(index, 1);
        }
    });
}

function startCountdown(releaseDate, countdownElement, sbtId) {
    if (!countdownElement) {
        console.error('countdownElement is not found for SBT ID:', sbtId);
        return;
    }

    function updateCountdown() {
        const now = new Date();
        const distance = new Date(releaseDate) - now;

        if (distance <= 0) {
            countdownElement.innerText = "Available now!";
            clearInterval(interval);

            // Перемещаем SBT в "Available" после истечения времени
            moveToAvailable(sbtId);
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Обновляем первый раз сразу
}

function moveToAvailable(sbtId) {
    const index = upcomingSBTs.findIndex(sbt => sbt.id === sbtId);
    if (index !== -1) {
        const sbt = upcomingSBTs.splice(index, 1)[0];
        availableSBTs.push(sbt);
        
        // Сохранение изменений
        saveSBTData();
        
        // Перерисовка вкладок
        renderSBTs('available-sbt-list', availableSBTs);
        renderUpcomingSBTs(); // Обновляем список upcoming для удаления истекшего SBT
    }
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

// Рендеринг SBT в списках
function renderSBTs(listId, sbtArray) {
    console.log(`Rendering SBTs for ${listId}:`, sbtArray); // Лог для проверки данных
    const listElement = document.getElementById(listId);
    listElement.innerHTML = '';

    sbtArray.forEach(sbt => {
        const sbtItem = document.createElement('div');
        sbtItem.classList.add('sbt-item');

        const isMissedTab = listId === 'missed-sbt-list';
        const isUpcomingTab = listId === 'upcoming-sbt-list';

        sbtItem.innerHTML = `
    <img src="${sbt.image}" alt="SBT Image" class="${isMissedTab || isUpcomingTab ? 'blur' : ''}">
    <button class="grab-btn">${isMissedTab ? "Expired" : 'Take SBT'}</button>
`;
        // Если SBT не пропущенный, добавляем обработчики
        if (!isMissedTab) {
            sbtItem.querySelector('.grab-btn').addEventListener('click', () => {
                showSBTFullScreen(sbt);
            });
        }

        listElement.appendChild(sbtItem);
    });
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

function renderUpcomingSBTs() {
    const listElement = document.getElementById('upcoming-sbt-list');
    listElement.innerHTML = '';

    upcomingSBTs.forEach(sbt => {
        const sbtItem = document.createElement('div');
        sbtItem.classList.add('sbt-item');

        sbtItem.innerHTML = `
            <img src="${sbt.image}" alt="SBT Image" class="blur">
            <div class="countdown"></div> <!-- Элемент для обратного отсчёта -->
            <button class="grab-btn">Watch</button>
        `;

        const countdownElement = sbtItem.querySelector('.countdown');
        startCountdown(sbt.releaseDate, countdownElement, sbt.id);

        sbtItem.querySelector('.grab-btn').addEventListener('click', () => {
            showUpcomingSBTFullScreen(sbt);
        });

        listElement.appendChild(sbtItem);
    });
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

// Обработчик нажатия на аппаратную кнопку "Назад"
window.addEventListener("popstate", () => {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    if (sbtContainer.style.display === 'flex') {
        hideSBTFullScreen(); // Закрыть полноэкранный режим, если он открыт
    } else {
        showSection('main'); // Вернуться к разделу "Available", если полноэкранный режим уже закрыт
    }
});

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

// Полный экран для SBT
function showSBTFullScreen(sbt) {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    sbtContainer.style.display = 'flex';

    // Добавляем запись в историю при открытии полноэкранного режима
    history.pushState(null, null, location.href);

    sbtContainer.innerHTML = `
    <div class="sbt-fullscreen-content">
        <img src="${sbt.image}" alt="SBT Image Fullscreen">
        
        <div class="sbt-info">
            <h2>Guide to obtaining SBT</h2>
            <p style="margin: 10px;">
                <a href="${sbt.link}" target="_blank" rel="noopener noreferrer">Link to SBT</a>
            </p>
            <p style="margin: 10px;">Password: ${sbt.code}</p>
            <p style="margin: 10px;">Deadline: ${sbt.deadline}</p>
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

function showUpcomingSBTFullScreen(sbt) {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    sbtContainer.style.display = 'flex';

    sbtContainer.innerHTML = `
    <div class="sbt-fullscreen-content">
        <img src="${sbt.image}" alt="SBT Image Fullscreen" class="blur">
        
        <div class="sbt-info">
            <h2>Upcoming SBT</h2>
            <div class="release"><p><strong>Release Date:</strong> ${sbt.releaseDate}</p></div>
            <div class="countdown2" id="fullscreen-countdown"><strong>ReLoading countdown...</div>
        </div>

        <div class="button-container">
            <button class="close-btn">Back to main</button>
        </div>
    </div>
    `;

    sbtContainer.querySelector('.close-btn').addEventListener('click', hideSBTFullScreen);

    const countdownElement = sbtContainer.querySelector('#fullscreen-countdown');
    startCountdown(sbt.releaseDate, countdownElement);
}

// Закрытие полного экрана
function hideSBTFullScreen() {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    sbtContainer.style.display = 'none';
    sbtContainer.innerHTML = '';

    // Удаляем последнюю запись из истории, чтобы избежать дополнительного нажатия "Назад"
    history.back();
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    document.querySelectorAll('nav button').forEach(button => {
        button.classList.toggle('active', button.id.includes(sectionId));
    });

    if (sectionId === 'main') {
        renderSBTs('available-sbt-list', availableSBTs);
    } else if (sectionId === 'missed') {
        renderSBTs('missed-sbt-list', missedSBTs);
    } else if (sectionId === 'upcoming') {
        renderUpcomingSBTs();
    }
}

// Обработка нажатия на кнопку "Complete"
function onCompleteButtonClick(sbtId) {
    const sbtIndex = availableSBTs.findIndex(sbt => sbt.id === sbtId);
    if (sbtIndex !== -1) {
        const completedSBT = availableSBTs.splice(sbtIndex, 1)[0];
        missedSBTs.push(completedSBT);

        // Перерисовываем список доступных и пропущенных SBT
        renderSBTs('available-sbt-list', availableSBTs);
        renderSBTs('missed-sbt-list', missedSBTs);

        saveSBTData(); // Сохраняем изменения в Local Storage

        // Принудительно переключаемся и возвращаемся на вкладку available
        showSection('main'); // Переход на вкладку `main` (где находятся доступные SBT)

        console.log("SBT перенесён в missed");
        console.log('availableSBTs after deadline check:', availableSBTs);
        console.log('missedSBTs after deadline check:', missedSBTs);


    }
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

// Добавляем обработку свайпа
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;

    if (touchEndX - touchStartX > 50) {
        backToMain();
    }
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

document.body.addEventListener('touchstart', handleTouchStart);
document.body.addEventListener('touchend', handleTouchEnd);

// Добавляем обработку аппаратной кнопки "Назад"
window.addEventListener("popstate", () => {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    if (sbtContainer.style.display === 'flex') {
        hideSBTFullScreen();
    } else {
        backToMain();
    }
});

function backToMain() {
    showSection('main');
}

renderSBTs('available-sbt-list', availableSBTs);
renderSBTs('missed-sbt-list', missedSBTs);
renderUpcomingSBTs();

// Далее идут ваши функции init() и другие
function init() {
    console.log('Initializing application...');
    
    // Сбрасываем устаревшие данные (опционально, если хотите начать с нуля)
    // localStorage.removeItem('availableSBTs');
    // localStorage.removeItem('missedSBTs');
    
    // Загружаем данные
    loadSBTData();
    console.log('Initial missedSBTs:', missedSBTs);
    console.log('Initial availableSBTs:', availableSBTs);

    // Проверяем дедлайны и обновляем статус
    checkDeadlines();
    checkUpcomingReleases();

    // Рендерим вкладки
    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', missedSBTs);
    renderUpcomingSBTs();

    // Убедитесь, что Telegram WebApp готов
    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.ready();
    
        // Получаем параметры, переданные через Telegram WebApp
        const initData = Telegram.WebApp.initData;
        console.log('Telegram WebApp Init Data:', initData);
    }

    // Настраиваем переключение вкладок
    document.getElementById('available-tab').addEventListener('click', () => showSection('main'));
    document.getElementById('missed-tab').addEventListener('click', () => showSection('missed'));
    document.getElementById('upcoming-tab').addEventListener('click', () => showSection('upcoming'));

    // Показ основной секции по умолчанию
    showSection('main');
}
document.addEventListener('DOMContentLoaded', init);