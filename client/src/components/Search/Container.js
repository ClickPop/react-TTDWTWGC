import React, { useContext } from 'react';
import { Logo } from './Logo';
import { Search } from './Search';
import {GlobalContext} from '../../context/GlobalState';
import {useSpring, animated} from 'react-spring';

export const Container = () => {
  const {searchData} = useContext(GlobalContext);
  const spring = useSpring({
    opacity: searchData.result ? 0 : 1,
    transform: searchData.result ? 'scaleY(0)' : 'scaleY(1)'
  });

  return (
    <div className={searchData.result 
      ? 'fullscreen__container container mb-5 mt-sm-4 pt-3' 
      : 'fullscreen__container container mb-5 pb-5 mt-sm-4 pt-3'}>
        <animated.div style={spring}>
          <Logo />
        </animated.div>
        <Search />
    </div>
  );
};