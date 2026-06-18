// Telegram WebApp init
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#0a0a0b');
    tg.setBackgroundColor('#0a0a0b');
}

// Persistent storage helpers
const STORAGE_KEY = 'trenches_app_state';
const USER_ID_KEY = 'trenches_user_id';

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
            xConnected: state.xConnected,
            checkIn: state.checkIn,
            referral: state.referral
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
        // ignore storage errors
    }
}

function getUserId() {
    let id = tg?.initDataUnsafe?.user?.id?.toString();
    if (!id) {
        try {
            id = localStorage.getItem(USER_ID_KEY);
        } catch (e) {}
    }
    if (!id) {
        id = 'user_' + Math.random().toString(36).slice(2, 10);
        try {
            localStorage.setItem(USER_ID_KEY, id);
        } catch (e) {}
    }
    return id;
}

const persisted = loadPersisted();

// App state
const state = {
    points: persisted?.points || 0,
    xConnected: persisted?.xConnected || false,
    user: {
        name: 'Trenches User',
        initial: 'T'
    },
    missions: {
        daily: [
            {
                id: 'd1',
                title: 'Comment on Trenches Post',
                desc: 'Leave a meaningful comment on the latest Trenches post.',
                iconType: 'x',
                points: 3,
                status: 'open',
                url: 'https://x.com/Trenches'
            },
            {
                id: 'd2',
                title: 'Like on Trenches Post',
                desc: 'Like the latest Trenches post to earn points.',
                iconType: 'x',
                points: 3,
                status: 'open',
                url: 'https://x.com/Trenches'
            },
            {
                id: 'd3',
                title: 'Retweet on Trenches Post',
                desc: 'Retweet the latest Trenches post to spread the word.',
                iconType: 'x',
                points: 3,
                status: 'open',
                url: 'https://x.com/Trenches'
            }
        ],
        general: [
            {
                id: 'g3',
                title: 'Follow Trenches X Account',
                desc: "Follow Trenches on X and earn 5 points.",
                iconType: 'x',
                points: 5,
                status: 'open',
                url: 'https://x.com/Trenches'
            },
            {
                id: 'g4',
                title: 'Follow SprayTrenches Twitter',
                desc: 'Follow SprayTrenches on X for updates.',
                iconType: 'x',
                points: 5,
                status: 'open',
                url: 'https://x.com/Spraytrenches'
            },
            {
                id: 'g6',
                title: 'Join Trenches Discord',
                desc: "Join Trenches's Discord community and earn points!",
                iconType: 'discord',
                points: 5,
                status: 'open',
                url: 'https://discord.gg/Trenches'
            },
            {
                id: 'g7',
                title: 'Join Trenches TG Channel',
                desc: 'Join Trenches Telegram channel and earn points!',
                iconType: 'telegram',
                points: 5,
                status: 'open',
                url: 'https://t.me/Trenches'
            }
        ]
    },
    submissions: [],
    checkIn: persisted?.checkIn || {
        lastCheckIn: null,
        streak: 0,
        history: []
    },
    referral: persisted?.referral || {
        earned: 0,
        invited: []
    }
};

