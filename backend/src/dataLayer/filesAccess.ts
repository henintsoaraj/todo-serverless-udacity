/**
 * Module to handle all logic for files access.
 */
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'


const logger = createLogger('TodosAccess')
const XAWS = AWSXRay.captureAWS(AWS)

export class FilesAccess {
	// Set initial values.
	constructor(
		private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
		private readonly TodosTable = process.env.TODOS_TABLE,
	) { }

	async updateTodoImage(todoId, userId, imageUrl): Promise<any> {
		logger.info(`Update todo image URL userId: ${userId}, todoId: ${todoId}, imageUrl: ${imageUrl}`);

		const params = {
			TableName: this.TodosTable,
			Key: {
				todoId,
				userId
			},
			UpdateExpression: 'set #attachmentUrl = :n',
			ExpressionAttributeValues: {
				':n': imageUrl,
			},
			ExpressionAttributeNames: {
				'#attachmentUrl': 'attachmentUrl'
			}
		}

		await this.docClient.update(params).promise()
	}
}