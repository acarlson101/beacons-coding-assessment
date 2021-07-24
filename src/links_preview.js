
/**
 * Area where users can preview their links
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import PreviewLink from './preview_link';
import './styles/links_preview.scss';

 function LinksPreview(props) {

   return (
     <div className="links-preview-container">
       <h2 className="links-preview-header">Preview Links</h2>
       <ul className="live-links">
          {props.userLinks.map((userLink, index) => (
            <PreviewLink
              key={userLink.id}
              linkTitle={userLink.title}
              linkUrl={userLink.url}
              linkBackgroundColor={props.linkBackgroundColor}
              linkColor={props.linkColor}
              isLinkEdgeRounded={props.isLinkEdgeRounded}
            />
          ))}
        </ul>
     </div>
   );
 }
 
 export default LinksPreview;