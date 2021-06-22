const Mailgen = require('mailgen')

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break

      case 'production':
        this.link = 'link fro production'
        break
      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplateVerificationEmail(verifyToken, name) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'Good Job System',
        link: this.link,
      },
    })

    const email = {
      body: {
        name,
        intro:
          "Welcome to Good Job System! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with Good Job System, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }
    return mailGenerator.generate(email)
  }
  async sendVerifyEmail(verifyToken, email) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, email)
    const msg = {
      to: email,
      subject: 'Verify your account',
      html: emailHtml,
    }
    const result = await this.sender.send(msg)
    console.log(result)
  }
}

module.exports = EmailService
