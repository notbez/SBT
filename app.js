// Данные для примера SBT
const availableSBTs = [
    {
        id: 1,
        title: "SBT #1",
        link: "https://example.com",
        code: "8#683",
        deadline: "28.10.2024",
    },
    {
        id: 2,
        title: "SBT #2",
        link: "https://example.com",
        code: "9#684",
        deadline: "30.10.2024",
    },
];

const missedSBTs = [
    {
        id: 3,
        title: "SBT #3",
        link: "https://example.com",
        code: "10#685",
        deadline: "01.10.2024",
    },
];

function checkDeadlines() {
    const currentDate = new Date();
    availableSBTs.forEach((sbt, index) => {
        const deadlineDate = new Date(
            sbt.deadline.split(".").reverse().join("-")
        );
        if (deadlineDate < currentDate) {
            missedSBTs.push(sbt);
            availableSBTs.splice(index, 1);
        }
    });
}

function renderMySBT() {
    const mySbtElement = document.getElementById("my-sbt-list");
    mySbtElement.innerHTML = '<h2 style="text-align: center;">Soon...</h2>';
}

const mySBTs = [
    {
        id: 4,
        title: "SBT #4",
        link: "https://example.com",
        code: "11#686",
        deadline: "10.10.2024",
    },
];

// Функция для отображения SBT
function renderSBTs(listId, sbtArray) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = ""; // Очищаем перед рендером

    sbtArray.forEach((sbt) => {
        const sbtItem = document.createElement("div");
        sbtItem.classList.add("sbt-item");

        sbtItem.innerHTML = `
    <h3>${sbt.title}</h3>
    <img src="${
        sbt.image
    }" alt="SBT Image" style="width: 150px; height: 150px;">
    ${
        showDetails
            ? `
        <p><strong>Link:</strong> <a href="${sbt.link}" target="_blank">${sbt.link}</a></p>
        <p><strong>Code:</strong> ${sbt.code}</p>
        <p><strong>Deadline:</strong> ${sbt.deadline}</p>
        <button class="complete-btn" data-link="${sbt.link}">COMPLETED!</button>
    `
            : ""
    }
`;

        listElement.appendChild(sbtItem);
    });
}

// Инициализация всех данных
function init() {
    checkDeadlines();
    renderSBTs("available-sbt-list", availableSBTs);
    renderSBTs("missed-sbt-list", missedSBTs);
    renderSBTs("my-sbt-list", mySBTs);
}

// Обработка переключения вкладок
document.querySelectorAll("nav ul li a").forEach((tab) => {
    tab.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("nav ul li a.active").classList.remove("active");
        tab.classList.add("active");

        // Скрываем все вкладки и показываем текущую
        document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
        const activeTab = tab.getAttribute("data-tab");
        document.getElementById(activeTab).classList.add("active");

        // Специальная логика для вкладки "My SBT"
        if (activeTab === "my-sbt") {
            renderMySBT();
        }
    });
});

// Запуск приложения
init();
