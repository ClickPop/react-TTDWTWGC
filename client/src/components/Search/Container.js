import React, { useContext } from 'react';
import { Logo } from './Logo';
import { Search } from './Search';
import {GlobalContext} from '../../context/GlobalState';

export const Container = () => {
  const {searchData} = useContext(GlobalContext);
  return (
    <div className={searchData.result 
      ? 'fullscreen__container container mb-5 mt-sm-4 pt-3' 
      : 'fullscreen__container container mb-5 pb-5 mt-sm-4 pt-3'}>
        <Logo />
        <Search />
    </div>
  );
};