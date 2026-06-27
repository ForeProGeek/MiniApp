// Telegram WebApp init
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    applyThemeToTelegram();
}

const STORAGE_KEY = 'trenches_app_state';
const USER_ID_KEY = 'trenches_user_id';
const THEME_KEY = 'trenches_theme';

function loadPersisted() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function saveState() {
    try {
        const payload = {
            points: state.points,
            checkIn: state.checkIn,
            referral: state.referral,
            alertIndex: state.alertIndex
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}
}

function getUserId() {
    let id = tg?.initDataUnsafe?.user?.id?.toString();
    if (!id) {
        try { id = localStorage.getItem(USER_ID_KEY); } catch (e) {}
    }
    if (!id) {
        id = '679483716';
        try { localStorage.setItem(USER_ID_KEY, id); } catch (e) {}
    }
    return id;
}

const persisted = loadPersisted();

const state = {
    points: persisted?.points ?? 14,
    user: {
        name: 'IzeCube',
        initial: 'I'
    },
    alertIndex: persisted?.alertIndex ?? 0,
    missions: {
        daily: [
            {
                id: 'd1',
                title: 'Comment on Trenches Post (3P)',
                desc: 'Comment on today\'s campaign post',
                iconType: 'x',
                points: 3,
                status: 'open',
                url: 'https://x.com/Trenches'
            },
            {
                id: 'd2',
                title: 'Like on Trenches Post (3P)',
                desc: 'Like the latest Trenches post',
                iconType: 'x',
                points: 3,
                status: 'open',
                url: 'https://x.com/Trenches'
            },
            {
                id: 'd3',
                title: 'Retweet Trenches Post (3P)',
                desc: 'Retweet the latest Trenches post',
                iconType: 'x',
                points: 3,
                status: 'open',
                url: 'https://x.com/Trenches'
            },
            {
                id: 'd4',
                title: 'Visit Partner Dashboard',
                desc: 'Visit the partner campaign dashboard',
                iconType: 'link',
                points: 5,
                status: 'open',
                url: 'https://trenches.app'
            }
        ],
        general: [
            {
                id: 'g1',
                title: 'Pinned Content Submission',
                desc: 'Submit campaign content and earn BP after approval',
                iconType: 'pin',
                points: 10,
                status: 'open',
                cta: 'Submit'
            },
            {
                id: 'g2',
                title: 'Follow Trenches X Account (5P)',
                desc: 'Follow Trenches on X',
                iconType: 'x',
                points: 5,
                status: 'open',
                url: 'https://x.com/Trenches'
            },
            {
                id: 'g3',
                title: 'Join Trenches Telegram (5P)',
                desc: 'Join the official Telegram channel',
                iconType: 'telegram',
                points: 5,
                status: 'open',
                url: 'https://t.me/Trenches'
            },
            {
                id: 'g4',
                title: 'Join Trenches Discord (5P)',
                desc: 'Join the Trenches Discord community',
                iconType: 'discord',
                points: 5,
                status: 'open',
                url: 'https://discord.gg/Trenches'
            },
            {
                id: 'g5',
                title: 'Follow Partner X Account',
                desc: 'Follow our campaign partner on X',
                iconType: 'x',
                points: 5,
                status: 'open',
                url: 'https://x.com'
            },
            {
                id: 'g6',
                title: 'Invite Friends',
                desc: 'Share your referral link and earn BP',
                iconType: 'referral',
                points: 5,
                status: 'open',
                cta: 'Invite'
            }
        ]
    },
    submissions: [
        {
            title: 'Daily Check-in',
            meta: 'Jun 26, 2026 at 12:00 PM · Awarded +10P',
            status: 'awarded'
        },
        {
            title: 'Comment on Trenches Post (3P)',
            meta: 'Jun 26, 2026 at 12:40 PM · Awarded +3P',
            status: 'approved'
        },
        {
            title: 'Pinned Content Submission',
            meta: 'Jun 25, 2026 at 3:20 PM',
            status: 'verifying'
        },
        {
            title: 'Rejected Proof Example',
            meta: 'Jun 24, 2026 at 10:15 AM · Rejected',
            status: 'rejected'
        }
    ],
    checkIn: persisted?.checkIn || {
        lastCheckIn: null,
        streak: 0,
        history: []
    },
    referral: persisted?.referral || {
        earned: 0,
        invited: [
            { name: 'Josh 🐾 Agboola', handle: null, date: '2026-06-14', points: 5 },
            { name: 'Joshua Agboola', handle: '@kinjosh', date: '2026-06-14', points: 5 },
            { name: '👉TBO👈', handle: '@Tboxtra', date: '2026-06-14', points: 5 }
        ]
    },
    walletActivity: [
        { title: 'Earned BP from task', meta: 'Daily Check-in', amount: '+10P', type: 'positive' },
        { title: 'Sent BP to another user', meta: '@john', amount: '-2P', type: 'negative' },
        { title: 'Received BP from another user', meta: '@mary', amount: '+5P', type: 'positive' }
    ]
};

const alertStates = [
    {
        type: 'AIRDROP ACCOUNT REGISTRATION',
        title: 'Register for airdrop',
        meta: 'Deadline Jun 29, 2026, 2:00 PM',
        icon: '$'
    },
    {
        type: 'URGENT: BP LOW',
        title: 'Add BP soon',
        meta: 'Add BP soon to avoid interruptions across active products.',
        icon: '!'
    },
    {
        type: 'NEW RAID LIVE',
        title: 'Arbitrum campaign',
        meta: 'Support the Arbitrum campaign before 6PM.',
        icon: '⚡'
    },
    {
        type: 'CAMPAIGN UPDATE',
        title: 'New partner tasks',
        meta: 'New partner tasks are available.',
        icon: '📢'
    }
];

const icons = {
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.0991.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.6989.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6574a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4H17V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>',
    referral: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>'
};

// Theme
function applyThemeToTelegram() {
    if (!tg) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bg = isDark ? '#0a0a0b' : '#FFF8F3';
    tg.setHeaderColor(bg);
    tg.setBackgroundColor(bg);
}

function initTheme() {
    let theme = 'light';
    try {
        theme = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    if (!theme && tg?.colorScheme) {
        theme = tg.colorScheme;
    }
    if (theme !== 'dark') theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    applyThemeToTelegram();
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyThemeToTelegram();
}

// Navigation
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);

    document.querySelectorAll('.bottom-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === id);
    });

    if (id === 'screen-main') renderMain();
    if (id === 'screen-submissions') renderSubmissions();
    if (id === 'screen-referrals') renderReferrals();
    if (id === 'screen-wallet') renderWallet();
}

