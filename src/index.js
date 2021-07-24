/**
 * Application entry point
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import React from 'react';
 import ReactDOM from 'react-dom';
 import BeaconsApp from './beacons_app';
 import './styles/index.scss';
 
 ReactDOM.render(
   <React.StrictMode>
     <BeaconsApp />
   </React.StrictMode>,
   document.getElementById('root')
 );