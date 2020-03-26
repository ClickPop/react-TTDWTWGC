import React, { useContext } from 'react';
import {OurStory} from './OurStory';
import {OurStoryContext} from '../../context/StoryContext';

export const StoryContainer = () => {
  const {show, setShow} = useContext(OurStoryContext);

  return (
    <div>
      <OurStory show={show} setShow={setShow}/>
    </div>
  )
}
