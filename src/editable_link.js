
/**
 * Editable link
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

 import PropTypes from 'prop-types';
import './styles/editable_link.scss';
import React, {useState, memo} from 'react';
import EditLinkModal from './edit_link_modal';

function EditableLink(props) {

  console.log("Rendering editable link");

   return (
    <li className="editable-link-item">
      <span className="editable-link-title">Link Title: {props.linkTitle}</span>
      <span className="editable-link-url">Link Url: {props.linkUrl}</span>
      <span className="editable-link-clicks">Clicks: {props.linkClicks}</span>
      <span className="edit-link-btn" onClick={() => {props.handleEditLink(props.linkId)}}>&#9998;</span>
      <span className="delete-link-btn" onClick={() => {props.handleDeleteLink(props.linkId)}}>&#x274C;</span>
    </li>
   );
 }

EditableLink.propTypes = {
  linkId: PropTypes.number.isRequired,
  linkTitle: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  linkClicks: PropTypes.number.isRequired,
  handleEditLink: PropTypes.func.isRequired,
  handleDeleteLink: PropTypes.func.isRequired
};

 export default memo(EditableLink);