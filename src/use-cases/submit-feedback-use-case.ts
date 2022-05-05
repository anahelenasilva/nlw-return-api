import { MailAdapter } from '../adapters/mail-adapter'
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export default class SubmitFeedbackUseCase {
    constructor(
        private readonly feedbackRepository: FeedbacksRepository,
        private readonly mailAdapter: MailAdapter) { }

    async execute({ comment, type, screenshot }: SubmitFeedbackUseCaseRequest) {
        await this.feedbackRepository.create({
            comment,
            type,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div>`,
                `<p>Tipo feedback: ${type}`,
                `<p>Comentário: ${comment}`,
                `</div>`
            ].join('\n')
        })
    }
}
