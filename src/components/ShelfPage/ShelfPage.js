import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ShelfForm from './ShelfForm';
import ShelfList from './ShelfList';

const ShelfPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF_ITEMS' });
  }, [dispatch]);

  return (
    <div >
      <ShelfForm />
      <ShelfList />
    </div>
  );
}

export default ShelfPage;