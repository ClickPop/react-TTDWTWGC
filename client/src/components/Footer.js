import React from 'react';

export const Footer = () => {
  return (
    <div class='footer'>
      Made by{' '}
      <a
        id='clickpop'
        href='https://www.clickpopmedia.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        ClickPop
      </a>
      <span class='d-none d-sm-inline'>|</span>
      <a
        href='https://www.producthunt.com/posts/things-to-do-when-the-world-gets-canceld?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-things-to-do-when-the-world-gets-canceld'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=189266&theme=dark'
          alt="Things to do when the world gets canceld - An activity book for when you're socially distancing. | Product Hunt Embed"
          style={{ width: '200px', height: 'auto' }}
          width='250px'
          height='54px'
        />
      </a>
      <span class='d-none d-sm-inline'>|</span>
      <a
        href='https://github.com/clickpop/quarantine'
        target='_blank'
        rel='noopener noreferrer'
      >
        GitHub
      </a>
    </div>
  );
};
