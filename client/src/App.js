import React, {useContext} from 'react';
import { Route, Switch, __RouterContext } from 'react-router-dom';
import './stylesheets/style.css';
import { Navbar } from './components/Navbar/Navbar';
import { Container } from './components/Search/Container';
import { Footer } from './components/Footer/Footer';
import { AddContributor } from './components/Forms/AddContributor';
import { AddActivity } from './components/Forms/AddActivity';
import { Login } from './components/Forms/Login';
import { Register } from './components/Forms/Register';
import {StoryContainer} from './components/Story/StoryContainer';
import {ShareContainer} from './components/Share/ShareContainer';
import { GlobalContext } from './context/GlobalState';
import {useSpring, useTransition, animated} from 'react-spring';
import {useQuery} from '@apollo/client';
import {Activity} from './components/Activity';
import gql from 'graphql-tag';

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      contributor {
        name
        website
        twitter
        other
        bio
        headshot
      }
    }
  }
`;

function App() {
  const {setAuthenticated} = useContext(GlobalContext);
  const {location} = useContext(__RouterContext);

  const fade = useSpring({
    from: {
      opacity: 0,
      height: '100vh',
    },
    to: {
      opacity: 1,
      height: '100vh'
    }
  });

  const transitions = useTransition(location, location => location.pathname, {
    config: {
      duration: 150
    },
    from: {
      opacity: 0,
      transform: "translateY(100%)"
    },
    enter: {
      opacity: 1,
      transform: "translateY(0%)"
    },
    leave: {
      opacity: 0,
      transform: "translateY(-50%)"
    }
  })

  const {data} = useQuery(CURRENT_USER, {
    onCompleted: (data) => {
      // if (data.currentUser) {
      //   setAuthenticated({loggedIn: true, id: data.currentUser.id, contributors: data.currentUser.contributor});
      // }
    }
  });

  return (
    <animated.div
      className='fullscreen d-sm-flex flex-column justify-content-center align-items-center p-2'
      style={fade}
    >
      <ShareContainer />
      <StoryContainer />
      <Navbar />
      {transitions.map((({item, props, key}) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path='/' component={Container} />
            <Route exact path='/contributorinfo' component={AddContributor} />
            <Route exact path='/newactivity' component={AddActivity} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path='/activities/:id' component={Activity} />
          </Switch>
        </animated.div>
      )))}
      <Footer />
    </animated.div>
  );
}

export default App;
