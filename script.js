document.getElementById('lawnForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const postcode = document.getElementById('postcode').value.trim();
    const grassType = document.getElementById('grass').value;
    const resultsDiv = document.getElementById('results');
    const scheduleContainer = document.getElementById('scheduleContainer');
    const resultTitle = document.getElementById('resultTitle');

    if (!postcode || postcode.length !== 4 || isNaN(postcode)) {
        alert('Please enter a valid 4-digit Australian postcode.');
        return;
    }

    const pc = parseInt(postcode, 10);
    let region = 'Warm / Subtropical';
    
    if ((pc >= 2000 && pc <= 2599) || (pc >= 2619 && pc <= 2899) || (pc >= 3000 && pc <= 3999) || (pc >= 7000 && pc <= 7999) || (pc >= 5000 && pc <= 5799)) {
        region = 'Temperate / Cool Climate';
    } else if (pc >= 4000 && pc <= 4999) {
        region = 'Subtropical / Tropical (QLD)';
    } else if (pc >= 800 && pc <= 899) {
        region = 'Tropical (NT)';
    } else if (pc >= 6000 && pc <= 6799) {
        region = 'Mediterranean / Arid (WA)';
    }

    const grassNames = {
        'buffalo': 'Sir Walter / Buffalo',
        'qld_couch': 'Queensland Blue Couch',
        'kikuyu': 'Kikuyu',
        'couch': 'Green Couch',
        'zoysia': 'Zoysia',
        'fescue': 'Tall Fescue / Ryegrass'
    };

    resultTitle.textContent = 'Seasonal Schedule: ' + grassNames[grassType] + ' (' + region + ')';
    
    const schedules = {
        'fescue': [
            { season: '🌸 Spring (Sep - Nov)', task: 'Primary growth window! Apply balanced fertilizer, top-dress core areas, and overseed thin spots. Keep water consistent as temperatures rise.' },
            { season: '☀️ Summer (Dec - Feb)', task: 'Heat stress alert! Raise mower blade height to 50-75mm to shade roots. Water deeply in early morning 2-3 times a week. Avoid high-nitrogen fertilizing now.' },
            { season: '🍂 Autumn (Mar - May)', task: 'Best recovery season! Core aerate, fertilize generously with a high-potassium blend, and repair any summer damage.' },
            { season: '❄️ Winter (Jun - Aug)', task: 'Cool-season lawn active period. Keep mown, clear fallen leaves to prevent fungal issues, and reduce watering.' }
        ],
        'warm_season_default': [
            { season: '🌸 Spring (Sep - Nov)', task: 'Dormancy wake-up! Scalp lawn lightly to remove dead thatch, apply a slow-release nitrogen fertilizer, and apply pre-emergent weed controls.' },
            { season: '☀️ Summer (Dec - Feb)', task: 'Peak growth period! Mow weekly (keep Buffalo around 40-50mm, Couch around 20-30mm). Deep weekly watering. Apply wetting agents if soil repels water.' },
            { season: '🍂 Autumn (Mar - May)', task: 'Prepare for winter! Apply autumn winteriser fertilizer rich in potassium to build root strength before soil temps drop.' },
            { season: '❄️ Winter (Jun - Aug)', task: 'Dormancy period. Minimal mowing required. Reduce watering to prevent fungal leaf spot. Spot-treat winter broadleaf weeds.' }
        ]
    };

    const selectedSchedule = (grassType === 'fescue') ? schedules['fescue'] : schedules['warm_season_default'];

    scheduleContainer.innerHTML = '';
    selectedSchedule.forEach(function(item) {
        const card = document.createElement('div');
        card.className = 'schedule-card';

        const h3 = document.createElement('h3');
        h3.textContent = item.season;

        const p = document.createElement('p');
        p.textContent = item.task;

        card.appendChild(h3);
        card.appendChild(p);
        scheduleContainer.appendChild(card);
    });

    resultsDiv.style.display = 'block';
});
