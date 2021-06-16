const sgMail = require('@sendgrid/mail')
require('dotenv').config()

class CreateSenderSendGrid {
  async send(msg) {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      console.log('Email sent')
      return await sgMail.send({
        ...msg,
        from: `Good Job System <${process.env.EMAIL}>`,
      })
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = CreateSenderSendGrid
