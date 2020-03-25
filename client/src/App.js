import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './stylesheets/style.css';
import { Navbar } from './components/Navbar';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { OurStory } from './components/OurStory';
import { AddContributor } from './components/AddContributor';
import {Upload} from './components/Upload';
import {OurStoryProvider} from './context/OurStoryContext';

function App() {
  return (
    <div
      className='fullscreen d-sm-flex flex-column justify-content-center align-items-center p-2'
      style={{ height: '100vh' }}
    >
      <Router>
        <OurStoryProvider>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Container} />
            <Route exact path='/ourstory' component={OurStory} />
            <Route exact path='/newcontributor' component={AddContributor} />
            <Route exact path='/upload' component={Upload} />
          </Switch>
          <Footer />
        </OurStoryProvider>
      </Router>
    </div>
  );
}

export default App;
