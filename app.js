const SBT_VERSION = "5.4"; // Увеличьте версию при добавлении SBT

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
    { id: 9, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=407d6416-d06e-4cff-af6b-f29d27e390eb', code: 'pilottp', deadline: '2024-11-24 17:00:00', image: 'https://storage.onton.live/ontonimage/4Wkhb_1732196821382_event_image.png' },
    { id: 10, title: 'SBT #1', link: 'http://t.me/theontonbot/event?startapp=b950c9c0-7c42-4439-bc67-aa6aeff9ef4f', code: 'Dogs', deadline: '2024-11-22 13:39:00', image: 'https://storage.onton.live/ontonimage/8qRQN_1732272337314_event_image.png' },
    { id: 15, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=d572d1a2-b101-4358-b802-1ab2124528f3', code: '', deadline: '2024-11-24 18:35:00', image: 'https://storage.onton.live/ontonimage/fOAVY_1732195900030_event_image.png' },
    { id: 16, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=407d6416-d06e-4cff-af6b-f29d27e390eb', code: 'pilottp', deadline: '2024-11-24 17:00:00', image: 'https://storage.onton.live/ontonimage/4Wkhb_1732196821382_event_image.png' },
    { id: 17, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=e7b4c370-0b99-4efb-a0c9-b8f5c329c11f', code: 'Tonteleportpower', deadline: '2024-11-25 20:00:00', image: 'https://storage.onton.live/ontonimage/yfpc6_1731369148092_event_image.png' },
    { id: 18, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WzEsInBvdmVsZHVyZXYiLCI2MjQwNDU4ODE2MjU1NzAiXQ==', code: 'None', deadline: '2024-12-31 19:00:00', image: 'https://static.tbook.vip/img/7d0a98145c234a5e8a803a42f1518fd2' },
    { id: 19, title: 'SBT #1', link: 'https://society.ton.org/ton-society-x-lovely-legends-sbt-campaign', code: 'None', deadline: '2024-12-31 19:00:00', image: 'https://society.ton.org/_next/image?url=https%3A%2F%2Ftonsociety.s3.eu-central-2.amazonaws.com%2Fe0ad6f05-b8a5-4984-a859-8be72e916ca8.jpg&w=828&q=75' },
    { id: 20, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WzEsInRib29rLWluY2VudGl2ZSIsIjU4NTM2NDg1ODY0ODg4Il0=', code: 'None', deadline: '2025-12-1 19:00:00', image: 'https://sun9-8.userapi.com/s/v1/ig2/w4TANEpofKvWblCzvcFwWbaJQh1-GsC46l_Hz2Ml_Rp4mnF7h4jY6agf7m-Exev9eLFZTtBQUKKlAIdG1A2gvnxz.jpg?quality=95&crop=0,0,1000,1000&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1000x1000&from=bu&u=CRE8E57nuQwYgeoiBXUwjb43_Pk3Zmh6Dk77S-9XRPQ&cs=640x640' },
    { id: 21, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WzEsInRvbnNvY2lldHkiLCI1NjEyMDgyNzc3OTE1OSJd', code: 'None', deadline: '2025-01-01 03:00:00', image: 'https://sun9-76.userapi.com/s/v1/ig2/9PI2d3lDyWyu2-juhN5mcIFQyucYaS7XlWxoD96Fl2boRHUcOGoiv2IsmvaskMOd6jwRBKGHrkkyYbAV2pKfnE8D.jpg?quality=95&crop=0,0,1280,1280&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&from=bu&u=wA4s4ZUpKZmPByy3akrHusZwjGp7oPXSbnkbuYgcGpM&cs=1080x1080' },
    { id: 22, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=74810e16-50cd-4931-a823-0060a21731a4', code: 'first_release', deadline: '2024-11-23 21:00:00', image: 'https://storage.onton.live/ontonimage/P10q0_1732296754777_event_image.png' },
    { id: 23, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=c5c5a6be-85ef-41b1-8f81-d65a484349df', code: 'jimeta', deadline: '2024-11-23 19:00:00', image: 'https://storage.onton.live/ontonimage/UBthj_1732315785209_event_image.png' },
    { id: 24, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=1d0561fa-3e57-4c20-aa60-7caaa2733cb1', code: 'DEVFEST', deadline: '2024-11-23 21:00:00', image: 'https://storage.onton.live/ontonimage/hF52I_1732195204401_event_image.png' },
    { id: 25, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=24eedd22-e194-4c2f-9ef8-da9340801e28', code: 'GMTONFAM', deadline: '2024-12-16 21:00:00', image: 'https://storage.onton.live/ontonimage/Xqkoo_1733737187844_event_image.png' },
    { id: 26, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=cac8d3f3-9fc3-4434-8372-52bcce3a9510', code: 'followdragons_on_ton', deadline: '2024-12-14 11:00:00', image: 'https://storage.onton.live/ontonimage/QzzIH_1733401673952_event_image.png' },
    { id: 27, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=ccd42fd6-9bb1-4b99-b918-4986803c0f4d', code: 'AISTICKER', deadline: '2024-12-13 02:00:00', image: 'https://storage.onton.live/ontonimage/cjFeM_1733429435529_event_image.png' },
    { id: 28, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=bebc1e48-764f-4f2a-bd5e-0ac0bb91a124', code: 'TPFuture', deadline: '2024-12-13 24:00:00', image: 'https://storage.onton.live/ontonimage/Se0FC_1733406808120_event_image.png' },
    { id: 29, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=374fc2dc-0566-468e-b775-ce9f9eaef69f', code: '1205', deadline: '2024-12-12 12:00:00', image: 'https://storage.onton.live/ontonimage/whkQa_1733158296745_event_image.png' },
    { id: 30, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=1_lambo_639759491696401', code: 'None', deadline: '2024-12-31 19:00:00', image: 'https://static.tbook.vip/img/02cc315eaee34c8fae2b003ae48b556f' },
    { id: 31, title: 'SBT #1', link: 'https://t.me/GleamRewardsBot/app?startapp=cmM9NDQ0NzM3NjI', code: 'None', deadline: '2024-12-16 23:59:599', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAhugFDAXpurQDVx5KBvwkcfGKZQ-pct3gw&s' },
    { id: 32, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=1_goalpixels_638945711692229', code: 'None', deadline: '2025-01-15 19:00:00', image: 'https://static.tbook.vip/img/8853cf58fe404ec688328109a0e984a8' },
    { id: 33, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=1_lepasa_638846191691969', code: 'None', deadline: '2025-01-15 19:00:00', image: 'https://static.tbook.vip/img/47ac6c8760d74613a01f71c5270b47ac' },
    { id: 34, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=1_ton-band_638865081692007', code: 'None', deadline: '2025-02-15 19:00:00', image: 'https://static.tbook.vip/img/1a738e921ecc42e0bc990900b3ac2e1a' },
    { id: 35, title: 'SBT #1', link: 'https://t.me/GleamRewardsBot/app?startapp=cmM9NDQ0NzM3NjI', code: 'None', deadline: '2024-12-15 23:59:59', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAhugFDAXpurQDVx5KBvwkcfGKZQ-pct3gw&s' },
    { id: 36, title: 'SBT #1', link: 'https://t.me/GleamRewardsBot/app?startapp=cmM9NDQ0NzM3NjI', code: 'None', deadline: '2024-12-13 23:59:59', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAhugFDAXpurQDVx5KBvwkcfGKZQ-pct3gw&s' },
    { id: 37, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=8d188b39-4823-45a1-abc3-f0bfad6c5074', code: 'Dogs', deadline: '2024-12-13 23:59:59', image: 'https://storage.onton.live/ontonimage/sk0A8_1733822367725_event_image.png' },
    { id: 38, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=efcdc08a-c4a4-4d07-a522-3274585586a4', code: 'Sadmeow', deadline: '2024-12-12 03:00:00', image: 'https://storage.onton.live/ontonimage/xlTes_1733911721262_event_image.png' },
    { id: 39, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WyIxIiwiZWR1M2xhYnMiLCI2NDA1MDAzNzE2OTk1MjYiXQ', code: 'non', deadline: '2025-01-08 20:00:00', image: 'https://static.tbook.vip/img/025b2d9fc49746feb6aa639cc7d35bb0' },
    { id: 40, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=837d0b95-d623-4647-bc0d-e52411227b01', code: 'TFmeetup', deadline: '2024-12-12 03:17:00', image: 'https://storage.onton.live/ontonimage/dQr4L_1733875559988_event_image.jpeg' },
    { id: 41, title: 'SBT #1', link: 'https://t.me/GleamRewardsBot/app?startapp=cmM9NDQ0NzM3NjI', code: 'none', deadline: '2024-12-16 23:59:00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAhugFDAXpurQDVx5KBvwkcfGKZQ-pct3gw&s' },
    { id: 42, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=cab66214-f031-4890-ac66-d362b1c80532', code: 'Clayton', deadline: '2024-12-13 02:29:00', image: 'https://storage.onton.live/ontonimage/szsKu_1733999707455_event_image.png' },
    { id: 43, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WyIxIiwibWlzcy1jaGFybSIsIjY0MDU0MzUzMTY5OTgwNiJd', code: 'none', deadline: '2024-01-11 05:00:00', image: 'https://static.tbook.vip/img/06283beb6dc14bd39821c794398cac2c' },
    { id: 44, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=6764ed2c-5bfb-42d0-89df-3267adcf59ec', code: 'TPineverypocket', deadline: '2024-12-19 20:00:00', image: 'https://storage.onton.live/ontonimage/KiVeZ_1734010733975_event_image.png' },
    { id: 45, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=f54d821f-ea63-488f-83a6-3b3ac21a43b7', code: 'Looftaisthebest', deadline: '2024-12-15 20:00:00', image: 'https://storage.onton.live/ontonimage/3CCxZ_1734004380673_event_image.jpeg' },
    { id: 46, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=c5fba7fe-3f41-4b98-b1f5-55405d968cd5', code: 'wonton', deadline: '2024-12-15 18:35:00', image: 'https://storage.onton.live/ontonimage/FGDuq_1734017693439_event_image.png' },
    { id: 47, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WyIxIiwiYXVyYSIsIjY0NTc3MTM1MTcyOTMyOCJd', code: 'none', deadline: '2025-27-02 19:00:00', image: 'https://static.tbook.vip/img/e036316ebf2b43b19adc140af6a24670' },
    { id: 48, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WyIxIiwidG90aGVtb28iLCI2NDQ5NTc4MDE3MjQwOTYiXQ', code: 'none', deadline: '2024-30-12 19:00:00', image: 'https://static.tbook.vip/img/ed61e5620faa414f9e6566317510d8db' },
    { id: 49, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=244322dc-bbbe-4eb8-878f-016362ed47c4', code: 'monday16start', deadline: '2024-22-12 17:00:00', image: 'https://storage.onton.live/ontonimage/GYxHq_1734356658000_event_image.png' },
    { id: 50, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=50842161-741d-477c-962f-cd84eefce2ae', code: 'Liquid_HYDRA/farmer', deadline: '2024-25-12 18:18:00', image: 'https://storage.onton.live/ontonimage/cx3u6_1734275725059_event_image.jpeg' },
    { id: 51, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=feec872b-8140-4f24-aef5-40db3f18d28d', code: 'tonfish', deadline: '2024-22-12 02:23:00', image: 'https://storage.onton.live/ontonimage/Mqqzr_1734304955574_event_image.png' },
    { id: 52, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=872b645f-df68-49a9-be1c-3da230b43313', code: 'TSBlum', deadline: '2024-18-12 18:00:00', image: 'https://storage.onton.live/ontonimage/GTVlT_1734102505609_event_image.png' },
    { id: 53, title: 'SBT #1', link: 'https://t.me/GleamRewardsBot/app?startapp=cmM9NDQ0NzM3NjI', code: 'none', deadline: '2025-02-01 00:00:00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAhugFDAXpurQDVx5KBvwkcfGKZQ-pct3gw&s' },
    { id: 54, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=0a79f2c8-39a9-4a90-84f2-fd3ae314e6f6', code: 'Toxonton', deadline: '2024-24-12 16:47:00', image: 'https://storage.onton.live/ontonimage/jZ5Ea_1734429913500_event_image.png' },
    { id: 55, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WyIxIiwidG9uLWZpc2giLCI2NDM5MTM2NDE3MTg1ODMiXQ', code: 'wonton', deadline: '2025-09-01 19:00:00', image: 'https://static.tbook.vip/img/961bbf473b4c401888a2f2946779e034' },
    { id: 56, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=1_goalpixels_638945711692229', code: 'wonton', deadline: '2025-15-01 19:00:00', image: 'https://static.tbook.vip/img/8853cf58fe404ec688328109a0e984a8' },
    { id: 42, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WyIxIiwidGJvb2staW5jZW50aXZlIiwiNjQ2NTU0NzAxNzM5MTExIl0', code: 'none', deadline: '2031-12-30 23:59:59', image: 'https://static.tbook.vip/img/4ddd7f553c984840b9507e55714c7527' },
    { id: 43, title: 'SBT #1', link: 'https://t.me/tbook_incentive_bot/tbook?startapp=WyIxIiwidGJvb2staW5jZW50aXZlIiwiNjQ2NTkzNTkxNzQwMDQxIl0', code: 'none', deadline: '2031-12-30 23:59:59', image: 'https://static.tbook.vip/img/4ddd7f553c984840b9507e55714c7527' },
    { id: 44, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=53ae79a4-e54c-4294-9a17-d346aec31066', code: 'B.appkarulez', deadline: '2024-22-12 20:00:00', image: 'https://storage.onton.live/ontonimage/sSk55_1734530228853_event_image.png' },
    { id: 45, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=9b66e543-c74a-4e15-81f1-5b8898b6093b', code: 'drops2025', deadline: '2024-20-12 18:00:00', image: 'https://storage.onton.live/ontonimage/C1qNQ_1734509835428_event_image.jpeg' },
    { id: 46, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=0cb126ab-89aa-4178-9893-36f2d60c2163', code: 'CryptoQueenOnTON', deadline: '2024-19-12 14:00:00', image: 'https://storage.onton.live/ontonimage/c5XGM_1734443980682_event_image.png' },
];

// Массив предстоящих SBT
let upcomingSBTs = [
    { id: 13, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=82594d8b-4d24-43fd-a95f-5d82544ff0b8', code: '', releaseDate: '2024-11-23 14:00:00', image: 'https://storage.onton.live/ontonimage/NwbZI_1732272584181_event_image.png' },
    { id: 14, title: 'SBT #1', link: 'https://t.me/theontonbot/event?startapp=1ed41568-c02e-406b-a153-328754065628', code: '', releaseDate: '2024-12-16 19:00:00', image: 'https://sun9-59.userapi.com/s/v1/ig2/jIp_ZVV_Z1pvpnxrB2ejscoi5Q3i_WFDtjmIDvnnDpGZJX9AsCBDzN4qcin2kOKBuklPk-0mH3abh22cJGsM6hdF.jpg?quality=95&crop=747,0,1065,1065&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1065x1065&from=bu&u=MR_7mjO2OoumM5qG9kmCL2FNbGuxOtloR5nJUIQKd8U&cs=640x640' },
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

            // Обновляем текст таймера
            countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
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

        if (listId === 'missed-sbt-list') {
            sbtItem.querySelector('.grab-btn').addEventListener('click', () => {
                showMissedSBTFullScreen(sbt);
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
            <div class="countdown" style="background-color: #373737; padding-top: 3px"></div> <!-- Элемент для обратного отсчёта -->
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

        <img src="elа.png" alt="Logo" class="el">
        <img src="${sbt.image}" alt="SBT Image Fullscreen">

        <div class="sbt-info">
            <h2>Guide to obtaining SBT</h2>
            <p style="margin: 10px; font-weight: bold; "> 
            <img src="cookie.png" alt="Logo" class="cook"> Form - 
                <a href="${sbt.link}" target="_blank" rel="noopener noreferrer">Link to SBT</a>
            </p>
            <p id="password-text" style="margin: 10px; font-weight: bold;">
            <img src="cookie.png" alt="Logo" class="cook"> Password: ${sbt.code}</p>
            <p style="margin: 10px; font-weight: bold;">
             <img src="cookie.png" alt="Logo" class="cook"> Deadline: ${sbt.deadline}</p>
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
            <div class="release"><p style="font-weight: bold;">
            <img src="cookie.png" alt="Logo" class="cook"> Release Date: ${sbt.releaseDate}</p></div>
            <div style="font-weight: bold;" class="countdown2" style="background-color: #232323" id="fullscreen-countdown"><strong>
            <img src="cookie.png" alt="Logo" class="cook"> ReLoading countdown...</div>
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

function showMissedSBTFullScreen(sbt) {
    const sbtContainer = document.getElementById('sbt-fullscreen-container');
    sbtContainer.style.display = 'flex';

    sbtContainer.innerHTML = `
    <div class="sbt-fullscreen-content">
        <img src="elа.png" alt="Logo" class="el">
        <img src="${sbt.image}" alt="SBT Image Fullscreen">

        <div class="sbt-info">
            <h2>Missed SBT Details</h2>
            <p style="margin: 10px; font-weight: bold;">
            <img src="cookie.png" alt="Logo" class="cook"> Form - 
                <a href="${sbt.link}" target="_blank" rel="noopener noreferrer">Link to SBT</a>
            </p>
            <p id="password-text" style="margin: 10px; font-weight: bold;">
             <img src="cookie.png" alt="Logo" class="cook"> Password: ${sbt.code}</p>
        </div>

        <div class="button-container">
            <button class="close-btn">Back to main</button>
        </div>
    </div>
    `;

    // Кнопка "Back to main" для выхода из полноэкранного режима
    sbtContainer.querySelector('.close-btn').addEventListener('click', hideSBTFullScreen);

    // Возможность копировать код
    const passwordElement = sbtContainer.querySelector('#password-text');
    passwordElement.addEventListener('click', () => {
        navigator.clipboard.writeText(sbt.code)
            .catch(err => {
                console.error('Failed to copy password: ', err);
            });
    });
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
    const modal = document.getElementById('confirmation-modal');
    modal.style.display = 'flex'; // Показать модальное окно

    // Ссылки на кнопки "Да" и "Отмена"
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');

    // Обработчик для кнопки "Да"
    const handleConfirmYes = () => {
        // Логика переноса SBT
        const sbtIndex = availableSBTs.findIndex(sbt => sbt.id === sbtId);
        if (sbtIndex !== -1) {
            const completedSBT = availableSBTs.splice(sbtIndex, 1)[0];
            userData.missedSBTs.push(completedSBT);
            userData.completedSBTIds.push(sbtId);

            renderSBTs('available-sbt-list', availableSBTs);
            renderSBTs('missed-sbt-list', userData.missedSBTs);

            saveUserData(); // Сохраняем изменения

            // Закрываем модальное окно
            modal.style.display = 'none';
            // Закрываем полноэкранный режим
            hideSBTFullScreen();
            // Переход на главную
            showSection('main');
        }

        // Убираем обработчики
        removeModalEventListeners();
    };

    // Обработчик для кнопки "Отмена"
    const handleConfirmNo = () => {
        // Просто закрыть модальное окно
        modal.style.display = 'none';
        // Убираем обработчики
        removeModalEventListeners();
    };

    // Функция для удаления обработчиков, чтобы избежать накопления
    const removeModalEventListeners = () => {
        confirmYes.removeEventListener('click', handleConfirmYes);
        confirmNo.removeEventListener('click', handleConfirmNo);
    };

    // Добавляем обработчики
    confirmYes.addEventListener('click', handleConfirmYes);
    confirmNo.addEventListener('click', handleConfirmNo);
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

const modal = document.getElementById('confirmation-modal');
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    // Проверяем поддержку Telegram Web App
    if (window.Telegram?.WebApp) {
        // Расширяем приложение на весь экран
        Telegram.WebApp.expand();

        // Устанавливаем тему (опционально)
        Telegram.WebApp.setBackgroundColor('#ffffff');
        Telegram.WebApp.setHeaderColor('bg_color');

        // Лог для отладки
        console.log('Telegram Web App инициализирован');
    } else {
        console.error('Telegram Web App не поддерживается');
    }
});

document.addEventListener('DOMContentLoaded', init);
