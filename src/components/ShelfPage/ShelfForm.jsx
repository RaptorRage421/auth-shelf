import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const ShelfForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const addItem = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_SHELF_ITEM', payload: { description, image_url: imageUrl } });
    setDescription('');
    setImageUrl('');
  };

  return (
    <form onSubmit={addItem}>
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default ShelfForm;
