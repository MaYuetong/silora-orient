/* ================================================================
   SILORA ORIENT — Dashboard Auth & Permissions
   Client-side authentication for internal team access control.

   Default admin:  username = yuetong   password = silora2026
   (Change via Manage Users → Edit after first login)
   ================================================================ */

const STORAGE_USERS   = 'silora-auth-users';
const STORAGE_SESSION = 'silora-session';
const SESSION_TTL_MS  = 8 * 60 * 60 * 1000; // 8 hours

// ── Panel registry ────────────────────────────────────────────────
const PANELS = {
  'panel-1': 'Project Status',
  'panel-2': 'Task Checklist',
  'panel-3': 'Sales Pipeline',
  'panel-4': 'Supplier Coord.',
  'panel-5': 'Strategy & Review',
  'panel-6': 'Product Catalog',
};

// ── Role presets ──────────────────────────────────────────────────
const ROLES = {
  admin:    { label: 'Admin',        panels: ['panel-1','panel-2','panel-3','panel-4','panel-5','panel-6'], canEdit: true,  canManageUsers: true  },
  manager:  { label: 'Manager',      panels: ['panel-1','panel-2','panel-3','panel-4','panel-5','panel-6'], canEdit: true,  canManageUsers: false },
  sales:    { label: 'Sales',        panels: ['panel-1','panel-3','panel-5'],                                canEdit: true,  canManageUsers: false },
  supplier: { label: 'Supplier',     panels: ['panel-4'],                                                    canEdit: true,  canManageUsers: false },
  viewer:   { label: 'View Only',    panels: ['panel-1','panel-3','panel-5'],                                canEdit: false, canManageUsers: false },
};

// ── Crypto ────────────────────────────────────────────────────────
async function _hash(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Storage ───────────────────────────────────────────────────────
function _getUsers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]'); } catch { return []; }
}
function _saveUsers(u) { localStorage.setItem(STORAGE_USERS, JSON.stringify(u)); }

function _getSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(STORAGE_SESSION) || 'null');
    if (!s || Date.now() > s.expires) { sessionStorage.removeItem(STORAGE_SESSION); return null; }
    return s;
  } catch { return null; }
}
function _saveSession(user) {
  sessionStorage.setItem(STORAGE_SESSION, JSON.stringify({ ...user, expires: Date.now() + SESSION_TTL_MS }));
}
function _clearSession() { sessionStorage.removeItem(STORAGE_SESSION); }

// ── Init ──────────────────────────────────────────────────────────
async function _initAuth() {
  // Seed default admin if no users exist
  if (_getUsers().length === 0) {
    const hash = await _hash('silora2026');
    _saveUsers([{
      username: 'yuetong',
      email: 'yuetongma0107@gmail.com',
      role: 'admin',
      passwordHash: hash,
      panels: Object.keys(PANELS),
      canEdit: true,
      canManageUsers: true,
      addedAt: new Date().toISOString()
    }]);
  }
  const session = _getSession();
  if (session) {
    _applyPermissions(session);
    _showDashboard(session);
  } else {
    _showLoginScreen();
  }
}

// ── Login ─────────────────────────────────────────────────────────
async function _attemptLogin(username, password) {
  const user = _getUsers().find(u => u.username.toLowerCase() === username.trim().toLowerCase());
  if (!user) return null;
  const hash = await _hash(password);
  return hash === user.passwordHash ? user : null;
}

// ── Permissions ───────────────────────────────────────────────────
function _applyPermissions(session) {
  const allowed  = Array.isArray(session.panels) ? session.panels : Object.keys(PANELS);
  const canEdit  = session.canEdit !== false;
  const isAdmin  = session.canManageUsers === true;

  Object.keys(PANELS).forEach(id => {
    if (!allowed.includes(id)) {
      const el = document.getElementById(id);
      const ng = document.getElementById('nav-group-' + id);
      if (el) el.style.display = 'none';
      if (ng) ng.style.display = 'none';
    }
  });

  if (!canEdit) {
    document.querySelectorAll('.quick-add, .log-add-form, .weekly-reset').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.task-btn:not(.undo), .funnel-count').forEach(el => {
      el.style.pointerEvents = 'none'; el.style.opacity = '0.4';
    });
    document.querySelectorAll('.task-check').forEach(el => {
      el.style.pointerEvents = 'none'; el.style.opacity = '0.5';
    });
  }

  const manageBtn = document.getElementById('btn-manage-users');
  if (manageBtn) manageBtn.style.display = isAdmin ? '' : 'none';
}

