import z from 'zod';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const titleMinLength = 3;

export const addTodoFormSchema = z.object({
  title: z.string({ error: 'Title must be string.' }).min(3, {
    error: `Title must be at lease ${titleMinLength}  character(s).`,
  }),
  completed: z.boolean({ error: 'Completed must be boolean.' }),
});

export type AddTodoFormSchema = z.infer<typeof addTodoFormSchema>;

export const defaultAddTodoFormValues: AddTodoFormSchema = {
  title: '',
  completed: false,
};

export const todoQueryKeys = {
  all: ['todos'] as const,
  search: (title: Todo['title']) => {
    return title ? ([...todoQueryKeys.all, title] as const) : todoQueryKeys.all;
  },
};
