import React from 'react';
import { ReactComponent as RSSIcon } from './icons8-rss-logo.svg';


const Header = () => {
 const reloadPage = () => {
          window.location.reload();}
  return (
    <div className='header'>
    <div className="header-logo" onClick={reloadPage}>
      <RSSIcon/>
       <h2>NEWS.</h2>
    </div>
    </div>
  )
};

export default Header;