function closeApp() {
    if (tg) tg.close();
}

function showOptions() {
    showToast('Options menu');
}

// Main tab switch
function switchMainTab(tab, btn) {
    document.querySelectorAll('.main-tabs .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#screen-main .tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('main-' + tab + '-panel').classList.add('active');
}

// Alert card
function cycleAlert() {
    state.alertIndex = (state.alertIndex + 1) % alertStates.length;
    saveState();
    renderAlert();
}

function renderAlert() {
    const s = alertStates[state.alertIndex];
    document.getElementById('alert-type').textContent = s.type;
    document.getElementById('alert-title').textContent = s.title;
    document.getElementById('alert-meta').textContent = s.meta;
    document.getElementById('alert-icon').textContent = s.icon;
}

// Render main screen
function renderMain() {
    document.getElementById('bp-balance').textContent = state.points;
    document.getElementById('main-referral-link').value = getReferralLink();
    renderAlert();

    const dailyOpen = state.missions.daily.filter(m => m.status === 'open').length;
    const generalOpen = state.missions.general.filter(m => m.status === 'open').length;
    document.getElementById('daily-badge').textContent = dailyOpen + 1;
    document.getElementById('general-badge').textContent = generalOpen;
    document.getElementById('daily-count').textContent = dailyOpen;

    renderStreakCircles();
    renderCheckInButton();

    document.getElementById('main-daily-list').innerHTML = state.missions.daily.map(m => missionHTML(m)).join('');
    document.getElementById('main-general-list').innerHTML =
        '<h3 class="section-heading">General Mission <span class="accent-count">' + generalOpen + '</span></h3>' +
        state.missions.general.map(m => missionHTML(m)).join('') +
        '<h3 class="section-heading">Completed Mission <span class="accent-count">0</span></h3>' +
        '<p class="muted">No completed missions yet.</p>';

    const completed = state.submissions.filter(s => s.status === 'approved' || s.status === 'awarded').length;
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('completed-empty').style.display = completed > 0 ? 'none' : 'block';
}

function missionHTML(m) {
    const icon = m.iconType === 'image'
        ? '<img src="' + m.image + '" alt="">'
        : icons[m.iconType] || icons.x;

    let action = '';
    if (m.status === 'verifying') {
        action = '<button class="pill warning" disabled>Verify</button>';
    } else if (m.status === 'done') {
        action = '<button class="pill success" disabled>Done</button>';
    } else {
        const label = m.cta || 'GO';
        action = '<button class="pill" onclick="doMission(\'' + m.id + '\')">' + label + '</button>';
    }

    return '' +
        '<div class="mission-item">' +
            '<div class="mission-icon">' + icon + '</div>' +
            '<div class="mission-info">' +
                '<div class="mission-title">' + m.title + '</div>' +
                '<div class="mission-desc">' + m.desc + '</div>' +
            '</div>' +
            '<div class="mission-action">' + action + '</div>' +
        '</div>';
}

function doMission(id) {
    const all = [...state.missions.daily, ...state.missions.general];
    const mission = all.find(m => m.id === id);
    if (!mission || mission.status === 'verifying' || mission.status === 'done') return;

    if (mission.id === 'g1') {
        mission.status = 'verifying';
        state.submissions.unshift({
            title: mission.title,
            meta: 'Started · ' + new Date().toLocaleString(),
            status: 'verifying'
        });
        showToast('Submission started');
        renderMain();
        renderSubmissions();
        return;
    }

    if (mission.id === 'g6') {
        showScreen('screen-referrals');
        return;
    }

    mission.status = 'verifying';
    renderMain();

    state.submissions.unshift({
        title: mission.title,
        meta: 'Started · ' + new Date().toLocaleString(),
        status: 'verifying'
    });
    renderSubmissions();

    showToast('Verification started');

    if (tg) {
        tg.openLink(mission.url);
    } else {
        window.open(mission.url, '_blank');
    }
}

// Check-in
function canCheckIn() {
    if (!state.checkIn.lastCheckIn) return true;
    return new Date(state.checkIn.lastCheckIn).toDateString() !== new Date().toDateString();
}

function claimCheckIn() {
    if (!canCheckIn()) {
        showToast('Already checked in today');
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const wasConsecutive = state.checkIn.lastCheckIn &&
        new Date(state.checkIn.lastCheckIn).toDateString() === yesterday.toDateString();

    state.checkIn.streak = wasConsecutive ? state.checkIn.streak + 1 : 1;
    state.checkIn.lastCheckIn = new Date().toISOString();
    state.checkIn.history.push(new Date().toDateString());

    const baseReward = 10;
    const streakBonus = state.checkIn.streak >= 7 ? 10 : 0;
    const reward = baseReward + streakBonus;
    state.points += reward;

    state.walletActivity.unshift({
        title: 'Earned from Daily Check-in',
        meta: new Date().toLocaleDateString(),
        amount: '+' + reward + 'P',
        type: 'positive'
    });

    state.submissions.unshift({
        title: 'Daily Check-in',
        meta: new Date().toLocaleString() + ' · Awarded +' + reward + 'P',
        status: 'awarded'
    });

    saveState();
    renderMain();
    renderWallet();
    renderSubmissions();
    showToast('Checked in! +' + reward + ' P');
}

function renderCheckInButton() {
    const btn = document.getElementById('main-checkin-btn');
    if (!btn) return;
    if (!canCheckIn()) {
        btn.textContent = 'Claimed';
        btn.disabled = true;
    } else {
        btn.textContent = 'Check In';
        btn.disabled = false;
    }
}

function renderStreakCircles() {
    const container = document.getElementById('streak-circles');
    if (!container) return;

    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const checkedCount = Math.min(state.checkIn.streak, 7);

    container.innerHTML = days.map((d, i) => {
        const checked = i < checkedCount ? 'checked' : '';
        return '<div class="streak-circle ' + checked + '"><span>' + (i < checkedCount ? '&#10003;' : d) + '</span></div>';
    }).join('');
}

// Submissions
function renderSubmissions() {
    const list = document.getElementById('submissions-list');
    if (!list) return;

    list.innerHTML = state.submissions.length
        ? state.submissions.map(s => '' +
            '<div class="submission-item">' +
                '<div>' +
                    '<div class="submission-title">' + s.title + '</div>' +
                    '<div class="submission-meta">' + s.meta + '</div>' +
                '</div>' +
                '<div class="status-badge ' + s.status + '">' +
                    '<span class="status-dot"></span>' +
                    (s.status === 'awarded' ? 'Awarded' : s.status === 'approved' ? 'Approved' : s.status === 'rejected' ? 'Rejected' : 'Verifying') +
                '</div>' +
            '</div>').join('')
        : '<p class="muted">No submissions yet. Complete a mission to get started.</p>';
}

// Referrals
function getReferralLink() {
    return 'https://t.me/Trenches_Bot?start=ref_' + getUserId();
}

function renderReferrals() {
    const link = getReferralLink();
    document.getElementById('referral-link-page').value = link;
    document.getElementById('referral-total').textContent = state.referral.invited.length;

    const showing = document.getElementById('referral-showing');
    if (showing) {
        showing.textContent = 'Showing ' + state.referral.invited.length + ' of ' + state.referral.invited.length;
    }

    const list = document.getElementById('invited-list');
    if (!list) return;

    list.innerHTML = state.referral.invited.length
        ? state.referral.invited.map(f => {
            const initial = f.name.replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase();
            const meta = f.handle
                ? f.handle + ' / Joined ' + new Date(f.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Joined ' + new Date(f.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return '' +
                '<div class="invited-item">' +
                    '<div class="invited-avatar">' + initial + '</div>' +
                    '<div class="invited-info">' +
                        '<div class="invited-name">' + f.name + '</div>' +
                        '<div class="invited-meta">' + meta + '</div>' +
                    '</div>' +
                '</div>';
        }).join('')
        : '<p class="muted">No invites yet. Share your link to start earning.</p>';
}

function copyReferralPage() {
    navigator.clipboard.writeText(getReferralLink()).then(() => {
        showToast('Referral link copied');
    }).catch(() => {
        showToast('Copy failed');
    });
}

function copyMainReferral() {
    copyReferralPage();
}

function shareReferral() {
    const link = getReferralLink();
    const text = encodeURIComponent('Join Trenches and earn BP together! 🍊');
    const url = 'https://t.me/share/url?url=' + encodeURIComponent(link) + '&text=' + text;

    if (tg && tg.openTelegramLink) {
        tg.openTelegramLink(url);
    } else {
        window.open(url, '_blank');
    }
}

// Wallet
function renderWallet() {
    document.getElementById('wallet-balance').textContent = state.points;

    const list = document.getElementById('wallet-activity');
    if (!list) return;

    list.innerHTML = state.walletActivity.map(a => '' +
        '<div class="activity-item">' +
            '<div class="activity-info">' +
                '<div class="activity-title">' + a.title + '</div>' +
                '<div class="activity-meta">' + a.meta + '</div>' +
            '</div>' +
            '<div class="activity-amount ' + a.type + '">' + a.amount + '</div>' +
        '</div>').join('');
}

function confirmSend() {
    const recipient = document.getElementById('send-recipient').value.trim();
    const amount = parseInt(document.getElementById('send-amount').value, 10);

    if (!recipient) {
        showToast('Enter a recipient');
        return;
    }
    if (!amount || amount <= 0) {
        showToast('Enter a valid amount');
        return;
    }
    if (amount > state.points) {
        showToast('Not enough BP');
        return;
    }

    state.points -= amount;
    state.walletActivity.unshift({
        title: 'Sent BP',
        meta: 'to ' + recipient,
        amount: '-' + amount + 'P',
        type: 'negative'
    });

    saveState();
    renderMain();
    renderWallet();
    showToast('Sent ' + amount + 'P to ' + recipient);
    showScreen('screen-wallet');

    document.getElementById('send-recipient').value = '';
    document.getElementById('send-amount').value = '';
}

function copyReceiveCode() {
    const code = document.getElementById('receive-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Receive code copied');
    }).catch(() => {
        showToast('Copy failed');
    });
}

// Toast
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Telegram user data
function loadTelegramUser() {
    const user = tg?.initDataUnsafe?.user;
    if (user) {
        state.user.name = user.username || user.first_name || state.user.name;
        state.user.initial = (user.first_name?.[0] || user.username?.[0] || state.user.initial).toUpperCase();
    }
}

// Init
function init() {
    initTheme();
    loadTelegramUser();
    renderMain();
    renderSubmissions();
    renderReferrals();
    renderWallet();

    setTimeout(() => {
        showScreen('screen-main');
    }, 2500);
}

init();