const icons = {
    x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
    discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.0991.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.6989.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6574a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>`
};

// Navigation
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);

    document.querySelectorAll('.bottom-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === id);
    });

    if (id === 'screen-missions') renderMissions();
    if (id === 'screen-dashboard') renderDashboard();
    if (id === 'screen-submissions') renderSubmissions();
    if (id === 'screen-earnings') { renderEarnings(); renderReferral(); }
    if (id === 'screen-daily') renderDaily();
    if (id === 'screen-referral') renderReferral();
}

function closeApp() {
    if (tg) tg.close();
}

// X connection
function connectX() {
    state.xConnected = true;
    state.user.name = '@TrenchesUser';
    state.user.initial = 'U';
    saveState();
    updateProfile();
    showToast('X account connected');
}

function updateProfile() {
    const nameEl = document.getElementById('user-name');
    const statusEl = document.getElementById('x-status');
    const initialEl = document.getElementById('user-initial');
    const btn = document.getElementById('connect-x-btn');

    if (nameEl) nameEl.textContent = state.user.name;
    if (initialEl) initialEl.textContent = state.user.initial;

    if (state.xConnected) {
        if (statusEl) statusEl.textContent = 'Verified · X connected';
        if (btn) {
            btn.textContent = 'X Connected';
            btn.disabled = true;
        }
    }
}

// Tabs
function switchTab(tab, btn) {
    document.querySelectorAll('.tab-bar .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(tab + '-panel').classList.add('active');
}

// Render dashboard
function renderDashboard() {
    const all = [...state.missions.daily, ...state.missions.general];
    const available = all.filter(m => m.status === 'open').length;
    const verifying = all.filter(m => m.status === 'verifying').length;
    const approved = all.filter(m => m.status === 'done').length;

    const availableEl = document.getElementById('stat-available');
    const verifyingEl = document.getElementById('stat-verifying');
    const approvedEl = document.getElementById('stat-approved');
    const pointsEl = document.getElementById('dashboard-points');

    if (availableEl) availableEl.textContent = available;
    if (verifyingEl) verifyingEl.textContent = verifying;
    if (approvedEl) approvedEl.textContent = approved;
    if (pointsEl) pointsEl.textContent = state.points;

    const dashboardMissions = document.getElementById('dashboard-missions');
    if (dashboardMissions) {
        const recommended = all.filter(m => m.status === 'open').slice(0, 3);
        dashboardMissions.innerHTML = recommended.length
            ? recommended.map(m => missionHTML(m)).join('')
            : `<p class="muted">No missions available right now.</p>`;
    }
}

// Render missions
function renderMissions() {
    const dailyList = document.getElementById('daily-list');
    const generalList = document.getElementById('general-list');
    if (!dailyList || !generalList) return;

    const dailyAvailable = state.missions.daily.filter(m => m.status === 'open').length;
    const generalAvailable = state.missions.general.filter(m => m.status === 'open').length;

    const dailyBadge = document.getElementById('daily-badge');
    const generalBadge = document.getElementById('general-badge');
    if (dailyBadge) dailyBadge.textContent = dailyAvailable;
    if (generalBadge) generalBadge.textContent = generalAvailable;

    dailyList.innerHTML = state.missions.daily.map(m => missionHTML(m)).join('');
    generalList.innerHTML = state.missions.general.map(m => missionHTML(m)).join('');
}

function missionHTML(m) {
    const icon = m.iconType === 'image'
        ? `<img src="${m.image}" alt="">`
        : icons[m.iconType] || icons.x;

    let action = '';
    if (m.status === 'verifying') {
        action = `<button class="pill warning" disabled>Verifying...</button>`;
    } else if (m.status === 'done') {
        action = `<button class="pill success" disabled>Done</button>`;
    } else {
        action = `<button class="pill" onclick="doMission('${m.id}')">GO</button>`;
    }

    return `
        <div class="mission-item">
            <div class="mission-icon">${icon}</div>
            <div class="mission-info">
                <div class="mission-title">${m.title}</div>
                <div class="mission-desc">${m.desc}</div>
            </div>
            <div class="mission-action">${action}</div>
        </div>
    `;
}

function doMission(id) {
    const all = [...state.missions.daily, ...state.missions.general];
    const mission = all.find(m => m.id === id);
    if (!mission || mission.status === 'verifying' || mission.status === 'done') return;

    mission.status = 'verifying';
    renderMissions();
    renderDashboard();

    state.submissions.unshift({
        title: mission.title,
        meta: `Started · ${new Date().toLocaleString()}`,
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

// Render submissions
function renderSubmissions() {
    const list = document.getElementById('submissions-list');
    if (!list) return;

    list.innerHTML = state.submissions.length
        ? state.submissions.map(s => `
            <div class="submission-item">
                <div>
                    <div class="submission-title">${s.title}</div>
                    <div class="submission-meta">${s.meta}</div>
                </div>
                <div class="status-badge ${s.status}">
                    <span class="status-dot"></span>
                    ${s.status === 'approved' ? 'Approved' : 'Verifying...'}
                </div>
            </div>
        `).join('')
        : `<p class="muted">No submissions yet. Complete a mission to get started.</p>`;
}

// Render earnings
function renderEarnings() {
    const pointsEl = document.getElementById('earnings-points');
    if (pointsEl) pointsEl.textContent = state.points;
}

// Daily check-in
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

    saveState();
    updatePoints();
    renderDaily();
    renderDashboard();

    showToast(`Checked in! +${reward} P`);
}

function renderDaily() {
    const streakEl = document.getElementById('streak-count');
    const btn = document.getElementById('checkin-btn');
    const calendar = document.getElementById('calendar');
    const rewardAmount = document.getElementById('reward-amount');

    if (streakEl) streakEl.textContent = state.checkIn.streak;

    if (btn) {
        if (!canCheckIn()) {
            btn.textContent = 'Claimed';
            btn.disabled = true;
            btn.classList.add('ghost');
        } else {
            btn.textContent = 'Check In';
            btn.disabled = false;
            btn.classList.remove('ghost');
        }
    }

    if (rewardAmount) {
        const bonus = state.checkIn.streak >= 7 ? 10 : 0;
        rewardAmount.textContent = `+${10 + bonus} P`;
    }

    if (calendar) {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d);
        }

        calendar.innerHTML = days.map(d => {
            const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' });
            const dayNum = d.getDate();
            const isClaimed = state.checkIn.history.includes(d.toDateString());
            return `<div class="calendar-day ${isClaimed ? 'claimed' : ''}">
                <span>${dayName}</span>
                <span class="day-num">${dayNum}</span>
            </div>`;
        }).join('');
    }
}

// Referrals
function getReferralLink() {
    return `https://t.me/spraytrenches_bot?start=ref_${getUserId()}`;
}

