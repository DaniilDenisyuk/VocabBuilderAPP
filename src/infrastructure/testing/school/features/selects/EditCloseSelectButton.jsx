const EditCloseSelectButton = ({ isEditing, onToggleEdit }) => {
  return <button onClick={onToggleEdit}>{isEditing ? 'Close' : 'Edit'}</button>;
};

export default EditCloseSelectButton;
