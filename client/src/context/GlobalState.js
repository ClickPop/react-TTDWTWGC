import React, {useState, createContext} from 'react';

export const GlobalContext = createContext();

export const InitialSearch = {
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

export const InitialContributor = {
  name: '',
  bio: '',
  website: '',
  twitter: '',
  other: '',
  headshot: null,
  email: ''
}

export const GlobalState = (props) => {
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState(InitialSearch);
  const [contributorData, setContributorData] = useState(InitialContributor);


  return (
    <GlobalContext.Provider value={{show, setShow, searchData, setSearchData, contributorData, setContributorData}}>
      {props.children}
    </GlobalContext.Provider>
  );
}