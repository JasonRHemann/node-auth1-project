const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("posts")
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.get("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .first()
    .then(post => {
      if (post) {
        res.status(200).json({ data: post });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.post("/", (req, res) => {
  db("posts")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json({ results: ids });
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("posts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "record updated" });
      } else {
        res.status(404).json({ message: "sorry, error" });
      }
    });
});

router.delete("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "record deleted" });
      } else {
        res.status(404).json({ message: "sorry, error" });
      }
    });
});

module.exports = router;
