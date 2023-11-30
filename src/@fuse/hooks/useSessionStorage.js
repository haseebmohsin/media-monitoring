import { useState, useEffect } from 'react';

function useSessionStorage(key, initialValue = []) {
  const storedValue = sessionStorage.getItem(key);

  const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage;
