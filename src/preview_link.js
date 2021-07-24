
/**
 * Preview link
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

 import PropTypes from 'prop-types';
import './styles/preview_link.scss';
import React, {useState} from 'react';

 function PreviewLink(props) {

  console.log("rendering preview link");

  const listStyle = {
    backgroundColor: props.linkBackgroundColor
  };

  const anchorStyle = {
    color: props.linkColor
  }

  const isLinkRoundedEdgeCSSClass = props.isLinkEdgeRounded ? 'rounded-link-edge' : '';

  const trackLinkClick = () => {
    const updatedClicks = props.linkClicks + 1;
    props.setUserLinks(prevUserLinks => {
      let updatedUserLinks = [...prevUserLinks]
      const index = updatedUserLinks.findIndex(userLink => userLink.id === props.linkId);
      if (index == -1) {
        return updatedUserLinks;
      }
  
      updatedUserLinks[index].clicks = updatedClicks;
      console.log("final array");
      console.log(updatedUserLinks);
      return updatedUserLinks;
    });


    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({clicks: updatedClicks})
    };
    const url = `https://retoolapi.dev/lqtPSO/links/${props.linkId}`;
    fetch(url, requestOptions);
  };

   return (
    <li className={`live-link-item ${isLinkRoundedEdgeCSSClass}`} style={listStyle} onClick={trackLinkClick}>
      <a className="live-link-anchor" href={props.linkUrl} style={anchorStyle} target="_blank">{props.linkTitle}</a>
    </li>
   );
 }

PreviewLink.propTypes = {
  linkId: PropTypes.number.isRequired,
  linkTitle: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  linkClicks: PropTypes.number.isRequired,
  setUserLinks: PropTypes.func.isRequired,
  linkBackgroundColor: PropTypes.string.isRequired,
  linkColor: PropTypes.string.isRequired,
  isLinkEdgeRounded: PropTypes.bool.isRequired
};
 
 export default React.memo(PreviewLink);