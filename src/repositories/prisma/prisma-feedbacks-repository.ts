import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from '../feedbacks-repository';

export class PrismaFeedbackRepository implements FeedbacksRepository {

    async create(data: FeedbackCreateData): Promise<void> {
        const { comment, type, screenshot } = data
        await prisma.feedback.create({
            data: {
                comment,
                type,
                screenshot
            }
        })
    }

}