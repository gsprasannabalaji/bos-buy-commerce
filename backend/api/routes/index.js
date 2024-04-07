const express = require('express');
const router = express.Router();

// ./routes/index.js
module.exports = function(app) {
    app.use('/some-path', router.get('/', (req, res) => {
        res.send('Hello World!');
       }));
  };
  


// module.exports = router;