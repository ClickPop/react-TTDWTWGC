import React, { useContext } from 'react';
import {Share} from './Share';
import {GlobalContext} from '../../context/GlobalState';

export const ShareContainer = () => {
  const {share, setShare} = useContext(GlobalContext);

  return (
    <div>
      <Share share={share} setShare={setShare}/>
    </div>
  )
}
