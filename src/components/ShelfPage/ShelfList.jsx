import React from 'react';
import { useSelector } from 'react-redux';
import ShelfItem from './ShelfItem';

const ShelfList = () => {
  const shelfItems = useSelector((state) => state.shelf);

  return (
    <div>
      <h2>Shelf</h2>
      {shelfItems.map(item => (
        <ShelfItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ShelfList;
