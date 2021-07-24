
/**
 * Preview link
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

import PropTypes from 'prop-types';
import './styles/preview_link.scss';
import React, {useState} from 'react';
import { BEACONS_BACKEND_API_BASE_URL } from './core/api_constants';

const PreviewLink = (props) => {
  // I will keep this log here so you can confirm unnecessary link re-renders are not ocurring
  console.log("rendering preview link");

  const INVALID_LINK_INDEX = -1;

  const linkBackgroundStyle = {
    backgroundColor: props.linkBackgroundColor
  };

  const linkColorStyle = {
    color: props.linkColor
  }

  const isLinkRoundedEdgeCSSClass = props.isLinkEdgeRounded ? 'rounded-link-edge' : '';

  const trackLinkClick = () => {
    const updatedClicks = props.linkClicks + 1;
    props.setUserLinks(prevUserLinks => {
      let updatedUserLinks = [...prevUserLinks]
      const updatedLinkIndex = updatedUserLinks.findIndex(userLink => userLink.id === props.linkId);
      if (updatedLinkIndex == INVALID_LINK_INDEX) {
        return updatedUserLinks;
      }
  
      updatedUserLinks[updatedLinkIndex].clicks = updatedClicks;
      return updatedUserLinks;
    });


    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({clicks: updatedClicks})
    };
    const url = `${BEACONS_BACKEND_API_BASE_URL}/${props.linkId}`;
    fetch(url, requestOptions);
  };

  return (
    <li className={`live-link-item ${isLinkRoundedEdgeCSSClass}`} style={linkBackgroundStyle} onClick={trackLinkClick}>
      <a className="live-link-anchor" href={props.linkUrl} style={linkColorStyle} target="_blank">{props.linkTitle}</a>
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