"use client";

import { useState, useEffect } from "react";

const useLocalStorageState = <T = unknown>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);

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
  }, [key]);

  // 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, state]);

  return [state, setState] as const;
};

export default useLocalStorageState;
