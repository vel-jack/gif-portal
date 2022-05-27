import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import React from 'react';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  return (
    <div >
      <div >
        <div>
          <p >🖼 GIF Portal</p>
          <p >
              View your GIF collection in the metaverse ✨
          </p>
        </div>
        <div >
          <img alt="Twitter Logo"  src={twitterLogo} />
          <a
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;