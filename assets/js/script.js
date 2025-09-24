// Translation System
const translations = {
    en: {
        title: "2FA Code Generator",
        subtitle: "Generate secure two-factor authentication codes instantly",
        features: "✨ Modern • Secure • Fast",
        placeholder: "Enter your secret keys (one per line)...",
        generateBtn: "Generate Codes",
        clearBtn: "Clear All",
        codeHeader: "Code",
        secretKeyHeader: "Secret Key",
        generatedHeader: "Generated",
        timeHeader: "Time",
        placeholderText: "Your 2FA codes will appear here",
        placeholderSubtext: "Enter your secret keys and click Generate",
        infoLabel: "ℹ️ Information:",
        infoText: "Verification codes will be automatically updated every 30 seconds. Make sure your secret key is valid and from a trusted source.",
        securityLabel: "⚠️ Security:",
        securityText: "Do not share your secret key or verification codes with anyone. This application runs entirely in your browser for maximum security.",
        copySuccess: "2FA code copied successfully:",
        copyError: "Failed to copy code:",
        showMore: "Show More",
        copyBtn: "Copy",
        errorInvalidKey: "The code format is invalid",
        errorEmptyInput: "Enter at least one code",
        errorKeyTooShort: "The code must be at least 16 characters",
        errorDecodeFailed: "Unable to decode base32 format",
        successGenerated: "Generated",
        successCodes: "2FA code(s) successfully",
        errorFound: "The code you entered is invalid"
    },
    id: {
        title: "Generator Kode 2FA",
        subtitle: "Buat kode autentikasi dua faktor yang aman dengan mudah",
        features: "✨ Modern • Aman • Cepat",
        placeholder: "Masukkan secret key Anda (satu per baris)...",
        generateBtn: "Buat Kode",
        clearBtn: "Hapus Semua",
        codeHeader: "Kode",
        secretKeyHeader: "Secret Key",
        generatedHeader: "Dibuat",
        timeHeader: "Waktu",
        placeholderText: "Kode 2FA Anda akan muncul di sini",
        placeholderSubtext: "Masukkan secret key dan klik Buat Kode",
        infoLabel: "ℹ️ Informasi:",
        infoText: "Kode verifikasi akan diperbarui otomatis setiap 30 detik. Pastikan secret key Anda valid dan berasal dari sumber terpercaya.",
        securityLabel: "⚠️ Keamanan:",
        securityText: "Jangan bagikan secret key atau kode verifikasi kepada siapa pun. Aplikasi ini berjalan sepenuhnya di browser Anda untuk keamanan maksimal.",
        copySuccess: "Kode 2FA berhasil disalin:",
        copyError: "Gagal menyalin kode:",
        showMore: "Tampilkan Lainnya",
        copyBtn: "Salin",
        errorInvalidKey: "Format kode tidak benar",
        errorEmptyInput: "Masukkan minimal satu kode",
        errorKeyTooShort: "Kode harus berisi minimal 16 karakter",
        errorDecodeFailed: "Tidak dapat mendekode format base32",
        successGenerated: "Berhasil menghasilkan",
        successCodes: "kode 2FA",
        errorFound: "Kode yang Anda masukkan tidak valid"
    }
};

let currentLanguage = 'en';

// Language Management
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage = savedLanguage;
    updateLanguage();
    updateLanguageButton();
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'id' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
    updateLanguageButton();
    updateAriaStates();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

function updateLanguageAfterContent() {
    // Update any dynamically created content
    setTimeout(() => {
        updateLanguage();
    }, 100);
}

function updateLanguageButton() {
    const currentLangSpan = document.getElementById('current-lang');
    const otherLangSpan = document.getElementById('other-lang');
    
    if (currentLanguage === 'en') {
        currentLangSpan.textContent = 'EN';
        otherLangSpan.textContent = 'ID';
    } else {
        currentLangSpan.textContent = 'ID';
        otherLangSpan.textContent = 'EN';
    }
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
    updateAriaStates();
}

