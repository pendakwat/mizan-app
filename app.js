// --- 1. STATE & TETAPAN ---
let userSettings = JSON.parse(localStorage.getItem('appSettings')) || { city: 'Bangi', offQiyam: 60, offDhuha: 30, offTidur: 120 };
document.getElementById('cityInput').value = userSettings.city;
document.getElementById('offQiyam').value = userSettings.offQiyam;
document.getElementById('offDhuha').value = userSettings.offDhuha;
document.getElementById('offTidur').value = userSettings.offTidur;

// Variable global untuk semakan kalendar Islamik
let globalDayOfWeek = new Date().getDay(); // 0(Sun) to 6(Sat)
let globalHijriMonth = 0;
let globalHijriDay = 0;

// --- 2. FUNGSI TAB & PANDUAN ---
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.getElementById(`nav-${tabName}`).classList.add('active');
    window.scrollTo(0,0);
}

function toggleGuide(guideId) {
    document.querySelector(`#guide-${guideId} .guide-body`).classList.toggle('active');
}

// --- 3. PENGURUSAN DATA (LOCALSTORAGE) ---
function loadChecklistState() {
    const savedData = JSON.parse(localStorage.getItem('amalanStateNew'));
    if (savedData) {
        amalanData.forEach(kat => {
            const savedKat = savedData.find(s => s.id === kat.id);
            if (savedKat) {
                kat.tasks.forEach(task => {
                    const savedTask = savedKat.tasks.find(st => st.id === task.id);
                    if (savedTask) task.completed = savedTask.completed;
                });
            }
        });
    }
}
loadChecklistState();

function saveChecklistState() {
    const state = amalanData.map(k => ({ id: k.id, tasks: k.tasks.map(t => ({ id: t.id, completed: t.completed })) }));
    localStorage.setItem('amalanStateNew', JSON.stringify(state));
    updateProgress();
}

window.resetChecklist = function() {
    if(confirm("Pasti mahu reset senarai amalan hari ini?")) {
        amalanData.forEach(k => k.tasks.forEach(t => t.completed = false));
        saveChecklistState(); renderAmalan(); switchTab('amalan');
    }
}

window.saveSettings = function() {
    userSettings = { city: document.getElementById('cityInput').value.trim() || 'Bangi', offQiyam: parseInt(document.getElementById('offQiyam').value) || 60, offDhuha: parseInt(document.getElementById('offDhuha').value) || 30, offTidur: parseInt(document.getElementById('offTidur').value) || 120 };
    localStorage.setItem('appSettings', JSON.stringify(userSettings));
    alert("Tetapan disimpan!"); fetchWaktuSolat();
}

// --- 4. FUNGSI MASA & API ALADHAN ---
function formatAMPM(time24) {
    let [h, m] = time24.split(':'); h = parseInt(h);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${h % 12 || 12}:${m} ${ampm}`;
}

function adjustTime(time24, minutesOffset) {
    let [h, m] = time24.split(':'); let d = new Date(); d.setHours(h, m, 0); d.setMinutes(d.getMinutes() + minutesOffset);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

async function fetchWaktuSolat() {
    try {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(userSettings.city)}&country=Malaysia&method=11`;
        const res = await fetch(url); const result = await res.json();
        const d = result.data;
        const hijri = d.date.hijri;
        
        // Kemas kini data kalendar global untuk penapisan Amal Soleh
        globalHijriMonth = parseInt(hijri.month.number);
        globalHijriDay = parseInt(hijri.day);

        // Header Tab Amalan
        const daysMy = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
        document.getElementById('hariIniTeks').innerText = daysMy[globalDayOfWeek];
        document.getElementById('tarikhTeks').innerText = `${hijri.day} ${hijri.month.en} ${hijri.year} • ${d.date.readable}`;

        renderMingguanCalendar();
        renderAmalan(); 
        
        // Tab Waktu Solat & Kalendar
        renderWaktuSolatTab(d.timings, d);
        document.getElementById('hijriDateDisplay').innerText = `${hijri.day} ${hijri.month.en} ${hijri.year}H`;
        document.getElementById('masihiDateDisplay').innerText = `${d.date.readable} | ${userSettings.city}`;
        
        let eventsHtml = `<li class="event-item"><span class="event-name">Ayyamul Bidh</span><span class="event-date">13, 14, 15 ${hijri.month.en}</span></li>`;
        if (globalHijriMonth === 1) eventsHtml += `<li class="event-item"><span class="event-name">Hari Asyura</span><span class="event-date">10 Muharram</span></li>`;
        if (globalHijriMonth === 9) eventsHtml += `<li class="event-item"><span class="event-name">Bulan Ramadan</span><span class="event-date">Sepanjang Bulan</span></li>`;
        if (globalHijriMonth === 10) eventsHtml += `<li class="event-item"><span class="event-name">Hari Raya Aidilfitri</span><span class="event-date">1 Syawal</span></li>`;
        if (globalHijriMonth === 12) {
            eventsHtml += `<li class="event-item"><span class="event-name">Hari Arafah</span><span class="event-date">9 Zulhijjah</span></li>`;
            eventsHtml += `<li class="event-item"><span class="event-name">Hari Raya Aidiladha</span><span class="event-date">10 Zulhijjah</span></li>`;
        }
        document.getElementById('islamicEvents').innerHTML = eventsHtml;
        fetchQibla(d.meta.latitude, d.meta.longitude);

    } catch (err) { console.error(err); }
}

