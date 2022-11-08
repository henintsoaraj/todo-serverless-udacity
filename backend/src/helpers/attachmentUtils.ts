import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'


const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('AttachmentUtils')

const s3 = new XAWS.S3({
	signatureVersion: 'v4'
})

// TODO: Implement the fileStorage logic
export class AttachmentUtils {
	constructor(
		private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
		private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
	) { }

	async generatePreSignedUrl(todoId, userId): Promise<String> {
		logger.info(`Generating Image presigned URL for,  userId: ${userId}, todoId: ${todoId}`)

		return s3.getSignedUrl('putObject', {
			Bucket: this.bucketName,
			Key: `images/${todoId}`,
			Expires: parseInt(this.urlExpiration)
		})
	}
}
