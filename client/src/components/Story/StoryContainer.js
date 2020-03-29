import React, { useContext } from 'react';
import {OurStory} from './OurStory';
import {GlobalContext} from '../../context/GlobalState';

export const StoryContainer = () => {
  const {show, setShow} = useContext(GlobalContext);

  return (
    <div>
      <OurStory show={show} setShow={setShow}/>
    </div>
  )
}
