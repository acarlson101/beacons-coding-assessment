/**
 * Modal to edit link
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

 import './styles/beacons_app.scss';
 import React, {useState, useEffect} from 'react';
 import {Modal, Button} from 'react-bootstrap';
 import PropTypes from 'prop-types';

function EditLinkModal(props) {
  const [linkTitle, setLinkTitle] = useState(props.editLink.title);
  const [linkUrl, setLinkUrl] = useState(props.editLink.url);

const handleLinkTitleChange = (event) => {
  const intputTitle = event.target.value;
  setLinkTitle(intputTitle);
};

const handleLinkUrlChange = (event) => {
  const intputUrl = event.target.value;
  setLinkUrl(intputUrl);
};

const handleSubmit = (linkId) => {
  props.setUserLinks(prevUserLinks => {
    let updatedUserLinks = [...prevUserLinks]
    const index = updatedUserLinks.findIndex(userLink => userLink.id === linkId);
    if (index == -1) {
      return updatedUserLinks;
    }

    props.editLink.title = linkTitle;
    props.editLink.url = linkUrl;
    updatedUserLinks[index] = props.editLink
    return updatedUserLinks;
  });

  const updatedLinkData = {
    title: linkTitle,
    url: linkUrl
  }
  saveNewLink(updatedLinkData, linkId);
  props.setShowEditLinkModal(false);
};

const saveNewLink = (updatedLinkData, linkId) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedLinkData)
  };
  const url = `https://retoolapi.dev/lqtPSO/links/${linkId}`;
  fetch(url, requestOptions);
}

  return (
    <Modal show={true} onHide={() => props.setShowEditLinkModal(false)} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <input className="edit-link-title" type="text" placeholder={props.editLink.title} onChange={handleLinkTitleChange} />
     <input className="edit-link-url" type="text" placeholder={props.editLink.url} onChange={handleLinkUrlChange} />
     <button className="edit-link-btn" onClick={() => handleSubmit(props.editLink.id)}>Edit Link</button>
    </Modal.Body>
  </Modal>
  );
}

EditLinkModal.propTypes = {
  setShowEditLinkModal: PropTypes.func.isRequired,
  editLink: PropTypes.object.isRequired,
  setUserLinks: PropTypes.func.isRequired
};

export default EditLinkModal;