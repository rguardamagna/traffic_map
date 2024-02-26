import { useState, useEffect } from "react";

export function useFetch(urls) {
    const [data, setData] = useState(null)
  
/*    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [])

    return {data}
  */
    useEffect(() => {
      const fetchData = async () => {
        try {
            const responses = await Promise.all(
                urls.map(url => fetch(url).then(response => response.json()))
            );
            const unifiedData = responses.flatMap(response => response.features);

            setData(unifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, [urls]);

  return { data };
}