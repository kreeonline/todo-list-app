import type { ComponentProps } from 'react';
import { TodoItem } from '@/features/todo-list/todo-item';
import { TodoListEmpty } from '@/features/todo-list/todo-list-empty';
import { useTodoListContext } from '@/features/todo-list/todo-list.context';
import { TodoLoading } from '@/features/todo-list/todo-loading';
import { cn } from '@/lib/utils';

export const TodoList = ({ className, ...props }: ComponentProps<'div'>) => {
  const {
    deleteTodoState: [_deleteTodoState, setDeleteTodoState],
    todoQuery: { data: todos, isLoading, isFetching },
    updateTodoMutation: { mutate: updateTodoItem, isPending: isUpdating },
    deleteTodoMutation: { isPending: isDeleting },
  } = useTodoListContext();

  if ((isLoading || isFetching) && !todos?.length) return <TodoLoading />;

  if (!isLoading && !isFetching && (!todos || todos.length === 0))
    return <TodoListEmpty />;

  return (
    <div className={cn('my-4 flex flex-col gap-2', className)} {...props}>
      {todos?.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => {
              updateTodoItem({ ...todo, completed: !todo.completed });
            }}
            onDelete={() => {
              setDeleteTodoState(todo);
            }}
            disabled={isFetching || isUpdating || isDeleting}
          />
        );
      })}
    </div>
  );
};
