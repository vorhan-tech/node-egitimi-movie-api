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

router.get('/top10', (req, res) => {
  const promise = Movie.find({})
    .limit(10)
    .sort({ imdb_score: -1 });
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

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise
    .then(movie => {
      if (!movie) {
        next({ message: 'The movie was not found', code: 99 });
      }
      res.json({ status: 1 });
    })
    .catch(err => {
      res.json(err);
    });
});

router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true
  });
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
      res.json({ data });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/top10', (req, res) => {
  const promise = Movie.find({})
    .limit(10)
    .sort({ imdb_score: -1 });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: { $gte: parseInt(start_year), $lte: parseInt(end_year) }
  });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
