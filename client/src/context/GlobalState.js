import React, {useState, createContext} from 'react';

export const GlobalContext = createContext();

export const InitialState = {
  search: false,
  activity_type: '',
  audience: '',
  result: false,
  title: '',
  description: '',
  url: '',
  contributors: [],
  pastResults: []
};

export const GlobalState = (props) => {
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState(InitialState);

  return (
    <GlobalContext.Provider value={{show, setShow, searchData, setSearchData}}>
      {props.children}
    </GlobalContext.Provider>
  );
}