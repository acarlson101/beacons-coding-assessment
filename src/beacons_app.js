
/**
 * Beacons main application
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

import './styles/beacons_app.scss';
import LinksEditor from './links_editor';
import LinksPreview from './links_preview';
import React, {useState, useEffect} from 'react';
import { BEACONS_BACKEND_API_BASE_URL } from './core/api_constants';
import PropTypes from 'prop-types';

const BeaconsApp = () => {
  const getUserLinks = () => {
    fetch(BEACONS_BACKEND_API_BASE_URL)
    .then(result => result.json())
    .then(
      (result) => {
        setUserLinks(result);
        setIsInitialLoadComplete(true);
      },
      (error) => {
       // In a production system, we would log here
      }
    )
  };

  const [userLinks, setUserLinks] = useState([]);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [linkBackgroundColor, setLinkBackgroundColor] = useState('#6495ED');
  const [linkColor, setLinkColor] = useState('#ffffff');
  const [isLinkEdgeRounded, setIsLinkEdgeRounded] = useState(false);

  // Gather links data from backend api once
  useEffect(() => {
    setUserLinks(getUserLinks());
  }, []);

  return (
    <div className="beacons-app-container">
      {isInitialLoadComplete &&
      <div className="links-container">
        <LinksEditor
          userLinks={userLinks}
          setUserLinks={setUserLinks}
          linkBackgroundColor={linkBackgroundColor}
          linkColor={linkColor}
          isLinkEdgeRounded={isLinkEdgeRounded}
          setLinkBackgroundColor={setLinkBackgroundColor}
          setLinkColor={setLinkColor}
          setIsLinkEdgeRounded={setIsLinkEdgeRounded}
        />
        <LinksPreview 
          userLinks={userLinks}
          setUserLinks={setUserLinks}
          linkBackgroundColor={linkBackgroundColor}
          linkColor={linkColor}
          isLinkEdgeRounded={isLinkEdgeRounded}
        />
      </div>
    }
    </div>
  );
}

BeaconsApp.propTypes = {};
 
export default BeaconsApp;