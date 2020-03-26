import React, {useState, createContext} from 'react';

export const SearchContext = createContext();

export const SearchProvider = (props) => {

  const [searchData, setSearchData] = useState({
    search: false,
    activity_type: '',
    audience: ''
  });

  return (
    <SearchContext.Provider value={{searchData, setSearchData}}>
      {props.children}
    </SearchContext.Provider>
  );
}