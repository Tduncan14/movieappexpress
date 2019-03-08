var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey ='1c0d30ffc1bab82d086e8cd66b332f2e';
//const apiKey='123456789'
const apiBaseUrl ='https://api.themoviedb.org/3/';

//const apiBaseUrl="http://localhost:3030";
const nowPlayingUrl=`${apiBaseUrl}movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl ='http://image.tmdb.org/t/p/w300';

router.use((req,res,next) =>{
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})


/* GET home page. */
router.get('/', function(req, res, next) {
  //using the request third party module
  // request. takes two args to the url http:get
  // 2 the callback will run when the response http is back is when the callback wi run
  // then the callback takes three args
  //. it takes an error
  //. its takes an http resonse
  //. json.data the server sent back

  request.get(nowPlayingUrl,(error,response,movieData)=>{
   // console.log(error);
   // console.log('======');
  //  console.log(response);
   // console.log('===response===');
   //console.log(movieData)

   const parsedData = JSON.parse(movieData);

 // res.json(parseData);

 res.render('index',{parsedData:parsedData.results});
  });

});
// /movie/:id/is a wildcard route
// that means the colon id going to be stored in :id...
//
router.get('/movie/:id',(req,res,next) =>{
  //res.json(req.params.id);

  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}movie/${movieId}?api_key=${apiKey}`

  request.get(thisMovieUrl,(error,response,movieData) =>{

    const parsedData = JSON.parse(movieData);
   console.log(parsedData)
    res.render('single-movie',{parsedData:parsedData})

  })
})

router.post("/search",(req,res,next) =>{
  //res.send("sanity check");
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;

  const movieUrl =`${apiBaseUrl}search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`

 //res.send(movieUrl);

 request.get(movieUrl,(error,response,movieData)=>{
  
  let parsedData = JSON.parse(movieData);
 // res.json(parseData);

 if(cat ==="person"){

  parsedData.results = parsedData.results[0].known_for;
 }



 res.render('index',{
   parsedData:parsedData.results
 })

 })
   
  

})

module.exports = router;
