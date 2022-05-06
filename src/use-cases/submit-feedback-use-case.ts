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
        if (!type) {
            throw new Error('Type is required')
        }
        if (!comment) {
            throw new Error('Comment is required')
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format')
        }
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
                screenshot ? `<img src=${screenshot} />` : null,
                `</div>`
            ].join('\n')
        })
    }
}
