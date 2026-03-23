import { Trash2Icon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Spinner } from '@/components/ui/spinner';
import { useTodoListContext } from '@/features/todo-list/todo-list.context';

export const DeleteTodoConfirmDialog = () => {
  const {
    deleteTodoState: [deleteTodo, setDeleteTodo],
    deleteTodoMutation: { mutate: deleteTodoItem, isPending: isDeleting },
  } = useTodoListContext();

  return (
    <AlertDialog
      open={deleteTodo !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setDeleteTodo(null);
        }
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Are you absolutely sure to delete {deleteTodo?.title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            item.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isDeleting && <Spinner className="mx-auto block size-10" />}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              if (deleteTodo !== null) {
                deleteTodoItem(deleteTodo.id);
              }
            }}
            disabled={isDeleting}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
