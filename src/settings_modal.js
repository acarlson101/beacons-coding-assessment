
/**
 * Modal to update settings
 *
 * @copyright 2021 Beacons - All rights reserved
 */

 import './styles/settings_modal.scss';
 import React, {useState, useEffect} from 'react';
 import {Modal, Button} from 'react-bootstrap';
 import PropTypes from 'prop-types';

function SettingsModal(props) {
  const [inputLinkBackgroundColor, setInputLinkBackgroundColor] = useState(props.linkBackgroundColor);
  const [inputLinkColor, setInputLinkColor] = useState(props.linkColor);
  const [inputIsLinkEdgeRounded, setInputIsLinkEdgeRounded] = useState(props.isLinkEdgeRounded);

const handleLinkBackgroundColor = (event) => {
  const inputLinkBackgroundColor = event.target.value;
  setInputLinkBackgroundColor(inputLinkBackgroundColor);
};

const handleLinkColor = (event) => {
  const inputLinkColor = event.target.value;
  setInputLinkColor(inputLinkColor);
};

const handleLinkEdgesChange = (inputIsLinkEdgeRounded) => {
  setInputIsLinkEdgeRounded(inputIsLinkEdgeRounded);
};

const handleSubmit = () => {
  props.setLinkBackgroundColor(inputLinkBackgroundColor);
  props.setLinkColor(inputLinkColor);
  props.setIsLinkEdgeRounded(inputIsLinkEdgeRounded);
  props.setShowSettings(false);
};


  return (
    <Modal show={true} onHide={() => props.setShowSettings(false)} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Settings</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <span className="settings-form-label">Link Background Color</span>
    <input className="change-link-background" type="text" placeholder={inputLinkBackgroundColor} onChange={handleLinkBackgroundColor} />
    <span className="settings-form-label">Link Color</span>
    <input className="change-link-color" type="text" placeholder={inputLinkColor} onChange={handleLinkColor}/>
    <span className="settings-form-label">Link Styling</span>
    <div className="link-corner-styling-selection">
      <input className="link-style-radio-btn" type="radio" id="rounded-option" name="rounded-option" value="round" defaultChecked={props.isLinkEdgeRounded} onChange={() => handleLinkEdgesChange(true)} />
      <label for="rounded-option">Rounded Corners</label>
      <input type="radio" id="straight-option" name="rounded-option" value="straight" defaultChecked={!props.isLinkEdgeRounded} onChange={() => handleLinkEdgesChange(false)}/>
      <label for="straight-option">Straight Corners</label> 
    </div>
     <button className="add-link-btn" onClick={handleSubmit}>Save</button>
    </Modal.Body>
  </Modal>
  );
}

SettingsModal.propTypes = {
  linkBackgroundColor: PropTypes.string.isRequired,
  linkColor: PropTypes.string.isRequired,
  isLinkEdgeRounded: PropTypes.bool.isRequired,
  setLinkBackgroundColor: PropTypes.func.isRequired,
  setLinkColor: PropTypes.func.isRequired,
  setIsLinkEdgeRounded: PropTypes.func.isRequired,
  setShowSettings: PropTypes.func.isRequired
};

export default SettingsModal;