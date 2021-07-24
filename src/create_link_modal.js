
/**
 * Modal to create new link
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/create_link_modal.scss';
 import React, {useState} from 'react';
 import {Modal} from 'react-bootstrap';
 import PropTypes from 'prop-types';
 import validator from 'validator';
 import { BEACONS_BACKEND_API_BASE_URL } from './core/api_constants';

const CreateLinkModal = (props) => {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
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
      // Get current max id for links
      const maxId = Math.max(...prevUserLinks.map(link => link.id));
      // We use the locally created link so we do not need to wait for an API response
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
    fetch(BEACONS_BACKEND_API_BASE_URL , requestOptions);
  }

  return (
    <Modal show={true} onHide={() => props.setShowNewLinkModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <input className="create-link-modal-input" type="text" placeholder="Link Title" onChange={handleLinkTitleChange} />
        <input className="create-link-modal-input" type="text" placeholder="Link Url" onChange={handleLinkUrlChange} />
        <button className="create-link-submit-btn" onClick={handleSubmit}>Add Link</button>
        <span className="create-link-error-msg">{formErrorMsg}</span>
      </Modal.Body>
    </Modal>
  );
}

CreateLinkModal.propTypes = {
  setShowNewLinkModal: PropTypes.func.isRequired,
  setUserLinks: PropTypes.func.isRequired
};

export default CreateLinkModal;