function updateThemeButton(theme) {
    const currentThemeSpan = document.getElementById('current-theme');
    const otherThemeSpan = document.getElementById('other-theme');
    
    if (theme === 'light') {
        currentThemeSpan.textContent = '☀️';
        otherThemeSpan.textContent = '🌙';
    } else {
        currentThemeSpan.textContent = '🌙';
        otherThemeSpan.textContent = '☀️';
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
    if (e.key === 'Enter' && e.ctrlKey && e.target.id === 'skey') {
        e.preventDefault();
        run();
    }
});

// Initialize theme and language on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    updateAriaStates();
});
    
function updateAriaStates() {
    const themeSwitch = document.getElementById('theme-switch');
    const languageSwitch = document.getElementById('language-switch');
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (themeSwitch) {
        themeSwitch.setAttribute('aria-pressed', currentTheme === 'light');
    }
    
    if (languageSwitch) {
        languageSwitch.setAttribute('aria-pressed', currentLanguage === 'id');
    }
}

// Base32 decode function
function base32Decode(encoded) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    let output = [];
    
    encoded = encoded.toUpperCase().replace(/=+$/, '');
    
    for (let i = 0; i < encoded.length; i++) {
        const val = alphabet.indexOf(encoded[i]);
        if (val === -1) continue;
        bits += val.toString(2).padStart(5, '0');
    }
    
    for (let i = 0; i + 8 <= bits.length; i += 8) {
        output.push(parseInt(bits.substring(i, i + 8), 2));
    }
    
    return new Uint8Array(output);
}

// Web Crypto based TOTP implementation with otpauth parsing
const activeEntries = [];
let refreshTimeout = null;
let countdownInterval = null;

function mapAlgorithm(alg) {
    const upper = String(alg || 'SHA1').toUpperCase();
    if (upper === 'SHA1') return 'SHA-1';
    if (upper === 'SHA256') return 'SHA-256';
    if (upper === 'SHA512') return 'SHA-512';
    return 'SHA-1';
}

function toCounterBytes(counter) {
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setUint32(4, counter >>> 0, false);
    return new Uint8Array(buf);
}

