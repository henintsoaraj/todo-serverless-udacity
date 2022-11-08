/**
 * Todo Business logic
 */

// Import todoAccess class which has logic for todos.
import { TodosAccess } from '../dataLayer/todosAcess'
// Import todoItem table interface model for type-safety.
import { TodoItem } from '../models/TodoItem'

// Import todo item request interface for type-safety.
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

// import { AttachmentUtils } from './attachmentUtils';
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'


// Create a new class instance/ object.
const todoAccess = new TodosAccess()
const logger = createLogger('TodosAccess')

export async function createTodo(CreateTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
	try {
		logger.info(`Create Todo, name: ${CreateTodoRequest.name}`)

		// Call data layer method
		return await todoAccess.createTodo({
			todoId: uuid.v4(),
			userId: userId,
			createdAt: new Date().toISOString(),
			done: false,
			...CreateTodoRequest
		})
	} catch (err) {
		createError(`Error: Create Todo, name: ${CreateTodoRequest.name}`)
	}
}

export async function getTodos(userId: string): Promise<TodoItem[]> {
	logger.info(`Get todos for user, userId: ${userId}`)

	return await todoAccess.getTodos(userId);
}

export async function updateTodo(todoId: string, userId: string, updateTodoRequest: UpdateTodoRequest): Promise<any> {
	// Check if todo belongs to user
	if (!(todoAccess.getTodo(userId, todoId))) {
		return false;
	}

	logger.info(`Update user todo, userId: ${userId}, todoId: ${todoId}`);

	// Call data layer method
	await todoAccess.updateTodo(userId, todoId, updateTodoRequest)
	return true;
}

export async function deleteTodo(todoId: string, userId: string): Promise<any> {
	// Check if todo belongs to user
	if (!(todoAccess.getTodo(userId, todoId))) {
		return false;
	}

	logger.info(`Deleting Todo, userId: ${userId}, todoId: ${todoId}`)

	// Call data layer method
	await todoAccess.deleteTodo(userId, todoId)
	return true;
}