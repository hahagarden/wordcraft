"use client";

import { useState } from "react";

const useFetch = <TData>(fetchFn: () => Promise<TData>) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const resData = await fetchFn();

    setIsLoading(false);

    return resData;
  };

  return { isLoading, fetchData };
};

export default useFetch;
