import { useState, useEffect } from "react";

export function useFetch(urls) {
  const [data, setData] = useState(null)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const responses = await Promise.all(
                urls.map(url => fetch(url, {mode:'no-cors'}).then(response => response.json()))
            );
          //const unifiedData = responses.flatMap(response => response.features);
          const unifiedData = responses.flatMap(response => response.result);

            setData(unifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, [urls]);

  return { data };
}