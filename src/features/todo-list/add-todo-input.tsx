import { Controller } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Field, FieldError } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { useTodoListContext } from '@/features/todo-list/todo-list.context';

export const AddTodoInput = () => {
  const {
    form,
    addTodoMutation: { isPending: isAdding },
    onSubmit,
  } = useTodoListContext();

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={form.control}
          render={({ field: { disabled, ...field }, fieldState }) => (
            <Field className="mx-auto my-4" data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter todo title..."
                  disabled={isAdding || disabled}
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  {isAdding && <Spinner />}

                  <InputGroupButton
                    type="submit"
                    aria-label="Add new todo"
                    title="Add new todo"
                    size="icon-xs"
                    disabled={isAdding || disabled}
                  >
                    <Plus />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>
    </>
  );
};
