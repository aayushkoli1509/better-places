import axios, { CancelTokenSource } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useHttpClient<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<CancelTokenSource[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method = 'GET',
      body: null | {} = null,
      headers: { [key: string]: any } = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = axios.CancelToken.source();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await axios<T>({
          method,
          url,
          data: body,
          headers,
          cancelToken: httpAbortCtrl.token
        });

        const responseData = response.data;
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );
        setIsLoading(false);
        return responseData;
      } catch (_err) {
        const err = _err as { response: { data: { message?: string } } };
        setIsLoading(false);
        setError(
          err?.response.data.message! ||
            'Something went wrong, please try again.'
        );
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.cancel());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
}
