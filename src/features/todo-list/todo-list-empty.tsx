import type { ComponentProps } from 'react';
import { ListX } from 'lucide-react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export const TodoListEmpty = (props: ComponentProps<typeof Empty>) => {
  return (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListX />
        </EmptyMedia>
        <EmptyTitle>No Todos</EmptyTitle>
        <EmptyDescription>No todos data found.</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <p>Add Todo and todo list will appear here.</p>
      </EmptyContent>
    </Empty>
  );
};
