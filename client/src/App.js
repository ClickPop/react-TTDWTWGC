import React from 'react';
import './stylesheets/style.css';
import { Navbar } from './components/Navbar';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { OurStory } from './components/OurStory';

function App() {
  return (
    <div
      className='fullscreen d-sm-flex flex-column justify-content-center align-items-center p-2'
      style={{ height: '100vh' }}
    >
      <Navbar />
      <Container />
      <Footer />
      <OurStory />
    </div>
  );
}

export default App;
