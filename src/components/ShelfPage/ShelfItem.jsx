import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ShelfItem = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const deleteItem = (id) => {
    dispatch({ type: 'DELETE_SHELF_ITEM', payload: id });
  };

  return (
    <div>
      <div>{item.description}</div>
      <img src={item.image_url} alt={item.description} />
      {item.user_id === user.id && (
        <button onClick={() => deleteItem(item.id)}>Delete Item</button>
      )}
    </div>
  );
}

export default ShelfItem;
