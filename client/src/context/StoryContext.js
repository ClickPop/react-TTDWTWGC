import React, {useState, createContext} from 'react';

export const OurStoryContext = createContext();

export const OurStoryProvider = (props) => {
  const [show, setShow] = useState(false);

  return (
    <OurStoryContext.Provider value={{show, setShow}}>
      {props.children}
    </OurStoryContext.Provider>
  );
}