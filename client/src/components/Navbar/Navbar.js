import React, {useContext} from 'react';
import {GlobalContext, InitialState} from '../../context/GlobalState';
import {Link} from 'react-router-dom';

export const Navbar = () => {
  
  const {show, setShow, searchData, setSearchData} = useContext(GlobalContext);
  
  return (
    <nav
      className='navbar navbar-expand justify-content-between align-items-center px-0 px-sm-3'
      style={{ width: '100%' }}
    >
      <div>
        <Link
          id='miniLogo'
          to='/'
          className='logo logo--mini'
          style={ !searchData.result ? { display: 'none' } : {}}
          onClick={() => setSearchData(InitialState)}
        >
          TTDWTWGC
        </Link>
      </div>

      <div>
        <button
          type='button'
          className='btn btn-warning btn-sm font-weight-bold'
          id='our-story'
          // data-toggle='modal'
          // data-target='#ourStory'
          onClick={e => setShow(!show)}
        >
          our story
        </button>

        <a
          href='https://airtable.com/shrrksKvgfYKFK33V'
          id='submit-idea'
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-warning btn-sm font-weight-bold'
        >
          submit an idea
        </a>
      </div>
    </nav>
  );
};
