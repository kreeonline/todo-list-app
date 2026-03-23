import { createContext, useContext } from 'react';
import { useTodoList } from '@/features/todo-list/todo-list.hook';

export const TodoListContext = createContext<
  ReturnType<typeof useTodoList> | undefined
>(undefined);

export const useTodoListContext = () => {
  const context = useContext(TodoListContext);
  if (context === undefined) {
    throw new Error('useTodoListContext must be used within a TodoListContext');
  }
  return context;
};
