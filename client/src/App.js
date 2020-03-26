import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './stylesheets/style.css';
import { Navbar } from './components/Navbar/Navbar';
import { Container } from './components/Search/Container';
import { Footer } from './components/Footer/Footer';
import { AddContributor } from './components/Forms/AddContributor';
import {StoryContainer} from './components/Story/StoryContainer';
import {Upload} from './components/Upload';
import { OurStoryProvider } from './context/StoryContext';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';

const link = createUploadLink({ uri: 'http://localhost:5000' });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <div
        className='fullscreen d-sm-flex flex-column justify-content-center align-items-center p-2'
        style={{ height: '100vh' }}
      >
        <OurStoryProvider>
          <StoryContainer />
          <Router>
              <Navbar />
              <Switch>
                <Route exact path='/' component={Container} />
                <Route exact path='/newcontributor' component={AddContributor} />
                <Route exact path='/upload' component={Upload} />
              </Switch>
              <Footer />
          </Router>
        </OurStoryProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
