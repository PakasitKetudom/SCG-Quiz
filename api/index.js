// const express = require('express');
// const app = express();

// var movies = [
//   {
//       id: 0,
//       name: "The Flash",
//       type: "series",
//       isPublished: false
//   },
//   {
//       id: 1,
//       name: "Arrow",
//       type: "series",
//       isPublished: true
//   },
//   {
//       id: 2,
//       name: "Harry Potter",
//       type: "movie",
//       isPublished: false
//   }
// ];

// app.get("/", function(req, res){
//   res.send("hello world");
// });

// app.get('/movies', (req, res) => {
//   res.send(movies);
// });
// // app.get("/kan", function(req, res){
// //   res.send("hello world2");
// //   // console.log("12345");
// // });


// module.exports = {
//   path: "/api/",
//   handler: app
// }

const express = require('express')
var bodyParser = require('body-parser')


// Create express instance
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Require API routes
const test = require('./routes/test')
const movies = require('./routes/movies')
const vending_machine = require('./routes/vending_machine')

// Import API Routes
app.use(test)
app.use(movies)
app.use(vending_machine)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}