import React from 'react';

export const OurStory = () => {
  return (
    <div
      class='modal fade'
      id='ourStory'
      tabindex='-1'
      role='dialog'
      aria-labelledby='ourStory'
      aria-hidden='true'
    >
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>
              Our Story
            </h5>
            <button
              type='button'
              class='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body p-0'>
            <div class='embed-responsive embed-responsive-16by9'>
              <iframe
                title='OurStory'
                class='embed-responsive-item'
                width='560'
                height='315'
                src='https://www.youtube-nocookie.com/embed/ln1DGHJnJB0?html5=1'
                frameborder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class='modal-footer'>
            <a
              href='https://airtable.com/shrrksKvgfYKFK33V'
              target='_blank'
              rel='noopener noreferrer'
              class='btn btn-secondary btn-block'
            >
              add an idea
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
