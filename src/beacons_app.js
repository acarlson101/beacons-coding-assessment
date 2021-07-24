
/**
 * Beacons main application
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/beacons_app.scss';
 import LinksEditor from './links_editor';
 import LinksPreview from './links_preview';

 function BeaconsApp() {
   return (
     <div className="beacons-app-container">
       <LinksEditor />
       <LinksPreview />
     </div>
   );
 }
 
 export default BeaconsApp;