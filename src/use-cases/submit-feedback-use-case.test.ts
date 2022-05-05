import SubmitFeedbackUseCase from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()
const sut = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
)

describe('Submit Feedback UseCase', () => {
    it('should be able to submit a feedback', async () => {
        await expect(sut.execute({
            comment: 'Test',
            type: 'BUG',
            screenshot: 'data:image/png;base64,798ds7f987d987f98d'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    it('should not be able to submit a feedback without type', async () => {
        await expect(sut.execute({
            comment: 'Test',
            type: '',
            screenshot: 'data:image/png;base64,798ds7f987d987f98d'
        })).rejects.toThrow()
    })
    it('should not be able to submit a feedback without commment', async () => {
        await expect(sut.execute({
            comment: '',
            type: 'BUG',
            screenshot: 'data:image/png;base64,798ds7f987d987f98d'
        })).rejects.toThrow()
    })
    it('should not be able to submit a feedback with invalid screenshot', async () => {
        await expect(sut.execute({
            comment: 'Test',
            type: 'BUG',
            screenshot: 'test.png'
        })).rejects.toThrow()
    })
})