import React from 'react';
import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring';

export const OurStory = ({show, setShow}) => {
  const shown = {
    width: '100vw', 
    height: '100vh', 
    padding: '10%', 
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: 1
  };
  
  const hidden = {
    width: '100vw', 
    height: '100vh', 
    padding: '10%', 
    backgroundColor: 'rgba(0,0,0,0)',
    opactiy: 0
  };
  
  const spring = useSpring({
    // margin: show ? 0 : -500,
    to: shown,
    from: hidden
  });

  const slide = useSpring({
    marginTop: show ? 0 : -700
  })
  
  return (
    show ? ReactDOM.createPortal(
      <animated.div
      className='modal-overlay'
      id='ourStory'
      tabIndex='1'
      role='dialog'
      aria-labelledby='ourStory'
      aria-hidden='true'
      // style={{width: '100vw', height: '100vh', padding: '10%', backgroundColor: 'rgba(0,0,0,0.3)'}}
      style={spring}
      >
        <animated.div className='modal-dialog' role='document' style={slide}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Our Story
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
              onClick={e => setShow(!show)}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body p-0'>
            <div className='embed-responsive embed-responsive-16by9'>
              <iframe
                title='OurStory'
                className='embed-responsive-item'
                width='560'
                height='315'
                src='https://www.youtube-nocookie.com/embed/ln1DGHJnJB0?html5=1'
                frameBorder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className='modal-footer'>
            <a
              href='https://airtable.com/shrrksKvgfYKFK33V'
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary btn-block'
            >
              add an idea
            </a>
          </div>
        </div>
      </animated.div>
    </animated.div>, document.getElementById('portal')
    ) : null
  )
};