function parseOtpAuthUri(uri) {
    try {
        const url = new URL(uri);
        if (url.protocol !== 'otpauth:' || url.hostname.toLowerCase() !== 'totp') return null;
        const params = url.searchParams;
        const secretParam = params.get('secret');
        if (!secretParam) return null;
        const algorithm = mapAlgorithm(params.get('algorithm') || 'SHA1');
        const digits = parseInt(params.get('digits') || '6', 10) || 6;
        const period = parseInt(params.get('period') || '30', 10) || 30;
        let label = decodeURIComponent(url.pathname.replace(/^\//, ''));
        let issuer = params.get('issuer') || '';
        if (label && label.includes(':')) {
            const parts = label.split(':');
            if (!issuer) issuer = parts[0].trim();
            label = parts.slice(1).join(':').trim();
        }
        return {
            type: 'totp',
            secret: secretParam,
            label,
            issuer,
            algorithm,
            digits,
            period
        };
    } catch (_) {
        return null;
    }
}

function parseInputLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return null;
    if (trimmed.toLowerCase().startsWith('otpauth://')) {
        return parseOtpAuthUri(trimmed);
    }
    // support pipe-delimited formats; choose last non-empty part as secret
    let candidate = trimmed;
    if (trimmed.indexOf('|') > -1) {
        const parts = trimmed.split('|').map(s => s.trim()).filter(Boolean);
        candidate = parts[2] || parts[1] || parts[0];
    }
    return {
        type: 'totp',
        secret: candidate,
        label: '',
        issuer: '',
        algorithm: mapAlgorithm('SHA1'),
        digits: 6,
        period: 30
    };
}

async function importHmacKey(secretBytes, algorithm) {
    return await crypto.subtle.importKey(
        'raw',
        secretBytes,
        { name: 'HMAC', hash: { name: algorithm } },
        false,
        ['sign']
    );
}

async function generateTOTPForEntry(entry, timeStep) {
    try {
        if (!entry || !entry.secretBytes || entry.secretBytes.length === 0) return null;
        if (!entry.key) {
            entry.key = await importHmacKey(entry.secretBytes, entry.algorithm);
        }
        const counterBytes = toCounterBytes(timeStep);
        const signature = await crypto.subtle.sign('HMAC', entry.key, counterBytes);
        const hmac = new Uint8Array(signature);
        const offset = hmac[hmac.length - 1] & 0x0f;
        const code = ((hmac[offset] & 0x7f) << 24) |
                     ((hmac[offset + 1] & 0xff) << 16) |
                     ((hmac[offset + 2] & 0xff) << 8) |
                     (hmac[offset + 3] & 0xff);
        const mod = 10 ** (entry.digits || 6);
        return String(code % mod).padStart(entry.digits || 6, '0');
    } catch (error) {
        console.error('TOTP generation error:', error);
        return null;
    }
}

function createCell(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
}

function createRow(entry, initialCode, waktuGenerate) {
    const tr = document.createElement('tr');
    tr.className = 'ttrr bg-gray-800 hover:bg-gray-700 transition-all duration-300 border-b border-gray-600';

    const tdCode = createCell('td', 'px-2 py-3 align-top');
    const codeWrap = createCell('div', 'flex flex-col gap-2');
    const codeHeader = createCell('div', 'flex items-center');
    const codeSpan = createCell('span', 'font-mono text-2xl font-bold text-theme-primary otp-code', initialCode || '------');

    // Countdown container (ring + text)
    const countdownWrap = createCell('div', 'otp-countdown flex items-center justify-center gap-1');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'otp-ring');
    svg.setAttribute('viewBox', '0 0 36 36');
    const radius = 16; // r
    const circumference = 2 * Math.PI * radius;
    const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('cx', '18');
    bgCircle.setAttribute('cy', '18');
    bgCircle.setAttribute('r', String(radius));
    bgCircle.setAttribute('class', 'otp-ring-circle-bg');
    const fgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fgCircle.setAttribute('cx', '18');
    fgCircle.setAttribute('cy', '18');
    fgCircle.setAttribute('r', String(radius));
    fgCircle.setAttribute('class', 'otp-ring-circle');
    fgCircle.style.strokeDasharray = String(circumference);
    fgCircle.style.strokeDashoffset = '0';
    svg.appendChild(bgCircle);
    svg.appendChild(fgCircle);
    const countdownText = createCell('span', 'otp-countdown-text text-theme-muted', '');
    countdownWrap.appendChild(svg);
    countdownWrap.appendChild(countdownText);

    codeHeader.appendChild(codeSpan);
    const rightSpace = createCell('div', 'flex-1 flex justify-center');
    rightSpace.appendChild(countdownWrap);
    codeHeader.appendChild(rightSpace);
    const copyBtn = createCell('button', 'copy-button text-theme-primary px-3 py-1 text-xs font-bold copy-btn flex items-center gap-1 self-start');
    copyBtn.setAttribute('type', 'button');
    const copyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    copyIcon.setAttribute('class', 'w-3 h-3');
    copyIcon.setAttribute('fill', 'none');
    copyIcon.setAttribute('stroke', 'currentColor');
    copyIcon.setAttribute('viewBox', '0 0 24 24');
    const copyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    copyPath.setAttribute('stroke-linecap', 'round');
    copyPath.setAttribute('stroke-linejoin', 'round');
    copyPath.setAttribute('stroke-width', '2');
    copyPath.setAttribute('d', 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z');
    copyIcon.appendChild(copyPath);
    const copyText = document.createElement('span');
    copyText.textContent = translations[currentLanguage].copyBtn;
    copyBtn.appendChild(copyIcon);
    copyBtn.appendChild(copyText);
    codeWrap.appendChild(codeHeader);
    codeWrap.appendChild(copyBtn);
    tdCode.appendChild(codeWrap);

    // Mobile details
    const mobileDetails = createCell('div', 'sm:hidden mt-3 pt-3 border-t border-theme-table');
    const secretMobile = createCell('div', 'text-xs text-theme-muted mb-1');
    secretMobile.append('Secret: ');
    const secretMobileSpan = createCell('span', 'font-mono text-theme-secondary', (entry.secretDisplay || '').substring(0, 20) + ((entry.secretDisplay || '').length > 20 ? '...' : ''));
    secretMobile.appendChild(secretMobileSpan);
    const timeMobile = createCell('div', 'text-xs text-theme-muted');
    timeMobile.append('Time: ');
    const timeMobileSpan = createCell('span', 'text-theme-secondary', waktuGenerate);
    timeMobile.appendChild(timeMobileSpan);
    mobileDetails.appendChild(secretMobile);
    mobileDetails.appendChild(timeMobile);
    tdCode.appendChild(mobileDetails);

    const tdSecret = createCell('td', 'px-2 py-3 font-mono text-sm text-theme-secondary break-all hidden sm:table-cell align-middle text-center', entry.secretDisplay || '');
    const tdTime = createCell('td', 'px-2 py-3 text-sm text-theme-muted hidden md:table-cell align-middle text-center', waktuGenerate);

    tr.appendChild(tdCode);
    tr.appendChild(tdSecret);
    tr.appendChild(tdTime);

    // Save refs for updates
    entry.rowElement = tr;
    entry.codeSpan = codeSpan;
    entry.timeCell = tdTime;
    entry.timeMobileSpan = timeMobileSpan;
    entry.countdownCircle = fgCircle;
    entry.countdownCircumference = circumference;
    entry.countdownText = countdownText;

    return tr;
}

function removePlaceholderIfPresent() {
    const placeholderRow = document.querySelector('#tb tbody tr td[colspan="3"]');
    if (placeholderRow) {
        placeholderRow.parentElement.remove();
    }
}

function insertRowAtTop(tr) {
    const tbody = document.querySelector('#tb tbody');
    tbody.insertAdjacentElement('afterbegin', tr);
}

function limitRowsTo(max) {
    const rows = document.querySelectorAll('#tb tbody .ttrr');
    if (rows.length > max) {
        for (let i = max; i < rows.length; i++) {
            const row = rows[i];
            row.remove();
        }
    }
}

function computeNextRefreshDelayMs() {
    if (activeEntries.length === 0) return 30000;
    const now = Date.now();
    let minDelay = Infinity;
    for (const e of activeEntries) {
        const periodMs = (e.period || 30) * 1000;
        const delay = periodMs - (now % periodMs);
        if (delay < minDelay) minDelay = delay;
    }
    return Math.max(250, Math.min(minDelay + 10, 30000));
}

async function refreshAllOtps() {
    const now = new Date();
    for (const e of activeEntries) {
        const period = e.period || 30;
        const timeStep = Math.floor(now.getTime() / (period * 1000));
        const code = await generateTOTPForEntry(e, timeStep);
        if (code) {
            e.codeSpan.textContent = code;
        }
        const timeText = formatDateTime(now);
        e.timeCell.textContent = timeText;
        if (e.timeMobileSpan) e.timeMobileSpan.textContent = timeText;
    }
}

async function scheduleRefresh() {
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
    }
    await refreshAllOtps();
    const nextDelay = computeNextRefreshDelayMs();
    refreshTimeout = setTimeout(scheduleRefresh, nextDelay);
    startCountdownLoop();
}

