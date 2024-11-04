// Массив доступных SBT
const availableSBTs = [
    { id: 1, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=cd468e61-7fc8-4ae2-afd8-cf805914fb99', code: 'N1GrowthLikets', deadline: '13.11.2024 - 22:00', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://t.me/theontonbot/event?startapp=09352665-dde8-4774-8aa8-50c5f8e0fca7', code: 'HLbootcampinspb24', deadline: '15.11.2024 - 22:00', image: 'https://via.placeholder.com/150' },
    { id: 1, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=30bc7aa9-cfd6-45b1-9e57-c201b4c1fa6c', code: 'society', deadline: '31.12.2024 - 21:30', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://t.me/theontonbot/event?startapp=2f45b8cb-9bd7-4bd4-acd2-4cf14f2ac5c7', code: 'Society', deadline: '31.12.2024 - 21:30', image: 'https://via.placeholder.com/150' },
    { id: 1, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=760361c8-ad58-4fc5-9061-d0e9b5899316', code: 'Society', deadline: '31.12.2024 - 21:30', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'SBT #2', link: 'https://t.me/theontonbot/event?startapp=760361c8-ad58-4fc5-9061-d0e9b5899316', code: 'Society', deadline: '31.12.2024 - 21:30', image: 'https://via.placeholder.com/150' },
    
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
            <img src="