const $ = (id) => document.getElementById(id)

const msg = (text = '', type = '') => {
    const el = $('msg')
    el.textContent = text
    el.className = 'users-msg'
    if (type) el.classList.add(type)
}

const getSession = () => {
    const token = localStorage.getItem('accessToken')
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return { token, user }
}

const fmtDate = (iso) => {
    if (!iso) return '—'
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString()
}

const escapeHtml = (s) =>
    String(s ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')

const renderUsers = (users, selfId) => {
    const tbody = $('usersTbody')
    tbody.innerHTML = ''

    users.forEach((u) => {
        const tr = document.createElement('tr')

        const canDelete = String(u._id) !== String(selfId)

        tr.innerHTML = `
      <td>${escapeHtml(u.username || '—')}</td>
      <td>${escapeHtml(u.email || '—')}</td>
      <td><span class="role-pill">${escapeHtml(u.role || '—')}</span></td>
      <td>${escapeHtml(fmtDate(u.createdAt))}</td>
      <td class="right">
        ${
            canDelete
                ? `<button class="u-btn danger" data-del="${escapeHtml(u._id)}">Delete</button>`
                : `<span style="opacity:.6">—</span>`
        }
      </td>
    `
        tbody.appendChild(tr)
    })

    $('count').textContent = `${users.length} users`
}

const requireAdmin = () => {
    const { token, user } = getSession()

    if (!token || !user) {
        window.location.href = '/signin' // у тебя есть route /signin
        return null
    }

    $('roleBadge').textContent = `role: ${user.role || '—'}`

    if (user.role !== 'admin') {
        msg('Forbidden: only admin can open users list.', 'error')
        return null
    }

    return { token, user }
}

async function loadUsers() {
    const sess = requireAdmin()
    if (!sess) return

    msg('Loading...', 'info')

    const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${sess.token}` },
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
        msg((data && data.message) || 'Failed to load users', 'error')
        return
    }

    renderUsers(data, sess.user.id)
    msg('Loaded.', 'ok')
}

async function deleteUser(userId) {
    const sess = requireAdmin()
    if (!sess) return

    if (String(userId) === String(sess.user.id)) {
        msg('You cannot delete yourself.', 'error')
        return
    }

    const ok = confirm('Delete this user?')
    if (!ok) return

    msg('Deleting...', 'info')

    const res = await fetch(`/api/users/${encodeURIComponent(userId)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sess.token}` },
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
        msg((data && data.message) || 'Delete failed', 'error')
        return
    }

    msg('User deleted.', 'ok')
    await loadUsers()
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-del]')
    if (!btn) return
    deleteUser(btn.getAttribute('data-del'))
})

window.addEventListener('DOMContentLoaded', () => {
    $('refreshBtn')?.addEventListener('click', loadUsers)
    loadUsers()

    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar && document.getElementById("account")) {
        document.getElementById("account").src = savedAvatar;
    }
})
