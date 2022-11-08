/**
 * Files Business logic
 */

// Import todoAccess class which has logic for todos
import { FilesAccess } from '../dataLayer/filesAccess'
import { createLogger } from '../utils/logger'
import { AttachmentUtils } from '../helpers/attachmentUtils';

// Create a new class instance/ object
const filesAccess = new FilesAccess()
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils();

export async function createPresignedUrl(todoId: string, userId: string): Promise<any> {
	logger.info(`Create attachment, userId: ${userId}, todoId: ${todoId}`)

	await filesAccess.updateTodoImage(
		todoId,
		userId,
		`https://${process.env.ATTACHMENT_S3_BUCKET}.s3.amazonaws.com/images/${todoId}`
	);

	return await attachmentUtils.generatePreSignedUrl(todoId, userId);
}
