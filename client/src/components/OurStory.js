import React, {useContext} from 'react';
import {OurStoryContext} from '../context/OurStoryContext';

export const OurStory = () => {
  return (
    <div
      className='modal display-block'
      id='ourStory'
      tabIndex='1'
      role='dialog'
      aria-labelledby='ourStory'
      // aria-hidden='true'
      
    >
      <div className='modal-dialog' role='document'>
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
      </div>
    </div>
  );
};
