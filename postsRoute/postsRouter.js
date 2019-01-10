const express = require("express");
const postsdb = require("../data/helpers/postDb");

const router = express.Router();

//middleware

function checkIdExists(req, res, next) {
  const id = req.params.id;
  postsdb.get(id).then(user => {
    if (user) {
      next();
    } else {
      res.status(404).send({ error: "The user doesn't exist." });
    }
  });
}

//endpoints
router.get("/", (req, res) => {
  postsdb
    .get()
    .then(post => {
      res.status(200).send({ post });
    })
    .catch(() =>
      res.status(500).send({ error: "The posts could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  postsdb
    .get(id)
    .then(post => {
      if (post) {
        res.status(200).send({ post });
      } else {
        res.status(404).send({ error: "The ID doesn't exist." });
      }
    })
    .catch(() =>
      res.status(500).send({ error: "The posts could not be retrieved." })
    );
});

router.post("/create", (req, res) => {
  const postInfo = req.body;

  postsdb
    .insert(postInfo)
    .then(result => {
      postsdb
        .get(result.id)
        .then(post => {
          res.status(201).send({ post });
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
  const postChange = req.body;

  postsdb
    .update(id, postChange)
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

  postsdb
    .remove(id)
    .then(() => res.status(200).send({ deleted: "Post has been deleted." }))
    .catch(() =>
      res.status(500).send({ error: "The post could not be deleted." })
    );
});

router.get("/:id/tags", checkIdExists, (req, res) => {
  const id = req.params.id;

  postsdb
    .getPostTags(id)
    .then(result => res.status(200).send({ result }))
    .catch(() =>
      res.status(500).send({ error: "The tags could not be retrieved." })
    );
});

module.exports = router;
