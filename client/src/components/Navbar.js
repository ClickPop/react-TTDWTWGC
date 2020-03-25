import React, {useContext} from 'react';
import {OurStoryContext} from '../context/OurStoryContext';
import {Link} from 'react-router-dom';

export const Navbar = () => {
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
          style={{ display: 'none' }}
        >
          TTDWTWGC
        </Link>
      </div>

      <div>
        <Link
          type='button'
          className='btn btn-warning btn-sm font-weight-bold'
          id='our-story'
          // data-toggle='modal'
          // data-target='#ourStory'
          to='/ourstory'
        >
          our story
        </Link>

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
