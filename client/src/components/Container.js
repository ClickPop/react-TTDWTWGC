import React from 'react';
import { Logo } from './Logo';
import { Search } from './Search/Search';
import { Result } from './Result';
import {SearchProvider} from '../context/SearchContext';

export const Container = () => {
  return (
    <div className='fullscreen__container container mb-5 pb-5 mt-sm-4 pt-3'>
      <SearchProvider>
        <Logo />
        <Search />
        <Result />
      </SearchProvider>
    </div>
  );
};
