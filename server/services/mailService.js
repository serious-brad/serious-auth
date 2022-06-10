import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      secure: true,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        pass: process.env.SMTP_PASSWORD_YA,
        user: process.env.SMTP_USER
      }
    })
  }

  async sendActivationMail(to, link) {
    console.log('\x1b[44m%s\x1b[0m', 'mailService.js line:17 MailSended', to, link);

    //   const url = process.env.API_URL + '/api/activate/' + link;
    //   await this.transporter.sendMail({
    //     from: process.env.SMTP_USER,
    //     to,
    //     subject: 'Активация аккаунта',
    //     html: `<h1>Для активации перейдите по ссылке:</h1><a href=${url}>${url}</a>`
    //   })
    //   console.log('Mail sended activation')
  }
}

export default new MailService();
