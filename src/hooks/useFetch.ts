import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const planetData = await response.json();
      setData(planetData);
      setLoading(false);
    })();
  }, [url]);

  return { data, loading };
};

export default useFetch;
