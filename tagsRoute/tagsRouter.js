const express = require("express");
const tagsdb = require("../data/helpers/tagDb");

const router = express.Router();

// middleware

function checkIdExists(req, res, next) {
  const id = req.params.id;
  tagsdb.get(id).then(user => {
    if (user) {
      next();
    } else {
      res.status(404).send({ error: "The ID doesn't exist." });
    }
  });
}

//endpoints

router.get("/", (req, res) => {
  tagsdb
    .get()
    .then(tag => {
      res.status(200).send({ tag });
    })
    .catch(() =>
      res.status(500).send({ error: "The posts could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  tagsdb
    .get(id)
    .then(tag => {
      if (tag) {
        res.status(200).send({ tag });
      } else {
        res.status(404).send({ error: "The ID doesn't exist." });
      }
    })
    .catch(() =>
      res.status(500).send({ error: "The posts could not be retrieved." })
    );
});

router.post("/create", (req, res) => {
  const tagInfo = req.body;

  tagsdb
    .insert(tagInfo)
    .then(result => {
      tagsdb
        .get(result.id)
        .then(tag => {
          res.status(201).send({ tag });
        })
        .catch(() =>
          res.status(400).send({
            errorMessage: "Please provide information in the correct format."
          })
        );
    })
    .catch(() =>
      res.status(500).send({
        error: "There was an error while saving the post to the database."
      })
    );
});

router.put("/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  const tagChange = req.body;

  tagsdb
    .update(id, tagChange)
    .then(() => res.status(200).send("1"))
    .catch(() =>
      res
        .status(400)
        .send({ errorMessage: "Please provide updated information." })
    )
    .catch(() =>
      res.status(500).send({ error: "The post could not be modified." })
    );
});

router.delete("/:id", checkIdExists, (req, res) => {
    const id = req.params.id;
  
    tagsdb
      .remove(id)
      .then(() => res.status(200).send({ deleted: "Tag has been deleted." }))
      .catch(() =>
        res.status(500).send({ error: "The tag could not be deleted." })
      );
  });

module.exports = router;
