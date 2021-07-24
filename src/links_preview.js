
/**
 * Area where users can preview their links
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/links_preview.scss';

 function LinksPreview(props) {

   return (
     <div className="links-preview-container">
       <h2 className="links-preview-header">Preview Links</h2>
       <ul className="live-links">
          {props.userLinks.map((userLink, index) => (
            <li className="live-link-item">
              <a className="live-link-anchor" href={userLink.url}>{userLink.title}</a>
            </li>
          ))}
        </ul>
     </div>
   );
 }
 
 export default LinksPreview;