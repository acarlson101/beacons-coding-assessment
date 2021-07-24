
/**
 * Area where users can preview their links
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/links_preview.scss';

 function LinksPreview() {
  const linksData = [
    {
      id: 1,
      url: '#',
      title: 'Link 1',
      clicks: 4
    },
    {
      id: 2,
      url: '#',
      title: 'Link 2',
      clicks: 32
    }
  ];

   return (
     <div className="links-preview-container">
       <h2 className="links-preview-header">Preview Links</h2>
       <ul className="live-links">
          {linksData.map((linkData, index) => (
            <li className="live-link-item">
              <a className="live-link-anchor" href={linkData.url}>{linkData.title}</a>
            </li>
          ))}
        </ul>
     </div>
   );
 }
 
 export default LinksPreview;