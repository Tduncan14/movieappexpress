var express = require('express');
var router = express.Router();


const apiKey ='1c0d30ffc1bab82d086e8cd66b332f2e';

const apiBaseUrl ='http://api.themoviedb.org/3';
const nowPlayingUrl= `${apiBaseUrl}/movie/now_playing?api_keys=${apiKey}`;
const imageBaseUrl ='http://image.tmdb.org/t/p/w300';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

module.exports = router;
