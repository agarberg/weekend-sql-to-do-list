const express = require("express");
const router = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");

// GET
routerget("/", (req, res) => {

    let queryText = 'SELECT * FROM "allKoalas"';
    console.log("GETTING?!");
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("GET ERROR", error);
        res.sendStatus(500);
      });
  
    // res.send(successMessage)
  });
  

// // POST

// koalaRouter.post('/', (req, res) => {
//     const newKoala = req.body
//     console.log(newKoala);
    
//     const queryText = `
//     INSERT INTO "allKoalas" ("name", "age", "gender", "ready-for-transfer", "notes")
//     VALUES ($1, $2, $3, $4, $5);
//     `;

//         //parameterized query below, prevents SQL injection
//     pool.query(queryText, [newKoala.name, newKoala.age, newKoala.gender, newKoala.transfer, newKoala.notes])
//     .then((result) => {
//         res.sendStatus(201);
//     })
//     .catch((err) => {
//         console.log('error querying', queryText, err);
//         res.sendStatus(500);
//     })
//     // console.log(req.body); --- original code

//     // res.sendStatus(200)
// })


// // PUT

// // DELETE

module.exports = router;
