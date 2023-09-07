// Configure mongodb
// Mongodb URL Provided

const mongoose = require('mongoose');
// 'mongodb://localhost:27017/Vishnudevi'
const DB = 'mongodb+srv://vishnudevi:vish123@cluster0.rwno5bc.mongodb.net/'

mongoose.connect(DB).then(()=>{
     console.log('connection successful');
 }).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open',  function(){
     console.log('Connected to Database :: MongoDB');
});

 
module.exports = db;  