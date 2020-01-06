var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  const promise = Movie.find({});
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise
    .then(movie => {
      if (!movie) {
        next({ message: 'The movie was not found', code: 99 });
      }
      res.json(movie);
    })
    .catch(err => {
      res.json(err);
    });
});

const Movie = require('../models/Movie.js');
router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);
  const promise = movie.save();
  promise
    .then(data => {
      res.json({ status: 1 });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