// ── Show/hide screens ─────────────────────────────────────────────
function _showLoginScreen() {
  document.getElementById('auth-overlay').style.display  = 'flex';
  document.getElementById('page-layout-wrapper').style.display = 'none';
  const eb = document.getElementById('export-bar');
  if (eb) eb.style.display = 'none';
}

function _showDashboard(session) {
  document.getElementById('auth-overlay').style.display  = 'none';
  document.getElementById('page-layout-wrapper').style.display = 'flex';
  const eb = document.getElementById('export-bar');
  if (eb) eb.style.display = 'flex';

  const info = document.getElementById('topbar-user-info');
  if (info) {
    info.textContent = session.username + '  ·  ' + (ROLES[session.role]?.label || session.role);
    info.style.display = '';
  }
}

// ── Logout ────────────────────────────────────────────────────────
function sAuth_logout() {
  _clearSession();
  location.reload();
}

// ── User management modal ─────────────────────────────────────────
function sAuth_openUserModal() {
  _renderUserTable();
  _renderRoleCheckboxes();
  document.getElementById('user-modal').style.display = 'flex';
}
function sAuth_closeUserModal() {
  document.getElementById('user-modal').style.display = 'none';
}

function _renderUserTable() {
  const tbody = document.getElementById('user-table-body');
  tbody.innerHTML = _getUsers().map(u => `
    <tr>
      <td style="font-weight:500;padding:9px 10px">${u.username}</td>
      <td style="padding:9px 10px;font-size:0.75rem;color:var(--text-light)">${u.email || '—'}</td>
      <td style="padding:9px 10px"><span class="badge badge-routine">${ROLES[u.role]?.label || u.role}</span></td>
      <td style="padding:9px 10px;font-size:0.72rem;color:var(--text-light);max-width:220px">${(u.panels||[]).map(p=>PANELS[p]||p).join(', ')}</td>
      <td style="padding:9px 10px;white-space:nowrap">
        ${u.role !== 'admin' ? `<button class="task-btn delete" onclick="sAuth_removeUser('${u.username}')">Remove</button>` : '<span style="font-size:0.7rem;color:var(--text-light)">Owner</span>'}
        <button class="task-btn" style="margin-left:4px" onclick="sAuth_openEditUser('${u.username}')">Edit</button>
      </td>
    </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-light);padding:16px;font-size:0.8rem">No users yet.</td></tr>';
}

function _renderRoleCheckboxes(role) {
  const defaults = (role && ROLES[role]) ? ROLES[role].panels : Object.keys(PANELS);
  const cont = document.getElementById('new-panel-checks');
  if (!cont) return;
  cont.innerHTML = Object.entries(PANELS).map(([id, label]) =>
    `<label style="display:flex;align-items:center;gap:6px;font-size:0.78rem;color:var(--text-mid);cursor:pointer;padding:3px 0">
      <input type="checkbox" value="${id}" ${defaults.includes(id)?'checked':''} style="accent-color:var(--gold);width:14px;height:14px" />
      ${label}
    </label>`
  ).join('');
}

function sAuth_updateRoleDefaults() {
  const role = document.getElementById('new-role').value;
  _renderRoleCheckboxes(role);
}

async function sAuth_addUser() {
  const username = document.getElementById('new-username').value.trim();
  const email    = document.getElementById('new-email').value.trim();
  const password = document.getElementById('new-password').value;
  const role     = document.getElementById('new-role').value;
  const errEl    = document.getElementById('add-user-error');

  errEl.style.display = 'none';
  if (!username || !password) { errEl.textContent = 'Username and password are required.'; errEl.style.display='block'; return; }
  if (password.length < 6)    { errEl.textContent = 'Password must be at least 6 characters.'; errEl.style.display='block'; return; }

  const users = _getUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    errEl.textContent = 'Username already exists.'; errEl.style.display='block'; return;
  }

  const checkedPanels = Array.from(document.querySelectorAll('#new-panel-checks input:checked')).map(cb => cb.value);
  const panels = checkedPanels.length ? checkedPanels : ROLES[role]?.panels || Object.keys(PANELS);
  const hash = await _hash(password);

  users.push({ username, email, role, passwordHash: hash, panels,
               canEdit: role !== 'viewer', canManageUsers: role === 'admin',
               addedAt: new Date().toISOString() });
  _saveUsers(users);
  _renderUserTable();

  document.getElementById('new-username').value = '';
  document.getElementById('new-email').value    = '';
  document.getElementById('new-password').value = '';
  if (typeof showToast === 'function') showToast(`User "${username}" added ✓`);
}

function sAuth_removeUser(username) {
  if (!confirm(`Remove user "${username}"? This cannot be undone.`)) return;
  _saveUsers(_getUsers().filter(u => u.username !== username));
  _renderUserTable();
  if (typeof showToast === 'function') showToast(`User "${username}" removed`);
}

// ── Edit user modal ───────────────────────────────────────────────
function sAuth_openEditUser(username) {
  const user = _getUsers().find(u => u.username === username);
  if (!user) return;
  document.getElementById('edit-user-name').textContent = username;
  document.getElementById('edit-username-hidden').value = username;
  document.getElementById('edit-role').value = user.role;
  document.getElementById('edit-password').value = '';
  document.getElementById('edit-user-error').style.display = 'none';
  _renderEditPanelChecks(user);
  document.getElementById('edit-user-modal').style.display = 'flex';
}
function sAuth_closeEditModal() {
  document.getElementById('edit-user-modal').style.display = 'none';
}

function sAuth_updateEditRoleDefaults() {
  const role = document.getElementById('edit-role').value;
  const defaults = ROLES[role]?.panels || Object.keys(PANELS);
  document.querySelectorAll('#edit-panel-checks input').forEach(cb => {
    cb.checked = defaults.includes(cb.value);
  });
}

function _renderEditPanelChecks(user) {
  const cont = document.getElementById('edit-panel-checks');
  if (!cont) return;
  cont.innerHTML = Object.entries(PANELS).map(([id, label]) =>
    `<label style="display:flex;align-items:center;gap:6px;font-size:0.78rem;color:var(--text-mid);cursor:pointer;padding:3px 0">
      <input type="checkbox" value="${id}" ${(user.panels||[]).includes(id)?'checked':''} style="accent-color:var(--gold);width:14px;height:14px" />
      ${label}
    </label>`
  ).join('');
}

async function sAuth_saveEditUser() {
  const username = document.getElementById('edit-username-hidden').value;
  const newRole  = document.getElementById('edit-role').value;
  const newPass  = document.getElementById('edit-password').value;
  const errEl    = document.getElementById('edit-user-error');
  errEl.style.display = 'none';

  if (newPass && newPass.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; errEl.style.display='block'; return; }

  const panels = Array.from(document.querySelectorAll('#edit-panel-checks input:checked')).map(cb => cb.value);
  const users  = _getUsers();
  const idx    = users.findIndex(u => u.username === username);
  if (idx === -1) return;

  users[idx].role           = newRole;
  users[idx].panels         = panels;
  users[idx].canEdit        = newRole !== 'viewer';
  users[idx].canManageUsers = newRole === 'admin';
  if (newPass) users[idx].passwordHash = await _hash(newPass);

  _saveUsers(users);
  sAuth_closeEditModal();
  _renderUserTable();
  if (typeof showToast === 'function') showToast(`User "${username}" updated ✓`);
}

// ── DOMContentLoaded ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await _initAuth();

  document.getElementById('login-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errEl    = document.getElementById('login-error');
    const btn      = document.getElementById('login-btn');

    btn.disabled = true; btn.textContent = 'Signing in…';
    const user = await _attemptLogin(username, password);
    if (user) {
      _applyPermissions(user);
      _saveSession(user);
      _showDashboard(user);
    } else {
      errEl.textContent = 'Incorrect username or password.';
      errEl.style.display = 'block';
      btn.disabled = false; btn.textContent = 'Sign In';
    }
  });
});
