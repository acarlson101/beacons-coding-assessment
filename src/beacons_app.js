
/**
 * Beacons main application
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/beacons_app.scss';
 import LinksEditor from './links_editor';
 import LinksPreview from './links_preview';
 import React, {useState, useEffect} from 'react';

 function BeaconsApp() {
  const getUserLinks = () => {
    fetch("https://retoolapi.dev/lqtPSO/links")
    .then(result => result.json())
    .then(
      (result) => {
        setUserLinks(result);
        setIsInitialLoadComplete(true);
      },
      (error) => {
       // Handle error here
      }
    )
  };

  const [userLinks, setUserLinks] = useState([]);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
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
          />
          <LinksPreview 
            userLinks={userLinks}
            setUserLinks={setUserLinks}
          />
        </div>
      }
     </div>
   );
 }
 
 export default BeaconsApp;