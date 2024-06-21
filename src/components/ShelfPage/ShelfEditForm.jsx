import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function ShelfEditForm({ item, toggleEdit }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(item.description);
  const [imageUrl, setImageUrl] = useState(item.image_url);

  const updateItem = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_SHELF_ITEM', payload: { id: item.id, description: description, image_url: imageUrl } });
    toggleEdit(); 
  };

  return (
    <form onSubmit={updateItem}>
      <input 
        value={description} 
        placeholder="Description" 
        onChange={(event) => setDescription(event.target.value)} 
      />
      <input 
        value={imageUrl} 
        placeholder="Image url" 
        onChange={(event) => setImageUrl(event.target.value)} 
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default ShelfEditForm;