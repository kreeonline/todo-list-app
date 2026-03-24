import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDebounceValue } from 'usehooks-ts';
import {
  addTodo,
  addTodoFormSchema,
  defaultAddTodoFormValues,
  deleteTodo,
  getTodoList,
  todoQueryKeys,
  updateTodo,
  type AddTodoFormSchema,
  type Todo,
} from '@/features/todo-list/todo';

export const useTodoList = () => {
  const deleteTodoState = useState<Todo | null>(null);
  const [_deleteTodo, setDeleteTodo] = deleteTodoState;

  const form = useForm<AddTodoFormSchema>({
    resolver: zodResolver(addTodoFormSchema),
    defaultValues: defaultAddTodoFormValues,
  });

  const searchTodos = useWatch({ control: form.control, name: 'title' });
  const [debounceSearchTodos] = useDebounceValue(searchTodos, 300);

  const todoQuery = useQuery<Todo[]>({
    queryKey: todoQueryKeys.search(debounceSearchTodos),
    queryFn: async () => getTodoList({ title: debounceSearchTodos }),
    meta: {
      errorMessage: 'Unable to fetch todo list',
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => form.reset(),
    meta: {
      successMessage: `Todo added successfully`,
      errorMessage: `Unable to add todo`,
      invalidates: [todoQueryKeys.all],
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async (todo: Todo) => updateTodo(todo),
    meta: {
      successMessage: `Todo updated successfully`,
      errorMessage: `Unable to update todo`,
      invalidates: [todoQueryKeys.all],
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => setDeleteTodo(null),
    meta: {
      successMessage: `Todo deleted successfully`,
      errorMessage: `Unable to delete todo`,
      invalidates: [todoQueryKeys.all],
    },
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
