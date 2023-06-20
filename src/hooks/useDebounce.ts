import { useCallback, useEffect, useRef, useState } from 'react';

// RESET-CAPABLE DEBOUNCE
function useDebounce<T>(initial: T, delay = 1000): [T, (feed: T) => void, T, () => void] {
  const [value, setValue] = useState<T>(initial);
  const [debouncedValue, setDebouncedValue] = useState<T>(initial);
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [delay, value]);

  const setImmediate = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setDebouncedValue(value);
  }, [value]);

  return [value, setValue, debouncedValue, setImmediate];
}

export default useDebounce;