async function fetchQibla(lat, lng) {
    try {
        const qiblaRes = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
        const qiblaData = await qiblaRes.json();
        const degree = Math.round(qiblaData.data.direction);
        document.getElementById('qiblaDegreeText').innerText = `${degree}°`;
        document.getElementById('qiblaLocationTxt').innerText = `Lokasi: ${userSettings.city}, Malaysia`;
        document.getElementById('compassIcon').style.transform = `rotate(${degree - 90}deg)`;
    } catch(e) { console.error(e); }
}

// --- 5. RENDER ANTARAMUKA TAB AMALAN ---
function renderMingguanCalendar() {
    const strip = document.getElementById('calendarStrip');
    strip.innerHTML = '';
    const today = new Date();
    const daysMy = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
    
    // Jana 7 hari (3 hari lepas, hari ini, 3 hari depan)
    for(let i = -3; i <= 3; i++) {
        let d = new Date(today);
        d.setDate(today.getDate() + i);
        let isActive = i === 0 ? 'active' : '';
        
        strip.innerHTML += `
            <div class="cal-day ${isActive}">
                <span class="cal-day-name">${daysMy[d.getDay()].substring(0,3)}</span>
                <span class="cal-day-num">${d.getDate()}</span>
            </div>
        `;
    }
}

function updateProgress() {
    let total = 0, comp = 0;
    amalanData.forEach(k => {
        let validTasks = k.tasks;
        if(k.type === 'list_dynamic') {
            validTasks = k.tasks.filter(t => isTaskValidToday(t.condition));
        }
        validTasks.forEach(t => { total++; if(t.completed) comp++; });
    });
    const pct = total === 0 ? 0 : Math.round((comp/total)*100);
    document.getElementById('progressRing').style.setProperty('--pct', pct);
    document.getElementById('progressText').innerText = pct + '%';
}

window.toggleTask = function(katId, taskId) {
    const task = amalanData.find(k => k.id === katId).tasks.find(t => t.id === taskId);
    task.completed = !task.completed; saveChecklistState(); renderAmalan();
}

function isTaskValidToday(condition) {
    if (condition === 'monday') return globalDayOfWeek === 1;
    if (condition === 'thursday') return globalDayOfWeek === 4;
    if (condition === 'asyura') return globalHijriMonth === 1 && globalHijriDay === 10;
    if (condition === 'korban') return globalHijriMonth === 12 && globalHijriDay === 10;
    return true; // Jika tiada condition
}

