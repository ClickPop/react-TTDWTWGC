import React, { useContext } from 'react';
import {GlobalContext} from '../../context/GlobalState';

export const Logo = () => {

  const {searchData} = useContext(GlobalContext);
  return (
    <div id='logo' className='row' style={searchData.result ? {display: 'none'} : {}}>
      <div className='col-12 col-md-10 offset-md-1'>
        <div className='logo__container px-3 pt-4'>
          <a className='logo' href='/'>
            Things to Do When the
            <br />
            World Gets Canceled
          </a>
        </div>
      </div>
    </div>
  );
};
