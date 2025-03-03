"use client";

import { useState, useEffect } from "react";

const useLocalStorageState = <T = unknown>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  // localStorage에서 초기값 로드
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setState(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    setMounted(true);
  }, [key]);

  // 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, state, mounted]);

  return [state, setState] as const;
};

export default useLocalStorageState;
