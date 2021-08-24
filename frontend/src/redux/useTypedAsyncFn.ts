import { useAsyncFn } from 'react-use';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';

/**
 * A wrapper around useAsyncFn until its arguments can be properly typed
 * See https://github.com/streamich/react-use/issues/1111
 *
 * @param callback to be called in useAsyncFn
 * @param deps that should trigger recreating the callback
 */
export function useTypedAsyncFn<T>(
  callback: (input: T) => Promise<unknown>,
  deps: unknown[],
): AsyncFnReturn<(...args: T[]) => Promise<void>> {
  return useAsyncFn(async (...args: T[]) => {
    await callback(args[0]);
  }, deps);
}
