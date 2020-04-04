import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {useSpring, animated} from 'react-spring';
import useClippy from 'use-clippy';

export const Share = ({share, setShare}) => {
  const [clipboard, setClipboard] = useClippy();
  const [alert, setAlert] = useState(false);
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
    to: shown,
    from: hidden
  });

  const slide = useSpring({
    marginTop: share.display ? 0 : 600
  })
  
  const onClick = () => {
    setClipboard(share.url);
    setAlert(true);
    setTimeout(() => {
        setAlert(false)
    }, 3000);
  }

  return (
    share.display ? ReactDOM.createPortal(
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
              Share!
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
              onClick={e => setShare({...share, display: false})}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body p-0'>
              {alert && <div className="alert alert-success">Copied to clipboard</div>}
              <div className="d-flex justify-content-around">
                <input type='text' className="form-control w-75" value={share.url} readOnly />
                <button className="btn btn-primary" onClick={e => onClick()}>COPY</button>
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
