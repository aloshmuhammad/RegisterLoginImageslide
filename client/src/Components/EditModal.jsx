import React,{useState} from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, defaultTitle, onSave }) => {
  const [newTitle, setNewTitle] = useState(defaultTitle);

  const handleSave = () => {
    onSave(newTitle);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Edit Image</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new title"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;

