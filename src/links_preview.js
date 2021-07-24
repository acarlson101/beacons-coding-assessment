
/**
 * Area where users can preview their links
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

import PreviewLink from './preview_link';
import './styles/links_preview.scss';
import PropTypes from 'prop-types';

const LinksPreview = (props) => {
  return (
    <div className="links-preview-container">
      <h2 className="links-preview-header">Links Preview</h2>
      <ul className="live-links">
        {props.userLinks.map((userLink, index) => (
          <PreviewLink
            key={userLink.id}
            linkId={userLink.id}
            linkTitle={userLink.title}
            linkUrl={userLink.url}
            linkClicks={userLink.clicks}
            linkBackgroundColor={props.linkBackgroundColor}
            linkColor={props.linkColor}
            isLinkEdgeRounded={props.isLinkEdgeRounded}
            setUserLinks={props.setUserLinks}
          />
        ))}
      </ul>
    </div>
  );
 }

LinksPreview.propTypes = {
  linkBackgroundColor: PropTypes.string.isRequired,
  linkColor: PropTypes.string.isRequired,
  isLinkEdgeRounded: PropTypes.bool.isRequired
};
 
export default LinksPreview;