function updateCountdownDisplays() {
    if (activeEntries.length === 0) return;
    const now = Date.now();
    for (const e of activeEntries) {
        const periodMs = (e.period || 30) * 1000;
        const remainingMs = periodMs - (now % periodMs);
        const frac = Math.max(0, Math.min(1, remainingMs / periodMs));
        if (e.countdownCircle && e.countdownCircumference != null) {
            const offset = e.countdownCircumference * (1 - frac);
            e.countdownCircle.style.strokeDashoffset = String(offset);
        }
        if (e.countdownText) {
            const secs = Math.ceil(remainingMs / 1000);
            e.countdownText.textContent = `${secs}s`;
        }
    }
}

function startCountdownLoop() {
    if (countdownInterval) clearInterval(countdownInterval);
    updateCountdownDisplays();
    countdownInterval = setInterval(updateCountdownDisplays, 250);
}

function showUserFriendlyError(messageKey, customMessage = null) {
    const alertBox = document.getElementById('copy-alert');
    const message = customMessage || translations[currentLanguage][messageKey] || messageKey;
    const currentTheme = document.body.getAttribute('data-theme');

    alertBox.textContent = '';
    const container = document.createElement('div');
    container.className = 'flex items-center gap-3';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'w-5 h-5');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.054 16.5C2.284 18.167 3.246 20 4.786 20z');
    svg.appendChild(path);
    const span = document.createElement('span');
    span.textContent = message;
    container.appendChild(svg);
    container.appendChild(span);
    alertBox.appendChild(container);

    if (currentTheme === 'light') {
        alertBox.style.position = 'fixed';
        alertBox.style.top = '5rem';
        alertBox.style.right = '1.5rem';
        alertBox.style.zIndex = '9999';
    }

    alertBox.className = 'fixed top-20 right-6 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold z-40 transition-all duration-500 backdrop-blur-sm border bg-red-500/90 border-red-400/50 opacity-100 transform translate-y-0 scale-100';

    setTimeout(() => {
        alertBox.className = 'fixed top-20 right-6 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold z-40 transition-all duration-500 backdrop-blur-sm border bg-red-500/90 border-red-400/50 opacity-0 transform translate-y-2 scale-95 pointer-events-none';
    }, 5000);
}

