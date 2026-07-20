document.addEventListener('DOMContentLoaded', () => {
    // Checkbox styling sync
    const checkItems = document.querySelectorAll('.check-item');
    checkItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        item.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            if (checkbox.checked) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
            validateStep2(); // specifically for rooms if we want validation there
        });
    });

    // Baseline validation check on load
    validateStep1();
    validateStep2();
    validateStep3();
});

// State
let currentStep = 0;
const state = {
    houseType: null,
    hasBasement: false,
    distance: null,
    foundation: null
};
const qtys = {
    badrum: 1,
    gasttoalett: 0,
    kok: 1,
    tvattstuga: 0,
    extra: 0,
    gjutjarn: 0
};

function updateStepper(step) {
    const progress = document.getElementById('stepper-progress');
    const labels = document.querySelectorAll('.step-label');
    
    labels.forEach((label, index) => {
        if (index < step) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });

    let percentage = 0;
    if (step === 1) percentage = 15;
    else if (step === 2) percentage = 50;
    else if (step === 3) percentage = 83;
    else if (step >= 4) percentage = 100;
    
    if (step === 0) percentage = 0;

    if (progress) {
        progress.style.width = percentage + '%';
    }
}

function showView(viewId) {
    document.querySelectorAll('.calc-view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep(step) {
    currentStep = step;
    updateStepper(step);
    showView('view-' + step);
}

function prevStep(step) {
    currentStep = step;
    updateStepper(step);
    showView('view-' + step);
}

function selectOption(element, category) {
    // Deselect siblings
    const parent = element.parentElement;
    parent.querySelectorAll('.option-card, .distance-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select this
    element.classList.add('selected');
    
    // Save to state
    state[category] = element.getAttribute('data-value');

    // Trigger validation
    if (category === 'houseType') validateStep1();
    if (category === 'distance') validateStep2();
    if (category === 'foundation') validateStep3();
}

function updateQty(room, delta) {
    let current = qtys[room];
    let next = current + delta;
    if (next < 0) next = 0;
    
    // Gjutjärn cannot exceed extra golvbrunnar
    if (room === 'gjutjarn' && next > qtys['extra']) next = qtys['extra'];

    qtys[room] = next;
    document.getElementById('qty-' + room).innerText = next;

    // Handle extra golvbrunnar revealing gjutjarn
    if (room === 'extra') {
        const box = document.getElementById('gjutjarn-box');
        if (next > 0) {
            box.classList.add('active');
        } else {
            box.classList.remove('active');
            qtys['gjutjarn'] = 0;
            document.getElementById('qty-gjutjarn').innerText = 0;
        }
        // Also cap gjutjarn if we lowered extra below it
        if (qtys['gjutjarn'] > next) {
            qtys['gjutjarn'] = next;
            document.getElementById('qty-gjutjarn').innerText = next;
        }
    }
    
    updateTotalPoints();
}

function updateTotalPoints() {
    const pts = 
        (qtys.badrum * 3) +
        (qtys.gasttoalett * 2) +
        (qtys.kok * 1) +
        (qtys.tvattstuga * 1) +
        (qtys.extra * 1);
    const display = document.getElementById('total-pts-display');
    if (display) display.innerText = pts;
}

function handleBrfSelection() {
    updateStepper(1); // Keeps stepper at 'Ditt hus'
    showView('view-brf');
}

// Validations
function validateStep1() {
    const btn = document.getElementById('btn-next-1');
    if (state.houseType) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', 'true');
    }
}

function validateStep2() {
    const btn = document.getElementById('btn-next-2');
    if (state.distance) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', 'true');
    }
}

function validateStep3() {
    const btn = document.getElementById('btn-next-3');
    if (state.foundation) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', 'true');
    }
}

function calculateAndShowResult() {
    // Hide all views
    document.querySelectorAll('.calc-view').forEach(v => v.classList.remove('active'));
    
    // Show view 4 (Lead Form)
    document.getElementById('view-4').classList.add('active');
    updateStepper(4);
}

function submitQuoteRequest() {
    const name = document.getElementById('calc-name').value;
    const email = document.getElementById('calc-email').value;
    const phone = document.getElementById('calc-phone').value;
    
    if(!name || !phone) {
        alert('Vänligen fyll i åtminstone ditt namn och telefonnummer.');
        return;
    }
    
    // Format the data
    let body = `Offertförfrågan från Kalkylatorn\n\n`;
    body += `Namn: ${name}\n`;
    body += `E-post: ${email}\n`;
    body += `Telefon: ${phone}\n\n`;
    body += `--- Fastighetsinfo ---\n`;
    body += `Hustyp: ${state.houseType}\n`;
    body += `Avstånd till gata: ${state.distance} m\n`;
    body += `Grundläggning: ${state.foundation}\n\n`;
    body += `--- Rum att relina ---\n`;
    body += `Badrum: ${qtys.badrum}\n`;
    body += `Gästtoalett: ${qtys.gasttoalett}\n`;
    body += `Kök: ${qtys.kok}\n`;
    body += `Tvättstuga: ${qtys.tvattstuga}\n`;
    body += `Extra golvbrunnar: ${qtys.extra}\n`;
    if(qtys.extra > 0) {
        body += `Varav i gjutjärn: ${qtys.gjutjarn}\n`;
    }
    
    // Get checked problems
    const problemChecks = document.querySelectorAll('#problems-list input:checked');
    if (problemChecks.length > 0) {
        body += `\n--- Nuvarande problem ---\n`;
        problemChecks.forEach(chk => {
            body += `- ${chk.parentNode.textContent.trim()}\n`;
        });
    }
    
    const mailto = `mailto:info@nordxrelining.se?subject=Offertförfrågan Relining&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    
    document.getElementById('quote-success').style.display = 'block';
}
