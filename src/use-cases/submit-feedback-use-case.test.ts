import SubmitFeedbackUseCase from "./submit-feedback-use-case"

const sut = new SubmitFeedbackUseCase(
    { create: async () => { } },
    { sendMail: async () => { } },
)

describe('Submit Feedback UseCase', () => {
    it('should be able to submit a feedback', async () => {
        await expect(sut.execute({
            comment: 'Test',
            type: 'BUG',
            screenshot: 'data:image/png;base64,798ds7f987d987f98d'
        })).resolves.not.toThrow()
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