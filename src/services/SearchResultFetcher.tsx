import React, { useEffect, useState, useCallback } from 'react';

function SearchResultFetcher(props) {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchFetcher = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${props.result}`);
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [props.result]);

  const resultLocalStorage = localStorage.getItem('searchResult');

  useEffect(() => {
    if (resultLocalStorage) {
      handleSearchFetcher();
    }
  }, [handleSearchFetcher, resultLocalStorage]);
  const searchResultString = JSON.stringify(searchResult);

  return (
    <div>
      {resultLocalStorage && (
        <div>
          {isLoading ? (
            <p>Загрузка данных...</p>
          ) : searchResultString.includes('name') ? (
            <div>
              <h2>Результат поиска:</h2>
              <textarea
                rows="40"
                cols="150"
                value={JSON.stringify(searchResult, null, 2)}
                readOnly
              />
            </div>
          ) : (
            <p>Не найдено...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResultFetcher;
