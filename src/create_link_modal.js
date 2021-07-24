
/**
 * Modal to create new link
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/beacons_app.scss';
 import React, {useState, useEffect} from 'react';
 import {Modal, Button} from 'react-bootstrap';
 import PropTypes from 'prop-types';
 import validator from 'validator'

function CreateLinkModal(props) {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [newLink, setNewLink] = useState(null);
  const [formErrorMsg, setFormErrorMsg] = useState('');

const handleLinkTitleChange = (event) => {
  const intputTitle = event.target.value;
  setLinkTitle(intputTitle);
};

const handleLinkUrlChange = (event) => {
  const intputUrl = event.target.value;
  setLinkUrl(intputUrl);
};

const handleSubmit = () => {
  if (linkTitle == '') {
    setFormErrorMsg('Please provide a valid title.');
    return;
  }
  if (!validator.isURL(linkUrl)) {
    setFormErrorMsg('Please provide a valid url.');
    return;
  }

  const newUserLink = {
    title: linkTitle,
    url: linkUrl,
    clicks: 0
  }
  props.setUserLinks(prevUserLinks => {
    const maxId = Math.max(...prevUserLinks.map(link => link.id));
    const localNewUserLink = {...newUserLink, id: maxId + 1}
    return [...prevUserLinks, localNewUserLink];
  });
  saveNewLink(newUserLink);
  props.setShowNewLinkModal(false);
};

const saveNewLink = (newLink) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLink)
  };
  fetch('https://retoolapi.dev/lqtPSO/links', requestOptions);
}

  return (
  <Modal show={true} onHide={() => props.setShowNewLinkModal(false)} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Create Link</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <input className="add-link-title" type="text" placeholder="Link Title" onChange={handleLinkTitleChange} />
      <input className="add-link-url" type="text" placeholder="Link Url" onChange={handleLinkUrlChange} />
      <button className="add-link-btn" onClick={handleSubmit}>Add Link</button>
      <span>{formErrorMsg}</span>
    </Modal.Body>
  </Modal>
  );
}

CreateLinkModal.propTypes = {
  setShowNewLinkModal: PropTypes.func.isRequired,
  setUserLinks: PropTypes.func.isRequired
};

export default CreateLinkModal;