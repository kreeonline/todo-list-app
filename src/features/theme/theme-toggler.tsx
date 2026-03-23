import type { ComponentProps } from 'react';
import { Laptop, Moon, Sun } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme, type Theme } from '@/features/theme/theme-provider';

export function ThemeToggle({ ...props }: ComponentProps<typeof ToggleGroup>) {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      variant="outline"
      size="lg"
      value={[theme]}
      onValueChange={([value]) => setTheme(value as Theme)}
      {...props}
    >
      <ToggleGroupItem className="flex size-14 flex-col" value="light">
        <Sun />
        <span className="text-xs">Light</span>
      </ToggleGroupItem>

      <ToggleGroupItem className="flex size-14 flex-col" value="dark">
        <Moon />
        <span className="text-xs">Dark</span>
      </ToggleGroupItem>

      <ToggleGroupItem className="flex size-14 flex-col" value="system">
        <Laptop />
        <span className="text-xs">System</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
