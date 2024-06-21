const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM item';
  pool.query(queryText)
    .then(result => res.status(200).json(result.rows))
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Server error');
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const { description, image_url } = req.body;
  const userId = req.user.id;

  const queryText = `
    INSERT INTO item (description, image_url, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  pool.query(queryText, [description, image_url, userId])
    .then(result => res.status(201).json(result.rows[0]))
    .catch(error => {
      console.error('Error adding item:', error);
      res.status(500).send('Server error');
    });
});



/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;

  const queryText = `
    DELETE FROM item
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;
  pool.query(queryText, [itemId, userId])
    .then(result => {
      if (result.rowCount === 0) {
        res.status(418).send('NO DELETING FOR YOU');
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
      res.status(500).send('Server error');
    });
  });


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality 
  const itemId = req.params.id;
  const userId = req.user.id;
  const { description, image_url } = req.body;
  console.log("Update Request:", {
    itemId,
    userId,
    description,
    image_url
  });
  
  const queryText = `
    UPDATE "item"
    SET "description" = $1, "image_url" = $2
    WHERE "id" = $3 AND "user_id" = $4
  `;

  pool.query(queryText, [description, image_url, itemId, userId])
    .then((result) => {
     
      if (result.rowCount === 0) {
   
        res.status(403).send({ message: 'You are not authorized to update this item.' });
      } else {
       
        res.send(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error('Error updating item', err);
      res.status(500).send({ message: 'An error occurred while updating the item.' });
    });
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
