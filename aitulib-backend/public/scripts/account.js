const $ = (id) => document.getElementById(id)

const msg = (text = '', type = '') => {
    const el = $('msg')
    el.textContent = text
    el.className = 'acc-msg'
    if (type) el.classList.add(type)
}

const getSession = () => {
    const token = localStorage.getItem('accessToken')
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return { token, user }
}

const requireLogin = () => {
    const { token, user } = getSession()
    if (!token || !user) {
        window.location.href = '/signin'
        return null
    }
    return { token, user }
}

const fillProfile = (user) => {
    $('pUsername').textContent = user.username || '—'
    $('pEmail').textContent = user.email || '—'
    $('pRole').textContent = user.role || '—'
    $('pId').textContent = user.id || '—'
}

async function refreshFromApi() {
    const sess = requireLogin()
    if (!sess) return

    msg('Refreshing...', 'info')

    const res = await fetch(`/api/users/${encodeURIComponent(sess.user.id)}`, {
        headers: { Authorization: `Bearer ${sess.token}` },
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
        msg((data && data.message) || 'Failed to refresh profile.', 'error')
        return
    }

    const updated = {
        id: data._id || sess.user.id,
        username: data.username || sess.user.username,
        email: data.email || sess.user.email,
        role: data.role || sess.user.role,
    }

    localStorage.setItem('user', JSON.stringify(updated))
    fillProfile(updated)
    msg('Profile updated.', 'ok')
}

async function changePassword(event) {
    event.preventDefault()
    const sess = requireLogin()
    if (!sess) return

    const oldPassword = $('oldPassword').value.trim()
    const newPassword = $('newPassword').value.trim()
    const confirmNewPassword = $('confirmNewPassword').value.trim()

    if (!oldPassword || !newPassword) {
        msg('Old and new password are required.', 'error')
        return
    }

    if (newPassword.length < 6) {
        msg('New password must be at least 6 characters.', 'error')
        return
    }

    if (newPassword !== confirmNewPassword) {
        msg('New passwords do not match.', 'error')
        return
    }

    msg('Updating password...', 'info')

    const res = await fetch(
        `/api/users/${encodeURIComponent(sess.user.id)}/change-password`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sess.token}`,
            },
            body: JSON.stringify({
                // old password variants
                oldPassword,
                currentPassword: oldPassword,
                password: oldPassword,

                // new password variants
                newPassword,
                new_password: newPassword,

                // confirm variants
                confirmPassword: newPassword,
                confirmNewPassword: newPassword,
            }),
        },
    )

    // read raw response so we can see exact backend error
    const raw = await res.text()
    console.log('CHANGE PASSWORD STATUS:', res.status)
    console.log('CHANGE PASSWORD RESPONSE:', raw)

    let data = null
    try {
        data = JSON.parse(raw)
    } catch {}

    if (!res.ok) {
        msg((data && data.message) || 'Password update failed.', 'error')
        return
    }

    $('pwdForm').reset()
    msg('Password updated successfully.', 'ok')
}

function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('login')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user_email')
    window.location.href = '/signin'
}

window.addEventListener('DOMContentLoaded', () => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar && document.getElementById("account")) {
        document.getElementById("account").src = savedAvatar;
    }
    const sess = requireLogin()
    if (!sess) return

    fillProfile(sess.user)

    $('refreshBtn')?.addEventListener('click', refreshFromApi)
    $('pwdForm')?.addEventListener('submit', changePassword)
    $('logoutBtn')?.addEventListener('click', logout)
})
