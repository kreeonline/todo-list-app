import z from 'zod';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const titleMinLength = 3;

export const addTodoFormSchema = z.object({
  title: z.string({ error: 'Title must be string.' }).min(3, {
    error: `Title must be at lease ${titleMinLength}  character(s).`,
  }),
  completed: z.boolean({ error: 'Completed must be boolean.' }),
});

export type AddTodoFormSchema = z.infer<typeof addTodoFormSchema>;

export const defaultAddTodoFormValues: AddTodoFormSchema = {
  title: '',
  completed: false,
};

export const todoQueryKeys = {
  all: ['todos'] as const,
  search: (title: Todo['title']) => {
    return title ? ([...todoQueryKeys.all, title] as const) : todoQueryKeys.all;
  },
};

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
