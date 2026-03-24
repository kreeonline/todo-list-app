import { ThemeToggle } from '@/features/theme/theme-toggler';
import { AddTodoInput } from '@/features/todo-list/add-todo-input';
import { DeleteTodoConfirmDialog } from '@/features/todo-list/delete-todo-confirm-dialog';
import { TodoList } from '@/features/todo-list/todo-list';
import { TodoListFilter } from '@/features/todo-list/todo-list-filter';
import { TodoListContext } from '@/features/todo-list/todo-list.context';
import { useTodoList } from '@/features/todo-list/todo-list.hook';

function App() {
  const todoList = useTodoList();
  return (
    <>
      <header className="px-4">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 py-4">
          <h1 className="text-2xl font-light">Todo List App</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-md">
        <TodoListContext value={todoList}>
          <AddTodoInput />
          <TodoListFilter />
          <TodoList />
          <DeleteTodoConfirmDialog />
        </TodoListContext>
      </main>
    </>
  );
}

export default App;
