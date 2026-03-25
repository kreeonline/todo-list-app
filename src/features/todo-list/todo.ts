import z from 'zod';
import { supabase } from '@/lib/supabase-client';

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
  const query = supabase
    .from('todos')
    .select()
    .ilike('title', `%${params?.title}%`);

  if (params?.title) {
    query.ilike('title', `%${params.title}%`);
  }

  if (params?.completed) {
    query.eq('completed', params.completed);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<void> => {
  const { error } = await supabase.from('todos').insert(todo);

  if (error) throw error;
  return;
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  const { error } = await supabase.from('todos').update(todo).eq('id', todo.id);

  if (error) throw error;
  return;
};

export const deleteTodo = async (todoId: Todo['id']): Promise<void> => {
  const { error } = await supabase.from('todos').delete().eq('id', todoId);

  if (error) throw error;
  return;
};