function renderAmalan() {
    const list = document.getElementById('amalanList'); list.innerHTML = '';
    
    amalanData.forEach(kategori => {
        
        // Tapis task untuk kategori dinamik
        let tasksToRender = kategori.tasks;
        if(kategori.type === 'list_dynamic') {
            tasksToRender = kategori.tasks.filter(t => isTaskValidToday(t.condition));
            // Sembunyikan kategori jika tiada amalan kalendar hari ini
            if(tasksToRender.length === 0) return; 
        }

        let html = '';
        let completedCount = tasksToRender.filter(t => t.completed).length;

        // --- RENDER GRID (Solat Fardu) ---
        if (kategori.type === 'grid') {
            let gridItems = '';
            tasksToRender.forEach(t => {
                const compClass = t.completed ? 'completed' : '';
                gridItems += `
                    <div class="fardu-item ${compClass}" onclick="toggleTask('${kategori.id}', '${t.id}')">
                        <div class="fardu-icon">${t.icon}</div>
                        <div class="fardu-name">${t.name}</div>
                        <div class="fardu-check">✔</div>
                    </div>
                `;
            });
            html = `<div class="fardu-grid">${gridItems}</div>`;
        } 
        
        // --- RENDER LIST (Kategori Lain) ---
        else {
            tasksToRender.forEach(t => {
                const compClass = t.completed ? 'completed' : '';
                html += `
                    <div class="list-card ${compClass}" onclick="toggleTask('${kategori.id}', '${t.id}')">
                        <div class="list-checkbox"></div>
                        <div class="list-content">
                            <div class="list-title">${t.name}</div>
                            ${t.desc ? `<div class="list-desc">${t.desc}</div>` : ''}
                        </div>
                        <div class="list-icon">${t.icon}</div>
                    </div>
                `;
            });
        }

        // Cantum Tajuk dan Kandungan
        list.innerHTML += `
            <div class="category-title">
                <span>${kategori.title}</span>
                <span class="category-count">${completedCount}/${tasksToRender.length}</span>
            </div>
            ${html}
        `;
    });
    updateProgress();
}

// --- 6. RENDER WAKTU SOLAT TAB ---
function renderWaktuSolatTab(t, dataAPI) {
    const listDiv = document.getElementById('solatList2');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    document.getElementById('solatTodayStr').innerText = `Today, ${days[new Date().getDay()]}`;
    document.getElementById('solatHijriStr').innerText = `${dataAPI.date.hijri.day} ${dataAPI.date.hijri.month.en} ${dataAPI.date.hijri.year}`;
    document.getElementById('solatLocationFooter').innerHTML = `📍 ${userSettings.city}, Malaysia`;

    const solatArr = [
        { l: 'Subuh', k: 'Fajr', icon: '🌤️' }, { l: 'Syuruk', k: 'Sunrise', icon: '🌅' },
        { l: 'Ishraq', k: 'Sunrise', icon: '🔆', offset: 15 }, { l: 'Duha', k: 'Sunrise', icon: '☀️', offset: 30 }, 
        { l: 'Zuhur', k: 'Dhuhr', icon: '☀️' }, { l: 'Asar', k: 'Asr', icon: '⛅' },
        { l: 'Maghrib', k: 'Maghrib', icon: '🌇' }, { l: 'Isyak', k: 'Isha', icon: '🌙' },
        { l: 'Qiam', k: 'Fajr', icon: '✨', offset: -userSettings.offQiyam, nextDay: true },
        { l: 'Subuh', k: 'Fajr', icon: '🌤️', nextDay: true }
    ];

    let html = '';
    solatArr.forEach(s => {
        let time24 = t[s.k];
        if (s.offset) time24 = adjustTime(time24, s.offset);
        let nextDayLabel = s.nextDay ? '<span style="font-size:0.7em; color:#8e8e93; margin-right:5px;">+1d</span>' : '';
        let bellIcon = s.nextDay || s.l === 'Ishraq' || s.l === 'Duha' || s.l === 'Syuruk' ? '🔕' : '🔔';
        html += `<div class="iman-time-row"><div class="iman-time-name"><span style="width:25px; text-align:center;">${s.icon}</span> ${s.l}</div><div class="iman-time-val">${nextDayLabel}${time24} <span style="font-size:0.8em; opacity:0.8;">${bellIcon}</span></div></div>`;
    });
    listDiv.innerHTML = html;
}

fetchWaktuSolat();