// ==========================================
// PANGKALAN DATA & STRUKTUR
// ==========================================
let userSettings = JSON.parse(localStorage.getItem('mizanSettings')) || { city: 'Bangi', offSolat: 0 };
document.getElementById('cityInput').value = userSettings.city;
document.getElementById('offSolat').value = userSettings.offSolat;

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Data Asas Mizan (Dibahagikan ikut Ring)
const senaraiMizan = [
    { 
        id: 'fardu', title: 'Solat-solat Fardu', ring: 'ringFardu', max: 5,
        tasks: [
            { id: 'f1', name: 'Solat Subuh', desc: 'Sempurnakan dalam waktu' },
            { id: 'f2', name: 'Solat Zohor', desc: 'Sempurnakan dalam waktu' },
            { id: 'f3', name: 'Solat Asar', desc: 'Sempurnakan dalam waktu' },
            { id: 'f4', name: 'Solat Maghrib', desc: 'Sempurnakan dalam waktu' },
            { id: 'f5', name: 'Solat Isyak', desc: 'Sempurnakan dalam waktu' }
        ]
    },
    { 
        id: 'sunat', title: 'Solat-solat Sunat', ring: 'ringSunat', max: 15,
        tasks: [
            { id: 's1', name: 'Solat Berjemaah', desc: 'Paling kurang 2 waktu' },
            { id: 's2', name: 'Solat di Masjid', desc: 'Paling kurang 2 waktu' },
            { id: 's3', name: 'Sunat Subuh', desc: '2 Rakaat Qabliyah' },
            { id: 's4', name: 'Sunat Dhuha', desc: '2/4/6/8 Rakaat' },
            { id: 's5', name: 'Zohor Qabliyah', desc: '2/4 Rakaat sebelum Zohor' },
            { id: 's6', name: 'Zohor Badiyah', desc: '2/4 Rakaat selepas Zohor' },
            { id: 's7', name: 'Asar Qabliyah', desc: '2/4 Rakaat sebelum Asar' },
            { id: 's8', name: 'Maghrib Qabliyah', desc: '2 Rakaat sebelum Maghrib' },
            { id: 's9', name: 'Maghrib Badiyah', desc: '2 Rakaat selepas Maghrib' },
            { id: 's10', name: 'Isyak Qabliyah', desc: '2/4 Rakaat sebelum Isyak' },
            { id: 's11', name: 'Isyak Badiyah', desc: '2/4 Rakaat selepas Isyak' },
            { id: 's12', name: 'Sunat Tahajjud', desc: '2/4/6/8 Rakaat' },
            { id: 's13', name: 'Sunat Witir', desc: 'Ganjil penutup solat' },
            { id: 's14', name: 'Sunat Tawbat', desc: 'Memohon keampunan' },
            { id: 's15', name: 'Sunat Wuduk', desc: 'Selepas mengambil wuduk' }
        ]
    },
    { 
        id: 'zikirQuran', title: 'Zikir, Wirid & Al-Quran', ring: 'ringZikir', max: 9,
        tasks: [
            { id: 'z1', name: 'Tilawah Al-Quran (Set 1)', desc: 'Sekurang-kurangnya 1 muka surat' },
            { id: 'z2', name: 'Tilawah Khatam (Set 2)', desc: 'Mengikut jadual 30 hari' },
            { id: 'z3', name: 'Wirid Selepas Subuh', desc: 'Zikir rutin selepas solat' },
            { id: 'z4', name: 'Wirid Selepas Zohor', desc: 'Zikir rutin selepas solat' },
            { id: 'z5', name: 'Wirid Selepas Asar', desc: 'Zikir rutin selepas solat' },
            { id: 'z6', name: 'Wirid Selepas Maghrib', desc: 'Zikir rutin selepas solat' },
            { id: 'z7', name: 'Wirid Selepas Isyak', desc: 'Zikir rutin selepas solat' },
            { id: 'z8', name: 'Zikir Pagi', desc: 'Dari Subuh ke Syuruq' },
            { id: 'z9', name: 'Zikir Petang & Tidur', desc: 'Dari Asar dan sebelum lelap' }
        ]
    },
    { 
        id: 'bonus', title: 'Amalan Bonus (Pilihan)', ring: 'ringBonus', max: 0,
        tasks: [
            { id: 'b1', name: 'Sedekah Harian', desc: 'Walaupun sekecil nilainya' },
            { id: 'b2', name: 'Puasa Sunat', desc: 'Isnin/Khamis atau Ayyamul Bidh' }
        ]
    }
];

const zikirData = [
    { title: 'Zikir Selepas Solat Fardu', content: '1. Istighfar (Astaghfirullah) 3x\n\n2. Allahumma antassalam, wa minkassalam, tabarakta ya dzaal jalali wal ikram.\n\n3. Ayat Kursi (Allahu la ilaha illa Huwa...)\n\n4. Subhanallah (33x)\n5. Alhamdulillah (33x)\n6. Allahu Akbar (33x)\n\n7. Lailaha illallah wahdahu la syarikalah... (1x)' },
    { title: 'Zikir Pagi & Petang', content: 'Dibaca pada waktu pagi dan petang (Al-Mathurat):\n\n1. Membaca Al-Fatihah\n2. Membaca Ayat Kursi\n3. Membaca 3 Qul (Al-Ikhlas, Al-Falaq, An-Nas) sebanyak 3 kali.\n4. Sayyidul Istighfar (Penghulu Istighfar)\n5. "Bismillahilladzi la yadhurru ma\'asmihi syai\'un fil ardhi wa la fis sama\'i wa huwas sami\'ul \'alim" (3x)' },
    { title: 'Adab Ziarah Kubur', content: '1. Mengucapkan salam kepada ahli kubur:\n"Assalamu\'alaikum ahladdiyari minal mu\'minina wal muslimin..."\n\n2. Mendoakan keampunan untuk jenazah.\n3. Tidak duduk atau memijak di atas kuburan.\n4. Merenung kematian sebagai pengajaran.' }
];

