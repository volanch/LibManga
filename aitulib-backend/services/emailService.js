const nodemailer = require('nodemailer')

let transporter = null

const buildTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 0)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !port || !user || !pass) return null

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

const getTransporter = () => {
  if (!transporter) transporter = buildTransporter()
  return transporter
}

const sendMail = async ({ to, subject, text, html }) => {
  const t = getTransporter()
  if (!t) {
    return { skipped: true }
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const info = await t.sendMail({ from, to, subject, text, html })
  return { skipped: false, messageId: info.messageId }
}

const sendWelcomeEmail = async ({ to, username }) => {
  const subject = 'Welcome to AituLIB'
  const text = `Hello ${username}!\n\nYour account has been created successfully.\n\n— AituLIB`
  const html = `<p>Hello <b>${username}</b>!</p><p>Your account has been created successfully.</p><p>— AituLIB</p>`
  return sendMail({ to, subject, text, html })
}

const sendRoleChangedEmail = async ({ to, username, role }) => {
  const subject = 'Your role was updated'
  const text = `Hello ${username}!\n\nYour role is now: ${role}.\n\n— AituLIB`
  const html = `<p>Hello <b>${username}</b>!</p><p>Your role is now: <b>${role}</b>.</p><p>— AituLIB</p>`
  return sendMail({ to, subject, text, html })
}

const sendPremiumSubscriptionEmail = async ({ to, username, mangaTitle }) => {
  const subject = 'Subscription confirmed'
  const text = `Hello ${username}!\n\nYou subscribed to updates for: ${mangaTitle}.\n\n— AituLIB`
  const html = `<p>Hello <b>${username}</b>!</p><p>You subscribed to updates for: <b>${mangaTitle}</b>.</p><p>— AituLIB</p>`
  return sendMail({ to, subject, text, html })
}

const sendSigninEmail = async ({ to, username, role }) => {
  const subject = 'Sign-in alert'
  const text = `Hello ${username}!\n\nYou just signed in. Role: ${role}.\n\nIf this was not you, please reset your password.\n\n— AituLIB`
  const html = `<p>Hello <b>${username}</b>!</p><p>You just signed in. Role: <b>${role}</b>.</p><p>If this was not you, please reset your password.</p><p>— AituLIB</p>`
  return sendMail({ to, subject, text, html })
}

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendRoleChangedEmail,
  sendPremiumSubscriptionEmail,
  sendSigninEmail,
}
