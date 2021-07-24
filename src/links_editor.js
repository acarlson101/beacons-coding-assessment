
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
import SettingsModal from './settings_modal';

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

    setEditLink({...props.userLinks[index]});
    setShowEditLinkModal(true);
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

      {showSettings &&
        <SettingsModal 
          linkBackgroundColor={props.linkBackgroundColor}
          linkColor={props.linkColor}
          isLinkEdgeRounded={props.isLinkEdgeRounded}
          setLinkBackgroundColor={props.setLinkBackgroundColor}
          setLinkColor={props.setLinkColor}
          setIsLinkEdgeRounded={props.setIsLinkEdgeRounded}
          setShowSettings={setShowSettings}
        />
      }

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
  setUserLinks: PropTypes.func.isRequired,
  linkBackgroundColor: PropTypes.string.isRequired,
  linkColor: PropTypes.string.isRequired,
  isLinkEdgeRounded: PropTypes.bool.isRequired,
  setLinkBackgroundColor: PropTypes.func.isRequired,
  setLinkColor: PropTypes.func.isRequired,
  setIsLinkEdgeRounded: PropTypes.func.isRequired
};
 
 export default LinksEditor;