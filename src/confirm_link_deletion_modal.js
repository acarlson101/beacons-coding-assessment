/**
 * Modal to confirm link deletion
 *
 * @copyright 2021 Adam Carlson - All rights reserved
 */

import PropTypes from 'prop-types';
import './styles/confirm_link_deletion_modal.scss';
import {Modal} from 'react-bootstrap';

const ConfirmLinkDeletionModal = (props) => {
  return (
    <Modal show={props.showConfirmDeleteModal} onHide={() => props.setShowConfirmDeleteModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete this link?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button className="confirm-link-deletion-btn" onClick={() => props.deleteLink()}>Delete</button>
      </Modal.Body>
    </Modal>
  );
}

ConfirmLinkDeletionModal.propTypes = {
  showConfirmDeleteModal: PropTypes.bool.isRequired,
  setShowConfirmDeleteModal: PropTypes.func.isRequired,
  deleteLink: PropTypes.func.isRequired
};

export default ConfirmLinkDeletionModal;