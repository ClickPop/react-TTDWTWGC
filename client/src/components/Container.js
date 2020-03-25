import React from 'react';
import { Logo } from './Logo';
import { Search } from './Search';
import { Result } from './Result';

export const Container = () => {
  return (
    <div class='fullscreen__container container mb-5 pb-5 mt-sm-4 pt-3'>
      <Logo />
      <Search />
      <Result />
    </div>
  );
};
