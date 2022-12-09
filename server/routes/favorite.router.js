const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

//get by id req.body  
router.get('/:id', (req, res) => {
  console.log('get by category!!!', req.params.id)
  
  const queryText = 
  `SELECT *
  FROM  "favorite_giphy"
  WHERE "category_id"=$1`;
  pool.query(queryText, [req.params.id])
    .then((result) => { 
      console.log(result.rows)
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('Error completing SELECT', err);
      res.sendStatus(500);
    });
});


// add a new favorite
router.post('/', (req, res) => {
  console.log('router.post', req.body)
  const newGif = req.body
  const queryText = `INSERT INTO "favorite_giphy" ("category_id", "URL", "description")
                      VALUES ($1, $2, $3)`;
  
  pool.query(queryText, [newGif.category_id, newGif.URL, newGif.description])
    .then(() => { 
        res.sendStatus(200); 
    })
    .catch((err) => {
      console.log('Error completing POST', err);
      res.sendStatus(500);
    });
  // !! res.sendStatus(200); this triggered a setHeader error. 
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM "favorite_giphy" WHERE id=$1';
  pool.query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('Error deleting favorite by id:', err);
    res.sendStatus(500);
  })
});

module.exports = router;
