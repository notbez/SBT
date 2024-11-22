const SBT_VERSION = "2.2"; // Увеличьте версию при добавлении SBT

// Данные пользователя
let userData = {
    missedSBTs: [],
    completedSBTIds: [], // Массив ID уже забранных SBT
};

// Массив доступных SBT
let availableSBTs = [
    { id: 6, title: 'SBT #1', link: 'https://t.me/tonton_intract_bot?startapp=vt1ib8', code: 'None', deadline: 'None', image: 'https://sun9-10.userapi.com/s/v1/ig2/v7uSYoNLaG_SkNdkeQU5dsTDco5VWwXgotvMaQpzQiv3KW-8dli80s88rtW9QYpUHPjAc3gsmzRaaEcbd8yp2jK3.jpg?quality=95&crop=0,0,1220,1179&as=32x31,48x46,72x70,108x104,160x155,240x232,360x348,480x464,540x522,640x618,720x696,1080x1044,1220x1179&from=bu&u=nTQVxyFFKpw9MKF0p66mYPQQSGUlusD6Ts6Uk517Xnw&cs=1080x1044' },
    { id: 7, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=f4d54156-686e-40e7-8216-769d19615256', code: 'Rode', deadline: '2024-11-22 13:39:00', image: 'https://storage.onton.live/ontonimage/fuQye_1732189451511_event_image.png' },
    { id: 8, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=04f370f1-15fc-4637-9450-3109817a0161', code: 'tonhk', deadline: '2024-11-22 13:39:00', image: 'https://storage.onton.live/ontonimage/fuQye_1732189451511_event_image.png' },
    { id: 9, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=407d6416-d06e-4cff-af6b-f29d27e390eb', code: 'pilottp', deadline: '2024-11-22 13:39:00', image: 'https://storage.onton.live/ontonimage/4Wkhb_1732196821382_event_image.png' },

];

// Массив предстоящих SBT
let upcomingSBTs = [
    { id: 101, title: 'Upcoming SBT #1', link: 'https://example.com/upcoming1', code: 'UpcomingCode1', releaseDate: '2024-12-01 22:00:00', image: 'https://storage.onton.live/onton/n1XzY_1727712730856_event_image.jpeg' },
    { id: 102, title: 'Upcoming SBT #1', link: 'https://example.com/upcoming1', code: 'UpcomingCode1', releaseDate: '2024-12-01 22:00:00', image: 'https://storage.onton.live/onton/n1XzY_1727712730856_event_image.jpeg' },
];

// Массив пропущенных SBT
let missedSBTs = []
let mySBTs = [];

// Сохранение данных в Local Storage
const saveSBTData = () => {
    console.log('Функция loadSBTData вызвана'); // Отладочный вывод
    const data = {
        version: SBT_VERSION,
        availableSBTs,
        missedSBTs,
        upcomingSBTs
    };
    localStorage.setItem('sbtData', JSON.stringify(data));
}


const loadSBTData = () => {
    const savedData = localStorage.getItem('sbtData');

    if (savedData) {
        const parsedSbtData = JSON.parse(savedData);

        if (parsedSbtData.version === SBT_VERSION) {
            // Убираем из доступных уже завершённые или пропущенные
            availableSBTs = parsedSbtData.availableSBTs.filter(sbt => 
                !userData.completedSBTIds.includes(sbt.id) && 
                !userData.missedSBTs.some(missedSBT => missedSBT.id === sbt.id)
            );

            missedSBTs = parsedSbtData.missedSBTs || [];
            upcomingSBTs = parsedSbtData.upcomingSBTs || [];
        }
    }

    saveSBTData(); // Если версия не совпадает или данных нет, сохраняем обновленные массивы
}

const saveUserData = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
}

const loadUserData = () => {
    const savedUserData = localStorage.getItem('userData');
    const savedSbtData = localStorage.getItem('sbtData');

    if (savedUserData) {
        userData = JSON.parse(savedUserData);
    }

    if (savedSbtData) {
        const parsedSbtData = JSON.parse(savedSbtData);

        // Если версия совпадает, оставляем старые данные, иначе обновляем
        if (parsedSbtData.version === SBT_VERSION) {
            availableSBTs = parsedSbtData.availableSBTs;
        } else {
            // Новая версия — сохраняем обновленные данные
            saveSBTData();
        }
    } else {
        // Если данных нет, сохраняем текущие данные
        saveSBTData();
    }

    // Убираем из доступных SBT те, которые пользователь уже забрал
    availableSBTs = availableSBTs.filter(sbt => !userData.completedSBTIds.includes(sbt.id));
}

// Проверка дедлайнов
function checkDeadlines() {
    const currentDate = new Date();

    // Фильтруем SBT с истекшим дедлайном
    availableSBTs = availableSBTs.filter((sbt) => {
        const sbtDeadline = new Date(sbt.deadline);

        if (sbtDeadline < currentDate) {
            // Проверяем, был ли этот SBT уже забран или пропущен
            const alreadyMissed = userData.missedSBTs.some(missed => missed.id === sbt.id);
            const alreadyCompleted = userData.completedSBTIds.includes(sbt.id);

            if (!alreadyMissed && !alreadyCompleted) {
                userData.missedSBTs.push(sbt); // Перемещаем в missed
            }

            return false; // Убираем из availableSBTs
        }

        return true; // Оставляем в availableSBTs
    });

    saveSBTData();  // Сохраняем изменения в данных SBT
    saveUserData(); // Сохраняем пользовательские данные

    // Обновляем отображение списков
    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', userData.missedSBTs);
}

function checkUpcomingReleases() {
    const currentDate = new Date();
    upcomingSBTs = upcomingSBTs.filter((sbt) => {
        const releaseDate = new Date(sbt.releaseDate);
        if (releaseDate <= currentDate) {
            availableSBTs.push(sbt);
            return false; // Убираем из upcoming
        }
        return true;
    });

    saveSBTData(); // Сохраняем изменения
    renderSBTs('available-sbt-list', availableSBTs);
    renderUpcomingSBTs(); // Обновляем список upcoming
}

// Таймер обратного отсчета
function startCountdown(releaseDate, countdownElement, sbtId) {
    function updateCountdown() {
        const now = new Date();
        const distance = new Date(releaseDate) - now;

        if (distance <= 0) {
            countdownElement.innerText = "Available now!";
            clearInterval(interval);

            // Перемещаем SBT в "Available"
            moveToAvailable(sbtId);
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Первое обновление сразу
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

// Рендеринг SBT в списках
function renderSBTs(listId, sbtArray) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = ''; // Очистка текущего списка

    sbtArray.forEach(sbt => {
        const sbtItem = document.createElement('div');
        sbtItem.classList.add('sbt-item');

        sbtItem.innerHTML = `
            <img src="${sbt.image}" alt="SBT Image">
            <button class="grab-btn">${listId === 'missed-sbt-list' ? 'Expired' : 'Take SBT'}</button>
        `;

        // Если это не список пропущенных SBT
        if (listId !== 'missed-sbt-list') {
            sbtItem.querySelector('.grab-btn').addEventListener('click', () => {
                showSBTFullScreen(sbt);
            });
        }

        listElement.appendChild(sbtItem);
    });
}



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


// Обработчик нажатия на аппаратную кнопку "Назад"
window.addEventListener("popstate", () => {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    if (sbtContainer.style.display === 'flex') {
        hideSBTFullScreen(); // Закрыть полноэкранный режим, если он открыт
    } else {
        showSection('main'); // Вернуться к разделу "Available", если полноэкранный режим уже закрыт
    }
});

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
            <p id="password-text" style="margin: 10px;">Password: ${sbt.code}</p>
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

    const passwordElement = sbtContainer.querySelector('#password-text');
    passwordElement.addEventListener('click', () => {
        navigator.clipboard.writeText(sbt.code)
            .catch(err => {
                console.error('Failed to copy password: ', err);
            });
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


function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    document.querySelectorAll('nav button').forEach(button => {
        button.classList.toggle('active', button.id.includes(sectionId));
    });

    // Рендеринг для каждой вкладки
    if (sectionId === 'main') {
        renderSBTs('available-sbt-list', availableSBTs);
    } else if (sectionId === 'missed') {
        renderSBTs('missed-sbt-list', userData.missedSBTs); // Используйте missedSBTs из userData
    } else if (sectionId === 'upcoming') {
        renderUpcomingSBTs();
    }
}

// Обработка нажатия на кнопку "Complete"
function onCompleteButtonClick(sbtId) {
    const sbtIndex = availableSBTs.findIndex(sbt => sbt.id === sbtId);
    if (sbtIndex !== -1) {
        // Перемещаем SBT в массив missedSBTs
        const completedSBT = availableSBTs.splice(sbtIndex, 1)[0];
        userData.missedSBTs.push(completedSBT);
        userData.completedSBTIds.push(sbtId); // Добавляем ID в завершённые

        // Перерисовываем списки
        renderSBTs('available-sbt-list', availableSBTs);
        renderSBTs('missed-sbt-list', userData.missedSBTs);

        saveUserData(); // Сохраняем изменения пользователя
        showSection('main'); // Возвращаемся на главную
    }
}

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
    loadUserData(); // Восстанавливаем пользовательские данные
    loadSBTData();  // Восстанавливаем данные о доступных SBT

    checkDeadlines(); // Проверяем дедлайны SBT
    checkUpcomingReleases(); // Проверяем предстоящие релизы

    renderSBTs('available-sbt-list', availableSBTs);
    renderSBTs('missed-sbt-list', userData.missedSBTs); // Убедитесь, что missedSBTs правильно рендерятся
    renderUpcomingSBTs();

    // Настройка вкладок
    document.getElementById('available-tab').addEventListener('click', () => showSection('main'));
    document.getElementById('missed-tab').addEventListener('click', () => showSection('missed'));
    document.getElementById('upcoming-tab').addEventListener('click', () => showSection('upcoming'));

    showSection('main'); // Отображаем список доступных SBT
}

document.addEventListener('DOMContentLoaded', init);