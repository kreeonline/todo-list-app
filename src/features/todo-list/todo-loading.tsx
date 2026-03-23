import type { ComponentProps } from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
} from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, randomWidthPercentage } from '@/lib/utils';

export const TodoLoading = ({
  className,
  length = 5,
  ...props
}: ComponentProps<'div'> & { length?: number }) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {Array.from({ length }).map((_, i) => {
        const width = `${randomWidthPercentage()}%`;
        const animationDelay = `${i * 300}ms`;
        return (
          <Item
            className="flex shrink-0 items-center gap-2 px-2.5"
            key={i}
            variant="outline"
            {...props}
          >
            <ItemMedia>
              <Skeleton className="size-5" style={{ animationDelay }} />
            </ItemMedia>

            <ItemContent>
              <Skeleton className="h-5" style={{ width, animationDelay }} />
            </ItemContent>

            <ItemActions>
              <span className="inline-flex size-9 items-center justify-center">
                <Skeleton className="size-4" style={{ animationDelay }} />
              </span>
            </ItemActions>
          </Item>
        );
      })}
    </div>
  );
};
