// Struktur Senarai Amalan Berdasarkan Permintaan Baharu
const senaraiAmalanAsas = [
    { 
        id: 'fardu', title: 'Solat Fardu', type: 'grid', 
        tasks: [
            { id: 'f1', name: 'Subuh', icon: '🌤️', completed: false },
            { id: 'f2', name: 'Zohor', icon: '☀️', completed: false },
            { id: 'f3', name: 'Asar', icon: '⛅', completed: false },
            { id: 'f4', name: 'Maghrib', icon: '🌇', completed: false },
            { id: 'f5', name: 'Isyak', icon: '🌙', completed: false }
        ]
    },
    { 
        id: 'sunat', title: 'Solat Sunat', type: 'list', 
        tasks: [
            { id: 'su1', name: 'Sunat Subuh', desc: 'Rakaat sebelum Subuh', icon: '🕋', completed: false },
            { id: 'su2', name: 'Sunat Dhuha', desc: '2 / 4 / 6 / 8 rakaat', icon: '☀️', completed: false },
            { id: 'su3', name: 'Sunat Zohor Qabliyah', desc: '2 / 4 rakaat', icon: '🕋', completed: false },
            { id: 'su4', name: 'Sunat Zohor Badiyah', desc: '2 / 4 rakaat', icon: '🕋', completed: false },
            { id: 'su5', name: 'Sunat Asar Qabliyah', desc: '2 / 4 rakaat', icon: '🕋', completed: false },
            { id: 'su6', name: 'Sunat Maghrib Qabliyah', desc: '2 rakaat', icon: '🕋', completed: false },
            { id: 'su7', name: 'Sunat Maghrib Badiyah', desc: '2 rakaat', icon: '🕋', completed: false },
            { id: 'su8', name: 'Sunat Isyak Qabliyah', desc: '2 / 4 rakaat', icon: '🕋', completed: false },
            { id: 'su9', name: 'Sunat Isyak Badiyah', desc: '2 / 4 rakaat', icon: '🕋', completed: false },
            { id: 'su10', name: 'Sunat Witir', desc: 'Penutup solat malam', icon: '✨', completed: false },
            { id: 'su11', name: 'Sunat Tahajjud', desc: '2 / 4 / 6 / 8 rakaat', icon: '🌙', completed: false }
        ]
    },
    { 
        id: 'wirid', title: 'Wirid Solat Fardu', type: 'list', 
        tasks: [
            { id: 'w1', name: 'Wirid Solat Subuh', desc: '', icon: '📿', completed: false },
            { id: 'w2', name: 'Wirid Solat Zohor', desc: '', icon: '📿', completed: false },
            { id: 'w3', name: 'Wirid Solat Asar', desc: '', icon: '📿', completed: false },
            { id: 'w4', name: 'Wirid Solat Maghrib', desc: '', icon: '📿', completed: false },
            { id: 'w5', name: 'Wirid Solat Isyak', desc: '', icon: '📿', completed: false }
        ]
    },
    { 
        id: 'zikir', title: 'Zikir-zikir', type: 'list', 
        tasks: [
            { id: 'z1', name: 'Zikir Pagi', desc: 'Waktu Subuh hingga Syuruq', icon: '🌅', completed: false },
            { id: 'z2', name: 'Zikir Petang', desc: 'Waktu Asar hingga Maghrib', icon: '🌇', completed: false },
            { id: 'z3', name: 'Zikir Tidur', desc: 'Sebelum melelapkan mata', icon: '🛌', completed: false }
        ]
    },
    { 
        id: 'amal_kalendar', title: 'Amal Soleh (Ikut Tarikh)', type: 'list_dynamic', 
        tasks: [
            { id: 'ak1', name: 'Puasa Isnin', desc: 'Puasa Sunat hari Isnin', icon: '🍽️', condition: 'monday', completed: false },
            { id: 'ak2', name: 'Puasa Khamis', desc: 'Puasa Sunat hari Khamis', icon: '🍽️', condition: 'thursday', completed: false },
            { id: 'ak3', name: 'Puasa Asyura', desc: '10 Muharram', icon: '🍽️', condition: 'asyura', completed: false },
            { id: 'ak4', name: 'Ibadah Korban', desc: '10 Zulhijjah', icon: '🐪', condition: 'korban', completed: false }
        ]
    },
    { 
        id: 'amal_harian', title: 'Amal Soleh Harian', type: 'list', 
        tasks: [
            { id: 'ah1', name: 'Sedekah', desc: 'Walaupun sedikit', icon: '💰', completed: false },
            { id: 'ah2', name: 'Ziarah Orang Sakit', desc: 'Mengeratkan silaturrahim', icon: '🤝', completed: false }
        ]
    }
];

let amalanData = JSON.parse(JSON.stringify(senaraiAmalanAsas));