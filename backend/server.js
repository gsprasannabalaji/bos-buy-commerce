const express= require('express');

const initialize =require('./api/app.js');

const dotenv =require('dotenv');


dotenv.config();


const app = express();


initialize(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

 console.log(`Server running on port ${process.env.PORT}`);

});



module.exports = app;