import type { Todo } from '@/features/todo-list/todo';
import { supabase } from '@/lib/supabase-client';

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
