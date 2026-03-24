import type { ComponentProps } from 'react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { useTodoListContext } from '@/features/todo-list/todo-list.context';

export const TodoListFilter = ({ ...props }: ComponentProps<'div'>) => {
  const {
    todoQuery: { isFetching },
    filterSearchState: [filterSearch, setFilterSearch],
  } = useTodoListContext();
  return (
    <div className="flex items-center gap-4 py-2">
      <Field orientation="horizontal" {...props}>
        <Switch
          checked={filterSearch}
          onCheckedChange={(checked) => setFilterSearch(checked)}
        />
        <FieldLabel htmlFor="switch-size-sm">Filter todo title</FieldLabel>
      </Field>

      {isFetching && <Spinner />}
    </div>
  );
};
