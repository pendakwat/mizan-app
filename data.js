// ==========================================
// DATA.JS - PANGKALAN DATA APLIKASI MIZAN
// ==========================================

// 1. DATA AMALAN HARIAN (CHECKLIST)
const senaraiMizan = [
    { 
        id: 'fardu', 
        title: 'Solat-solat Fardu', 
        ring: 'ringFardu', 
        max: 5,
        tasks: [
            { id: 'f1', name: 'Solat Subuh', desc: 'Solat fardu Subuh dalam waktu' },
            { id: 'f2', name: 'Solat Zohor', desc: 'Solat fardu Zohor dalam waktu' },
            { id: 'f3', name: 'Solat Asar', desc: 'Solat fardu Asar dalam waktu' },
            { id: 'f4', name: 'Solat Maghrib', desc: 'Solat fardu Maghrib dalam waktu' },
            { id: 'f5', name: 'Solat Isyak', desc: 'Solat fardu Isyak dalam waktu' }
        ]
    },
    { 
        id: 'sunat', 
        title: 'Solat-solat Sunat', 
        ring: 'ringSunat', 
        max: 15,
        tasks: [
            { id: 's1', name: 'Solat Berjemaah', desc: 'Bonus jika paling kurang 2/5 set' },
            { id: 's2', name: 'Solat di Masjid', desc: 'Bonus jika paling kurang 2/5 set' },
            { id: 's3', name: 'Sunat Subuh', desc: '2 Rakaat sebelum Subuh' },
            { id: 's4', name: 'Sunat Dhuha', desc: '2 / 4 / 6 / 8 rakaat (Bonus min 2/4 set)' },
            { id: 's5', name: 'Sunat Zohor Qabliyah', desc: '2 / 4 rakaat (Bonus min 2/2 set)' },
            { id: 's6', name: 'Sunat Zohor Badiyah', desc: '2 / 4 rakaat (Bonus min 2/2 set)' },
            { id: 's7', name: 'Sunat Asar Qabliyah', desc: '2 / 4 rakaat (Bonus min 2/2 set)' },
            { id: 's8', name: 'Sunat Maghrib Qabliyah', desc: '2 rakaat sebelum Maghrib' },
            { id: 's9', name: 'Sunat Maghrib Badiyah', desc: '2 rakaat selepas Maghrib' },
            { id: 's10', name: 'Sunat Isyak Qabliyah', desc: '2 / 4 rakaat (Bonus min 2/2 set)' },
            { id: 's11', name: 'Sunat Isyak Badiyah', desc: '2 / 4 rakaat (Bonus min 2/2 set)' },
            { id: 's12', name: 'Sunat Tahajjud', desc: '2 / 4 / 6 / 8 rakaat (Bonus min 2/4 set)' },
            { id: 's13', name: 'Sunat Witir', desc: 'Solat ganjil penutup solat malam' },
            { id: 's14', name: 'Sunat Tawbat', desc: 'Memohon keampunan dari Allah' },
            { id: 's15', name: 'Sunat Wuduk', desc: 'Selepas menyempurnakan wuduk' }
        ]
    },
    { 
        id: 'zikirQuran', 
        title: 'Zikir, Wirid & Al-Quran', 
        ring: 'ringZikir', 
        max: 10,
        tasks: [
            { id: 'zq1', name: 'Tilawah Al-Quran (Set 1)', desc: 'Baca sekurang-kurangnya 1 muka surat' },
            { id: 'zq2', name: 'Tilawah Khatam (Set 2)', desc: 'Baca mengikut target khatam bulanan' },
            { id: 'zq3', name: 'Wirid Solat Subuh', desc: 'Selesai solat fardu Subuh' },
            { id: 'zq4', name: 'Wirid Solat Zohor', desc: 'Selesai solat fardu Zohor' },
            { id: 'zq5', name: 'Wirid Solat Asar', desc: 'Selesai solat fardu Asar' },
            { id: 'zq6', name: 'Wirid Solat Maghrib', desc: 'Selesai solat fardu Maghrib' },
            { id: 'zq7', name: 'Wirid Solat Isyak', desc: 'Selesai solat fardu Isyak' },
            { id: 'zq8', name: 'Zikir Pagi', desc: 'Waktu Subuh hingga Syuruq' },
            { id: 'zq9', name: 'Zikir Petang', desc: 'Waktu Asar hingga Maghrib' },
            { id: 'zq10', name: 'Zikir Tidur', desc: 'Sebelum melelapkan mata' }
        ]
    },
    { 
        id: 'bonus', 
        title: 'Amalan Bonus (Pilihan)', 
        ring: 'ringBonus', 
        max: 0,
        tasks: [
            { id: 'b1', name: 'Sedekah', desc: 'Berkongsi rezeki walaupun sedikit' },
            { id: 'b2', name: 'Ziarah Orang Sakit', desc: 'Melawat dan mendoakan pesakit' },
            { id: 'b3', name: 'Mengikuti Jenazah', desc: 'Solat jenazah & mengiringi ke kubur' },
            { id: 'b4', name: 'Solat Musafir', desc: 'Solat sebelum memulakan perjalanan' },
            { id: 'b5', name: 'Solat Hajat', desc: 'Memohon hajat khusus kepada Allah' },
            { id: 'b6', name: 'Solat Gerhana', desc: 'Khusuf / Kusuf (Apabila berlaku)' },
            { id: 'b7', name: 'Solat Hari Raya', desc: 'Solat sunat Aidilfitri / Aidiladha' },
            { id: 'b8', name: 'Puasa Sunat', desc: 'Hari Putih / Isnin / Khamis / Syawal / Asyura / Zulhijjah / Syaaban' }
        ]
    }
];


