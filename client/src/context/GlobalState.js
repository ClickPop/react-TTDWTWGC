import React, {useState, createContext} from 'react';

export const GlobalContext = createContext();

export const InitialSearch = {
  search: false,
  activity_type: '',
  audience: '',
  result: false,
  title: null,
  description: null,
  url: null,
  contributors: [],
  pastResults: []
};

export const InitialContributor = {
  name: null,
  website: null,
  twitter: null,
  other: null,
  bio: null,
  headshot: null
}

export const GlobalState = (props) => {
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState(InitialSearch);
  const [authenticated, setAuthenticated] = useState({loggedIn: false, id: null});
  const [currentContributor, setCurrentContributor] = useState(InitialContributor);
  const [share, setShare] = useState({display: false, url: null});

  return (
    <GlobalContext.Provider value={{show, setShow, searchData, setSearchData, authenticated, setAuthenticated, currentContributor, setCurrentContributor, share, setShare}}>
      {props.children}
    </GlobalContext.Provider>
  );
}