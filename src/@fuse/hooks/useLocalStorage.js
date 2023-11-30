import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue = []) {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
