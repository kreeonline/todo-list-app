import '@tanstack/react-query';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { toast } from 'sonner';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      errorMessage?: string;
    };
    mutationMeta: {
      successMessage?: string;
      errorMessage?: string;
      invalidates?: QueryKey[];
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      const errorMessage = query.meta?.errorMessage;
      if (errorMessage !== undefined && typeof errorMessage === 'string') {
        toast.error(errorMessage);
      } else {
        toast.error(`Something went wrong! (${error.message})`);
      }
    },
  }),

  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const { invalidates } = mutation.meta ?? {};

      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }

      if (invalidates !== undefined) {
        invalidates.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
    onError: (error, _variables, _context, query) => {
      const { errorMessage } = query.meta ?? {};
      toast.error(errorMessage ?? `Something went wrong! (${error.message})`);
    },
  }),
});
