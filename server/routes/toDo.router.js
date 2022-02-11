const express = require("express");
const router = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");

// GET
router.get("/", (req, res) => {
    let queryText = 'SELECT * FROM "list" ORDER BY "priority" DESC';
    console.log("GETTING TASKS, YESSS");
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("GET ERROR", error);
        res.sendStatus(500);
      });
  });
  

// POST

router.post('/', (req, res) => {
    const newTask = req.body
    console.log('in POST', newTask);
    
    const queryText = `
    INSERT INTO "list" ("priority", "task")
    VALUES ($1, $2);
    `;

        //parameterized query below, prevents SQL injection
    pool.query(queryText, [newTask.priority, newTask.task])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('error querying', queryText, err);
        res.sendStatus(500);
    })
})


// PUT


// DELETE
router.delete('/:id', (req, res) => {
  let reqId = req.params.id;
  console.log('Delete request for id', reqId);
  let sqlText = 'DELETE FROM list WHERE id=$1;';
  pool.query(sqlText, [reqId])
    .then( (result) => {
      console.log('TASK deleted');
      res.sendStatus(200);
    })
    .catch( (error) => {
      console.log(`Error making database DELETE ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    })
})

module.exports = router;
