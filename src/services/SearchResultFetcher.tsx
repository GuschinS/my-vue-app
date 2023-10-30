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

  return (
    <div>
      {resultLocalStorage && (
        <div>
          {isLoading ? (
            <p>Загрузка данных...</p>
          ) : searchResult && searchResult.results && searchResult.results.length > 0 ? (
            <div>
              <h2>Результат поиска:</h2>
              <div className="result-cards">
                {searchResult.results.map((result, index) => (
                  <div key={index} className="result-card">
                    <h3>{result.name}</h3>
                    <p>Рост: {result.height} см</p>
                    <p>Вес: {result.mass} кг</p>
                  </div>
                ))}
              </div>
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