function renderReferral() {
    const link = getReferralLink();
    const pageInput = document.getElementById('referral-link-page');
    const earningsInput = document.getElementById('referral-link');
    const earnedEl = document.getElementById('referral-earned');
    const list = document.getElementById('invited-list');

    if (pageInput) pageInput.value = link;
    if (earningsInput) earningsInput.value = link;
    if (earnedEl) earnedEl.textContent = state.referral.earned;

    if (list) {
        list.innerHTML = state.referral.invited.length
            ? state.referral.invited.map(f => `
                <div class="submission-item">
                    <div>
                        <div class="submission-title">${f.name}</div>
                        <div class="submission-meta">Joined ${new Date(f.date).toLocaleDateString()}</div>
                    </div>
                    <div class="status-badge approved">
                        <span class="status-dot"></span>+${f.points}
                    </div>
                </div>
            `).join('')
            : `<p class="muted">No invites yet. Share your link to start earning.</p>`;
    }
}

function copyReferral() {
    navigator.clipboard.writeText(getReferralLink()).then(() => {
        showToast('Referral link copied');
    }).catch(() => {
        showToast('Copy failed');
    });
}

function copyReferralPage() {
    copyReferral();
}

function shareReferral() {
    const link = getReferralLink();
    const text = encodeURIComponent('Join Trenches and earn points together! 💚');
    const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${text}`;

    if (tg && tg.openTelegramLink) {
        tg.openTelegramLink(url);
    } else {
        window.open(url, '_blank');
    }
}

function handleIncomingReferral() {
    let ref = null;
    if (tg?.initDataUnsafe?.start_param && tg.initDataUnsafe.start_param.startsWith('ref_')) {
        ref = tg.initDataUnsafe.start_param.replace('ref_', '');
    } else {
        const params = new URLSearchParams(window.location.search);
        const start = params.get('start');
        if (start && start.startsWith('ref_')) {
            ref = start.replace('ref_', '');
        }
    }

    if (ref && ref !== getUserId()) {
        const seenKey = 'trenches_ref_seen_' + ref;
        try {
            if (!localStorage.getItem(seenKey)) {
                localStorage.setItem(seenKey, '1');
                showToast('Welcome! You were invited by a friend.');
            }
        } catch (e) {
            showToast('Welcome! You were invited by a friend.');
        }
    }
}

// Points
function updatePoints() {
    const dashboardPoints = document.getElementById('dashboard-points');
    const earningsPoints = document.getElementById('earnings-points');
    if (dashboardPoints) dashboardPoints.textContent = state.points;
    if (earningsPoints) earningsPoints.textContent = state.points;
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
        state.user.initial = (user.first_name?.[0] || user.username?.[0] || 'T').toUpperCase();
        updateProfile();
    }
}

// Init
function init() {
    loadTelegramUser();
    updateProfile();
    handleIncomingReferral();
    renderDashboard();
    renderMissions();
    renderSubmissions();
    renderEarnings();
    renderReferral();
    renderDaily();

    setTimeout(() => {
        showScreen('screen-dashboard');
    }, 2500);
}

init();
