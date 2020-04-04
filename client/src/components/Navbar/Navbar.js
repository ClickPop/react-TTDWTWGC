import React, {useContext, Fragment} from 'react';
import {GlobalContext, InitialSearch} from '../../context/GlobalState';
import {Link, useHistory} from 'react-router-dom';
import {useSpring, animated} from 'react-spring';
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';

const LOGOUT = gql`
  mutation {
    logout 
  }
`;

export const Navbar = () => {
  const history = useHistory();
  const {show, setShow, searchData, setSearchData, authenticated, setAuthenticated} = useContext(GlobalContext);
  
  const [logout] = useMutation(LOGOUT, {
    onCompleted: (data) => {
      setAuthenticated({loggedIn: false, id: null});
      history.push('/');
    }
  });
  const spring = useSpring({
    opacity: searchData.result || history.location.pathname !== '/' ? 1 : 0,
    transform: searchData.result || history.location.pathname !== '/' ? 'scale(1)' : 'scale(0)'
  });

  return (
    <nav
      className='navbar navbar-expand justify-content-between align-items-center px-0 px-sm-3'
      style={{ width: '100%' }}
    >
      <animated.div style={spring}>
        <Link
          id='miniLogo'
          to='/'
          className='logo logo--mini'
          onClick={() => setSearchData(InitialSearch)}
        >
          TTDWTWGC
        </Link>
      </animated.div>

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

        <Link
          to='/newactivity'
          id='submit-idea'
          // target='_blank'
          // rel='noopener noreferrer'
          className='btn btn-warning btn-sm font-weight-bold'
        >
          submit an idea
        </Link>
        {!authenticated.loggedIn
          ? <Fragment>
              <Link
              className='btn btn-warning btn-sm font-weight-bold'
              to='/login'
              >Login</Link>
              <Link
              className='btn btn-warning btn-sm font-weight-bold'
              to='/register'
              >Register</Link>
            </Fragment>
          : <Fragment>
              <Link
              className='btn btn-warning btn-sm font-weight-bold'
              to='/contributorinfo'
              >Personal Info</Link>
              <button
              className='btn btn-warning btn-sm font-weight-bold'
              onClick={e => logout()}
              >Logout</button>
            </Fragment>
        }
      </div>
    </nav>
  );
};
