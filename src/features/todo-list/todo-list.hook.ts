import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addTodo,
  addTodoFormSchema,
  defaultAddTodoFormValues,
  deleteTodo,
  getTodoList,
  getTodoQueryKey,
  todoQueryKey,
  updateTodo,
  type AddTodoFormSchema,
  type Todo,
} from '@/lib/todo';

export const useTodoList = () => {
  const queryClient = useQueryClient();

  const deleteTodoState = useState<Todo | null>(null);
  const [_deleteTodo, setDeleteTodo] = deleteTodoState;

  const todoQuery = useQuery<Todo[]>({
    queryKey: getTodoQueryKey(),
    queryFn: async () => getTodoList(),
  });

  const addTodoMutation = useMutation({
    mutationFn: async (todo: Omit<Todo, 'id'>) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [todoQueryKey] });
      form.reset();
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async (todo: Todo) => updateTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [todoQueryKey] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (todoId: Todo['id']) => deleteTodo(todoId),
    onSuccess: () => {
      setDeleteTodo(null);
      queryClient.invalidateQueries({ queryKey: [todoQueryKey] });
    },
  });

  const form = useForm<AddTodoFormSchema>({
    resolver: zodResolver(addTodoFormSchema),
    defaultValues: defaultAddTodoFormValues,
  });

  const onSubmit = (value: AddTodoFormSchema) => {
    addTodoMutation.mutate(value);
  };

  return {
    form,
    deleteTodoState,
    todoQuery,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    onSubmit,
  };
};
