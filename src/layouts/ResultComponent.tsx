import React from 'react';
import SearchResultFetcher from '../services/SearchResultFetcher';

function ResultComponent(props) {
  const resultLocalStorage = localStorage.getItem('searchResult');
  let result;
  if (resultLocalStorage) {
    result = resultLocalStorage;
  } else {
    result = props.result;
  }
  return (
    <div>
      <SearchResultFetcher result={result} />
    </div>
  );
}

export default ResultComponent;
