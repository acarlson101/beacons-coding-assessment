
/**
 * Area where users can edit their links
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/links_editor.scss';
 import CreateLinkModal from './create_link_modal';
 import {Modal, Button} from 'react-bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import React, {useState} from 'react';
 import PropTypes from 'prop-types';

 function LinksEditor(props) {
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);




  const handleCloseSettings = () => setShowSettings(false);
  const handleShowSettings= () => setShowSettings(true);

  const handleCloseEditPost = () => setShowEditPost(false);
  const handleShowEditPost= () => setShowEditPost(true);

  const createLink = () => {};

   return (
     <div className="links-editor-container">
       <h2 className="links-editor-header">Edit Links</h2>
       <span className="create-link-btn" onClick={() => setShowNewLinkModal(true)}>+</span>
       <span className="settings-btn" onClick={handleShowSettings}>&#9881;</span>
        <ul className="editable-links">
          {props.userLinks.map((userLink, index) => (
            <li className="editable-link-item">
              <span className="editable-link-title">Link Title: {userLink.title}</span>
              <span className="editable-link-url">Link Url: {userLink.url}</span>
              <span className="editable-link-clicks">Clicks: {userLink.clicks}</span>
              <span className="edit-link-btn" onClick={handleShowEditPost}>&#9998;</span>
              <span className="delete-link-btn">&#x274C;</span>
            </li>
          ))}
        </ul>
      {showNewLinkModal &&
        <CreateLinkModal 
          showNewLinkModal={showNewLinkModal}
          setShowNewLinkModal={setShowNewLinkModal}
          setUserLinks={props.setUserLinks}
        />
      }

      <Modal show={showSettings} onHide={handleCloseSettings} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input className="change-link-background" type="text" placeholder="Link Background Color" />
        <input className="change-link-color" type="text" placeholder="Link Text Color" />
        <div className="link-corner-styling-selection">
        <input type="radio" id="rounded-option" name="rounded-option" value="round" />
          <label for="rounded-option">Rounded Corners</label>
          <input type="radio" id="straight-option" name="straight-option" value="straight"/>
          <label for="straight-option">Straight Corners</label> 
        </div>
         <button className="add-link-btn">Save</button>
        </Modal.Body>
      </Modal>

      <Modal show={showEditPost} onHide={handleCloseEditPost} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input className="edit-link-title" type="text" value="Link Title" />
         <input className="edit-link-url" type="text" value="http://example" />
         <button className="edit-link-btn" onClick={createLink}>Edit Link</button>
        </Modal.Body>
      </Modal>
      
     </div>
   );
 }

LinksEditor.propTypes = {
  userLinks: PropTypes.array.isRequired,
  setUserLinks: PropTypes.func.isRequired
};
 
 export default LinksEditor;