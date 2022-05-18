import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "62e48a7b52093b",
    pass: "440dcfbf0ef827"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <feedback@mailtrap.io>',
      to: 'Paulo Rios <victorios.ba@gmail.com>',
      subject,
      html: body
    });
  }
}