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
  const subject = '🎉 Welcome to AituLIB – Registration Successful!'
  const text = `Hello ${username}!\n\nCongratulations! Your account has been successfully registered on AituLIB.\n\nYou can now explore our vast collection of manga, create your reading lists, and join our community.\n\nThank you for joining us!\n\n— The AituLIB Team`
  const html = `
    <div style="font-family: 'Space Grotesk', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a2942 0%, #0a1929 100%); color: #e3f2fd; padding: 40px 30px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 60px; height: 60px; border-radius: 16px; background: linear-gradient(135deg, #4a9eff, #2e7bd6); color: #ffffff; line-height: 60px; font-size: 28px; font-weight: 700; margin-bottom: 15px;">AL</div>
        <h1 style="margin: 0; font-size: 28px; color: #e3f2fd;">Welcome to AituLIB!</h1>
      </div>
      
      <div style="background: rgba(42, 60, 87, 0.6); padding: 25px; border-radius: 12px; border: 1px solid rgba(90, 142, 194, 0.3); margin-bottom: 25px;">
        <p style="margin: 0 0 15px 0; font-size: 18px;">Hello <strong>${username}</strong>! 🎉</p>
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #b0c7d6;">
          Congratulations! Your account has been <strong style="color: #51cf66;">successfully registered</strong> on AituLIB.
        </p>
        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #b0c7d6;">
          You can now explore our vast collection of manga, create your reading lists, and join our community of manga enthusiasts.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.APP_URL || 'http://localhost:3000'}" style="display: inline-block; background: linear-gradient(135deg, #4a9eff, #2e7bd6); color: #ffffff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">Start Reading</a>
      </div>
      
      <p style="margin-top: 30px; text-align: center; font-size: 14px; color: #7a9ab5;">
        Thank you for joining us!<br/>
        <strong>— The AituLIB Team</strong>
      </p>
    </div>
  `
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
