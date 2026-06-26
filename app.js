// ==========================================
// APP.JS - LOGIK UTAMA APLIKASI MIZAN V2
// ==========================================

// Kunci storage baru (V2) digunakan untuk mengelak ralat dari data versi lama
let userSettings = JSON.parse(localStorage.getItem('mizanSettingsV2')) || { city: 'Bangi', offSolat: 0 };
document.getElementById('cityInput').value = userSettings.city;
document.getElementById('offSolat').value = userSettings.offSolat;

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let appData = [];

// ==========================================
// 1. INISIALISASI & LOCAL STORAGE
// ==========================================
function loadData() {
    const saved = JSON.parse(localStorage.getItem('mizanStateV2'));
    if (saved) {
        appData = saved;
    } else {
        // senaraiMizan ditarik terus secara automatik dari fail data.js
        appData = JSON.parse(JSON.stringify(senaraiMizan)); 
    }
    renderAmalan();
}

function saveData() {
    localStorage.setItem('mizanStateV2', JSON.stringify(appData));
    updateRings();
}

// ==========================================
// 2. FUNGSI TAB
// ==========================================
window.switchTab = function(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    document.getElementById(`nav-${tab}`).classList.add('active');
    window.scrollTo(0,0);
}

// ==========================================
// 3. RENDER AMALAN & 4 RINGS
// ==========================================
function updateRings() {
    appData.forEach(kat => {
        let maxTasks = kat.max;
        let completed = kat.tasks.filter(t => t.completed).length;
        
        // Kategori Bonus tiada had maksimum tetap
        if (kat.id === 'bonus') {
            maxTasks = kat.tasks.length;
        }

        let pct = maxTasks === 0 ? 0 : Math.min(100, Math.round((completed / maxTasks) * 100));
        
        const ring = document.getElementById(kat.ring);
        if (ring) {
            ring.style.setProperty('--pct', pct);
            document.getElementById(`txt${kat.ring.substring(4)}`).innerText = `${completed}/${maxTasks}`;
        }
    });
}

window.toggleTask = function(katId, taskId) {
    const task = appData.find(k => k.id === katId).tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    saveData(); renderAmalan();
}

function renderAmalan() {
    const list = document.getElementById('amalanList'); list.innerHTML = '';
    
    appData.forEach(kat => {
        let html = '';
        kat.tasks.forEach(t => {
            const compClass = t.completed ? 'completed' : '';
            html += `
                <div class="list-card ${compClass}" onclick="toggleTask('${kat.id}', '${t.id}')">
                    <div class="list-checkbox"></div>
                    <div class="list-content">
                        <div class="list-title">${t.name}</div>
                        <div class="list-desc">${t.desc}</div>
                    </div>
                </div>
            `;
        });
        
        list.innerHTML += `
            <div class="category-title">
                <span>${kat.title}</span>
            </div>
            ${html}
        `;
    });
    updateRings();
}

window.addBonus = function() {
    const input = document.getElementById('newBonusInput');
    const val = input.value.trim();
    if(val) {
        const bonusCat = appData.find(k => k.id === 'bonus');
        bonusCat.tasks.push({ id: 'b' + Date.now(), name: val, desc: 'Amalan Tambahan', completed: false });
        input.value = '';
        saveData(); renderAmalan();
    }
}

