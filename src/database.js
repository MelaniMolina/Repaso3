const mongoose = require('mongoose');
const {NOTES_APP_MONGODB_HOST,NOTES_APP_MONGODB_DATABASE} = process.env;
const  MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}` ;




// mongoose.connect(MONGODB_URI,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })

mongoose.connect(MONGODB_URI)
    .then(db => console.log('Database  is connect'))
    .catch(err => console.log(err));