let appData = [];

// ==========================================
// INISIALISASI & LOCAL STORAGE
// ==========================================
function loadData() {
    const saved = JSON.parse(localStorage.getItem('mizanState'));
    if (saved) {
        appData = saved;
    } else {
        // Clone struktur asas
        appData = JSON.parse(JSON.stringify(senaraiMizan));
    }
    renderAmalan();
}

function saveData() {
    localStorage.setItem('mizanState', JSON.stringify(appData));
    updateRings();
}

// ==========================================
// FUNGSI TAB & UI
// ==========================================
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    document.getElementById(`nav-${tab}`).classList.add('active');
    window.scrollTo(0,0);
}

// ==========================================
// RENDER AMALAN & 4 RINGS
// ==========================================
function updateRings() {
    appData.forEach(kat => {
        let maxTasks = kat.max;
        let completed = kat.tasks.filter(t => t.completed).length;
        
        // Khas untuk kategori Bonus (tiada had maksimum)
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
// API ALADHAN (SOLAT & KIBLAT)
// ==========================================
async function fetchWaktuSolat() {
    try {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(userSettings.city)}&country=Malaysia&method=11`;
        const res = await fetch(url); const result = await res.json();
        const d = result.data;
        const hijri = d.date.hijri;
        
        // Header
        const daysMy = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
        document.getElementById('hariIniTeks').innerText = daysMy[new Date().getDay()];
        document.getElementById('tarikhTeks').innerText = `${hijri.day} ${hijri.month.en} ${hijri.year}H | ${d.date.readable}`;

        // Senarai Solat (Fardu Sahaja)
        const solatArr = [
            { l: 'Subuh', k: 'Fajr' }, { l: 'Zohor', k: 'Dhuhr' },
            { l: 'Asar', k: 'Asr' }, { l: 'Maghrib', k: 'Maghrib' }, { l: 'Isyak', k: 'Isha' }
        ];

        let html = '';
        solatArr.forEach(s => {
            // Apply adjustment
            let [h, m] = d.timings[s.k].split(':');
            let dateObj = new Date(); dateObj.setHours(parseInt(h), parseInt(m), 0);
            dateObj.setMinutes(dateObj.getMinutes() + parseInt(userSettings.offSolat));
            
            let adjH = String(dateObj.getHours()).padStart(2,'0');
            let adjM = String(dateObj.getMinutes()).padStart(2,'0');
            
            // Convert to 12h AM/PM
            let finalH = parseInt(adjH);
            let ampm = finalH >= 12 ? 'PM' : 'AM';
            finalH = finalH % 12 || 12;
            
            html += `<div class="iman-time-row"><span>${s.l}</span><span style="font-weight:bold; color:var(--primary);">${finalH}:${adjM} ${ampm}</span></div>`;
        });
        document.getElementById('solatList2').innerHTML = html;

        // Kiblat
        const qiblaRes = await fetch(`https://api.aladhan.com/v1/qibla/${d.meta.latitude}/${d.meta.longitude}`);
        const qiblaData = await qiblaRes.json();
        const degree = Math.round(qiblaData.data.direction);
        document.getElementById('qiblaDegreeText').innerText = `${degree}°`;
        document.getElementById('compassIcon').style.transform = `rotate(${degree - 90}deg)`;

    } catch (err) { console.error(err); }
}

window.saveSettings = function() {
    userSettings.city = document.getElementById('cityInput').value || 'Bangi';
    userSettings.offSolat = parseInt(document.getElementById('offSolat').value) || 0;
    localStorage.setItem('mizanSettings', JSON.stringify(userSettings));
    alert("Tetapan Disimpan!"); fetchWaktuSolat();
}

// ==========================================
// KALENDAR PUASA
// ==========================================
function renderCalendar(month, year) {
    const daysContainer = document.getElementById('calendarDays');
    const monthYearText = document.getElementById('calMonthYear');
    daysContainer.innerHTML = '';
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthNames = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    monthYearText.innerText = `${monthNames[month]} ${year}`;

    // Blank cells
    for(let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div class="cal-cell" style="background:transparent;"></div>`;
    }

    // Days
    const today = new Date();
    for(let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        const dayOfWeek = currentDate.getDay(); // 1=Isnin, 4=Khamis
        
        let classes = 'cal-cell';
        if (currentDate.getDate() === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            classes += ' today';
        } else if (dayOfWeek === 1 || dayOfWeek === 4) {
            // Highlight Puasa Isnin/Khamis (Secara kasarnya Ayyamul Bidh juga dimasukkan jika API dipanggil)
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
// ZIKIR & MODAL
// ==========================================
function renderZikirList() {
    const list = document.getElementById('zikirList');
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

// Mulakan Aplikasi
loadData();
fetchWaktuSolat();
renderCalendar(currentMonth, currentYear);
renderZikirList();

</script>