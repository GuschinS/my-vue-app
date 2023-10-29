import { SearchProps } from 'antd/es/input';
import React from 'react';
import { Input } from 'antd';

function SearchBar(props) {
  const { Search } = Input;
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    localStorage.setItem('searchResult', value.trim());
    props.onSearchResult(value);
    console.log(info?.source, value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
}

export default SearchBar;
