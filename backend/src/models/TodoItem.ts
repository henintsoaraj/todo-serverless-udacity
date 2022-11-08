/**
 * Interface to define fileds/ data for todo item
 * Used to imp-lement type-safe code.
 */

export interface TodoItem {
  userId: string
  todoId: string
  createdAt: string
  name: string
  dueDate: string
  done: boolean
  attachmentUrl?: string
}