// ==========================================
// 4. API ALADHAN (SOLAT & KIBLAT)
// ==========================================
async function fetchWaktuSolat() {
    try {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(userSettings.city)}&country=Malaysia&method=11`;
        const res = await fetch(url); const result = await res.json();
        const d = result.data;
        const hijri = d.date.hijri;
        
        const daysMy = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
        document.getElementById('hariIniTeks').innerText = daysMy[new Date().getDay()];
        document.getElementById('tarikhTeks').innerText = `${hijri.day} ${hijri.month.en} ${hijri.year}H | ${d.date.readable}`;

        const solatArr = [
            { l: 'Subuh', k: 'Fajr' }, { l: 'Zohor', k: 'Dhuhr' },
            { l: 'Asar', k: 'Asr' }, { l: 'Maghrib', k: 'Maghrib' }, { l: 'Isyak', k: 'Isha' }
        ];

        let html = '';
        solatArr.forEach(s => {
            let [h, m] = d.timings[s.k].split(':');
            let dateObj = new Date(); dateObj.setHours(parseInt(h), parseInt(m), 0);
            dateObj.setMinutes(dateObj.getMinutes() + parseInt(userSettings.offSolat));
            
            let adjH = String(dateObj.getHours()).padStart(2,'0');
            let adjM = String(dateObj.getMinutes()).padStart(2,'0');
            
            let finalH = parseInt(adjH);
            let ampm = finalH >= 12 ? 'PM' : 'AM';
            finalH = finalH % 12 || 12;
            
            html += `<div class="iman-time-row"><span>${s.l}</span><span style="font-weight:bold; color:var(--primary);">${finalH}:${adjM} ${ampm}</span></div>`;
        });
        document.getElementById('solatList2').innerHTML = html;

        const qiblaRes = await fetch(`https://api.aladhan.com/v1/qibla/${d.meta.latitude}/${d.meta.longitude}`);
        const qiblaData = await qiblaRes.json();
        const degree = Math.round(qiblaData.data.direction);
        document.getElementById('qiblaDegreeText').innerText = `${degree}°`;
        document.getElementById('compassIcon').style.transform = `rotate(${degree - 90}deg)`;

    } catch (err) { console.error("Ralat Solat API: ", err); }
}

window.saveSettings = function() {
    userSettings.city = document.getElementById('cityInput').value || 'Bangi';
    userSettings.offSolat = parseInt(document.getElementById('offSolat').value) || 0;
    localStorage.setItem('mizanSettingsV2', JSON.stringify(userSettings));
    alert("Tetapan Disimpan!"); fetchWaktuSolat();
}

// ==========================================
// 5. KALENDAR PUASA
// ==========================================
function renderCalendar(month, year) {
    const daysContainer = document.getElementById('calendarDays');
    const monthYearText = document.getElementById('calMonthYear');
    daysContainer.innerHTML = '';
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthNames = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    monthYearText.innerText = `${monthNames[month]} ${year}`;

    for(let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div class="cal-cell" style="background:transparent;"></div>`;
    }

    const today = new Date();
    for(let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        const dayOfWeek = currentDate.getDay(); 
        
        let classes = 'cal-cell';
        if (currentDate.getDate() === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            classes += ' today';
        } else if (dayOfWeek === 1 || dayOfWeek === 4) {
            classes += ' sunnah';
        }

        daysContainer.innerHTML += `<div class="${classes}">${i}</div>`;
    }
}

window.changeMonth = function(dir) {
    currentMonth += dir;
    if(currentMonth > 11) { currentMonth = 0; currentYear++; }
    else if(currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar(currentMonth, currentYear);
}

// ==========================================
// 6. ZIKIR & MODAL
// ==========================================
function renderZikirList() {
    const list = document.getElementById('zikirList');
    list.innerHTML = '';
    // zikirData ditarik secara automatik dari data.js
    zikirData.forEach((z, index) => {
        list.innerHTML += `
            <div class="zikir-cat-btn" onclick="openZikirModal(${index})">
                <span>${z.title}</span> <span style="color:var(--primary);">❯</span>
            </div>
        `;
    });
}

window.openZikirModal = function(index) {
    document.getElementById('modalTitle').innerText = zikirData[index].title;
    document.getElementById('modalBody').innerText = zikirData[index].content;
    document.getElementById('zikirModal').style.display = 'block';
}

window.closeZikirModal = function() {
    document.getElementById('zikirModal').style.display = 'none';
}

// ==========================================
// MULAKAN APLIKASI
// ==========================================
loadData();
fetchWaktuSolat();
renderCalendar(currentMonth, currentYear);
renderZikirList();