// Format date time as DD-MM-YYYY HH:mm
function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

async function run() {
    const con = document.getElementById('skey').value.trim();
    if (!con) {
        showUserFriendlyError('errorEmptyInput');
        return;
    }

    const generateBtn = document.getElementById('generateBtn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = `
        <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        <span>Generating...</span>
    `;
    generateBtn.disabled = true;

    try {
        activeEntries.length = 0;

        const lines = con.split('\n');
        let successCount = 0;
        let errorCount = 0;
        const tbody = document.querySelector('#tb tbody');

        for (const line of lines) {
            const parsed = parseInputLine(line);
            if (!parsed || !parsed.secret) continue;

            if (parsed.secret.length < 16) {
                errorCount++;
                continue;
            }

            const secretBytes = base32Decode(parsed.secret);
            if (!secretBytes || secretBytes.length === 0) {
                errorCount++;
                continue;
            }

            const entry = {
                secretBytes,
                secretDisplay: parsed.secret,
                algorithm: parsed.algorithm,
                digits: parsed.digits,
                period: parsed.period,
                label: parsed.label,
                issuer: parsed.issuer,
                key: null,
                rowElement: null,
                codeSpan: null,
                timeCell: null,
                timeMobileSpan: null
            };

            const now = new Date();
            const step = Math.floor(now.getTime() / ((entry.period || 30) * 1000));
            const code = await generateTOTPForEntry(entry, step);
            if (!code) {
                errorCount++;
                continue;
            }

            const waktuGenerate = formatDateTime(now);
            const row = createRow(entry, code, waktuGenerate);

            removePlaceholderIfPresent();
            insertRowAtTop(row);
            successCount++;

            activeEntries.push(entry);
        }

        limitRowsTo(10);
        updateTableVisibility();

        if (successCount > 0) {
            const successMessage = `${translations[currentLanguage].successGenerated} ${successCount} ${translations[currentLanguage].successCodes}`;
            showCopyAlert(successMessage, false);
            await scheduleRefresh();
        }
        if (errorCount > 0) {
            showUserFriendlyError('errorFound');
        }
    } finally {
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
    }
}

function updateTableVisibility() {
    const rows = document.querySelectorAll("#tb tbody .ttrr");
    const existingShowMoreRow = document.getElementById("show-more-row");
    
    if (rows.length > 3) {
        rows.forEach((row, index) => {
            if (index >= 3) {
                row.style.display = 'none';
                row.classList.add('hidden-row');
            } else {
                row.style.display = 'table-row';
                row.classList.remove('hidden-row');
            }
        });
        
        if (!existingShowMoreRow) {
            const showMoreRow = document.createElement('tr');
            showMoreRow.id = 'show-more-row';
            showMoreRow.innerHTML = `
                <td colspan="3" class="px-4 py-4 text-center">
                    <button id="show-more-btn" class="neumorphism-button text-theme-primary px-4 py-2 text-sm font-bold">
                        ${translations[currentLanguage].showMore} (${rows.length - 3})
                    </button>
                </td>
            `;
            document.querySelector("#tb tbody").appendChild(showMoreRow);
        } else {
            const btn = document.getElementById("show-more-btn");
            if (btn) {
                btn.textContent = `${translations[currentLanguage].showMore} (${rows.length - 3})`;
            }
        }
    } else {
        if (existingShowMoreRow) {
            existingShowMoreRow.remove();
        }
        rows.forEach(row => {
            row.style.display = 'table-row';
            row.classList.remove('hidden-row');
        });
    }
}

function qk() {
    document.getElementById("skey").value = '';
    document.querySelectorAll(".ttrr").forEach(row => row.remove());
    
    const showMoreRow = document.getElementById("show-more-row");
    if (showMoreRow) {
        showMoreRow.remove();
    }
    
    document.querySelector("#tb tbody").innerHTML = `
        <tr>
            <td colspan="3" class="px-4 py-8 text-center text-theme-muted">
                <div class="flex flex-col items-center gap-4">
                    <div class="w-16 h-16 bg-theme-input rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <p class="text-lg font-medium text-theme-secondary" data-translate="placeholderText">${translations[currentLanguage].placeholderText}</p>
                    <p class="text-sm text-theme-muted" data-translate="placeholderSubtext">${translations[currentLanguage].placeholderSubtext}</p>
                </div>
            </td>
        </tr>
    `;
    
    updateLanguageAfterContent();

    activeEntries.length = 0;
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
    }
}

// Copy to clipboard functionality and show more button
document.addEventListener('click', function(e) {
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
        e.preventDefault();
        const row = copyBtn.closest('tr');
        const codeEl = row ? row.querySelector('.otp-code') : null;
        const code = codeEl ? codeEl.textContent : copyBtn.getAttribute('data-code');
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(function() {
                showCopyAlert(`${translations[currentLanguage].copySuccess} ${code}`);
            }, function(err) {
                showCopyAlert(`${translations[currentLanguage].copyError} ${err}`, true);
            });
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = code;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showCopyAlert(`${translations[currentLanguage].copySuccess} ${code}`);
            } catch (err) {
                showCopyAlert(`${translations[currentLanguage].copyError} ${err}`, true);
            }
            document.body.removeChild(textArea);
        }
    }
    
    if (e.target.id === 'show-more-btn' || e.target.closest('#show-more-btn')) {
        e.preventDefault();
        const hiddenRows = document.querySelectorAll("#tb tbody .hidden-row");
        hiddenRows.forEach(row => {
            row.style.display = 'table-row';
            row.classList.remove('hidden-row');
        });
        const showMoreRow = document.getElementById("show-more-row");
        if (showMoreRow) {
            showMoreRow.remove();
        }
    }
});

function showCopyAlert(message, isError = false) {
    const alertBox = document.getElementById('copy-alert');
    const currentTheme = document.body.getAttribute('data-theme');

    alertBox.textContent = '';
    const container = document.createElement('div');
    container.className = 'flex items-center gap-3';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'w-5 h-5');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', isError ? 'M6 18L18 6M6 6l12 12' : 'M5 13l4 4L19 7');
    svg.appendChild(path);
    const span = document.createElement('span');
    span.textContent = message;
    container.appendChild(svg);
    container.appendChild(span);
    alertBox.appendChild(container);

    if (currentTheme === 'light') {
        alertBox.style.position = 'fixed';
        alertBox.style.top = '5rem';
        alertBox.style.right = '1.5rem';
        alertBox.style.zIndex = '9999';
    }

    alertBox.className = `fixed top-20 right-6 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold z-40 transition-all duration-500 backdrop-blur-sm border ${
        isError ? 'bg-red-500/90 border-red-400/50' : 'bg-green-500/90 border-green-400/50'
    } opacity-100 transform translate-y-0 scale-100`;

    setTimeout(() => {
        alertBox.className = `fixed top-20 right-6 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold z-40 transition-all duration-500 backdrop-blur-sm border ${
            isError ? 'bg-red-500/90 border-red-400/50' : 'bg-green-500/90 border-green-400/50'
        } opacity-0 transform translate-y-2 scale-95 pointer-events-none`;
    }, 5000);
}

