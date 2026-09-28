document.getElementById('lawnForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const postcode = document.getElementById('postcode').value.trim();
    const grassType = document.getElementById('grass').value;
    const detailLevel = document.getElementById('detailLevel').value;
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
        'qld_couch': 'Queensland Blue Couch',
        'buffalo': 'Sir Walter / Buffalo',        
        'kikuyu': 'Kikuyu',
        'couch': 'Green Couch',
        'zoysia': 'Zoysia',
        'fescue': 'Tall Fescue / Ryegrass'
    };

    const detailName = detailLevel === 'detailed' ? 'Detailed Week-by-Week Plan' : 'Basic Overview';
    resultTitle.textContent = 'Seasonal Schedule: ' + grassNames[grassType] + ' (' + region + ') - ' + detailName;
    
    // Basic seasonal advice
    const basicSchedules = {
        'fescue': [
            { season: '🌸 Spring (Sep - Nov)', task: 'Primary growth window! Apply balanced fertiliser, top-dress core areas, and overseed thin spots. Keep water consistent as temperatures rise.' },
            { season: '☀️ Summer (Dec - Feb)', task: 'Heat stress alert! Raise mower blade height to 50-75mm to shade roots. Water deeply in early morning 2-3 times a week. Avoid high-nitrogen fertilising now.' },
            { season: '🍂 Autumn (Mar - May)', task: 'Best recovery season! Core aerate, fertiliser generously with a high-potassium blend, and repair any summer damage.' },
            { season: '❄️ Winter (Jun - Aug)', task: 'Cool-season lawn active period. Keep mown, clear fallen leaves to prevent fungal issues, and reduce watering.' }
        ],
        'warm_season_default': [
            { season: '🌸 Spring (Sep - Nov)', task: 'Dormancy wake-up! Scalp lawn lightly to remove dead thatch, apply a slow-release nitrogen fertiliser, and apply pre-emergent weed controls.' },
            { season: '☀️ Summer (Dec - Feb)', task: 'Peak growth period! Mow weekly (keep Buffalo around 40-50mm, Couch around 20-30mm). Deep weekly watering. Apply wetting agents if soil repels water.' },
            { season: '🍂 Autumn (Mar - May)', task: 'Prepare for winter! Apply autumn winteriser fertiliser rich in potassium to build root strength before soil temps drop.' },
            { season: '❄️ Winter (Jun - Aug)', task: 'Dormancy period. Minimal mowing required. Reduce watering to prevent fungal leaf spot. Spot-treat winter broadleaf weeds.' }
        ]
    };

    // Detailed week-by-week seasonal routines with newlines (\n\n) between week blocks
    const detailedSchedules = {
        'qld_couch': [
            {
                season: '🌸 Spring Maintenance (Sep - Nov)',
                task: 'Weeks 1-3: Early spring wake-up. Mow on a slightly lower setting to remove winter dieback, but avoid deep scalping as QLD Blue Couch lacks aggressive underground rhizomes.\n\nWeeks 4-6: Apply a low-to-medium nitrogen slow-release fertiliser (QLD Blue Couch prefers a slightly acidic pH around 5.5-6.0).\n\nWeeks 7-9: Apply pre-emergent herbicide to prevent summer crabgrass/crowsfoot. CAUTION: Avoid Dicamba-based broadleaf weedkillers as they burn QLD Blue Couch.\n\nWeeks 10-12: Begin regular fortnightly mowing at 25-35mm.'
            },
            {
                season: '☀️ Summer Maintenance (Dec - Feb)',
                task: 'Weeks 13-15: Peak growing season. Mow every 5-7 days. Water deeply once or twice a week early morning (15-20mm per soak).\n\nWeeks 16-18: Monitor for Armyworm or Lawn Grub activity (patchy brown spots appearing overnight). Apply acephate or chlorantraniliprole treatment if detected.\n\nWeeks 19-21: Apply soil wetting agent if water pools or runs off without soaking.\n\nWeeks 22-24: Maintain high mower height (30-40mm) during extreme heatwaves to preserve moisture.'
            },
            {
                season: '🍂 Autumn Maintenance (Mar - May)',
                task: 'Weeks 25-27: Begin winter preparation. Core aerate compacted areas to promote root depth before soil temperatures fall below 18°C.\n\nWeeks 28-30: Apply a high-potassium "winteriser" fertiliser to build cell strength.\n\nWeeks 31-33: Hand-weed or spot-treat broadleaf weeds with Buffalo-safe herbicides (e.g. Bromoxynil/MCPA formulations).\n\nWeeks 34-36: Ease off mowing frequency to once every 2-3 weeks.'
            },
            {
                season: '❄️ Winter Maintenance (Jun - Aug)',
                task: 'Weeks 37-40: Turf enters slow-growth phase. Raise mower blades to 35-40mm to maximize leaf surface for sunlight absorption.\n\nWeeks 41-44: Keep irrigation to an absolute minimum (once every 2-3 weeks if dry) to avoid fungal leaf spot.\n\nWeeks 45-48: Spot-treat winter broadleaf weeds (Winter Grass, Bindii, Clover).\n\nWeeks 49-52: Service mower blades and prepare gear for early spring wake-up.'
            }
        ],
        'buffalo': [
            {
                season: '🌸 Spring Maintenance (Sep - Nov)',
                task: 'Weeks 1-3: Light dethatching/scalp. Mow down to 30mm to clear thatch, then apply a soil conditioner like humic acid.\n\nWeeks 4-6: Apply slow-release Buffalo-formulated fertiliser (high in nitrogen and iron).\n\nWeeks 7-9: Apply prodiamine pre-emergent herbicide for summer weeds.\n\nWeeks 10-12: Set mower height to 45-50mm and commence weekly mowing.'
            },
            {
                season: '☀️ Summer Maintenance (Dec - Feb)',
                task: 'Weeks 13-15: Mow weekly at 45-50mm (Buffalo thrives when kept higher to shade out weed seed germination).\n\nWeeks 16-18: Check for Armyworm/Grubs; apply preventative grub treatment if needed.\n\nWeeks 19-21: Apply liquid iron chelates for deep green colour enhancement without excessive top-growth surge.\n\nWeeks 22-24: Ensure 25mm of deep irrigation per week during hot spells.'
            },
            {
                season: '🍂 Autumn Maintenance (Mar - May)',
                task: 'Weeks 25-27: Core aerate lawns subject to heavy foot traffic.\n\nWeeks 28-30: Apply autumn winteriser fertiliser high in potassium and trace elements.\n\nWeeks 31-33: Apply pre-emergent herbicide to prevent winter grass (Poa annua).\n\nWeeks 34-36: Reduce mowing frequency as growth slows.'
            },
            {
                season: '❄️ Winter Maintenance (Jun - Aug)',
                task: 'Weeks 37-40: Maintain height at 50mm. Mow once every 3-4 weeks purely to clean up debris.\n\nWeeks 41-44: Minimise irrigation; Sir Walter/Buffalo holds winter colour well if root system is established.\n\nWeeks 45-48: Hand-pull or spray Bindii/Clover using strict Buffalo-safe herbicide formulations (never use generic Dicamba).\n\nWeeks 49-52: Clean and sharpen mower blades.'
            }
        ],
        'fescue': [
            {
                season: '🌸 Spring Maintenance (Sep - Nov)',
                task: 'Weeks 1-3: Primary growth window starts. Mow weekly at 50-60mm.\n\nWeeks 4-6: Apply balanced cool-season fertiliser. Overseed any bare or damaged patches from summer heat.\n\nWeeks 7-9: Core aerate compacted clay soils and top-dress lightly with coarse washed sand/compost.\n\nWeeks 10-12: Increase watering frequency as temperatures rise.'
            },
            {
                season: '☀️ Summer Maintenance (Dec - Feb)',
                task: 'Weeks 13-15: HEAT STRESS PERIOD. Raise mowing deck to maximum height (65-75mm).\n\nWeeks 16-18: Irrigate deeply early morning 2-3 times per week (30-40mm weekly total). Do NOT apply high-nitrogen fertiliser now as it triggers fungal damping-off/Pythium blight.\n\nWeeks 19-21: Apply preventative fungicide if hot humid conditions cause brown patch.\n\nWeeks 22-24: Maintain shade and strict moisture monitoring.'
            },
            {
                season: '🍂 Autumn Maintenance (Mar - May)',
                task: 'Weeks 25-27: BEST RECOVERY WINDOW. Core aerate thoroughly.\n\nWeeks 28-30: Overseed entire lawn with fresh Tall Fescue seed to restore density lost over summer. Apply starter fertiliser.\n\nWeeks 31-33: Keep topsoil moist until new seed germinates.\n\nWeeks 34-36: First cut on new grass once it hits 75mm length.'
            },
            {
                season: '❄️ Winter Maintenance (Jun - Aug)',
                task: 'Weeks 37-40: Active growth continues in temperate zones. Mow fortnightly at 50mm.\n\nWeeks 41-44: Rake and remove fallen leaves regularly to prevent smothering and crown rot.\n\nWeeks 45-48: Apply winter maintenance fertiliser high in nitrogen and iron.\n\nWeeks 49-52: Spot-treat broadleaf weeds.'
            }
        ],
        'warm_season_default': [
            {
                season: '🌸 Spring Maintenance (Sep - Nov)',
                task: 'Weeks 1-3: Scalp lawn down to remove thatch and dead winter leaf blades. Rake thoroughly.\n\nWeeks 4-6: Apply slow-release complete fertiliser and water in deeply.\n\nWeeks 7-9: Apply pre-emergent herbicide to block summer broadleaf and grass seeds.\n\nWeeks 10-12: Commence weekly mowing at recommended height (20-30mm for Couch/Kikuyu, 30-40mm for Zoysia).'
            },
            {
                season: '☀️ Summer Maintenance (Dec - Feb)',
                task: 'Weeks 13-15: Peak vegetative growth. Mow weekly. Apply wetting agents if soil becomes hydrophobic.\n\nWeeks 16-18: Monitor for lawn grubs and armyworms; treat at first sign of damage.\n\nWeeks 19-21: Mid-summer booster fertilise with organic or granular fertiliser.\n\nWeeks 22-24: Water deeply 1-2 times weekly early in the morning.'
            },
            {
                season: '🍂 Autumn Maintenance (Mar - May)',
                task: 'Weeks 25-27: Core aerate compacted areas before soil temps drop below 18°C.\n\nWeeks 28-30: Apply high-potassium winteriser fertiliser to build root resilience.\n\nWeeks 31-33: Apply autumn pre-emergent herbicide to suppress winter weeds.\n\nWeeks 34-36: Reduce mowing frequency to fortnightly.'
            },
            {
                season: '❄️ Winter Maintenance (Jun - Aug)',
                task: 'Weeks 37-40: Turf enters dormancy. Mow every 3-4 weeks at a slightly higher setting to keep tidy.\n\nWeeks 41-44: Turn off automatic irrigation; water only if prolonged dry spell occurs.\n\nWeeks 45-48: Spot-treat broadleaf weeds (Bindii, Winter Grass) using grass-type appropriate selective herbicide.\n\nWeeks 49-52: Service lawnmower and equipment.'
            }
        ]
    };

    let selectedSchedule;
    if (detailLevel === 'detailed') {
        selectedSchedule = detailedSchedules[grassType] || detailedSchedules['warm_season_default'];
    } else {
        selectedSchedule = (grassType === 'fescue') ? basicSchedules['fescue'] : basicSchedules['warm_season_default'];
    }

    scheduleContainer.innerHTML = '';
    selectedSchedule.forEach(function(item) {
        const card = document.createElement('div');
        card.className = 'schedule-card';

        const h3 = document.createElement('h3');
        h3.textContent = item.season;

        const p = document.createElement('p');
        p.textContent = item.task;
        p.style.whiteSpace = 'pre-line'; // <-- Ensures \n line breaks render in browser

        card.appendChild(h3);
        card.appendChild(p);
        scheduleContainer.appendChild(card);
    });

    resultsDiv.style.display = 'block';
});
