import type { Todo } from '@/features/todo-list/todo';

export const getTodoList = async (
  params?: Partial<Pick<Todo, 'title' | 'completed'>>
): Promise<Todo[]> => {
  const url = new URL('http://localhost:3000/todos');

  if (params?.title) {
    url.searchParams.append('title_like', params.title);
  }

  if (params?.completed !== undefined) {
    url.searchParams.append('completed', params.completed.toString());
  }

  const response = await fetch(url.toString());
  return await response.json();
};

export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return await response.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return await response.json();
};

export const deleteTodo = async (todoId: Todo['id']): Promise<void> => {
  const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
