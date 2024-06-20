import React, { useEffect, useState } from 'react';

function ShelfPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/shelf', {
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
      <h2>Shelf</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <p>{item.description}</p>
            {item.image_url && <img src={item.image_url} alt={item.description} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShelfPage;
