import { DependencyList, EffectCallback, useEffect } from 'react';

export const useEffectAsync = (
  callback: () => Promise<ReturnType<EffectCallback>>,
  deps: DependencyList,
): void => {
  useEffect(() => {
    callback();
  }, [callback, deps]);
};
