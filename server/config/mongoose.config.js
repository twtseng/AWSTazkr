const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://tazkr_admin:b5217dfd-023c-48b1-b5d1-67474f57bd39@cluster0.06dtp.azure.mongodb.net/tazkr';

mongoose.connect(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}, err => console.log(err?`Couldn't connect to database: ${err}`:`Successfully connected to the database: ${connectionString}`));
