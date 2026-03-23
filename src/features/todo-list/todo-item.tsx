import type { ComponentProps } from 'react';
import { Square, SquareCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Todo } from '@/lib/todo';
import { cn } from '@/lib/utils';

type TodoItemProps = ComponentProps<typeof Item> & {
  todo: Todo;
  onToggle?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const TodoItem = ({
  className,
  todo,
  onToggle,
  onDelete,
  variant = 'outline',
  size = 'xs',
  disabled,
  ...props
}: TodoItemProps) => {
  return (
    <Item
      className={cn(
        'transition-colors hover:bg-muted',
        {
          'border-cyan-200 bg-cyan-50 hover:bg-cyan-100 dark:border-cyan-700 dark:bg-cyan-900 dark:hover:bg-cyan-800':
            todo.completed,
          'opacity-50': disabled,
        },
        className
      )}
      variant={variant}
      size={size}
      onClick={() => {
        if (!disabled) {
          onToggle?.();
        }
      }}
      {...props}
    >
      <ItemMedia>
        {!todo.completed && <Square className="size-5" />}
        {todo.completed && (
          <SquareCheck className="size-5 text-cyan-600 dark:text-cyan-300" />
        )}
      </ItemMedia>

      <ItemContent>
        <ItemTitle>{todo.title}</ItemTitle>
      </ItemContent>

      <ItemActions>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="hover:text-destructive"
                type="button"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete?.();
                }}
                disabled={disabled}
              >
                <Trash2 className="sixe-4" />
              </Button>
            }
          />
          <TooltipContent>
            <p>
              Delete <strong>{todo.title}</strong>
            </p>
          </TooltipContent>
        </Tooltip>
      </ItemActions>
    </Item>
  );
};
