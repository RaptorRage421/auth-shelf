// src/components/ShelfItem.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShelfEditForm from './ShelfEditForm';

const ShelfItem = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const deleteItem = (id) => {
    dispatch({ type: 'DELETE_SHELF_ITEM', payload: id });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };


  
  return (
    <div className='container'>
      {isEditing ? (
        <ShelfEditForm item={item} toggleEdit={toggleEdit} />
      ) : (
        <>
          <div>{item.description}</div>
          <img src={item.image_url} alt={item.description} />
          {item.user_id === user.id && (
            <>
              <button onClick={() => deleteItem(item.id)}>Delete Item</button>
              <button onClick={toggleEdit}>Update Item</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ShelfItem;
