/**
 * Modal to edit link
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

 import './styles/edit_link_modal.scss';
 import React, {useState, useEffect} from 'react';
 import {Modal, Button} from 'react-bootstrap';
 import PropTypes from 'prop-types';
 import validator from 'validator'

function EditLinkModal(props) {
  const [linkTitle, setLinkTitle] = useState(props.editLink.title);
  const [linkUrl, setLinkUrl] = useState(props.editLink.url);
  const [formErrorMsg, setFormErrorMsg] = useState('');

const handleLinkTitleChange = (event) => {
  const intputTitle = event.target.value;
  setLinkTitle(intputTitle);
};

const handleLinkUrlChange = (event) => {
  const intputUrl = event.target.value;
  setLinkUrl(intputUrl);
};

const handleSubmit = (linkId) => {
  if (linkTitle == '') {
    setFormErrorMsg('Please provide a valid title.');
    return;
  }
  if (!validator.isURL(linkUrl)) {
    setFormErrorMsg('Please provide a valid url.');
    return;
  }

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
      <span className="edit-link-modal-label">Update Title</span>
    <input className="edit-link-modal-input" type="text" placeholder={props.editLink.title} onChange={handleLinkTitleChange} />
    <span className="edit-link-modal-label">Update Url</span>
     <input className="edit-link-modal-input" type="text" placeholder={props.editLink.url} onChange={handleLinkUrlChange} />
     <button className="edit-link-submit-btn" onClick={() => handleSubmit(props.editLink.id)}>Edit Link</button>
     <span className="edit-link-error-msg">{formErrorMsg}</span>
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