import { useCallback, useEffect, useState } from "react";
import Wrapper from "../components/wrapper";
import Card from "../components/card";
import Spinner from "../components/spinner";
import Link from "next/link";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [apiKey, setApikey] = useLocalStorage("key", "");
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    );

    if (!data.ok) {
      setFetchError(true);
    } else {
      setFetchError(false);
    }
    const json = await data.json();
    setData(json.results);
  }, [apiKey]);

  // On loading
  useEffect(() => {
    setIsLoading(true);
    fetchData().catch(console.error);
    setIsLoading(false);
  }, [apiKey, fetchData]);

  const search = async (value: any) => {
    setIsLoading(true);

    const searchWord = await fetch(
      `https://api.themoviedb.org/3/search/multi/?query=${value}&api_key=${apiKey}`
    );

    const searchResult = await searchWord?.json();
    setData(searchResult.results);
    setIsLoading(false);

    if (!value) {
      fetchData();
    }
  };

  return (
    <Wrapper>
      <div className="grid md:grid-cols-2 gap-5 md:gap-10 justify-between mb-10">
        <div className="flex-2">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Quick search
          </label>
          <div className="mt-1 items-center">
            <div>
              <input
                type="text"
                name="search"
                id="search"
                onChange={(e) => search(e.target.value)}
                placeholder={`Search...`}
                className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5">
                <kbd className="inline-flex items-center rounded px-2">
                  {isLoading && <Spinner />}
                </kbd>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="apiKey"
            className="block text-sm font-medium text-gray-700"
          >
            MovieDB API Key v3
          </label>
          <input
            type="text"
            name="text"
            id="apiKey"
            value={apiKey || ""}
            onChange={(e) => setApikey(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mt-1"
            placeholder="Please enter a valid API key"
          />
        </div>
      </div>

      {fetchError && <h3>Please enter a valid API key</h3>}
      {!fetchError && !data?.length && <h3>No results found...</h3>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((item: any) => (
          <Link
            href={`${item.media_type || "tv"}/${item.id}?api_key=${apiKey}`}
            key={item.id}
          >
            <Card
              id={item.id}
              media_type={item.media_type || "tv"}
              title={item.title || item.name}
              overview={item.overview}
              rating={item.vote_average}
              date={item.first_air_date || item.release_date}
              poster_path={item.poster_path}
            />
          </Link>
        ))}
      </div>
    </Wrapper>
  );
}
