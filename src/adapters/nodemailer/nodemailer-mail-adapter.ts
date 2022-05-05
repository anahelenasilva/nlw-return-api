import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1f83651cf40d1a",
        pass: "f75d7cb5eac6e0"
    }
})

export default class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData): Promise<void> {
        await transport.sendMail({
            from: 'Ana Helena <oi@ana.com>',
            to: 'Ana Helena <anahelenarp@hotmail.com>',
            subject,
            html: body
        })
    }
}
