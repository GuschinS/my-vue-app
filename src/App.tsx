import './App.css';
import React, { useState } from 'react';
import ResultComponent from './layouts/ResultComponent';
import SearchBar from './layouts/SearchBar';

function App() {
  const [result, setResult] = useState('');

  const handleSearchResult = (searchResult) => {
    setResult(searchResult);
  };

  return (
    <>
      <SearchBar onSearchResult={handleSearchResult} />
      <ResultComponent result={result} />
    </>
  );
}

export default App;
