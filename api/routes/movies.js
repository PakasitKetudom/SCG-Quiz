const { Router } = require('express')

const router = Router()

var movies = [
    {
        id: 0,
        name: "The Flash",
        type: "series",
        isPublished: false
    },
    {
        id: 1,
        name: "Arrow",
        type: "series",
        isPublished: true
    },
    {
        id: 2,
        name: "Harry Potter",
        type: "movie",
        isPublished: false
    }
  ];
  
  router.get('/movies', (req, res) => {
    res.json(movies)
  });
  
  module.exports = router