// 2. DATA ZIKIR & ADAB (PANDUAN BACAAN)
const zikirData = [
    { 
        title: 'a. Zikir Selepas Solat Fardu', 
        content: `1. Istighfar (3 kali):
"Astaghfirullahal 'azim alladzi la ilaha illa huwal hayyul qayyum wa atubu ilaih."

2. Selawat dan Salam:
"Allahumma antassalam, wa minkassalam, tabarakta ya dzaal jalali wal ikram."

3. Ayat Kursi:
"Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-'ard. Man dhal-ladzi yasyfa'u 'indahu illa bi-idhnih. Ya'lamu ma baina aidihim wa ma khalfahum, wa la yuhituna bi syai'im-min 'ilmihi illa bima sya'a. Wasi'a kursiyuhus-samawati wal ard, wa la ya'uduhu hifzhuhuma wa Huwal 'Aliyyul-'Azhim."

4. Tasbih: Subhanallah (33x)
5. Tahmid: Alhamdulillah (33x)
6. Takbir: Allahu Akbar (33x)

7. Penutup (Genap ke-100):
"La ilaha illallah wahdahu la syarikalah, lahul mulku walahul hamdu yuhyi wayumitu wahuwa 'ala kulli syai'in qadir."` 
    },
    { 
        title: 'b. Zikir Pagi & Petang', 
        content: `Zikir Ringkas Harian:

1. Istighfar (100 kali):
"Astaghfirullah wa atubu ilaih."

2. Tahlil (10 atau 100 kali):
"La ilaha illallah wahdahu la syarikalah, lahul mulku walahul hamdu wa huwa 'ala kulli syai'in qadir."

3. Zikir Pelindung (3 kali):
"Bismillahilladzi la yadhurru ma'asmihi syai'un fil ardhi wa la fis sama'i wa huwas sami'ul 'alim."

4. Sayyidul Istighfar:
"Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udzubika min syarri ma sana'tu, abu'u laka bini'matika 'alayya wa abu'u bidzanbi faghfirli fa innahu la yaghfirudz dzunuba illa anta."` 
    },
    { 
        title: 'c. Zikir-zikir Pelbagai', 
        content: `Zikir Keluar Rumah:
"Bismillahi, tawakkaltu 'alallah, la hawla wa la quwwata illa billah."
(Dengan nama Allah, aku bertawakkal kepada Allah, tiada daya dan kekuatan melainkan dengan pertolongan Allah)

Zikir Masuk Rumah:
"Bismillahi walajna, wa bismillahi kharajna, wa 'ala rabbina tawakkalna."
(Kemudian beri salam kepada ahli rumah).

Zikir / Doa Makan:
"Allahumma barik lana fima razaqtana wa qina 'adzabannar."
(Ya Allah, berkatilah rezeki yang Engkau kurniakan kepada kami dan peliharalah kami dari azab api neraka).` 
    },
    { 
        title: 'd. Adab-adab (Ziarah & Kubur)', 
        content: `Adab Ziarah (Umum & Pesakit):
1. Niat ikhlas kerana Allah Taala.
2. Memilih waktu yang sesuai agar tidak mengganggu pesakit atau tuan rumah.
3. Tidak memanjangkan waktu ziarah tanpa keperluan.
4. Mendoakan pesakit:
"As'alullahal 'azim rabbal 'arsyil 'azim an yasyfiyak." (7 kali)
(Aku memohon kepada Allah Yang Maha Agung, Tuhan Arasy yang agung, agar menyembuhkanmu).

Adab Ziarah Kubur:
1. Mengucapkan salam kepada penghuni kubur sebaik tiba: 
"Assalamu'alaikum ahladdiyari minal mu'minina wal muslimin, wa inna insya-Allahu bikum lahiqun."
2. Membaca doa memohon keampunan dan kerahmatan untuk jenazah.
3. Menjaga adab; tidak duduk, melangkah, atau memijak di atas kuburan.
4. Mengambil iktibar dan merenung tentang kematian.` 
    }
];

// Pembolehubah untuk menyimpan status (state) pengguna
let appData = [];