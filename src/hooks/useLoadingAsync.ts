import { useEffect, useRef, useState, DependencyList } from 'react';

export const useLoadingAsync = <T>(
  callback: () => Promise<T>,
  deps: DependencyList,
): { loading: boolean; error: any } => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await callback();
        if (!activeRef.current) {
          return;
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    })();
  }, [callback, deps]);

  return { loading: isLoading, error };
};
