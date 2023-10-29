import React, { useEffect, useState } from 'react';

function SearchResultFetcher(props) {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchFetcher = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${props.result}`);
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setSearchResult(null);
    } finally {
      setIsLoading(false); // Устанавливаем состояние загрузки после завершения запроса
    }
  };
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
          ) : JSON.stringify(searchResult).includes('name') ? (
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
