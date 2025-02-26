"use client";

import { useEffect, useState } from "react";

const useLocalStorageState = (key: string, initialValue: string[]) => {
  const [state, setState] = useState<string[] | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    setState(storedValue ? JSON.parse(storedValue) : initialValue);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state ?? initialValue, setState] as const;
};

export default useLocalStorageState;
