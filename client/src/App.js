import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './stylesheets/style.css';
import { Navbar } from './components/Navbar/Navbar';
import { Container } from './components/Search/Container';
import { Footer } from './components/Footer/Footer';
import { AddContributor } from './components/Forms/AddContributor';
import {StoryContainer} from './components/Story/StoryContainer';
import { GlobalState } from './context/GlobalState';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';


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
        <GlobalState>
          <StoryContainer />
          <Router>
              <Navbar />
              <Switch>
                <Route exact path='/' component={Container} />
                <Route exact path='/newcontributor' component={AddContributor} />
              </Switch>
              <Footer />
          </Router>
        </GlobalState>
      </div>
    </ApolloProvider>
  );
}

export default App;
