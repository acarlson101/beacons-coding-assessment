
/**
 * Area where users can edit their links
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/links_editor.scss';
 import {Modal, Button} from 'react-bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import React, {useState} from 'react';

 function LinksEditor() {
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

  const [showNewPost, setShowNewPost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  const handleCloseNewPost = () => setShowNewPost(false);
  const handleShowNewPost= () => setShowNewPost(true);


  const handleCloseSettings = () => setShowSettings(false);
  const handleShowSettings= () => setShowSettings(true);

  const handleCloseEditPost = () => setShowEditPost(false);
  const handleShowEditPost= () => setShowEditPost(true);

   return (
     <div className="links-editor-container">
       <h2 className="links-editor-header">Edit Links</h2>
       <span className="create-link-btn" onClick={handleShowNewPost}>+</span>
       <span className="settings-btn" onClick={handleShowSettings}>&#9881;</span>
        <ul className="editable-links">
          {linksData.map((linkData, index) => (
            <li className="editable-link-item">
              <span className="editable-link-title">Link Title: {linkData.title}</span>
              <span className="editable-link-url">Link Url: {linkData.url}</span>
              <span className="editable-link-clicks">Clicks: {linkData.clicks}</span>
              <span className="edit-link-btn" onClick={handleShowEditPost}>&#9998;</span>
              <span className="delete-link-btn">&#x274C;</span>
            </li>
          ))}
        </ul>
      <Modal show={showNewPost} onHide={handleCloseNewPost} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input className="add-link-title" type="text" placeholder="Link Title" />
         <input className="add-link-url" type="text" placeholder="Link Url" />
         <button className="add-link-btn">Add Link</button>
        </Modal.Body>
      </Modal>

      <Modal show={showSettings} onHide={handleCloseSettings} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input className="change-link-background" type="text" placeholder="Link Background Color" />
        <input className="change-link-color" type="text" placeholder="Link Text Color" />
        <input type="radio" id="age1" name="age" value="30" />
        <label for="age1">Rounded Corners</label>
        <input type="radio" id="age2" name="age" value="60"/>
        <label for="age2">Straight Corners</label> 
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
         <button className="edit-link-btn">Edit Link</button>
        </Modal.Body>
      </Modal>
      
     </div>
   );
 }
 
 export default LinksEditor;