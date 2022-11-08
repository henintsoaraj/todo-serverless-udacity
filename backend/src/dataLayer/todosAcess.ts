/**
 * Module to handle all logic for todos access.
 */
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// Import todoItem table interface model for type-safety.
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../utils/logger'


const logger = createLogger('TodosAccess')
const XAWS = AWSXRay.captureAWS(AWS)


export class TodosAccess {
	// Set initial values.
	constructor(
		private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
		private readonly TodosTable = process.env.TODOS_TABLE,
		private readonly TodosIndex = process.env.TODOS_CREATED_AT_INDEX
	) { }

	async createTodo(todo: TodoItem): Promise<TodoItem> {
		logger.info(`Create Todo item: ${todo.name}`)

		const params = {
			TableName: this.TodosTable,
			Item: todo
		}

		await this.docClient.put(params).promise()

		return todo
	}

	// async getAllTodos(): Promise<TodoItem[]> {
	// 	logger.info('All todos')

	// 	const result = await this.docClient.scan({
	// 		TableName: this.TodosTable
	// 	}).promise()

	// 	return result.Items as TodoItem[]
	// }

	async getTodos(userId): Promise<TodoItem[]> {
		logger.info(`Get user Todo Items userId: ${userId}`)

		const params = {
			TableName: this.TodosTable,
			IndexName: this.TodosIndex,
			KeyConditionExpression: 'userId = :userId',
			ScanIndexForward: false,
			ExpressionAttributeValues: {
				':userId': userId
			}
		}

		const result = await this.docClient.query(params).promise()
		return result.Items as TodoItem[]
	}

	async getTodo(userId, todoId): Promise<TodoItem> {
		logger.info(`Get a user Todo userId: ${userId}`)

		const params = {
			TableName: this.TodosTable,
			Key: {
				userId,
				todoId
			}
		}

		const result = await this.docClient.get(params).promise()
		return result.Item as TodoItem
	}

	async updateTodo(userId, todoId, updatedTodo): Promise<any> {
		logger.info(`Update Todo item userId: ${userId}, todoId: ${todoId}`);

		const params = {
			TableName: this.TodosTable,
			Key: {
				todoId,
				userId
			},
			UpdateExpression: 'set #name = :n, #dueDate = :due, #done = :d',
			ExpressionAttributeValues: {
				':n': updatedTodo.name,
				':due': updatedTodo.dueDate,
				':d': updatedTodo.done
			},
			ExpressionAttributeNames: {
				'#name': 'name',
				'#dueDate': 'dueDate',
				'#done': 'done'
			}
		}

		await this.docClient.update(params).promise()
	}

	// async updateTodoImage(todoId, userId, imageUrl): Promise<any> {
	// 	logger.info(`Update todo image URL userId: ${userId}, todoId: ${todoId}, imageUrl: ${imageUrl}`);

	// 	const params = {
	// 		TableName: this.TodosTable,
	// 		Key: {
	// 			todoId,
	// 			userId
	// 		},
	// 		UpdateExpression: 'set #attachmentUrl = :n',
	// 		ExpressionAttributeValues: {
	// 			':n': imageUrl,
	// 		},
	// 		ExpressionAttributeNames: {
	// 			'#attachmentUrl': 'attachmentUrl'
	// 		}
	// 	}

	// 	await this.docClient.update(params).promise()
	// }

	async deleteTodo(userId, todoId): Promise<any> {
		logger.info(`Delete Todo item userId: ${userId}, todoId: ${todoId}`);

		const params = {
			TableName: this.TodosTable,
			Key: {
				userId,
				todoId
			}
		}

		await this.docClient.delete(params).promise()
	}
}
