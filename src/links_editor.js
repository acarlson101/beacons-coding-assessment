
/**
 * Area where users can edit their links
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

 import './styles/links_editor.scss';
 import CreateLinkModal from './create_link_modal';
 import {Modal, Button} from 'react-bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import React, {useState, useCallback} from 'react';
 import PropTypes from 'prop-types';
import EditLinkModal from './edit_link_modal';
import EditableLink from './editable_link';

 function LinksEditor(props) {
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditLinkModal, setShowEditLinkModal] = useState(false);
  const [editLink, setEditLink] = useState(null);


  const handleCloseSettings = () => setShowSettings(false);
  const handleShowSettings= () => setShowSettings(true);

  const handleDeleteLink = useCallback((linkId) => {
    props.setUserLinks((prevUserLinks) => {
      let updatedUserLinks = [...prevUserLinks];
      const index = updatedUserLinks.findIndex(userLink => userLink.id === linkId);
      if (index == -1) {
        return updatedUserLinks;
      }
      updatedUserLinks.splice(index, 1);
      return updatedUserLinks;
    }); 

    const requestOptions = {
      method: 'DELETE'
    };
    const url = `https://retoolapi.dev/lqtPSO/links/${linkId}`;
    fetch(url, requestOptions);
  }, []);

  const handleEditLink = useCallback((linkId) => {
    const index = props.userLinks.findIndex(userLink => userLink.id === linkId);
    if (index == -1) {
      return;
    }

    props.setEditLink({...props.userLinks[index]});
    props.setShowEditLinkModal(true);
  }, []);

   return (
     <div className="links-editor-container">
       <h2 className="links-editor-header">Edit Links</h2>
       <span className="create-link-btn" onClick={() => setShowNewLinkModal(true)}>+</span>
       <span className="settings-btn" onClick={handleShowSettings}>&#9881;</span>
        <ul className="editable-links">
          {props.userLinks.map((userLink, index) => (
            <EditableLink
              key={userLink.id} 
              linkId={userLink.id}
              linkTitle={userLink.title}
              linkUrl={userLink.url}
              linkClicks={userLink.clicks}
              handleEditLink={handleEditLink}
              handleDeleteLink={handleDeleteLink}
            />
          ))}
        </ul>
      {showNewLinkModal &&
        <CreateLinkModal 
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

      {showEditLinkModal &&
        <EditLinkModal
          setShowEditLinkModal={setShowEditLinkModal}
          editLink={editLink}
          setUserLinks={props.setUserLinks}
        />
      }      
      
     </div>
   );
 }

LinksEditor.propTypes = {
  userLinks: PropTypes.array.isRequired,
  setUserLinks: PropTypes.func.isRequired
};
 
 export default LinksEditor;