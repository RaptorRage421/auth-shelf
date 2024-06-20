import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";

function ShelfPage() {
  const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/shelf', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.error('Error fetching items:', error));
    }, []);

  return (
    <div className='container'>
    <form onSubmit={(event) => {
      event.preventDefault();
      dispatch({type: "ADD_ITEM", payload:{description, imageUrl}})
    }}>
      <input value={description} placeholder="Description" onChange={(event) => setDescription(event.target.value)}/>
      <input value={imageUrl} placeholder="Image url" onChange={(event) => setImageUrl(event.target.value)}/>
      <button type="submit">Submit</button>
    </form>
    <h2>Shelf</h2>
    {shelf.map(item => {
      return (
        <div key={item.id}>
        <div>{item.description}</div>
        <img src={item.imageUrl} />
        {item.user_id === user.id && <button onClick={() => deleteItem(item.id, item.user_id)}>Delete Item</button>}
        </div>
      )
    })}
  </div>
  );
}

export default ShelfPage;
