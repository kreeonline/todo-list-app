import type { ComponentProps } from 'react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { useTodoListContext } from '@/features/todo-list/todo-list.context';

export const TodoListFilter = ({ ...props }: ComponentProps<typeof Field>) => {
  const {
    filterSearchState: [filterSearch, setFilterSearch],
  } = useTodoListContext();
  return (
    <Field orientation="horizontal" {...props}>
      <Switch
        checked={filterSearch}
        onCheckedChange={(checked) => setFilterSearch(checked)}
      />
      <FieldLabel htmlFor="switch-size-sm">Filter todo title</FieldLabel>
    </Field>
  );
};
