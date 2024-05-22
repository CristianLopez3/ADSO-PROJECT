import { useLocation } from "react-router";
import { useMemo } from "react";

export const useQueryParam = (param: string) => {
  const { search } = useLocation();

  return useMemo(() => {
    const queryParams = new URLSearchParams(search);
    return queryParams.get(param);
  }, [search, param]);
};