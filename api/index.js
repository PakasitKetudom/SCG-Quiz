const express = require('express')
var bodyParser = require('body-parser')


// Create express instance
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Require API routes
const vending_machine = require('./routes/vending_machine')

// Import API Routes
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